


class ReadDXF {

    constructor(file) {
        this.data = null
    }

    FileR(file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
            console.log(evt.target.result);
            this.data = evt.target.result
        };
        reader.readAsText(file);
        return this.data
    }

}

function printFile(file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
        console.log(evt.target.result);
    };
    reader.readAsText(file);
}





export { ReadDXF, printFile }