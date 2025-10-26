import { BookOpen } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <BookOpen className="h-8 w-8 text-yellow-400" />
          <h1 className="text-3xl font-bold text-yellow-400">
            Privacy & Cookie Policy
          </h1>
        </div>

        {/* Introduction */}
        <section className="bg-blue-900/50 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300">Overview</h2>
          <p className="text-white/80 leading-relaxed">
            At <span className="text-yellow-400 font-medium">BookExchange</span>, 
            we value your privacy and are committed to protecting your personal information. 
            This policy explains what data we collect, why we collect it, and how cookies 
            are used on this site.
          </p>
        </section>

        {/* What We Collect */}
        <section className="bg-blue-900/50 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300">Information We Collect</h2>
          <ul className="list-disc list-inside text-white/80 space-y-2">
            <li>
              <span className="text-yellow-400 font-medium">Account Information:</span> 
              We collect your name, email address, and password when you register.
            </li>
            <li>
              <span className="text-yellow-400 font-medium">Login Sessions:</span> 
              We use cookies to keep you signed in securely after login.
            </li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section className="bg-blue-900/50 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-white/80 space-y-2">
            <li>To create and manage your user account.</li>
            <li>To authenticate and maintain your login session.</li>
            <li>To improve platform security and prevent unauthorized access.</li>
          </ul>
        </section>

        {/* Cookie Usage */}
        <section className="bg-blue-900/50 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300">Cookie Policy</h2>
          <p className="text-white/80 leading-relaxed">
            We only use cookies that are necessary for your login session — no tracking, 
            advertising, or analytics cookies are used.
          </p>
          <ul className="list-disc list-inside text-white/80 space-y-2">
            <li>Cookies store your authentication token after you log in.</li>
            <li>They automatically expire when you log out or after a set time.</li>
            <li>Disabling cookies will log you out and prevent login functionality.</li>
          </ul>
        </section>

        {/* Data Protection */}
        <section className="bg-blue-900/50 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300">Data Protection</h2>
          <p className="text-white/80 leading-relaxed">
            Your data is stored securely and never sold or shared with third parties.
            We use encrypted connections (HTTPS) and secure JWT tokens to keep your
            information safe.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-blue-900/50 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300">Contact</h2>
          <p className="text-white/80 leading-relaxed">
            For any questions about this Privacy & Cookie Policy, please contact us at{" "}
            <span className="text-yellow-400">support@bookexchange.com</span>.
          </p>
        </section>

        {/* Last Updated */}
        <div className="text-sm text-white/50 text-center pt-6 border-t border-white/20">
          Last updated on {new Date().toLocaleDateString()}.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
