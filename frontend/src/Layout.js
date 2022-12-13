import { Outlet, Link } from "react-router-dom";

const Layout = () => {
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
                            <Link to="/zamie">Znajdź lek lub zamiennik</Link>
                        </li>
                        <br></br>
                        <hr></hr>                  
                        <li>
                            <Link to="/sprzedaz">Dokonaj sprzedaży</Link>
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
                            <Link to="/login">Wyloguj</Link>
                        </li>
                    </ul>
                </nav>
      <Outlet />
    </>
  )
};

export default Layout;