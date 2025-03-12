import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBarCircular from '../components/circularprogressbar';



export default function AppHome(){
    return(
        <div>
<Container fluid={true}>
  <Row>
    <Col sm={12} style={{textAlign:"center"}}>
    <h2 style={{marginTop:"20px"}}>Home Page</h2>
    </Col>
  </Row>

<Row>
  <Col sm={12} style={{textAlign:"center", marginBottom:"40px", marginTop:"40px"}}>
  <h4>Free circular progress bar examples</h4>
  </Col>
</Row>

  <Row>
    <Col sm={4} style={{textAlign:"center", marginBottom:"40px", marginTop:"40px"}}>
    <LoadingBarCircular demo  />
    <p style={{marginTop:"20px"}}>Demo 1 progress bar</p>
    </Col>
    <Col sm={4} style={{textAlign:"center", marginBottom:"40px", marginTop:"40px"}}>
    <LoadingBarCircular demo demostep={0.002} lodFgBarCol={'#fd7f01'}/>
    <p style={{marginTop:"20px"}}>Demo 2 progress bar</p>
    </Col>
    <Col sm={4} style={{textAlign:"center", marginBottom:"40px", marginTop:"40px"}}>
    <LoadingBarCircular demo size={100} demostep={0.003} lodFgBarCol={'#03c500'}/>
    <p style={{marginTop:"20px"}}>Demo 3 progress bar</p>
    </Col>
    <Col sm={4} style={{textAlign:"center", marginBottom:"40px", marginTop:"40px"}}>
    <LoadingBarCircular demo demostep={0.004} size={100} strokeWidth={25} lodFgBarCol={'#03c500'}/>
    <p style={{marginTop:"20px"}}>Demo 4 progress bar</p>
    </Col>
    <Col sm={4} style={{textAlign:"center", marginBottom:"40px", marginTop:"40px"}}>
    <LoadingBarCircular demo size={120} fontSize={30} demostep={0.002} lodFgBarCol={'#03c500'}/>
    <p style={{marginTop:"20px"}}>Demo 5 progress bar</p>
    </Col>
    <Col sm={4} style={{textAlign:"center", marginBottom:"40px", marginTop:"40px"}}>
    <LoadingBarCircular demo size={90} demostep={0.003} lodFgBarCol={'#03c500'}/>
    <p style={{marginTop:"20px"}}>Demo 6 progress bar</p>
    </Col>
    <Col sm={4} style={{textAlign:"center", marginBottom:"40px", marginTop:"40px"}}>
    <LoadingBarCircular 
    demo size={120} 
    fontSize={30} 
    strokeWidth={20} 
    demostep={0.0025} 
    lodFgBarCol={'#fd7f01'} 
    innerFillCol={'#434343'} 
    fontColor={'#ffffff'}/>
    <p style={{marginTop:"20px"}}>Demo 7 progress bar</p>
    </Col>
  </Row>
        
        </Container>
        </div>
    )
}