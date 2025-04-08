import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBarCircular from './loadingbars/circularprogressbar';
import WeatherApiClient from './weather/weatherclient';
import WeatherApp from './weather/weather';
// import BezierCurves from '../components/bziercurve';



export default function AppHome() {
  return (
    <div>
      <Container fluid={true} className='cont-marg-b20'>
        <Row >
          <Col sm={12} style={{ textAlign: "center" }}>
            <h2 >SandBox</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="weather-div title-holder">
            <div className='title'>Sandbox cards with brief description ...</div>
            {/* <div className='title notes'>(various items)</div> */}
          </Col>
        </Row>
        <Row >
          <Col sm={12}>
            Updates coming...
          </Col>
        </Row>
        <Row >
              <Col md={6} className="weather-col">
                Some data here
              </Col>
              <Col md={6} className="weather-col">
                Some data here
              </Col>
              <Col md={6} className="weather-col">
                Some data here
              </Col>
        </Row>
        <hr></hr>
      </Container>

    </div>
  )
}