<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class StudyRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('study_records')->insert([
            'user_id' => 1,
            'date' => now(),
            'time' => 120,
            'title' => 'study_record1',
            'body' => 'テスト',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('study_records')->insert([
            'user_id' => 2,
            'date' => now(),
            'time' => 100,
            'title' => 'study_record2',
            'body' => 'テスト',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
    }
}
