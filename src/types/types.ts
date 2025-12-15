export type searchType = {          // type para la busqueda
    city: string
    country: string
}

export type Country = {             // type para la lista de países
    code: string,
    name: string
}

export type Weather = {
    name: string
    main: {
        temp: number
        temp_max: number
        temp_min: number
    }
}