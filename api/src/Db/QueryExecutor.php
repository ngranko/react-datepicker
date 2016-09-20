<?php
namespace DatepickerAPI\Db;

use ErrorException;
use mysqli_result;
use mysqli_stmt;
use ReflectionClass;

class QueryExecutor {
    public static function executeQuery($sql, $params = []) {
        $preparedStatement = self::getPreparedStatement($sql);
        self::bindParams($preparedStatement, $params);

        if (!$preparedStatement->execute()) {
            throw new ErrorException("There was a problem executing a statement: " . $preparedStatement->error);
        }

        $result = self::getQueryResults($preparedStatement);

        $preparedStatement->close();
        Connector::closeConnection();

        return $result;
    }

    private static function getConnection() {
        return Connector::getConnection();
    }

    private static function getPreparedStatement($sql) {
        $preparedStatement = self::prepareStatement($sql);
        if ($preparedStatement === false) {
            throw new ErrorException("There was a problem creating a statement");
        }
        return $preparedStatement;
    }

    private static function prepareStatement($sql) {
        $connection = self::getConnection();
        return $connection->prepare($sql);
    }

    private static function bindParams($preparedStatement, $params) {
        if (count($params)) {
            $reflection = new ReflectionClass('mysqli_stmt');
            $reflection->getMethod("bind_param")->invokeArgs($preparedStatement, self::turnIntoReferences($params));
        }
    }

    private static function turnIntoReferences($params) {
        $binderList = [];
        for ($i = 0; $i < count($params); $i++) {
            $binderList[] = &$params[$i];
        }

        return $binderList;
    }

    private static function getQueryResults(mysqli_stmt $preparedStatement) {
        $result = $preparedStatement->get_result();
        return $result instanceof mysqli_result ? $result->fetch_all(MYSQLI_ASSOC) : $result;
    }
}
