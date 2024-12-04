import { Routes, Route } from "react-router";
import { Menu, NewDish, Orders } from "./components/pages/index";
import { SideBar } from "./components/ui";

function App() {
  return (
    <div className="md:flex min-h-screen">
      <SideBar />
      <div className="md:w-3/5 xl:w-4/5">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/new-dish" element={<NewDish />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
