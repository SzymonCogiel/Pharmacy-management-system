
import './panel.css';
import {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import './panel.css';

function Zamiennik2() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");


  const fetchData = () => {
      const url = `http://127.0.0.1:8000/api/pharamcy/drugs?condition=${name}`
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
  }, [name]);


    return (
      <div className="App">
      
        <body>
        <header>
          <h1>TwojaApteka: Panel Pracownika</h1>
        </header>
        <article>
            <h2>Wyszukiwarka leków</h2>

            <Form>
            <Form.Group size="lg" controlId="name">
                    <Form.Label>Nazwa dolegliwości :</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
            </Form.Group>
                {/*<input type="hidden" name="ie" value="utf-8" />
                <input type="radio" name="lr" value="" id="lr0" checked /> <label for="lr0">Sortuj według nazwy</label>
                <input type="radio" name="lr" value="lang_pl" id="lr1" /> <label for="lr1">Sortuj według odległości</label>
    <input type="submit" value="Szukaj" />*/}
            </Form>
            <br />
            <br />
            <caption>{name}</caption>
            <table>
                {/* potrzebna mi tutaj tabelka i sortowania*/}
                <tr><th>Nazwa leku</th><th>Ocena 1-10:</th><th>Obecny stan magazynowy:</th></tr>
                {data.map((item, index) => (
             <tr key={index}>
            <td>{item.drugname}</td>
            <td>{item.rating}</td>
            <td>{item.usefulcount}</td>
            </tr>
            ))}
            </table>        
        </article>
        </body>  
      </div>
    );

}

export default Zamiennik2;
