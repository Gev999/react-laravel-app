<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Http\Requests\CheckEmployeeData;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Employee::all()->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CheckEmployeeData $request)
    {
        $employee = new Employee;
        self::addEmployeeData($employee, $request);
        return response()->json('Employee added succesfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = Employee::find($id);
        if ($employee) {
            return $employee->toJson();
        }
        return response()->json(['error' => 'Employee with such id does not exist'], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CheckEmployeeData $request, $id)
    {
        $employee = Employee::find($id);
        if ($employee) {
            self::addEmployeeData($employee, $request);
            return response()->json('Employee updated succesfully');
        } 
        return response()->json(['error' => 'Employee with such id does not exist'], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);
        if ($employee) {
            $employee->delete();
            return response()->json('Employee deleted succesfully');
        }
        return response()->json(['error' => 'Employee with such id does not exist'], 404);
    }

    private function addEmployeeData($employee, $request) {
        $employee->first_name = $request->input('first_name');
        $employee->last_name = $request->input('last_name');
        $employee->company_id = $request->input('company_id');
        $employee->email = $request->input('email');
        $employee->phone = $request->input('phone');
        $employee->save();
    }
}
