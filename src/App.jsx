import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ComingSoon from './pages/ComingSoon';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },

      // Built next: swap these two for the real pages
      { path: '/menu', element: <ComingSoon title="Menu" /> },
      { path: '/rules-and-faq', element: <ComingSoon title="Rules and FAQ" /> },

      // Coming soon
      { path: '/timings-and-rates', element: <ComingSoon title="Timings and Rates" /> },
      { path: '/mess-card', element: <ComingSoon title="Mess Card" /> },
      { path: '/notices', element: <ComingSoon title="Notices" /> },
      { path: '/feedback', element: <ComingSoon title="Feedback and Requests" /> },
      { path: '/committee', element: <ComingSoon title="Mess Committee" /> },
      { path: '/gallery', element: <ComingSoon title="Gallery" /> },
      { path: '/about', element: <ComingSoon title="About" /> },
      { path: '*', element: <ComingSoon title="Page not found" /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}