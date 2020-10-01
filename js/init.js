let node = document.querySelectorAll(':not(.organizational-chart) > li > *:not(ul)');

var svgNS = 'http://www.w3.org/2000/svg'
let treeMenu = document.querySelector('ul.organizational-chart')


let wrapper = document.createElement('div')
wrapper.setAttribute('class', 'arbo-wrapper')
treeMenu.parentNode.insertBefore(wrapper, treeMenu)
wrapper.appendChild(treeMenu)

let viewBox = '0 0 ' + treeMenu.getBoundingClientRect().width + ' ' + treeMenu.getBoundingClientRect().height
let svgBg = document.createElementNS(svgNS, 'svg')
svgBg.setAttribute('class', 'svg-bg')
svgBg.setAttribute('viewBox', viewBox)
svgBg.setAttribute('height', treeMenu.getBoundingClientRect().height)
svgBg.setAttribute('width', treeMenu.getBoundingClientRect().width)


treeMenu.parentNode.insertBefore(svgBg, treeMenu)

traceLine()

window.onresize = function(event) {
    erazeLine()
    traceLine()
};

function traceLine(){
    node.forEach((item, i) => {
        var x = ( item.getBoundingClientRect().x + (item.getBoundingClientRect().width / 2 ))
        var y = item.getBoundingClientRect().y

        let parent = item.parentElement.parentElement.parentElement.firstElementChild
        var x2 = (parent.getBoundingClientRect().x + ( item.getBoundingClientRect().width / 2 ))
        var y2 = parent.getBoundingClientRect().y + item.getBoundingClientRect().height

        let newLine = document.createElementNS(svgNS, 'line')
        newLine.setAttributeNS(null, 'stroke-dasharray', '1 1')
        newLine.setAttributeNS(null, 'x1', x)
        newLine.setAttributeNS(null, 'y1', y)
        newLine.setAttributeNS(null, 'x2', x2)
        newLine.setAttributeNS(null, 'y2', y2)

        svgBg.append(newLine)
    });
}

function erazeLine(){
    let line = document.querySelectorAll('line');
    line.forEach((item, i) => {
        item.remove();
    });
}
