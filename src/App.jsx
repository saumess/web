import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ComingSoon from './pages/ComingSoon';
import { Home } from './pages/Home';
import { MenuPage } from './pages/MenuPage';
import { TimingsRatesPage } from './pages/TimingsRatesPage';
import { RulesFaqPage } from './pages/RulesFaqPage';
import { NoticesPage } from './pages/NoticesPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { CommitteePage } from './pages/CommitteePage';
import { PhotoCreditsPage } from './pages/PhotoCreditsPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <MenuPage /> },
      { path: '/timings-and-rates', element: <TimingsRatesPage /> },
      { path: '/rules-and-faq', element: <RulesFaqPage /> },
      { path: '/notices', element: <NoticesPage /> },
      { path: '/feedback', element: <FeedbackPage /> },
      { path: '/committee', element: <CommitteePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/photo-credits', element: <PhotoCreditsPage /> },
      { path: '/gallery', element: <GalleryPage /> },

      // Coming soon
      
      
      { path: '*', element: <ComingSoon title="Page not found" /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}