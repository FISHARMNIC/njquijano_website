var homeScreen = {
    bottomBar: 50
}

var texts = {
    about: 
`<pre>Hello, my name is Nicolás Quijano.

* 17-year-old prospective ECE student at 
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

</pre>`,
    projects:
`<pre>Here are some things that I have made / am making
* <a href="https://github.com/FISHARMNIC/HAMprimeC2">32-bit Compiled Programming Language</a>
    * Like a mix of C, Java, and, Python/JS
    * Automatic garbage collection system
    * Lightning fast
* <a href="https://github.com/FISHARMNIC/CPU">Work in Progress CPU</a>
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
</pre>`
} 

function postBoot() {
    ctx.imageSmoothingEnabled = false

    // this all needs to be in a render function that clears when requested

    newApp("ABOUT", "icon_save", texts.about, 10, 20, handleEvents)
    newApp("LINKS", "icon_links", texts.links, 10, 20, handleEvents)
    newApp("PROJECTS", "icon_droor", texts.projects, 10, 20, handleEvents)
    newApp("CONTACT", "icon_mail", texts.contact, 10, 20, handleEvents)

    setInterval(renderTime, 1000)
    renderAll()
}