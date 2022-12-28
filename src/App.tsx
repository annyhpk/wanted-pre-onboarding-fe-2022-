import React, {lazy, Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';

// GlobalNavBar and Loading
import GlobalNavBar from './components/GNB';
import Loading from './components/Spiner';

// Pages
import MainPage from './pages/MainPage';
const LoginInPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const TodoPage = lazy(() => import('./pages/TodoPage'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <GlobalNavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="todo" element={<TodoPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
