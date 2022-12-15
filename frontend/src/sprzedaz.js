import { Outlet, Link } from "react-router-dom";
import './panel.css';


function Sprzedaz() {



  return (
            <div>
                <header>
                    <h1>TwojaApteka: Panel Pracownika</h1>
                </header>

                <article>
                <Link to="/recepta">Zrealizuj recepte</Link>
                <Link to="/bez_recepty">Zakupy bez recepty</Link>
                </article>
            </div>
  );

}

export default Sprzedaz;
