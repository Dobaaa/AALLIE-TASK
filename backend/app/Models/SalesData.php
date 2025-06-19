<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesData extends Model
{
    protected $table = 'sales_data';

    protected $fillable = [
        'product_name',
        'q1_sales',
        'q2_sales',
        'q3_sales',
        'q4_sales',
        'target'
    ];

    protected $casts = [
        'q1_sales' => 'decimal:2',
        'q2_sales' => 'decimal:2',
        'q3_sales' => 'decimal:2',
        'q4_sales' => 'decimal:2',
        'target' => 'decimal:2',
    ];
}
