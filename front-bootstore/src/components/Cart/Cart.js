import {useState, useEffect} from 'react';
import NavBar from "../Navbar/Navbar";
import styled from "styled-components";
import axios from 'axios';
import Item from './Item';

export default function Cart(){
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const request = axios.get('http://localhost:4000/cart');
        request.then(reply => {
            console.log(reply.data);
            setNumberOfProducts(reply.data.length);
            setItems(reply.data);
        })
    }, [])
    return(
        <>
            <NavBar></NavBar>
            <Content>
            <ClientCart>
                <Items>
                    <ItemsTitle>Your Card ({numberOfProducts})</ItemsTitle>
                    {items.map(item => <Item item={item}></Item>)}
                </Items>
                <Summary>
                    <SummaryTitle>SUMMARY</SummaryTitle>
                </Summary>
            </ClientCart>
            </Content>
        </>
    )
}

const Content = styled.div`
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%), url('https://img.freepik.com/free-photo/assortment-with-warm-clothes-brick-wall_23-2148312009.jpg?size=626&ext=jpg');
    padding: 30px 0;

`
const ClientCart = styled.div`
    margin: 0 auto 0 auto ;
    width: 70vw;
    position: relative;
    font-family: 'Poppins';
`

const ItemsTitle = styled.div`
    color: orange;
    font-size: 30px;
    
`

const SummaryTitle = styled.div`
    color: #fff;
    font-size: 30px;
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
    justify-content: center;
    padding: 10px;

`