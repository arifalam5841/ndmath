console.log("this is admin page");

let alloptionscont = document.getElementById("all-options");
let slidebtn = document.getElementById("slide-btn");

let slideoptioncont = document.getElementById("slideoption");
let addslide = document.getElementById("addslide");
let removeslide = document.getElementById("removeslide");
let slidebtnupdate = document.getElementById("slidupdate-btn");

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

function updatefile() {}

slidebtnupdate.addEventListener("click", function () {
  axios
    .get("http://localhost:3000/update-repo")
    .then((response) => {
      alert(response.data); // Show success message
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to update repository");
    });
});

// updatefile();
