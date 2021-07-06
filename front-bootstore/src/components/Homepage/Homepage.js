import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import ProductsList from "../ProductsList/ProductsList";

export default function Homepage() {
    return (
        <>
            <Navbar></Navbar>
            <Container>
                <ImageGallery
                    items={images}
                    showBullets={true}
                    showIndex={true}
                    showThumbnails={false}
                    lazyLoad={true}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    autoPlay={true} />
            </Container>
            <ProductsList></ProductsList>
        </>
    );
}

const Container = styled.div`
    min-height:100vh;
    width: 100vw;

    .gallery {
        width: 100% !important;
    }
`;

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];