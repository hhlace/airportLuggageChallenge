import { useState } from "react";
import CargarPasajeros from "./cargar-pasajeros";
import Vuelos from "./Vuelos";
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
                        Pasajeros
                    </button>
                    <button
                        className="vuelos"
                        onClick={() => setPage("vuelos")}
                    >
                        Vuelos
                    </button>
                </div>
            ) : null}
            <CargarPasajeros page={page} />
        </>
    );
};
export default Options;
