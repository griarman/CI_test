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
        $query = $id === null ? $this->db->get('products'): $this->db->get_where('products',['cat_id' => $id]);
        return $query->result_array();
    }
    public function get_images($id)
    {
        $query = $this->db->get_where('images',['prod_id' => $id]);
        return $query->result_array();
    }

}