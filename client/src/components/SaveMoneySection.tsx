const SaveMoneySection = () => {
  return (
    <div>
        <section className="bg-white py-16">
  <div className="max-w-6xl mx-auto text-center px-6">
    {/* Main Heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
      How Do We <span className="text-blue-900">Save Your Money?</span>
    </h2>
    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
      We cut out the middleman so students save more when buying and earn more when selling — a true win-win.
    </p>

    {/* Benefit Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {/* Card 1 */}
      <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
        <div className="flex justify-center mb-4">
          <span className="bg-green-100 text-green-600 p-3 rounded-full text-3xl">
            💲
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">Better Prices</h3>
        <p className="text-gray-600">
          Both buyers and sellers get better deals by cutting out the middleman.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
        <div className="flex justify-center mb-4">
          <span className="bg-blue-100 text-blue-600 p-3 rounded-full text-3xl">
            👥
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">Community</h3>
        <p className="text-gray-600">
          Connect with students from your own institution for trusted transactions.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
        <div className="flex justify-center mb-4">
          <span className="bg-orange-100 text-orange-600 p-3 rounded-full text-3xl">
            ♻️
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">Sustainable</h3>
        <p className="text-gray-600">
          Reduce waste by giving books a second life with fellow students.
        </p>
      </div>
    </div>

    {/* Comparison Chart */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Traditional */}
      <div className="bg-red-50 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-red-500 mb-4">Traditional Book Selling</h3>
        <div className="space-y-4">
          <div className="flex justify-between bg-white p-3 rounded">
            <span>Used Book’s Market Value</span>
            <span>₹300</span>
          </div>
          <div className="flex justify-between bg-red-100 p-3 rounded">
            <span>Bookstore Buys at</span>
            <span>₹150</span>
          </div>
          <div className="flex justify-between bg-white p-3 rounded">
            <span>Bookstore Sells at</span>
            <span>₹250</span>
          </div>
          <div className="bg-red-200 text-red-700 text-center p-2 rounded">
            Bookstore keeps ₹100 profit
          </div>
        </div>
      </div>

      {/* Our Platform */}
      <div className="bg-green-50 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-green-500 mb-4">Our Platform</h3>
        <div className="space-y-4">
          <div className="flex justify-between bg-white p-3 rounded">
            <span>Used Book's Market Value</span>
            <span>₹300</span>
          </div>
          <div className="flex justify-between bg-green-100 p-3 rounded">
            <span>You Sell Directly at</span>
            <span>₹200</span>
          </div>
          <div className="flex justify-between bg-white p-3 rounded">
            <span>Buyer Pays Only</span>
            <span>₹200</span>
          </div>
          <div className="flex justify-around">
            <div className="bg-green-200 text-green-700 p-2 rounded">
              Seller saves: +₹50
            </div>
            <div className="bg-green-200 text-green-700 p-2 rounded">
              Buyer saves: ₹50
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default SaveMoneySection
