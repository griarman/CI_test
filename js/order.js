$(document).ready(function () {
    let tr = $('tr[id]');
    console.log(tr);
    for(let i = 0; i < tr.length; i++){
        let select = tr.eq(i).find('select');
        let div = tr.eq(i).find('.select-items').find('div');
        let option = select.find('option');
        console.log(select);
        console.log(div);
        for(let j = 0; j < option.length;j++){
            let id = option.eq(j).val();
            div.eq(j).attr('id',id);
            div.eq(j).click(get_quantity);
        }
        div.eq(0).trigger('click');
    }
    function get_quantity(){
        let id = $(this).attr('id');
        let orderId = $(this).closest('tr').find('.id').html();
        // alert(orderId);
        $.ajax({
            url: 'get_quantity.php',
            method: 'post',
            data:{
                id:id,
                order_id:orderId
            }
        })
            .done( (data) =>{
                $(this).closest('tr').find('.quantity').html(data);
            })
    }
});

