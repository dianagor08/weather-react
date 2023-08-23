import {useEffect} from "react";
import Chart from "chart.js";
function Graph(props) {

    useEffect(() => {
        // See API documentation here: https://openweathermap.org/forecast5
        const data = props.data;
        const temp_min = [];
        const temp_max = [];
        const temp_time = [];
        // The required day index to display in the graph 
        const startIndex = props.dayIndex * 8
        const endIndex = (props.dayIndex + 1) * 8 - 1;
        data.list.forEach((sample, index) => {
            if (index < startIndex || index > endIndex) return;
            const d = new Date(sample.dt * 1000);
            //console.log(d)
            temp_min.push(sample.main.temp_min);
            temp_max.push(sample.main.temp_max);
            temp_time.push(d.toLocaleTimeString());
        });
        //console.log('Graph mounted')
        new Chart("myChart", {
            type: "line",
            data: {
                labels: temp_time,
                datasets: [{
                    data: temp_min,
                    borderColor: "blue",
                    fill: false
                }, {
                    data: temp_max,
                    borderColor: "red",
                    fill: false
                }]
            },
            options: {
                legend: { display: false }
            }
        });

    }, []);

    return (
        <div className="p-3 my-5 bg-danger-subtle">
            <i className='text-danger fw-bold'>Graph Item component</i>
            <h4>Hourly Temperature data</h4>
            <canvas id="myChart" style={{ width: '90%', maxWidth: 600 }}></canvas>
        </div >
    );
}
export default Graph;