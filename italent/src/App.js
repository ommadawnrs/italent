import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from './pages/Intro';
import FirstStep from "./pages/FirstStep";
import SecondStep from "./pages/SecondStep";
import ThirdStep from "./pages/ThirdStep";
import FourthStep from "./pages/ForthStep";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <main className="main_container">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/firststep" element={<FirstStep />} />
          <Route path="/secondstep" element={<SecondStep />} />
          <Route path="/thirdstep" element={<ThirdStep />} />
          <Route path="/fourthstep/:token" element={<FourthStep />} />
        </Routes>
      </main>
      
    </BrowserRouter>
  );
}

export default App;
