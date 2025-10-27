// src/pages/deliverManDashboard/ColonyPage.jsx
import ColonyList from "@/layout/ColonyList";
import { useParams, useNavigate } from "react-router-dom";
import { getColoniesByArea } from "@/utils/storage";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // ✅ Import added

export default function ColonyPage() {
  const { areaId } = useParams();
  const colonies = getColoniesByArea(areaId);
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ Access logout function here

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-4">
      {/* ✅ Header */}
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

      {/* ✅ Colony List */}
      <ColonyList
        colonies={colonies}
        onBack={() => navigate("/delivery-dashboard")}
        onSelectColony={(colony) =>
          navigate(
            `/delivery-dashboard/area/${areaId}/colony/${colony.id}/users`
          )
        }
      />
    </div>
  );
}
