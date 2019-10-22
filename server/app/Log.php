<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Log extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'serverlog';
    
    protected $fillable = [
        'uri', 'uptime', 'count', 'last_request', 'last_ip'
    ];
}
