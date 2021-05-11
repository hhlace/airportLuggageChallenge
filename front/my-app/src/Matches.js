import "./App.css";

const Matches = ({
    matches,
    setPassenger,
    matching,
    setSelectedFlight,
    removePackage,
}) => {
    return (
        <table>
            {/* Passenger */}
            {matching === "passenger" ? (
                <>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((passenger) => {
                            return (
                                <tr
                                    key={passenger.id}
                                    onClick={() => setPassenger(passenger)}
                                >
                                    <td>{passenger.name}</td>
                                    <td>{passenger.lastName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </>
            ) : null}

            {/* Flight */}
            {matching === "flight" && matches ? (
                <>
                    <thead>
                        <tr>
                            <th>Vuelos del Pasajero</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((flight) => {
                            return (
                                <tr
                                    key={flight}
                                    onClick={() => setSelectedFlight(flight)}
                                >
                                    <td>{flight}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </>
            ) : null}

            {/* Packages */}
            {matching === "packages" ? (
                <>
                    <thead>
                        <tr>
                            <th>Id de Equipaje</th>
                            <th>Tamaño</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((pack) => {
                            return (
                                <tr key={pack.id}>
                                    <td>{pack.id}</td>
                                    <td>{pack.size}</td>
                                    <td
                                        className="erase"
                                        onClick={() => removePackage(pack.id)}
                                    >
                                        X
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </>
            ) : null}

            {/* Flights */}
            {matching === "flights" && matches ? (
                <>
                    <thead>
                        <tr>
                            <th>Vuelos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((flight) => {
                            return (
                                <tr
                                    key={flight}
                                    onClick={() => setSelectedFlight(flight)}
                                >
                                    <td>{flight}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </>
            ) : null}
        </table>
    );
};

export default Matches;
