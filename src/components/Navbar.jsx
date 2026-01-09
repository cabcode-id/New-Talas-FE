import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Moon, Sun, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDarkMode } from "../hooks/useDarkMode";
import { getClusters } from "../services/api/clusterService";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allCluster, setCluster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  // Helper function to check if a path is active
  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const topicsBarRef = useRef(null);

  useEffect(() => {
    const fetchClusters = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getClusters();
        setCluster(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleCategoryClick = () => {
    setIsDropdownOpen(false);
    setIsOpen(false);
  };

  // Dynamic nav link classes based on active state
  const getNavLinkClasses = (path) => {
    const baseClasses = "px-3 py-1.5 text-sm font-medium transition-colors duration-200";
    return isActive(path)
      ? `nav-link-active ${baseClasses}`
      : `nav-link ${baseClasses}`;
  };

  const getMobileNavLinkClasses = (path) => {
    const baseClasses = "block px-3 py-3 text-base font-medium rounded-lg transition-colors";
    return isActive(path)
      ? `nav-link-active ${baseClasses}`
      : `mobile-nav-link ${baseClasses}`;
  };

  // Topic chips for the secondary bar (from clusters or static)
  const topicChips = Object.values(allCluster.clusters || {});

  return (
    <div className="navbar-container sticky top-0 z-40 w-full">
      {/* Main Navbar */}
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">

            {/* Left Section: Hamburger + Logo + Nav Links */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="icon-button md:hidden p-1.5 rounded transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Logo */}
              <Link to="/home" className="flex items-center">
                <img
                  className="h-10 w-auto"
                  src="/Talas.svg"
                  alt="Talas"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1 ml-2">
                <Link
                  to="/home"
                  className={getNavLinkClasses('/home')}
                >
                  Home
                </Link>

                <div className="relative">
                  <button
                    ref={buttonRef}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`${isActive('/news/cluster') ? 'nav-link-active' : 'nav-link'} flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none`}
                  >
                    Category
                    <ChevronDown
                      size={14}
                      className={`transform transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="nav-dropdown absolute left-0 mt-2 w-56 origin-top-left rounded-lg shadow-xl border overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b text-xs font-semibold uppercase tracking-wider opacity-60">
                        Browse by Topic
                      </div>

                      <div className="max-h-[60vh] overflow-y-auto py-1">
                        {loading ? (
                          <div className="flex items-center justify-center py-6">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-current opacity-50" />
                          </div>
                        ) : error ? (
                          <div className="px-4 py-3 text-sm text-red-400">
                            Unable to load topics.
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            {topicChips.map((cluster, index) => (
                              <Link
                                key={index}
                                to={`/news/cluster/${index}`}
                                onClick={handleCategoryClick}
                                className="nav-dropdown-item px-4 py-2 text-sm transition-colors"
                              >
                                {cluster}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to="/about-us"
                  className={getNavLinkClasses('/about-us')}
                >
                  About Us
                </Link>
              </nav>
            </div>

            {/* Right Section: Search + Subscribe + Theme */}
            <div className="flex items-center gap-2">
              {/* Search Bar */}
              <div className="hidden sm:block w-36 lg:w-44">
                <SearchBar />
              </div>

              {/* Subscribe Button - Golden/Amber like Ground News */}
              <a
                href="http://pukulenam.id"
                className="whitespace-nowrap rounded px-4 py-1.5 text-sm font-semibold text-[#1a1a1a] bg-[#D4A84B] hover:bg-[#E0B85C] transition-colors active:scale-95"
              >
                Subscribe
              </a>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="icon-button hidden sm:flex p-2 rounded transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Topic Chips Bar - Secondary Navigation */}
      <div className="border-b overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={topicsBarRef}
            className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              <div className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 w-24 bg-current opacity-10 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              topicChips.map((topic, index) => (
                <Link
                  key={index}
                  to={`/news/cluster/${index}`}
                  className="topic-chip flex items-center gap-1 px-3 py-1 text-xs font-medium bg-transparent rounded transition-colors whitespace-nowrap group"
                >
                  <span>{topic}</span>
                  <Plus size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu md:hidden fixed inset-0 z-50 top-12">
          <div className="p-4 space-y-4 h-full overflow-y-auto pb-24">
            {/* Mobile Search */}
            <div className="pb-4 border-b">
              <SearchBar />
            </div>

            <nav className="space-y-1">
              <Link to="/home" onClick={() => setIsOpen(false)} className={getMobileNavLinkClasses('/home')}>
                Home
              </Link>

              <div className="space-y-1">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between ${isActive('/news/cluster') ? 'nav-link-active' : 'mobile-nav-link'} block px-3 py-3 text-base font-medium rounded-lg transition-colors`}
                >
                  Category
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="ml-4 pl-4 border-l-2 space-y-1">
                    {loading ? (
                      <div className="py-2 text-sm opacity-50">Loading...</div>
                    ) : (
                      topicChips.map((cluster, index) => (
                        <Link
                          key={index}
                          to={`/news/cluster/${index}`}
                          onClick={handleCategoryClick}
                          className="nav-dropdown-item block py-2 text-sm"
                        >
                          {cluster}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>

              <Link to="/about-us" onClick={() => setIsOpen(false)} className={getMobileNavLinkClasses('/about-us')}>
                About Us
              </Link>
            </nav>

            <div className="pt-6 mt-6 border-t">
              <a
                href="http://pukulenam.id"
                className="flex items-center justify-center w-full rounded-lg px-4 py-3 text-base font-bold text-[#1a1a1a] bg-[#D4A84B] active:scale-95 transition-transform"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;