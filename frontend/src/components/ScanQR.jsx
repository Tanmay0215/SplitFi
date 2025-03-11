import { useState, useRef, useEffect } from 'react'
import QrScanner from 'qr-scanner'

const ScanQR = () => {
  const [scanResult, setScanResult] = useState(null)
  const videoElemRef = useRef(null)
  const [qrScanner, setQrScanner] = useState(null)
  const [hasScanned, setHasScanned] = useState(false)

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

  const addFriend = () => {
    alert('Friend added')
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {!hasScanned ? (
        <>
          <video
            ref={videoElemRef}
            className="size-72 border-2 border-gray-300 rounded-lg"
          />
        </>
      ) : scanResult && typeof scanResult === 'object' ? (
        <div className="flex flex-col items-start text-green-600 text-sm m-2 p-4 rounded bg-green-50 shadow-md w-full max-w-md">
          <span className="font-medium text-gray-700 mb-2">Scan Result:</span>
          <span className="font-medium text-gray-700">
            Name: {scanResult.name}
          </span>
          <span className="font-medium text-gray-700">
            Username: {scanResult.username}
          </span>
          <span className="font-medium text-gray-700">
            Address: {scanResult.address}
          </span>
          <button
            onClick={addFriend}
            className="mt-4 bg-primary rounded-full px-6 py-2 text-gray-700 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
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
