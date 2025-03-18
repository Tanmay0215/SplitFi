import { useNavigate } from 'react-router-dom'
import ScanQR from '../components/ScanQR'
import axios from 'axios'
import { useState } from 'react'

const AddFriend = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const addFriend = async () => {
    try {
      const response = await axios.post('http://localhost:3000/addfriend', {
        username: JSON.parse(localStorage.getItem('user')).name,
        name: name,
      })
      if (response.status === 200) {
        alert('Friend added successfully')
        navigate('/home')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold text-primary">Scan QR Code</h2>
      <ScanQR />
      <p className='-mt-12'>OR</p>
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          className="border-b-2 border-primary p-2 outline-none"
          placeholder="Enter Friend's Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addFriend} className="py-1 px-4 border-primary border-2 mt-4 rounded-full cursor-pointer">
          Add
        </button>
      </div>
    </div>
  )
}

export default AddFriend
