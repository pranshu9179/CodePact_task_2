import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  getUser,
  saveUser,
  updateUserQtyAndType,
  markDeliveredForUser,
  toggleDeliveryForUser,
} from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";

export default function UserDashboard() {
  const [milkType, setMilkType] = useState("cow");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDayDetails, setSelectedDayDetails] = useState(null);

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
    const updatedUser = {
      ...userData,
      deliveryLog: {
        ...userData.deliveryLog,
        [dateStr]: !userData.deliveryLog[dateStr],
      },
    };
    setUserData(updatedUser);
  };

  const handleMarkDelivered = () => {
    if (!userData) return;
    markDeliveredForUser(user?.id, selectedDate);
    setUserData({
      ...userData,
      deliveryLog: { ...userData.deliveryLog, [selectedDate]: true },
    });
  };

  // Generate monthly day list
  const generateMonthDays = () => {
    const now = new Date(selectedDate);
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const list = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const dateStr = d.toISOString().slice(0, 10);
      const delivered = !!userData?.deliveryLog?.[dateStr];
      const type = userData?.milkType || "cow";
      const qty = userData?.qty || 1;
      const price = qty * (type === "cow" ? 50 : 60);
      list.push({ date: dateStr, delivered, type, qty, price });
    }
    return list;
  };

  const monthDays = generateMonthDays();
  const totalMonthly = monthDays.reduce((sum, d) => sum + d.price, 0);

  const openDialog = (day) => {
    setSelectedDayDetails(day);
    setDialogOpen(true);
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 backdrop-blur-lg bg-white/80 shadow-2xl p-6 flex flex-col items-center md:items-start gap-4 border-r border-sky-100 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <button
          className="absolute top-4 right-4 md:hidden text-gray-600 text-2xl font-bold"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <h2 className="text-xl font-bold text-sky-700 mt-2">{userData.name}</h2>
        <p className="text-gray-500 text-sm mb-2">{userData.email}</p>

        <div className="space-y-1 text-gray-700 w-full">
          <p>
            <span className="font-semibold">Role:</span> {userData.role}
          </p>
          <p>
            <span className="font-semibold">Joined:</span> {userData.joined}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {userData.phone}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {userData.address}
          </p>
        </div>

        <Button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm shadow-md hover:scale-[1.02] transition-transform duration-300"
        >
          Logout
        </Button>
      </aside>

      {/* Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-sky-500 rounded-full shadow-lg text-white text-2xl flex items-center justify-center"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 flex flex-col gap-6 md:ml-64">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
          <Card className="p-5 bg-gradient-to-br from-green-50 to-white border-green-100 shadow hover:shadow-md transition-all">
            <h3 className="text-green-600 font-semibold text-sm">
              Last Month Total
            </h3>
            <p className="text-2xl font-bold text-green-700 mt-2">
              ₹{userData.lastMonthTotal}
            </p>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-red-50 to-white border-red-100 shadow hover:shadow-md transition-all">
            <h3 className="text-red-600 font-semibold text-sm">
              Due Amount
            </h3>
            <p className="text-2xl font-bold text-red-700 mt-2">
              ₹{userData.due}
            </p>
          </Card>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-3xl shadow-xl w-full max-w-4xl mx-auto p-6 bg-white hover:shadow-2xl transition-all duration-500">
            <CardHeader className="pb-4 text-center">
              <h2 className="text-sky-700 text-2xl font-extrabold">
                Milk Preferences & Delivery 🥛
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Manage your daily delivery records
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-sky-700 mb-3">
                  Monthly Delivery Summary
                </h3>
                <div className="overflow-x-auto border rounded-xl shadow-sm">
                  <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-sky-100 text-sky-700">
                      <tr>
                        <th className="px-3 py-2 text-left">Date</th>
                        <th className="px-3 py-2">Milk Type</th>
                        <th className="px-3 py-2">Qty (L)</th>
                        <th className="px-3 py-2">Amount (₹)</th>
                        <th className="px-3 py-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthDays.map((day) => (
                        <tr
                          key={day.date}
                          className={`border-b transition ${
                            day.delivered ? "bg-green-50" : "hover:bg-sky-50"
                          }`}
                        >
                          <td className="px-3 py-2">{day.date}</td>
                          <td className="px-3 py-2 text-center capitalize">{day.type}</td>
                          <td className="px-3 py-2 text-center">{day.qty}</td>
                          <td className="px-3 py-2 text-center">{day.price}</td>
                          <td className="px-3 py-2 text-center">
                            <Button
                              onClick={() => openDialog(day)}
                              className="bg-sky-500 hover:bg-sky-600 text-white text-xs rounded-lg"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-sky-50 font-semibold text-sky-700">
                      <tr>
                        <td colSpan="3" className="px-3 py-2 text-right font-bold">
                          Total:
                        </td>
                        <td className="px-3 py-2 text-center font-bold">
                          ₹{totalMonthly}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <BottomNav />

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-sky-700 text-lg font-bold">
              Delivery Details
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm">
              Full details of {selectedDayDetails?.date}
            </DialogDescription>
          </DialogHeader>

          {selectedDayDetails && (
            <div className="mt-4 space-y-3 text-sm">
              <p>
                <span className="font-semibold text-gray-700">Milk Type:</span>{" "}
                <span className="capitalize">{selectedDayDetails.type}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Quantity:</span>{" "}
                {selectedDayDetails.qty} L
              </p>
              <p>
                <span className="font-semibold text-gray-700">Amount:</span> ₹
                {selectedDayDetails.price}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                {selectedDayDetails.delivered ? (
                  <span className="text-green-600 font-medium">Delivered</span>
                ) : (
                  <span className="text-red-500 font-medium">Pending</span>
                )}
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => setDialogOpen(false)}
              className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
