"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const ensName = req.body.ens;
    try {
        const alreadyExists = yield prisma.user.findFirst({
            where: {
                name
            }
        });
        if (alreadyExists) {
            return res.status(500).json({
                msg: "User with this name already exists"
            });
        }
        const user = yield prisma.user.create({
            data: {
                name: name,
                ensName: ensName
            }
        });
        console.log(user);
        return res.status(200).json({
            msg: `User with name ${name} created successfully`
        });
    }
    catch (e) {
        return res.status(501).json({
            msg: "Unable to create user"
        });
    }
}));
app.post('/addfriend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myName = req.body.username;
    const name = req.body.name;
    console.log(name, myName);
    try {
        const addfriend = yield prisma.user.update({
            where: { name: myName },
            data: {
                friends: {
                    connect: { name }
                }
            }
        });
        console.log(addfriend);
        return res.status(200).json({
            msg: "Friend added successfully"
        });
    }
    catch (e) {
        return res.status(501).json({
            msg: "Unable to process request at the moment"
        });
    }
}));
app.post('/getfriends', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    try {
        const friend = yield prisma.user.findUnique({
            where: { name },
            include: {
                friends: true
            }
        });
        console.log(friend === null || friend === void 0 ? void 0 : friend.friends);
        console.log(friend);
        res.status(200).json({
            friends: friend === null || friend === void 0 ? void 0 : friend.friends
        });
    }
    catch (_a) {
        res.send(404).json({
            msg: "unable to perform currently try again later"
        });
    }
}));
app.get('/ens', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    try {
        const data = yield prisma.user.findUnique({
            where: {
                name: name,
            }
        });
        res.status(200).json({
            ensName: data === null || data === void 0 ? void 0 : data.ensName,
            msg: "Successfully fetched the ensName"
        });
        return;
    }
    catch (e) {
        res.status(404).json({
            msg: "Unable to find ens corressponding to given name"
        });
        return;
    }
}));
app.post("/payouts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, amount, ownerName } = req.body;
    try {
        const payout = yield prisma.payout.create({
            data: {
                name,
                amount,
                owner: { connect: { name: ownerName } },
            },
        });
        res.json(payout);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating payout" });
    }
}));
app.get("/payouts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let owner = req.body.owner;
    const payouts = yield prisma.payout.findUnique({
        //@ts-ignore
        where: {
            name: owner
        }
    });
    res.json(payouts);
}));
app.listen(3000, () => {
    console.log("successfully listening on port 3000");
});
