
import './panel.css';


function Edycja_Admin() {



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
                        <a href="edycja_admin.js">Zarządzaj kontem</a>
                        <br />
                        <hr />
                        <a href="./App.js">Wyloguj</a>
                    </ul>
                </nav>

                <article>
                <a href="zmiana_hasla.js">Zmień swoje hasło</a>
                <a href="usuwanie_pracownika.js">Usuń pracownika z systemu</a>
                <a href="App.js">Dodaj pracownika do systemu</a>
                <a href="edytowanie_pracownika.js">Edytuj pracownika</a>
                </article>
            </div>
  );

}

export default Edycja_Admin;
