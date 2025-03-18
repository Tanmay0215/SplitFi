import ScanQR from '../components/ScanQR'

const AddFriend = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 gap-4">
      <h2 className="text-2xl font-semibold text-primary">Scan QR Code</h2>
      <ScanQR />
    </div>
  )
}

export default AddFriend
