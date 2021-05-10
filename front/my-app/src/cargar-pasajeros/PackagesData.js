import { useState, useEffect } from "react";
import "../App.css";

const PackagesData = ({
    flightNumber,
    luggage,
    submitLuggage,
    passengerData,
    setFlight,
    selectedFlight,
    checkFlight,
    flightExist,
    selectedLuggage,
    removeAllLuggage,
}) => {
    return (
        <>
            {!selectedFlight ? (
                <form onSubmit={setFlight}>
                    <h3>Agregar nuevo Vuelo</h3>
                    <label>
                        <input
                            type="text"
                            name="flightNumber"
                            {...flightNumber}
                            placeholder="Numero de Vuelo"
                            onKeyDown={checkFlight}
                            onPaste={checkFlight}
                            onInput={checkFlight}
                        />
                    </label>
                    {flightExist ? (
                        <small>El pasajero ya cargo ese vuelo</small>
                    ) : null}
                    <input
                        type="submit"
                        value="Agregar Vuelo"
                        className="submit"
                        disabled={flightExist}
                    />
                </form>
            ) : selectedLuggage.length < 3 ? (
                <form onSubmit={submitLuggage}>
                    <h3>Agregar equipaje</h3>
                    <select {...luggage}>
                        <option value="grande">Grande</option>
                        <option value="pequeño">Pequeño</option>
                        <option value="prenda">Prenda</option>
                    </select>
                    <input type="submit" value="Agregar bulto" />
                    <button onClick={removeAllLuggage}>Borrar todos</button>
                </form>
            ) : (
                <>
                    <small>Ya tiene asignadas 3 prendas</small>
                    <button onClick={removeAllLuggage}>Borrar todos</button>
                </>
            )}
        </>
    );
};

export default PackagesData;
