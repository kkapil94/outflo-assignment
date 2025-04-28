import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Components
import LinkedInMessageGenerator from "./components/campaigns/LinkedInMessageGenerator";
import { CampaignProvider } from "./context/CampaignContext";

// Campaign Pages
import CampaignsPage from "./pages/campaigns/CampaignsPage";
import CampaignDetailPage from "./pages/campaigns/CampaignDetailPage";
import CreateCampaignPage from "./pages/campaigns/CreateCampaignPage";
import EditCampaignPage from "./pages/campaigns/EditCampaignPage";

function App() {
  return (
    <Router>
      <CampaignProvider>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <nav className="flex justify-between">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">OutFlo</h1>
                </div>
                <div className="flex space-x-4">
                  <Link to="/" className="text-gray-600 hover:text-gray-900">
                    Message Generator
                  </Link>
                  <Link
                    to="/campaigns"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Campaigns
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<LinkedInMessageGenerator />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/campaigns/new" element={<CreateCampaignPage />} />
              <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
              <Route
                path="/campaigns/:id/edit"
                element={<EditCampaignPage />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>

        <ToastContainer position="bottom-right" />
      </CampaignProvider>
    </Router>
  );
}

export default App;
