import { useEffect, useState } from "react";
import AreaList from "@/layout/AreaList";
import ColonyList from "@/layout/ColonyList";
import UserList from "@/layout/UserList";
import UserDetailsDialog from "@/layout/UserDetailsDialog";
import { getAreas, getColoniesByArea, getUsersByColony } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function DeliveryDashboard() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [colonies, setColonies] = useState([]);
  const [selectedColony, setSelectedColony] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const loadedAreas = getAreas();
    setAreas(getAreas());
  }, []);

  //   useEffect(() => {
  //   const loadedAreas = getAreas();
  //   setAreas(loadedAreas);

  //   // Auto-select first area and first colony if available
  //   if (loadedAreas.length > 0) {
  //     const firstArea = loadedAreas[0];
  //     setSelectedArea(firstArea);

  //     const loadedColonies = getColoniesByArea(firstArea.id);
  //     setColonies(loadedColonies);

  //     if (loadedColonies.length > 0) {
  //       const firstColony = loadedColonies[0];
  //       setSelectedColony(firstColony);

  //       // Load users immediately
  //       setUsers(getUsersByColony(firstColony.id));
  //     }
  //   }
  // }, []);

  const handleSelectArea = (area) => {
    setSelectedArea(area);
    setColonies(getColoniesByArea(area.id));
    setSelectedColony(null);
    setUsers([]);
  };

  const handleBackToAreas = () => {
    setSelectedArea(null);
    setColonies([]);
    setSelectedColony(null);
    setUsers([]);
  };

  const handleSelectColony = (colony) => {
    setSelectedColony(colony);
    setUsers(getUsersByColony(colony.id));
  };

  const handleBackToColonies = () => {
    setSelectedColony(null);
    setUsers([]);
  };

  const handleOpenUser = (user) => {
    setSelectedUserId(user.id);
    setDialogOpen(true);
  };

  const refreshUsers = () => {
    if (selectedColony) setUsers(getUsersByColony(selectedColony.id));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 to-white p-4">
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

      <main>
        {!selectedArea && (
          <section>
            <h2 className="text-sm font-medium text-gray-600 mb-2">Areas</h2>
            <AreaList areas={areas} onSelectArea={handleSelectArea} />
          </section>
        )}

        {selectedArea && !selectedColony && (
          <section className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-lg font-semibold text-sky-700">
                  {selectedArea.name}
                </p>
                <p className="text-xs text-gray-500">Choose a colony</p>
              </div>
            </div>
            <ColonyList
              colonies={colonies}
              onBack={handleBackToAreas}
              onSelectColony={handleSelectColony}
            />
          </section>
        )}

        {selectedArea && selectedColony && (
          <section className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-lg font-semibold text-sky-700">
                  {selectedColony.name}
                </p>
                <p className="text-xs text-gray-500">{selectedArea.name}</p>
              </div>
            </div>

            <UserList
              users={users}
              onBack={handleBackToColonies}
              onOpenUser={handleOpenUser}
            />
          </section>
        )}
      </main>

      <UserDetailsDialog
        userId={selectedUserId}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSaved={() => {
          setDialogOpen(false);
          refreshUsers();
        }}
      />
    </div>
  );
}
