var activeWindows = []
var allIcons = []
var windowBeingDragged = {
    sx: 0,
    sy: 0,
    ptr: null
}

var downPos = {
    x: 0,
    y: 0
}

var windowIdCounter = 0

function findWindowByRef(window) {
    for (var i = 0; i < activeWindows.length; i++) {
        if (activeWindows[i] == window) {
            return i
        }
    }
    return -1
}

function handleEvents(window, event) {
    var locX = event.clientX - window.x
    var locY = event.clientY - window.y
    //console.log("::", event.type)
    if (event.type == "mouseup") {
        // select
        if (event.clientX == downPos.x && event.clientY == downPos.y) {
            if (windowBeingDragged.ptr != null) {
                var selected = activeWindows.splice(findWindowByRef(window), 1)
                activeWindows.push(selected[0])
                renderAll()
            }
        }
        windowBeingDragged.ptr = null
    }

    else if (event.type == "mousedown") {
        var selected = activeWindows.splice(findWindowByRef(window), 1)
        activeWindows.push(selected[0])

        downPos.x = event.clientX
        downPos.y = event.clientY

        if (locY < 35) {
            if (locX > (window.w - 20)) {
                // close
                activeWindows.splice(findWindowByRef(window), 1)
                document.getElementById(`_APP_${window.id}_`).hidden = true
                renderAll()
            } else {
                // select
                windowBeingDragged.ptr = window
                windowBeingDragged.sx = locX
                windowBeingDragged.sy = locY
            }
        }
    }
}

function scanWindows(e) {
    //console.log(e.target.tagName)
    var noHit = true
    for(var i = activeWindows.length - 1; i >= 0; i--)
    {
        var window = activeWindows[i]
        if (e.clientX > window.x && e.clientY > window.y && e.clientX < (window.x + window.w) && e.clientY < (window.y + window.h)) {
            window.owner(window, e)
            renderAll()
            noHit = false
            break
        }
    }

    if (e.type == "mouseup") {
        windowBeingDragged.ptr = null
    }
    else if (e.type == "mousemove") {
        if (windowBeingDragged.ptr != null) {
            windowBeingDragged.ptr.x = e.clientX - windowBeingDragged.sx
            windowBeingDragged.ptr.y = e.clientY - windowBeingDragged.sy

            renderAll()
        }
    }

    return noHit
}

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randMax(max) {
    return Math.floor(Math.random() * max);
}

function scanWindowsAndIcons(e) {

    var noHit = scanWindows(e)
    if (noHit)
        allIcons.every(icon => {
            if (e.clientX > icon.x && e.clientY > icon.y && e.clientX < (icon.x + icon.size) && e.clientY < (icon.y + icon.size)) {
                //console.log("launch")
                newWindow(icon.title, randMax(200), randMax(200), 600, 400, icon.text, icon.owner, icon.ox, icon.oy)
                renderAll()
                return false
            }
            return true
        })

}

window.addEventListener("mousemove", scanWindows)
canvas.addEventListener("mousedown", scanWindows)
canvas.addEventListener("mouseup", scanWindows)
canvas.addEventListener("click", scanWindowsAndIcons)
//document.addEventListener("wheel", scanWindows)
