import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Insurance Pro
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/')
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 border-2 border-transparent hover:border-black'
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link
              to="/form"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/form')
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 border-2 border-transparent hover:border-black'
              }`}
              data-testid="nav-form"
            >
              Form
            </Link>
            <Link
              to="/results"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/results')
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 border-2 border-transparent hover:border-black'
              }`}
              data-testid="nav-results"
            >
              Results
            </Link>
            <Link
              to="/downloadData"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/about')
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 border-2 border-transparent hover:border-black'
              }`}
              data-testid="nav-about"
            >
              Download Data
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
