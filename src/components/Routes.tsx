import { Route, Routes } from "react-router-dom";
import Add from "./Add";
import Edit from "./Edit";
import DashBoard from "./DashBoard";
import Companies from "./Company";

const MyRoutes = () => {
  return (
    <div style={{ position: "absolute", top: "10%" }}>
      <Routes>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit/:selectId" element={<Edit />}></Route>
        <Route path="/companies" element={<Companies />}></Route>
        <Route path="/companies" element={<Companies />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/companies" element={<Companies />}></Route>
        <Route path="/companies" element={<Companies />}></Route>
      </Routes>
    </div>
  );
};

export default MyRoutes;
