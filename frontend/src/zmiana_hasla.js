
import Button from 'react-bootstrap/esm/Button';
import './panel.css';
import {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";



function Zmiana() {
  const [data, setData] = useState([]);
  const [newPass, setNewPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [mail, setMail] = useState(localStorage.getItem("mail"));
  const [logRes, setLogRes] = useState({"res": "F"});

  const fetchData = () => {
    const url = `http://127.0.0.1:8000/api/pharamcy/login?mail=${mail}&password=${oldPass}`;
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
  }, []);


  const check = () =>{
    if(newPass === newPassword){
        return true
    }
    else {
        return false
    }
  }

  const validateForm = () => {
    if(logRes === 'ok'){
        console.log("confirm")
        data.password = oldPass;
        return true
    }
    if (logRes === 'denial') {
        console.log('denail')
        return false
    }
}

    return (
      <div className="App">
        <header>
          <h1>TwojaApteka: Panel Pracownika</h1>
        </header>
                <article>
            <Form onSubmit={check}>
            <Form.Group size="lg" controlId="password">
          <Form.Label>Nowe hasło: </Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group><br /><br />
        <Form.Group size="lg" controlId="password">
          <Form.Label>Powtórz nowe hasło:</Form.Label>
          <Form.Control
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </Form.Group><br /><br />
        <Form.Group size="lg" controlId="password">
          <Form.Label>Zatwierdź starym hasłem: </Form.Label>
          <Form.Control
            type="password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
        </Form.Group><br /><br />
        <Button block="true" size="lg" type="submit" onClick={validateForm} id="zzmień">
				Zmień hasło
				</Button>
            </Form>


        </article>
      </div>
    );

}

export default Zmiana;
