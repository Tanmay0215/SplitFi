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

  // const fetchAllFriendsPayout = async () => {
  //   const response = await axios.get('http://localhost:3000/payouts', {
  //     name: name,
  //   })
  //   console.log(response.data)
  // }

  useEffect(() => {
    fetchAllFriends()
    // fetchAllFriendsPayout()
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
    // try {
    //   selectedFriends.map(async (friend) => {
    //     const response = await axios.post('http://localhost:3000/payouts', {
    //       name: friend,
    //       amount: splittedAmount,
    //       ownerName: name,
    //     })
    //     console.log(response.data)
    //     if (response.status === 200) {
    //       console.log('Expense added successfully' + friend + splittedAmount)
    //     }
    //   })
    // } catch (error) {
    //   console.error('Error adding expense:', error.message)
    // }
    setIsOpen(false)
    setAmount('')
    setSelectedFriends([])
  }

  return (
    <div className={`${isOpen ? 'w-full mx-auto' : 'hidden'}`}>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full min-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-6 uppercase">
          Add Expense
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300"
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
                className="w-full rounded-md text-lg py-1 outline-none border-b-2 mb-5 text-gray-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Split with
            </label>
            <div className="space-y-3 max-h-36 overflow-y-auto p-2 border border-gray-400 rounded-md text-base">
              {allFriends.map((friend) => (
                <div key={friend.username} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedFriends.includes(friend.name)}
                    className="size-4 rounded"
                    onChange={(e) => handleChange(e, friend)}
                  />
                  <label
                    htmlFor={`friend-${friend.username}`}
                    className="ml-3 flex items-center"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-2">
                      {friend.name.charAt(0)}
                    </div>
                    <span className="text-gray-200">
                      {friend.name}{' '}
                      <span className="text-gray-400 text-sm">
                        ({friend.ensName})
                      </span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {amount && selectedFriends.length > 0 && (
            <div className="mb-2 rounded-md text-base">
              <p className="text-gray-300 font-medium text-md py-2">
                {selectedFriends.map((friend) => (
                  <div key={friend} className="mr-2">
                    <p>{friend}</p>
                    <span className="font-bold text-lg">${splittedAmount}</span>
                  </div>
                ))}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-3 bg-primary text-gray-700 font-medium rounded-md text-base px-4 py-2"
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
