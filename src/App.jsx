// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import UserDashboard from "./pages/UserDashboard";
// import DeliveryDashboard from "./pages/DeliveryDashboard";
// import { useAuth } from "./context/AuthContext";
// function PrivateRoute({ children, allowedRole }) {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/" replace />;
//   if (allowedRole && user.role !== allowedRole)
//   return children;
// }
// export default function App() {
//   const { user } = useAuth();
//   return (
//     <div className="min-h-screen bg-gradient-sky flex flex-col text-gray-800">
//       {" "}
//       <Routes>
//         {" "}
//         {/* Default route */}{" "}
//         <Route
//           path="/"
//           element={
//             user ? (
//               user.role === "delivery" ? (
//                 <Navigate to="/delivery-dashboard" replace />
//               ) : (
//                 <Navigate to="/user-dashboard" replace />
//               )
//             ) : (
//               <Login />
//             )
//           }
//         />{" "}
//         <Route path="/register" element={<Register />} />{" "}
//         {/* Protected User Dashboard */}{" "}
//         <Route
//           path="/user-dashboard"
//           element={
//             <PrivateRoute allowedRole="user">
//               {" "}
//               <UserDashboard />{" "}
//             </PrivateRoute>
//           }
//         />{" "}
//         {/* Protected Delivery Dashboard */}{" "}
//         <Route
//           path="/delivery-dashboard"
//           element={
//             <PrivateRoute allowedRole="delivery">
//               {" "}
//               <DeliveryDashboard />{" "}
//             </PrivateRoute>
//           }
//         />{" "}
//       </Routes>{" "}
//     </div>
//   );
// }

// App.jsx - FIXED VERSION (MINIMAL CHANGES)
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react"; // ✅ ADD THIS
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS

function PrivateRoute({ children, allowedRole }) {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/" replace />;
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// ✅ NEW COMPONENT TO HANDLE REDIRECTS
function DefaultRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "delivery") {
        navigate("/delivery-dashboard", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  // Show login if no user, or nothing while redirecting
  return user ? null : <Login />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-sky flex flex-col text-gray-800">
      <Routes>
        {/* Default route - FIXED */}
        <Route path="/" element={<DefaultRoute />} />
        
        <Route path="/register" element={<Register />} />
        
        {/* Protected User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute allowedRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        
        {/* Protected Delivery Dashboard */}
        <Route
          path="/delivery-dashboard"
          element={
            <PrivateRoute allowedRole="delivery">
              <DeliveryDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
