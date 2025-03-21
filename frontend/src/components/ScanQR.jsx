import { useState, useRef, useEffect } from 'react'
import QrScanner from 'qr-scanner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ScanQR = () => {
  const [scanResult, setScanResult] = useState(null)
  const videoElemRef = useRef(null)
  const [qrScanner, setQrScanner] = useState(null)
  const [hasScanned, setHasScanned] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let scanner = null
    if (videoElemRef.current) {
      scanner = new QrScanner(
        videoElemRef.current,
        (result) => {
          try {
            const parsedResult = JSON.parse(result.data)
            setScanResult(parsedResult)
            setHasScanned(true)
            console.log('scanResult', parsedResult)
            scanner.destroy()
          } catch (error) {
            console.error('Error parsing JSON:', error)
            setScanResult('Error: Invalid QR code format')
          }
        },
        {
          highlightCode: true,
        }
      )
      setQrScanner(scanner)
    }

    if (scanner) {
      scanner.start().catch((err) => console.error(err))
    }

    return () => {
      scanner?.destroy()
    }
  }, [])

  const addFriend = async () => {
    try {
      const response = await axios.post('https://splitfi.onrender.com/addfriend', {
        username: JSON.parse(localStorage.getItem('user')).name,
        name: scanResult.name,
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
    <div className="flex flex-col items-center justify-center">
      {!hasScanned ? (
        <>
          <video ref={videoElemRef} className="size-72 rounded-lg" />
        </>
      ) : scanResult && typeof scanResult === 'object' ? (
        <div className="flex flex-col items-center text-green-600 text-base m-2 p-8 rounded bg-gray-700 shadow-md w-full max-w-md">
          <span className="font-medium text-gray-300 mb-2">Scan Result:</span>
          <span className="font-medium text-gray-300">
            Name: {scanResult.name}
          </span>
          <span className="font-medium text-gray-300">
            Username: {scanResult.username}
          </span>
          <button
            onClick={addFriend}
            className="mt-6 bg-primary rounded-full px-6 py-2 text-gray-700 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Add Friend
          </button>
        </div>
      ) : (
        <div>{scanResult}</div>
      )}
    </div>
  )
}

export default ScanQR
