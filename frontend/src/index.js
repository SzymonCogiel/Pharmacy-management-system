import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Sprzedaz from './sprzedaz';
import Panel from './panel_glowny';
import Dostepne_leki from './dostepne_leki';
import reportWebVitals from './reportWebVitals';
import Bez_recepty from './bez_recepty';
import Zamiennik from './zamiennik';
import Recepta from './recepta';
import Hurtownia from './hurtownia';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Panel /> */}
    { /*<Dostepne_leki/> */}
    {/* <Zamiennik /> */}
    {/*<Sprzedaz /> */} 
    { /*<Recepta /> */}
    { /*<Bez_recepty />*/}
    <Hurtownia /> 



  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
