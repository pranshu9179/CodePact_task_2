import UserList from "@/layout/UserList";
import { useParams, useNavigate } from "react-router-dom";
import { getUsersByColony } from "@/utils/storage";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // ✅ Added import

export default function UserListPage() {
  const { areaId, colonyId } = useParams();
  const users = getUsersByColony(colonyId);
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ Added line to get logout function

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-4">
      {/* ✅ Consistent Header */}
      <header className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">My Deliveries</h1>
          <p className="text-xs text-gray-500">
            Select area → colony → customer
          </p>
        </div>
        <Button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
          className="bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md text-sm"
        >
          Logout
        </Button>
      </header>

      {/* ✅ User List Section */}
      <UserList
        users={users}
        onBack={() => navigate(`/delivery-dashboard/area/${areaId}/colonies`)}
      />
    </div>
  );
}
