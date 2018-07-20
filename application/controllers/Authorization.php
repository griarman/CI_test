<?php
/**
 * Created by PhpStorm.
 * User: grigo
 * Date: 25/04/2018
 * Time: 16:32
 */
defined('BASEPATH') OR exit('No direct script access allowed');
class Authorization extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->library('session');
    }
    public function logIn(){
        $login = trim($this->input->post('login', true));
        $password = $this->input->post('password', true);

        if(empty($login) || empty($password)){
           $this->output->set_status_header(403);
           $this->output->set_output('Login and password are required')->_display();
           die;
        }
        $answer = $this->user_model->getUser($login,$password);
        if(!$answer){
            $this->session->sess_destroy();
            redirect('/admin');
        }
        else{
            $arr = ['login' => $login];
            $this->session->set_userdata($arr);
            redirect('/admin/home');
//          redirect('admin/home','refresh');
        }
    }
    public function logOut()
    {
        $this->session->sess_destroy();
        redirect('/admin');
    }
}