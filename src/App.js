import React, {useState, useEffect} from 'react';
import Form from './components/Form'
import Cita from './components/Cita'

function App() {

  /*Citas en localStorage*/
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  /*Array de citas*/
  const [citas, setCitas] = useState(citasIniciales);

  /*Use Effect para realizar ciertas operaciones cuando el state cambia*/
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] );

  /*Funcion que tome las citas actuales y agregue la nueva*/
  const createCita = cita => {
    setCitas([...citas, cita])
  }

  /*Funcion para eliminar la cita por id */
  const deleteCita = id => {
    const newCitas = citas.filter(cita => cita.id !== id);
    setCitas(newCitas);
  }

  /*Mensaje condicional*/
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form 
              createCita={createCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                deleteCita={deleteCita}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
