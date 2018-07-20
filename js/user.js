$(document).ready(function () {
   $('.update_user').click(function () {
      if(!confirm("Do you really want to change user information ?")){
          return;
      }
      let id = $(this).parent().attr('id').trim();
      let name = $(this).parent().find('.name').html().trim();
      let login = $(this).parent().find('.login').html().trim();
      let email = $(this).parent().find('.email').html().trim();
      $.ajax({
          url:'user_change.php',
          method:'post',
          data:{
              id:id,
              name:name,
              login:login,
              email:email,
              action: 'update'
          }
      })
          .done(function(data){
                if(data === 'err'){
                    alert("There isn't user with such id");
                }
                else if(data === 'err0'){
                    alert('You can\'t change like that');
                }
                else if(data === 'err1' || data === 'err2'){
                    alert("You must follow our rules");
                }
                else if(data === 'err1.2'){
                    alert("There is such kind of login, that's why try other one");
                }
                else if(data === 'err2.2'){
                    alert("There is such kind of email, that's why try other one");
                }
                else{
                    alert("Changes confirmed");
                }
          });
   });
   $('.delete_user').click(function () {
       if(!confirm("Do you really want to delete this user?")){
           return;
       }
      let id = +$(this).parent().attr('id');
      $.ajax({
          url:'user_change.php',
          method:'post',
          data:{
              id:id,
              action:'delete'
          }
      })
          .done( (data) => {
              if(data === 'err'){
                  alert('Please don\'t change user\'s id =D');
                  return;
              }
              $(this).closest('tr').remove();
          })
   });
});