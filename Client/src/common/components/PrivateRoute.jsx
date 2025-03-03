import { Navigate, Outlet } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import {UserContext} from '../../Context/UserContext.jsx'; // This is where the user's role is stored.
import { toast } from 'react-hot-toast';

function PrivateRoute({requiredRoles, layout: Layout }) {
  const { user } = useContext(UserContext); // Here you get the user and role from the context
  const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      if (!user || !requiredRoles.includes(user.role)) {
        toast.error("You do not have permission to access this page.");
        console.log("Redirecting to home");
        setRedirect(true); // If there is no user or the role does not match, you redirect to the home
      }
    }, [user, requiredRoles]);

    if (redirect) {
      return <Navigate to="/" />;
    }

  return (
    <Layout>
      <Outlet /> {/* Renders nested routes within the layout */}
    </Layout>
  );
}
export default PrivateRoute;
