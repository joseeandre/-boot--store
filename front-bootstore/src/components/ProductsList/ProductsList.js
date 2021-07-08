import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Filter from "./Filter";
import Shirt from "./Shirt";
import Pants from "./Pants";
import axios from "axios";

export default function ProductsList(props) {
    const { objectFilter } = props;
    const [shirtsList, setShirtsList] = useState([]);
    const [shirtsFiltered, setShirtsFiltered] = useState([]);
    const [pantsList, setPantsList] = useState([]);

    useEffect(() => {
        const shirtsRequest = axios.get("http://localhost:4000/shirts");
        const pantsRequest = axios.get("http://localhost:4000/pants");

        shirtsRequest.then((response) => {
            setShirtsFiltered([...response.data]);
            setShirtsList([...response.data]);
        }).catch((error) => {
            console.log(error);
        });

        pantsRequest.then((response) => {
            setPantsList([...response.data]);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <Container>
            <div className="space-between">
                <div className="title">Products</div>
                <div className="mobile">
                    <Filter objectFilter={objectFilter} setShirtsFiltered={setShirtsFiltered} shirtsList={shirtsList}></Filter>
                </div>
            </div>
            <div className="space-between">
                <div className="desktop">
                    <Filter objectFilter={objectFilter} setShirtsFiltered={setShirtsFiltered} shirtsList={shirtsList}></Filter>
                </div>
                <div>
                    <div className="products">
                        <div className={objectFilter.tshirt ? `tshirt` : `hidden`}>
                            <div className="title">T-shirt</div>
                            <div className="flex">
                                {shirtsFiltered.map((item) => <Shirt shirt={item}></Shirt>)}
                            </div>
                        </div>
                        <div className={objectFilter.pants ? `tshirt` : `hidden`}>
                            <div className="title"> Pants</div>
                            <div className="flex">
                                {pantsList.map((item) => <Pants pants={item}></Pants>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    padding: 3vh 10vw;
    flex-wrap: nowrap;

    .flex {
        display: flex;
        flex-wrap: wrap;
    }
    .space-between {
        display: flex;
        justify-content: space-between;
    }
    .title {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 3vh;
        margin-left: 2vw;
    }
    .mobile {
        display: none;
    }
    .products {
        width: 60vw;
        flex-wrap: wrap;
    }
    .hidden {
        display: none;
    }
    @media (max-width: 600px) {
        .mobile {
            display: inline-block;
        }
        .desktop {
            display: none;
        }
        .flex {
            align-items: center;
            flex-direction: column;
        }
    }
`;
