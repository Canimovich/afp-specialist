<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Models\Pensioner;
use App\Http\Controllers\PensionerController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//http://localhost:8000/api/test
Route::get('/test', function () {
    return 'Hello, from Laravel!';
});

//http://localhost:8000/api/employees
Route::get('/employees', [EmployeeController::class, 'index']);
Route::post('/employees', [EmployeeController::class, 'store']);
//http://localhost:8000/api/employees/2
Route::get('/employees/{id}', [EmployeeController::class, 'show']);
Route::put('/employees/{id}', [EmployeeController::class, 'update']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
//http://localhost:8000/api/pensioner
Route::get('/pensioner', [PensionerController::class, 'index']);
Route::post('/pensioner', [PensionerController::class, 'store']);
//http://localhost:8000/api/pensioner/2
Route::get('/pensioner/{id}', [PensionerController::class, 'show']);
Route::put('/pensioner/{id}', [PensionerController::class, 'update']);
Route::delete('/pensioner/{id}', [PensionerController::class, 'destroy']);
