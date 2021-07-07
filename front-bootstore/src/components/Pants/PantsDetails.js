import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import ProductsList from "../ProductsList/ProductsList";

export default function PantsDetails() {
    const shirt = { id: 0, image: "https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg" };
    const tShirtSize = ["P", "M", "G", "GG"];
    return (
        <>
            <Navbar></Navbar>
            <Container>
                <img src={shirt.image} alt="iamge" />
                <div className="details">
                    <div className="title">
                        Camiseta Calvin Klein Azul
                    </div>
                    <div className="description">
                        Camiseta top de malha top com preco top e tudo top
                    </div>
                    <div className="filter-class">Size</div>
                    <div className="items">
                        {tShirtSize.map((item) => <div className="filter">{item}</div>)}
                    </div>
                    <div className="filter-class">$ 40.00</div>
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
