function newWindow(title, x,y,w,h, text, owner, ox, oy)
{
    var id = windowIdCounter++
    activeWindows.push({title, x,y,w,h,owner, id, ox, oy})

    var l = x + ox +"px"
    var t = y + oy + "px"
    document.getElementById("areaForText").innerHTML += `<div style="left:${l}; top:${t}; position: fixed; z-index: 50; font-family: DOS;width:460px" hidden="false" id="_APP_${id}_">${text}</div>`

}

function newIcon(title, image, x, y, owner, size, text, ox, oy)
{
    var image = "../assets/" + image + ".png"

    var img = new Image()
    img.src = image

    allIcons.push({img, title, x, y, size, owner, text, ox, oy})
}

var userIconsCount = 0;

function newApp(title,image, text, ox, oy, owner, user = false)
{
    const START_X = 30;
    const START_Y = 30;

    if(user)
    {
        newIcon(title, image, START_X + (110 * Math.floor(userIconsCount/6 + 2)), START_Y + (userIconsCount % 6) * 110, owner, IMG_SIZE, text, ox, oy)
        userIconsCount++
    }
    else
    {
        newIcon(title, image, START_X + (110 * Math.floor(allIcons.length/6)), START_Y + (allIcons.length % 6) * 110, owner, IMG_SIZE, text, ox, oy)
    }
}