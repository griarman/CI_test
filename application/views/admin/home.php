<div class="container-fluid text-center">
    <label for="cad">Name</label>
    <input type="text" class="homeInp" id="cad">
    <button id="add" class="homeAdd">Add</button>

    <table id='homeTable'>
    <?php foreach($categories as $category):?>
        <tr id=<?=$category['id']?>>
            <td contenteditable=true class=name><?= $category['name']?></td>
            <td><button class=upd>Update</button></td>
            <td><button class=del>Delete</button></td>
            <td class="text-left"><a href='product/<?=$category['id']?>'>Add product in <?= $category['name']?></a></td>
        </tr>

   <?php endforeach; ?>
    </table>
</div>