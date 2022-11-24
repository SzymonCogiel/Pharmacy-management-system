
import './panel.css';


function Edycja() {



  return (
            <div>
                <header>
                    <h1>TwojaApteka: Panel Pracownika</h1>
                </header>


                <nav>
                    <ul>
                        <a href="panel_glowny.js">Strona główna</a> 
                        <br />
                        <hr />
                        <a href="dostepne_leki.js">Dostępne leki</a> 
                        <br />
                        <hr />
                        <a href="zamiennik.js">Znajdź lek lub zamiennik</a>
                        <br /> 
                        <hr />                   
                        <a href="sprzedaz.js">Dokonaj sprzedaży</a>
                        <br />
                        <hr />
                        <a href="hurtownia.js">Zamów z hurtowni</a>
                        <br />
                        <hr />
                        <a href="#">Generuj raport</a>
                        <br />
                        <hr />
                        <a href="edycja.js">Zarządzaj kontem</a>
                        <br />
                        <hr />
                        <a href="./App.js">Wyloguj</a>
                    </ul>
                </nav>

                <article>
                <a href="zmiana_hasla.js">Zmień swoje hasło</a>
                </article>
            </div>
  );

}

export default Edycja;
