import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "./layouts";
import { LoginPage } from "./pages";
import { PaidPage } from "./pages/PaidPage/PaidPage";


function App() {
    return (
      <Routes>
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<Navigate to={'/login'}/>}/>
              <Route path={'/login'} element={<LoginPage/>}/>
              <Route path={'/paid'} element={<PaidPage/>}/>
          </Route>
      </Routes>
    );
}

export default App;
