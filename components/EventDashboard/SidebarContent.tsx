import { LogoutOutlined } from "@mui/icons-material";

const SidebarContent = ({ activeTab, handleTabClick }: { activeTab: string; handleTabClick: (view: string) => void }) => (
  <>
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">Event Dashboard</h2>

      {/* Sidebar Items */}
      <ul className="space-y-3">
        {[
          { name: "View Events", key: "list" },
          { name: "Add Event", key: "add" },
          { name: "Event Table", key: "table" },
        ].map(({ name, key }) => (
          <li key={key}>
            <button
              onClick={() => handleTabClick(key)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeTab === key
                  ? "bg-indigo-600 text-white font-semibold"
                  : "hover:bg-indigo-700 hover:text-gray-300"
              }`}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Logout Button */}
    <button className="w-full flex items-center gap-2 p-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all mt-6">
      <LogoutOutlined fontSize="small" />
      Logout
    </button>
  </>
);

export default SidebarContent; 
