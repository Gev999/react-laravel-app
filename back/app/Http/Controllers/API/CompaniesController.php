<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Http\Requests\CheckCompanyData;
use Illuminate\Support\Facades\Storage;

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
           $company->logo = self::getLogoPath($company);
       }
       return $companies->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CheckCompanyData $request)
    {
        $company = new Company;
        self::addData($company, $request);
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
            $company->logo = self::getLogoPath($company);
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
    public function update(CheckCompanyData $request, $id)
    {
        $company = Company::find($id);
        if ($company) {
            self::addData($company, $request, true);
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

    private function getLogoPath($company) {
        $fullPath = url('/storage/logos');
        return $company->logo ? $fullPath . '/' . $company->logo : $fullPath . '/default.png';
    }

    private function addData($company, $request, $isUpdate = false)
    {
        if ($request->logo) {
            $fileNameWithExt = $request->logo->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $extension = $request->logo->getClientOriginalExtension();
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            $path = $request->logo->storeAs('public/logos', $fileNameToStore);
            if ($isUpdate) {
                if ($company->logo) {
                    Storage::delete('public/logos/'.$company->logo);
                }
            }
            $company->logo = $fileNameToStore;
        }

        $company->name = $request->input('name');
        $company->email = $request->input('email');
        $company->website = $request->input('website');
        $company->save();
    }
}
