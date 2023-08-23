import WeatherItem from "./WeatherItem";
import Settings from "./Settings";
import Graph from "./Graph";
import {useState , useEffect} from "react";
function Body(props) {
    const [settings, setSettings] = useState({
        'tempCelsius': true,
        'displayTemp': true,
        'displayWind': true,
        'displayIcon': true,
        'displayHumidity': true
    });
    const [weatherObj, setWeatherObj] = useState(null);

    useEffect(() => {
        // API docs https://openweathermap.org/forecast5
        const Weather_API_key = '6b9ee5f9edbf0469243e280ab4f5d256'
        const url = 'https://api.openweathermap.org/data/2.5/forecast';
        // Read about Fetch API here: https://javascript.info/fetch
        fetch(`${url}?q=Calgary,AB,CA&appid=${Weather_API_key}&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWeatherObj(data);
                console.log('API data came mounted')
            });
    }, []);

    const handleSettingsChange = (settingsUpdate) => {
        //console.log(settingsUpdate)
        setSettings(() => { return { ...settings, ...settingsUpdate } });
        console.log(settings)
    }

    return (
        <div className="container p-3 bg-info">
            <i className='text-danger fw-bold'>Body component</i>
            {weatherObj &&
                <h4>{weatherObj.city.name} - {weatherObj.city.country}</h4>}
            <div className='row'>
                <div className='col'>
                    {weatherObj &&
                        <div>
                            <WeatherItem data={weatherObj.list[0]} />
                            <WeatherItem data={weatherObj.list[8]} />
                            <WeatherItem data={weatherObj.list[16]} />
                            <WeatherItem data={weatherObj.list[24]} />
                            <WeatherItem data={weatherObj.list[32]} />
                        </div>
                    }
                </div>
                <div className='col'>
                    <Settings settings={settings} settingsChangeHandler={handleSettingsChange} />
                </div>
            </div>
            <div className='row'>
                {weatherObj && <Graph data={weatherObj} dayIndex={0} />}
            </div>
        </div>
    );
}
export default Body;