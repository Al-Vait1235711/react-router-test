import { Container, Row, Col } from "react-bootstrap";
import './modelviewp.css';
import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { Canvas, extend, useThree } from '@react-three/fiber';
import { OrbitControls, LineMaterial } from 'three-stdlib';
extend({ OrbitControls });

import data from '../../test/test1.json';






export default function ModelViewPort() {

    return (
        <>
            <Container fluid>
                <Row >
                    <Col sm={12} className="weather-div title-holder">
                        <div className="disp-inline">Simple use of Weather API</div>
                        <div className="disp-inline api-ref">(open-meteo)</div>
                    </Col>
                </Row>
                <Row>
                    <div className="viewport-holder">
                        <Col sm={12}>
                            <Canvas>
                                <ambientLight intensity={0.1} />
                                <directionalLight position={[0, 0, 5]} color="white" />
                                <directionalLight position={[-1000, -1000, -1000]} color="white" />
                                <directionalLight position={[1000, 1000, 1000]} color="white" />
                                <ControlsOrbit enableRotate={false}/>




                                <CLine2 />
                            </Canvas>

                        </Col>
                    </div>
                </Row>
            </Container>
        </>
    )
}




function DrawItems(props) {




    return

}

function CLine2(props) {


    const testLine = [1, 1, 0, 10, 10, 0]
    const vec = new THREE.Vector3()
    const geometry = new LineGeometry().setPositions(testLine)
    const material = new LineMaterial()
    material.linewidth= 0.001,
    material.color = new THREE.Color('#ff0000')

    return (

        <mesh geometry={geometry} material={material}>
        </mesh>

    )
}



function ControlsOrbit(props) {
    const { camera, gl: { domElement }, } = useThree();    
    return (<orbitControls {...props} args={[camera, domElement]} />)
}