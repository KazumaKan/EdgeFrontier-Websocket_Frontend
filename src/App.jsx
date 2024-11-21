import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// import NavBar from './assets/NavBar'
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import GraphHardware from "./pages/GraphHardware";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route index element={<GraphHardware />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
