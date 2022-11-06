$('.img').click(function addimage(e){
  let email=localStorage.getItem("email");

    
  alert("image is added");
    e.preventDefault();
    let image=$('.image');


    const fileInput = document.querySelector(".image");
    const formData = new FormData();
    
    formData.append("file", fileInput.files[0]);
    
    const options = {
      method: "POST",
      body: formData,
    };
    console.log(formData);
    $(".image").val('');
    fetch('http://localhost:8080/company_products/addimage/'+email, options);

});
var count;
var array=[];
var memories=[];

var zero=$('.icon-button__badge');
if(zero.val()==0){
  zero.css('display', 'none');
}
var memoriestextdisplay=[];
var countnotif=0;
(function countofrec(){
  
  let email=localStorage.getItem("email");
  console.log(email);
  let fetchRes = fetch('http://localhost:8080/company_products/getcount/'+email,{

    // mode: 'no-cors',
  });
     
fetchRes.then(response =>response.json())
.then(d => {
  d.forEach(function(img){
    console.log(img); 
    array.push(img.imageid);
    const d = new Date();
    let month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(d);
    if(img.created['month']==month.toUpperCase()){
      console.log("Hi chellam");
      memories.push(img.imageid);
      countnotif++;
      content=[];
      content.push(img.created['year']);
      content.push(img.created['month']);
      content.push(img.created['dayOfMonth']);
      memoriestextdisplay.push(content);
    }
    
  })

});



})();



let f=1;   
function getimages()
{
  for (let i = 0; i < array.length; i++) {
    try{
      console.log(array[i]);
      var check=0;
      let email=localStorage.getItem("email");

      var fetchRes = fetch('http://localhost:8080/company_products/getStudentPhoto/'+array[i]+"/"+email,{

        // mode: 'no-cors',
      });
    }
    catch (e){
      continue;
    }
    
  
      fetchRes.then(response =>(
        response.blob().then(blobResponse => {

         
            var parent=document.getElementsByClassName("post")[0];
            let output="";
            data = blobResponse;
            const urlCreator = window.URL || window.webkitURL;
            const child=document.createElement('img');
            child.setAttribute("src", urlCreator.createObjectURL(data) );
            child.setAttribute("id","posting");
            child.setAttribute("class","post");
            child.innerHTML=`<i class="fa fa-heart" aria-hidden="true"></i>` ;
            console.log(child);
            parent.appendChild(child);
            zero.text(countnotif);
            
            if(countnotif && f )
            {
              zero.css('display', 'block');
             
              function showNotification(){
                const username=localStorage.getItem("username");
                const notification=new Notification("New Message !",{
                    body:"Hey "+username+"! You have " +countnotif+" memories added in your inbox ",
            
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
                f=0;
            }
              
  
         
          // document.getElementById('posting').src = urlCreator.createObjectURL(data);
        }).catch(error=>{
         console.log(error);
          
  
        })
      )).catch(error=>{
        console.log(error);

      });
    


      
      // $(".posting").attr("src","data:image/;base64,"+myHexData);


}
}


$('.fa').click((e)=>{

  e.preventDefault();
  let name = localStorage.getItem("username");
  let email = localStorage.getItem("email");
  $('.details').html(`Username :${name} <br> Email : ${email}`);

});


var classinc1=0;
var classinc2=0;   
var memoriestext=0;

function getmemoriesimages()
{
  $(".showimage").css("display","none");
  console.log("memoriestectx :",memoriestextdisplay);
  var objres='';
  
  for (let i = 0; i < memories.length; i++) {
    try{
      console.log("hi"+memories[i]);
      var check=0;
      let email=localStorage.getItem("email");

      var fetchRes = fetch('http://localhost:8080/company_products/getStudentPhoto/'+memories[i]+"/"+email,{

        // mode: 'no-cors',
      });
    }
    catch (e){
      continue;
    }
    
       
      fetchRes.then(response =>(
        response.blob().then(blobResponse => {

         
            var parent1=document.querySelector('.carousel-indicators')
            
            data = blobResponse;
            const urlCreator = window.URL || window.webkitURL;
            const child1=document.createElement('li');
            child1.setAttribute("data-target","#myCarousel");
            child1.setAttribute("data-slide-to",classinc1);
            if(classinc1==0){
              child1.setAttribute("class",'active');
            }
            classinc1++;
            parent1.appendChild(child1);
            console.log(child1);

          
          if(classinc2==0)
            {
              var obj=`<div class="item active">
                <img src="${urlCreator.createObjectURL(data)}"  style="width:100%;height:670px;">
                <div class="carousel-caption" >
                  <h3>${memoriestextdisplay[0][0]}</h3>
                  <p>${memoriestextdisplay[0][1]} , ${memoriestextdisplay[0][2]} </p>
                </div>
              </div>`

           }
           
            else{
             var obj= `<div class="item">
              <img src="${urlCreator.createObjectURL(data)}"  style="width:100%;height:680px;">
              <div class="carousel-caption">
                <h3>${memoriestextdisplay[memoriestext][0]}</h3>
                <p>${memoriestextdisplay[memoriestext][1]} , ${memoriestextdisplay[memoriestext][2]}</p>
              </div>
            </div>`
            }
            memoriestext++;
            objres+=obj;
            var parent2=document.querySelector('.carousel-inner');
            classinc2++;
            console.log(obj);


            zero.text(countnotif);
            zero.css('display', 'block');
            parent2.innerHTML=objres; 
         
          // document.getElementById('posting').src = urlCreator.createObjectURL(data);
        }).catch(error=>{
          console.log(error);
         // throw new Error("Stop script");
          
  
        })
      )).catch(error=>{
        console.log(error);
        // throw new Error("Stop script");

      });     
      // $(".posting").attr("src","data:image/;base64,"+myHexData);


}
}