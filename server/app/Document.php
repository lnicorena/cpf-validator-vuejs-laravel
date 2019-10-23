<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Document extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'documents';

     protected $fillable = [
        'document', 'active', 'blacklist'
    ];
   
}
