<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users', [
            'users' => User::all()
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate(['role' => 'required|in:admin,staff,kasir']);

        if ($user->id === auth()->id()) {
            return back();
        }

        $user->update(['role' => $request->role]);

        return back();
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) return back();
        $user->delete();
        return back();
    }
}