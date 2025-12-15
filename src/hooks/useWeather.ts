/** Custom hook para la consulta con la API */
import axios from "axios";
// import { z } from 'zod'
import { object, string, number, InferOutput, parse } from 'valibot'
import { searchType } from "../types/types";
import { useMemo, useState } from "react";

// type Guard o assertion
// function isWeatherResponse(weather: unknown): weather is Weather{   // toma un valor desconocido | retorna true o false
//     return (                                                        // retorna true si se cumplen las comprobaciones
//         Boolean(weather) &&                                         // comprueba que exista weather
//         typeof weather === 'object' &&                              // comprueba que sea un objeto
//         typeof (weather as Weather).name === 'string' &&            // comprueba que contenga un tipo string en weather.name
//         typeof (weather as Weather).main.temp === 'number' &&       // comprueba que weather.main.temp sea number
//         typeof (weather as Weather).main.temp_max === 'number' &&   // comprueba que weather.main.temp_max se number
//         typeof (weather as Weather).main.temp_min === 'number'      // comprueba que weather.main.temp_min sea number
//     )
// }

// Zod
// const Weather = z.object({
//     name: z.string(),
//     main: z.object({
//         temp: z.number(),
//         temp_max: z.number(),
//         temp_min: z.number(),
//     })
// })
// type Weather = z.infer<typeof Weather>

// valibot
const WeatherSchema = object({                          // objeto de type de volibor
    name: string(),                                     // validacion de cada propiedad
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number(),
    })
})
export type Weather = InferOutput<typeof WeatherSchema> // creación del type
// termina volibot

const initialState = {                                  // valor inicial de weather
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}


/** funcion principal useWeather */
function useWeather() {        
                                             
    const [weather, setWeather] = useState<Weather>(initialState)                    // state de clima
    
    const [spinner, setSpinner] = useState(false)                                 /** state que despliega el spinner */
    const [notFound, setNotFound] = useState(false)                                 // estado de respuesta a la API
    
    /** funcion que consulta la API de clima*/
    const fetchWeather = async (search: searchType) => {                            

        const API_KEY = import.meta.env.VITE_API_KEY        // importa el api key de weather
        setWeather(initialState)                            // reinicia el objeto de clima
        setSpinner(true)                                    // activa el spinner
        setNotFound(false)                                  // reinicia el estado de ubicación no encontrada
        try {
            
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${API_KEY}`
            // primer llamado | geocoding                       
            const {data} = await axios(geoUrl)                                          //extrae data del JSON usando axios
            
            //comprobar si existe
            if(!data[0]){
                setNotFound(true)
                return
            }
            const lat = data[0].lat
            const lon = data[0].lon
            
            //segundo llamado | weather
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            /** Tipear la respuesta de la API */
            //castear el Type
            // const {data: dataWeather} = await axios<Weather>(weatherUrl)                         // extrae data llamandolo dataWeather
            // console.log(dataWeather)

            //type guards
            // const {data: weatherResult} = await axios(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if(result){
            //     console.log(weatherResult.name)
            // } else {
            //     console.log('respuesta mal formada')                            // si el type no coincide en la comprobacion, retorna false
            // }
            // ZOD
            // const {data: weatherResult} = await axios(weatherUrl)
            // const result = Weather.safeParse(weatherResult)
            // if(result.success){
            //     console.log(result.data.name)
            //     console.log(result.data.main.temp)
            // valibot
            const {data: weatherResult} = await axios(weatherUrl)
            const result = parse(WeatherSchema, weatherResult)

            if(result){
                setWeather(result)                                  // guarda la información en el state
            }
            
        } catch (error) {
            console.log(error)
        } finally{
            setSpinner(false)
        }
    } /** termina funcion de consulta de API */

    // funcion para detecctar que weather tenga información
    const hasWeatherData = useMemo(() => weather.name, [weather])   // espera a cambios en weather

    return {
        weather,
        spinner,
        notFound,
        fetchWeather,
        hasWeatherData
    }

}

export default useWeather;