import { LogoutOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SidebarContent = ({
  activeTab,
  handleTabClick,
}: {
  activeTab: string;
  handleTabClick: (view: string) => void;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Logout failed!");
      }

      toast.success("✅ Logged out successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "❌ Logout failed. Try again!");
    }
  };

  const tabs = [
    { name: "upcoming Events", key: "upcoming" },
    { name: "Today's Events", key: "today" },
    { name: "Past Events", key: "past" },
    { name: "Add Event", key: "add" },
  ];

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">
          Event Dashboard
        </h2>

        <ul className="space-y-3">
          {tabs.map(({ name, key }) => (
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
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-2 p-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all mt-6"
      >
        <LogoutOutlined fontSize="small" />
        Logout
      </button>
    </>
  );
};

export default SidebarContent;
