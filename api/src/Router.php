<?php
namespace DatepickerAPI;

use DatepickerAPI\Settings\Settings;
use Exception;
use ReflectionClass;

class Router {
    private $method;
    private $request;
    private $params;

    public function __construct($requestUri, $requestMethod) {
        $this->method = $requestMethod;
        $this->parse($requestUri);
    }

    private function parse($requestUri) {
        $requestPieces = explode('/', $this->trim($requestUri));
        $this->request = array_shift($requestPieces);
        $this->params = $requestPieces;
    }

    private function trim($requestUri) {
        return substr($requestUri, 0, 1) === '/' ? substr($requestUri, 1) : $requestUri;
    }

    public function validate() {
        if (!isset($this->request)) {
            $this->respond(400, 'Request is not specified');
        }

        if (!class_exists(sprintf('DatepickerAPI\\Handlers\\%sHandler', $this->request))) {
            $this->respond(404, 'Unknown request: ' . $this->request);
        }

        $reflection = new ReflectionClass(sprintf('DatepickerAPI\\Handlers\\%sHandler', $this->request));

        if ($reflection->isAbstract()) {
            $this->respond(404, 'Unknown request');
        }

        if (!in_array($this->method, $reflection->getMethod('getValidRequestMethods')->invoke(null))) {
            $this->respond(400, 'Method is not supported by the given call');
        }

        if (count($reflection->getMethod('getParamRequirements')->invoke(null)) != count($this->params)) {
            $this->respond(400, 'Wrong parameter count');
        }
    }

    public function execute() {
        try {
            $this->fulfillRequest();
        } catch (Exception $e) {
            $this->respond(500, $e->getMessage());
        }
    }

    private function fulfillRequest() {
        $reflection = new ReflectionClass(sprintf('DatepickerAPI\\Handlers\\%sHandler', $this->request));
        $handler = $reflection->getMethod('instantiate')->invoke(null, $this->params);
        $result = $handler->handle();
        $this->respond(200, json_encode($result));
    }

    private function respond($code, $message) {
        $encodedMessage = json_encode($message);
        header('Content-Type: application/json');
        header('Content-Length: ' . strlen($encodedMessage));
        header('Content-MD5: ' . md5($encodedMessage));
        header('Access-Control-Allow-Origin: ' . Settings::APP_HOST);
        header('Access-Control-Allow-Credentials: true');
        header('Status: ' . $code);
        echo($encodedMessage);
        ob_end_flush();
        flush();
        exit;
    }
}
