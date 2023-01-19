import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import NoPage from './NoPage';
import Layout from './Layout';

import App from './App';
import Sprzedaz from './sprzedaz';
import Panel from './panel_glowny';
import Dostepne_leki from './dostepne_leki';
import Bez_recepty from './bez_recepty';
import Zamiennik2 from './zamiennik2';
import Zamiennik from './zamiennik';
import Recepta from './recepta';
import Hurtownia from './hurtownia';
import Edycja from './edycja';
import Edycja_Admin from './edycja_admin';
import Usuwanie from './usuwanie_pracownika';
import Edytowanie_pracownika from './edytowanie_pracownika';
import Zmiana from './zmiana_hasla';
import Dashboard from './dashboard';


export default function AppDef() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="login" element={<App />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Panel />} />
          <Route path="hurtownia" element={<Hurtownia />} />
          <Route path="dostepneleki" element={<Dostepne_leki />} />
          <Route path="doleg" element={<Zamiennik2 />} />
          <Route path="zamie" element={<Zamiennik />} />
          <Route path="sprzedaz" element={<Sprzedaz />} />
          <Route path="recepta" element={<Recepta />} />
          <Route path="bez_recepty" element={<Bez_recepty />} />
          <Route path="raport" element={<Dashboard />} />
          <Route path="edycja" element={<Edycja />} />
          <Route path="zmiana" element={<Zmiana />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AppDef />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
