import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import PersistentDrawerLeft from "./pages/Drawer"
function App() {
  return (
    

    <Routes>
    <Route
              path="/"
              element={<PersistentDrawerLeft />}
            />
    </Routes>
  );
}

export default App;
