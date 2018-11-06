//variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody');





//Listeners

loadEventListeners();

function loadEventListeners(){
    courses.addEventListener('click', buyCourse);
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
}