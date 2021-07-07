import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import ProductsList from "../ProductsList/ProductsList";

export default function PantsPage() {
    const objectFilter = { tshirt: false, pants: true };
    return (
        <>
            <Navbar></Navbar>
            <Container>
                <ProductsList objectFilter={objectFilter}></ProductsList>
            </Container>
        </>
    );
}

const Container = styled.div`
    min-height:87vh;
    width: 100vw;
`;
