function WeatherItem({ data }) {
    const dt = data && (new Date(data.dt * 1000)).toLocaleTimeString();
    //console.log((data.dt - 21600) % (86400), dt)
    return (
        <div className="container p-3 bg-success">
            <i className='text-danger fw-bold'>Weather Item component</i>
            {data &&
                <li >
                    {dt} -
                    Temperature {data.main.temp}C, Feels Like {data.main.feels_like}C -
                    Wind Speed {data.wind.speed}
                </li>
            }
        </div>
    );
}
export default WeatherItem;