import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import {  LineMaterial, Line2} from 'three-stdlib';
import { Color } from 'three';


/**
 * Extends LineGeometry
 */
class CircleGeometry extends LineGeometry {
    constructor() {
        super();
        this.verteces = [];
    }

    /**
     *
     * @param {*} centre: array:[x,y,z]
            * @param {*} radius: number
            * @param {*} segments: number
            */
    setFromCentreRadius(centre, radius, segments) {
        const segment = Math.PI * 2 / segments
        for (let i = 0; i < segments + 1; i++) {
            var x = null;
            var y = null;
            var z = null;
            x = centre[0] + (radius * Math.cos(segment * i));
            y = centre[1] + (radius * Math.sin(segment * i));
            z = centre[2];
            this.verteces.push(x, y, z)

        }
        const geometry = this.setPositions(this.verteces)
        console.log(geometry)
        return geometry
    }

}

/**
 * Extends LineGeometry
 */


class PointGeometry {
    constructor() {
        this.verteces = [];
        this.radius = 0;
        this.centre = [];
        this.rotate = 0
        this.pointtype = null;
    }
    /**
     *
     * @param {*} centre: array:[x,y,z]
            * @param {*} radius: number
            * @param {*} segments: number
            * @param {*} rotate: number => degrees 0-90  default: 0
            */
    setFromCentreRadius(centre, radius, segments, rotate, pointtype) {
        this.pointtype = pointtype;
        this.centre = centre
        this.radius = radius
        this.rotate = rotate
        const segment = Math.PI * 2 / segments
        for (let i = 0; i < segments + 1; i++) {
            var x = null;
            var y = null;
            var z = null;
            x = centre[0] + (radius * Math.cos(segment * i));
            y = centre[1] + (radius * Math.sin(segment * i));
            z = centre[2];
            this.verteces.push(x, y, z)

        }
        const geometry = new LineGeometry().setPositions(this.verteces)
        const _ll = this.orthoCross()
        // const testgeom = mergeBufferGeometries([_ll, geometry], false)
        return [geometry, _ll[0], _ll[1]]
    }

    orthoCross() {
        const vert = []
        const _angle = Math.PI * 2 / 4 //need 4 points for two lines, each line two points
        const _stangle = this.rotate * Math.PI / 180
        const _length = this.radius * 1.2 // line extends 10% pass the radius
        for (let i = 0; i < 2; i++) {
            for (let n = 0; n < 3; n += 2) {
                var x = this.centre[0] + (_length * Math.cos(_stangle + _angle * (i + n)));
                var y = this.centre[1] + (_length * Math.sin(_stangle + _angle * (i + n)));
                var z = this.centre[2];
                vert.push(x, y, z)
            }
        }
        const geom1 = new LineGeometry().setPositions(vert.slice(0, 6))
        const geom2 = new LineGeometry().setPositions(vert.slice(6, 12))
        return [geom1, geom2]
    }

}


function CustPoint(props) {

    var radius = 0.02
    var segments = 40
    var rotate = 0
    var position = [0,0,0]

    if(!props.position && !props.test){
        return
    } else if(props.position){
        position = props.position
    }
    if(props.radius){
        radius = props.radius
    } 
    if(props.segments){
        segments= props.segments
    } 
    if(props.rotate){
        rotate = props.rotate
    } 


    const geometry = new PointGeometry().setFromCentreRadius(position, radius, segments, rotate);
    const material = new LineMaterial();
    // const material = new THREE.MeshBasicMaterial()
    material.color = new Color('#ff0000');
    material.linewidth = 0.002;
    return (<group>
        <mesh geometry={geometry[0]} material={material} ></mesh>
        <mesh geometry={geometry[1]} material={material} ></mesh>
        <mesh geometry={geometry[2]} material={material} ></mesh>
    </group>)

}





export { PointGeometry, CircleGeometry, CustPoint }