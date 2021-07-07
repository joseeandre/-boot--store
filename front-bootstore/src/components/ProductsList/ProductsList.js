import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Filter from "./Filter";
import Shirt from "./Shirt";
import Pants from "./Pants";

export default function ProductsList(props) {
    const { objectFilter } = props;
    const shirtsList = [
        {id: 0, image: "https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg"},
        {id: 1, image: "https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg"},
        {id: 2, image: "https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg"},
        {id: 3, image: "https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg"},
        {id: 4, image: "https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg"},
        {id: 5, image: "https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg"},
    ] 

    const pantsList = [
        {image: "https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg"},
        {image: "https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg"},
        {image: "https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg"},
        {image: "https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg"},
        {image: "https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg"},
        {image: "https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg"},
    ] 
    return (
        <Container>
            <div className="space-between">
                <div className="title">Products</div>
                <div className="mobile">
                    <Filter objectFilter={objectFilter}></Filter>
                </div>
            </div>
            <div className="space-between">
                <div className="desktop">
                    <Filter objectFilter={objectFilter}></Filter>
                </div>
                <div>
                    <div className="products">
                        <div className={objectFilter.tshirt ? `tshirt`: `hidden`}>
                            <div className="title">T-shirt</div>
                            <div className="flex">
                                {shirtsList.map((item) => <Shirt shirt={item}></Shirt>)}
                            </div>
                        </div>
                        <div className={objectFilter.pants ? `tshirt`: `hidden`}>
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
