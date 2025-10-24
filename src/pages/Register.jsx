import { useState } from "react";
import AddressDropdown from "../components/AddressDropdown";
import { useNavigate } from "react-router-dom";

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

  const handleAddress = (addr) => {
    setUserData((prev) => ({ ...prev, address: addr }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("registeredUser", JSON.stringify(userData));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-100 to-sky-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 space-y-3"
      >
        <h2 className="text-center text-sky-700 font-semibold text-2xl mb-3">
          Create Account 🍼
        </h2>

        {/* Role Selection */}
        <div>
          <label className="block text-gray-600 text-sm mb-1">Register As</label>
          <select
            value={userData.role}
            onChange={(e) =>
              setUserData({ ...userData, role: e.target.value })
            }
            className="border border-sky-200 focus:border-sky-400 rounded-lg w-full h-10 px-3 text-sm focus:outline-none"
          >
            <option value="user">User</option>
            <option value="delivery">Delivery Man</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="border border-sky-200 focus:border-sky-400 rounded-lg w-full px-3 h-10 text-sm focus:outline-none"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Mobile Number"
          className="border border-sky-200 focus:border-sky-400 rounded-lg w-full px-3 h-10 text-sm focus:outline-none"
          onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="border border-sky-200 focus:border-sky-400 rounded-lg w-full px-3 h-10 text-sm focus:outline-none"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-sky-200 focus:border-sky-400 rounded-lg w-full px-3 h-10 text-sm focus:outline-none"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          required
        />

        {/* Only show milk info if user */}
        {userData.role === "user" && (
          <>
            <div className="flex justify-between items-center space-x-3">
              <div className="w-1/2">
                <label className="block text-gray-600 text-sm mb-1">
                  Milk Type
                </label>
                <select
                  value={userData.milkType}
                  onChange={(e) =>
                    setUserData({ ...userData, milkType: e.target.value })
                  }
                  className="border border-sky-200 focus:border-sky-400 rounded-lg w-full h-10 px-2 text-sm focus:outline-none"
                >
                  <option value="cow">Cow</option>
                  <option value="buffalo">Buffalo</option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-gray-600 text-sm mb-1">
                  Quantity (L)
                </label>
                <input
                  type="number"
                  min="1"
                  value={userData.quantity}
                  onChange={(e) =>
                    setUserData({ ...userData, quantity: e.target.value })
                  }
                  className="border border-sky-200 focus:border-sky-400 rounded-lg w-full h-10 px-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            <AddressDropdown onSelect={handleAddress} />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium py-2.5 rounded-xl text-sm transition-all duration-300"
        >
          Register
        </button>

        <p className="text-center text-xs text-gray-500 mt-3">
          Already have an account?{" "}
          <a
            href="/"
            className="text-sky-600 font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}











// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AddressDropdown from "../components/AddressDropdown";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// export default function Register() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     password: "",
//     role: "user",
//     milkType: "cow",
//     quantity: 1,
//     state: "",
//     city: "",
//     area: "",
//     address: {},
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [registeredUsers, setRegisteredUsers] = useState([]);

//   const states = ["UP", "MH", "DL"]; // Example states
//   const cities = {
//     UP: ["Lucknow", "Kanpur", "Varanasi"],
//     MH: ["Mumbai", "Pune", "Nagpur"],
//     DL: ["New Delhi"],
//   };
//   const areas = {
//     Lucknow: ["Gomti Nagar", "Aliganj", "Indira Nagar"],
//     Kanpur: ["Kalyanpur", "Govind Nagar"],
//     Mumbai: ["Bandra", "Andheri"],
//     Pune: ["Kothrud", "Viman Nagar"],
//   };

//   useEffect(() => {
//     const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
//     setRegisteredUsers(users);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const exists = registeredUsers.find((u) => u.email === userData.email);
//     if (exists) {
//       alert("User with this email already exists!");
//       return;
//     }
//     const updatedUsers = [...registeredUsers, userData];
//     localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
//     alert("Registration Successful!");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-100 to-sky-50 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-4 animate-fade-in"
//       >
//         <h2 className="text-center text-2xl font-bold text-sky-700 animate-bounce">
//           Create Account 🍼
//         </h2>

//         {/* Role selection */}
//         <div>
//           <label className="text-sm text-gray-600 mb-1 block">Register As</label>
//           <Select
//             value={userData.role}
//             onValueChange={(value) => setUserData({ ...userData, role: value })}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select Role" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="user">User</SelectItem>
//               <SelectItem value="delivery">Delivery Man</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <Input
//           placeholder="Full Name"
//           value={userData.name}
//           onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//           className="rounded-lg"
//           required
//         />

//         <Input
//           type="number"
//           placeholder="Mobile Number"
//           value={userData.mobile}
//           onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
//           className="rounded-lg"
//           required
//         />

//         <Input
//           type="email"
//           placeholder="Email Address"
//           value={userData.email}
//           onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//           className="rounded-lg"
//           required
//         />

//         <div className="relative">
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={userData.password}
//             onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//             className="rounded-lg"
//             required
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </Button>
//         </div>

//         {/* Only for users */}
//         {userData.role === "user" && (
//           <>
//             <div className="flex gap-3">
//               <div className="flex-1">
//                 <label className="text-sm text-gray-600 mb-1 block">Milk Type</label>
//                 <Select
//                   value={userData.milkType}
//                   onValueChange={(value) => setUserData({ ...userData, milkType: value })}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Milk Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="cow">Cow</SelectItem>
//                     <SelectItem value="buffalo">Buffalo</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex-1">
//                 <label className="text-sm text-gray-600 mb-1 block">Quantity (L)</label>
//                 <Input
//                   type="number"
//                   min="1"
//                   value={userData.quantity}
//                   onChange={(e) => setUserData({ ...userData, quantity: e.target.value })}
//                   className="rounded-lg"
//                 />
//               </div>
//             </div>

//             {/* Address Selection */}
//             <div className="space-y-2">
//               <div>
//                 <label className="text-sm text-gray-600 mb-1 block">State</label>
//                 <Select
//                   value={userData.state}
//                   onValueChange={(value) => setUserData({ ...userData, state: value, city: "", area: "" })}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select State" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {states.map((state) => (
//                       <SelectItem key={state} value={state}>{state}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {userData.state && (
//                 <div>
//                   <label className="text-sm text-gray-600 mb-1 block">City/District</label>
//                   <Select
//                     value={userData.city}
//                     onValueChange={(value) => setUserData({ ...userData, city: value, area: "" })}
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select City" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {cities[userData.state]?.map((city) => (
//                         <SelectItem key={city} value={city}>{city}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}

//               {userData.city && areas[userData.city] && (
//                 <div>
//                   <label className="text-sm text-gray-600 mb-1 block">Area</label>
//                   <Select
//                     value={userData.area}
//                     onValueChange={(value) => setUserData({ ...userData, area: value })}
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select Area" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {areas[userData.city].map((area) => (
//                         <SelectItem key={area} value={area}>{area}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         <Button type="submit" className="w-full bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
//           Register
//         </Button>

//         <p className="text-center text-xs text-gray-500 mt-3">
//           Already have an account?{" "}
//           <a href="/" className="text-sky-600 font-semibold hover:underline">
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Importing your custom components/utilities
// import {
//   CountrySelect,
//   StateSelect,
//   CitySelect,
//   LanguageSelect,
//   RegionSelect,
//   PhonecodeSelect,
//   GetCountries,
//   GetState,
//   GetCity,
//   GetAllCities,
// } from "react-country-state-city"; // Adjust path if needed

// export default function Register() {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     password: "",
//     role: "user",
//     milkType: "cow",
//     quantity: 1,
//     country: "IN", // Default to India
//     state: "",
//     city: "",
//     area: "",
//     block: "",
//     houseNo: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [registeredUsers, setRegisteredUsers] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [allCities, setAllCities] = useState([]);

//   // Load registered users from localStorage
//   useEffect(() => {
//     const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
//     setRegisteredUsers(users);
//   }, []);

//   // Load states when country changes
//   useEffect(() => {
//     if (userData.country) {
//       const states = GetState(userData.country);
//       setAllStates(states || []);
//       setUserData((prev) => ({ ...prev, state: "", city: "" }));
//       setAllCities([]);
//     }
//   }, [userData.country]);

//   // Load cities when state changes
//   useEffect(() => {
//     if (userData.state) {
//       const cities = GetCity(userData.country, userData.state);
//       setAllCities(cities || []);
//       setUserData((prev) => ({ ...prev, city: "" }));
//     }
//   }, [userData.state]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const exists = registeredUsers.find((u) => u.email === userData.email);
//     if (exists) {
//       alert("User with this email already exists!");
//       return;
//     }
//     const updatedUsers = [...registeredUsers, userData];
//     localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
//     alert("Registration Successful!");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-100 to-sky-50 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white shadow-xl rounded-3xl p-6 space-y-5 sm:p-8"
//       >
//         <h2 className="text-center text-3xl font-extrabold text-sky-700">
//           Create Account 🍼
//         </h2>

//         {/* Role */}
//         <div>
//           <label className="text-sm text-gray-600 mb-1 block">Register As</label>
//           <Select
//             value={userData.role}
//             onValueChange={(value) => setUserData({ ...userData, role: value })}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select Role" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="user">User</SelectItem>
//               <SelectItem value="delivery">Delivery Man</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Basic Inputs */}
//         <Input
//           placeholder="Full Name"
//           value={userData.name}
//           onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//           className="rounded-xl shadow-sm"
//           required
//         />
//         <Input
//           type="number"
//           placeholder="Mobile Number"
//           value={userData.mobile}
//           onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
//           className="rounded-xl shadow-sm"
//           required
//         />
//         <Input
//           type="email"
//           placeholder="Email Address"
//           value={userData.email}
//           onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//           className="rounded-xl shadow-sm"
//           required
//         />

//         {/* Password */}
//         <div className="relative">
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={userData.password}
//             onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//             className="rounded-xl shadow-sm"
//             required
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-lg"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </Button>
//         </div>

//         {/* User-specific fields */}
//         {userData.role === "user" && (
//           <>
//             <div className="flex gap-3">
//               <div className="flex-1">
//                 <label className="text-sm text-gray-600 mb-1 block">Milk Type</label>
//                 <Select
//                   value={userData.milkType}
//                   onValueChange={(value) =>
//                     setUserData({ ...userData, milkType: value })
//                   }
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Milk Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="cow">Cow</SelectItem>
//                     <SelectItem value="buffalo">Buffalo</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex-1">
//                 <label className="text-sm text-gray-600 mb-1 block">Quantity (L)</label>
//                 <Input
//                   type="number"
//                   min="1"
//                   value={userData.quantity}
//                   onChange={(e) => setUserData({ ...userData, quantity: e.target.value })}
//                   className="rounded-xl shadow-sm"
//                 />
//               </div>
//             </div>

//             {/* Country / State / City */}
//             <div className="space-y-3">
//               <div>
//                 <label className="text-sm text-gray-600 mb-1 block">Country</label>
//                 <CountrySelect
//                   value={userData.country}
//                   onChange={(value) => setUserData({ ...userData, country: value })}
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-gray-600 mb-1 block">State</label>
//                 <StateSelect
//                   country={userData.country}
//                   value={userData.state}
//                   onChange={(value) => setUserData({ ...userData, state: value })}
//                 />
//               </div>

//               {userData.state && (
//                 <div>
//                   <label className="text-sm text-gray-600 mb-1 block">City</label>
//                   <CitySelect
//                     country={userData.country}
//                     state={userData.state}
//                     value={userData.city}
//                     onChange={(value) => setUserData({ ...userData, city: value })}
//                   />
//                 </div>
//               )}

//               {userData.city && (
//                 <Input
//                   placeholder="Area / Colony"
//                   value={userData.area}
//                   onChange={(e) => setUserData({ ...userData, area: e.target.value })}
//                   className="rounded-xl shadow-sm"
//                 />
//               )}

//               {userData.area && (
//                 <Input
//                   placeholder="Block / Sector"
//                   value={userData.block}
//                   onChange={(e) => setUserData({ ...userData, block: e.target.value })}
//                   className="rounded-xl shadow-sm"
//                 />
//               )}

//               {userData.block && (
//                 <Input
//                   placeholder="House No"
//                   value={userData.houseNo}
//                   onChange={(e) => setUserData({ ...userData, houseNo: e.target.value })}
//                   className="rounded-xl shadow-sm"
//                 />
//               )}
//             </div>
//           </>
//         )}

//         <Button
//           type="submit"
//           className="w-full bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
//         >
//           Register
//         </Button>

//         <p className="text-center text-xs text-gray-500 mt-2">
//           Already have an account?{" "}
//           <a href="/" className="text-sky-600 font-semibold hover:underline">
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Importing your custom components/utilities
// import {
//   CountrySelect,
//   StateSelect,
//   CitySelect,
//   LanguageSelect,
//   RegionSelect,
//   PhonecodeSelect,
//   GetCountries,
//   GetState,
//   GetCity,
//   GetAllCities,
// } from "react-country-state-city"; // Adjust path if needed

// export default function Register() {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     password: "",
//     role: "user",
//     milkType: "cow",
//     quantity: 1,
//     country: "IN", // Default to India
//     state: "",
//     city: "",
//     area: "",
//     block: "",
//     houseNo: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [registeredUsers, setRegisteredUsers] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [allCities, setAllCities] = useState([]);

//   // Load registered users from localStorage
//   useEffect(() => {
//     const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
//     setRegisteredUsers(users);
//   }, []);

//   // Load states when country changes
//   useEffect(() => {
//     if (userData.country) {
//       const states = GetState(userData.country);
//       setAllStates(states || []);
//       setUserData((prev) => ({ ...prev, state: "", city: "" }));
//       setAllCities([]);
//     }
//   }, [userData.country]);

//   // Load cities when state changes
//   useEffect(() => {
//     if (userData.state) {
//       const cities = GetCity(userData.country, userData.state);
//       setAllCities(cities || []);
//       setUserData((prev) => ({ ...prev, city: "" }));
//     }
//   }, [userData.state]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const exists = registeredUsers.find((u) => u.email === userData.email);
//     if (exists) {
//       alert("User with this email already exists!");
//       return;
//     }
//     const updatedUsers = [...registeredUsers, userData];
//     localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
//     alert("Registration Successful!");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-100 to-sky-50 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white shadow-xl rounded-3xl p-6 space-y-5 sm:p-8"
//       >
//         <h2 className="text-center text-3xl font-extrabold text-sky-700">
//           Create Account 🍼
//         </h2>

//         {/* Role */}
//         <div>
//           <label className="text-sm text-gray-600 mb-1 block">Register As</label>
//           <Select
//             value={userData.role}
//             onValueChange={(value) => setUserData({ ...userData, role: value })}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select Role" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="user">User</SelectItem>
//               <SelectItem value="delivery">Delivery Man</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Basic Inputs */}
//         <Input
//           placeholder="Full Name"
//           value={userData.name}
//           onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//           className="rounded-xl shadow-sm"
//           required
//         />
//         <Input
//           type="number"
//           placeholder="Mobile Number"
//           value={userData.mobile}
//           onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
//           className="rounded-xl shadow-sm"
//           required
//         />
//         <Input
//           type="email"
//           placeholder="Email Address"
//           value={userData.email}
//           onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//           className="rounded-xl shadow-sm"
//           required
//         />

//         {/* Password */}
//         <div className="relative">
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={userData.password}
//             onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//             className="rounded-xl shadow-sm"
//             required
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-lg"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </Button>
//         </div>

//         {/* User-specific fields */}
//         {userData.role === "user" && (
//           <>
//             <div className="flex gap-3">
//               <div className="flex-1">
//                 <label className="text-sm text-gray-600 mb-1 block">Milk Type</label>
//                 <Select
//                   value={userData.milkType}
//                   onValueChange={(value) =>
//                     setUserData({ ...userData, milkType: value })
//                   }
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Milk Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="cow">Cow</SelectItem>
//                     <SelectItem value="buffalo">Buffalo</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex-1">
//                 <label className="text-sm text-gray-600 mb-1 block">Quantity (L)</label>
//                 <Input
//                   type="number"
//                   min="1"
//                   value={userData.quantity}
//                   onChange={(e) => setUserData({ ...userData, quantity: e.target.value })}
//                   className="rounded-xl shadow-sm"
//                 />
//               </div>
//             </div>

//             {/* Country / State / City */}
//             <div className="space-y-3">
//               <div>
//                 <label className="text-sm text-gray-600 mb-1 block">Country</label>
//                 <CountrySelect
//                   value={userData.country}
//                   onChange={(value) => setUserData({ ...userData, country: value })}
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-gray-600 mb-1 block">State</label>
//                 <StateSelect
//                   country={userData.country}
//                   value={userData.state}
//                   onChange={(value) => setUserData({ ...userData, state: value })}
//                 />
//               </div>

//               {userData.state && (
//                 <div>
//                   <label className="text-sm text-gray-600 mb-1 block">City</label>
//                   <CitySelect
//                     country={userData.country}
//                     state={userData.state}
//                     value={userData.city}
//                     onChange={(value) => setUserData({ ...userData, city: value })}
//                   />
//                 </div>
//               )}

//               {userData.city && (
//                 <Input
//                   placeholder="Area / Colony"
//                   value={userData.area}
//                   onChange={(e) => setUserData({ ...userData, area: e.target.value })}
//                   className="rounded-xl shadow-sm"
//                 />
//               )}

//               {userData.area && (
//                 <Input
//                   placeholder="Block / Sector"
//                   value={userData.block}
//                   onChange={(e) => setUserData({ ...userData, block: e.target.value })}
//                   className="rounded-xl shadow-sm"
//                 />
//               )}

//               {userData.block && (
//                 <Input
//                   placeholder="House No"
//                   value={userData.houseNo}
//                   onChange={(e) => setUserData({ ...userData, houseNo: e.target.value })}
//                   className="rounded-xl shadow-sm"
//                 />
//               )}
//             </div>
//           </>
//         )}

//         <Button
//           type="submit"
//           className="w-full bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
//         >
//           Register
//         </Button>

//         <p className="text-center text-xs text-gray-500 mt-2">
//           Already have an account?{" "}
//           <a href="/" className="text-sky-600 font-semibold hover:underline">
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }
