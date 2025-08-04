
import { Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold">CryptoInsights AI</h3>
            <p className="text-sm text-gray-400 mt-2">
              © 2025 CryptoInsights AI. All rights reserved.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Links</h4>
            <div className="mt-4 flex flex-col space-y-2">
              <a href="#" className="text-gray-400 hover:text-white">About</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Social Media</h4>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Linkedin /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Youtube /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-xs text-gray-500">
          <p>
            This newsletter provides information for educational purposes only. Past performance does not guarantee future results. Always do your own research before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
