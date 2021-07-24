<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'tel',
        'dob'
    ];

    protected $casts = [
        'name' => 'string',
        'tel' => 'string',
        'dob' => 'date'
    ];
}
