<?php

session_start();
unset($_SESSION['true']);
header('Location:index.php');