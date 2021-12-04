let successMessage =$("#successMessage");
let errorMessage=$("#errorMessage");

$("#contact-us-form").submit(function(e){
    e.preventDefault();
    postData();
})

function postData(){
    var contactName=$("#nameInput").val();
    let contactEmail=$("#emailInput").val();
    let contactTitle=$("#titleInput").val();
    let contactText=$("#textInput").val();
    const data = { name: contactName ,
    email:contactEmail,
    title:contactTitle,
    text:contactText
};

fetch('http://localhost:3000/contact', {
method: 'POST', 
headers: {
    'Content-Type': 'application/json'
  },
body: JSON.stringify(data),
})


.then((response)=>{

    return response.json();


})

   
.then(data => {
    if (data.success){
        console.log('Success:', data);
        successMessage.css("display", "block");
        errorMessage.css("display", "none");
    }else{
        errorMessage.html(data.error);
        console.log('Error:', data);
        errorMessage.css("display", "block");
    }

})
.catch((error) => {
console.error('Error:', error);
errorMessage.css("display", "block");
});

}
 