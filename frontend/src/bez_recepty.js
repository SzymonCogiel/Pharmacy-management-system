
import './panel.css';
import { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function Bez_recepty() {

    const [data, setData] = useState([]);
    const [paragon, setParagon] = useState([]);
    const [name, setName] = useState("");
    const [count, setCount] = useState("");

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
  

    const zmieniacz = () =>{
        paragon = {"drugname" : name};
        paragon = {"amount" : count};
        paragon = {"price" : data.price*count}

    }

    const updateTable = () =>{
        setName("");
        setCount("");

    }

  return (
            <div>
             <body>   
                <header>
                    <h1>TwojaApteka: Panel Pracownika</h1>
                </header>

                <article>
                    <Form>
                    <Form.Group size="lg" controlId="name">
                    <Form.Label>Nazwa:</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <br /><br />
                    <Form.Group size="lg" controlId="count">
                    <Form.Label>Ilość sztuk:</Form.Label>
                    <Form.Control
                        type="text"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}/>
                    </Form.Group>
                        <Button block="true" size="lg" type="submit" onClick={zmieniacz} id="dodaj">Dodaj produkt</Button>
                    </Form>
                    <br />
                    <br />
                    <h2>Twój koszyk</h2>
                    {/* Tu musze ogarnac jak tworzyc taka nowa tabelke ktora jest imitacja paragonu, plus na dole funkcje zliczajaca sume do zaplaty z tej tabeli */}
                    <table>
                        <tr><th>Nazwa</th><th>Liczba sztuk</th><th>Cena</th></tr>
                        {data.map((item, index) => (
                            <tr key={index}>
                            <td>{item.drugname}</td>
                            <td>{item.amount}</td>
                            <td>{item.price}</td>
                            </tr>
                        ))}
                    </table>
                    <h3>Razem do zapłaty: </h3>

                    <Form>
                        <Button block="true" size="lg" type="submit" onClick={updateTable} id="zaakceptuj">Zatwierdź płatność</Button>
                    </Form>

                </article>
            </body>
            </div>
  );

}

export default Bez_recepty;
