import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllTasks from "./Page/AllTasks";
import { ROUTES } from "./constants/router";
import NewTasks from "./Page/NewTasks";
import DoingTasks from "./Page/DoingTasks";
import DoneTasks from "./Page/DoneTasks";
import AddNewTask from "./Page/AddNewTask";
import UpdateTask from "./Page/UpdatePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<AllTasks />} />
            <Route path={ROUTES.ALL_TASK} element={<AllTasks />} />
            <Route path={ROUTES.UPDATE_TASK} element={<UpdateTask />} />
            <Route path={ROUTES.NEW_TASK} element={<NewTasks />} />
            <Route path={ROUTES.DOING_TASK} element={<DoingTasks />} />
            <Route path={ROUTES.DONE_TASK} element={<DoneTasks />} />
            <Route path={ROUTES.ADD_NEW} element={<AddNewTask />} />
          </Route>
          <Route path={"/"} element={<Navigate to={ROUTES.ALL_TASK} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
