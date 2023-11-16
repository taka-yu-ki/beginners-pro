<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            StudyRecordSeeder::class,
            NoteRecordSeeder::class,
            CategorySeeder::class,
            UserSeeder::class,
        ]);
    }
}
