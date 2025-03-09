import React from 'react'

const Dashboard = () => {
  return (
    <div className="p-5 text-gray-300">
      <div className="text-3xl font-bold">Spent Analysis</div>

      <div className="grid grid-cols-2 gap-5 pt-10">
        <div className="border-2 border-gray-200 rounded p-20">Chart 1</div>
        <div className="border-2 border-gray-200 rounded p-20">Chart 2</div>
        <div className="border-2 border-gray-200 rounded p-20">Chart 3</div>
        <div className="border-2 border-gray-200 rounded p-20">Chart 4</div>
      </div>
    </div>
  )
}

export default Dashboard
