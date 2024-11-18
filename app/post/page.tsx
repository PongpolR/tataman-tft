import Link from "next/link";

const Header = () => {
    return (
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="text-lg font-bold">
            <Link href="/">TatamanTFT</Link>
          </div>
  
          {/* Navigation Menu */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#home"
                  className="hover:text-gray-200 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-gray-200 transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-gray-200 transition duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-gray-200 transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  