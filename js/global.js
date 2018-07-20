window.array_key_exists = function  (key, search) {
    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
        return false;
    }
    return key in search;
};
window.isset = function (argument) {
  return (typeof argument !== 'undefined');
};
window.imageChange = function () {
    let img = $(this);
    if(!isset(img.attr('data'))){
        let src = img.data('photos').pop();
        img.data('photos').unshift(src);
        src = img.data('photos')[0];
        img.attr('src',src);
    }
};
window.product_show = function (data){
    let right = $('#rightAside');
    right.html('');
    for(let i = 0; i < data.length - 1; i++){
        let img;
        let tag = $(`<section id="${data[i].id}" class="product">`);
        if(isset(data[i].image)){
            img = $(`<img src="">`);
            if(Object.keys(data[i].image).length > 1){
                data[i].image = data[i].image.map(function (a) {
                    return a.substr(3);
                });
                img.data('photos',data[i].image);
                img.attr('src',img.data('photos')[0]);
                img.click(imageChange);
            }
            else{
                let image = data[i].image[0].substr(3);
                img = $(`<img src="${image}">`);
            }
        }
        else{
            img = $(`<img src='images/no-image.png'>`);
        }
        let name = $(`<div class="name"><span>Name: </span><span>${data[i].name}</span></div>`);
        let price = $(`<div class="price"><span>Price: </span><span>${data[i].price}$</span></div>`);
        let quantity = $(`<div class="quantity"><span>Quantity: </span><input type="number" min="0" value="0" max="100"></div>`);
        let description = $(`<div class="description">${data[i].description}</div>`);
        let add = $(`<div class="add">Add to Basket</div></section>`);
        add.click(add_to_card);
        tag.append(img);
        tag.append(name);
        tag.append(price);
        tag.append(quantity);
        tag.append(description);
        tag.append(add);
        right.append(tag);
    }
    let pages =  Math.ceil(data[data.length - 1] / 6),pageNumber,pageDiv;
    pageDiv = $('<div id=\'pages\'></div>');
    for(let i = 1; i <= pages;i++){
        pageNumber = $(`<span class='page'>${i}</span>`);
        pageNumber.click(pageChange);
        pageDiv.append(pageNumber);
    }
    right.append(pageDiv);
};
window.add_to_card = function(){
    let parent = $(this).parent();
    let id = parent.attr('id');
    let quantity = +parent.find('input[type=number]').val();
    let name = parent.find('.name>:last-child').html();
    let price = parent.find('.price>:last-child').html().trim();
    let description = parent.find('.description').html().trim();
    $.ajax({
        url:'add_to_card.php',
        method:"POST",
        data:{
            id:id,
            quantity:quantity,
            name:name,
            price:price,
            description:description
        }
    })
        .done(function (data) {
            if (data === 'err'){
                alert('You havn\'t logged in yet');
            }
            else if(data === 'er1'){
                alert('Can\'t add to card');
            }
            else if(data === 'er3'){
                alert("Quantity must be number");
            }
            else if(data === 'err3'){
                alert('You must log in at first');
            }
            else if(data === 'err2'){
                alert('There isn\'t such kind of user');
            }
            else if(data === 'er4'){
                alert("Quantity can't be more than 100");
            }
            else if(data === 'er2'){
                alert("Quantity can't be 0 or less 0");
            }
            else if(data){
                alert('Product added to card');
            }
        })
};
window.pageChange = function () {
    let offset = $(this).html();
    let cat_id = $('.sectionChecked').attr('id');
    if(!cat_id){
        cat_id = null;
    }
    offset = (offset - 1) * 6;
    $.ajax({
        url:'pagination.php',
        method:'post',
        dataType: 'json',
        data:{
            offset:offset,
            id:cat_id,
            action: 'offset'
        }
    })
        .done(function(data){
            product_show(data);
        })
};
window.del_basket_prod = function(){
    let id = +$(this).closest('section').attr('id');
    $.ajax({
        url:'del_from_basket.php',
        method:'post',
        dataType:'json',
        data:{
            id:id
        }
    })
        .done(function (data) {
            del_from_basket(data);
            total_amount();
        })
};
window.del_from_basket = function (data) {
    let right = $('#rightAside');
    right.html('');
    if(data.length === 0){
        let tag = $(`<div id="empty">There is no any products</div>`);
        right.append(tag);
        return;
    }
    for (let i = 0; i < data.length; i++) {
        let img;
        let tag = $(`<section id="${data[i].id}" class="product">`);
        if (isset(data[i].image)) {
            img = $(`<img src="">`);
            if (Object.keys(data[i].image).length > 1) {
                data[i].image = data[i].image.map(function (a) {
                    return a.substr(3);
                });
                img.data('photos', data[i].image);
                img.attr('src', img.data('photos')[0]);
                img.click(imageChange);
            }
            else {
                let image = data[i].image[0].substr(3);
                img = $(`<img src="${image}">`);
            }
        }
        else {
            img = $(`<img src='images/no-image.png'>`);
        }
        let name = $(`<div class="name"><span>Name: </span><span>${data[i].name}</span></div>`);
        let price = $(`<div class="price"><span>Price: </span><span>${data[i].price}$</span></div>`);
        let quantity = $(`<div class="quantity"><span>Quantity: </span><input class="count" type="number" min="0" value="${data[i].quantity}" max="100"></div>`);
        let description = $(`<div class="description">${data[i].description}</div>`);
        let del = $(`<div class="delete">Delete From Basket</div></section>`);
        del.click(del_basket_prod);
        quantity.on('change',total_amount);
        tag.append(img);
        tag.append(name);
        tag.append(price);
        tag.append(quantity);
        tag.append(description);
        tag.append(del);
        right.append(tag);
    }
    let total = $(`<div id="total">
                                <span>Total:</span><span id="summary"></span>
                      </div>`);
    let buy = $(`<div id='buy'>BUY</div>`);
    buy.click(buy_prod);
    right.append(total);
    right.append(buy);
};
window.buy_prod = function(){
    let quantity = $('.count');
    let id = $('#rightAside>section');
    let arr = [],count;
    for (let i = 0; i < quantity.length; i++ ){
        count = quantity.eq(i).val();
        if(count > 0 && count < 100 && count %1 === 0) {
            arr[i] = {
                'id': id.eq(i).attr('id'),
                'quantity': quantity.eq(i).val()
            }
        }
        else{
            alert('There are problems with products quantity,it\'s cant be more then 100 and less 0, and it must be integer');
            return;
        }
    }
    arr.push();
    let str = JSON.stringify(arr);
    $.ajax({
       url:'buy_prod.php',
       method:'post',
       data:{
           str:str
       }
    })
        .done(function (data) {
            if(data === 'err'){
                alert('There are some problems with your order, please check if you fill all fields write,sorry for the inconvenience');
            }
            else{
                alert('Your order is accepted, and after our verification we will contact you');
                $('#rightAside').empty();
            }
        });
    console.log(str);

};
window.total_amount = function () {
    let quantity = $('.count');
    let price = $('.price>:last-child');
    let summery = 0;
    let sum;
    for (let i = 0; i < quantity.length; i++){
        sum = price.eq(i).html().substr(0,(price.eq(i).html().length - 1));
        summery += quantity.eq(i).val() * sum;
    }
    let total = $('#summary');
    total.html(summery);
};