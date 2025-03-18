import { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import { useAccount } from 'wagmi'
import { Copy, Plus } from 'lucide-react'
import { ConnectKitButton } from 'connectkit'
import GenerateQR from '../components/GenerateQR'
import { useNavigate } from 'react-router-dom'
import SplitExpense from './SplitExpense'
import axios from 'axios'

const Home = () => {
  const { name } = JSON.parse(localStorage.getItem('user'))
  const { address } = useAccount()
  const [friends, setFriends] = useState([])
  const [isCopied, setIsCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const getFriends = async () => {
    const response = await axios.post('http://localhost:3000/getfriends', {
      name: name,
    })
    console.log(response.data.friends)
    setFriends(response.data.friends)
  }

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <div className="flex min-h-screen p-8">
      <div className="hidden md:block absolute top-5 right-5">
        <ConnectKitButton />
      </div>
      <div className="w-full font-semibold text-3xl text-gray-500 flex flex-col leading-relaxed">
        WELCOME BACK,
        <span className="text-4xl font-bold text-gray-200">
          {name.toUpperCase()}
        </span>
        <div className="flex justify-between items-center mt-3 gap-1">
          <h2 className="font-bold text-primary uppercase">Friend List</h2>

          <div className="flex items-center gap-3">
            <div>
              <button
                onClick={() => navigate('/add-friend')}
                className="hidden md:flex rounded-full items-center gap-2 px-2 py-2 border-2 border-primary text-sm text-gray-300 font-semibold"
              >
                <Plus className="size-5" />
                Add Friend
              </button>
            </div>
            <div className="relative flex items-center">
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="bg-primary text-gray-700 font-semibold px-5 py-2 rounded-full text-base"
              >
                {!isModalOpen ? 'Split Expense' : 'Cancel'}
              </button>
              <div className="absolute top-0 left-28">
                <SplitExpense isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
              </div>
            </div>
          </div>
        </div>
        {friends ? (
          friends.map((user, i) => (
            <div key={i} className="mt-6">
              <UserCard data={user} />
            </div>
          ))
        ) : (
          <div className='p-20 flex items-center justify-center text-base'>Add friends to see them in your friend list</div>
        )}
        <button
          onClick={() => navigate('/add-friend')}
          className="md:hidden mt-2 flex items-center justify-center rounded-full px-2 py-2 border-2 border-primary text-sm text-gray-300 font-semibold"
        >
          <Plus className="size-5" />
          Add Friend
        </button>
      </div>
      <div className="hidden md:flex md:w-1/2 md:flex-col mx-auto justify-center items-center">
        <GenerateQR data={user} />
        <button
          className="flex gap-2 items-center bg-primary text-gray-700 font-semibold px-5 py-2 mt-3 rounded-full"
          onClick={copyToClipboard}
        >
          <Copy className="size-4" /> Copy Address
        </button>
        {isCopied && (
          <div className="text-green-500 text-sm mt-2">Address Copied</div>
        )}
      </div>
    </div>
  )
}

export default Home
