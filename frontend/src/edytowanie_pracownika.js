
import './panel.css';
import {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";


function Edytowanie_pracownika() {
  const [data, setData] = useState([]);
  const [filia, setFilia] = useState("");
  const [newValue, setValue] = useState("");
  const [item, setItem] = useState("");


  const fetchData = () => {
    const url = `http://127.0.0.1:8000/api/pharamcy/login?filia=${filia}`
    fetch(url)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [filia]);


  const zmieniacz = (item) =>{
    data.item = newValue;
  }

    return (
      <div className="App">
        <body>
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
                <form>
                    <Form.Group size="lg" controlId="filia">
                      <Form.Label>Filia pracownika do zwolnienia: </Form.Label>
                      <Form.Control
                          autoFocus
                          type="text"
                          value={filia}
                          onChange={(e) => setFilia(e.target.value)}
                          />
                        </Form.Group>
                        <input type="submit" value="Zatwierdź" />
                    </form>
                    <br />
                    <h4> Lista pracowników wybranej filii: </h4>
                    <form >
                    <select name="filia_x" >
                    {data.map((item, index) => (
                        <option key={index} value={item.surname}></option>
                        ))}
                    </select>
                    </form>
                <br />
                <br /> 
                <h4> Wybierz daną, którą chcesz edytować</h4>
                <form>
                    <input type="radio" name="option" value="name" />Imię
                    <input type="radio" name="option" value="surname" />Nazwisko
                    <input type="radio" name="option" value="email" />Email
                    <input type="radio" name="option" value="place" checked />Filia
                </form>
                <br />
                <form>
                <Form.Group>
                <Form.Label> Nowa wartość danej: </Form.Label>
                      <Form.Control
                          autoFocus
                          type="text"
                          value={newValue}
                          onChange={(e) => setValue(e.target.value)}
                          />
                </Form.Group>
                </form>
                
                <br />
                <br />
                <form action="#">
                    <input type="submit" value="Aktualizuj" />
                </form>

            </article>
        </body>  
      </div>
    );

}

export default Edytowanie_pracownika;
