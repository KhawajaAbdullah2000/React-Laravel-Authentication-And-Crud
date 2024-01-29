<?php

namespace App\Http\Controllers;

use App\Models\User;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $req)
    {
        $credentials = $req->validated();
        if (!Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }
        /** @var User $user  */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ], 200);
    }


    public function signup(SignupRequest $req)
    {
        $data = $req->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $req)
    {
        /** @var User $user  */
        $user = $req->user();
        $user->currentAccessToken()->delete();
        return response([
            'content' => ''
        ], 204);
    }

    public function get_users($id){
        $users=User::all();
        return response()->json([
            "success"=>true,
            "users"=>$users
        ],200);
    }
}
