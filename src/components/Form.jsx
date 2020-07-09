import React, {useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types'

const Form = ({createCita}) => {
    /*Creat el state de citas*/
    const [cita, setCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
    const [error, setError] = useState(false);

    /*Funcion que se ejecuta cada vez que el usuario escribe */
    const handleChange = e => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value,
        })
    }

    /*Extraer los valores*/
    const {mascota,propietario,fecha,hora,sintomas} = cita;

    /*Cuando el usuario precione agregar cita*/
    const submitCita = e => {
        e.preventDefault();

        /*Validaciones*/
        if (mascota.trim() === "" || propietario.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === "") {
            setError(true);
            return;
        }
        /*Elimiar el mensaje de error */
        setError(false);

        /*Asignar id*/
        cita.id = uuidv4();        
        
        /*Crear la cita*/
        createCita(cita);

        /*Reiniciar el form*/
        setCita({
          mascota: "",
          propietario: "",
          fecha: "",
          hora: "",
          sintomas: "",
        });
        
    }

    return (  
        <>
            <h2>Crear cita</h2>
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>: null}
            <form 
                action=""
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={handleChange}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={handleChange}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </>
    );
}

Form.propTypes = {
    createCita: PropTypes.func.isRequired,
    
}

export default Form;