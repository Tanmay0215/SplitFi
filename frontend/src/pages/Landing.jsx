import React from 'react'
import image from '/image.png'
import { useNavigate } from 'react-router-dom'
import { BookUser, Copy, Lock } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <div className="min-h-screen flex justify-between items-center md:gap-10">
        <div>
          <h1 className="text-primary text-4xl md:text-6xl font-bold max-w-md mb-2">
            MANAGE YOUR EXPENSES
          </h1>
          <h3 className="text-2xl text-lime-600 font-bold mb-4">
            AND SPLIT BILLS EASILY
          </h3>
          <div
            className="block bg-primary rounded-full px-5 py-2 border-2 border-primary cursor-pointer"
            onClick={() => navigate('/onboarding')}
          >
            Get Started
          </div>
        </div>
        <div>
          <img src={image} alt="" className="hidden md:block h-[80vh]" />
        </div>
      </div>

      {/* Features */}
      <div className="py-20 text-center">
        <h2 className="text-primary font-bold text-3xl">
          SPLIT BILLS WITH FRIENDS EASILY
        </h2>
        <h4 className="text-gray-400 text-lg font-medium">
          LEAVE THE HASSLE OF ENTERING WRONG ADDRESS
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 text-left">
          <div className="mx-auto rounded-xl flex items-center gap-5 border-2 p-5">
            <BookUser />
            <p>FRIEND LIST FOR FASTER AND EFFICIENT PAYMENTS</p>
          </div>
          <div className="rounded-xl flex items-center gap-5 border-2 p-5">
            <Lock />
            <p className="">SECURE TRANSACTIONS</p>
          </div>
          <div className="rounded-xl flex items-center gap-5 border-2 p-5">
            <Lock />
            <p className="">FRIEND LIST FOR FASTER AND EFFICIENT PAYMENTS</p>
          </div>
        </div>
      </div>

      {/* Why Us */}
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-bold text-primary text-3xl ">WHY US</h3>
        <p className="p-4 text-gray-200 text-xl">
          Trustless, transparent, and efficient alternative to traditional Web2
          expense-sharing platforms
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 text-left">
          <div className="mx-auto rounded-xl flex items-center gap-5 border-2 p-5">
            <BookUser />
            <p>FRIEND LIST FOR FASTER AND EFFICIENT PAYMENTS</p>
          </div>
          <div className="rounded-xl flex items-center gap-5 border-2 p-5">
            <Lock />
            <p className="">SECURE TRANSACTIONS</p>
          </div>
          <div className="rounded-xl flex items-center gap-5 border-2 p-5">
            <Lock />
            <p className="">FRIEND LIST FOR FASTER AND EFFICIENT PAYMENTS</p>
          </div>
        </div>
      </div>

      {/* Referral */}
      <div className="p-20 text-center">
        <h1 className="text-primary font-bold text-3xl uppercase">
          Refer and Earn
        </h1>
        <h2 className="text-primary text-xl text-center py-4">
          Invite your friends to Split It and get 1 $EDU for every friend that
          signs up
        </h2>
        <span>Share this link</span>
        <p className="text-gray-400 flex justify-center items-center gap-2 p-3">
          <span>https://split-it-blond.vercel.app/</span>
          <Copy />
        </p>
        <div className="rounded-full px-5 py-2 border-2 border-primary cursor-pointer">
          Invite Friends
        </div>
      </div>

      {/* Footer */}
      <div className="bg-primary text-gray-500 pt-2 border-t-2 w-full text-center">
        <p>© 2025 Split It</p>
      </div>
    </div>
  )
}

export default Landing
