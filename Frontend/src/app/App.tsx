import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './providers/AuthContext';
import { LanguageProvider } from '../shared/lib/i18n/LanguageContext';
import { ProtectedRoute } from '../features/auth/ui/ProtectedRoute';
import { LoginPage } from '../pages/login/ui/LoginPage';
import { RegisterPage } from '../pages/register/ui/RegisterPage';
import { DashboardPage } from '../pages/dashboard/ui/DashboardPage';
import { MiroAppLifecycle } from '../features/miro/ui/MiroAppLifecycle';

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <MiroAppLifecycle />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}