
import './panel.css';
import {useState, useEffect} from 'react';



function Panel() {
    const [name, setName] = useState("");
    const [surname, setSurame] = useState("");
    const [pharmacy, setPharmacy] = useState("");
    const [user, setUser] = useState([]);
    const [mail, setMail] = useState(localStorage.getItem("mail"));

    const fetchData = () => {
        const url = `http://127.0.0.1:8000/api/pharamcy/user?mail=${mail}`;
      fetch(url)
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setUser(actualData);
          console.log(user);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, [mail]);


  return (
            <div>
                <header>
                    <h1>TwojaApteka: Panel Pracownika</h1>
                </header>
                <article>
                {user.map((item, index) => (
                    <p key={index}>
                        Zalogowałeś się jako: {item.name} {item.surname}
                        <br></br>
                        Pracujesz w filii: {item.pharmacy}
                    </p>
                    ))}          
                </article>
        </div>
  );

}

export default Panel;
