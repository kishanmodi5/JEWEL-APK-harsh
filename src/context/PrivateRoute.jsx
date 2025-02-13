import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/auth";

const PrivateRoute = () => {
  const { showp, setShowp, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowp(true);
    }
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

// import React, { useContext } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "./auth"; // Adjust path as necessary

// const PrivateRoute = ({ component: Component, render, ...rest }) => {
//   const { isAuthenticated } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated ? (
//           render ? (
//             render(props) // Use render prop if provided
//           ) : (
//             <Component {...props} /> // Use component prop if provided
//           )
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;