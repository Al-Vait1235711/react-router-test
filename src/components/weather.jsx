import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"


import WeatherApiClient from "./weatherclient"

const cities = [
    {
        city: 'London',
        lat: 51.50,
        lng: -0.11
    },
    {
        city: 'Berlin',
        lat: 52.521641628567565,
        lng: 13.403009104564482
    },
    {
        city: 'Paris',
        lat: 48.84942996647579,
        lng: 2.343471195480475
    },
    {
        city: 'Vilnius',
        lat: 54.68435171280738,
        lng: 25.275258723758828
    },
    {
        city: 'Tadley',
        lat: 51.35554821001266,
        lng: -1.1552680158939466
    },
    {
        city: 'Zagare',
        lat: 56.35835530287238,
        lng: 23.263043968050674
    },
    {
        city: 'Athens',
        lat: 37.966785872665085,
        lng: 23.73270658271814
    },
    {
        city: 'Palermo',
        lat: 38.111524085631615,
        lng: 13.357819931560824
    },
    {
        city: 'Los Angeles',
        lat: 34.04811354899886,
        lng: -118.24627053363086
    }
]

//34.04811354899886, -118.24627053363086
// 38.111524085631615, 13.357819931560824
// Athens 37.966785872665085, 23.73270658271814

// London: 51.501751092528366, -0.11589720240199451
{/* <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d79500.03699093206!2d-0.13872816474227703!3d51.48796437576176!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1741808764998!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */ }

// Paris : 48.84942996647579, 2.343471195480475
{/* <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d99860.21820409822!2d2.3170809925268596!3d48.874834293719786!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1741808893517!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */ }

// Berlin: 52.521641628567565, 13.403009104564482




export default function WeatherApp() {

    return (
        <>
            <Container fluid>
                <Row >
                    <Col sm={12} className="weather-div title-holder">
                        <div className="disp-inline">Simple use of Weather API</div>
                        <div className="disp-inline api-ref">(open-meteo)</div>
                    </Col>
                </Row>
                <Row >
                    {cities.map(data => {
                        return (
                            <Col md={6} key={data.city} className="weather-col">
                                <WeatherApiClient city={data.city} lat={data.lat} lng={data.lng} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>

        </>
    )
}