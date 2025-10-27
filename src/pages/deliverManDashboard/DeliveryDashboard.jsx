// src/pages/deliverManDashboard/DeliveryDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AreaList from "@/layout/AreaList";
import ColonyList from "@/layout/ColonyList";
import UserList from "@/layout/UserList";
import { getAreas, getColoniesByArea, getUsersByColony } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function DeliveryDashboard() {
  const [areas, setAreas] = useState([]);
  const [colonies, setColonies] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { areaId, colonyId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const loadedAreas = getAreas();
    setAreas(loadedAreas);

    if (areaId) {
      const selectedColonies = getColoniesByArea(areaId);
      setColonies(selectedColonies);
    }

    if (colonyId) {
      const selectedUsers = getUsersByColony(colonyId);
      setUsers(selectedUsers);
    }
  }, [areaId, colonyId, location.pathname]);

  const handleSelectArea = (area) => {
    navigate(`/delivery-dashboard/area/${area.id}/colonies`);
  };

  const handleSelectColony = (colony) => {
    navigate(`/delivery-dashboard/area/${areaId}/colony/${colony.id}/users`);
  };

  const handleBack = () => {
    if (colonyId) {
      navigate(`/delivery-dashboard/area/${areaId}/colonies`);
    } else if (areaId) {
      navigate(`/delivery-dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-4">
      <header className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">My Deliveries</h1>
          <p className="text-md text-gray-800">
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

      <main>
        {/* ✅ Show Area List */}
        {!areaId && (
          <section>
            <h2 className="text-md font-bold text-gray-900 mb-2">Areas</h2>
            <AreaList areas={areas} onSelectArea={handleSelectArea} />
          </section>
        )}

        {/* ✅ Show Colony List */}
        {areaId && !colonyId && (
          <section className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handleBack}
                className="px-3 py-2 rounded-lg bg-white shadow text-sm"
              >
                ← Back
              </button>
              <p className="text-sm text-gray-600">Colonies</p>
              <div className="w-10" />
            </div>

            <ColonyList
              colonies={colonies}
              onSelectColony={handleSelectColony}
              onBack={handleBack}
            />
          </section>
        )}

        {/* ✅ Show User List */}
        {areaId && colonyId && (
          <section className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handleBack}
                className="px-3 py-2 rounded-lg bg-white shadow text-sm"
              >
                ← Back
              </button>
              <p className="text-sm text-gray-600">Users</p>
              <div className="w-10" />
            </div>

            <UserList users={users} onBack={handleBack} />
          </section>
        )}
      </main>
    </div>
  );
}
