$(document).ready(function () {
    $('img').click(function () {
       let id = $(this).closest('section').attr('id');
        $.ajax({
            url:'change.php',
            method: 'POST',
            dataType: 'json',
            data:{
                id: id
            }
        })
        .done((data)=>{
            if(data){
                let img = $(this).data('images',data);
                let src = img.data('images').pop();
                img.data('images').unshift(src);
                img.attr('src',img.data('images')[0].substr(3));
            }
        });
    });
});