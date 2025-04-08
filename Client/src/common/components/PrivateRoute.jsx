import { Navigate, Outlet } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useUser } from '../../Context/UserContext';
import {UserContext} from '../../Context/UserContext.jsx'; // This is where the user's role is stored.
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-hot-toast';

function PrivateRoute({requiredRoles, layout: Layout }) {
  const { user } = useContext(UserContext); // Here you get the user and role from the context
  const [redirect, setRedirect] = useState(false);
    const { setUser } = useUser();

  useEffect(() => {
    const validateToken = () => {
      if (!user || !user.token) {
        toast.error("Debes iniciar sesión para acceder a esta página.");
        setRedirect(true);
        return;
      }

      try {
        // Decodifica el token
        const decodedToken = jwtDecode(user.token);

        // Verifica si el token ha expirado
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        if (decodedToken.exp < currentTime) {
          toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
          localStorage.removeItem('user');

          // Actualiza el contexto para restablecer el estado del usuario
          setUser({
            role: "basic",
            name: "",
            email: "",
            id: 0,
            logged: false,
            token: "",
          });
          setRedirect(true);
          return;
        }

        // Verifica si el rol del usuario está permitido
        if (!requiredRoles.includes(user.role)) {
          toast.error("No tienes permiso para acceder a esta página.");
          setRedirect(true);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        toast.error("Token inválido. Por favor, inicia sesión nuevamente.");
        setRedirect(true);
      }
    };

    validateToken();
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
