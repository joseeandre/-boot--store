import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import ProductsList from "../ProductsList/ProductsList";
import axios from "axios";
import UserContext from "../contexts/UserContext";


export default function PantsDetails() {
    const pantsSizes = ["38", "40", "42", "44"];
    const [pants, setPants] = useState([{image: "", name: "", description: "", price: ""}]);
    const params = useParams();
    const { id } = params;
    const [pantsSize, setPantsSize] = useState("");
    const {clientInformations, isLogged, setClientInformations, setIsLogged} = useContext(UserContext);

    useEffect(() => {
        const pantsRequest = axios.get(`https://bootstoree.herokuapp.com/pants?id=${id}`);

        pantsRequest.then((response) => {
            console.log(response.data);
            setPants([...response.data]);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function addToCart(){
        if(pantsSize === '') {
            alert("select a size");
            return;
        }
        
        if(!isLogged){
            alert("Please login to add this item to your cart :)");
            return;
        }
        
        const body = {productId: id, productCategory: pants[0].category_id, size: pantsSize}
        const config = {
            headers: {
                "Authorization": "Bearer " + clientInformations.token
            }
        }
        console.log(body);
        const request = axios.post('https://bootstoree.herokuapp.com/add-to-cart', body, config);
        request.then(reply => {
            alert("Product added to your cart :)");
        })
        request.catch(error => {
            console.log(error);
        })
    }
    


    return (
        <>
            <Navbar></Navbar>
            <Container>
                <img src={pants[0].image} alt="iamge" />
                <div className="details">
                    <div className="title">
                        {pants[0].name}
                    </div>
                    <div className="description">
                        {pants[0].description}
                    </div>
                    <div className="filter-class">Size</div>
                    <div className="items">
                        {pantsSizes.map((item) => <div className={item === pantsSize ? "filter border" : "filter"} onClick={() => setPantsSize(item)}>{item}</div>)}
                    </div>
                    <div className="filter-class">{`$ ${pants[0].price}`}</div>
                    <button onClick={addToCart} >Add to Cart</button>
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    padding: 5vh 18vw;
    min-height:87vh;
    width: 100vw;

    img {
        height: 70vh;
    }
    .details {
        margin-left: 8vw;
    }
    .title {
        font-size: 4vh;
        font-weight: bold;
    }
    .items {
        display: flex;
    }
    .filter-class {
        font-size: 3vh;
        font-weight: bold;
        margin-top: 3vh;
        color: black;
    }
    .filter {
        font-size: 2.5vh;
        font-weight: bold;
        margin-top: 2vh;
        margin-left: 1vw;
        color: grey;
        padding: 1vh;
        border: 1px solid grey;
    }
    .description {
        font-size: 2vh;
        margin-top: 5vh;
    }
    button {
        margin-top: 5vh;
        width: 200px;
        height: 60px;
    }
    .border {
        border: 2px solid black;
    }
    @media (max-width: 600px) {
        flex-direction: column;

        img {
            height: 40vh;
        }
        .details {
            margin-left: 0vw;
            margin-top: 5vh;
        }
    }
`;
