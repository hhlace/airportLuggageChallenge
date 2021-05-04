import { useState, useEffect } from "react";
import axios from "axios";
import PassengersData from "./PassengersData";
import PackagesData from "./PackagesData";
import "../App.css";

const CargarPasajeros = () => {
    const name = useFormInput("");
    const lastName = useFormInput("");
    let [matches, setMatches] = useState([]);
    let [submitable, setSubmitable] = useState(true);
    const [selectedPassenger, setSelectedPassenger] = useState({});

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
                .then((passengers) => setMatches(passengers));
        }
    };

    const handleBlurLastName = () => {
        if (name.value.length > 3 && lastName) {
            axios
                .get(`/passengers/${name.value}/${lastName.value}`)
                .then((res) => res.data)
                .then((passengers) => {
                    setMatches(passengers);
                });
        }
    };

    useEffect(() => {
        if (
            name.value.length > 3 &&
            lastName.value.length > 3 &&
            matches.length === 0
        ) {
            setSubmitable(false);
        }
    }, [matches.length, lastName.value.length]);

    return (
        <>
            {selectedPassenger.name ? (
                <PackagesData passengerData={selectedPassenger} />
            ) : (
                <PassengersData
                    name={name}
                    lastName={lastName}
                    matches={matches}
                    submitable={submitable}
                    addPassenger={addPassenger}
                    useFormInput={useFormInput}
                    handleBlurName={handleBlurName}
                    handleBlurLastName={handleBlurLastName}
                />
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
