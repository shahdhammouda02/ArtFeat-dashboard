// import node module libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

// import layouts
import AuthenticationLayout from "layouts/AuthenticationLayout";
import RootLayout from "layouts/RootLayout";

// auth pages
import SignIn from "./pages/auth/SignIn";
import ForgetPassword from "pages/auth/ForgetPassword";
import SignUp from "pages/auth/SignUp";

// Dashboard main pages
const Dashboard = lazy(() => import("pages/dashboard/Index"));
const Billing = lazy(() => import("pages/dashboard/pages/Billing"));
const Pricing = lazy(() => import("pages/dashboard/pages/Pricing"));
const Settings = lazy(() => import("pages/dashboard/pages/Settings"));
const Profile = lazy(() => import("pages/dashboard/pages/Profile"));
const NotFound = lazy(() => import("pages/dashboard/pages/NotFound"));

// Events
const Events = lazy(() => import("pages/dashboard/pages/Events/Events"));
const Profiles = lazy(() => import("pages/dashboard/pages/Events/Profiles"));

// Auctions
const Auctions = lazy(() => import("pages/dashboard/pages/Auctions/Auctions"));
const AuctionDetails = lazy(() => import("pages/dashboard/pages/Auctions/AuctionDetails"));

// Support Artists
const DonationFormSettings = lazy(() =>
  import("pages/dashboard/pages/Support Artists/DonationFormSettings")
);
const SuccessStories = lazy(() =>
  import("pages/dashboard/pages/Support Artists/SuccessStories")
);
const HeroSection = lazy(() =>
  import("pages/dashboard/pages/Support Artists/HeroSection")
);
const DonationManagement = lazy(() =>
  import("pages/dashboard/pages/Support Artists/DonationManagement")
);


const App = () => {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      Component: RootLayout,
      errorElement: (
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      ),
      children: [
        {
          id: "dashboard",
          path: "/",
          Component: () => (
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          id: "pages",
          path: "/pages",
          children: [
            {
              path: "profile",
              Component: () => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </Suspense>
              ),
            },
            {
              path: "settings",
              Component: () => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Settings />
                </Suspense>
              ),
            },
            {
              path: "billing",
              Component: () => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Billing />
                </Suspense>
              ),
            },
            {
              path: "pricing",
              Component: () => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Pricing />
                </Suspense>
              ),
            },

            // Events
            {
              path: "events",
              children: [
                {
                  path: "",
                  Component: () => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <Events />
                    </Suspense>
                  ),
                },
                {
                  path: "profiles",
                  Component: () => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <Profiles />
                    </Suspense>
                  ),
                },
              ],
            },

            // Auctions
            {
              path: "auctions",
              children: [
                {
                  path: "",
                  Component: () => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <Auctions />
                    </Suspense>
                  ),
                },
                {
                  path: ":id",
                  Component: () => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <AuctionDetails />
                    </Suspense>
                  ),
                },
              ],
            },

            // Support Artists
            {
              path: "support-artists",
              children: [
                {
                  path: "donation-management",
                  Component: () => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <DonationManagement />
                    </Suspense>
                  ),
                },
                {
                  path: "hero-section",
                  Component: () => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <HeroSection />
                    </Suspense>
                  ),
                },
                {
                  path: "success-stories",
                  Component: () => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <SuccessStories />
                    </Suspense>
                  ),
                },
                {
                  path: "donation-form-settings",
                  Component: () => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <DonationFormSettings />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },

    {
      id: "auth",
      path: "/auth",
      Component: AuthenticationLayout,
      children: [
        { id: "sign-in", path: "sign-in", Component: SignIn },
        { id: "sign-up", path: "sign-up", Component: SignUp },
        { id: "forget-password", path: "forget-password", Component: ForgetPassword },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
