
import './panel.css';
import {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";


function Usuwanie() {
  const [data, setData] = useState([]);
  const [filia, setFilia] = useState("");



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


  const zmieniacz = () =>{


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
                {/* brakuje tu tego parametru filia do ogarniecia po nim, i guziki jakos popodpinac, ten na dole na usuwac ludzia z bazy*/}
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
                    <br />
                    <form >
                        <input type="submit" value="Zwolnij" />
                    </form>

                </article>
        </body>  
      </div>
    );

}

export default Usuwanie;
