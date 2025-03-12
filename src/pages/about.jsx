import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default function AppAbout(){
    return(
      <div>
      <Container fluid={true}>
        <Row>
          <Col sm={12} style={{textAlign:"center"}}>
          <h2 style={{marginTop:"20px"}}>About Page</h2>
          </Col>
        </Row>  
              </Container>
              </div>
    )
}  