<!DOCTYPE html>
<html>
<head>
    <title>Log In</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="/store/css/bootstrap.min.css">
    <link rel="icon" href="/store/images/favicons/admin_favicon.png">
    <link rel="stylesheet" href="/store/css/admin.css">
</head>
<body>
<form action="/store/index.php/authorization/login" method="post">
    <div>Login</div>
    <div>
        <label for="login">Username <span>*</span></label><br>
        <input type="text" id='login' placeholder="Enter The Username" name="login" required value="Arman">
    </div>
    <div>
        <label for="pass">Password <span>*</span></label><br>
        <input type="password" id="pass" placeholder="Enter The Password" name="password" required autocomplete="off" value="1234">
    </div>
    <button>Log in</button>
</form>
<?php


if (isset($_SESSION['error'])) {
    echo '<div>Wrong login or password</div>';
    unset($_SESSION['error']);
}
?>

</body>
</html>