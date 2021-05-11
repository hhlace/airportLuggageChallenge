import { useState, useEffect } from "react";
import axios from "axios";
import PassengersData from "./PassengersData";
import PackagesData from "./PackagesData";
import Matches from "../Matches";
import "../App.css";

const CargarPasajeros = ({ page }) => {
    const name = useFormInput("");
    const lastName = useFormInput("");
    const flightNumber = useFormInput("");
    const luggage = useFormInput("grande");
    let [userMatches, setUserMatches] = useState([]);
    let [submitable, setSubmitable] = useState(true);
    const [flights, setFlights] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [selectedPassenger, setSelectedPassenger] = useState({});
    const [selectedFlight, setSelectedFlight] = useState("");
    const [selectedLuggage, setSelectedLuggage] = useState([]);
    const [flightExist, setFlightExist] = useState(false);

    const addPassenger = (e) => {
        e.preventDefault();
        axios
            .post(`/passengers`, {
                name: name.value,
                lastName: lastName.value,
            })
            .then((res) => {
                if (res.status === 201) {
                    setSelectedPassenger(res.data);
                }
            });
    };

    const handleBlurName = () => {
        if (name.value.length > 3) {
            axios
                .get(`/passengers/${name.value}`)
                .then((res) => res.data)
                .then((passengers) => setUserMatches(passengers));
        }
    };

    const handleBlurLastName = () => {
        if (name.value.length > 3 && lastName) {
            axios
                .get(`/passengers/${name.value}/${lastName.value}`)
                .then((res) => res.data)
                .then((passgrs) => {
                    setUserMatches(passgrs);
                });
        }
    };

    const setPassenger = (passgrs) => {
        return setSelectedPassenger(passgrs);
    };

    const setFlight = (e) => {
        e.preventDefault();
        if (flightNumber.value.length > 1) {
            if (
                selectedPassenger.flights !== null &&
                selectedPassenger.flights.includes(flightNumber.value)
            ) {
                return setFlightExist(true);
            }
            let flightsToAdd =
                selectedPassenger.flights == null
                    ? [flightNumber.value]
                    : [...selectedPassenger.flights, flightNumber.value];
            axios
                .put(`/passengers/${selectedPassenger.id}`, {
                    flight: flightsToAdd,
                })
                .then((res) => res.data)
                .then((passenger) => {
                    setSelectedPassenger(passenger);
                    setSelectedFlight(flightNumber.value);
                });
        }
    };

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
        if (selectedFlight.length > 3) {
            axios
                .get(`/passengers/flight/${selectedFlight}`)
                .then((res) => res.data)
                .then((passengers) => setPassengers(passengers));
        }
    };

    const flightLuggage = () => {
        if (selectedFlight) {
            axios
                .get(`/packages/${selectedPassenger.id}/${selectedFlight}`)
                .then((res) => res.data)
                .then((packages) => setSelectedLuggage(packages));
        }
    };
    const checkFlight = () => {
        if (selectedPassenger.flights !== null) {
            if (selectedPassenger.flights.includes(flightNumber.value)) {
                return setFlightExist(true);
            } else {
                return setFlightExist(false);
            }
        }
    };

    const submitLuggage = (e) => {
        e.preventDefault();
        if (luggage.value.length > 0) {
            axios
                .post("/packages", {
                    flightNumber: selectedFlight,
                    size: luggage.value,
                    passengerId: selectedPassenger.id,
                })
                .then((createdPackage) => flightLuggage());
        }
    };

    const removePackage = (packageId) => {
        axios.delete(`/packages/${packageId}`).then((res) => flightLuggage());
    };

    const removeAllLuggage = (e) => {
        e.preventDefault();
        axios
            .delete(`packages/${selectedPassenger.id}/${selectedFlight}`)
            .then((r) => flightLuggage());
    };

    useEffect(() => {
        if (
            name.value.length > 3 &&
            lastName.value.length > 3 &&
            userMatches.length === 0
        ) {
            setSubmitable(false);
        }
        if (selectedFlight != "" && page === "cargar-pasajeros") {
            flightLuggage();
        }
        if (flights.length < 1) lookFlights();
        if (selectedFlight && page === "vuelos") lookPassengers();
        if (
            selectedFlight.length > 0 &&
            Object.keys(selectedPassenger).length > 0
        )
            flightLuggage();
    }, [
        userMatches.length,
        lastName.value.length,
        selectedFlight,
        selectedPassenger,
    ]);
    return (
        <>
            {page === "cargar-pasajero" ? (
                <>
                    {selectedPassenger.name ? (
                        <>
                            <h4>
                                Pasajero: {selectedPassenger.name}{" "}
                                {selectedPassenger.lastName}
                            </h4>
                            {!selectedFlight ? (
                                <Matches
                                    matching="flight"
                                    matches={selectedPassenger.flights}
                                    setSelectedFlight={setSelectedFlight}
                                />
                            ) : (
                                <>
                                    <h4>Vuelo: {selectedFlight}</h4>
                                    <Matches
                                        matching="packages"
                                        matches={selectedLuggage}
                                        removePackage={removePackage}
                                    />
                                </>
                            )}
                            <PackagesData
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
                            />
                        </>
                    ) : (
                        <>
                            <h4>Buscar o agregar pasajero</h4>
                            {userMatches.length > 0 ? (
                                <Matches
                                    matching="passenger"
                                    matches={userMatches}
                                    setPassenger={setPassenger}
                                />
                            ) : null}
                            <PassengersData
                                name={name}
                                lastName={lastName}
                                submitable={submitable}
                                addPassenger={addPassenger}
                                useFormInput={useFormInput}
                                handleBlurName={handleBlurName}
                                handleBlurLastName={handleBlurLastName}
                            />
                        </>
                    )}
                </>
            ) : null}
            {page === "vuelos" ? (
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
                            <h4>Vuelo: {selectedFlight}</h4>
                            {passengers.length > 0 ? (
                                <Matches
                                    matching="passenger"
                                    matches={passengers}
                                    setPassenger={setSelectedPassenger}
                                />
                            ) : null}
                        </>
                    )}
                    {selectedLuggage.length > 0 ? (
                        <>
                            <h4>
                                Pasajero: {selectedPassenger.name}{" "}
                                {selectedPassenger.lastName}
                            </h4>
                            <Matches
                                matching="packages"
                                matches={selectedLuggage}
                                removePackage={removePackage}
                            />
                            <PackagesData
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
                            />
                        </>
                    ) : null}
                </>
            ) : null}
        </>
    );
};

const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    let handleChange = (e) => {
        setValue(e.target.value);
    };
    return {
        value,
        onChange: handleChange,
    };
};

export default CargarPasajeros;
