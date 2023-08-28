import { useState, useEffect } from "react"
import Errores from "./Errores";




function Formulario({ setPacientes, paciente,pacientes,setPaciente }) {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if(Object.keys(paciente).length>0)
        {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])
    

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);
        return random + fecha
    }


    const handleSumit = (e) => {
        e.preventDefault();
        //validacion
        if ([nombre, propietario, email, fecha, sintomas].includes('')) 
        {
            setError(true)
        }
        else
        {
            setError(false)

            
            const objetoPaciente = {
                nombre,
                propietario,
                email,
                fecha,
                sintomas,
            }

            if(paciente.id)
            {
                objetoPaciente.id=paciente.id
                const pacienteActualizado=pacientes.map(pacienteState=>pacienteState.id===paciente.id ? objetoPaciente : pacienteState)
                setPacientes(pacienteActualizado)
                setPaciente({})
            }
            else
            {
                objetoPaciente.id=generarId()
                setPacientes(pacientes => [...pacientes, objetoPaciente])
            }



            setNombre('')
            setPropietario('')
            setEmail('')
            setFecha('')
            setSintomas('')
   
        }

    }

    return (
        <div className=" md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center"> Seguimiento Pacientes</h2>

            <p className=" text-lg mt-5 text-center mb-10">
                Aañade Pacientes y {' '}
                <span className="text-indigo-600 font-blond">Administrarlos</span>
            </p>
            <form onSubmit={handleSumit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {error && <Errores><p>Todos los campos son obligatorios</p></Errores>}
                <div className=" mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold" >Nombre Mascota</label>
                    <input type="text" id="mascota" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de la Mascota"
                        value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className=" mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold" >Nombre Propietario</label>
                    <input type="text" id="propietario" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del Propietario"
                        value={propietario} onChange={(e) => setPropietario(e.target.value)} />
                </div>
                <div className=" mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold" >Email</label>
                    <input type="text" id="email" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className=" mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold" >Alta</label>
                    <input type="date" id="alta" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </div>
                <div className=" mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold" >Sintomas</label>
                    <textarea placeholder="Describe los Sintomas" id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md"
                        value={sintomas} onChange={(e) => setSintomas(e.target.value)} />
                </div>
                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={paciente.id ? "Editar paciente" : "Agregaar paciente"} />
            </form>
        </div>
    )
}

export default Formulario
