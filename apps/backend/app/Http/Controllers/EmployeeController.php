<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $employees = Employee::all();
            $response = [
                'success' => true,
                'data' => $employees,
                'message' => 'Employees fetched successfully.'
            ];
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching employees.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'email' => 'required|email|max:50|unique:employees',
                'last_name' => 'required|string|max:100',
                'first_name' => 'required|string|max:100',
                'gender' => 'nullable|string|max:10',
                'birthday' => 'nullable|date',
                'date_hired' => 'required|date',
                'salary' => 'nullable|numeric'
            ]);

            $employee = Employee::create($validatedData);
            $response = [
                'success' => true,
                'data' => $employee,
                'message' => 'Employee created successfully.'
            ];

            return response()->json($response, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while saving the data of employee.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /*
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $employees = Employee::FindOrFail($id);
            return response()->json($employees, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching employee.',
                'employee_id' => $id,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $employees = Employee::FindOrFail($id);

            $validatedData = $request->validate([
                'email' => 'required|email|max:50|unique:employees,email',
                'last_name' => 'required|string|max:100',
                'first_name' => 'required|string|max:100',
                'gender' => 'nullable|string|max:10',
                'birthday' => 'nullable|date',
                'date_hired' => 'required|date',
                'salary' => 'nullable|numeric'
            ]);

            $employees->update($validatedData);
            return response()->json($employees, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating employee.',
                'employee_id' => $id,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $employees = Employee::FindOrFail($id);
            $employees->delete();
            return response()->json([
                'message' => 'Employee deleted successfully.',
                'employee_id' => $id
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting employee.',
                'employee_id' => $id,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
