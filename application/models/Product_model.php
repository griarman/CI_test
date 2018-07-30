<?php
/**
 * Created by PhpStorm.
 * User: grigo
 * Date: 18/07/2018
 * Time: 02:58
 */

class Product_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }
    public function get_products($id = null)
    {
        $this->db->order_by('id','desc');
        $query = $id === null ? $this->db->get('products'): $this->db->get_where('products',['cat_id' => $id]);
        return $query->result_array();
    }
    public function get_images($id)
    {
        return $this->db->get_where('images',['prod_id' => $id])->result_array();
    }
    public function count($id = null){
        $query = $id === null ? $this->db->get('products'): $this->db->get_where('products',['cat_id' => $id]);
        return $query -> num_rows();
    }
    public function add_product($name,$price,$description,$cat_id)
    {
        $data = array(
            'name' => $name,
            'price' => $price,
            'description' => $description,
            'cat_id' => $cat_id
        );
        $this->db->insert('products', $data);
        return $this->db->insert_id();
    }
    public function add_image($prod_id,$image)
    {
        $data = array(
            'prod_id' => $prod_id,
            'image' => $image
        );
        $this->db->insert('images', $data);
    }
}