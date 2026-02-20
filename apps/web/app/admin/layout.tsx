import Sidebar from "../../components/MajorElements/Sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar stays still */}
      <aside className="w-64 shrink-0">
        <Sidebar />
      </aside>

      {/* Scrollable content */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-auto bg-white p-6">
        {children}
      </main>
    </div>
  );
}
