import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import './modelviewp.css';
import * as THREE from 'three';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { Canvas, extend, useThree } from '@react-three/fiber';
import { OrbitControls, LineMaterial, mergeBufferGeometries } from 'three-stdlib';
import { PointGeometry, CircleGeometry, CustPoint } from "./geometry";
extend({ OrbitControls, });
import { GUIm } from "./dashboard";
import data from '../../test/test1.json';
import { Line } from '@react-three/drei'







export default function ModelViewPort() {


    const scXYZ = [0.1, 0.1, 0.1]
    const testobjp = { type: 'point', x: 10, y: 130, z: 3 }
    const testobjl = { type: 'line', start: { x: 10, y: 130, z: 3 }, end: { x: 100, y: 13, z: 4 } }
    const [select, setSelect] = useState(null)
    const dataView = getLimits(data)
    const myRef = useRef()

    useEffect(() => {
        const gui = new GUIm('gui')
        gui.update(select)
    }, [select])


    const handleClick = (e) => {
        if (e != null) {
            setSelect(data[e])
        }
    }


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

                <div className="model-view-size1">
                    <div id='gui' className='layer2' ></div>
                    <div className='layer1' >
                        <Canvas orthographic camera={{ camera: CustCamera, zoom: 10, position: [0, 0, 500] }}>
                            <ambientLight intensity={0.1} />
                            <directionalLight position={[0, 0, 5]} color="white" />
                            <directionalLight position={[-1000, -1000, -1000]} color="white" />
                            <directionalLight position={[1000, 1000, 1000]} color="white" />
                            <ControlsOrbit enableRotate={true} />
                            {/* <CLine2 color={'magenta'} /> */}
                            <mesh onDoubleClick={(e) => console.log('double click')} onPointerOver={(e) => { console.log('PointerOver') }} >
                                <CustPoint test /></mesh>
                            <mesh ref={myRef} scale={[scXYZ[0], scXYZ[1], 1]} position={[scXYZ[0] * (-(dataView.minw + dataView.maxw)) / 2, scXYZ[1] * (-(dataView.minh + dataView.maxh)) / 2, 0]}>
                                <DrawItems data={data} handleClick={handleClick} />
                            </mesh>
                            {/* <mesh onPointerOver={(e) => { console.log('PointerOver') }} >
                                <CLine2 points={[[0,0,0],[1,2,0]]}/>
                            </mesh> */}
                        </Canvas>
                    </div>
                </div>
            </Container>
        </>
    )
}




function DrawItems(props) {


    const [hovered, setHovered] = useState({ key: null, status: false })
    const [selected, setSelected] = useState(null)
    console.log(selected)

    return (

        <>
            <mesh position={[0, 0, 0]}>
                {props.data.map((item, index) => {
                    if (item.type === 'line') {
                        return (
                            <mesh key={index}
                                onPointerOver={(event) => { setHovered({ key: index, status: true }) }}
                                onPointerOut={(event) => { setHovered({ key: null, status: false }) }} onClick={(event => { setSelected(index), props.handleClick(index) })}>
                                <Line points={[item.start, item.end]} lineWidth={hovered.key == index || selected == index ? 3 : 1} color={hovered.key == index || selected == index ? 'white' : `${getColor(item)}`} />
                            </mesh>
                        )
                    } else if (item.lwpolyline) {

                        item.lwpolyline.map((it, idx) => {
                            // console.log(it.start)
                            return (
                                <mesh key={idx}>
                                    <Line points={[it.start, it.start]} lineWidth={10} color={'blue'} />
                                </mesh>
                            )
                        })
                    }
                })}
            </mesh>
            {/* <mesh position={[-10, -10, 0]}>
                <mesh position={[10, 10, 0]}>
                    <CLine2 points={[[-1, -1, 0], [-1, 1, 0], [1, 1, 0], [1, -1, 0], [-1, -1, 0]]} lineWidth={0.3} />
                </mesh>
            </mesh> */}

        </>
    )
}



function CLine2(props) {

    var line = [];
    if (props.points) {
        line = [...props.points[0], ...props.points[1]]

    } else return

    const geometry = new LineGeometry().setPositions(line);
    const material = new LineMaterial();
    if (!props.lineWidth) {
        material.linewidth = 0.002;
    } else { material.linewidth = props.lineWidth * 0.0008; };
    if (!props.color) {
        material.color = new THREE.Color('#ff0000');
    } else { material.color = new THREE.Color(props.color); };
    return (
        <group>
            <mesh {...props} geometry={geometry} material={material}></mesh>
        </group>)
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



const getLimits = (data) => {
    // const [bbox, setBbox] = useState({ minh:null, maxh:null, minw:null, maxw:null})
    let bbox = { minh: 10e6, maxh: -10e6, minw: 10e6, maxw: -10e6 }
    // const values = Math.max(null, Object.values(data))
    for (let i = 0; i < data.length; i++) {

        if (data[i].type === 'line') {
            if (data[i].start[0] < bbox.minw) {
                bbox.minw = data[i].start[0]
            }
            else if (data[i].start[0] > bbox.maxw) {
                bbox.maxw = data[i].start[0]
            }
            if (data[i].start[1] < bbox.minh) {
                bbox.minh = data[i].start[1]
            }
            else if (data[i].start[1] > bbox.maxh) {
                bbox.maxh = data[i].start[1]
            }
            if (data[i].end[0] < bbox.minw) {
                bbox.minw = data[i].start[0]
            }
            else if (data[i].end[0] > bbox.maxw) {
                bbox.maxw = data[i].start[0]
            }
            if (data[i].end[1] < bbox.minh) {
                bbox.minh = data[i].start[1]
            }
            else if (data[i].end[1] > bbox.maxh) {
                bbox.maxh = data[i].start[1]
            }
        }
    }

    // console.log(bbox)
    return bbox


}



const ACI = {
    251: 'red',
    252: 'yellow',
    253: '#05f501',
    254: '#01c9f5',
    255: '#0115f5',
    256: '#f501f5',
    257: '#000000',
    258: '#535353',
    259: '#b0b0b0',
}

/**
 * Converts ACI color to RGB
 */
const getColor = (data) => {
    /**
     * Converts ACI color to RGB
     */
    if (data && Object.keys(ACI).includes(data.color.toString())) {
        return ACI[data.color]
    }
    return data
}


