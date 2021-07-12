import styled from 'styled-components';
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useContext } from 'react';
export default function Item({item, setRender, render}){
    const {id,name, image, description, price, quantity, size, color, category_id} = item;
    const {clientInformations, isLogged, setClientInformations, setIsLogged} = useContext(UserContext);

    
    function addToCart(){
        
        const body = {productId: id, productCategory: category_id, size: size}
        const config = {
            headers: {
                "Authorization": "Bearer " + clientInformations.token
            }
        }
        
        const request = axios.post('http://localhost:4000/add-to-cart', body, config);
        request.then(reply => {
            alert("Product added to your cart :)");
            setRender(render + 1);
        })
        request.catch(error => {
            console.log(error);
        })
    }

    function removeFromCart(){
        const body = {productId: id, productCategory: category_id, size: size}
        const config = {
            headers: {
                "Authorization": "Bearer " + clientInformations.token
            }
        }
        
        const request = axios.post('http://localhost:4000/remove-from-cart', body, config);
        request.then(reply => {
            alert("Product removed from your cart :)");
            setRender(render + 1);
        })
        request.catch(error => {
            console.log(error);
        })
        
    }

    
    return(
        <Content>
            <Image src={image} />
            <Total>R$ {(parseFloat(price)*quantity).toFixed(2)}</Total>
            <Informations>
                <Name>{name}</Name>
                <Description>{description}</Description>
                <Size>size: {size}</Size>
                {!!color ? <Color>color: {color}</Color> : ''}
                
                <Buttons>
                    <AddButton onClick={addToCart} >+</AddButton>
                    <Quantity>{quantity}</Quantity>
                    <RemoveButton onClick={removeFromCart} >-</RemoveButton>
                    <Times>x</Times>
                    <Price>R$ {price}</Price>
                </Buttons>
                
            </Informations>
        </Content>      

    )
}

const Size = styled.div`
    margin: 10px 0;
    color: 	#606060;
`
const Color = styled.div`
    margin: 10px 0;
    color: 	#606060;
`

const Content = styled.li`
    width: 100%;
    height: 200px;
    position: relative;
    &:not(:last-child){
        margin-bottom: 20px;
        border-bottom: 2px solid #c2c2c2;
    }
    padding: 10px;
    display: flex;
    
`
const Total = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 15px;
    color: #000;

`

const Image = styled.img`
    height: 100%;
`

const Informations = styled.div`
    padding: 20px;
`

const Name = styled.div`

`

const Description = styled.div`
    margin-top: 20px;
    color: 	#606060;

`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    height: 25px;

`

const AddButton = styled.button`
    width: 50px;
    height: 25px;
    cursor: pointer;
    background-color: inherit;
    border: 1px solid #c2c2c2;
    border-radius: 5px 0 0 5px;
    transition: all .3s ease;
    &:hover{
        background-color: #606060;
    }
    
`
const RemoveButton = styled.button`
    width: 50px;
    height: 25px;
    cursor: pointer;
    background-color: inherit;
    border: 1px solid #c2c2c2;
    border-radius: 0 5px 5px 0;
    transition: all .3s ease;
    &:hover{
        background-color: #606060;
    }
    
    
`
const Quantity = styled.div`
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #c2c2c2;
    border-bottom: 1px solid #c2c2c2;
`
const Price = styled.div`


`
const Times = styled.div`
    margin: 0 10px;
`