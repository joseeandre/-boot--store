import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Filter from "./Filter";

export default function ProductsList() {
    return (
        <Container>
            <Filter></Filter>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    padding: 3vh 10vw;
    flex-wrap: nowrap;
`;
