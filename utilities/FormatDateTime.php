<?php

namespace App\Utilities;

use function PHPUnit\Framework\isNull;

class FormatDateTime
{
    /**
     * Format date to database
     *
     * @param string $date
     * @return string
     */
    public static function formatDashYMD(string $date)
    {
        if(!$date){
            return $date;
        }

        return date('Y-m-d', strtotime($date));
    }

    /**
     * Format and replace date to database
     *
     * @param string $date
     * @return string
     */
    public static function formatSlashToDashYMD(string $date)
    {
        if(!$date){
            return $date;
        }

        return FormatDateTime::formatDashYMD(str_replace('/', '-', $date));
    }

    /**
     * Format date indonesia
     *
     * @param string $date
     * @return string
     */
    public static function formatDashDMY(string $date)
    {
        if(!$date){
            return $date;
        }

        return date('d-m-Y', strtotime($date));
    }

    /**
     * Format datetime database
     *
     * @param string $date
     * @return string
     */
    public static function formatDashYMDHis(string $date)
    {
        if(!$date){
            return $date;
        }

        return date('Y-m-d H:i:s', strtotime($date));
    }

    /**
     * Format datetime slash indonesia
     *
     * @param string $date
     * @return string
     */
    public static function formatSlashDMY(string $date)
    {
        if(!$date){
            return $date;
        }

        return date('d/m/Y', strtotime($date));
    }

    /**
     * Format time to H:i:s
     *
     * @param string $time
     * @return string
     */
    public static function formatTimeHis(string $time)
    {
        if (!$time) {
            return $time;
        }

        return date('H:i:s', strtotime($time));
    }

    /**
     * Format datetime custom
     *
     * @param string $date
     * @param string $format
     * @return string
     */
    public static function formatCustom(string $date, string $format = 'Y-m-d')
    {
        return date($format, strtotime($date));
    }

    /**
     * Format datetime slash indonesia
     *
     * @param string $date
     * @return string
     */
    public static function formaSpaceDMYIndonesia(string $date)
    {
        if(!$date){
            return $date;
        }

        $exp = explode('-', date('d-m-Y', strtotime($date)));
        return $exp[0] .' '.indonesianMonth($exp[1]).' '.$exp[2];
    }
}
