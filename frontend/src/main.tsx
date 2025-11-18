import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import GlobalStyles from './GlobalStyles';
import Header from '../src/components/header';
import Home from './pages/home';
import DocRegistrar from './pages/upload-doc';
import DocVerificar from './pages/verify-doc';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyles/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='upload/' element={<DocRegistrar />} />
        <Route path='check/' element={<DocVerificar />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
