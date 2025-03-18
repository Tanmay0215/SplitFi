import { useEffect, useState } from 'react'
import axios from 'axios'

const SplitExpense = ({ isOpen, setIsOpen }) => {
  const { name } = JSON.parse(localStorage.getItem('user'))
  const [amount, setAmount] = useState('')
  const [selectedFriends, setSelectedFriends] = useState([])
  const splittedAmount = (amount / (selectedFriends.length + 1)).toFixed(2)
  const [allFriends, setAllFriends] = useState([])

  const fetchAllFriends = async () => {
    const response = await axios.post('http://localhost:3000/getfriends', {
      name: name,
    })
    console.log(response.data.friends)
    setAllFriends(response.data.friends)
  }

  const fetchAllFriendsPayout = async () => {
    const response = await axios.get('http://localhost:3000/payouts', {
      name: name,
    })
    console.log(response.data)
  }

  useEffect(() => {
    fetchAllFriends()
    fetchAllFriendsPayout()
  }, [])

  const handleChange = (e, friend) => {
    if (e.target.checked) setSelectedFriends([...selectedFriends, friend.name])
    else
      setSelectedFriends(
        selectedFriends.filter((friendName) => friendName !== friend.name)
      )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(selectedFriends)
    try {
      selectedFriends.map(async (friend) => {
        const response = await axios.post('http://localhost:3000/payouts', {
          name: friend,
          amount: splittedAmount,
          ownerName: name,
        })
        console.log(response.data)
        if (response.status === 200) {
          console.log('Expense added successfully' + friend + splittedAmount)
        }
      })
    } catch (error) {
      console.error('Error adding expense:', error.message)
    }
    setIsOpen(false)
    setAmount('')
    setSelectedFriends([])
  }

  return (
    <div className={`${isOpen ? 'w-full mx-auto' : 'hidden'}`}>
      <div className="bg-gray-600 rounded-lg shadow-lg p-6 w-full min-w-sm">
        <h2 className="text-xl font-bold text-center text-gray-200 mb-6">
          Split Expense
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="amount"
                placeholder="0.00"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-md text-lg py-1 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Split with
            </label>
            <div className="space-y-3 max-h-36 overflow-y-auto p-2 border border-gray-200 rounded-md text-base">
              {allFriends.map((friend) => (
                <div key={friend.username} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedFriends.includes(friend.name)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    onChange={(e) => handleChange(e, friend)}
                  />
                  <label
                    htmlFor={`friend-${friend.username}`}
                    className="ml-3 flex items-center"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-2">
                      {friend.name.charAt(0)}
                    </div>
                    <span className="text-gray-400">
                      {friend.name}{' '}
                      <span className="text-gray-200 text-sm">
                        ({friend.ensName})
                      </span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {amount && selectedFriends.length > 0 && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-base">
              <h3 className="font-medium text-green-800 mb-1">Summary</h3>
              <p className="text-green-700">
                Split among:{' '}
                <span className="font-bold">
                  {selectedFriends.length + 1} people
                </span>
              </p>
              <p className="text-green-700 font-medium ">
                Each person pays:{' '}
                <span className="font-bold text-lg">${splittedAmount}</span>
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-base px-4 py-2"
              onClick={handleSubmit}
            >
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SplitExpense
