import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/Layout";
import CheckIn from "./pages/checkin/CheckIn";
import DashBoard from "./pages/dashboard/DashBoard";
import ScanCode from "./pages/scan/ScanCode";
import Wallet from "./pages/wallet/Wallet";
import WatchVideo from "./pages/watch/WatchVideo";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="checkin" element={<CheckIn />} />
          <Route path="watch" element={<WatchVideo />} />
          <Route path="scan" element={<ScanCode />} />
          <Route path="wallet" element={<Wallet />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
