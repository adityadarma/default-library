<?php

namespace App\Services;

use App\Traits\ExceptionCustom;
use App\Traits\ResultService;

class BaseService {
    use ResultService, ExceptionCustom;
}