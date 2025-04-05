import { Routes, Route } from "react-router-dom";
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
import AddResources from "./resources/pages/AddResources";
import AddCollaborator from "./collaborators/pages/AddCollaborator";


function App() {
  const { user } = useUser();
  return (
    <Routes>
      <Route path="/" element={user.logged ? <MainLayout /> : <GuestLayout />}>
        <Route index element={user.logged ? <Home /> : <Login />} />
      </Route>

      <Route path='/tickets' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Tickets />} />
          <Route path = 'addTicket' element={<AddTicket />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path='/appointments' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Appointments />} />
          <Route path = 'addAppointment' element={<AddAppointment />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path='/reports' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Reports />} />
          <Route path = 'example' element={<Login />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path='/calendar' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Calendar />} />
          <Route path = 'example' element={<Login />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path='/resources' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Resources />} />
          <Route path = 'addResources' element={<AddResources />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path='/collaborators' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Collaborators />} />
          <Route path = 'addCollaborator' element={<AddCollaborator />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path="*" element={<NotFound />} /> {/* redirect when route not found */}
    </Routes>
  );
}

export default App;
