<?php

namespace App\Http\Services\API;


class EmployeesService
{
    /**
     * Adding data to employee
     *
     */
    public static function addData($employee, $request) {
        $employee->first_name = $request->input('first_name');
        $employee->last_name = $request->input('last_name');
        $employee->company_id = $request->input('company_id');
        $employee->email = $request->input('email');
        $employee->phone = $request->input('phone');
        $employee->save();
    }
}