import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import GlobalStyles from './GlobalStyles';
import Header from '../src/components/header';
import Home from './pages/home';
import { DocRegistrar } from './pages/upload-doc';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyles/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='upload' element={<DocRegistrar />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
