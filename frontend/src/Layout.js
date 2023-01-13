import { Outlet, Link } from "react-router-dom";
import { useModal } from 'react-hooks-use-modal';
import './panel.css';

const Layout = () => {

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
      });

  return (
    <>
      <nav>
                    <ul>
                        <li>
                            <Link to="/">Strona glowna</Link>
                        </li>
                        <br></br>
                        <hr></hr>
                        <li>
                            <Link to="/dostepneleki">Dostępne leki</Link>
                        </li>
                        <br></br>
                        <hr></hr>
                        <li>
                            <Link to="/doleg">Szukaj po dolegliwości</Link>
                        </li>
                        <br></br>
                        <hr></hr>
                        <li>
                            <Link to="/zamie" onClick={open}>      
                            <Modal >
                                <div>
                                <h1>Uwaga!!!</h1>
                                <p>Strona w trakcie budowy <br/> Za utrudnienia przepraszamy!</p>
                                </div>
                            </Modal>
                            Znajdź lek lub zamiennik
                            </Link>
                        </li>
                        <br></br>
                        <hr></hr>                  
                        <li>
                            <Link to="/sprzedaz" onClick={open}>
                            <Modal >
                                <div>
                                <h1>Uwaga!!!</h1>
                                <p>Strona w trakcie budowy <br/> Za utrudnienia przepraszamy!</p>
                                </div>
                            </Modal>
                                Dokonaj sprzedaży
                            </Link>
                        </li>
                        <br></br>
                        <hr></hr>
                        <li>
                            <Link to="/hurtownia">Zamów z hurtowni</Link>
                        </li>
                        <br></br>
                        <hr></hr>
                        <li>
                            <Link to="/raport">Generuj raport</Link>
                        </li>
                        <br></br>
                        <hr></hr>
                        <li>
                            <Link to="/edycja">Zarządzaj kontem</Link>
                        </li>
                        <br></br>
                        <hr></hr>
                        <li>
                            <Link to="/login" id='logout_button'>Wyloguj</Link>
                        </li>
                    </ul>
                </nav>
      <Outlet />
    </>
  )
};

export default Layout;