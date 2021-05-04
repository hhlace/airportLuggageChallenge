import { useState } from "react";
import CargarPasajeros from "./cargar-pasajeros";
import Pasajeros from "./pasajeros";
import "./App.css";

const Options = () => {
    let [page, setPage] = useState("options");
    return (
        <>
            {page === "options" ? (
                <div className="options">
                    <button
                        className="cargar-pasajero"
                        onClick={() => setPage("cargar-pasajero")}
                    >
                        Cargar Pasajero
                    </button>
                    <button className="vuelos">Vuelos</button>
                    <button
                        className="pasajeros"
                        onClick={() => setPage("pasajeros")}
                    >
                        Pasajeros
                    </button>
                </div>
            ) : null}
            {page === "cargar-pasajero" ? <CargarPasajeros /> : null}
            {page === "pasajeros" ? <Pasajeros /> : null}
        </>
    );
};
export default Options;
