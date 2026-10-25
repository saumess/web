import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ComingSoon from "./pages/ComingSoon";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <ComingSoon title="Home" /> },
      { path: "/menu", element: <ComingSoon title="Menu" /> },
      { path: "/rules-and-faq", element: <ComingSoon title="Rules and FAQ" /> },
      { path: "/timings-and-rates", element: <ComingSoon title="Timings and Rates" /> },
      { path: "/mess-card", element: <ComingSoon title="Mess Card" /> },
      { path: "/notices", element: <ComingSoon title="Notices" /> },
      { path: "/feedback", element: <ComingSoon title="Feedback and Requests" /> },
      { path: "/committee", element: <ComingSoon title="Mess Committee" /> },
      { path: "/about", element: <ComingSoon title="About" /> },
      { path: "*", element: <ComingSoon title="Page not found" /> },
    ],
  },
]);

export default router;