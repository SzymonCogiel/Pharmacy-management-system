
import './panel.css';
import {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";


function Hurtownia() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [radio, setRadio] = useState({"D":"H"});



  const fetchData = () => {
      const url = `http://127.0.0.1:8000/api/pharamcy/hurtownia?drugname=${name}`
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
  }, [radio]);


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
                    <h2>Zamówienia</h2>

                    <form>
                      <Form.Group size="lg" controlId="email">
                      <Form.Label>Nazwa leku/hurtowni </Form.Label>
                      <Form.Control
                          autoFocus
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>
                        <input type="radio" name="lr" value={radio} id="lr0" checked /> <label for="lr0">Szukaj po nazwie</label>
                        <input type="radio" name="lr" value={radio} id="lr1" /> <label for="lr1">Szukaj po hurtowni</label>
                        <input type="submit" value="Szukaj" />
                    </form>
                    <br />
                    <br />
                    <caption>{name}</caption>
                    <table>
                        <tr><th>Nazwa hurtowni/leku</th><th>Ilość sztuk</th><th>Zamów</th></tr>
                        <tr><td>String</td><td>Boolean</td><td><label for="fname">Ilość sztuk:</label><input type="text" id="fname" name="fname" /><br /><br /></td></tr>
                    </table>
                    <br />
                    <br />
                    <form action="#" method="get">
                        <input type="submit" value="Potwierdź zamówienia" />
                    </form>
                </article>
        </body>  
      </div>
    );

}

export default Hurtownia;
