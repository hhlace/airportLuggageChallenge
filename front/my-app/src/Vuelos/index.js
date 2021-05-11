import { useState, useEffect } from "react";
import axios from "axios";
import Matches from "../Matches";
import "../App.css";

const Vuelos = () => {
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState("");
    const [selectedPassenger, setSelectedPassenger] = useState({});
    const [selectedLuggage, setSelectedLuggage] = useState([]);
    const [passengers, setPassengers] = useState([]);

    const lookFlights = () => {
        let flightSet = new Set();
        axios
            .get("/packages/flights")
            .then((res) => res.data)
            .then((packs) => {
                packs.forEach((pack) => {
                    flightSet.add(pack.flightNumber);
                    let arrToFlight = Array.from(flightSet);
                    setFlights(arrToFlight);
                });
            });
    };

    const lookPassengers = () => {
        axios
            .get(`/passengers/flight/${selectedFlight}`)
            .then((res) => res.data)
            .then((passengers) => setPassengers(passengers));
    };

    const flightLuggage = () => {
        if (setSelectedFlight) {
            axios
                .get(`/packages/${selectedPassenger.id}/${selectedFlight}`)
                .then((res) => res.data)
                .then((packages) => setSelectedLuggage(packages));
        }
    };

    useEffect(() => {
        if (flights.length < 1) lookFlights();
        if (selectedFlight) lookPassengers();
        if (selectedFlight && selectedPassenger) flightLuggage();
    }, [selectedFlight]);
    return (
        <>
            {!selectedFlight ? (
                <>
                    <h4>Buscar vuelo</h4>
                    {flights.length > 0 ? (
                        <Matches
                            matching="flights"
                            matches={flights}
                            setSelectedFlight={setSelectedFlight}
                        />
                    ) : null}
                </>
            ) : (
                <>
                    <h1>Pasajeros</h1>
                    {passengers.length > 0 ? (
                        <Matches
                            matching="passenger"
                            matches={passengers}
                            setPassenger={setSelectedPassenger}
                        />
                    ) : null}
                </>
            )}
            {selectedPassenger ? (
                /*                 <PackagesData
                        passengerData={selectedPassenger}
                        flightNumber={flightNumber}
                        selectedFlight={selectedFlight}
                        luggage={luggage}
                        setFlight={setFlight}
                        submitLuggage={submitLuggage}
                        checkFlight={checkFlight}
                        flightExist={flightExist}
                        selectedLuggage={selectedLuggage}
                        removeAllLuggage={removeAllLuggage}
                    /> */
                <h1>wait</h1>
            ) : null}
        </>
    );
};

export default Vuelos;
