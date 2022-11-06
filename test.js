
$('.add-product').click(function addproduct(e){
    
    e.preventDefault();

    let product_id=$('.product_id');

    let product_name=$('.product_name');
    console.log(product_id.val());
    console.log(product_name.val());



    fetch('http://localhost:8494/product_products/addproduct/',{
   method:'POST',
   headers:{
     'Accept':'application/json',
     'Content-Type': 'application/json'
   },
    body:JSON.stringify({productid:product_id.val(),productname:product_name.val()})
    })
    .then(response =>response.json())
    .then(d => {
    console.log(d);
    })

    
});
