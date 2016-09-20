<?php
namespace DatepickerAPI\Handlers;

interface RequestHandler {
    public static function getValidRequestMethods();

    public static function getParamRequirements();

    public function handle();
}
