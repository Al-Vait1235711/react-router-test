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
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`


    const getData = async () => {
        try {
            console.log(apiUrl)

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

        const delay = () => new Promise(resolve => setTimeout(resolve, 100))
        const r = async () => {if (((props.city) && (props.lat) && (props.lng))) {
            getData()
        }}
        const w = async () => (await delay(), await r())
        w()


    }, [apiUrl])

    console.log(data ? data : null)
    // getData()






    return (

        <div id={`weather-${city}`} className="weather-div holder" style={{ width: "100%" }}>
            <Container fluid>
                {/* <Row>
                    <Col> */}
                        <div className="weather-div city">{city}</div>
                        {data ? (<div className="weather-div lastupdate">Updated: {data.current.time}</div>) : (<div className="loader"></div>)}
                        {data ? (<div className="weather-div temperature">{data.current.temperature_2m} {data.current_units.temperature_2m}</div>) : null}
                        {data ? (<div className="weather-div wind-speed">{data.current.wind_speed_10m} {data.current_units.wind_speed_10m}</div>) : null}
                    {/* </Col>
                </Row> */}
            </Container>

        </div>
    )
}


