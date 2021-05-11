import "../App.css";

const PassengersData = ({
    name,
    lastName,
    handleBlurName,
    handleBlurLastName,
    submitable,
    addPassenger,
}) => {
    return (
        <>
            <form onSubmit={addPassenger}>
                <label>
                    <input
                        type="text"
                        name="name"
                        {...name}
                        placeholder="Nombre"
                        onBlur={handleBlurName}
                        onKeyPress={handleBlurName}
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
