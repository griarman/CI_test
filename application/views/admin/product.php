<form action="add_product.php" method="post" enctype="multipart/form-data" class="container-fluid">
    <div class="row">
        <div id="left" class="col-md-3">
            <div id="upper">
                <label for="name">Name</label>
                <input type="text" id="name" required="" name="name" placeholder="Enter The Name">
            </div>
            <div id="downer">
                <label for="price">Price</label>
                <input type="number" id="price" required="" name="price" step="0.01" placeholder="Enter The Price">
            </div>
        </div>
        <div id="middle"  class="col-md-6">
            <label for="description">Description</label>
            <textarea id="description" name="description" required placeholder="Enter The Description"></textarea>
        </div>
        <div id="right" class="col-md-3">
            <label for="images" id="add_images">Add images</label>
            <input type="file" name="images[]" id="images" multiple="">
            <section><span id="outputMulti"></span></section>
        </div>
    </div>
    <button id="add">Add new Product</button>
</form>

<div class="container-fluid row">
<div class="col-md-3"><main>Categories</main>


        <?php for($i = 0; $i < count($categories); $i++): ?>
            <article class="prod_cat" id=<?=$categories[$i]['id']?>><?=$categories[$i]['name']?></article>
        <?php endfor;?>
        <a href="home" id="href">Add Cadegories</a>
</div>
<div class='col-md-7'>
    <table class='table' style="margin-top: 10px">
        <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
        </tr>


<?php
		foreach ($products as $key => $value) {
		    $new_images = [];
			$image = $images[$value['id']];
            for($i = 0; $i < count($image); $i++){
                $new_images[] = $image[$i]['image'];
            }
			if(empty($new_images)){
				$image = '<span>No Image</span>';
			}
			else{
                $img_data = array_map(function($a){
                    return '/store'.substr($a,2);
                },$new_images);
                $src = $img_data[0];
                $img_data = implode(' ',$img_data);
                $image = "
                            <form name='img' enctype=\"multipart/form-data\" method=\"post\" >
                                <label for='img-{$products[$key]['id']}'>
                                    <img src={$src} data-id='' data-array='$img_data' class='newImg'>
                                </label>
                                <input type='file' hidden id='img-{$products[$key]['id']}'>
                            </form>";
			}
			echo "<tr id={$products[$key]['id']}><td contenteditable=true class=prod_name>{$products[$key]['name']}</td>
			<td contenteditable=true class=prod_price>{$products[$key]['price']} $</td>
			<td contenteditable=true class=prod_des>{$products[$key]['description']}</td>";
            if(count($new_images) < 2){
                echo "<td>{$image}</td>";
            }
            else{
              echo "<td>
			            <button class='leftArrow'><</button>{$image}<button class='rightArrow'>></button>
	                </td>";
            }



			echo "<td><button class=prod_upd>Update</button></td><td><button class=prod_del>Delete</button></td></tr>";
		}
		echo "</table></div></div>";
        if(isset($_SESSION['error'])){
            echo "<div id=error class='center'>{$_SESSION['error']}</div>";
            unset($_SESSION['error']);
        }
?>



<!--https://www.formget.com/ajax-image-upload-php/-->