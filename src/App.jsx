import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/common/Input'
import Button from './components/common/Button'
import { AddIcon, DeleteIcon, PassIcon } from './assets/icons'

function App() {
  const [count, setCount] = useState(0)

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  // Manejo de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validación simple
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Formato de correo inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true si no hay errores
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulario válido", form);
      // Aquí puedes enviar a la API
    } else {
      console.log("Errores en el formulario", errors);
    }
  };

  return (
    <>
      <div className='bg-taski-card rounded-2xl columns-2 shadow'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='text-taski-text-title font-bold p-4'>Vite + React</h1>
      <div className="bg-taski-card rounded-2xl p-4 shadow flex flex-col gap-2">
        <button className='bg-taski-background rounded-md p-1 border-2 hover: cursor-pointer hover:border-taski-secondary hover:text-taski-secondary hover:scale-105 hover:shadow-lg transition-all duration-300 text-taski-text-title flex items-center gap-2 w-fit block mx-auto' onClick={() => setCount((count) => count + 1)}>
          Add
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>

        </button>
        <button className='bg-taski-background rounded-md p-1 border-2 hover: cursor-pointer hover:border-taski-alert hover:bg-taski-background hover:text-taski-alert hover:scale-105 hover:shadow-lg transition-all duration-300 text-taski-text-title flex items-center gap-2 w-fit block mx-auto' onClick={() => setCount((count) => count + 1)}>
          Delete
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
        <div className='w-2/5 mx-auto'>
        <Input 
          label='Email'
          name='email'
          type='email'
          value={form.email}
          onChange={handleChange}
          placeholder='email@example.com'
          error={errors.email}
          icon={PassIcon}
        />
        <Button 
          label= 'Hello'
          onClick={() => {}}
          icon={AddIcon}
        />
        <Button 
          label= 'Bye'
          type= 'delete'
          onClick={() => {}}
          icon={DeleteIcon}
        />
        </div>
        <p className='p-4'>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
