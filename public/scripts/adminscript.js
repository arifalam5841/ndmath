console.log("this is admin page");

let alloptionscont = document.getElementById("all-options");
let slidebtn = document.getElementById("slide-btn");

let slideoptioncont = document.getElementById("slideoption");
let addslide = document.getElementById("addslide");
let removeslide = document.getElementById("removeslide");

let addingslidescont = document.getElementById("addslide-cont");
let removingslidescont = document.getElementById("removingslidecont");

function blocknone(btn, nonebox, blockbox) {
  btn.addEventListener("click", () => {
    nonebox.style.display = "none";
    blockbox.style.display = "block";
  });
}

blocknone(alloptionscont, alloptionscont, slideoptioncont);
blocknone(addslide, slideoptioncont, addingslidescont);
blocknone(removeslide, slideoptioncont, removingslidescont);