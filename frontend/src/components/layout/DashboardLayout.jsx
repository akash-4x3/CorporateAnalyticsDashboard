import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;