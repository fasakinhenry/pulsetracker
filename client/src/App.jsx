import { Route, Routes } from 'react-router-dom';
import Home from './pages/landing/Home.jsx';
import Login from './pages/auth/Login.jsx';
import EmailVerify from './pages/auth/EmailVerify.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from "./pages/landing/Homepage.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import {
    AIContextPage,
    AnalyticsPage, CompliancePage,
    CustomersPage,
    DataHubPage, DataRightsPage,
    IntegrationsPage, SettingsPage, SocialsPage
} from "./pages/dashboard/Page.jsx";
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import AlertsPage from './pages/dashboard/AlertsPage.jsx'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/dashboard' element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path='dashboard' element={<DashboardPage />} />
              <Route path='customers' element={<CustomersPage />} />
              <Route path='alerts' element={<AlertsPage />} />
              <Route path='integrations' element={<IntegrationsPage />} />
              <Route path='analytics' element={<AnalyticsPage />} />
              <Route path='socials' element={<SocialsPage />} />
              <Route path='aicontext' element={<AIContextPage />} />
              <Route path='datahub' element={<DataHubPage />} />
              <Route path='datarights' element={<DataRightsPage />} />
              <Route path='compliance' element={<CompliancePage />} />
              <Route path='settings' element={<SettingsPage />} />
          </Route>
      </Routes>
    </div>
  );
};

export default App;
