$('.submit-signup').click(function createcustomer(e)
 {
    e.preventDefault(); 

    let name=$('#name1');

    let email=$('#email1');
    let password=$('#password1')
    
    let cpassword=$('#confirm_password');
    if(name.val()=='' || email.val()=='' || password==''){
        $('.error').html('Fill all the Fields!').css("color ","red");
        return;

}

    if(password.val()==cpassword.val()){
        fetch('http://localhost:8080/company_products/addcustomer/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
                body:JSON.stringify({username:name.val(),email:email.val(),password:password.val()})
                })
                .then(response =>response.json())
                .then(d => {
                console.log(d);
                })
                $('.success').html(`Signup Successful !`);
                setTimeout(()=>{
                    $('.success').html(`Login to continue..`);
                   
              
                },2000);

 }
    else{
        $('.error').html('Correct your password!').css("color ","red");
        password.val('');
        cpassword.val('');

    }

}
);


$('.login').click(function login(e){
    e.preventDefault();
    $('.container2').css("display","block");
    $('.container1').css("display","none");
})  



$('.submit-signin').click((e)=>{
   

    e.preventDefault();
    $('.success').html("");

    let email=$('#email');
    let password=$('#password');


    fetch('http://localhost:8080/company_products/login/',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json'
        },
         body:JSON.stringify({email:email.val(),password:password.val()})
         })
         .then(response =>response.json())
         .then(d => {
            console.log("fds");
            console.log(d);
            if(d.length==0){
                $('.error').html('Username /Password is incorrect').css("color ","red");
                console.log("error");
            }
            else{
                console.log(d.length);
                console.log(d[0]["username"]);
                localStorage.setItem("username", d[0]["username"]);
                console.log(localStorage.getItem("username"));
                localStorage.setItem("email",d[0]["email"]);
                
                let i=5;
               
                $('.error').hide();
                var x= setInterval(()=>{
                    $('.success').html(`Login Successful Redirecting in ${i} seconds`);
                    if(i==0){
                        clearInterval(x);
                        console.log("Redirected");
                        window.location.href = "diary.html";
                    }
                   
                    i=i-1;  

                },800);
               
         }
         })

});




function searchproduct(productname)
{
    
let fetchRes = fetch('http://localhost:8080/company_products/companyproducts/'+productname,{

  // mode: 'no-cors',
});
    
fetchRes.then(response =>response.json())
.then(d => {
  let ind=0;
  let output="";

  d.forEach(function(product){

    
    ind = ind + 1;
    output+=`<ul class='club_list list-group' style="width:60%">
      <li class="list-group-item"style="background-color: #4553A4;color:white${ind}</li>
      <li class="list-group-item"><b>CompanyName</b> : ${product.companyname}</li>
      <li class="list-group-item"><b>ProductName </b>: ${product.productname}</li>
      <li class="list-group-item"><b>Status </b>: ${product.status}</li> 
    </ul>`
  });
  document.querySelector('.search-results').innerHTML=output;
  
});

};

$('.fa').click((e)=>{

    e.preventDefault();
    let name = localStorage.getItem("username");
    let email = localStorage.getItem("email");
    $('.details').html(`Username :${name} <br> Email : ${email}`);

});


// //chart
// (function chart(){

//     let xValues = [];
//     let yValues = [];

//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "http://localhost:8080/company_products/noOfCompanyproducts/",true);
//     xhttp.onload = function() {
//       let products = JSON.parse(this.responseText);
//       console.log(products);
//       for(var i in products)
//       {
//         console.log(products[i]["companyname"]);
//         xValues.push(products[i]["companyname"]);
        
//         if(products[i]["productcount"]==null){
//             yValues.push(0);
//         }
//         else{
//             yValues.push(products[i]["productcount"]);

//         }
        

//       }
//       console.log(xValues);
//       console.log(yValues);

//     var barColors = ["red", "green","blue","yellow","bisque"];

//     new Chart("myChart", {
//     type: "bar",
//     data: {
//         labels: xValues,
//         datasets: [{
//         backgroundColor: barColors,
//         data: yValues
//         }]
//     },
//     options: {
//         legend: {display: false},
//         title: {
//         display: true,
//         text: "No of products in a company"
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// }); 
//     }
   
//     xhttp.send();
// })();



//notification if in homepage

function showNotification(){
    const username=localStorage.getItem("username");
    const notification=new Notification("New Message !",{
        body:"Hey "+username+"! Reminder to write Diary Today ",

    });
}
console.log(Notification.permission);
if(Notification.permission==='granted'){
    
    showNotification();
}
else if(Notification.permission !=='denied')
{
    Notification.requestPermission().then(permission=>{
        if(permission===granted){
            showNotification();
        }
        console.log(permission);
    });


}
