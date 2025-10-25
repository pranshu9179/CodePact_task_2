// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectTrigger,
//   SelectItem,
//   SelectContent,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { getUser, saveUser } from "@/utils/storage";
// import { useAuth } from "@/context/AuthContext";
// import BottomNav from "@/components/BottomNav";

// export default function UserDashboard() {
//   const [milkType, setMilkType] = useState("cow");
//   const [quantity, setQuantity] = useState(1);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { logout, user } = useAuth();

//   useEffect(() => {
//     const savedPrefs = getUser();
//     if (savedPrefs?.milkType) setMilkType(savedPrefs.milkType);
//     if (savedPrefs?.quantity) setQuantity(savedPrefs.quantity);
//   }, []);

//   const handleUpdate = () => {
//     const updated = { milkType, quantity };
//     saveUser(updated);
//     alert("Preferences updated successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-b from-sky-100 to-white flex flex-col md:flex-row relative">
//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg p-6 flex flex-col items-center md:items-start gap-4 transform transition-transform duration-300 ease-in-out
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         <div className="w-20 h-20 rounded-full bg-sky-400 flex items-center justify-center text-3xl font-bold text-white mb-3 animate-pulse">
//           {user?.name ? user.name[0].toUpperCase() : "U"}
//         </div>
//         <h2 className="text-xl font-bold text-sky-700">{user?.name || "User Name"}</h2>
//         <p className="text-gray-500 text-sm">{user?.email || "user@example.com"}</p>
//         <div className="space-y-1 text-gray-600 w-full">
//           <p><span className="font-medium">Role:</span> {user?.role || "N/A"}</p>
//           <p><span className="font-medium">Joined:</span> {user?.joined || "N/A"}</p>
//         </div>
//         <Button
//           onClick={() => { logout(); window.location.href = "/"; }}
//           className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm shadow-md transition-all duration-300"
//         >
//           Logout
//         </Button>
//       </aside>

//       {/* Floating profile button for mobile */}
//       <button
//         className="md:hidden fixed bottom-24 right-5 z-50 w-14 h-14 bg-sky-500 rounded-full shadow-lg text-white text-2xl flex items-center justify-center animate-bounce"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {user?.name ? user.name[0].toUpperCase() : "U"}
//       </button>

//       {/* Overlay when sidebar is open on mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-4 flex flex-col gap-6 md:ml-64">
//         <Card className="rounded-3xl shadow-lg w-full max-w-2xl mx-auto p-4 bg-white hover:shadow-2xl transition-shadow duration-300 animate-fadeIn">
//           <CardHeader className="pb-2 text-center">
//             <h2 className="text-sky-700 text-xl font-bold">Milk Preferences 🥛</h2>
//             <p className="text-gray-500 text-sm mt-1">
//               Customize your daily milk requirements
//             </p>
//           </CardHeader>

//           <CardContent className="space-y-5">
//             {/* Milk Type */}
//             <div className="flex flex-col gap-1">
//               <Label htmlFor="milkType" className="text-sm text-gray-600">
//                 Milk Type
//               </Label>
//               <Select value={milkType} onValueChange={setMilkType}>
//                 <SelectTrigger className="h-12 text-sm border-sky-200 focus:border-sky-400 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md flex items-center gap-2">
//                   <SelectValue placeholder="Select Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="cow">🐄 Cow Milk</SelectItem>
//                   <SelectItem value="buffalo">🐃 Buffalo Milk</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Quantity slider */}
//             <div className="flex flex-col gap-1">
//               <Label htmlFor="quantity" className="text-sm text-gray-600">
//                 Quantity (Litres): {quantity}
//               </Label>
//               <input
//                 id="quantity"
//                 type="range"
//                 min="0.5"
//                 max="5"
//                 step="0.5"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 className="w-full h-2 bg-sky-200 rounded-lg accent-sky-500 transition-all duration-300"
//               />
//             </div>

//             <Button
//               onClick={handleUpdate}
//               className="w-full bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium rounded-xl h-12 text-sm transition-all duration-300 shadow-md hover:shadow-lg"
//             >
//               Update Preferences
//             </Button>
//           </CardContent>
//         </Card>
//       </main>
//       <BottomNav />
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getUser, saveUser, updateUserQtyAndType, markDeliveredForUser, toggleDeliveryForUser } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";

export default function UserDashboard() {
  const [milkType, setMilkType] = useState("cow");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  // Load user preferences on mount
  useEffect(() => {
    const savedPrefs = getUser();
    setMilkType(savedPrefs?.milkType || "cow");
    setQuantity(savedPrefs?.quantity || 1);

    setUserData({
      name: user?.name || "User Name",
      email: user?.email || "user@example.com",
      role: user?.role || "N/A",
      joined: user?.joined || "N/A",
      address: savedPrefs?.address || "N/A",
      milkType: savedPrefs?.milkType || "cow",
      qty: savedPrefs?.quantity || 1,
      lastMonthTotal: savedPrefs?.lastMonthTotal || 0,
      due: savedPrefs?.due || 0,
      deliveryLog: savedPrefs?.deliveryLog || {},
      phone: savedPrefs?.phone || "N/A",
    });
  }, [user]);

  const handleUpdate = () => {
    if (!userData) return;
    const updated = { milkType: userData.milkType, quantity: userData.qty };
    saveUser(updated);
    updateUserQtyAndType(user?.id, userData.qty, userData.milkType);
    alert("Preferences updated successfully!");
  };

  const handleToggleDay = (dateStr) => {
    if (!userData) return;
    toggleDeliveryForUser(user?.id, dateStr);
    const updatedUser = { ...userData, deliveryLog: { ...userData.deliveryLog, [dateStr]: !userData.deliveryLog[dateStr] } };
    setUserData(updatedUser);
  };

  const handleMarkDelivered = () => {
    if (!userData) return;
    markDeliveredForUser(user?.id, selectedDate);
    setUserData({ ...userData, deliveryLog: { ...userData.deliveryLog, [selectedDate]: true } });
  };

  const daysWindow = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + i);
    daysWindow.push(d);
  }

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-100 to-white flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl p-6 flex flex-col items-center md:items-start gap-4 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        {/* Hamburger button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-gray-700 text-2xl font-bold"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <div className="w-24 h-24 rounded-full bg-linear-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-4xl font-bold text-white mb-3 animate-pulse shadow-lg">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <h2 className="text-2xl font-bold text-sky-700">{userData.name}</h2>
        <p className="text-gray-500 text-sm">{userData.email}</p>
        <div className="space-y-1 text-gray-600 w-full mt-2">
          <p><span className="font-medium">Role:</span> {userData.role}</p>
          <p><span className="font-medium">Joined:</span> {userData.joined}</p>
          <p><span className="font-medium">Phone:</span> {userData.phone}</p>
          <p><span className="font-medium">Address:</span> {userData.address}</p>
        </div>

        {/* Logout Button */}
        <Button
          onClick={() => { logout(); window.location.href = "/"; }}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm shadow-md transition-transform transform hover:scale-105 duration-300"
        >
          Logout
        </Button>
      </aside>

      {/* Floating hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-sky-500 rounded-full shadow-2xl text-white text-2xl flex items-center justify-center"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 flex flex-col gap-8 md:ml-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-3xl shadow-xl w-full max-w-2xl mx-auto p-6 bg-white hover:shadow-2xl transition-shadow duration-500">
            <CardHeader className="pb-4 text-center">
              <h2 className="text-sky-700 text-2xl font-extrabold">Milk Preferences & Delivery 🥛</h2>
              <p className="text-gray-500 text-sm mt-1">Manage your milk type, quantity, and delivery schedule</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Milk Type */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="milkType" className="text-sm text-gray-600 font-medium">Milk Type</Label>
                <Select value={userData.milkType} onValueChange={(v) => setUserData({ ...userData, milkType: v })}>
                  <SelectTrigger className="h-12 text-sm border-sky-200 focus:border-sky-400 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cow">🐄 Cow Milk</SelectItem>
                    <SelectItem value="buffalo">🐃 Buffalo Milk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="quantity" className="text-sm text-gray-600 font-medium">
                  Quantity (Litres)
                </Label>
                <input
                  type="number"
                  min="0.25"
                  step="0.25"
                  value={userData.qty}
                  onChange={(e) => setUserData({ ...userData, qty: Number(e.target.value) })}
                  className="w-full h-12 px-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Price & Due */}
              <div className="flex justify-between items-center p-3 bg-sky-50 rounded-xl">
                <p className="text-sm text-gray-700">Price per day: <span className="font-semibold">₹{userData.qty * (userData.milkType === "cow" ? 50 : 60)}</span></p>
                <p className="text-sm text-gray-700">Last month: <span className="font-semibold">₹{userData.lastMonthTotal}</span></p>
                <p className="text-sm text-red-600">Due: ₹{userData.due}</p>
              </div>

              {/* Delivery Calendar */}
              <div className="p-3 bg-white rounded-xl border">
                <p className="text-sm font-medium text-gray-700 mb-2">Delivery Calendar</p>
                <div className="flex gap-2 overflow-x-auto">
                  {daysWindow.map((d) => {
                    const dStr = d.toISOString().slice(0, 10);
                    const delivered = !!userData.deliveryLog[dStr];
                    return (
                      <motion.button
                        key={dStr}
                        onClick={() => handleToggleDay(dStr)}
                        whileHover={{ scale: 1.1 }}
                        className={`min-w-[62px] p-2 rounded-lg shrink-0 flex flex-col items-center justify-center border ${delivered ? "bg-emerald-100 border-emerald-300" : "bg-white"}`}
                      >
                        <span className="text-xs">{d.toLocaleString(undefined, { weekday: "short" })}</span>
                        <span className="text-sm font-semibold">{d.getDate()}</span>
                        <span className="text-xs text-gray-500">{delivered ? "✔" : "—"}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                  />
                  <Button
                    onClick={handleMarkDelivered}
                    className={userData.deliveryLog[selectedDate] ? "bg-green-400" : "bg-sky-500"}
                  >
                    {userData.deliveryLog[selectedDate] ? "Delivered Today" : "Mark Delivered Today"}
                  </Button>
                </div>
              </div>

              {/* Save & Cancel Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleUpdate} className="flex-1 bg-sky-600 hover:bg-sky-700 text-white rounded-xl">
                  Save Changes
                </Button>
                <Button onClick={() => {}} className="flex-1 bg-gray-100 text-gray-700 rounded-xl">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
