<?php
namespace DatepickerAPI\Handlers;

abstract class AbstractRequestHandler implements RequestHandler  {
    protected $params;

    protected static $paramRequirements;

    private function __construct() {
    }

    public static function instantiate($params) {
        $handler = new static();
        $handler->mapParams($params);
        return $handler;
    }

    private function mapParams($params) {
        $this->params = array_combine(static::getParamRequirements(), $params);
    }

    public static function getParamRequirements() {
        return static::$paramRequirements;
    }
}
