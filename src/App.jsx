import NavBar from "./Components/Landing/Layout/NavBar.jsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";


function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
