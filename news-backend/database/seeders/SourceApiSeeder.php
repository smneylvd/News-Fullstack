<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SourceApi;

class SourceApiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SourceApi::factory()->create([
            'id' => 1,
            'name' => 'New York Times',
            'api_url' => 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=H6p7sP1rKi09km3YwXTHZmQCqVD4DVXy',
        ]);
        SourceApi::factory()->create([
            'id' => 2,
            'name' => 'News Api',
            'api_url' => 'https://newsapi.org/v2/everything?q=*&page_size=100&apiKey=3c842641cb494d3588bc80526e94ab76',
        ]);
        SourceApi::factory()->create([
            'id' => 3,
            'name' => 'Guardian',
            'api_url' => 'https://content.guardianapis.com/search?api-key=test&page-size=50&type=article&show-fields=trailText,thumbnail,byline',
        ]);
    }
}
