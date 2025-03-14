import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { Collapse } from 'bootstrap'
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, AreaChart, Area, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../assets/styles/weatherclient.css'




export default function WeatherApiClient(props) {

    const [data, setData] = useState(null)
    const [timeNow, setTime] = useState(null)

    // var city = 'non-selected'
    // var lat = 'non-selected'
    // var lng = 'non-selected'
    if ((props.city) && (props.lat) && (props.lng)) {
        var city = props.city
        var lat = props.lat
        var lng = props.lng

    }
    // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m,cloud_cover&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`


    const getData = async () => {
        try {
            await fetch(apiUrl).then((resp) => {

                if (!resp.ok) {
                    throw new Error('No response from server', resp.status)
                }
                // console.log(resp)
                return resp.json();
            }).then(data => (
                setData(data)

            )).catch((e) => { console.log(e) })

        } catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {

        const delay = () => new Promise(resolve => setTimeout(resolve, 0.1))
        const r = async () => {
            if (((props.city) && (props.lat) && (props.lng))) {
                await getData();

            }
        }
        const w = async () => (await delay(), await r())
        w()
        const _time = new Date()
        // data ? setTime(_time) : null
        setTime(_time)
    }, [apiUrl])

    var dataChart = []
    data ? dataChart = sortData(data) : null
    data ? LastUpdateTime(data.current.time, `upd-${city.replaceAll(" ", "-")}`) : null


    return (

        <div id={`weather-${city}`} className="weather-div holder" style={{ width: "100%" }}>
            <Container fluid >
                {/* <Row>
                    <Col> */}
                <div className="weather-div city">{city}</div>
                {(timeNow && data) ? (<div className="weather-div lastupdate"><div className="weather-div lastupdate updatedago">Last update <div className="weather-div lastupdate updatedago" id={`upd-${city.replaceAll(" ", "-")}`}></div>minutes ago.</div><div className="weather-div lastupdate updatedon">{data.current.time.replaceAll('T', ' ')}</div></div>) : (<div className="loader"></div>)}


                {data ? (<div className="weather-div temperature">Temperature: {data.current.temperature_2m} {data.current_units.temperature_2m}</div>) : null}
                {data ? (<div className="weather-div wind-speed">Wind speed: {data.current.wind_speed_10m} {data.current_units.wind_speed_10m}</div>) : null}
                {data ? (<div className="weather-div wind-speed">Wind direction: {data.current.wind_direction_10m}{data.current_units.wind_direction_10m}</div>) : null}
                {data ? (<div className="weather-div wind-speed"><DrawWindDir windDirection={data.current.wind_direction_10m} /></div>) : null}
                {data ? (<Container fluid className="weather-div wind-speed" style={{ textAlign: 'end', paddingLeft: '0px', paddingRight: '0px' }}>
                    <a href={`#id-${city.replaceAll(" ", "-")}`} data-bs-toggle="collapse" >More</a>
                    <div id={`id-${city.replaceAll(" ", "-")}`} className="collapse" style={{ textAlign: 'left', width: "100%", marginLeft: '0px' }}>
                        <ResponsiveContainer width={'100%'} height={200}>
                            <AreaChart
                                width={'100%'}
                                height={50}
                                data={dataChart ? dataChart : null}
                                margin={{
                                    top: 2,
                                    right: 5,
                                    left: 0,
                                    bottom: 2,
                                }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        {/* <stop offset="35%" stopColor="#ff660e" stopOpacity={0.3} /> */}
                                        <stop offset="40%" stopColor="#ffd609" stopOpacity={0.5} />
                                        <stop offset="90%" stopColor="#0eb3ff" stopOpacity={0.15} />
                                    </linearGradient>
                                </defs>


                                <CartesianGrid strokeDasharray="2 2" fill="red" fillOpacity={0.01} />
                                <XAxis dataKey="time" />
                                <YAxis unit={dataChart[0].unit} />
                                <Tooltip />
                                {/* <Legend /> */}
                                <Area type="monotone" dataKey="Temp" stroke="#8884d8" fill="url(#colorUv)" fillOpacity={1} dot={false} activeDot={{ stroke: 'red', strokeWidth: 1, r: 2 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                </Container>) : null}
            </Container>

        </div>
    )
}

/**
 * 
 * @param {*} props size: size of svg image; windDirection (degrees) 0-360
 * @returns svg element 
 */
function DrawWindDir(props) {

    var size = 40
    if (props.size) {
        size = props.size
    }
    var halfsize = size / 2

    var windDirection = 0
    if (props.windDirection) {
        windDirection = props.windDirection
    }

    var lineend = DrawLine(size, windDirection)

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={halfsize} cy={halfsize} r={halfsize - 1} fill="none" strokeWidth={1} stroke="#5d8f5b"></circle>

            <line x1={lineend.x0} y1={lineend.y0} x2={lineend.x1} y2={lineend.y1} stroke="#055f00" strokeWidth={2} strokeLinecap="butt" />
            <polyline points={`${halfsize},${halfsize} ${lineend.p0x},${lineend.p0y} ${lineend.x1},${lineend.y1} ${lineend.p2x},${lineend.p2y} ${halfsize},${halfsize}`} fill="#0be000" stroke="#055f00" strokeWidth={1} />
        </svg>
    )
}




/**
 * 
 * @param {*} size size of the square svg say 300x300, 
 * @param {*} direction angle 0-360
 * @returns object of point values ...
 */
function DrawLine(size, direction) {
    const l = size - 5  // gives line length - 3. We draw a line from centre of canvas ? fot the start

    // To draw a line from a given angle
    // We will use:
    // for x sin(angle) * dist
    // for y cos(angle) * dist
    // assuming we start at x=0, y=0
    var _v0 = 0
    var _v1 = 0
    var _v2 = 0


    var arrowbaseangle = 0

    const ndirT = direction * Math.PI / 180
    const ndirTo = ((direction + 180) % 360) * Math.PI / 180

    var _x1 = (size / 2) + (Math.sin(ndirT) * l / 2)
    var _y1 = (size / 2) - (Math.cos(ndirT) * l / 2)
    var _x0 = (size / 2) + (Math.sin(ndirTo) * l / 2)
    var _y0 = (size / 2) - (Math.cos(ndirTo) * l / 2)

    //Work polyline coordinates
    const arrowheadlength = l * 0.5 // the arrow body will occupy 50% of the full arrow length
    var arrowangle = 45 // The arrow angle at its point in degrees
    const poldist = l * 0.9

    const __tmpangp = ((direction + 180 + (arrowangle / 2)) % 360) * Math.PI / 180
    const __tmpangn = ((direction + 180 - (arrowangle / 2)) % 360) * Math.PI / 180

    const p0x = _x1 + (Math.sin(__tmpangp) * poldist)
    const p0y = _y1 - (Math.cos(__tmpangp) * poldist)
    const p2x = _x1 + (Math.sin(__tmpangn) * poldist)
    const p2y = _y1 - (Math.cos(__tmpangn) * poldist)


    return { x0: _x0, y0: _y0, x1: _x1, y1: _y1, p0x: p0x, p0y: p0y, p2x: p2x, p2y: p2y }
}



/**
 * 
 * @param {*} dataC  object with API data
 * @returns array of [{time : time, Temp : temp, unit: measuringUnit}, {}, ...]
 */
function sortData(dataC) {

    if (dataC !== null) {
        var dataChart = []
        // regroup data for charts
        for (var i = 0; i < Object.keys(dataC.hourly.temperature_2m).length; i++) {
            dataChart.push({ time: dataC.hourly.time[i], Temp: dataC.hourly.temperature_2m[i], unit: dataC.hourly_units.temperature_2m })
        }

        return dataChart

    } else {
        console.log('')
    }
}

/**
 * @param dataT: time the data was fetched
 * @param divid: element id whre to add the result
 * @returns innerHTML with value
 */
function LastUpdateTime(dataT, divid) {

    setInterval(timeDiff, 2000);
    function timeDiff() {
        let timeD = new Date(new Date() - new Date(dataT))
        document.getElementById(divid).innerHTML = timeD.getMinutes() // + ':' + timeD.getSeconds()
    }
}