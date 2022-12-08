
import Button from 'react-bootstrap/esm/Button';
import './panel.css';
import {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";


function Recepta() {
  const [data, setData] = useState([]);
  const [pesel, setPesel] = useState("");
  const [number, setNumber] = useState("");

  const fetchData = () => {
      const url = `http://127.0.0.1:8000/api/pharamcy/recepty?pesel=${pesel}&number=${number}`
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
  }, [ pesel]);


  const zmieniacz = () =>{


  }

    return (
      <div className="App">
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
                  <br />
                <Form>
                    <Form.Group size="lg" controlId="number">
                    <Form.Label>Numer recepty :</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)} />
                    </Form.Group>
                    <br /><br />
                    <Form.Group size="lg" controlId="pesel">
                    <Form.Label>Pesel:</Form.Label>
                    <Form.Control
                        type="text"
                        value={pesel}
                        onChange={(e) => setPesel(e.target.value)}/>
                    </Form.Group>
                    <br />
                        <Button block="true" size="lg" type="submit" onClick={zmieniacz} id="dodaj">Dodaj produkt</Button>
                    </Form>
                </article>
      </div>
    );

}

export default Recepta;
