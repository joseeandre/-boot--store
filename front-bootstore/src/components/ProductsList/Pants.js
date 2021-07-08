import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";

export default function Pants(props) {
    const objectFilter = { tshirt: true, pants: true };
    const { pants } = props;
    const history = useHistory();
    return (
        <Container>
            <div className="product" onClick={() => history.push(`/pants/${pants.id}`)}>
                <img src={pants.image} alt="pants" />
                <div className="description">
                    {pants.name}
                </div>
                <strong className="description">{`$ ${pants.price}`}</strong>
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
