<?php

namespace App\Console\Commands;

use App\Http\Controllers\SourceApiController;
use App\Models\Category;
use App\Models\Keyword;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpScience\TextRank\TextRankFacade;
use PhpScience\TextRank\Tool\StopWords\English;

class UpdateOrFillNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-or-fill-news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fills or updates articles in the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->components->info("Command started");

        $beforeSize = News::all()->count();
        // for getting information about the amount in beginning

        $sourceApiController = new SourceApiController();

        $articles = $sourceApiController->fetchArticlesList();

        if (gettype($articles) == "string") {

            // IF the type of articles is string, it means that error occurred
            $this->components->error($articles);
            return;

        }

        // get Articles from Selected APIs

        foreach ($articles as &$article) {

            if ($article['category'] != "") {

                $category = Category::firstOrCreate(["name" => $article['category']]);
                // if we have similar category we just get id, otherwise create

                $article['category_id'] = $category->id;
            }

            unset($article['category']);
            // removing unnecessary category field

            $publish_date = Carbon::parse($article['published_at']);

            // parsing data then converting to MySQL format

            $article['published_at'] = $publish_date->toDate()->format("Y-m-d");

            $news = News::firstOrCreate($article);
            // creating or getting id of existing article
            // we do it because it will be too redundant if we will store duplicates


            // generating keywords
            $text = $news->title . " " . $news->description;

            $textRankFacade = new TextRankFacade();
            // English implementation for stopwords/junk words:
            $stopWords = new English();
            $textRankFacade->setStopWords($stopWords);

            // Array of the most important keywords sliced to 5 elements,
            // so each article will has at most 5 keywords
            $keywords = $textRankFacade->getOnlyKeyWords($text);

            foreach ($keywords as $keyword => $val) {

                $newKeyword = Keyword::firstOrCreate(["name" => $keyword]);
                // create or get existing keyword

                DB::table('keyword_news')->insertOrIgnore([
                    "keyword_id" => $newKeyword->id,
                    "news_id" => $news->id
                ]);
                // either insert if there is already this pair then ignore
            }
        }
        $afterSize = News::all()->count();
        // Amount of all articles - amount that was in the beginning
        // = inserted amount of records
        $this->components->info("Added " . ($afterSize - $beforeSize) . " record(s)!");
        $this->components->info("Command End");
    }
}
