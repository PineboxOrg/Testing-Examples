const sum = require('../index.js');

const jsdom = require("jsdom");
const fabric = require('fabric').fabric;
const { createCanvas } = require('canvas');

var fs = require('fs'),
    out = fs.createWriteStream(__dirname + '/helloworld2.png');

var resolve = require('path').resolve

const { JSDOM } = jsdom;

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

//#region a
// test('Hello world on paragraph', () => {
//     const dom = new JSDOM(`<!DOCTYPE html><body><p>Hello world</p></body>`, {
//         url: "http://localhost/",
//         runScripts: "dangerously",
//         resources: "usable",
//     });
//     dom.window.localStorage.setItem('name', 'Sebastián');
//     expect(dom.window.document.querySelector("p").textContent).toBe('Hello world');
//     expect(dom.window.localStorage.getItem('name')).toBe('Sebastián');
//     // expect(dom.window.fabric.version).toBe('2.4.6');;
// });
//#endregion

//#region b
test('Isolate Canvas', () => {
    const dom1 = new JSDOM(`<!DOCTYPE html><body><canvas id="c" width="1000" height="500"></canvas>
    </body>`, {
            url: "http://localhost/",
            runScripts: "dangerously",
            resources: "usable",
        });
    // var canvas = window._canvas = fabric. .Canvas('c', {
    //     backgroundColor: '#eee'
    // })
    var canvas = createCanvas(200, 200);
    // console.log(canvas);
    // console.log(canvas.toDataURL());

    const ctx = canvas.getContext('2d')

    // Write "Awesome!"
    ctx.font = '30px Impact'
    ctx.rotate(0.1)
    ctx.fillText('Awesome!', 50, 100)

    // Draw line under text
    var text = ctx.measureText('Awesome!')
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.lineTo(50, 102)
    ctx.lineTo(50 + text.width, 102)
    ctx.stroke()

    var outPath = resolve(__dirname, 'rectangle.png')

    canvas.createPNGStream().pipe(fs.createWriteStream(outPath))


    // // Draw cat with lime helmet
    // loadImage('examples/images/lime-cat.jpg').then((image) => {
    //     ctx.drawImage(image, 50, 0, 70, 70)

    //     console.log('<img src="' + canvas.toDataURL() + '" />')
    // })
    // expect(dom1.window.document.querySelector("#c")).toBeDefined();
    expect(canvas).toBeDefined();
});

//#endregion b

//#region c
test('Fabric Canvas', () => {
    var canvas = new fabric.StaticCanvas(null, { width: 200, height: 200 });
    var text = new fabric.Text('Hello world', {
        left: 100,
        top: 100,
        fill: 'rgba(0,0,0,0.5)',
        angle: 15
    });
    canvas.add(text);

    canvas.renderAll();

    console.log(canvas.toDatalessJSON());

    var stream = canvas.createPNGStream();
    stream.on('data', function (chunk) {
        out.write(chunk);
    });
    expect(canvas).toBeDefined();
});