$('.add').click(function addcompany(e){
    
    e.preventDefault();

    let company_id=$('.company_id');

    let company_name=$('.company_name');
    console.log(company_id.val());
    console.log(company_name.val());



    fetch('http://localhost:8080/company_products/addcompany/',{
   method:'POST',
   headers:{
     'Accept':'application/json',
     'Content-Type': 'application/json'
   },
    body:JSON.stringify({companyid:company_id.val(),companyname:company_name.val()})
    })
    .then(response =>response.json())
    .then(d => {
    console.log(d);
    })

    
});




$('.delete').click(function deleteEvent(e){
    e.preventDefault();
    
 
   let name=$('.name');
  fetch('http://localhost:8494/company_products/deletecompany/'+name.val(),{
    method:'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    window.alert("Data deleted successfully");
    console.log(data);
   })
   .catch(err => { console.log(err) });
   
 });



//product


$('.add-product').click(function addproduct(e){
    
    e.preventDefault();

 

    let product_name=$('.product_name');
    let product_desc=$('.product_desc');
    let companyId=$('.companyId');
    let status=$('.status');
    console.log(status.val());
    console.log(product_desc.val());





    fetch('http://localhost:8494/company_products/addproduct/',{
   method:'POST',
   headers:{
     'Accept':'application/json',
     'Content-Type': 'application/json'
   },
    body:JSON.stringify({productname:product_name.val(),productDesc:product_desc.val(),companyid:companyId.val(),status:status.val()})
    })
    .then(response =>response.json())
    .then(d => {
    console.log(d);
    window.alert("Data added successfully");
    })

    
});


$('.delete-productbyid').click(function deleteEvent(e){
  e.preventDefault();
 

 let id=$('.product_deleteid');
 console.log(id.val());
fetch('http://localhost:8494/company_products/deleteproduct/'+id.val(),{
  method:'DELETE',
})
.then(response => response.json())
.then(data => {
  console.log(data);
  window.alert("Data deleted successfully");
  id.val("");
 })
 .catch(err => { console.log(err) });
 
});


