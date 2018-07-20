;$(document).ready(function(){
   $('#leftAside section').click(function () {
       $('#leftAside section').removeClass('sectionChecked');
       $(this).attr('class','sectionChecked');
       let id = $(this).attr('id');
       $.ajax({
           url: 'pagination.php',
           method:'post',
           dataType:'json',
           data:{
               id:id
           }
       })
          .done(function(data){
               product_show(data);
           });
   });


});
