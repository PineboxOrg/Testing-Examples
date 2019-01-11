const sum = require('../index.js');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('Hello world on paragraph', () => {
    const dom = new JSDOM(`<!DOCTYPE html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/2.4.6/fabric.js"></script></head><body><p>Hello world</p></body>`, {
        url: "https://example.org/",
        runScripts: "dangerously"
    });

    dom.window.localStorage.setItem('name', 'Sebastián');
    expect(dom.window.document.querySelector("p").textContent).toBe('Hello world');
    expect(dom.window.localStorage.getItem('name')).toBe('Sebastián');
    expect(fabric).toBeDefined();
    expect(dom.window.fabric.version).toBe('2.4.6');;
})