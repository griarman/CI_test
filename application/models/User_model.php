<?php
/**
 * Created by PhpStorm.
 * User: grigo
 * Date: 25/04/2018
 * Time: 16:54
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model
{
    public function getUser($login,$password)
    {
        $password = md5($password);
        /*$response = $this->db->query("SELECT * FROM admin WHERE login = ? AND password = ?", array(
            $login,$password
        ));*/
        $response = $this->db->get_where('admin', [
            'login' => $login,
            'password' => $password
        ]);

        return $response->num_rows() ? $response->row_array() : null;
    }
}