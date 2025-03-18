import { useEffect, useState } from 'react'
import { ConnectKitButton } from 'connectkit'
import { useAccount, useWriteContract } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ABI, contractAddress } from '../utils/contractDetails'

const Onboarding = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const { address } = useAccount()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  // Set up the contract write hook with status tracking
  const {
    writeContract,
    data: txHash,
    isSuccess,
    isError,
  } = useWriteContract()

  const createUserOnContract = async (username) => {
    console.log(username)
    try {
      writeContract({
        address: contractAddress,
        abi: ABI,
        functionName: "createUser",
        args: [username],
      })
      return true
    } catch (err) {
      console.error('Error creating user on blockchain:', err)
      setError(`Blockchain error: ${err.message}`)
      return false
    }
  }

  const submitHandler = async (e) => {
    // localStorage.setItem(
    //   'user',
    //   JSON.stringify({ name, username, address })
    // )
    console.log("button clicked")
    e.preventDefault()
    if (!name) {
      setError('Name is required')
      return
    }
    if (!username) {
      setError('Username is required')
      return
    }

    try {
      // First create user on blockchain
      const blockchainSuccess = await createUserOnContract(username)
      if (!blockchainSuccess) return alert("Couldn't create user on blockchain")

      // The rest will be handled by the useEffect watching isSuccess
    } catch (err) {
      console.log(err)
      setError('Login failed')
      return
    }
  }

  // Effect to handle successful contract interaction
  useEffect(() => {
    if (isSuccess && txHash) {
      console.log('User created on blockchain successfully')
      // Register on backend after successful blockchain transaction
      const registerOnBackend = async () => {
        try {
          const req = await axios.post('http://localhost:3000/createUser', {
            name: name,
            ens: username,
          })
          localStorage.setItem(
            'user',
            JSON.stringify({ name, username, address })
          )
          if (req.status === 200) navigate('/home')
        } catch (err) {
          console.error('Backend registration error:', err)
          setError('Backend registration failed')
        }
      }
      registerOnBackend()
    }

    if (isError) {
      setError(`Transaction failed`)
    }
  }, [
    isSuccess,
    isError,
    txHash,
    name,
    username,
    address,
    navigate,
  ])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/home')
    }
  })

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-5">
      <div className="absolute right-5 top-5">
        <ConnectKitButton />
      </div>
      <div className="rounded-xl flex flex-col p-6 md:p-10 border-gray-500 border-2">
        <h1 className="text-2xl font-bold text-primary mb-6 uppercase">
          Complete Your Profile
        </h1>
        <form>
          <label
            htmlFor="name"
            className="block text-gray-400 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mb-4"
            required
          />
          <label
            htmlFor="username"
            className="block text-gray-400 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mb-4"
            required
          />

          <label
            htmlFor="address"
            className="block text-gray-500 text-sm font-bold mb-2"
          >
            Address
          </label>
          <input
            type="text"
            value={
              address
                ? `${address.substring(0, 6)}....${address.substring(
                    address.length - 4
                  )}`
                : 'Connect Wallet'
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 mb-4 cursor-not-allowed"
            disabled
            // required
          />
          {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
          <button
            className="text-primary font-bold py-2 w-full rounded-lg border-2 cursor-pointer"
            onClick={submitHandler}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Onboarding
