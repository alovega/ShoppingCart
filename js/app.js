//variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody')
      clearCartBtn = document.querySelector('#clear-cart');  




//Listeners

loadEventListeners();

function loadEventListeners(){
    //when a new course is added 
    courses.addEventListener('click', buyCourse);
    //when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);
    //when the clear cart button is clicked
    clearCartBtn.addEventListener('click', clearCart);
    //document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}


function buyCourse(e){
 e.preventDefault();
 //use delegation to find the course that was added
 if(e.target.classList.contains('add-to-cart')){
 //reads the course values
    const course = e.target.parentElement.parentElement
    
    getCoursesInfo(course);
 }
}

//reads the html info of the selected course

function getCoursesInfo(course){
    //create an object with the course date
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    console.log(courseInfo);
    //insert or add to the shopping cart
    addIntoCart(courseInfo);
}

//display the selected course into the shopping cart

function addIntoCart(course){
//create tr element
    const row = document.createElement('tr');

//build template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;


    //add into the shopping cart
    shoppingCartContent.appendChild(row);


    //add course into storage
    saveIntoStorage(course);
}

//adds the courses into the local storage
function saveIntoStorage(course){
    let courses = getCoursesFromStorage();

    //add courses to the local storage
    courses.push(course);

    //convert to strings since storage only save string
    localStorage.setItem('courses', JSON.stringify(courses));
}

//get the contents in the local storage
function getCoursesFromStorage(){
    let courses;

    //if something exists in the storage we get the value otherwise create an empty array

    if (localStorage.getItem('courses') === null ){
        courses = [];
    }else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses
}
//removes course from the shopping cart
function removeCourse(e){
    let course, courseId;
    //remove from the dom
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement
        courseId= course.querySelector('a').getAttribute('data-id')
    }
    console.log(courseId)
    //remove from localstorage
    removeCourseFromLocalStorage(courseId);
    
}
//remove from local storage
function removeCourseFromLocalStorage(id){
    // get the data in the local storage
    let coursesLS = getCoursesFromStorage();
    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === id){
            coursesLS.splice(index, 1);
        }
    });

    //add the remaining to the local storage
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}
//clears the shopping cart

function clearCart(){
    //shoppingCartContent.innerHTML = '';
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    //clear from local storage
    clearLocalStorage();
}
//clears the local storage
function clearLocalStorage(){
    localStorage.clear()
}
//loads when document is ready and prints courses into the shopping cart
function getFromLocalStorage(){
    let coursesLS = getCoursesFromStorage();

    //loop throughh the courses and prints into the shopping cart
    coursesLS.forEach(function(course){
        //create <tr> element
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
        <tr>
        <td>
            <img src="${course.image}" width=100>
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>
            <a href="#" class="remove" data-id="${course.id}">X</a>
        </td>
    </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}