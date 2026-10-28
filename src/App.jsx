import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ComingSoon from './pages/ComingSoon';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { TimingsRatesPage } from './pages/TimingsRatesPage';
import { RulesFaqPage } from './pages/RulesFaqPage';
import { NoticesPage } from './pages/NoticesPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { CommitteePage } from './pages/CommitteePage';
import { SpecialDinnerPage } from './pages/SpecialDinnerPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/menu', element: <MenuPage /> },
      { path: '/timings-and-rates', element: <TimingsRatesPage /> },
      { path: '/rules-and-faq', element: <RulesFaqPage /> },
      { path: '/notices', element: <NoticesPage /> },
      { path: '/feedback', element: <FeedbackPage /> },
      { path: '/committee', element: <CommitteePage /> },
      { path: '/special-dinner', element: <SpecialDinnerPage /> },

      // Coming soon
      { path: '/mess-card', element: <ComingSoon title="Mess Card" /> },
      { path: '/gallery', element: <ComingSoon title="Gallery" /> },
      { path: '/about', element: <ComingSoon title="About" /> },
      { path: '*', element: <ComingSoon title="Page not found" /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}