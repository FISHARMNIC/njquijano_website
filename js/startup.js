var canvas = document.getElementById("website")
var ctx = canvas.getContext("2d")

const canvasCenterX = window.innerWidth / 2
const canvasCenterY = window.innerHeight / 2

var startup = {
    interval: null,
    strings: ["n i c o l a s  q u i j a n o"], //["n i c o l a s  q u i j a n o", "..."],
    times: [30],//[50, 200],               // controlling display times of above strings
    textReference: document.getElementById("startup_text"),
    beginScroll: function (cb) {
        startup.interval = setInterval(startup.addChar, startup.times[0], cb)
    },
    addChar: function (callback, stringNo = 0, offset = 0) {
        // text renderer that builds text
        // nice and quick, yet overcomplicated XD
        var ctext = startup.textReference.innerText
        var currentString = startup.strings[stringNo]
        if (currentString[ctext.length - offset] == " ") {
            startup.textReference.innerHTML += "&nbsp;"
        } else {
            startup.textReference.innerHTML += startup.strings[stringNo][ctext.length - offset]
        }

        if (ctext.length + 1 - offset == startup.strings[stringNo].length) {
            startup.interval = clearInterval(startup.interval)
            if (stringNo == startup.strings.length - 1) {
                callback()
            } else {
                startup.textReference.innerHTML += "<br>"
                startup.interval = setInterval(startup.addChar, startup.times[stringNo + 1], callback, stringNo + 1, startup.strings[stringNo].length + 1)
            }
        }
    },
    begin: function () {
        var DOSfont = new FontFace('DOS', 'url(../assets/MorePerfectDOSVGA.ttf)');
        DOSfont.load().then((f) => {
            document.fonts.add(f);
            startup.beginScroll(startup.transitionToCanvas)
        });
    },
    transitionToCanvas: function () {
        startup.textReference.style.animation = "fade-out 1s linear forwards"
        setTimeout(() => {
            startup.textReference.hidden = true

            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            var scale = window.innerWidth / window.innerHeight
            canvas.hidden = false

            ctx.fillStyle = COLOR_BG

            //ENABLE IN TESTINGs
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
            postBoot()

            //DISABLE IN TESTING
            // var i = 0;
            // var interval = setInterval(() => {
            //     ctx.fillRect(canvasCenterX - (i/2), canvasCenterY - ((i / scale)/2), i, i / scale)
            //     i += 10
            //     if(i > window.innerWidth - 5)
            //     {
            //         clearInterval(interval)
            //         postBoot()
            //     }
            // }, 10) 


        }, 1000) // SET TO 1000 AFTER TESTING

    }
}

//startup.transitionToCanvas()
startup.begin()


// document.getElementById("startup_text").innerText = startup_string