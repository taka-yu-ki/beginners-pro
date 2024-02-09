<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudyRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'date' => ['required', 'date'],
            'time' => ['required', 'integer', 'min:1', 'max:1440'],
            'title' => ['required', 'string', 'max:50'],
            'body' => ['required', 'json'],
            'category_id' => ['required', 'exists:categories,id'],
        ];
    }
}
