<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Mail\VerifyEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    // Đăng ký tài khoản bình thường
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',       // Ít nhất 1 chữ hoa
                'regex:/[0-9]/',       // Ít nhất 1 số
                'regex:/[@$!%*#?&]/',  // Ít nhất 1 ký tự đặc biệt
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => $validator->errors()
            ], 422);
        }

        // Tạo user nhưng chưa active
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'status'   => 'inactive', // Chỉ active sau khi verify
        ]);

        // Tạo link verify (dùng route riêng)
        $verifyUrl = url('/api/email/verify/' . $user->id . '/' . sha1($user->email));

        // Gửi mail verify
        Mail::to($user->email)->send(new VerifyEmail($verifyUrl, $user->name));

        return response()->json([
            'status'  => true,
            'message' => 'Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản!',
            'user'    => $user,
        ]);
    }

    public function verifyEmail($id, $hash)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'Người dùng không tồn tại',
            ], 404);
        }

        // Kiểm tra hash có khớp email không
        if ($hash !== sha1($user->email)) {
            return response()->json([
                'status'  => false,
                'message' => 'Liên kết xác thực không hợp lệ',
            ], 400);
        }

        // Nếu đã xác thực rồi
        if ($user->email_verified_at) {
            return response()->json([
                'status'  => true,
                'message' => 'Email đã được xác thực trước đó',
            ]);
        }

        // Cập nhật trạng thái xác thực
        $user->email_verified_at = now();
        $user->status = 'active';
        $user->save();

        return response()->json([
            'status'  => true,
            'message' => 'Xác thực email thành công!',
        ]);
    }

    public function resendVerifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'Không tìm thấy tài khoản với email này',
            ], 404);
        }

        if ($user->email_verified_at) {
            return response()->json([
                'status'  => true,
                'message' => 'Email đã được xác thực trước đó, không cần gửi lại',
            ]);
        }

        // Tạo lại link verify
        $verifyUrl = url('/api/email/verify/' . $user->id . '/' . sha1($user->email));

        // Gửi mail verify
        Mail::to($user->email)->send(new VerifyEmail($verifyUrl, $user->name));

        return response()->json([
            'status'  => true,
            'message' => 'Đã gửi lại email xác nhận, vui lòng kiểm tra hộp thư!',
        ]);
    }
    // Đăng nhập bình thường
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status'  => false,
                'message' => 'Sai email hoặc mật khẩu'
            ], 401);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Đăng nhập thành công',
            'user'    => $user,
        ]);
    }

    // Đăng nhập bằng Google
    public function loginWithGoogle(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'google_id' => 'required|string',
            'email'     => 'required|email',
            'name'      => 'required|string|max:255',
            'avatar'    => 'nullable|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => $validator->errors()
            ], 422);
        }
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user) {
            // Nếu chưa có user -> tạo mới
            $user = User::create([
                'google_id' => $request->google_id,
                'name'      => $request->name,
                'email'     => $request->email,
                'avatar'    => $request->avatar,
                'status'    => 'active',
                'password'  => Hash::make(Str::random(16)), // random password
            ]);
        } else {
            // Nếu đã có user nhưng chưa có google_id -> cập nhật
            if (!$user->google_id) {
                $user->update([
                    'google_id' => $request->google_id,
                    'avatar'    => $request->avatar ?? $user->avatar,
                ]);
            }
        }
    
        // Trả về thông tin user
        return response()->json([
            'status'  => true,
            'message' => 'Đăng nhập Google thành công',
            'user'    => $user,
        ]);
    }
    
    public function redirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    // xử lý phản hồi Google (thêm stateless)
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            if (!$googleUser || !$googleUser->getEmail()) {
                throw new \Exception('Không nhận được email từ Google.');
            }

            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'google_id' => $googleUser->getId(),
                    'name' => $googleUser->getName(),
                    'password' => bcrypt(Str::random(24)),
                ]
            );

            $token = $user->createToken('google-token')->plainTextToken;

            // 🔥 Trả về đúng frontend ở cổng 3000
            return redirect("http://127.0.0.1:3000/customer/google-auth?token={$token}&name={$user->name}");
        } catch (\Throwable $th) {
            return redirect("http://127.0.0.1:3000/sign-in?error=" . urlencode($th->getMessage()));
        }
    }



    public function logout(Request $request)
    {
        // Nếu bạn dùng Sanctum hoặc Passport
        if ($request->user()) {
            $request->user()->tokens()->delete(); // xoá toàn bộ token
        }

        // Nếu chỉ dùng session
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'status'  => true,
            'message' => 'Đăng xuất thành công',
        ]);
    }
}
