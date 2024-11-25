import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import DataHardware from "./pages/DataHardware";
import GraphHardware from "./pages/GraphHardware";
import Total from "./pages/Total";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/DataHardware" element={<DataHardware />} />
        <Route path="/GraphHardware" element={<GraphHardware />} />
        <Route path="/Total" element={<Total />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
