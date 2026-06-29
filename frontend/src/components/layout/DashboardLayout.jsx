import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">

      {/* Navbar */}
      <Navbar />

      {/* Body Section */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
