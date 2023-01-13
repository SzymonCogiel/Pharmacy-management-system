
import Button from 'react-bootstrap/esm/Button';
import './panel.css';
import {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";


function Recepta() {
  const [data, setData] = useState([]);
  const [pesel, setPesel] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const fetchData = () => {
      const url = `http://127.0.0.1:8000/api/pharamcy/prescription?pesel=${pesel}&prescription_id=${number}`
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
    navigate('/bez_recepty');

  }

    return (
      <div className="App">
        <header>
          <h1>TwojaApteka: Panel Pracownika</h1>
        </header>
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
