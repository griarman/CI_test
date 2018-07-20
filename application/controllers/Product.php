<?php
/**
 * Created by PhpStorm.
 * User: grigo
 * Date: 18/07/2018
 * Time: 02:55
 */
defined('BASEPATH') OR exit('No direct script access allowed');
class Product extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('Product_model');
        $this->load->library('session');
        $this->load->library('encrypt');
    }

}