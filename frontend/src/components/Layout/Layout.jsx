import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Toast from '../Toast/Toast';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-vh-100">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.4)', zIndex: 999 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="container-fluid">
        <div className="row">
          <div
            className={`col-lg-3 col-xl-2 d-lg-block ${sidebarOpen ? 'd-block' : 'd-none'}`}
          >
            <Sidebar />
          </div>

          <main className="col-lg-9 col-xl-10 py-4 px-lg-4">
            <div className="animate-fade">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <Toast />
    </div>
  );
};

export default Layout;
