import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import EmployeeTable from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Allowance from "./pages/payroll/Transaction/Allowance"
import Deduction from "./pages/payroll/Transaction/Deduction";
import Earnings from "./pages/payroll/Transaction/Earnings";
import Loans from "./pages/payroll/Transaction/Loans";
import BeginningBalance from "./pages/payroll/Transaction/BeginningBalance";
import ProcessingSetup from "./pages/payroll/Processing/ProcessingSetup";
import PrivateRoute from "./PrivateRoute";
import AllowanceComponent from "./pages/payroll/Transaction/Allowance";
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/basic-tables" element={<EmployeeTable />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
          <Route path="/payroll/transaction/allowance" element={<AllowanceComponent />} />
          <Route path="/payroll/transaction/deduction" element={<Deduction />} />
          <Route path="/payroll/transaction/earnings" element={<Earnings />} />
          <Route path="/payroll/transaction/loans" element={<Loans />} />
          <Route path="/payroll/transaction/beginningbalance" element={<BeginningBalance />} />
          <Route path="/payroll/processing/processingsetup" element={<ProcessingSetup />} />
        </Route>

        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

