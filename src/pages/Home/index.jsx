import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Carousel, Search, Logo, Wrapper, CarouselTitle, ModalTitle, ModalContent } from './styles';
import logo from "./../../assets/logo.svg"
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import restaurants from "../../assets/restaurante-fake.png";
import { Card, RestaurantCard, Modal, MapContainer, Loader, Skeleton } from '../../components'; 

const Home = () => {

    const [inputValue, setInputValue] = useState();
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state) => {
        state.restaurants
    })

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true
    };

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            setQuery(inputValue);
        }
    }

    const  handleOpenModal = (placeId) => {
        setPlaceId(placeId);
        setModalOpened(true);
    }

    return (
        <Wrapper>
            <Container>
                <Search> 
                    <Logo src={logo} alt="Logo do restaurante" />
                    <TextField
                        label='Pesquisar'
                        outlined
                        //onTrailingIconSelect={() => this.setState({value: ''})}
                        trailingIcon={ <MaterialIcon role="button" icon="search"></MaterialIcon>}
                    >
                    <Input
                        value={inputValue}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setInputValue(e.target.value) } 
                    />
                    </TextField>
                    {
                        restaurants.length > 0 ? (
                            <>
                            <CarouselTitle>Na sua Área</CarouselTitle>
                            <Carousel { ...settings }>
                                { restaurants.map((restaurant) => {
                                    <Card 
                                        key={restaurant.place_id} 
                                        photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurant } 
                                        title={restaurant.name}
                                    />
                                })}
                            </Carousel>
                            </>
                        )
                        : (<Loader />)
                    }
                </Search>
                {
                    restaurants.map((restaurant) => {
                        <RestaurantCard onclick={() => handleOpenModal(restaurant.place_id)} restaurant={restaurant} />
                    })
                }
                <RestaurantCard/> 
            </Container>
            <MapContainer query={query} placeId={placeId} />
            <Modal open={modalOpened} onClose={() => { setModalOpened(!modalOpened) }}> 
                {restaurantSelected ? (
                    <>
                        <ModalTitle> {restaurantSelected?.name} </ModalTitle>
                        <ModalContent> {restaurantSelected?.formatted_phone_number} </ModalContent>
                        <ModalContent> {restaurantSelected?.formatted_address} </ModalContent>
                        <ModalContent> {restaurantSelected?.opening_hours?.open_now ? "Aberto Agora" : "Fechado"} </ModalContent>
                    </>  
                ) : (
                    <>
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                    </>    
                    )
                }
            </Modal> 
        </Wrapper>
        
    )
};

export default Home;
