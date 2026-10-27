import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ComingSoon from './pages/ComingSoon';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { FeedbackPage } from './pages/FeedbackPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/menu', element: <MenuPage /> },
      { path: '/feedback', element: <FeedbackPage /> },

      // Built next: swap this one for the real page
      { path: '/rules-and-faq', element: <ComingSoon title="Rules and FAQ" /> },

      // Coming soon
      { path: '/timings-and-rates', element: <ComingSoon title="Timings and Rates" /> },
      { path: '/mess-card', element: <ComingSoon title="Mess Card" /> },
      { path: '/notices', element: <ComingSoon title="Notices" /> },
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