import {  Twitter, Linkedin, Github } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-orange-50 text-black text-center py-9">
      <h1 className="text-xl font-bold ">RE-READ</h1>
      <p className="text-sm mb-6 ">A platform to sell and buy used books</p>
      <div className="flex justify-center gap-8">
        <a
                href="https://x.com/Anujx01"
                target="_blank"
                rel="noopener noreferrer"
              >
        <Twitter></Twitter></a>
         <a
                href="https://github.com/Anuj012004/"
                target="_blank"
                rel="noopener noreferrer"
              >
        <Github></Github></a>
          <a
                href="https://www.linkedin.com/in/anuj-667a66336"
                target="_blank"
                rel="noopener noreferrer"
              >
        <Linkedin></Linkedin>
        </a>
      </div>
     <p className="text-sm mt-6">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
