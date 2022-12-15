
import './panel.css';
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';



function Hurtownia() {



  const [data, setData] = useState([]);
  const [warehouse, setWarehouse] = useState("");
  const [radio, setRadio] = useState({"D":"H"});
  const navigate = useNavigate();



  const fetchData = () => {
      const url = `http://127.0.0.1:8000/api/pharamcy/stock?warehouse=Hurtownia Farmaceutyczna ${warehouse}`
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
  }, [warehouse]);


  const zmieniacz = () =>{
    navigate('/');

  }

    return (
      <div className="App">
        <body>
        <header>
          <h1>TwojaApteka: Panel Pracownika</h1>
        </header>

                <article>
                    <h2>Zamówienia</h2>

                    <form>
                      <Form.Group size="lg" controlId="email">
                      <Form.Label>Nazwa hurtowni </Form.Label>
                      <Form.Control
                          autoFocus
                          type="text"
                          value={warehouse}
                          onChange={(e) => setWarehouse(e.target.value)}
                          />
                        </Form.Group>
                        {/*<input type="radio" name="lr" value={radio} id="lr0" checked /> <label for="lr0">Szukaj po nazwie</label>
                        <input type="radio" name="lr" value={radio} id="lr1" /> <label for="lr1">Szukaj po hurtowni</label>
    <input type="submit" value="Szukaj" />*/}
                    </form>
                    <br />
                    <br />
                    <caption>{warehouse}</caption>

                    <table>
              {/* tu w tabeli do dorobienia jeszczemiejsce położenia(jakis randomowy zlep typu M-13 jako półka) + sortowania */}
            <tr><th>Nazwa leku</th><th>Liczba sztuk</th><th>Zamów</th></tr>
             {data.map((item, index) => (
             <tr key={index}>
            <td>{item.drugname}</td>
            <td>{item.amount}</td>
            <td><label for="fname">Ilość sztuk:</label><input type="text" id="fname" name="fname" /><br /><br /></td>
            </tr>
            ))}
            </table>         
                    <br />
                    <br />
                    <form action="#" method="get">
                    <Button block="true" size="lg" type="submit" onClick={zmieniacz} id="zamów">
				Zamów
				</Button>
                    </form>
                </article>
        </body>  
      </div>
    );

}

export default Hurtownia;
