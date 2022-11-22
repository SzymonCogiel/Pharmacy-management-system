
import './panel.css';
import { useFetch} from 'react';



function Panel() {
	const [name, getName] = useFetch("api");
	const [surname, getSurname] = useFetch("api");
	const [filia, getFilia] = useFetch("api");


  return (
            <div>
                <header>
                    <h1>TwojaApteka: Panel Pracownika</h1>
                </header>


                <nav>
                    <ul>
                        <a href="panel_glowny.js">Strona główna</a> 
                        <br></br>
                        <hr></hr>
                        <a href="dostepne_leki.js">Dostępne leki</a> 
                        <br></br>
                        <hr></hr>
                        <a href="zamiennik.js">Znajdź lek lub zamiennik</a>
                        <br></br>
                        <hr></hr>                  
                        <a href="sprzedaz.js">Dokonaj sprzedaży</a>
                        <br></br>
                        <hr></hr>
                        <a href="hurtownia.js">Zamów z hurtowni</a>
                        <br></br>
                        <hr></hr>
                        <a href="#">Generuj raport</a>
                        <br></br>
                        <hr></hr>
                        <a href="edycja.js">Zarządzaj kontem</a>
                        <br></br>
                        <hr></hr>
                        <a href="./App.js">Wyloguj</a>
                    </ul>
                </nav>

                <article>
                    <p>
                        Zalogowałeś się jako: getName() getSurname()
                        <br></br>
                        Pracujesz w filii: getFilia()
                    </p>
                </article>
        </div>
  );

}

export default Panel;
