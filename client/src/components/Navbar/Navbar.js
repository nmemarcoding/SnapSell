import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useStore from '../../store';

const navigation = [
  { name: 'Shop', href: '#' },
  { name: 'Categories', href: '#' },
  { name: 'Deals', href: '#' },
  { name: 'Order History', href: '/orderhistory' },
];

export default function Navbar() {
  const userInfo = useStore((state) => state.userInf);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userInfo._id);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const deleteUserInfo = useStore((state) => state.deleteUserInfo);
  const handleLogout = () => {
    deleteUserInfo();
    setIsLoggedIn(false);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    setSearchQuery(event.target.value); 
    window.location.href = `/Product/${searchQuery}`; // redirect to the Product/:value page
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleRemoveFromCart = () => {
    setCartCount(cartCount - 1);
  };

  return (
    <header className="">
        
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        
        <div className="flex lg:flex-1">
          
          <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
          <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <div className="hidden lg:block mr-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

              <label htmlFor="search" className="sr-only">
                Search
              </label>
            </div>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="flex lg:hidden">
            
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/cart" className="text-sm font-semibold leading-6 text-gray-900 mr-40">
            <span aria-hidden="true">Cart</span>
            <span className="ml-1">{cartCount}</span>
          </Link>
          {isLoggedIn ? (
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleLogout}>
              Sign out <span aria-hidden="true">&rarr;</span>
            </a>
          ) : (
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
        
      </nav>
      <Dialog as="div" className="" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6">
            <ul className="-mx-4 -my-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Link to="/cart" className="block px-4 py-3 text-sm font-semibold leading-6 text-gray-900">
              <span aria-hidden="true">Cart</span>
              <span className="ml-1">{cartCount}</span>
            </Link>
          </div>
          <div className="mt-6">
            {isLoggedIn ? (
              <a href="#" className="block px-4 py-3 text-sm font-semibold leading-6 text-gray-900" onClick={handleLogout}>
                Sign out <span aria-hidden="true">&rarr;</span>
              </a>
            ) : (
              <a href="/login" className="block px-4 py-3 text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
          <div className="mt-6">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
              </div>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </form>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}