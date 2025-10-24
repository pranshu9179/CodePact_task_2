// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { getDeliveries, saveDeliveries, markDelivered } from "@/utils/storage";

// import { useAuth } from "@/context/AuthContext";

// const mockAddresses = [
//   {
//     id: 1,
//     state: "UP",
//     city: "Lucknow",
//     area: "Gomti Nagar",
//     block: "B1",
//     flat: "A-103",
//     type: "Cow",
//     qty: 2,
//   },
//   {
//     id: 2,
//     state: "UP",
//     city: "Lucknow",
//     area: "Aliganj",
//     block: "C2",
//     flat: "B-45",
//     type: "Buffalo",
//     qty: 1.5,
//   },
// ];

// export default function DeliveryDashboard() {
//   const [deliveries, setDeliveries] = useState([]);
//   const { logout } = useAuth();

//   useEffect(() => {
//     // Load saved deliveries or initialize
//     const saved = getDeliveries();
//     if (saved.length === 0) {
//       saveDeliveries(mockAddresses);
//       setDeliveries(mockAddresses);
//     } else {
//       setDeliveries(saved);
//     }
//   }, []);

//   const handleDeliver = (id) => {
//     markDelivered(id);
//     const updated = getDeliveries();
//     setDeliveries(updated);
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-b from-sky-50 to-white p-4 space-y-4">
//       <Button
//         onClick={logout}
//         className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm mb-2"
//       >
//         Logout
//       </Button>

//       <h2 className="text-center text-lg font-semibold text-sky-700">
//         Delivery Overview 🚚
//       </h2>

//       <div className="space-y-3">
//         {deliveries.map((addr) => {
//           const isDelivered = addr.delivered;

//           return (
//             <Card
//               key={addr.id}
//               className={`rounded-2xl shadow-sm transition-all duration-300 ${
//                 isDelivered ? "bg-green-50 border border-green-200" : "bg-white"
//               }`}
//             >
//               <CardHeader className="pb-2">
//                 <div className="text-sm text-gray-700 leading-snug">
//                   <p className="font-semibold text-sky-800">
//                     {addr.state}, {addr.city}
//                   </p>
//                   <p>
//                     {addr.area}, {addr.block}, {addr.flat}
//                   </p>
//                 </div>
//                 <div className="text-right mt-1">
//                   <span className="text-xs text-sky-600 font-medium">
//                     {addr.qty} L {addr.type} Milk
//                   </span>
//                 </div>
//               </CardHeader>

//               <CardContent>
//                 <Button
//                   disabled={isDelivered}
//                   onClick={() => handleDeliver(addr.id)}
//                   className={`w-full h-9 rounded-xl text-sm font-medium ${
//                     isDelivered
//                       ? "bg-green-500 text-white cursor-default"
//                       : "bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white"
//                   }`}
//                 >
//                   {isDelivered ? "Delivered ✅" : "Mark as Delivered"}
//                 </Button>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDeliveries, saveDeliveries, markDelivered } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";

const mockAddresses = [
  {
    id: 1,
    state: "UP",
    city: "Lucknow",
    area: "Gomti Nagar",
    block: "B1",
    flat: "A-103",
    type: "Cow",
    qty: 2,
  },
  {
    id: 2,
    state: "UP",
    city: "Lucknow",
    area: "Aliganj",
    block: "C2",
    flat: "B-45",
    type: "Buffalo",
    qty: 1.5,
  },
  {
    id: 3,
    state: "UP",
    city: "Kanpur",
    area: "Swaroop Nagar",
    block: "D3",
    flat: "C-12",
    type: "Cow",
    qty: 3,
  },
  {
    id: 4,
    state: "UP",
    city: "Prayagraj",
    area: "Civil Lines",
    block: "A2",
    flat: "D-201",
    type: "Buffalo",
    qty: 2.5,
  },
  {
    id: 5,
    state: "UP",
    city: "Varanasi",
    area: "Bhelupur",
    block: "E1",
    flat: "E-15",
    type: "Cow",
    qty: 1,
  },
  {
    id: 6,
    state: "UP",
    city: "Lucknow",
    area: "Hazratganj",
    block: "F4",
    flat: "F-9",
    type: "Buffalo",
    qty: 2,
  },
];


export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const saved = getDeliveries();
    if (saved.length === 0) {
      saveDeliveries(mockAddresses);
      setDeliveries(mockAddresses);
    } else {
      setDeliveries(saved);
    }
  }, []);

  const handleDeliver = (id) => {
    markDelivered(id);
    const updated = getDeliveries();
    setDeliveries(updated);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 to-white flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg p-6 flex flex-col items-center md:items-start gap-4 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="w-20 h-20 rounded-full bg-sky-400 flex items-center justify-center text-3xl font-bold text-white mb-3 animate-pulse">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <h2 className="text-xl font-bold text-sky-700">{user?.name || "User Name"}</h2>
        <p className="text-gray-500 text-sm">{user?.email || "user@example.com"}</p>
        <div className="space-y-1 text-gray-600 w-full">
          <p><span className="font-medium">Role:</span> {user?.role || "N/A"}</p>
          <p><span className="font-medium">Joined:</span> {user?.joined || "N/A"}</p>
        </div>
        <Button
          onClick={logout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm shadow-md transition-all duration-300"
        >
          Logout
        </Button>
      </aside>

      {/* Floating profile button for mobile */}
      <button
        className="md:hidden fixed bottom-24 right-5 z-50 w-14 h-14 bg-sky-500 rounded-full shadow-lg text-white text-2xl flex items-center justify-center animate-bounce"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {user?.name ? user.name[0].toUpperCase() : "U"}
      </button>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col gap-6 md:ml-64">
        <h2 className="text-center text-lg font-semibold text-sky-700 animate-pulse">
          Delivery Overview 🚚
        </h2>

        <div className="space-y-4">
          {deliveries.map((addr) => {
            const isDelivered = addr.delivered;
            return (
              <Card
                key={addr.id}
                className={`rounded-3xl shadow-md transition-transform duration-300 hover:-translate-y-1 ${
                  isDelivered ? "bg-green-50 border border-green-200" : "bg-white"
                }`}
              >
                <CardHeader className="pb-2 flex justify-between items-start">
                  <div className="text-sm text-gray-700 leading-snug">
                    <p className="font-semibold text-sky-800">
                      {addr.state}, {addr.city}
                    </p>
                    <p>
                      {addr.area}, {addr.block}, {addr.flat}
                    </p>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-sky-600 font-medium">
                      {addr.qty} L {addr.type} Milk
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <Button
                    disabled={isDelivered}
                    onClick={() => handleDeliver(addr.id)}
                    className={`w-full h-10 rounded-xl text-sm font-medium shadow-md transition-all duration-300 ${
                      isDelivered
                        ? "bg-green-500 text-white cursor-default"
                        : "bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white"
                    }`}
                  >
                    {isDelivered ? "Delivered ✅" : "Mark as Delivered"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
