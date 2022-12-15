import './dashboard.css'
import { useState, useRef, useEffect } from 'react';
import wykres1 from './Plots/cena.png';
import wykres2 from './Plots/rodzaje.png';
//import wykres3 from './wid.png';
//import wykres4 from './crc.jpg';
import { useForm } from 'react-hook-form';


function Dashboard() {
    
        
 

    return (
     <body> <div>
          <header>
              <h1>TwojaApteka: Raporty</h1>
          </header>

          <article>
              <h2>
                  Twoje raporty:
                  <br></br>
                  </h2> </article>
                  <div class="row">
                  <div class='wykresy'>
              <img src={wykres1} alt="" class='wykresy'/> 
              <img src={wykres2} alt="" class='wykresy'/>
              </div>
</div>

          

  </div></body>
);

}

export default Dashboard;