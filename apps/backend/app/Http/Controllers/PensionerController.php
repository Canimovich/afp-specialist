<?php

namespace App\Http\Controllers;

use App\Models\Pensioner;
use Illuminate\Http\Request;

class PensionerController extends Controller
{
    public function index(Request $request)
    {
        try {
            $pensioners = Pensioner::all();
            $response = [
                'success' => true,
                'data' => $pensioners,
                'message' => 'Pensioners fetched successfully.'
            ];
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching pensioners.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function store(Request $request)
    {
        try {
            //validation
            $validatedData = $request->validate([
                'control_number' => 'required|string|max:20|unique:pensioners',
                'serial_number' => 'required|string|max:10|unique:pensioners',
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'middle_name' => 'nullable|string|max:255',
                'pension_account' => 'required|string|max:20',
                'rank' => 'nullable|string|max:20',
                'bank_name' => 'nullable|string|max:50',
                'amount_centavos' => 'required|integer|min:0',
                'retirement_date' => 'required|date'
            ]);

            $pensioner = Pensioner::create($validatedData);
            //insert into employees (last_name, first) values ('Doe', 'John');
            $response = [
                'success' => true,
                'data' => $pensioner,
                'message' => 'Pensioner created successfully.'
            ];
            return response()->json($response, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while saving employee.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $pensioner = Pensioner::FindOrFail($id);
            return response()->json($pensioner, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching pensioner.',
                'pensioner_id' => $id,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $pensioner = Pensioner::FindOrFail($id);

            //validation
            $validatedData = $request->validate([
                'control_number' => 'required|string|max:20|unique:pensioners',
                'serial_number' => 'required|string|max:10|unique:pensioners',
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'middle_name' => 'nullable|string|max:255',
                'pension_account' => 'required|string|max:20',
                'rank' => 'nullable|string|max:20',
                'bank_name' => 'nullable|string|max:50',
                'amount_centavos' => 'required|integer|min:0',
                'retirement_date' => 'required|date'
            ]);

            $pensioner->update($validatedData);

            return response()->json($pensioner, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating pensioner.',
                'pensioner_id' => $id,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $pensioner = Pensioner::FindOrFail($id);
            $pensioner->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pensioner deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting pensioner.',
                'pensioner_id' => $id,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
