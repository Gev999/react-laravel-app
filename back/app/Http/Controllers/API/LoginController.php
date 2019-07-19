<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /**
     * Return generated access_token of user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback(Request $request) {
        $existingUser = User::where('email', $request->email)->first();
        if (!$existingUser) {
            $newUser                    = new User;
            $newUser->provider_name     = $requset->provider;
            $newUser->provider_id       = $request->googleId;
            $newUser->name              = $request->name;
            $newUser->email             = $request->email;
            $newUser->email_verified_at = now();
            $newUser->avatar            = $request->imageUrl;
            $newUser->save();
        }

        $token = JWTAuth::fromUser($existingUser ? $existingUser : $newUser);
        return response()->json(['access_token'=>$token]);
    }
}