import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressDropdown from "../components/AddressDropdown";

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "user",
    milkType: "cow",
    quantity: 1,
    address: {},
  });

  const handleAddress = (addr) =>
    setUserData((prev) => ({ ...prev, address: addr }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get all registered users from localStorage
    const allUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    // Add new user
    allUsers.push(userData);

    // Save back to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(allUsers));

    alert("Registration successful!");
    navigate("/"); // Redirect to login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 space-y-4 animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-sky-700 text-center">
          Create Account 🍼
        </h2>

        {/* Role */}
        <div>
          <label className="block text-gray-600 mb-1">Register As</label>
          <select
            value={userData.role}
            onChange={(e) =>
              setUserData({ ...userData, role: e.target.value })
            }
            className="w-full border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
          >
            <option value="user">User</option>
            <option value="delivery">Delivery Man</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
          required
        />

        <input
          type="number"
          placeholder="Mobile Number"
          value={userData.mobile}
          onChange={(e) =>
            setUserData({ ...userData, mobile: e.target.value })
          }
          className="w-full border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
          className="w-full border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          className="w-full border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
          required
        />

        {userData.role === "user" && (
          <>
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-gray-600 mb-1">Milk Type</label>
                <select
                  value={userData.milkType}
                  onChange={(e) =>
                    setUserData({ ...userData, milkType: e.target.value })
                  }
                  className="w-full border border-sky-200 rounded-lg h-10 px-2 focus:ring-2 focus:ring-sky-300 transition"
                >
                  <option value="cow">Cow</option>
                  <option value="buffalo">Buffalo</option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-gray-600 mb-1">Quantity (L)</label>
                <input
                  type="number"
                  min="1"
                  value={userData.quantity}
                  onChange={(e) =>
                    setUserData({ ...userData, quantity: e.target.value })
                  }
                  className="w-full border border-sky-200 rounded-lg h-10 px-2 focus:ring-2 focus:ring-sky-300 transition"
                />
              </div>
            </div>

            <AddressDropdown onSelect={handleAddress} />
          </>
        )}

        <button className="w-full bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 ">
          Register
        </button>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
