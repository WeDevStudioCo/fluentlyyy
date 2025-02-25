<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        /** @var \App\Models\User */
        $user = Auth::user();

        if (!Auth::check() || !$user->hasRole($role)) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}