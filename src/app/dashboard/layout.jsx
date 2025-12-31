import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      {/* SIDEBAR (FIXED) */}
      <div className="fixed inset-y-0 left-0 w-64 z-30">
        <Sidebar />
      </div>

      {/* MAIN AREA */}
      <div className="ml-64 flex flex-col h-full">
        {/* NAVBAR (STICKY) */}
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>

        {/* CONTENT (SCROLL DI SINI) */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
