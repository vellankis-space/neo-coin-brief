
import { Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold">CryptoInsights AI</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">About</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Linkedin /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">
              © 2025 CryptoInsights AI. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Not financial advice. Content for informational purposes only.
            </p>
            <div className="mt-4 flex space-x-4 justify-end">
              <a href="#" className="text-xs text-gray-400 hover:text-white">Unsubscribe</a>
              <a href="#" className="text-xs text-gray-400 hover:text-white">Update Preferences</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
