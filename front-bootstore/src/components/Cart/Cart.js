import {useState, useEffect, useContext} from 'react';
import NavBar from "../Navbar/Navbar";
import styled from "styled-components";
import axios from 'axios';
import Item from './Item';
import UserContext from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';

export default function Cart(){
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [items, setItems] = useState([]);
    const token = JSON.parse(localStorage.getItem("clientInformations"))?.token;
    const history = useHistory(UserContext);
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

    useEffect(() => {
        const request = axios.get('https://bootstoree.herokuapp.com/cart', config);
        request.then(reply => {
            console.log(reply.data);
            let sum = 0;
            for(let i = 0; i < reply.data.length; i++){
                const product = reply.data[i]
                sum += product.price*product.quantity;
            }
            setTotalPrice(sum);
            setNumberOfProducts(reply.data.length);
            setItems(reply.data);
        })

        

    }, [render])


    function checkout(){
        const confirm = window.confirm("Are you sure?");
        if(!confirm) return;
        const date = new Date();
        const now = date.toLocaleString();
        const body = {total: (taxes + totalPrice).toFixed(2), date: now};
        const config = {
            headers: {
                "Authorization": "Bearer " + clientInformations.token
            }
        }
        const request = axios.post('http://localhost:4000/checkout', body, config);
        request.then(reply => {
            alert("checkout was successfull");
            history.push('/');
        })
        request.catch(error => {
            console.log(error);
        })
        
    }


    return(
        <>
            <NavBar></NavBar>
            <Hole></Hole>
            <Content>
            <ClientCart>
                {!isLogged ? <LoginMessage>Please login to access your cart :)</LoginMessage> :
                <Items>
                    <ItemsTitle>Your Card ({numberOfProducts})</ItemsTitle>
                    {items.map((item,i) => <Item key={i} item={item} setRender={setRender} render={render} ></Item>)}
                </Items>
                }
                <Summary>
                    <SummaryTitle>SUMMARY</SummaryTitle>
                    <Total>
                    <div>SubTotal</div>
                    <div>R$ {totalPrice.toFixed(2)}</div>
                    </Total>
                    <Total>
                    <div>Taxes</div>
                    <div>R$ {taxes.toFixed(2)}</div>
                    </Total>
                    <TotalAmount>
                    <div>Total</div>
                    <div>R$ {(taxes + totalPrice).toFixed(2)}</div>
                    </TotalAmount>
                    
                    <CheckOut onClick={checkout}>Checkout</CheckOut>
                </Summary>
            </ClientCart>
            </Content>
        </>
    )
}

const Total = styled.div`
    width: 100%;
    margin-top: 20px;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const TotalAmount = styled.div`
    width: 100%;
    margin-top: 20px;
    font-size: 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const LoginMessage = styled.div`
    font-size: 30px;
    color: #fff;
`

const Hole = styled.div`
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%), url('https://img.freepik.com/free-photo/assortment-with-warm-clothes-brick-wall_23-2148312009.jpg?size=626&ext=jpg');
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
`
const Content = styled.div`
    padding: 30px 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%), url('https://img.freepik.com/free-photo/assortment-with-warm-clothes-brick-wall_23-2148312009.jpg?size=626&ext=jpg');
    
`
const ClientCart = styled.div`
    margin: 0 auto 0 auto ;
    width: 70vw;
    position: relative;
    font-family: 'Poppins';
`

const ItemsTitle = styled.div`
    color: #DAA520;
    font-size: 30px;
    font-weight: bold;
    
`

const SummaryTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
`

const Items = styled.ul`
    
    width: 40vw;
    min-height: 300px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 5px 1px #c2c2c2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

`


const Summary = styled.div`
    position: fixed;
    top: calc(13vh + 30px);
    right: calc(50% - 35vw);
    background-color: #000;
    width: 25vw;
    min-height: 200px;
    border-radius: 5px;
    box-shadow: 0 1px 5px 1px #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    color: #fff;
`
const CheckOut = styled.button`
    margin-top: 40px;
    width: 70%;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    border: none;
    color: #fff;
    background-color: #DAA520;
    border-radius: 5px;
    cursor: pointer;

`