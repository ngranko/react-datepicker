<?php
namespace DatepickerAPI\Db;

use DatepickerAPI\Settings\Settings;
use ErrorException;
use mysqli;

class Connector {
    /** @var mysqli $connection */
    private static $connection;

    public static function getConnection() {
        self::checkAlive();

        if (!isset(self::$connection)) {
            self::$connection = self::connect();
        }

        return self::$connection;
    }

    private static function checkAlive() {
        if (isset(self::$connection)) {
            if (!self::$connection->ping()) {
                self::closeConnection();
            }
        }
    }

    private static function connect() {
        if (!class_exists('mysqli')) {
            throw new ErrorException("Mysqli is not available.");
        }

        $connection = new mysqli(Settings::DATABASE_HOST,Settings::DATABASE_USER, Settings::DATABASE_PASSWORD, Settings::DATABASE_NAME);

        if (mysqli_connect_errno() !== 0) {
            throw new ErrorException(mysqli_connect_error());
        }

        return $connection;
    }

    public static function closeConnection() {
        if (isset(self::$connection)) {
            self::$connection->close();
            self::$connection = null;
        }
    }
}
