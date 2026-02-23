import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConstructorPage } from './pages/constructor-page';
import { Feed } from './pages/feed';
import { ForgotPassword } from './pages/forgot-password';
import { Login } from './pages/login';
import { NotFound404 } from './pages/not-fount-404';
import { Profile } from './pages/profile';
import { ProfileOrders } from './pages/profile-orders';
import { Register } from './pages/register';
import { ResetPassword } from './pages/reset-password';
import { AppHeader } from './components/app-header';
import { ProtectedRoute } from './components/protected-route';
import { useSelector } from './services/store';
import '../../index.css';

const App = () => {
  const { user, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return null;
  }

  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/profile/orders/:number' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;