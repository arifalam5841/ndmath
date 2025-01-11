// const { default: axios } = require("axios");
// const { response } = require("express");

let banner_container = document.getElementById("slides_container");

// box.addEventListener("click", () => {
//   window.location.href = item.file;
// });

// ctrl + k = line edit
// ctrl + l = chat
var counter = 0;

function scroll_forward() {
  banner_container.scrollBy(80, 0);
  counter++;
  // console.log(counter)

  if (counter > 3) {
    banner_container.scrollBy(-2000, 0);
    counter = 0;
  }
}

setInterval(scroll_forward, 2000);

// const slidesData = [
//   {
//     imgSrc: "image1.jpg",
//     title: "PYQs ofafd diploma",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas quasi vitae fugiat ab ipsa animi rerum similique voluptate.q",
//     type: "POL",
//     branch: "AO",
//     year: "second year",
//     link: "adsad.pdf",
//   },
//   {
//     imgSrc: "image2.jpg",
//     title: "PYQs of ddddiploma - Semester 2",
//     description: "Another description for a different slide content.",
//     type: "ENG",
//     branch: "AS",
//     year: "first year",
//     link: "ddsd.pdf",
//   },
//   {
//     imgSrc: "image2.jpg",
//     title: "PYQs of diploma - Semester 2",
//     description: "Another description for a different slide content.",
//     type: "ENG",
//     branch: "AS",
//     year: "first year",
//     link: "ddsd.pdf",
//   },
//   {
//     imgSrc: "image2.jpg",
//     title: "PYQs of diploma - Semester 2",
//     description: "Another description for a different slide content.",
//     type: "ENG",
//     branch: "AS",
//     year: "first ddyear",
//     link: "ddsd.pdf",
//   },
//   {
//     imgSrc: "image2.jpg",
//     title: "PYQs of diploma - Semester 2",
//     description: "Another description for a different slide content.",
//     type: "ENG",
//     branch: "AS",
//     year: "first ddyear",
//     link: "ddsd.pdf",
//   },
//   {
//     imgSrc: "image2.jpg",
//     title: "PYQs of diploma - Semester 2",
//     description: "Another description for a different slide content.",
//     type: "ENG",
//     branch: "AS",
//     year: "first ddyear",
//     link: "ddsd.pdf",
//   },
// ];

let adminstatus = document.getElementById("adminstatus");

const slide_container = document.getElementById("slides_container");

slide_container.innerHTML = "";

axios
  .post("https://ndmath-5vtg.vercel.app/banner-append")
  .then((response) => {
    // Loop through each object in the array and create a slide
    const slides = response.data.bannerarray;
    console.log(slides);
    slides.forEach((data) => {
      // Create the outer "slide" div

      const slideDiv = document.createElement("div");
      slideDiv.classList.add("slide");

      // ELEMENT CODE -----------------
      const slidecode = document.createElement("p");
      slidecode.textContent = data.elementcode;
      if (adminstatus.textContent == "admin") {
        slidecode.style.display = "block";
        adminstatus.style.display = "block";
      } else {
        slidecode.style.display = "none";
        adminstatus.style.display = "none";
      }
      //END OF ELEMENT CODE -----------------

      // Create and set up the image element
      const imgElement = document.createElement("img");
      imgElement.src = `/slideimg/${data.imgSrc}`;
      imgElement.alt = data.title;
      slideDiv.append(slidecode, imgElement);

      // Create the slide info div
      const slideInfoDiv = document.createElement("div");
      slideInfoDiv.id = "slideinfo";

      // Create and add the title
      const titleElement = document.createElement("h1");
      titleElement.textContent = data.title;
      slideInfoDiv.appendChild(titleElement);

      // Create and add the description
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = data.description;
      slideInfoDiv.appendChild(descriptionElement);

      // Create the details div
      const detailsDiv = document.createElement("div");

      // Add age, hd, and category spans
      const ageSpan = document.createElement("span");
      ageSpan.id = "age";
      ageSpan.textContent = data.type;
      detailsDiv.appendChild(ageSpan);

      const hdSpan = document.createElement("span");
      hdSpan.id = "hd";
      hdSpan.textContent = data.branch;
      detailsDiv.appendChild(hdSpan);

      const categorySpan = document.createElement("span");
      categorySpan.id = "catog";
      categorySpan.textContent = data.category;
      detailsDiv.appendChild(categorySpan);

      slideInfoDiv.appendChild(detailsDiv);

      // Create and add the view link
      const viewLink = document.createElement("a");
      viewLink.href = `/slidepdf/${data.link}`;
      // viewLink.id = "viewbtn";
      viewLink.textContent = "View";
      slideInfoDiv.appendChild(viewLink);

      // Append the slide info div to the slide div
      slideDiv.appendChild(slideInfoDiv);

      // Append the slide div to the container
      slide_container.appendChild(slideDiv);
    });
  })
  .catch((err) => {
    console.log(err);
  });

let data_store = document.getElementById("data-store");

// window.onload = function () {
//   // const username = localStorage.getItem("username");
//   // if (username) {
//   data_store.innerHTML = `Welcome back, ${username}!`;
//   // }
// };

// MAIN CONTAINER
let main_container = document.getElementById("main-container");
let change_branch_btn = document.getElementById("change-branch");

// LOGIN PAGE ELEMENTS --------

let whole_login_page = document.getElementById("loginpage");
let login_back_btn = document.getElementById("login-back-btn");
let year_select_container = document.getElementById("deg-dip");
let branch_select_container = document.getElementById("branch-choose");
let branch_container = document.getElementById("choose-branch-cont");
let branch_page = document.getElementById("branch-choose");

change_branch_btn.addEventListener("click", () => {
  main_container.style.display = "none";
  whole_login_page.style.display = "block";
  year_select_container.style.display = "flex";
  login_back_btn.style.display = "none";
  // branch_container.style.display = "nonef";
});
// SUBJECT PAGE ELEMENTS
let main_menu_btn = document.getElementById("nav-menu-button");
let main_menu = document.getElementById("secondary-menu");
let subject_box_cont = document.getElementById("subs-cont");
let subject_page = document.getElementById("subjects-page");
let syllabus_container = document.getElementById("slb-btn-cont");
let subject_detail_page = document.getElementById("subject-detail-page");
let practice_container = document.getElementById("prac-ques-cont");
let notes_container = document.getElementById("notes-cont");

//  QUESTIONS BOX ELEMENTS -----------------

let question_soln_box = document.getElementById("question-solution-box");
let question_a_tag = document.getElementById("question-button");
let soln_a_tag = document.getElementById("soluntion-button");
let que_soln_blankspace = document.getElementById("questionbox-blankspace");
let menu_blankspace = document.getElementById("menu-blankspace");
let ques_soln_cut_btn = document.getElementById("ques_soln_cut_btn");

// ALL PAGES  -----------------------------

let classwork_page = document.getElementById("classwork-page");
let notice_page = document.getElementById("notice-page");
let event_page = document.getElementById("events-page");
let gallery_page = document.getElementById("gallery-page");
let manual_page = document.getElementById("manual-page");
let video_page = document.getElementById("video-page");
let form_page = document.getElementById("form-page");
let timetable_page = document.getElementById("timetable-page");
let test_page = document.getElementById("test-page");
let book_page = document.getElementById("book-page");
// let aout_page = document.getElementById("");
// let contact_page = document.getElementById("");

// CONTAINERS -----

let tests_container = document.getElementById("test-question-section");
let unsolvemanualcont = document.getElementById("unsolved-manual-section");
let solvemanualcont = document.getElementById("solved-manual-section");
let books_container = document.getElementById("book-container");
let classwork_container = document.getElementById("classwork-cont");
let videos_cont = document.getElementById("videos-container");
let diploma_gallery_cont = document.getElementById("diploma-gallery");
let degree_gallery_cont = document.getElementById("degree-gallery");
let degree_timetable = document.getElementById("degree-timetable");
let diploma_timetable = document.getElementById("diploma-timetable");
let degree_form_cont = document.getElementById("degree-form");
let diploma_form_cont = document.getElementById("diploma-form");
let degree_event_cont = document.getElementById("degree-event-section");
let diploma_event_cont = document.getElementById("diploma-event-section");
let notice_diploma_cont = document.getElementById("diploma-notice-section");
let notice_degree_cont = document.getElementById("degree-notice-section");

// INPUT AND SEARCH FIELD AND BUTTONS

let classwork_input = document.getElementById("class-search");
let classwork_search_btn = document.getElementById("class-seach-btn");
let video_input = document.getElementById("video-search-input");
let video_search_btn = document.getElementById("video-search-btn");
let pages_array = [
  subject_page,
  classwork_page,
  notice_page,
  subject_detail_page,
  event_page,
  gallery_page,
  manual_page,
  video_page,
  form_page,
  timetable_page,
  book_page,
  test_page,
];

// ALL BUTTONS --------------------------

let subject_page_btn = document.getElementById("subject-btn");
let classwork_page_btn = document.getElementById("classwork-btn");
let notice_page_btn = document.getElementById("notice-btn");
let event_page_btn = document.getElementById("events-btn");
let gallery_page_btn = document.getElementById("gallery-btn");
let manual_page_btn = document.getElementById("manual-btn");
let video_page_btn = document.getElementById("video-btn");
let form_page_btn = document.getElementById("form-btn");
// H BTN
let h_classwork_btn = document.getElementById("h_classwork_btn");
let h_timetable_btn = document.getElementById("h_timetable_btn");
let h_test_btn = document.getElementById("h_test_btn");
let h_book_btn = document.getElementById("h_book_btn");
let h_manual_btn = document.getElementById("h_manual_btn");
let h_gallery_btn = document.getElementById("h_gallery_btn");
let about_btn = document.getElementById("about-btn");
let contact_btn = document.getElementById("contact-btn");

// ALL BTNS ARRAY
let hor_btn = [
  subject_page_btn,
  classwork_page_btn,
  notice_page_btn,
  event_page_btn,
  gallery_page_btn,
  manual_page_btn,
  video_page_btn,
  form_page_btn,
];

// MENU CODE ----

main_menu_btn.addEventListener("click", () => {
  if (main_menu.style.right == "0px") {
    main_menu.style.right = "-290px";
  } else {
    main_menu.style.right = "0px";
    menu_blankspace.style.display = "block";
  }
});

menu_blankspace.addEventListener("click", () => {
  main_menu.style.right = "-290px";
  menu_blankspace.style.display = "none";
});
// END OF MENU CODE ---

// ALL BUTTON FUNCTIONS--------------

h_classwork_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    classwork_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    classwork_page_btn.style.color = "#2064b1";
    classwork_page_btn.style.borderBottom = "2px solid #2064b1";
  }

  if (menu_blankspace.style.display == "block") {
    main_menu.style.right = "-290px";
    menu_blankspace.style.display = "none";
  }
});

h_manual_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    manual_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    manual_page_btn.style.color = "#2064b1";
    manual_page_btn.style.borderBottom = "2px solid #2064b1";
  }

  if (menu_blankspace.style.display == "block") {
    main_menu.style.right = "-290px";
    menu_blankspace.style.display = "none";
  }
});

h_gallery_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    gallery_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    gallery_page_btn.style.color = "#2064b1";
    gallery_page_btn.style.borderBottom = "2px solid #2064b1";
  }

  if (menu_blankspace.style.display == "block") {
    main_menu.style.right = "-290px";
    menu_blankspace.style.display = "none";
  }
});

h_test_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    test_page.style.display = "block";
  }

  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";
  }

  if (menu_blankspace.style.display == "block") {
    main_menu.style.right = "-290px";
    menu_blankspace.style.display = "none";
  }
});

h_book_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    book_page.style.display = "block";
  }

  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";
  }

  if (menu_blankspace.style.display == "block") {
    main_menu.style.right = "-290px";
    menu_blankspace.style.display = "none";
  }
});

h_timetable_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    timetable_page.style.display = "block";
  }

  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";
  }

  if (menu_blankspace.style.display == "block") {
    main_menu.style.right = "-290px";
    menu_blankspace.style.display = "none";
  }
});

subject_page_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    subject_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    subject_page_btn.style.color = "#2064b1";
    subject_page_btn.style.borderBottom = "2px solid #2064b1";
  }
});

classwork_page_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    classwork_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    classwork_page_btn.style.color = "#2064b1";
    classwork_page_btn.style.borderBottom = "2px solid #2064b1";
  }
});

notice_page_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    notice_page.style.display = "block";
  }

  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    notice_page_btn.style.color = "#2064b1";
    notice_page_btn.style.borderBottom = "2px solid #2064b1";
  }
});

event_page_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    event_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    event_page_btn.style.color = "#2064b1";
    event_page_btn.style.borderBottom = "2px solid #2064b1";
  }
});
gallery_page_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    gallery_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    gallery_page_btn.style.color = "#2064b1";
    gallery_page_btn.style.borderBottom = "2px solid #2064b1";
  }
});
manual_page_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    manual_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    manual_page_btn.style.color = "#2064b1";
    manual_page_btn.style.borderBottom = "2px solid #2064b1";
  }
});
video_page_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    video_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    video_page_btn.style.color = "#2064b1";
    video_page_btn.style.borderBottom = "2px solid #2064b1";
  }
});
form_page_btn.addEventListener("click", (e) => {
  e.preventDefault();

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
    form_page.style.display = "block";
  }
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    form_page_btn.style.color = "#2064b1";
    form_page_btn.style.borderBottom = "2px solid #2064b1";
  }
});

// END OF ALL BUTTONG FUNC

// QUESTION BOX CUT BUTTON CODE ----------------

ques_soln_cut_btn.addEventListener("click", () => {
  question_soln_box.style.display = "none";
  que_soln_blankspace.style.display = "none";
});

// QUESTIONN BOX BLANK SPACE CODE ----------------

que_soln_blankspace.addEventListener("click", () => {
  question_soln_box.style.display = "none";
  que_soln_blankspace.style.display = "none";
});

// BACK BTN CODE
login_back_btn.addEventListener("click", () => {
  branch_page.style.display = "none";
  year_select_container.style.display = "flex";
  login_back_btn.style.display = "none";
});
// END OF BACK BTN CODE

// MAIN FUNCTION

// FIRST YEAR BUTTON CODE FOR DIPLOMA AND DIGREE ------------
let D_first_year_btn = document.getElementById("dy1");

function d_fy_func() {
  let year_var = "D1";
  subject_box_cont.innerHTML = "";
  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
  }
  whole_login_page.style.display = "none";
  main_container.style.display = "block";
  login_back_btn.style.display = "block";
  subject_detail_page.style.display = "none";
  subject_page.style.display = "block";

  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    subject_page_btn.style.color = "#2064b1";
    subject_page_btn.style.borderBottom = "2px solid #2064b1";
  }

  tests_container.innerHTML = "";
}
let P_first_year_btn = document.getElementById("py1");
function p_fy_func() {
  let year_var = "P1";
  subject_box_cont.innerHTML = "";

  for (i = 0; i < pages_array.length; i++) {
    pages_array[i].style.display = "none";
  }
  whole_login_page.style.display = "none";
  main_container.style.display = "block";
  subject_detail_page.style.display = "none";
  subject_page.style.display = "block";
  login_back_btn.style.display = "block";
  for (i = 0; i < hor_btn.length; i++) {
    hor_btn[i].style.color = "black";
    hor_btn[i].style.borderBottom = "2px solid #ffff";

    subject_page_btn.style.color = "#2064b1";
    subject_page_btn.style.borderBottom = "2px solid #2064b1";
  }
}
// END OF  FIRST YEAR BUTTON CODE FOR DIPLOMA AND DIGREE ------------

//SET YEAR AND BRANCHES BTN CODE

let degree_branch_array = [
  { name: "AO", code: "AO" },
  { name: "CE", code: "CE" },
  { name: "CO", code: "CO" },
  { name: "AN", code: "AN" },
  { name: "ME", code: "ME" },
  { name: "MK", code: "MK" },
  { name: "EE", code: "EE" },
];

let diploma_branch_array = [
  { name: "AO", code: "AO" },
  { name: "AN", code: "AN" },
  { name: "CE", code: "CE" },
  { name: "CO", code: "CO" },
  { name: "ME", code: "ME" },
  { name: "EE", code: "EE" },
];

// MAIN FUNCTION CODE THAT WILL BE USED IN EVERY LOGIN BUTTON

// END OF MAIN FUNCTION

// -----------------------------------------------------------------------

// START OF APPENDING BRANCH BUTTONS ---
function appending_branch(given_array, year) {
  given_array.forEach((item) => {
    const branch_box = document.createElement("li");
    branch_box.innerHTML = item.name;
    let department_code = year + item.name;

    branch_box.addEventListener("click", () => {
      console.log(department_code);
    });

    branch_container.appendChild(branch_box);
  });
}

// END OF APPEDING BRANCH BUTTONS -------------

// DEGREE SECOND YEAR BUTTON FUNCTION
function d_sy_func() {
  let year_var = "D2";

  branch_container.innerHTML = "";
  appending_branch(degree_branch_array, year_var);

  year_select_container.style.display = "none";
  branch_select_container.style.display = "block";
  login_back_btn.style.display = "block";
}
// DEGREE THIRD YEAR BUTTON FUNCTION
function d_ty_func() {
  let year_var = "D3";

  // main_function(year_var);

  branch_container.innerHTML = "";
  appending_branch(degree_branch_array, year_var);

  year_select_container.style.display = "none";
  branch_select_container.style.display = "block";
  login_back_btn.style.display = "block";
}
// DEGREE FOURTH YEAR BUTTON FUNCTION
function d_fry_func() {
  let year_var = "D4";

  branch_container.innerHTML = "";
  appending_branch(degree_branch_array, year_var);

  year_select_container.style.display = "none";
  login_back_btn.style.display = "block";

  branch_select_container.style.display = "block";
}

// DIPLOMA SECOND YEAR BUTTON FUNCTION
function p_sy_func() {
  let year_var = "P2";

  branch_container.innerHTML = "";
  appending_branch(degree_branch_array, year_var);

  login_back_btn.style.display = "block";

  year_select_container.style.display = "none";
  branch_select_container.style.display = "block";
}
// DIPLOMA THIRD YEAR BUTTON FUNCTION
function p_ty_func() {
  let year_var = "P3";
  login_back_btn.style.display = "block";

  branch_container.innerHTML = "";
  appending_branch(degree_branch_array, year_var);

  year_select_container.style.display = "none";
  branch_select_container.style.display = "block";
}

// END OF RESET YEAR AND BRANCHES BTN CODE
