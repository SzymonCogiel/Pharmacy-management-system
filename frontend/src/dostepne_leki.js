
import './panel.css';


function Dostepne_leki() {



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
                    <h2>Dostępne leki</h2>

                    <form action="#" method="get">
                        <input type="text" name="q" />
                        <input type="hidden" name="ie" value="utf-8" />
                        <input type="radio" name="lr" value="" id="lr0" checked  /> <label for="lr0">Sortuj według miejsca</label>
                        <input type="radio" name="lr" value="lang_pl" id="lr1" /> <label for="lr1">Sortuj według liczby sztuk</label>
                        <input type="submit" value="Szukaj" />
                    </form>
                    <br />
                    <br />
                    <table>s
                        <tr><th>Nazwa</th><th>Liczba sztuk</th><th>Recepta</th><th>Cena</th><th>Miejsce położenia</th></tr>
                        <tr><td>String</td><td>Int</td><td>Boolean</td><td>Double</td><td>String</td></tr>
                        <tr><td>String</td><td>Int</td><td>Boolean</td><td>Double</td><td>String</td></tr>
                    </table>
                </article>
            </div>
  );

}

export default Dostepne_leki;
