import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { IconContext } from "react-icons";
import { FaUserAlt, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import Modal from "react-modal";
import { HiOutlineLogout } from "react-icons/hi";
import axios from 'axios';

export default function NavBar(props) {
    const [modalMenuIsOpen, setModalMenuOpen] = useState(false);
    const {clientInformations, isLogged, setClientInformations, setIsLogged} = useContext(UserContext);
    const wppUrl = "https://api.whatsapp.com/send?phone=5512981253244&text=Ol%C3%A1%20bootstore%2C%20gostaria%20de%20obter%20informacoes.";
    const history = useHistory();

    function logout(){
        const config = {
            headers: {
                "Authorization": "Bearer " + clientInformations.token
            }
        }
        const request = axios.post("http://localhost:4000/logout", {}, config);
        request.then(reply => {
            setClientInformations(null);
            localStorage.removeItem('clientInformations');
            setIsLogged(false);
            setModalMenuOpen(false);
            history.push('/');
        })
        request.catch(error => {
            alert("Was not possible to logout, try refreshing the page");
        })
        
    }
    
    return (
        <IconContext.Provider value={{ className: "react-icons" }}>
            <Container>
                <Link to="/"><div className="logo">bootstore</div></Link>
                <div className="menu">
                    <Link to="/shirts"><div className="category">T-shirts</div></Link>
                    <Link to="/pants"><div className="category">Pants</div></Link>
                    <input type="text" placeholder="Search" />
                    <Link to="/register"><FaUserAlt className={ !isLogged ? `icon` : `icon hidden`}></FaUserAlt></Link>
                    <Link to="/cart"><FaShoppingCart className="icon"></FaShoppingCart></Link>
                    <a target="_blanck" href={wppUrl}><FaWhatsapp className="icon"></FaWhatsapp></a>
                    <HiOutlineLogout className={isLogged ? `icon` : `icon hidden`} onClick={logout} ></HiOutlineLogout>
                </div>

                <AiOutlineMenu
                    className="menu-mobile"
                    onClick={() => setModalMenuOpen(true)}
                />
                <Modal
                    isOpen={modalMenuIsOpen}
                    onRequestClose={() => setModalMenuOpen(false)}
                    style={modalStyle}
                >
                    <NavBarMobile>
                        <input type="text" placeholder="Search" />
                        <Link to="/shirts"><div className="category">T-shirts</div></Link>
                        <Link to="/pants"><div className="category">Pants</div></Link>
                        <Link to="/register">
                            <FaUserAlt className="icon"></FaUserAlt>
                            <div className="menu-title">{isLogged ? `My account` : `Login or Register`}</div>
                        </Link>
                        <Link to="/cart">
                            <FaShoppingCart className="icon"></FaShoppingCart>
                            <div className="menu-title">Cart</div>
                        </Link>
                        <a target="_blanck" href={wppUrl}>
                            <FaWhatsapp className="icon"></FaWhatsapp>
                            <div className="menu-title">Contact Us</div>
                        </a>
                        <a className={isLogged ? `` : `hidden`} onClick={logout} >
                            <HiOutlineLogout className="icon"></HiOutlineLogout>
                            <div className="menu-title">Logout</div>
                        </a>
                    </NavBarMobile>
                </Modal>
            </Container>
        </IconContext.Provider>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10vw;
    width: 100vw;
    height: 13vh;

    .category {
        font-size: 2.3vh;
        margin-left: 1vw;
    }
    
    .hidden {
        display: none;
    }
    .logo {
        font-family: 'Coiny', cursive;
        font-size: 5vh;
        line-height: 10vh;
    }
    input {
        height: 3vh;
        width: 16vw;
        border-radius: 5px;
        margin-left: 1vw;
    }
    .menu {
        width: 50vw;
        display: flex;
        justify-content: flex-end;
    }
    .icon {
        font-size: 3vh;
        margin-left: 2vw;
    }
    a {
        text-decoration: none;
        color: black;
    }
    .menu-mobile {
        display: none;
    }
    @media (max-width: 600px) {
        .menu-mobile {
            display: inline-block;
        }
        .menu {
            display: none;
        }
    }
`;

const NavBarMobile = styled.div`
  display: flex;
  flex-direction:column;
  a {
    margin-top: 2vh;
    display: flex;
    position: relative;
    height: 2rem;
    text-decoration: none;
    transition: filter 0.2s;
    color: black;
    &.active {
      color: grey;
      font-weight: 600;
      filter: brightness(1);
    }
    .menu-title {
        margin-left: 2vw;
    }
  }
  .hidden {
        display: none;
    }
`;

const modalStyle = {
    content: {
        top: "0%",
        left: "40%",
        right: "0%",
        bottom: "0%",
        background: "white",
        color: "white",
        padding: "30px",
    },
    overlay: { zIndex: 1000 }
};