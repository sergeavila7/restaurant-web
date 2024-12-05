import { Routes, Route } from "react-router";
import firebaseApp, { FirebaseContext } from "./firebase";
import { Menu, NewDish, Orders } from "./components/pages/index";
import { SideBar } from "./components/ui";

function App() {
  return (
    <FirebaseContext.Provider value={{firebaseApp}}>
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
    </FirebaseContext.Provider>
  );
}

export default App;
