import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import ProductsList from "../ProductsList/ProductsList";
import axios from "axios";

export default function ShirtDetails() {
    const tShirtSize = ["P", "M", "G", "GG"];
    const [shirt, setShirt] = useState([{image: "", name: "", description: "", price: ""}]);
    const params = useParams();
    const { id } = params;
    const [shirtSize, setShirtSize] = useState("");
    useEffect(() => {
        const shirtsRequest = axios.get(`http://localhost:4000/shirts?id=${id}`);

        shirtsRequest.then((response) => {
            setShirt([...response.data]);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <Container>
                <img src={shirt[0].image} alt="iamge" />
                <div className="details">
                    <div className="title">
                        {shirt[0].name}
                    </div>
                    <div className="description">
                        {shirt[0].description}
                    </div>
                    <div className="filter-class">Size</div>
                    <div className="items">
                        {tShirtSize.map((item) => <div className={item === shirtSize ? "filter border" : "filter"} onClick={() => setShirtSize(item)}>{item}</div>)}
                    </div>
                    <div className="filter-class">{`$ ${shirt[0].price}`}</div>
                    <button>Add to Cart</button>
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
