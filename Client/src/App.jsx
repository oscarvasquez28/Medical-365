import { Routes, Route } from "react-router-dom";
import MainLayout from "./common/layouts/MainLayout";
import Home from "./common/pages/Home";
import NotFound from "./common/pages/NotFound";
import PrivateRoute from "./common/components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='/reports' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Home />} />
          <Route path = 'example' element={<Home />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path='/tickets' element={<PrivateRoute requiredRoles={["admin", "basic"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Home />} />
          <Route path = 'example' element={<Home />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path='/collaborator' element={<PrivateRoute requiredRoles={["admin", "manager"]} layout={MainLayout}/>}> {/* modify the layout depending on the module */}
          <Route index element={<Home />} />
          <Route path = 'example' element={<Home />} /> {/* add more routes, modify the path and the element */}
      </Route>

      <Route path="*" element={<NotFound />} /> {/* redirect when route not found */}
    </Routes>
  );
}

export default App;
