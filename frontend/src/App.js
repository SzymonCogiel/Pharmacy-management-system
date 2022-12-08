import avatar from './img/avatar.png';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function App() {
	const [auth, setAuth] = useState("");
	const [logRes, setLogRes] = useState({"res": "F"});
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");

	const download = () => {
		const url = `http://127.0.0.1:8000/api/pharamcy/login?mail=${mail}&password=${password}`;
		axios.get(url)
		.then(({data}) => {setLogRes(data.res)});
	}


	const validateForm = () => {
			if(logRes === 'ok'){
				console.log("confirm")
				setAuth("git")
				return true
			}
			if (logRes === 'denial') {
				console.log('denail')
				setAuth("zle haslo lub mail")
				return false
			}
		}


  return (
		<div className= "loginbox">
		<img src={avatar} alt=''className = "avatar"/>
			<h1>Zaloguj się</h1>
			<Form onSubmit={download}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Haslo</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
		<p id='valider'>{auth}</p>
		<div className='submitow'>
			<div class="submitow-center">
				<Button block="true" size="lg" type="submit" onClick={validateForm} id="zaloguj">
				Zaloguj
				</Button>
			</div>
		</div>
      </Form>
    </div>
  );
}

export default App;
