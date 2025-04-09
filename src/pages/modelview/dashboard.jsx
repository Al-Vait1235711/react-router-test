import './dashb.css'


class GUIm {

    ACI = {
        251:'red',
        252:'yellow',
        253:'#05f501',
        254:'#01c9f5',
        255:'#0115f5',
        256:'#ff00f2',
        257:'#000000',
        258:'#535353',
        259:'#b0b0b0',
    }


    constructor(container) {
        this.name = 'Any';
        this.year = 'Some';
        this.container = container
        this.obj = null
        this.loc = this.get_element()
        this.place()

        // this.element = this.get_element(container)
    }

    get_element() {
        return document.getElementById(this.container);
    }

    age() {
        const date = new Date();
        return date.getFullYear() - this.year;
    }

    place() {

        if (!this.obj) {

            return this.loc.innerHTML = `<div class='gui-cont'>
            <div class='title'>Select item</div>
            </div>`
        }
        else if (this.obj.type == 'line') {

            return this.loc.innerHTML = `<div class='gui-cont'>
            <div class='title'>Line</div>
            <div class='frow'>Start X: <input type='number' readonly value=${this.round(this.obj.start[0],3)}></div>
            <div class='frow'>Start Y: <input type='number' readonly value=${this.round(this.obj.start[1],3)}></div>
            <div class='frow'>Start Z: <input type='number' readonly value=${this.round(this.obj.start[2],3)}></div>
            <div class='frow'>End X: <input type='number' readonly value=${this.round(this.obj.end[0],3)}></div>
            <div class='frow'>End Y: <input type='number' readonly value=${this.round(this.obj.end[1],3)}></div>
            <div class='frow'>End Z: <input type='number' readonly value=${this.round(this.obj.end[2],3)}></div>
            <div class='frow'>Length 2D: <input type='number' readonly value=${this.round(Math.sqrt(Math.pow((this.obj.start[0] - this.obj.end[0]),2) +Math.pow((this.obj.start[1] - this.obj.end[1]),2)),3)}></div>
            <div class='frow'>Length 3D: <input type='number' readonly value=${this.round(Math.sqrt(Math.pow((this.obj.start[0] - this.obj.end[0]),2) +Math.pow((this.obj.start[1] - this.obj.end[1]),2)+Math.pow((this.obj.start[2] - this.obj.end[2]),2)),3)}></div>
            <div class='frow'>&#916 X: <input type='number' readonly value=${this.round(this.obj.end[0]-this.obj.start[0],3)}></div>
            <div class='frow'>&#916 Y: <input type='number' readonly value=${this.round(this.obj.end[1]-this.obj.start[1],3)}></div>
            <div class='frow'>&#916 Z: <input type='number' readonly value=${this.round(this.obj.end[2]-this.obj.start[2],3)}></div>
            <div class='title'>Layer</div>
            <div class='frow'>Nayer name: <input type='text' readonly value=${this.obj.layer}></div>
            <div class='frow'>ACI Color: <input class='frowcol' type='color' disabled value=${this.getColor(this.obj.color)}></div>
            </div>`
        }
        else if (this.obj.type == 'point') {
            return this.loc.innerHTML = `<div class='gui-cont'>
            <div class='title'>Point</div>
            <div class='frow'>X: <input type='number' readonly value=${this.round(this.obj[0],3)}></div>
            <div class='frow'>Y: <input type='number' readonly value=${this.round(this.obj[1],3)}></div>
            <div class='frow'>Z: <input type='number' readonly value=${this.round(this.obj[2],3)}></div>
            </div>`
        }
    }

    update(obj) {
        this.obj = obj
        this.place()
        console.log(this.obj)
    }

    round(data, decimal){
        if(data !=0){
            const multiplier = Math.pow(10, decimal)
            return Math.round(data * multiplier) / multiplier
        };

        return 0;
    }

    getColor(code){
        if(code && Object.keys(this.ACI).includes(code.toString())){
            return this.ACI[code]
        }
        return '#ffffff'
    }
}


export {GUIm}