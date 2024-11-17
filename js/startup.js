var canvas = document.getElementById("website")
var ctx = canvas.getContext("2d")

const canvasCenterX = window.innerWidth / 2
const canvasCenterY = window.innerHeight / 2

// function mobileCheck from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function onMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

window.ICON_WIDTH = 600
window.ICON_HEIGHT = 400
window.useRandomSpawn = true

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
        } 
        else if(currentString[ctext.length - offset] == "\n") {
            startup.textReference.innerHTML += "<br>"
        }
        else {
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

        if(onMobile())
        {
            ICON_WIDTH = window.screen.width
            ICON_HEIGHT = window.screen.height

            document.getElementById("sizeModifiers").hidden = true
            useRandomSpawn = false 
            this.strings = ["n i c o l a s\nq u i j a n o"]
        }

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight


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

            var scale = window.innerWidth / window.innerHeight
            canvas.hidden = false

            ctx.fillStyle = COLOR_BG

            //ENABLE IN TESTINGs
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
            kernel()

            //DISABLE IN TESTING
            // var i = 0;
            // var interval = setInterval(() => {
            //     ctx.fillRect(canvasCenterX - (i/2), canvasCenterY - ((i / scale)/2), i, i / scale)
            //     i += 10
            //     if(i > window.innerWidth - 5)
            //     {
            //         clearInterval(interval)
            //         kernel()
            //     }
            // }, 10) 


        }, 1000) // SET TO 1000 AFTER TESTING

    }
}

//startup.transitionToCanvas()
window.onload = startup.begin


// document.getElementById("startup_text").innerText = startup_string