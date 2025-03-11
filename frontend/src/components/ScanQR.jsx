import { useState, useRef, useEffect } from 'react'
import QrScanner from 'qr-scanner'

const ScanQR = () => {
  const [scanResult, setScanResult] = useState('')
  const videoElemRef = useRef(null)
  const [qrScanner, setQrScanner] = useState(null)

  useEffect(() => {
    if (videoElemRef.current) {
      const scanner = new QrScanner(
        videoElemRef.current,
        (result) => {
          try {
            setScanResult(JSON.parse(result.data))
            console.log("scanResult", scanResult)
            if (scanResult) {
              scanner.destroy()
            }
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
  }, [])

  const capture = () => {
    qrScanner
      ?.start()
      .then(() => console.log('started'))
      .catch((err) => console.error(err))
  }

  const stopCapture = () => {
    qrScanner
      ?.stop()
      .then(() => console.log('stopped'))
      .catch((err) => console.error(err))
  }

  const addFriend = () => {
    alert('Friend added')
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <video
        ref={videoElemRef}
        style={{ width: '300px', height: '300px', border: '1px solid white' }}
      />
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={capture}
        >
          Start Capture
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={stopCapture}
        >
          Stop Capture
        </button>
      </div>
      {scanResult && (
        <div className="flex flex-col text-green-600 text-sm m-2 p-2 rounded bg-green-50">
          <span className="font-medium">Scan Result:</span>
          <span className="font-medium">Name:</span> {scanResult.name}
          <span className="font-medium">Username:</span> {scanResult.username}
          <span className="font-medium">Address:</span> {scanResult.address}
          <button
            onClick={addFriend}
            className="bg-primary rounded-full px-4 py-1 text-gray-700"
          >
            Add Friend
          </button>
        </div>
      )}
    </div>
  )
}

export default ScanQR
