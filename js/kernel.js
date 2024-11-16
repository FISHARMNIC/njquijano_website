var homeScreen = {
    bottomBar: 50
}

var texts = {
    about:
        `<pre>Hello, my name is Nicolás Quijano.

* 18-year-old prospective ECE student at 
  University of Colorado at Boulder
* Passion for programming and electronics
    * C, Assembly, Javascript
    * Arduino
    * Logic circuits and CPU design
* Avid climber and skier!

Check out some of the other apps. I built this 
website from scratch in Javascript.

                                             
                                             
                                             
                   -=---  -                  
               -**#%#%%##**+===              
            -=+#%#%%%%%%#%#%%*+              
          -*%%%%%%%%%%%%%%%%%#*=             
          *#%%%%%%%%%%%%%%%%%##*+            
         =#%%%%%%%%%%%%%%%%%%###+=           
        -=#%%@@@%%@@%%%%%%%%%%%##-=          
         *%%%%%%%%%%%%####%%%%%%*+-          
         @%%@@%#***####**#####*##==          
        **%%%@******##***####*+*=            
        %@@%%@*++******+++***+=#             
         %@@@*%+++******+++**+=+             
            %#@+++*#***********              
             *+++++**%++**%**++              
            =@#+++++******+++*               
          *+++#+++**+++++++=                 
      +-=#*+#++*+*******##-*                 
  --==+*#+%#*=+##*****##*++@#-==             
=+#=**#+*#++###++#********#%%#=+*++++-       
+=+*#*++=%*++#+==+#********#%###=%*=*++-     
*++**#*+**#==###+-+*****++***%#%%*%##+#*-    
+++=*+*++*#*++%*#++++++++++*%#%=+**#**#+*-   
</pre>`,
    links:
        `<pre>Here are the some of my pages

* <a href="https://github.com/FISHARMNIC">Github</a>
* <a href="https://www.linkedin.com/in/nicolás-quijano-124657272/">Linkedin</a>

Credit:
* MacOS icons: <a href="https://www.figma.com/community/file/1258417138275801052">Agustin Cairone</a>

</pre>`,
    projects:
        `<pre>Here are some things that I have made / am making
* <a href="https://github.com/FISHARMNIC/HAMprimeC2">HAM' 32-bit Compiled Programming Language</a>
    * Like a mix of C++, Java, and Python/JS
    * Automatic garbage collection system
    * Lightning fast
* <a href="https://github.com/FISHARMNIC/CPU">RollCall Garbage Collector</a>
    * Easy-to-implement garbage collector
    * Designed to be built into new programming languages or on top of existing ones
    * Currently being used in HAM'
* <a href="https://github.com/FISHARMNIC/CPU">Nico8 CPU</a>
    * Interrupts
    * 16-bit register pairs for math operations
    * IO ports
    * Mulitple memory references per instruction
    * Segmented memory
</pre>`,
    contact:
        `<pre>
* Email: nicolas.quijano773@gmail.com
* Phone: 408-614-4495
</pre>`,
    makeApp:
        `<pre>Make your own app! (doesn't get saved when reloading)

App name: <input id="ma_name" spellcheck="false">
App icon: <select id="ma_icon">
    <option value="icon_droor">droor</option>
    <option value="icon_links">links</option>
    <option value="icon_mail">mail</option>
    <option value="icon_news">news</option>
    <option value="icon_save">save</option>
    <option value="icon_vector">vector</option>
    <option value="icon_dog">dog</option>
    <option value="icon_heli">helicopter</option>
</select>

HTML content: 
<textarea id="ma_inner" style="min-height:50px"><pre>
Stuff here
</pre></textarea>

<button class="intbttn" onclick="customApp()"> Create </button>
</pre>`,
    dino:
        `<pre style="overflow: hidden">
<iframe src="https://chromedino.com/" frameborder="0" scrolling="no" width="${ICON_WIDTH - 20}px" height="${ICON_HEIGHT}px" loading="lazy"></iframe>
</pre>`,
    browser:
        `<pre style="overflow: hidden"><iframe width="${ICON_WIDTH - 20}px" height="${ICON_HEIGHT}px" src="https://www.google.com/search?igu=1"></iframe></pre>`,
    terminal:
        `<pre style="overflow: hidden">
<textarea id="jsterminal" onkeyup="term.getInput()" onkeydown="term.setCursor()" style="resize:none;width:600px;height:350px;font-size:20px">=================== JS TERMINAL ===================
Things to try:
* console.log("hi")
* alert("hello")
* Any JS code (one-liner)
===================================================
:> </textarea>
</pre>`
}

function customApp() {
    var ma_name = document.getElementById("ma_name").value
    var ma_icon = document.getElementById("ma_icon").value
    var ma_inner = document.getElementById("ma_inner").value

    newApp(ma_name, ma_icon, ma_inner, 10, 20, handleEvents, true)
    renderIcons()
}

// function clone taken from https://stackoverflow.com/questions/1833588/javascript-clone-a-function
Function.prototype.clone = function () {
    const cloneTarget = Symbol.for("cloneTarget");
    const targetFn = this[cloneTarget] ?? this;

    function clone() {
        return targetFn.apply(this, arguments);
    };

    for (const key in targetFn) {
        clone[key] = this[key];
    }

    clone[cloneTarget] = targetFn;

    return clone;
};

var term =
{
    buffer: "",
    ilen: 0,
    getID: function () {
        var got = document.getElementById("jsterminal")
        this.ilen = got.value.length
        //console.log(got.value.length, this.ilen)
        return got
    },
    setCursor: function () {
        var inner = this.getID()
        inner.setSelectionRange(this.ilen, this.ilen)
    },
    getInput: function () {
        var inner = this.getID()

        var key = window.event.key

        if (key == "Enter") {
            var output;

            var actual_console_log = console.log.clone()

            if (this.buffer.trim().length == 0) {
                output = "Type any valid JS code"
            }
            else {
                var evString = (`
            console.log = function() {
                document.getElementById("jsterminal").value += [...arguments].join(" ") + "\\n"
             }
            ` + this.buffer)

                try {
                    output = eval(evString)
                }
                catch (error) {
                    output = error
                }

                console.log = actual_console_log

                //console.log(evString)
            }

            inner.value += "--> " + output + "\n:> "
            this.buffer = ""
        }
        else if (key == "Backspace") {
            if (this.buffer.length > 0) {
                this.buffer = this.buffer.substring(0, this.buffer.length - 1)
                inner.value = inner.value.substring(0, this.ilen)
            }
            else {
                inner.value += " "
            }
        }
        else if (key.length == 1) {
            this.buffer += key
        }

        this.setCursor()
    }

}

function kernel() {
    ctx.imageSmoothingEnabled = false

    // this all needs to be in a render function that clears when requested

    newApp("ABOUT", "icon_save", texts.about, 10, 20, handleEvents)
    newApp("MY LINKS", "icon_bull", texts.links, 10, 20, handleEvents)
    newApp("PROJECTS", "icon_droor", texts.projects, 10, 20, handleEvents)
    newApp("CONTACT", "icon_mail", texts.contact, 10, 20, handleEvents)

    newApp("CHROME DINO", "icon_dog", texts.dino, 10, 20, handleEvents, true)
    newApp("BROWSER", "icon_links", texts.browser, 10, 20, handleEvents, true)
    newApp("JS TERMINAL", "icon_terminal", texts.terminal, 10, 20, handleEvents, true)
    newApp("MAKE AN APP", "icon_vector", texts.makeApp, 10, 20, handleEvents, true)

    setInterval(renderTime, 1000)

    if (!useRandomSpawn) {
        alert("hi")
        setTimeout(() => {
            newWindow("MOBILE NOTICE", 0, 0, ICON_WIDTH, ICON_HEIGHT, `<pre style="white-space: pre-wrap;width:80%;padding-left:5%;">
\n\nPlease note that this website was not designed for mobile 

Some apps might not show up correctly depending on your system 

Click X Above to close this message
                </pre>`, handleEvents, 0, 0)
            renderAll()
        }, 300);
    }

    renderAll()

    //renderWindows()
}