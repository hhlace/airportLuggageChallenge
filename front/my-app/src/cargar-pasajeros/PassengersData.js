import react from "react";
import "../App.css";

const PassengersData = ({
    name,
    matches,
    lastName,
    handleBlurName,
    handleBlurLastName,
    submitable,
    addPassenger,
}) => {
    return (
        <>
            {matches.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((passenger) => {
                            return (
                                <tr key={passenger.id}>
                                    <td key={passenger.id}>{passenger.name}</td>
                                    <td>{passenger.lastName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : null}
            <form onSubmit={addPassenger}>
                <label>
                    <input
                        type="text"
                        name="name"
                        {...name}
                        placeholder="Nombre"
                        onBlur={handleBlurName}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="lastName"
                        {...lastName}
                        placeholder="Apellido"
                        onBlur={handleBlurLastName}
                    />
                </label>
                <input
                    type="submit"
                    value="Agregar Pasajero"
                    disabled={submitable}
                    className="submit"
                />
            </form>
        </>
    );
};
export default PassengersData;
