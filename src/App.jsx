import { lazy, Suspense } from 'react';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const SingleRoom = lazy(() => import('./pages/SingleRoom'));
const Error = lazy(() => import('./pages/Error'));

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loading from './components/Loading';


function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/rooms' element={ <Rooms /> } />
          <Route path='/rooms/:slug' element={ <SingleRoom /> } />
          <Route path='*' element={ <Error /> } />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
