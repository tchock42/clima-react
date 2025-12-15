import { useState } from "react"
import { countries } from "../../data/countries"
import styles from './Form.module.css'
import type { searchType } from "../../types/types"
import Alert from "../Alert/Alert"

type FormProps = {
    fetchWeather: (search:searchType) => Promise<void>                      // se va a devolver un tipo promise por se una funcion asincrona
}

const Form = ({fetchWeather}: FormProps) => {

    const [search, setSearch] = useState<searchType>({                      // state de formulario
        city: '',
        country: ''
    });

    const [alert, setAlert] = useState('')                                  // state de alerta
    

    // funcion para la captura del state del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
       
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    // funcion para envío el formulario
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlert('')                                                        // reinicia alerta

        // validación
        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return;
        }

        // consulta de la API
        fetchWeather(search)
    }

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert>
            }
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>           {/** Primer input */}
                <input 
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Ciudad" 
                    value={search.city}
                    onChange={ handleChange }
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select 
                    name="country" 
                    id="country" 
                    value={search.country}
                    onChange={handleChange}
                >
                    <option 
                        value="">-- Seleccione un País --</option>
                        {countries.map( country => (
                            <option
                                key={country.code}
                                value={country.name}
                            >{country.name}</option>
                        ))}
                </select>
            </div>
            <input className={styles.submit} type="submit" value='Consultar Clima' />
        </form>
    )
}

export default Form
