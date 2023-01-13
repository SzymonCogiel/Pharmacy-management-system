
import Button from 'react-bootstrap/esm/Button';
import './panel.css';
import {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";


function Dostepne_leki() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const fetchData = () => {
      const url = `http://127.0.0.1:8000/api/pharamcy/stock?drugname=${name}`
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
        <header>
          <h1>TwojaApteka: Panel Pracownika</h1>
        </header>

        <article>
            <h2>Dostępne leki</h2>

            <Form>
            <Form.Group size="lg" controlId="name">
                    <Form.Label>Nazwa:</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
            </Form.Group>
                <input type="hidden" name="ie" value="utf-8" />
                {/*<input type="radio" name="lr" value="" id="lr0" checked /> <label for="lr0">Sortuj według miejsca</label>
                <input type="radio" name="lr" value="lang_pl" id="lr1" /> <label for="lr1">Sortuj według liczby sztuk</label>*/}
            </Form>
            <br />
            <br />
            <table>
              {/* tu w tabeli do dorobienia jeszczemiejsce położenia(jakis randomowy zlep typu M-13 jako półka) + sortowania */}
            <tr><th>Nazwa</th><th>Liczba sztuk</th><th>Cena</th><th>Recepta</th></tr>
             {data.map((item, index) => (
             <tr key={index}>
            <td>{item.drugname}</td>
            <td>{item.amount}</td>
            <td>{item.price}</td>
            <td>{item.prescription}</td>
            </tr>
            ))}
            </table>         
        </article>
      </div>
    );

}

export default Dostepne_leki;
