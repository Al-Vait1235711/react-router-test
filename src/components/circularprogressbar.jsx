
/**
 * Circular Progress Bar
 * ***********************************************
 * Copyright 2025 Alvydas Vaitkus
 * 
 * MIT License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this 
 * software and associated documentation files (the “Software”), to deal in the Software 
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
 * to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
 * THE SOFTWARE.
 * 
 * 
  */


/**
 * 
 * @param {*} props progress: Value of percentage / devided by 100
 * @param {*} props demo: if true will animate the progress bar
 * @param {*} props lodFgBarCol: Main color of the bar
 * @param {*} props lodBgBarCol: Background colour of the bar
 * @param {*} props innerFillCol: Inner background fill colour
 * Other styling parameters can be added if required :)
 * @returns HTML Element: Circular progress bar with text value in the middle 
 */

import { useEffect, useState } from "react"

export default function LoadingBarCircular(props) {

    const [prog, setProg] = useState(0.01)

    var progress = 0.001 // 0-1 range 0.1 == 10%
    if (props.progress || props.demo) {
        progress = prog
    }

    //Style section 
    var lodFgBarCol = "#5394fd"
    var lodBgBarCol = "#ddd"
    var innerFillCol = "none"

    if (props.innerFillCol) {
        innerFillCol = props.innerFillCol
    }
    if (props.lodFgBarCol) {
        lodFgBarCol = props.lodFgBarCol
    }
    if (props.lodBgBarCol) {
        lodBgBarCol = props.lodBgBarCol
    }

    // Main hook will update progress bar if demo is not enabled
    if (!props.demo) {
        useEffect((() => {
            setProg(props.progress)
        }), [props.progress])
    }
    // Demo: this infinite loop will animate the progress bar 
    else if (props.demo) {
        var demostep = 0.001
        if (props.demostep) {
            demostep = props.demostep
        }
        useEffect(() => {
            const delay = (ms) => new Promise(response => setTimeout(response, ms))
            const p = async (ms) => (await delay(ms), console.log("Up"), setProg(prog => prog + demostep))
            const r = async (ms) => (await delay(ms), console.log("Reset"), setProg(0))

            if (prog < 1) {
                p(25)
            } else {
                r(2000)
            }
        }, [prog])
    }


    var textvalue = Math.round((progress * 100))
    // Font size
    var fontsize = 16
    if (props.fontSize) {
        fontsize = props.fontSize
    }
    var fontColor = '#000000'
    if(props.fontColor){
        fontColor = props.fontColor
    }

    // Loading bar size
    var size = 70
    if (props.size) {
        size = props.size
    }

    var halfsize = size / 2
    var heightoff = halfsize + (fontsize / 2) - 2
    var strokeWidth = 11 // px
    if (props.strokeWidth) {
        strokeWidth = props.strokeWidth
    }
    var inneffill = halfsize - strokeWidth
    var radius = (size - strokeWidth) / 2
    var circumferense = radius * Math.PI * 2
    // console.log(circumferense)
    var dash = progress * circumferense
    var some = `${dash} ${circumferense}`
    var vieBox = ` 0 0 ${size} ${size}`


    return (
        <div style={{ margin: 'auto' }}>
            <svg width={size} height={size} viewBox={vieBox}>
                <circle
                    cx={halfsize} cy={halfsize} r={radius} fill="none" stroke={lodBgBarCol} strokeWidth={strokeWidth}

                ></circle>
                <circle
                    cx={halfsize} cy={halfsize} r={inneffill} fill={innerFillCol} stroke={0} strokeWidth={strokeWidth}
                ></circle>
                <circle className="fg"
                    cx={halfsize} cy={halfsize} r={radius} fill="none" stroke={lodFgBarCol} strokeLinecap="butt" strokeWidth={strokeWidth}
                    strokeDasharray={some}
                ></circle>
                <text style={{ fontSize: `${fontsize}px`}} fill={fontColor} textAnchor="middle" x={halfsize} y={heightoff}>{textvalue}%</text>
            </svg>
        </div>
    )
}


