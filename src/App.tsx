import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthGuard, RolGuard } from "./guards";
import { PrivateRoutes, PublicRoutes, Roles } from "./models";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound.utility";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Logout } from "./components/logout";
import Dashboard from "./pages/PRIVATE/dashboard/Dashboard";

const Login = lazy(() => import("./pages/login/Login"));
const Private = lazy(() => import("./pages/PRIVATE/Private"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Cargando</>}>
        <Provider store={store}>
          <BrowserRouter>
            <Logout />
            <RoutesWithNotFound>
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.PRIVATE} />}
              />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
              <Route element={<RolGuard rol={Roles.ADMIN} />}>
                <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
