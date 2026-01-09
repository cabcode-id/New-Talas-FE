import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Page imports
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import SearchPage from "./pages/SearchPage";
import ClusterPage from "./pages/ClusterPage";
import AboutUsPage from "./pages/AboutUsPage";

// Keeping imports for future use
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SubscriptionPage from "./pages/SubscriptionPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/search" element={<MainLayout />}>
        <Route index element={<SearchPage />} />
      </Route>

      <Route path="/news/detail/:title_index" element={<MainLayout />}>
        <Route index element={<NewsPage />} />
      </Route>

      <Route path="/news/cluster/:index" element={<MainLayout />}>
        <Route index element={<ClusterPage />} />
      </Route>

      <Route path="/about-us" element={<MainLayout />}>
        <Route index element={<AboutUsPage />} />
      </Route>

      {/* Routes for future implementation
      <Route path='/login' element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      
      <Route path='/register' element={<AuthLayout />}>
        <Route index element={<RegisterPage />} />
      </Route>
      
      <Route path='/subscription' element={<MainLayout />}>
        <Route index element={<SubscriptionPage />} />
      </Route>
      */}
    </Routes>
  );
};

export default App;
