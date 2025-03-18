import image from '/image.png'
import { Link } from 'react-router-dom'
import {
  CreditCard,
  Users,
  Shield,
  Wallet,
  CheckCircle,
  QrCode,
} from 'lucide-react'

const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col md:flex-row justify-between items-center px-6 md:px-16 lg:px-24 w-full">
        <div className="md:max-w-xl mb-12 md:mb-0 text-center md:text-left">
          <h1 className="text-primary text-4xl md:text-6xl font-bold mb-4 leading-tight">
            MANAGE YOUR EXPENSES
          </h1>
          <h3 className="text-2xl text-lime-600 font-semibold mb-8 md:mb-10">
            AND SPLIT BILLS EASILY
          </h3>
          <p className="text-gray-300 mb-8 max-w-lg">
            The smart way to track expenses, split bills with friends, and
            organize your finances all in one place.
          </p>
          <Link
            to={'/onboarding'}
            className="bg-primary text-black font-semibold rounded-full px-8 py-3 cursor-pointer hover:bg-opacity-90 transition-all inline-block shadow-lg hover:shadow-primary/30"
          >
            Get Started
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl z-0"></div>
          <img
            src={image}
            alt="Split expenses app"
            className="hidden md:block h-[70vh] relative z-10"
          />
        </div>
      </div>

      {/* Features */}
      <div className="py-24 w-full px-6 md:px-16 lg:px-24 bg-black/30">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-primary font-bold text-3xl mt-2 mb-3">
            SPLIT BILLS WITH FRIENDS EASILY
          </h2>
          <h4 className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            Smart tools that make expense sharing quick and hassle-free
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="rounded-xl flex flex-col items-start gap-4 border border-primary/30 p-6 hover:border-primary/60 transition-all hover:shadow-md hover:shadow-primary/10 bg-black/20">
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-semibold text-white">Friend Management</h3>
            <p className="text-gray-400">
              Create and manage your friend list for faster and efficient
              payments
            </p>
          </div>

          <div className="rounded-xl flex flex-col items-start gap-4 border border-primary/30 p-6 hover:border-primary/60 transition-all hover:shadow-md hover:shadow-primary/10 bg-black/20">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-semibold text-white">Secure Transactions</h3>
            <p className="text-gray-400">
              All transactions are secured with the latest encryption technology
            </p>
          </div>

          <div className="rounded-xl flex flex-col items-start gap-4 border border-primary/30 p-6 hover:border-primary/60 transition-all hover:shadow-md hover:shadow-primary/10 bg-black/20">
            <div className="p-3 rounded-lg bg-primary/10">
              <QrCode className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-semibold text-white">Add User via QR </h3>
            <p className="text-gray-400">
              Add friends easily by scanning their unique QR code
            </p>
          </div>
        </div>
      </div>

      {/* Why Us */}
      <div className="py-24 w-full px-6 md:px-16 lg:px-24">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Benefits
          </span>
          <h3 className="font-bold text-primary text-3xl mt-2 mb-3">
            WHY CHOOSE US
          </h3>
          <p className="mx-auto max-w-2xl text-gray-300 text-lg">
            Trustless, transparent, and efficient alternative to traditional
            expense-sharing platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="rounded-xl flex flex-col items-start gap-4 p-6 bg-gradient-to-br from-black to-black/60 border border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Wallet className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-semibold text-white">Easy Settlements</h3>
            <p className="text-gray-400">
              Settle debts quickly and easily with integrated payment options
            </p>
          </div>

          <div className="rounded-xl flex flex-col items-start gap-4 p-6 bg-gradient-to-br from-black to-black/60 border border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-semibold text-white">Simplified Splitting</h3>
            <p className="text-gray-400">
              Split bills equally or customize amounts for each person
            </p>
          </div>

          <div className="rounded-xl flex flex-col items-start gap-4 p-6 bg-gradient-to-br from-black to-black/60 border border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <CreditCard className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-semibold text-white">
              Multiple Payment Methods
            </h3>
            <p className="text-gray-400">
              Support for various payment methods to suit your preferences
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/50 to-primary/20 rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to split bills hassle-free?
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg">
              Join thousands of users who are already managing their expenses
              efficiently.
            </p>
            <Link
              to={'/onboarding'}
              className="bg-primary text-black font-semibold rounded-full px-8 py-3 cursor-pointer hover:bg-opacity-90 transition-all inline-block"
            >
              Start Now — It's Free
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-primary font-bold text-2xl">Split It</h2>
              <p className="text-gray-500">Simplify your shared expenses</p>
            </div>
            <div className="text-gray-500">
              <p>© 2025 Rights Reserved. Split It</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
