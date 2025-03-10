import { useState } from 'react'
import UserCard from '../components/UserCard'
import data from '../data.json'
import { useAccount } from 'wagmi'
import { Copy } from 'lucide-react'
import { ConnectKitButton } from 'connectkit'

const Home = () => {
  const { name } = JSON.parse(localStorage.getItem('user'))
  const [owe, setOwe] = useState(100)
  const [owesYou, setOwesYou] = useState(100)
  const { address } = useAccount()
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen p-10">
      <div className="absolute top-5 right-5">
        <ConnectKitButton />
      </div>
      <div className="w-1/2 text-3xl text-gray-500 flex flex-col leading-relaxed">
        WELCOME BACK,
        <span className="text-4xl font-bold text-gray-200">
          {name.toUpperCase() || 'USER'}
        </span>
        <div className="mt-5 flex gap-5">
          <div className="border-2 rounded-xl px-3 py-2">
            <div className="text-lg font-semibold text-gray-600">You Owe</div>
            <div className="text-2xl font-bold text-red-600">${owe}</div>
          </div>
          <div className="border-2 rounded-xl px-3 py-2">
            <div className="text-lg font-semibold text-gray-600">Owes You</div>
            <div className="text-2xl font-bold text-green-600">${owesYou}</div>
          </div>
        </div>
        {data.map((user, i) => (
          <div key={i} className="mt-2">
            <UserCard data={user} />
          </div>
        ))}
      </div>
      <div className="mx-auto flex flex-col justify-center items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
          alt="hello"
          className="bg-white"
        />
        <button
          className="flex gap-2 items-center bg-primary text-gray-700 font-semibold px-5 py-2 mt-3 rounded-full"
          onClick={copyToClipboard}
        >
          <Copy className="size-5" /> Copy Address
        </button>
        {isCopied && (
          <div className="text-green-500 text-sm mt-2">Address Copied</div>
        )}
      </div>
    </div>
  )
}

export default Home
