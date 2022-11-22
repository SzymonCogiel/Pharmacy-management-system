
import './panel.css';
import {useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function Sprzedaz() {
	const [name, setName] = useState("");
	const [count, setCount] = useState("");


    const value = () => {
        const price =document.getElementByElement(name)*count;

	}

    const validateForm = () => {
        if(document.getElementsByName(name)){

            if(document.getElementsByName(count)>= count){
                return true
            }
        }
        return false
    }

    const updateTable = () => {
       /* for(x 1:rows){
                        if(document.getElementsByName(name)){

                            if(document.getElementsByName(count)> count){
                                // tu trzeba wtedy jakby setCount(document.getElementsByName(count) - count)
                            }
                            else
                            {
                                //wyrzucic calkowicie rekord z bazy
                            }
                        }
                    
                    }
        */
        }




  return (
            <div>
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
                    <Form onSubmit={value}>
                        <Form.Label>Nazwa:</Form.Label>
                        <Form.Control type="text" value = {name} /><br /><br />
                        <Form.Label>Ilość sztuk:</Form.Label>
                        <Form.Control type="text" value = {count} /><br /><br />
                        <Button block="true" size="lg" type="submit" onClick={validateForm} id="dodaj">Dodaj produkt</Button>
                    </Form>

                    <br />
                    <br />
                    <h2>Twój koszyk</h2>
                    <table>
                        <tr><th>Nazwa</th><th>Liczba sztuk</th><th>Cena</th></tr>
                        <tr><td>get(name)</td><td>get(count)</td><td>get(price)</td></tr>
                    </table>
                    <h3>Razem do zapłaty: </h3>

                    <Form>
                        <Button block="true" size="lg" type="submit" onClick={updateTable} id="zaakceptuj">Zatwierdź płatność</Button>
                    </Form>

                </article>

            </div>
  );

}

export default Sprzedaz;
