<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $url;
    public $username;

    public function __construct($url, $username)
    {
        $this->url = $url;
        $this->username = $username;
    }

    public function build()
    {
        return $this->subject('Xác nhận email của bạn')
                    ->markdown('emails.verify');
    }
}
