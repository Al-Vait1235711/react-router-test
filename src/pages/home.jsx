import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default function AppHome(){
    return(
        <div>
<Container fluid={true}>
  <Row>
    <Col sm={12} style={{textAlign:"center"}}>
    <h2 style={{marginTop:"20px"}}>Home Page</h2>
    </Col>
  </Row>
        
        </Container>
        </div>
    )
}