<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shipping_providers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);              // Tên đơn vị giao hàng
            $table->string('contact_phone', 20)->nullable();
            $table->string('website')->nullable();
            $table->decimal('base_fee', 10, 2)->default(0); // phí cơ bản
            $table->enum('status', ['active','inactive'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shipping_providers');
    }
};
