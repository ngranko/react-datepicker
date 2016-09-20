<?php
namespace DatepickerAPI\Handlers;

use DatepickerAPI\Db\QueryExecutor;

class GetReservedDaysHandler extends AbstractRequestHandler {
    protected static $paramRequirements = [
        'year',
        'month',
    ];

    public static function getValidRequestMethods() {
        return ['GET'];
    }

    public function handle() {
        $sql = 'select `day` from `days_reserved` where `year` = ? and `month` = ?';
        $params = ['ii', $this->params['year'], $this->params['month']];
        $result = QueryExecutor::executeQuery($sql, $params);
        return array_column($result, 'day');
    }
}
