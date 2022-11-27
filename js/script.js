/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// get the list
const studentListUL = document.querySelector(".student-list");

function showPage(list, page) {
   // start index starts from the page number * 9 then - 9
   // e.g if on page 2 -> 2 * 9 = 18 - 9 = 9
   // Meaning the index will start on 9
   // end index will then be 9 higher than this number as there is 9 students on the page.
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;


   // reset the inner html incase anything is stored here.
   studentListUL.innerHTML = "";

   for (var i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         // Create the elements to display
         let student = `<li class='student-item cf'>
                           <div class='student-details'>
                              <img class='avatar' src='${list[i].picture.thumbnail}' alt='Profile Picture'>
                              <h3>${list[i].name.first} ${list[i].name.last}</h3>
                              <span class="email">${list[i].email}</span>
                           </div>
                           <div class="joined-details">
                              <span class="date">Joined ${list[i].registered.date}</span>
                           </div>
                         </li>`

         // Insert the student into the studentList
         studentListUL.insertAdjacentHTML("beforeend", student)

      }
   }
   return studentListUL;
}

addSearchBar();

function filterStudent() {

      // create variables to store the text input and make it lower case
      let textInput = searchInput.value;
      let lowercase = textInput.toLowerCase();
      // create empty array to push the filtered search students into
      let filteredStudentArray = [];

      // loop through all objects to check if the search input is contained in the current object
      for (var i = 0; i < data.length; i++) {
         let fullName = data[i].name.first.toLowerCase() + " " + data[i].name.last.toLowerCase();
         if (fullName.includes(textInput)) {
            // push the current student which has the same characters to the filtered array
            filteredStudentArray.push(data[i]);

      }
   }
   showPage(filteredStudentArray, 1);
   addPagination(filteredStudentArray)
    

    if (filteredStudentArray.length === 0) {
      studentListUL.innerHTML = "<li class='no-results'>No Results Found</li>"
    }
}

// get the search bar and store in varliable
let searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
   filterStudent()
});

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // Calculate number of pages
   let numberOfPages = Math.ceil(list.length / 9);
   console.log(numberOfPages);
   // Select the ul
   const linkListUl = document.querySelector(".link-list");
   linkListUl.innerHTML = "";

   // looping through amount of pages
   for (var i = 0; i < numberOfPages; i++) {
      // Creating the list and buttons
      let li = document.createElement("li");
      let button = document.createElement("button")
      // Set button type to button
      button.type = "button";
      // Set text content to the current index + 1 so page number starts at 1
      button.textContent = `${i + 1}`
      // Add the button to the li
      li.append(button)
      // Insert the li to the ul
      linkListUl.append(li);
   }

   // Check is their is a child in the ul, if there is add the active class to the first element.
   if (linkListUl.firstElementChild) {
      linkListUl.firstElementChild.firstElementChild.className = "active";
   }


   // add click listener to the ul
   linkListUl.addEventListener("click", (event) => {
      // store the target to the button
      let btn = event.target;
      // taking the textContent of the btn and parsing as an integer
      let pageNumber = parseInt(btn.textContent)

      // check if the current selected button is a button
      if (btn.tagName === "BUTTON") {

         // loop through the li elements
         for (var i = 0; i < linkListUl.children.length; i++) {
            // check if page number is same as current index + 1, if it is set current target class name to active
            if (pageNumber === (i + 1)) {
               btn.className = "active"
            } else {
               // If the check fails set the class name of all buttons to nothing.
               linkListUl.children[i].firstElementChild.className = "";
            }
         }

         showPage(list, pageNumber);
      }
   });
}

function addSearchBar() {

   const header = document.querySelector(".header");

   const searchBar = document.createElement("label");
   searchBar.className = "student-search";


   const searchSpan = document.createElement("span");
   searchSpan.innerHTML = "Search for student";

   const searchInput = document.createElement("input");
   searchInput.id = "search";
   searchInput.placeholder = "Search by name...";

   const searchButton = document.createElement("button");
   searchButton.type = "button";

   const searchImage = document.createElement("img");
   searchImage.src = "img/icn-search.svg"
   searchImage.alt = "Search Image";

   searchBar.append(searchSpan);
   searchBar.append(searchInput);
   searchBar.append(searchButton);
   searchButton.append(searchImage);
   header.append(searchBar);

   return header

}





// Call functions
showPage(data, 1);
addPagination(data);
