import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import GlobalStyles from './GlobalStyles';
import Header from '../src/components/header';
import Home from './pages/home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyles/>
    <Header/>
    <Home/>
  </StrictMode>,
)
