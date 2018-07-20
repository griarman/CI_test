$(document).ready(function(){
	$('#add').click(function(){
		let category = $('#cad').val();
		$.ajax({
			url: '/store/index.php/home/add',
			type: 'POST',
			data:{
				name: category
			}
		})
			.done((result)=>{
                if(!result){
                    alert("You can't add category which has already exists ");
                    return;
                }
                $('#cad').val('');
                alert("Category added successfully");
                let new_tr = $(`<tr id="${result}"><td>${category}</td></tr>`);
                let del =$(`<td><button class="del">Delete</button>`);
                let upd =$(`<td><button class="upd">Update</button>`);
                let add_prod = (`<td class="text-left"><a href='product/${result}>'>Add product in ${category}</a></td>`);
                del.click(del_cat);
                upd.click(upd_cat);
                new_tr.append(upd);
                new_tr.append(del);
                new_tr.append(add_prod);
                $('#homeTable').append(new_tr);
			})
	});
	let del_cat = function(){
        if(!confirm('Do you really want to delete this category?')){
            return;
        }
        let tr = $(this).closest('tr');
        let id = tr.attr('id');

        $.ajax({
            url: '/store/index.php/home/del',
            type: 'POST',
            data:{
                id: id
            }
        })
			.done((result)=>{
                if(!result){
                    alert("We can't delete that category");
                    return;
                }
                $(this).closest('tr').remove();
			});
    };
	$('.del').click(del_cat);
	let upd_cat = function() {
        if (!confirm('Do you really want to change this category?')) {
            return;
        }
        let tr = $(this).closest('tr');
        let id = tr.attr('id');
        let name = tr.find('.name').html();
        $.ajax({
            url: '/store/index.php/home/upd',
            type: 'POST',
            data: {
                id: id,
                name: name,
            }
        })
			.done((result) => {
				if(!result){
					alert("Changes had'nt done,try again");
					return;
				}
                tr.find('a').html('Add product in ' + name);
            })
    };
	$('.upd').click(upd_cat);
	$('.prod_del').click(function(){
		let id = $(this).closest('tr').attr('id');
		$.ajax({
			url: '/store/index.php/product/rem',
			type: 'POST',
			data:{
				id: id
			}
		})
			.done(()=>{
                $(this).closest('tr').remove();
			});
	});
	$('.prod_upd').click(function(){
		let tr = $(this).closest('tr');
		let id = tr.attr('id');
		let name = tr.find('.prod_name').text();
		let price = tr.find('.prod_price').text();
		let des = tr.find('.prod_des').text();
		$.ajax({
			url: '/store/index.php/product/upd',
			type: 'POST',
			data:{
				id: id,
				name:name,
				price:price,
				des:des
			}
		})
	});
	$('.leftArrow').click(function () {
		let img = $(this).closest('td').find('img');
		let data = img.attr('data-array').split(' ');
		let src = img.attr('src');
		for(let i = 0; i < data.length;i++){
			if(src === data[i]){
				if(i !== 0) {
                    img.attr('src', data[i - 1]);
                }
			}
		}
    });
    $('.rightArrow').click(function () {
        let img = $(this).closest('tr').find('img');
        let data = img.attr('data-array').split(' ');
        let src = img.attr('src');
        for(let i = 0; i < data.length;i++){
            if(src === data[i] ){
            	if(i !== data.length - 1){
                	img.attr('src', data[i + 1]);
            	}
            }
        }
    });
	$('input').filter('[hidden]').on('change',function(evt){
        if(!this.value) {
        	return;
		}
		let files = evt.target.files;
        let form = new FormData();
        let newImg = $(this.previousSibling.firstChild);
        let id = newImg.attr('data-id');
        let src = newImg.attr('src');
        form.append('newImage', files[0]);
        form.append('id', id);
        form.append('src', src);
        $.ajax({
            url: "change_img.php",
            type: "POST",
            data: form,
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false
			success:function (newSrc) {
                let data = newImg.attr('src',newSrc).attr('data-array');
                data = data.replace(new RegExp(src), newSrc);
                newImg.attr('data-array', data);
            }
        });
	});

	$('.prod_cat').click(function () {
       let id = $(this).attr('id');
       let href = location.href;
       let last_one = href.substr(href.length-1);
       if(last_one === 't'){
           href = href + '/' + id;
       }
       else{
           href = href.substr(0,href.length-1) + id;
       }
        location.href = href;
    });

    /*let article = $('article');
    article.click(function(){
		let id = $(this).attr('id');
		let href = location.search.split('=');
		href = href[0] + '=' + id;
		location.search = href;
	});
	for(let i = 0; i < article.length;i++){
		let href = location.search.split('=');
		href = href[1];
		if(href === article.eq(i).attr('id')){
            article.eq(i).css({
				'background-color':'#F39814',
				color: '#fff'
            });
		}
	}*/
    $('#images').on('change',function (evt) {
		let files = evt.target.files;
		$('#outputMulti').html('');
		for (let i = 0, f; f = files[i]; i++) {
			if (!f.type.match('image.*')) {
			  alert("Только изображения....");
			  return;
			}
			let reader = new FileReader();
			reader.onload = (function(theFile) {
			  return function(e) {
				let span = $('<span></span>');
				span.html(['<img class="img-thumbnail" src="', e.target.result,
								  '" title="', encodeURI(theFile.name), '">'].join(''));
				$('#outputMulti').before(span);
			  };
			})(f);
			reader.readAsDataURL(f);
		}
	});
});