import { Routes, Route, Navigate } from "react-router-dom";
import {useUser} from './Context/UserContext.jsx';
import MainLayout from "./common/layouts/MainLayout";
import GuestLayout from "./common/layouts/GuestLayout";
import Login from "./common/pages/Login";
import Home from "./common/pages/Home";
import NotFound from "./common/pages/NotFound";
import PrivateRoute from "./common/components/PrivateRoute";
import Tickets from "./tickets/pages/Tickets";
import Reports from "./reports/pages/Reports";
import Appointments from "./appointments/pages/Appointments";
import Resources from "./resources/pages/Resources";
import Collaborators from "./collaborators/pages/Collaborators";
import Calendar from "./calendar/pages/Calendar";
import AddTicket from "./tickets/pages/AddTicket";
import AddAppointment from "./appointments/pages/AddAppointment";
import AddResource from "./resources/pages/AddResource";
import AddCollaborator from "./collaborators/pages/AddCollaborator";
import EditTicket from "./tickets/pages/EditTicket.jsx";
import EditCollaborator from "./collaborators/pages/EditCollaborator.jsx";
import EditAppointment from "./appointments/pages/EditAppointment.jsx";
import EditResource from "./resources/pages/EditResource.jsx";


function App() {
  const { user } = useUser();

  return (
    <Routes>
      {/* Si el usuario no está autenticado */}
      {!user.logged ? (
        <>
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirige si la ruta no existe */}
        </>
      ) : (
        <>
          {/* Si el usuario está autenticado */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route
            path="/tickets"
            element={<PrivateRoute requiredRoles={["admin", "user", "Administrador"]} layout={MainLayout} />}
          >
            <Route index element={<Tickets />} />
            <Route path="addTicket" element={<AddTicket />} />
            <Route path="editTicket/:id" element={<EditTicket />} />
          </Route>

          <Route
            path="/appointments"
            element={<PrivateRoute requiredRoles={["admin", "user", "Administrador"]} layout={MainLayout} />}
          >
            <Route index element={<Appointments />} />
            <Route path="addAppointment" element={<AddAppointment />} />
            <Route path="editAppointment/:id" element={<EditAppointment />} />
          </Route>

          <Route
            path="/reports"
            element={<PrivateRoute requiredRoles={["admin", "user", "Administrador"]} layout={MainLayout} />}
          >
            <Route index element={<Reports />} />
          </Route>

          <Route
            path="/calendar/:id"
            element={<PrivateRoute requiredRoles={["admin", "user", "Administrador"]} layout={MainLayout} />}
          >
            <Route index element={<Calendar />} />
          </Route>

          <Route
            path="/resources"
            element={<PrivateRoute requiredRoles={["admin", "user", "Administrador"]} layout={MainLayout} />}
          >
            <Route index element={<Resources />} />
            <Route path="addResource" element={<AddResource />} />
            <Route path="editResource/:id" element={<EditResource />} />
          </Route>

          <Route
            path="/collaborators"
            element={<PrivateRoute requiredRoles={["admin", "user", "Administrador"]} layout={MainLayout} />}
          >
            <Route index element={<Collaborators />} />
            <Route path="addCollaborator" element={<AddCollaborator />} />
            <Route path="editCollaborator/:id" element={<EditCollaborator />} />
          </Route>

          <Route path="*" element={<NotFound />} /> {/* Redirige si la ruta no existe */}
        </>
      )}
    </Routes>
  );
}

export default App;
