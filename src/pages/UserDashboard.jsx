// // import { useState, useEffect } from "react";
// // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectItem,
// //   SelectContent,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { getUser, saveUser } from "@/utils/storage";
// // import { useAuth } from "@/context/AuthContext";
// // import BottomNav from "@/components/BottomNav";

// // export default function UserDashboard() {
// //   const [milkType, setMilkType] = useState("cow");
// //   const [quantity, setQuantity] = useState(1);
// //   const { logout, user } = useAuth(); // add user info

// //   // Load saved preferences on mount
// //   useEffect(() => {
// //     const savedPrefs = getUser();
// //     if (savedPrefs?.milkType) setMilkType(savedPrefs.milkType);
// //     if (savedPrefs?.quantity) setQuantity(savedPrefs.quantity);
// //   }, []);

// //   const handleUpdate = () => {
// //     const updated = { milkType, quantity };
// //     saveUser(updated);
// //     alert("Preferences updated successfully!");
// //   };

// //   return (
// //     <div className="min-h-screen bg-linear-to-b from-sky-100 to-white p-4 flex flex-col gap-6">
// //       {/* Profile Section */}
// //       <Card className="rounded-3xl shadow-lg w-full max-w-md mx-auto p-4 flex flex-col items-center bg-white hover:shadow-2xl transition-shadow duration-300">
// //         <div className="w-20 h-20 rounded-full bg-sky-200 flex items-center justify-center text-2xl font-bold text-white mb-3 animate-pulse">
// //           {user?.name ? user.name[0].toUpperCase() : "U"}
// //         </div>
// //         <h2 className="text-lg font-semibold text-sky-700">{user?.name || "User Name"}</h2>
// //         <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
// //         <Button
// //           onClick={logout}
// //           className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm shadow-md transition-all duration-300"
// //         >
// //           Logout
// //         </Button>
// //       </Card>

// //       {/* Preferences Card */}
// //       <Card className="rounded-3xl shadow-lg w-full max-w-md mx-auto p-4 bg-white hover:shadow-2xl transition-shadow duration-300">
// //         <CardHeader className="pb-2 text-center">
// //           <h2 className="text-sky-700 text-xl font-bold">Milk Preferences 🥛</h2>
// //           <p className="text-gray-500 text-sm mt-1">
// //             Customize your daily milk requirements
// //           </p>
// //         </CardHeader>

// //         <CardContent className="space-y-5">
// //           {/* Milk Type */}
// //           <div className="flex flex-col gap-1">
// //             <Label htmlFor="milkType" className="text-sm text-gray-600">
// //               Milk Type
// //             </Label>
// //             <Select value={milkType} onValueChange={setMilkType}>
// //               <SelectTrigger className="h-12 text-sm border-sky-200 focus:border-sky-400 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
// //                 <SelectValue placeholder="Select Type" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="cow">Cow Milk</SelectItem>
// //                 <SelectItem value="buffalo">Buffalo Milk</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           {/* Quantity */}
// //           <div className="flex flex-col gap-1">
// //             <Label htmlFor="quantity" className="text-sm text-gray-600">
// //               Quantity (in Litres)
// //             </Label>
// //             <Input
// //               id="quantity"
// //               type="number"
// //               min="0.5"
// //               step="0.5"
// //               className="h-12 text-sm border-sky-200 focus:border-sky-400 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
// //               value={quantity}
// //               onChange={(e) => setQuantity(e.target.value)}
// //             />
// //           </div>

// //           <Button
// //             onClick={handleUpdate}
// //             className="w-full bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium rounded-xl h-12 text-sm transition-all duration-300 shadow-md hover:shadow-lg"
// //           >
// //             Update Preferences
// //           </Button>
// //         </CardContent>
// //       </Card>

// //       <BottomNav />
// //     </div>
// //   );
// // }

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
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { getUser, saveUser } from "@/utils/storage";
// import { useAuth } from "@/context/AuthContext";
// import BottomNav from "@/components/BottomNav";

// export default function UserDashboard() {
//   const [milkType, setMilkType] = useState("cow");
//   const [quantity, setQuantity] = useState(1);
//   const { logout, user } = useAuth();

//   // Load saved preferences on mount
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
//     <div className="min-h-screen bg-linear-to-b from-sky-100 to-white flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <aside className="w-full md:w-1/4 bg-white shadow-lg rounded-tr-3xl rounded-br-3xl p-6 flex flex-col items-center md:items-start gap-4">
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
//           onClick={logout}
//           className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm shadow-md transition-all duration-300"
//         >
//           Logout
//         </Button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 flex flex-col gap-6">
//         <Card className="rounded-3xl shadow-lg w-full max-w-2xl mx-auto p-4 bg-white hover:shadow-2xl transition-shadow duration-300">
//           <CardHeader className="pb-2 text-center">
//             <h2 className="text-sky-700 text-xl font-bold">Milk Preferences 🥛</h2>
//             <p className="text-gray-500 text-sm mt-1">
//               Customize your daily milk requirements
//             </p>
//           </CardHeader>

//           <CardContent className="space-y-5">
//             {/* Milk Type with icons */}
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
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getUser, saveUser } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";

export default function UserDashboard() {
  const [milkType, setMilkType] = useState("cow");
  const [quantity, setQuantity] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const savedPrefs = getUser();
    if (savedPrefs?.milkType) setMilkType(savedPrefs.milkType);
    if (savedPrefs?.quantity) setQuantity(savedPrefs.quantity);
  }, []);

  const handleUpdate = () => {
    const updated = { milkType, quantity };
    saveUser(updated);
    alert("Preferences updated successfully!");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-100 to-white flex flex-col md:flex-row relative">
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
        <Card className="rounded-3xl shadow-lg w-full max-w-2xl mx-auto p-4 bg-white hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="pb-2 text-center">
            <h2 className="text-sky-700 text-xl font-bold">Milk Preferences 🥛</h2>
            <p className="text-gray-500 text-sm mt-1">
              Customize your daily milk requirements
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Milk Type with icons */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="milkType" className="text-sm text-gray-600">
                Milk Type
              </Label>
              <Select value={milkType} onValueChange={setMilkType}>
                <SelectTrigger className="h-12 text-sm border-sky-200 focus:border-sky-400 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md flex items-center gap-2">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cow">🐄 Cow Milk</SelectItem>
                  <SelectItem value="buffalo">🐃 Buffalo Milk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity slider */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="quantity" className="text-sm text-gray-600">
                Quantity (Litres): {quantity}
              </Label>
              <input
                id="quantity"
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-2 bg-sky-200 rounded-lg accent-sky-500 transition-all duration-300"
              />
            </div>

            <Button
              onClick={handleUpdate}
              className="w-full bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium rounded-xl h-12 text-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Update Preferences
            </Button>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
}
