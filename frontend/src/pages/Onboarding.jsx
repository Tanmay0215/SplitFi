import { useEffect, useState } from 'react'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom'

const Onboarding = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const { address } = useAccount()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (!name) {
      setError('Name is required')
      return
    }
    if (!username) {
      setError('Username is required')
      return
    }

    localStorage.setItem('user', JSON.stringify({ name, username, address }))
    navigate('/home')
  }

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
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
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
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            required
          />

          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 cursor-not-allowed"
            disabled
          />
          {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
          <button
            className="text-primary font-bold py-2 w-full rounded-lg border-2"
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
