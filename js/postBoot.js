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
    dino: `<pre style="overflow: hidden">
<iframe src="https://chromedino.com/" frameborder="0" scrolling="no" width="580px" height="400px" loading="lazy"></iframe>
</pre>`
}

function customApp()
{
    var ma_name = document.getElementById("ma_name").value
    var ma_icon = document.getElementById("ma_icon").value
    var ma_inner = document.getElementById("ma_inner").value

    newApp(ma_name, ma_icon, ma_inner, 10, 20, handleEvents)
    renderIcons()
}

function postBoot() {
    ctx.imageSmoothingEnabled = false

    // this all needs to be in a render function that clears when requested

    newApp("ABOUT", "icon_save", texts.about, 10, 20, handleEvents)
    newApp("LINKS", "icon_links", texts.links, 10, 20, handleEvents)
    newApp("PROJECTS", "icon_droor", texts.projects, 10, 20, handleEvents)
    newApp("CONTACT", "icon_mail", texts.contact, 10, 20, handleEvents)
    newApp("CUSTOM APP!", "icon_vector", texts.makeApp, 10, 20, handleEvents)
    newApp("DINO", "icon_dog", texts.dino, 10, 20, handleEvents)
    

    setInterval(renderTime, 1000)
    renderAll()
}