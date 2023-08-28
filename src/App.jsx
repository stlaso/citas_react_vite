import { useEffect, useState } from 'react'
import './App.css'
import Formulario from './components/Formulario'
import Header from './components/Header'
import ListadoPacientes from './components/ListadoPacientes'





function App() {
  
  const [pacientes,setPacientes]=useState(JSON.parse(localStorage.getItem('pacientes')) ??  []);
  const [paciente,setPaciente]=useState({});



  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])
  

  const eliminarPaciente=(id)=>
  {
    const PacientesActualizados=pacientes.filter(paciente=>paciente.id!==id)
    setPacientes(PacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-10">
    <Header />
    <div className="mt-12 md:flex">
    <Formulario setPacientes={setPacientes} paciente={paciente} pacientes={pacientes} setPaciente={setPaciente}/>
    <ListadoPacientes pacientes={pacientes} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente}/>
    </div>
    </div>
  )
}

export default App
