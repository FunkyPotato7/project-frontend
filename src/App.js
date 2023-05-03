import { Navigate, Route, Routes } from "react-router-dom";

import { ActivatePage, AdminPage, BannedPage, LoginPage, NotFoundPage, PaidPage } from "./pages";
import { MainLayout, UnauthorizedLayout } from "./layouts";
import { AutoRedirect, RequireAuth } from "./hoc";


function App() {
    return (
      <Routes>
          <Route path={'/'} element={
              <AutoRedirect>
                <UnauthorizedLayout/>
              </AutoRedirect>
          }>
              <Route index element={<Navigate to={'/login'}/>}/>
              <Route path={'/login'} element={<LoginPage/>}/>
          </Route>
          <Route path={'/'} element={
              <RequireAuth>
                <MainLayout/>
              </RequireAuth>
          }>
              <Route index element={<Navigate to={'/paid'}/>}/>
              <Route path={'/paid'} element={<PaidPage/>}/>
              <Route path={'/admin'} element={<AdminPage/>}/>
          </Route>
          <Route path={'/activate/:id'} element={<ActivatePage/>}/>
          <Route path={'/bannedPage'} element={<BannedPage/>}/>
          <Route path={'*'} element={<NotFoundPage/>}/>
      </Routes>
    );
}

export default App;
