<?php

namespace App\Http\Services\API;

use Illuminate\Support\Facades\Storage;

class CompaniesService
{
    /**
     * Create full path for company logo image
     *
     * @return string
     */
    public static function getLogoPath($company) {
        $fullPath = url('/storage/logos');
        return $company->logo ? $fullPath . '/' . $company->logo : $fullPath . '/default.png';
    }

    /**
     * Adding data to company
     *
     */

    public static function addData($company, $request, $isUpdate = false)
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