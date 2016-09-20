<?php
require_once (__DIR__ . '/../vendor/autoload.php');

use DatepickerAPI\Router;

$router = new Router($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
$router->validate();
$router->execute();
