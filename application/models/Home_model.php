<?php
/**
 * Created by PhpStorm.
 * User: grigo
 * Date: 18/07/2018
 * Time: 03:15
 */
defined('BASEPATH') OR exit('No direct script access allowed');
class Home_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }
    public function get_categories()
    {
        return $this->db->get('categories')->result_array();
    }
    public function check_category($name)
    {
        return $this->db->get_where('categories',['name' => $name])->num_rows();

    }
    public function add_category($name)
    {
        $data = ['name' => $name];
        return $this->db->insert('categories',$data)?$this->db->insert_id():null;
    }
    public function change_category($id,$name)
    {
        $data = array(
            'name' => $name,
        );
        $this->db->where('id', $id);
        return $this->db->update('categories', $data);
    }
    public function delete_category($id)
    {
        $this->db->where('id', $id);
        return $this->db->delete('categories');

    }
}