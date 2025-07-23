import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Only auto-open sidebar on desktop
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up the event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const handleClickOutside = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 drawer lg:drawer-open" onClick={handleClickOutside}>
      <input 
        id="my-drawer" 
        type="checkbox" 
        className="drawer-toggle" 
        checked={isSidebarOpen}
        onChange={() => {}} // Controlled by state
      />
      
      {/* Drawer Sidebar */}
      <div className="drawer-side z-40">
        <label 
          htmlFor="my-drawer" 
          className="drawer-overlay"
          onClick={(e) => e.stopPropagation()}
        ></label>
        <div 
          className="bg-base-200 w-64 h-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="drawer-content flex flex-col h-screen overflow-hidden">
        <Navbar 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile} 
        />
        <main className="flex-1 overflow-y-auto p-2 md:p-4 bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
