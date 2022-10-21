import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layout/layout";
import AddUser from "./pages/users/add-user";
import EditUser from "./pages/users/edit-user";
import UserList from "./pages/users/user-list"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserList />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
