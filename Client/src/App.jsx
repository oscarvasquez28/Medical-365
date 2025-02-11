import { Routes, Route } from "react-router-dom";
import MainLayout from "./common/layouts/MainLayout";
import GuestLayout from "./common/layouts/GuestLayout";
import Login from "./common/pages/Login";
import Home from "./common/pages/Home";
import NotFound from "./common/pages/NotFound";
import PrivateRoute from "./common/components/PrivateRoute";

const isLoggedIn = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <MainLayout /> : <GuestLayout />}>
        <Route index element={isLoggedIn ? <Home /> : <Login />} />
      </Route>

      <Route path='/reports' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Login />} />
          <Route path = 'example' element={<Login />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path='/tickets' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Login />} />
          <Route path = 'example' element={<Login />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path='/collaborators' element={<PrivateRoute requiredRoles={["admin", "manager"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Login />} />
          <Route path = 'example' element={<Login />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path="*" element={<NotFound />} /> {/* redirect when route not found */}
    </Routes>
  );
}

export default App;
