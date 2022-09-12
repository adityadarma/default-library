<?php

namespace App\Utilities;

class FormatCurrency
{
    public static function convertToCurrency ($value)
    {
        return number_format($value, 0, ',', '.');
    }
    
    public static function reverseToDecimal ($value)
    {
        if (strlen($value) > 3) {
            $number = '';
            $arrValues = explode('.', $value);
            foreach ($arrValues as $value) {
                $number .= $value;
            }
            return $number;
        }
        return $value;
    }
}