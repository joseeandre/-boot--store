import styled from 'styled-components';

export default function Item({item}){
    const {name, image, description, price} = item;
    return(
        <Content>
            <Image src={image} />
            <Total>R$ {price}</Total>
            <Informations>
                <Name>{name}</Name>
                <Description>{description}</Description>
                <Buttons>
                    <AddButton >+</AddButton>
                    <Quantity>1</Quantity>
                    <RemoveButton>-</RemoveButton>
                    <Times>x</Times>
                    <Price>R$ {price}</Price>
                </Buttons>
                
            </Informations>
        </Content>      

    )
}

const Content = styled.li`
    width: 100%;
    height: 200px;
    position: relative;
    &:not(:last-child){
        margin-bottom: 20px;
        border-bottom: 2px solid #c2c2c2;
    }
    padding: 10px;
    display: flex;
    
`
const Total = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 15px;
    color: #000;

`

const Image = styled.img`
    height: 100%;
`

const Informations = styled.div`
    padding: 20px;
`

const Name = styled.div`

`

const Description = styled.div`
    margin-top: 20px;
    color: 	#606060;

`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    height: 25px;

`

const AddButton = styled.button`
    width: 50px;
    height: 25px;
    cursor: pointer;
    background-color: inherit;
    border: 1px solid #c2c2c2;
    border-radius: 5px 0 0 5px;
    
`
const RemoveButton = styled.button`
    width: 50px;
    height: 25px;
    cursor: pointer;
    background-color: inherit;
    border: 1px solid #c2c2c2;
    border-radius: 0 5px 5px 0;
    
`
const Quantity = styled.div`
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #c2c2c2;
    border-bottom: 1px solid #c2c2c2;
`
const Price = styled.div`


`
const Times = styled.div`
    margin: 0 10px;
`