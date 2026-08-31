<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(): JsonResponse { return response()->json(Todo::latest()->get()); }
    public function store(Request $request): JsonResponse
    {
        $todo = Todo::create($request->validate(['title' => ['required', 'string', 'max:255']]));
        return response()->json($todo, 201);
    }
    public function update(Request $request, Todo $todo): JsonResponse
    {
        $todo->update($request->validate(['title' => ['sometimes', 'required', 'string', 'max:255'], 'completed' => ['sometimes', 'boolean']]));
        return response()->json($todo);
    }
    public function destroy(Todo $todo): JsonResponse { $todo->delete(); return response()->json(null, 204); }
}
