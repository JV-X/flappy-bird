var element = sel => document.querySelector(sel)

var log = console.log.bind(console)

function randomOne(_list) {
    if (_list.length == 0) {
        return null
    }

    let index = Math.random() * _list.length
    index = parseInt(index)
    return _list[index]
}

function randomBetween(min, max) {
    let offset = (max - min) * Math.random()
    return min + offset
}

function rectIntersects(r1, r2) {
    const r1xInR2 = r1.x >= r2.x && r1.x <= r2.x + r2.w
    const r1yInR2 = r1.y >= r2.y && r1.y <= r2.y + r2.h
    const r2xInR1 = r2.x >= r1.x && r2.x <= r1.x + r1.w
    const r2yInR1 = r2.y >= r1.y && r2.y <= r1.y + r1.h
    
    return (r1xInR2 || r2xInR1) && (r1yInR2 || r2yInR1)
}
