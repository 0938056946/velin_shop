<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('address_id')->constrained('addresses')->onDelete('cascade');
            $table->foreignId('shipping_provider_id')->constrained('shipping_providers')->onDelete('cascade');
            $table->decimal('total_amount', 10, 2);

            // Phương thức thanh toán
            $table->enum('payment_method', ['cod', 'momo', 'vnpay'])->default('cod');

            // Trạng thái thanh toán
            $table->enum('payment_status', ['pending', 'success', 'failed'])->default('pending');

            // Mã giao dịch từ MOMO hoặc VNPAY (nếu có)
            $table->string('transaction_id')->nullable();

            // Trạng thái đơn hàng
            $table->enum('status', ['pending','paid','shipped','completed','cancelled'])->default('pending');

            $table->timestamp('order_date')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
