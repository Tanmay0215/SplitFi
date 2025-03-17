import express from "express"
import cors from "cors"
import {PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json())
app.use(cors())

app.post('/createUser',async(req : any,res : any) => {
    const name = req.body.name;
    const ensName = req.body.ens;
    try{
        const alreadyExists = await prisma.user.findFirst({
            where : {
                name
            }
        })

        if(alreadyExists){
            return res.status(500).json({
                msg : "User with this name already exists"
            })
        }

        const user = await prisma.user.create({
            data : {
                name : name,
                ensName : ensName
            }
        })
        console.log(user)

        return res.status(200).json({
            msg :  `User with name ${name} created successfully`
        })
    }
    catch(e){
        return res.status(501).json({
            msg : "Unable to create user"
        })
    }
})

app.post('/addfriend',async(req : any , res:any) => {
    const myName : string = req.body.username;
    const name : string = req.body.name;

    console.log(name , myName)

    try{
        const addfriend = await prisma.user.update({
            where : {name : myName},
            data: {
                friends : {
                    connect : {name}
                }
            }
        })
        console.log(addfriend);
        return res.status(200).json({
            msg : "Friend added successfully"
        })
    }
    catch(e) {
        return res.status(501).json({
            msg : "Unable to process request at the moment"
        })
    }
})

app.get('/getfriends',async(req,res) => {
    const name : string = req.body.name;
    try{
        const friend = await prisma.user.findUnique({
            where : {name},
            include : {
                friends : true
            }
        })
        console.log(friend?.friends);
        console.log(friend);
        res.status(200).json({
            friends : friend?.friends
        })
    }
    catch{
        res.send(404).json({
            msg : "unable to perform currently try again later"
        })
    }
})

app.get('/ens',async (req,res) => {
    const name = req.body.name;

    try{
        const data = await prisma.user.findUnique({
            where : {
                name : name,
            }
        })

        res.status(200).json({
            ensName : data?.ensName,
            msg : "Successfully fetched the ensName"
        })

        return;
    }
    catch(e) {
        res.status(404).json({
            msg : "Unable to find ens corressponding to given name"
        })

        return;
    }
})

app.post("/payouts", async (req, res) => {
    const { name, amount, ownerName } = req.body;
    try {
        const payout = await prisma.payout.create({
            data: {
                name,
                amount,
                owner: { connect: { name: ownerName } },
            },
        });
        res.json(payout);
    } catch (error) {
        res.status(500).json({ error: "Error creating payout" });
    }
});

app.get("/payouts", async (req, res) => {
    const payouts = await prisma.payout.findMany({ include: { owner: true } });
    res.json(payouts);
});

app.listen(3000,() => {
    console.log("successfully listening on port 3000")
})