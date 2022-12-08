
import './panel.css';
import {useState, useEffect} from 'react';



function Panel() {
    const [user, setUser] = useState([]);
    const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");

    const fetchData = () => {
        const url = `http://127.0.0.1:8000/api/pharamcy/login?mail=${mail}&password=${password}`;
      fetch(url)
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setUser(actualData);
          console.log(user);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, []);


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
                        Zalogowałeś się jako: {user.name} {user.surname}
                        <br></br>
                        Pracujesz w filii: {user.filia}
                    </p>
                </article>
        </div>
  );

}

export default Panel;
