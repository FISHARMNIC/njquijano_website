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
var lastClick = null

function findWindowByRef(window) {
    for (var i = 0; i < activeWindows.length; i++) {
        if (activeWindows[i] == window) {
            return i
        }
    }
    return -1
}

function handleEvents(window, event) {
    //console.log(event.type)
    var locX = event.clientX - window.x
    var locY = event.clientY - window.y

    //console.log("::", event.type)
    if (event.type == "mouseup" || event.type == "touchend") {
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

    else if (event.type == "mousedown" || event.type == "touchstart") {
        //console.log("OLD", lastClick)
        // if(lastClick != null)
        // {
        //     lastClick.oldImgData = ctx.getImageData(lastClick.x,lastClick.y, lastClick.w, lastClick.h)
        // }

        //lastClick = window

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
    var noHit = true
    for(var i = activeWindows.length - 1; i >= 0; i--)
    {
        var window = activeWindows[i]
        if (e.clientX > window.x && e.clientY > window.y && e.clientX < (window.x + window.w) && e.clientY < (window.y + window.h)) {
            //console.log(e.type)
            window.owner(window, e)
            renderAll()
            noHit = false
            break
        }
    }

    if (e.type == "mouseup" || e.type == "touchend") {
        windowBeingDragged.ptr = null
    }
    else if (e.type == "mousemove" || e.type == "touchmove") {
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
    //console.log(e)

    var noHit = scanWindows(e)
    if (noHit)
        allIcons.every(icon => {
            if (e.clientX > icon.x && e.clientY > icon.y && e.clientX < (icon.x + icon.size) && e.clientY < (icon.y + icon.size)) {
                //console.log("launch")

                var xpos = useRandomSpawn ? randMax(window.innerWidth / 2.5) + 120 : 0
                var ypos = useRandomSpawn ? randMax(window.innerHeight/4) + 20     : 0

                newWindow(icon.title, xpos, ypos, ICON_WIDTH, ICON_HEIGHT, icon.text, icon.owner, icon.ox, icon.oy)
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

window.addEventListener('touchmove', scanWindows);
canvas.addEventListener('touchend', scanWindows);
canvas.addEventListener('touchstart', scanWindows);


//document.addEventListener("wheel", scanWindows)
