<?php
/**
 * Created by PhpStorm.
 * User: grigo
 * Date: 18/07/2018
 * Time: 03:15
 */

class Home extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home_model');
    }
    public function add()
    {
        $name = trim($this->input->post('name', true));
        if($this->home_model->check_category($name)){
            echo false;
            die;
        }
        if($result = $this->home_model->add_category($name)){
            echo $result;
        }
    }
    public function upd()
    {
        $name = trim($this->input->post('name', true));
        $id = $this->input->post('id', true);
        if (empty($name) || empty($id)){
            echo false;
            die;
        }
        if($this->home_model->change_category($id,$name)){
            echo true;
            die;
        }
        echo false;
    }
    public function del()
    {
        $id = $this->input->post('id', true);
        if (empty($id)){
            echo false;
            die;
        }
        if($this->home_model->delete_category($id)){
            echo true;
            die;
        }
        echo false;
    }
}