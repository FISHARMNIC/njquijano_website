// TODO: on drag make that window last in arr so it draws it last on top

// FIX: make an app name is broken and inner 
/*
How to fix issue, take "ss" of portion and paste it


*/

const COLOR_BG = "#F9E8BA"
const COLOR_BORDER = "#341E1C"
const IMG_SIZE = 65

const FONT_SIZE_DEF = 20
var currentFontSize = FONT_SIZE_DEF

function renderImage(image, x, y, w, h) {
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, x, y, w, h);
    };
    img.src = image;
}

function putText(t, x, y, rules = { a: "center", f: "15px DOS", c: "black" }) {
    ctx.font = rules.f
    ctx.textAlign = rules.a
    ctx.fillStyle = rules.c

    ctx.fillText(t, x, y)
}

function rectWithBorder(x, y, w, h) {
    const BWIDTH = 2

    // awful but whatever
    ctx.fillStyle = COLOR_BORDER
    for (var i = 1; i < 5; i++) {
        ctx.fillStyle = i % 2 == 0 ? COLOR_BG : COLOR_BORDER
        ctx.fillRect(x + i * BWIDTH, y + BWIDTH * i, w - BWIDTH * i * 2, h - BWIDTH * i * 2)
    }
}

function renderWindow(window) {
    rectWithBorder(window.x, window.y, window.w, window.h)
    putText(window.title, window.x + 14, window.y + 26, { a: "left", f: "20px DOS", c: "black" })
    putText("X", window.x + window.w - 20, window.y + 26, { a: "left", f: "20px DOS", c: "black" })

    ctx.strokeStyle = COLOR_BORDER
    ctx.lineWidth = 2
    ctx.beginPath(); // Start a new path
    ctx.moveTo(window.x + 6, window.y + 32); // Move the pen to (30, 50)
    ctx.lineTo(window.x + window.w - 6, window.y + 32); // Draw a line to (150, 100)
    ctx.stroke(); // Render the path

    var text = document.getElementById(`_APP_${window.id}_`)

    text.style.left = window.x + window.ox + "px"
    text.style.top = window.y + window.oy - (currentFontSize - 15) + "px"
    text.style.fontSize = (currentFontSize) + "px"

    if (activeWindows[activeWindows.length - 1] == window) {
        text.hidden = false

        if (!useRandomSpawn) {
            pre = text.children[0]
            pre.style.width = (ICON_WIDTH - 25) + "px"
            pre.style.height =  ICON_HEIGHT + "px"
        }
        
    } else {
        text.hidden = true
        //console.log(window)

        //if(window.oldImgData != undefined)
        //ctx.putImageData(window.oldImgData, 50, 70);

        putText("FOCUS TO VIEW TEXT", window.x + 90, window.y + 50)
    }
}

function renderWindows() {
    activeWindows.forEach(window => {
        renderWindow(window)
    })
}

function renderIcons() {
    const START_X = 30;
    const START_Y = 30;

    allIcons.forEach((icon, i) => {
        if (icon.img.complete) {
            ctx.drawImage(icon.img, icon.x, icon.y, IMG_SIZE, IMG_SIZE);
        } else {
            icon.img.onload = function () {
                ctx.drawImage(icon.img, icon.x, icon.y, IMG_SIZE, IMG_SIZE);
            };
        }
        putText(icon.title, icon.x + (IMG_SIZE / 2), icon.y + 85);
    })
}

function renderTime() {
    var date = new Date()
    document.getElementById("time").innerHTML = date.toLocaleTimeString()
}

function renderAll() {
    ctx.fillStyle = COLOR_BG
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    renderIcons()
    renderWindows()
}

function setText(window, offX, offY, text) {
    var area = document.getElementById(`_APP_${window.id}_`)
    area.innerHTML = text
    area.style.left = window.x + offX + "px"
    area.style.top = window.y + offY + "px"
}

function cfont(s) {

    if ((s < 0 && currentFontSize > 14) || (s > 0 && currentFontSize < 25)) {
        currentFontSize += parseInt(s)
        renderAll()
    }
}