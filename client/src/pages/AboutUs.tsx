import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <>
<Navbar />
    <section className="bg-gray-50 py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Hi 👋 I’m the creator of this platform — a student who wanted to make it 
          easier and fairer for others to buy and sell used books.  
          This is a <span className="font-semibold text-green-600">non-profit project</span> 
          built out of passion and purpose — not for business.
        </p>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">
            Why I Built This
          </h2>
          <p className="text-gray-700 leading-relaxed">
            I realized that when students sell their old books to shops, they
            often receive very little — sometimes only half the real value.
            Those same books are then sold again for a much higher price.
            I wanted to fix that by creating a space where students can 
            <span className="font-semibold"> connect directly</span> and 
            exchange books at genuine, fair prices — without middlemen or extra costs.
          </p>
        </div>

        <div className="bg-green-50 rounded-xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            How You Can Contribute
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You don’t need to donate money or join a team — your contribution can
            be as simple as <span className="font-semibold">listing your books at a genuine price</span>.
            By selling your old books fairly, you help other students get what
            they need at affordable rates, while also earning a reasonable amount
            yourself.  
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Every book you list or buy here keeps knowledge circulating, saves
            money, and reduces waste. It’s a small action that makes a real impact. 🌱📚
          </p>
        </div>

        <div className="bg-yellow-50 rounded-xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
            My Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This project is driven by one simple goal — to make education
            resources more affordable for students. I’m not running it for
            profit or ads. It’s purely to support students who, like me, know the
            value of every rupee spent on learning.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">
            Together, We Can Build a Fairer System
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By choosing to sell or buy used books here, you’re already part of
            something meaningful — a small movement where students support each
            other directly, honestly, and responsibly.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Let’s make education a little lighter on the pocket and a lot 
            richer in values. 🤝
          </p>
        </div>
      </div>
    </section>
    <Footer />
  </>
  );
};

export default AboutUs;
