$(document).ready(function () {
   $('#submit').click(function (event) {
       let check =  $('#checky:checked').length > 0;
       if(!check){
           if(location.href === 'http://localhost/mytest/login.php'){
               alert('You don\'t checked the checkbox');
               event.preventDefault();
           }
       }
   });
});