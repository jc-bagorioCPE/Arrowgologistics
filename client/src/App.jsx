import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import NewsPage from '@/pages/NewsPage';
import ArticlePage from '@/pages/ArticlePage';
import ContactPage from '@/pages/ContactPage';
import { Privacy, Terms } from '@/pages/LegalPages';

export default function App() {
  const services = useApi('/services');
  const locations = useApi('/locations');
  const categories = useApi('/categories');
  const news = useApi('/news');
  const data = { services, locations, categories, news };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home {...data} />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage services={services} />} />
          <Route path="services/:id" element={<ServicesPage services={services} />} />
          <Route path="news" element={<NewsPage news={news} />} />
          <Route path="news/:id" element={<ArticlePage news={news} />} />
          <Route path="contact" element={<ContactPage categories={categories.data} />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
