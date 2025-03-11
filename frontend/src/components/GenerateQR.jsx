import QRCode from 'qrcode'
import { useState } from 'react'

const QR = ({ data }) => {
  const [image, setImage] = useState('')

  const generateQR = async (text) => {
    try {
      const qrCodeURL = await QRCode.toDataURL(text)
      setImage(qrCodeURL)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen text-gray-300 flex flex-col items-center justify-center">
      {!image && (
        <button
          className="bg-primary text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => generateQR(JSON.stringify(data))}
        >
          Generate QR
        </button>
      )}
      {image && <img src={image} alt="QR Code" />}
    </div>
  )
}

export default QR
