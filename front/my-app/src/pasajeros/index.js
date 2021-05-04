import { useState } from "react";
import axios from "axios";
import "../App.css";

const Pasajeros = () => {
    const search = useFormInput("");
    let [matches, setMatches] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get(`passengers/search/${search.value}`)
            .then((res) => res.data)
            .then((passengers) => setMatches(passengers));
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="search"
                        placeholder="Nombre de Pasajero"
                        {...search}
                    />
                </label>
            </form>
            {matches.length > 0 ? (
                <table>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                    </tr>
                    {matches.map((passenger) => {
                        return (
                            <tr>
                                <td>{passenger.name}</td>
                                <td>{passenger.lastName}</td>
                            </tr>
                        );
                    })}
                </table>
            ) : null}
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

export default Pasajeros;
