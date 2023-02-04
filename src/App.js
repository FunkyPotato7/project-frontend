import { Navigate, Route, Routes } from "react-router-dom";

import { RequireAuth } from "./hoc";
import { MainLayout } from "./layouts";
import { LoginPage, NotFoundPage, PaidPage } from "./pages";


function App() {
    return (
      <Routes>
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<Navigate to={'/login'}/>}/>
              <Route path={'/login'} element={<LoginPage/>}/>
              <Route path={'/paid'} element={
                  <RequireAuth>
                      <PaidPage/>
                  </RequireAuth>
              }/>
          </Route>
          <Route path={'*'} element={<NotFoundPage/>}/>
      </Routes>
    );
}

export default App;
