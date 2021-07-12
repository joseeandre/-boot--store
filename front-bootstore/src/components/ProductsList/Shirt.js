import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

export default function Shirt(props) {
    const objectFilter = { tshirt: true, pants: true };
    const { shirt } = props;
    const history = useHistory();
    return (
        <Container>
            <div className="product" onClick={() => history.push(`/shirts/${shirt.id}`)}>
                <img src={shirt.image} alt="shirt" />
                <div className="description">
                    {shirt.name}
                </div>
                <strong className="description">{`$ ${shirt.price}`}</strong>
                <button>Buy</button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 230px;
    margin-left: 2vw;
    margin-bottom: 6vh;
    font-size: 12px;

    img  {
        width: 150px;
        height: 150px;
    }
    .product {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .description {
        margin-top:12px;
    }
    button {
        margin-top: 12px;
        width: 90px;
        height: 30px;
    }
`;
