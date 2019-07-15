<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Http\Requests\CompanyRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Services\API\CompaniesService;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $companies =  Company::all();
       foreach($companies as $company) {
           $company->logo = CompaniesService::getLogoPath($company);
       }
       return response()->json($companies->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CompanyRequest $request)
    {
        $company = new Company;
        CompaniesService::addData($company, $request);
        return response()->json('Company added succesfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $company = Company::find($id);
        if ($company) {
            $company->logo = CompaniesService::getLogoPath($company);
            return $company->toJson();
        }
        return response()->json([
            'error' => 'Company with such id does not exist',
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CompanyRequest $request, $id)
    {
        $company = Company::find($id);
        if ($company) {
            CompaniesService::addData($company, $request, true);
            return response()->json('Company updated succesfully');
        }
        return response()->json([
            'error' => 'Company with such id does not exist',
        ], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Company::find($id);
        if ($company) {
            if ($company->logo) {
                Storage::delete('public/logos/'.$company->logo);
            }
            $company->delete();
            return response()->json('Company deleted succesfully');
        }
        return response()->json([
            'error' => 'Company with such id does not exist',
        ], 404);
    }
}
