<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:10'],
            'email' => ['required', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'text' => ['nullable','string', 'max:500'],
            'image' => ['nullable', 'file', 'max:1024'],
            'delete_image' => ['nullable', 'boolean'],
            'goal_text' => ['nullable', 'string', 'max:100'],
            'goal_time' => ['nullable', 'integer', 'max:10080'],
        ];
    }
    
    public function messages()
    {
        return [
            'goal_time.max' => '168時間以内で設定してください。',
            'image.max' => '1MB以内で設定してください。'
        ];
    }
}
