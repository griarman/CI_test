<?php defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: grigo
 * Date: 25/04/2018
 * Time: 16:22
 */


class Admin extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home_model');
        $this->load->model('product_model');
        $this->load->model('order_model');
        $this->load->library('session');
    }

    public function index()
    {
        $this->load->view('admin/login');
    }
    public function home()
    {
        if(empty($this->session->userdata('login'))){
            redirect('/admin');
            die;
        }
        $arr = $this->session->all_userdata();

        $data['_SESSION'] = $arr;
        $data['categories'] = $this->home_model->get_categories();
        $data['title'] = 'Home';

        $this->load->view('admin/header',$data);
        $this->load->view('admin/home');
        $this->load->view('admin/footer');
    }
    public function product($id = null)
    {
        if(empty($this->session->userdata('login'))){
            redirect('/admin');
            die;
        }
        $data['categories'] = $this->home_model->get_categories();
        $data['products'] = $this->product_model->get_products($id);
        $products = $data['products'];
        foreach($products as $key => $value){
            $data['images'][$value['id']] = $this->product_model->get_images($value['id']);
        }
        if($id === null){
            $data['cat'] = true;
        }
        $data['title'] = 'Products';
        $this->load->view('admin/header',$data);
        $this->load->view('admin/product');
        $this->load->view('admin/footer');

    }
    public function user()
    {
        if(empty($this->session->userdata('login'))){
            redirect('/admin');
            die;
        }
        $data['title'] = 'Users';
        $this->load->view('admin/header',$data);
        $this->load->view('admin/user');
        $this->load->view('admin/footer');
    }
    public function orders()
    {
        if(empty($this->session->userdata('login'))){
            redirect('/admin');
            die;
        }
        $data['title'] = 'Orders';
        $this->load->view('admin/header',$data);
        $this->load->view('admin/orders');
        $this->load->view('admin/footer');
    }
}