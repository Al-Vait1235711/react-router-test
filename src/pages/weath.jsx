import { Container, Row, Col } from "react-bootstrap";
import WeatherApp from "./weather/weather";



export default function WeathApp(){

    return (
        <>
        <Container fluid={true} className='cont-marg-b20'>
                <Row >
                  <Col sm={12} style={{ textAlign: "center" }}>
                    <h2 >Weather API .....</h2>
                  </Col>
                </Row>
        
                <Row >
                  <Col sm={12}>
                    <WeatherApp />
                  </Col>
                </Row>
                <hr></hr>
              </Container>
        </>
    )
}