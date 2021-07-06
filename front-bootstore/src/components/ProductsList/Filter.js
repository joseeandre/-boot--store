import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaFilter } from "react-icons/fa";
import Modal from "react-modal";

export default function Filter() {
    const objectFilter = { tshirt: true, pants: true };
    const tShirtSize = ["P", "M", "G", "GG"];
    const tShirtColor = ["blue", "white", "green", "yellow", "red"];
    const pantsSize = ["38", "40", "42", "44"];
    const [modalMenuIsOpen, setModalMenuOpen] = useState(false);
    return (
        <IconContext.Provider value={{ className: "react-icons" }}>
            <Container>
                <div className="desktop">
                    <div className="filter-title">Filters</div>
                    <TshirtFilter className={objectFilter.tshirt ? `` : `hidden`}>
                        <div className="category-title">T-shirts</div>
                        <div className="filter-class">Size</div>
                        <div className="items">
                            {tShirtSize.map((item) => <div className="filter">{item}</div>)}
                        </div>
                        <div className="filter-class">Color</div>
                        <div className="items">
                            {tShirtColor.map((item) => <div className={`box-color ${item}`}></div>)}
                        </div>
                    </TshirtFilter>
                    <PantsFilter className={objectFilter.tshirt ? `` : `hidden`}>
                        <div className="category-title">Pants</div>
                        <div className="filter-class">Size</div>
                        <div className="items">
                            {pantsSize.map((item) => <div className="filter">{item}</div>)}
                        </div>
                    </PantsFilter>
                </div>
                <FaFilter
                    className="menu-mobile"
                    onClick={() => setModalMenuOpen(true)}>
                </FaFilter>
                <Modal
                    isOpen={modalMenuIsOpen}
                    onRequestClose={() => setModalMenuOpen(false)}
                    style={modalStyle}
                >
                    <TshirtFilter className={objectFilter.tshirt ? `` : `hidden`}>
                        <div className="category-title">T-shirts</div>
                        <div className="filter-class">Size</div>
                        <div className="items">
                            {tShirtSize.map((item) => <div className="filter">{item}</div>)}
                        </div>
                        <div className="filter-class">Color</div>
                        <div className="items">
                            {tShirtColor.map((item) => <div className={`box-color ${item}`}></div>)}
                        </div>
                    </TshirtFilter>
                    <PantsFilter className={objectFilter.tshirt ? `` : `hidden`}>
                        <div className="category-title">Pants</div>
                        <div className="filter-class">Size</div>
                        <div className="items">
                            {pantsSize.map((item) => <div className="filter">{item}</div>)}
                        </div>
                    </PantsFilter>
                </Modal>
            </Container>
        </IconContext.Provider>
    );
}

const modalStyle = {
    content: {
        top: "25%",
        left: "25%",
        right: "25%",
        bottom: "25%",
        background: "white",
        color: "black",
        padding: "30px",
    },
    overlay: { zIndex: 1000 }
};

const Container = styled.div`
    width: 20vw;
    flex-wrap: nowrap;
    border: 1px solid grey;
    padding: 2vh 2vw;
    .hidden {
        display: none;
    }
    .filter-title {
        font-size: 30px;
        font-weight: bold;
        color: black;
    }
    .menu-mobile {
        display: none;
    }
    @media (max-width: 600px) {
        border: none;
        .desktop {
            display: none;
        }
        .menu-mobile {
            display: inline-block;
        }
    }
`;

const TshirtFilter = styled.div`
    width: 100%;
    flex-wrap: nowrap;

    .hidden {
        display: none;
    }
    .category-title {
        font-size: 20px;
        font-weight: bold;
        margin-top: 2vh;
        color: black;
    }
    .filter-class {
        font-size: 16px;
        font-weight: bold;
        margin-top: 2vh;
        color: black;
    }
    .filter {
        font-size: 16px;
        font-weight: bold;
        margin-top: 2vh;
        margin-left: 1vw;
        color: grey;
    }
    .items {
        display: flex;
    }
    .box-color {
        width: 2vh;
        height: 2vh;
        margin-top: 2vh;
        margin-left: 1vw;
        border: 1px solid grey;
    }
    .blue {
        background: blue;
    }
    .white {
        background: white;
    }
    .green {
        background: green;
    }
    .yellow {
        background: yellow;
    }
    .red {
        background: red;
    }
`;

const PantsFilter = styled.div`
    width: 100%;
    flex-wrap: nowrap;

    .hidden {
        display: none;
    }
    .category-title {
        font-size: 20px;
        font-weight: bold;
        margin-top: 2vh;
        color: black;
    }
    .filter-class {
        font-size: 16px;
        font-weight: bold;
        margin-top: 2vh;
        color: black;
    }
    .filter {
        font-size: 16px;
        font-weight: bold;
        margin-top: 2vh;
        margin-left: 1vw;
        color: grey;
    }
    .items {
        display: flex;
    }
`;