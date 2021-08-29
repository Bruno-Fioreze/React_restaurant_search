import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { useState, useEffect } from "react";
import { setRestaurant, setRestaurant, setRestaurants } from "../../redux/modules/restaurants";
import { Restaurant } from "@components/RestaurantCard/styles";

export const MapContainer = (props) => {
    const dispatch = useDispatch();
    const { restaurants } = useSelector((state) => {
        state.restaurants
    })
    const [map, setMap] = useState(null)
    const { google, query, placeId } = props;
    
    useEffect( ()=> {
        if (query){
            searchByQuery(query);
        }
    }, [query]);

    useEffect(() => {
       if(placeId){
           getRestaurantById(placeId)
       } 
    }, [placeId])

    const getRestaurantById = (placeId) => {
        const service = new google.maps.places.PlacesService(map);
        dispatch(setRestaurant(null));
        const request = {
            placeId,
            fields: ["name", "opening_hours", "formatted_address", "formatted_number"],
        };

        service.getDetails(request, (place, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK){
                //console.log(`restaurants>>>`, results)
                dispatch(setRestaurant(place));
            }
        });
    }

    const searchByQuery = (query) => {
        const service = new google.maps.places.PlacesService(map)
        dispatch(setRestaurants([]));
        const request = {
            location: map.center,
            radius: '200',
            type: "restaurant",
            query,
        };

        service.textSearch(request, (results, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK){
                //console.log(`restaurants>>>`, results)
                dispatch(setRestaurant(results));
            }
        });
    }

    const searchNearby = (map, center) => {
        const service = new google.maps.places.PlacesService(map);
        dispatch(setRestaurants([]));
        const request = {
            location: center,
            radius: '20000',
            type: "restaurant",
        };

        service.nearbySearch(request, (results, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK){
                //console.log(`restaurants>>>`, results)
                dispatch(setRestaurant(results));
            }
        });
    }

    const onMapReady = (_, map) => { 
        setMap(map);
        searchNearby(map, map.center);
    }

    return (
        <Map google={google} centerAroundCurrentLocation onReady={onMapReady} onRecenter={onMapReady} {...props} > 
            {Restaurants.map((restaurant) => {
                <Marker key={restaurant.place_id} name={restaurant.name} position={
                    {
                        lat: restaurant.geometry.location.lat(),
                        lng: restaurant.geometry.location.lng()
                    }
                } />
            })}
        </Map>
    )
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAKu0F78k80emS_QxdnKw55z8rKDaaMfv4"),
    language: "pt-BR"
})(MapContainer);