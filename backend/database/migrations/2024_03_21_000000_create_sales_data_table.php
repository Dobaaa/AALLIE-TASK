<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('sales_data', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->decimal('q1_sales', 10, 2);
            $table->decimal('q2_sales', 10, 2);
            $table->decimal('q3_sales', 10, 2);
            $table->decimal('q4_sales', 10, 2);
            $table->decimal('target', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_data');
    }
};