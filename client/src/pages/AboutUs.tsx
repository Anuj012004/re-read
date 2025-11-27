import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-12 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-orange-400 mb-6">About Us</h1>
          {/* Why This Was Built */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8 text-left">
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">
              Why This Platform
            </h2>
            <p className="text-gray-700 leading-relaxed">
              In many cases, when old books are sold to local shops, students
              receive very little in return — sometimes barely half of the
              book’s actual worth. Those same books are then resold at
              significantly higher prices. This unfair cycle inspired the need
              for a place where students could{" "}
              <span className="font-semibold">connect directly</span>, avoiding
              middlemen and pricing barriers, and exchange books at
              honest, genuine rates.
            </p>
          </div>

          {/* Contribution */}
          <div className="bg-green-50 rounded-xl shadow-md p-6 md:p-8 mb-8 text-left">
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">
              How You Can Contribute
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You don’t need to donate money or join a committee. Your
              contribution is as simple as{" "}
              <span className="font-semibold">listing your books at a fair price</span>.
              By doing so, you help another student who needs that book, while
              also earning a reasonable amount yourself.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Every listing, every purchase, and every shared book helps reduce
              waste, encourages sustainability, and makes education more
              accessible. Small actions truly create meaningful change.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-yellow-50 rounded-xl shadow-md p-6 md:p-8 mb-8 text-left">
            <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This platform is driven by a simple mission — to make educational
              resources more affordable and accessible for students. It operates
              without ads, without profit motives, and without commercial
              intentions. The focus is purely on helping students make smarter,
              more sustainable choices when it comes to buying and selling books.
            </p>
          </div>

          {/* Closing Message */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 text-left">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Together, We Can Build a Fairer System
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By choosing to exchange books here, you’re contributing to
              something meaningful — a community where students support one
              another directly, honestly, and responsibly.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Let’s make education more affordable, reduce unnecessary waste, and
              build a culture where knowledge keeps moving forward.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;

