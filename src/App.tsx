import styles from './App.module.css'
import Alert from './components/Alert/Alert'
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'

function App() {

  const { weather, spinner, notFound, fetchWeather, hasWeatherData, } = useWeather()

  return (

    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form
          fetchWeather = {fetchWeather}
        />
        {spinner && <Spinner/>}
        {hasWeatherData && <WeatherDetail weather = {weather}/>}        {/** Si se tiene clima, imprime el componente de clima */}  
        {notFound && <Alert>Ciudad de Encontrada</Alert>}               {/** Si no se encuentra la ubicación, imprime alerta*/}
      </div>
    </>
  )
}

export default App
