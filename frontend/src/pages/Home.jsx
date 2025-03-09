import { useState } from 'react'

const Home = () => {
  const { name } = JSON.parse(localStorage.getItem('user'))
  const [owe, setOwe] = useState(100)
  const [owesYou, setOwesYou] = useState(100)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-3xl text-gray-700 flex flex-col items-center leading-relaxed">
        WELCOME BACK
        <span className="text-4xl font-bold text-gray-800">
          {name.toUpperCase()}
        </span>
        <div className="mt-8 flex space-x-10">
          <div className="p-6 bg-white shadow-md rounded-md">
            <div className="text-lg font-semibold text-gray-600">You Owe</div>
            <div className="text-2xl font-bold text-red-600">${owe}</div>
          </div>
          <div className="p-6 bg-white shadow-md rounded-md">
            <div className="text-lg font-semibold text-gray-600">Owes You</div>
            <div className="text-2xl font-bold text-green-600">${owesYou}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
