import React from 'react'

const UserCard = ({ data }) => {
  return (
    <div className="flex items-center bg-gray-700 rounded-2xl p-3 gap-4">
      <div className="rounded-full size-10 flex items-center justify-center bg-gray-800 text-white text-sm font-bold">
        {data.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex items-baseline gap-3 text-white text-base">
        <p className="font-semibold">{data.name}</p>
        <p className='text-xs text-gray-300'>@{data.ensName}</p>
      </div>
    </div>
  )
}

export default UserCard
