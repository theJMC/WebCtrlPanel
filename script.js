/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

import "./toastr.js";

// prints "hi" in the browser's dev tools console
console.log("Testing");

document.getElementById('SetupOn').addEventListener("click", function(){toastr.info("My name is Inigo Montoya. You killed my father. Prepare to die!")})


