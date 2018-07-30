<?php
/**
 * @package Product
 * Created by PhpStorm.
 * User: grigo
 * Date: 18/07/2018
 * Time: 02:55
 */
defined('BASEPATH') OR exit('No direct script access allowed');
class Product extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('product_model');
        $this->load->library('session');
//        $this->load->library('encrypt');
    }
    public function do_upload()
    {
        if($this->input->post('name',true)){
            $name = trim($this->input->post('name', true));
            $price = trim($this->input->post('price', true));
            $description = trim($this->input->post('description', true));
            $cat_id = $this->input->post('cat_id', true);
            if(empty($name) || empty($price) || empty($description) || empty($cat_id))
            {
                return;
            }
            $last_id = $this->product_model->add_product($name,$price,$description,$cat_id);
            if(empty($_FILES)){
               return;
            }
            @mkdir("./images/{$cat_id}/");
            $config['upload_path'] = "./images/{$cat_id}/";
            $config['allowed_types'] = 'jpg|png|gif|JPEG';
//            $config['encrypt_name'] = TRUE;
            $this->load->library('upload', $config);
            $this->upload->initialize($config);
            $temp_files = $_FILES;
            $count = count ($_FILES['images']['name']);
            for ($i = 0; $i < $count; $i++)
            {
                $new_name = date('YmdHis').mt_rand().'.jpg';
                $this->product_model->add_image($last_id,"../images/{$cat_id}/".$new_name);
                $_FILES['file'] = array (
                    'name'=>$new_name,
                    'type'=>$temp_files['images']['type'][$i],
                    'tmp_name'=>$temp_files['images']['tmp_name'][$i],
                    'error'=>$temp_files['images']['error'][$i],
                    'size'=>$temp_files['images']['size'][$i]);
                $this->upload->do_upload('file');
                $tmp_data = $this->upload->data();
                $files_data[$i]['data'] = $tmp_data['full_path'];
            }
            $this->session->set_userdata('success', true);
        }
        redirect('admin/product');
    }
    public function delete()
    {

    }


}