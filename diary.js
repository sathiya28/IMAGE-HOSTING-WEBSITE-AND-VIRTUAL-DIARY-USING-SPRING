const addForm = document.querySelector(".added");
const textContent=document.querySelector('.content-text');

const ul = document.querySelector("ul.todos");
const searchFormInput = document.querySelector("form.search input");

//ADD NEW TODO
var diaryid=1;

const handleAddItem = (inputValue) => {

  const html = `

   <li class="list-group-item d-flex justify-content-between align-items-center">
   
      <span class="content">${inputValue}</span>
      
      <i class="fa fa-trash delete" aria-hidden="true"></i>

    </li>
  `;
  ul.innerHTML += html;
};

addForm.addEventListener("click", (e) => {
  e.preventDefault();
  
  console.log(textContent.value)
  const inputValue=textContent.value;
  if (inputValue.length) handleAddItem(inputValue);
  
});

//REMOVE TODO
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
  


    
        e.preventDefault();
        alert("Are you sure ,you want to delete ?")
          let email=localStorage.getItem("email");
  console.log(email);
  const content=e.target.parentNode.firstChild.nextElementSibling.innerText;


      fetch("http://localhost:8080/company_products/deletediary/"+email+"/"+content,{
          method:'DELETE',
        })
        .then(response => response.json())
        .then(data => {
          window.alert("Data deleted successfully");
          console.log(data);
        })
        .catch(err => { console.log(err) });
        


   
  };
  e.target.parentElement.remove();
});

//SEARCH INPUT: PREVENT DEFAULT ACTION - LITTLE BUG I FOUND IN THE COURSE PROJECT
searchFormInput.parentElement.addEventListener("submit", (e) =>
  e.preventDefault()
);

//SEARCH AND FILTER TODOS
const filterItems = (value) => {
  Array.from(ul.children).forEach((li) => {
    if (!li.textContent.toLowerCase().includes(value)) li.classList.add("filtred");
    else li.classList.remove("filtred");
  });
};

searchFormInput.addEventListener("keyup", (e) => {
  const value = searchFormInput.value.toLowerCase().trim();
  filterItems(value);
});

//time
const today = new Date()

const weekday = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(today)
const month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(today)
const date = today.getDate()
const year = today.getFullYear()

const dayLabel = document.getElementById('day')
dayLabel.textContent = weekday

const dateLabel = document.getElementById('date')
dateLabel.textContent = `${month} ${date}, ${year}`





//API

$('.added').click(function addcompany(e){
    
  e.preventDefault();


  const content=textContent.value;
  console.log(content);
 
  let email=localStorage.getItem("email");
  console.log(email);
  textContent.value="";

  fetch('http://localhost:8080/company_products/adddiary/',{
 method:'POST',
 headers:{
   'Accept':'application/json',
   'Content-Type': 'application/json'
 },
  body:JSON.stringify({content:content,email:email})
  })
  .then(response =>response.json())
  .then(d => {
  console.log(d);
  })

  
});




$(".view").click(function viewdiary(e)
{
  e.preventDefault();
  let email=localStorage.getItem("email");
let fetchRes = fetch('http://localhost:8080/company_products/viewDiary/'+email,{

  // mode: 'no-cors',
});
    
fetchRes.then(response =>response.json())
.then(d => {
  let ind=0;
  let output="";

  d.forEach(function(diary){

    
    ind = ind + 1;
    output+=`
    <ul >
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <li class="list-group-item"><b>Content </b> : ${diary.content}</li>
      <li class="list-group-item"><b>Created Date </b>: ${diary.created.dayOfMonth}/${diary.created.month}/${diary.created.year}</li>
     
    </li> 
      </ul>
  <br>
    `
  });
  document.querySelector('.search-results').innerHTML=output;
  
});

});



$('.fa').click((e)=>{

  e.preventDefault();
  let name = localStorage.getItem("username");
  let email = localStorage.getItem("email");
  $('.details').html(`Username :${name} <br> Email : ${email}`);

});
