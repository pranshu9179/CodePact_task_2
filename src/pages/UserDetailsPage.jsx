import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { calculatePrice } from "@/utils/pricing";
import {
  getUserById,
  markDeliveredForUser,
  updateUserQtyAndType,
} from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

function formatDateYYYYMMDD(d) {
  return d.toISOString().slice(0, 10);
}

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [localUser, setLocalUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    formatDateYYYYMMDD(new Date())
  );

  useEffect(() => {
    if (id) {
      const u = getUserById(id);
      if (u) {
        const todayStr = formatDateYYYYMMDD(new Date());
        const deliveryLog = { ...u.deliveryLog };
        Object.keys(deliveryLog).forEach((d) => {
          if (d < todayStr) deliveryLog[d] = deliveryLog[d] ?? false;
        });

        setLocalUser({
          ...u,
          cowQty: u.cowQty ?? 0,
          buffaloQty: u.buffaloQty ?? 0,
          deliveryLog,
        });
      }
    }
  }, [id]);

  const price = useMemo(() => {
    if (!localUser) return 0;
    const cowPrice = calculatePrice("cow", localUser.cowQty || 0);
    const buffaloPrice = calculatePrice("buffalo", localUser.buffaloQty || 0);
    return cowPrice + buffaloPrice;
  }, [localUser]);

  const thisMonthTotal = useMemo(() => {
    if (!localUser || !localUser.deliveryLog) return 0;
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    let total = 0;
    Object.entries(localUser.deliveryLog).forEach(([dateStr, delivered]) => {
      const d = new Date(dateStr);
      if (delivered && d.getMonth() === month && d.getFullYear() === year) {
        total +=
          calculatePrice("cow", localUser.cowQty || 0) +
          calculatePrice("buffalo", localUser.buffaloQty || 0);
      }
    });
    return total;
  }, [localUser]);

  const handleSave = () => {
    const mergedUser = {
      ...localUser,
      milkType: "mixed",
      qty: (localUser.cowQty || 0) + (localUser.buffaloQty || 0),
    };
    updateUserQtyAndType(mergedUser.id, mergedUser.qty, mergedUser.milkType);
    navigate("/delivery-dashboard");
  };

  const handleMarkDelivered = () => {
    markDeliveredForUser(localUser.id, selectedDate);
    const u = getUserById(localUser.id);
    setLocalUser({ ...u });
  };

  if (!localUser)
    return <div className="p-6 text-center text-gray-600">Loading...</div>;

  const isDeliveredToday = !!(
    localUser?.deliveryLog && localUser.deliveryLog[selectedDate]
  );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-sky-100 to-white flex flex-col p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ✅ Header (Copied from DeliveryDashboard) */}
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

      {/* ✅ User Details Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-xl mx-auto mt-2">
        {/* Header inside card */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg font-semibold text-sky-800">
              {localUser.name}
            </p>
            <p className="text-xs text-gray-500">{localUser.phone}</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 rounded-lg font-medium bg-gray-200 text-sm hover:bg-gray-400 transition"
          >
            ← Back
          </button>
        </div>

        {/* Address & Milk Info */}
        <div className="space-y-4">
          <div className="p-4 bg-sky-50 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600 font-medium">
              {localUser.address}
            </p>

            {/* Milk Type Section */}
            <div className="mt-3 space-y-3">
              {/* Cow Milk */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white border rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <p className="font-bold text-sky-700 text-sm sm:text-base">
                    Cow Milk
                  </p>
                  <input
                    type="text"
                    min="0"
                    step="0.25"
                    value={localUser.cowQty || ""}
                    onChange={(e) =>
                      setLocalUser((s) => ({
                        ...s,
                        cowQty: Number(e.target.value) || 0,
                      }))
                    }
                    placeholder="Qty (L)"
                    className="w-36 px-3 py-1 border border-gray-400 rounded-lg outline-blue-700"
                  />
                </div>
              </div>

              {/* Buffalo Milk */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white border rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <p className="font-bold text-sky-700 text-sm sm:text-base">
                    Buffalo Milk
                  </p>
                  <input
                    type="text"
                    min="0"
                    step="0.25"
                    value={localUser.buffaloQty || ""}
                    onChange={(e) =>
                      setLocalUser((s) => ({
                        ...s,
                        buffaloQty: Number(e.target.value) || 0,
                      }))
                    }
                    placeholder="Qty (L)"
                    className="w-36 px-3 py-1 border border-gray-400 rounded-lg outline-blue-700"
                  />
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-3 flex flex-col gap-1">
              <p className="text-sm text-gray-700">
                Price per day: <span className="font-semibold">₹{price}</span>
              </p>
              <p className="text-sm text-gray-700">
                This Month Total:{" "}
                <span className="font-semibold text-green-600">
                  ₹{thisMonthTotal}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                Last Month Total:{" "}
                <span className="font-semibold text-blue-600">
                  ₹{localUser.lastMonthTotal ?? 0}
                </span>
              </p>
              <p className="text-sm text-red-900 font-semibold">
                Due: ₹{localUser.due ?? 0}
              </p>
            </div>
          </div>

          {/* Date Picker Section */}
          <div className="mt-3 flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border font-medium bg-gray-200 rounded-lg text-sm text-black"
            />
            <button
              onClick={handleMarkDelivered}
              className={`px-4 py-2 rounded-lg font-medium text-white ${
                isDeliveredToday ? "bg-green-400" : "bg-sky-500"
              }`}
            >
              {isDeliveredToday ? "Delivered Today" : "Mark Delivered Today"}
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                handleSave, navigate(-1);
              }}
              className="flex-1 px-4 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-3 font-medium rounded-xl bg-gray-200 text-black hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
