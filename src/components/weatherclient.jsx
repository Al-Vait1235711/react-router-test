import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { useEffect, useState } from "react"
import '../assets/styles/weatherclient.css'




export default function WeatherApiClient(props) {

    const [data, setData] = useState(null)

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
                getData()
            }
        }
        const w = async () => (await delay(), await r())
        w()


    }, [apiUrl])

 






    return (

        <div id={`weather-${city}`} className="weather-div holder" style={{ width: "100%" }}>
            <Container fluid>
                {/* <Row>
                    <Col> */}
                <div className="weather-div city">{city}</div>
                {data ? (<div className="weather-div lastupdate">Updated: {data.current.time}</div>) : (<div className="loader"></div>)}
                {data ? (<div className="weather-div temperature">{data.current.temperature_2m} {data.current_units.temperature_2m}</div>) : null}
                {data ? (<div className="weather-div wind-speed">{data.current.wind_speed_10m} {data.current_units.wind_speed_10m}</div>) : null}
                {data ? (<div className="weather-div wind-speed">Wind direction</div>) : null}
                {data ? (<div className="weather-div wind-speed"><DdrawWindDir windDirection={data.current.wind_direction_10m} /></div>) : null}
                {/* {data ? (<div className="weather-div wind-speed">{data.current.cloud_cover} {data.current_units.cloud_cover}</div>) : null} */}
                {/* </Col>
                </Row> */}
            </Container>

        </div>
    )
}


function DdrawWindDir(props) {

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
            {/* <line x1={halfsize - 5} y1={halfsize} x2={halfsize + 5} y2={halfsize} stroke="black" strokeWidth={1} />
            <line x1={halfsize} y1={halfsize - 5} x2={halfsize} y2={halfsize + 5} stroke="black" strokeWidth={1} /> */}
            <circle cx={halfsize} cy={halfsize}  r={halfsize-1} fill="none" strokeWidth={1} stroke="#5d8f5b"></circle>

            <line x1={lineend.x0} y1={lineend.y0} x2={lineend.x1} y2={lineend.y1} stroke="#055f00" strokeWidth={2} strokeLinecap="butt" />
            <polyline points={`${halfsize},${halfsize} ${lineend.p0x},${lineend.p0y} ${lineend.x1},${lineend.y1} ${lineend.p2x},${lineend.p2y} ${halfsize},${halfsize}`} fill="#0be000" stroke="#055f00" strokeWidth={1} />
        </svg>
    )
}




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

    const __tmpangp = ((direction + 180 + (arrowangle/2)) % 360) * Math.PI / 180
    const __tmpangn = ((direction + 180 - (arrowangle/2)) % 360) * Math.PI / 180

    const p0x = _x1 + (Math.sin(__tmpangp)* poldist)
    const p0y =  _y1 - (Math.cos(__tmpangp)* poldist)
    const p2x = _x1 + (Math.sin(__tmpangn)* poldist)
    const p2y = _y1 - (Math.cos(__tmpangn)* poldist)


    return { x0: _x0, y0: _y0, x1: _x1, y1: _y1, p0x: p0x, p0y: p0y, p2x: p2x, p2y: p2y }
}
