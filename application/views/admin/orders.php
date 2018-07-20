<?php
/*
require_once 'header.php';
require_once 'order_model.php';

if(!($arr = get_orders())){
    echo "There weren't orders(((((";
    die;
}
    echo '<table>';
    echo "<tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Order date</th>
            <th>Product</th>
            <th>Quantity</th>
</tr>";
    foreach ($arr as $key => $value):
        $order = get_order_details($value['id']);
            if($order){
            echo "<tr id = '{$value['id']}'>";
*/?><!--
            <td class="id"><?/*= $value['id']*/?></td>
            <td class="user_id"><?/*= $value['userid']*/?></td>
            <td class="date"><?/*= $value['order_date']*/?></td>
            <td class="order_details">
            <div class="custom-select" style="width:200px;" id="<?/*= $value['id']*/?>">
                <select>
                    <?php /*for($i = 0;$i < count($order);$i++){
                       $name = get_product_name($order[$i]['productId'])[0];
                       echo "<option value= {$order[$i]['productId']}>$name</option>";
                     }*/?>
                </select>
            </div>
            </td>
            <td class="quantity"></td>
<?php
/*            echo '</tr>';
        }
*/?>


<?php
/*endforeach;
require_once 'footer.php';

*/?>
<link rel="stylesheet" href="../css/order.css">

<script src="../js/order.js"></script>
<script src="../js/select.js"></script>-->