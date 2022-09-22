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

function showPage(list, page) {
   // start index starts from the page number * 9 then - 9 
   // e.g if on page 2 -> 2 * 9 = 18 - 9 = 9 
   // Meaning the index will start on 9 
   // end index will then be 9 higher than this number as there is 9 students on the page.
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;

   // get the list 
   const studentListUL = document.querySelector(".student-list");
   // reset the inner html incase anything is stored here.
   studentListUL.innerHTML = "";

   for (var i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         // Create the elements to display   
         let student = `<li class='student-item cf'> 
                           <div class='student-details'>
                              <img class='avatar' src='${data[i].picture.thumbnail}' alt='Profile Picture'>
                              <h3>${data[i].name.first} ${data[i].name.last}</h3>
                              <span class="email">${data[i].email}</span>
                           </div>
                           <div class="joined-details">
                              <span class="date">Joined ${data[i].registered.date}</span>
                           </div>
                         </li>`

         // Insert the student into the studentList
         studentListUL.insertAdjacentHTML("beforeend", student)
  
      }
   }
   return studentListUL;
}




/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // Calculate number of pages
   let numberOfPages = list.length / 9;
   // Select the ul
   const linkListUl = document.querySelector(".link-list");
   linkListUl.innerHTML = "";

   // looping through amount of pages 
   for (var i = 0; i < numberOfPages.length; i++) {
      // Creating the list and buttons
      let listItem = `
                        <li> 
                           <button>${i}</button>
                        </li>
                     `
      
      // add listItem to the linkListUl
      linkListUl.insertAdjacentHTML("beforeend", listItem);

      console.log(linkListUl[i]);
   }


   
   

}



// Call functions
showPage(data, 3);
addPagination(data)