import { Outlet, Link } from "react-router-dom";
import './panel.css';


function Edycja() {



  return (
            <div>
                <header>
                    <h1>TwojaApteka: Panel Pracownika</h1>
                </header>

                <article>
                <Link to="/zmiana">Zmień swoje haslo</Link>
                </article>
            </div>
  );

}

export default Edycja;
