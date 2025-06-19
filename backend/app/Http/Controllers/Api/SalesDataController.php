<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SalesData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SalesDataController extends Controller
{
    public function index()
    {
        try {
            $salesData = SalesData::all();
            return response()->json(['data' => $salesData], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch sales data', 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'q1_sales' => 'required|numeric|min:0',
            'q2_sales' => 'required|numeric|min:0',
            'q3_sales' => 'required|numeric|min:0',
            'q4_sales' => 'required|numeric|min:0',
            'target' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $salesData = SalesData::create($request->all());
            return response()->json(['data' => $salesData, 'message' => 'Sales data created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create sales data', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'q1_sales' => 'required|numeric|min:0',
            'q2_sales' => 'required|numeric|min:0',
            'q3_sales' => 'required|numeric|min:0',
            'q4_sales' => 'required|numeric|min:0',
            'target' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $salesData = SalesData::findOrFail($id);
            $salesData->update($request->all());
            return response()->json(['data' => $salesData, 'message' => 'Sales data updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update sales data', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $salesData = SalesData::findOrFail($id);
            $salesData->delete();
            return response()->json(['message' => 'Sales data deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete sales data', 'message' => $e->getMessage()], 500);
        }
    }
}
