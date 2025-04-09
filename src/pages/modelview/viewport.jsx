import { Container, Row, Col } from "react-bootstrap";
import './modelviewp.css';
import * as THREE from 'three';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { Canvas, extend, useThree } from '@react-three/fiber';
import { OrbitControls, LineMaterial, mergeBufferGeometries } from 'three-stdlib';
import { PointGeometry, CircleGeometry, CustPoint } from "./geometry";
extend({ OrbitControls, });
import data from '../../test/test1.json';






export default function ModelViewPort() {


    return (
        <>
            <Container fluid>
                <Row >
                    <Col sm={12} className="weather-div title-holder">
                        <div className="disp-inline">Three-JS paractice</div>
                        <div className="disp-inline api-ref">(Some items drawn in canvas)</div>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{ padding: '0px' }}>

                <div className="viewport-holder">
                    <Canvas orthographic camera={{ camera: CustCamera, zoom: 10, position: [0, 0, 500] }}>
                        <ambientLight intensity={0.1} />
                        <directionalLight position={[0, 0, 5]} color="white" />
                        <directionalLight position={[-1000, -1000, -1000]} color="white" />
                        <directionalLight position={[1000, 1000, 1000]} color="white" />
                        <ControlsOrbit enableRotate={false} />
                        <CLine2 color={'magenta'} />
                        <CustPoint test/>
                    </Canvas>
                </div>
            </Container>
        </>
    )
}




function DrawItems(props) {




    return

}

function CLine2(props) {

    const testLine = [-1, -1, 0, 2, 2, 0];
    const geometry = new LineGeometry().setPositions(testLine);
    const material = new LineMaterial();
    if (!props.linewidth) {
        material.linewidth = 0.002;
    } else { material.linewidth = props.linewidth * 0.001; };
    if (!props.color) {
        material.color = new THREE.Color('#ff0000');
    } else { material.color = new THREE.Color(props.color); };
    return (
        <mesh geometry={geometry} material={material}></mesh>)
}


function ControlsOrbit(props) {
    const { camera, gl: { domElement }, } = useThree();
    return (<orbitControls {...props} args={[camera, domElement]} />)
}

const CustCamera = (props) => {

    const width = 100
    const height = 75
    const mycamera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 500)
    return mycamera
}
