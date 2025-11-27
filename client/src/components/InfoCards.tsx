
import { Book, Users, DollarSign, Leaf } from "lucide-react";

function cards() {
  return (
    <>
    {/* Features Section */}
<section className="py-16 md:py-20 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
              <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <DollarSign className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600 leading-relaxed">
                Buy used textbooks at up to 70% off retail prices from fellow students.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100">
              <div className="w-14 h-14 bg-green-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Leaf className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Go Green</h3>
              <p className="text-gray-600 leading-relaxed">
                Reduce waste by giving books a second life and helping the environment.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100">
              <div className="w-14 h-14 bg-purple-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Build Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with students in your school and expand your academic network.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Book className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Listing</h3>
              <p className="text-gray-600 leading-relaxed">
                List your books in minutes with our simple and intuitive selling process.
              </p>
             </div>
        </div>
    </div> 
</section>
</>
  )
}

export default cards