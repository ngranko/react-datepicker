<?php
namespace DatepickerAPI\Handlers;

use DatepickerAPI\Db\QueryExecutor;

class InsertTestDataHandler extends AbstractRequestHandler {
    protected static $paramRequirements = [];

    public static function getValidRequestMethods() {
        return ['GET'];
    }

    public function handle() {
        for ($i = 0; $i < 100; $i++) {
            $year = 2016 + (int)(rand(0, 1) < 0.5);
            $month = floor(rand(1, 12.9));
            $day = floor(rand(1, 30.9));
            $sql = 'insert ignore into `days_reserved` (`year`, `month`, `day`) values (?, ?, ?)';
            $params = ['iii', $year, $month, $day];
            QueryExecutor::executeQuery($sql, $params);
        }
        return true;
    }
}
