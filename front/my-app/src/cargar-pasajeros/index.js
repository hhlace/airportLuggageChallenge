import { useState, useEffect } from "react";
import axios from "axios";
import PassengersData from "./PassengersData";
import PackagesData from "./PackagesData";
import Matches from "./Matches";
import "../App.css";

const CargarPasajeros = () => {
    const name = useFormInput("");
    const lastName = useFormInput("");
    const flightNumber = useFormInput("");
    const luggage = useFormInput("grande");
    let [userMatches, setUserMatches] = useState([]);
    let [submitable, setSubmitable] = useState(true);
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
                .then((passengers) => {
                    setUserMatches(passengers);
                });
        }
    };

    const setPassenger = (passenger) => {
        return setSelectedPassenger(passenger);
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

    const flightLuggage = () => {
        if (setSelectedFlight) {
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
        console.log("luggageLength-->", luggage.value.length);
        if (luggage.value.length > 0) {
            axios
                .post("/packages", {
                    flightNumber: selectedFlight,
                    size: luggage.value,
                    passengerId: selectedPassenger.id,
                })
                .then((createdPackage) =>
                    console.log("paqueteee--->", createdPackage)
                );
        }
    };
    useEffect(() => {
        if (
            name.value.length > 3 &&
            lastName.value.length > 3 &&
            userMatches.length === 0
        ) {
            setSubmitable(false);
        }
        if (selectedFlight != "") {
            flightLuggage();
        }
    }, [userMatches.length, lastName.value.length, selectedFlight]);
    console.log("selectedPassenger--->", selectedPassenger);
    console.log("selectedFlight--->", selectedFlight);
    console.log("luggage--->", luggage);
    console.log("flightExist-->", flightExist);
    console.log("paquetes-->", selectedLuggage);
    return (
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
                    />
                </>
            ) : (
                <>
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
    );
};

const useFormInput = (initialValue) => {
    const [value, setValue] = useState("");
    let handleChange = (e) => {
        setValue(e.target.value);
    };
    return {
        value,
        onChange: handleChange,
    };
};

export default CargarPasajeros;
