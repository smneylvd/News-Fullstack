<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Models\Category;
use App\Models\Keyword;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use PhpScience\TextRank\TextRankFacade;
use PhpScience\TextRank\Tool\StopWords\English;


class NewsController extends Controller
{
    public function index()
    {
        return response()->json(News::query()->orderByDesc('published_at')->get());
    }

    public function filterNews(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'q' => 'string', // keywords
            'category' => 'string', // category ids
            'date_from' => 'date', // [ x < publication_date ]
            'date_to' => 'date', // [ publication_date > y ]
            'source' => 'string', // sources ids
        ]);

        if ($validator->fails()) {
            return response($validator->errors()->first(), 400);
        }

        $keywords = $request->filled('q') ? explode(" ", $request->q) : null;
        $categories = $request->filled('category') ? explode(",", $request->category) : null;
        $startDate = $request->filled('date_from') ? Carbon::parse($request->date_from) : Carbon::now()->subYears(100);
        $endDate = $request->filled('date_to') ? Carbon::parse($request->date_to) : Carbon::now();
        $sources = $request->filled('source') ? explode(",", $request->source) : null;

        $filteredNews = News::when($keywords, function ($query) use ($keywords) {
            $query->where(function ($q) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $q->orWhereHas('keywords', function ($innerQ) use ($keyword) {
                        $innerQ->where('name', 'LIKE', '%' . $keyword . '%');
                    });
                }
            });
        })
            ->when($categories, function ($query) use ($categories) {
                $query->whereHas('category', function ($q) use ($categories) {
                    $q->whereIn('name', $categories);
                });
            })
            ->when($startDate || $endDate, function ($query) use ($startDate, $endDate) {

                $query->whereBetween('published_at', [$startDate, $endDate]);
            })
            ->when($sources, function ($query) use ($sources) {
                $query->whereHas('source', function ($q) use ($sources) {
                    $q->whereIn('name', $sources);
                });
            })
            ->get();

        return response()->json($filteredNews);
    }

    public function view(Request $request, $item)
    {
        $user = $request->user();
        return response()->json(News::query()->where('id', $item)->with('comments')->firstOrFail());
    }

    public function updateDatabase()
    {
        $beforeSize = News::all()->count();
        // for getting information about the amount in beginning

        $sourceApiController = new SourceApiController();

        $articles = $sourceApiController->fetchArticlesList();

        if (gettype($articles) == "string") {
            throw new HttpException(500, $articles);
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

            $article['published_at'] = $publish_date->toDate()->format("Y-m-d, H:i");

            $news = News::firstOrCreate([
                'title' => $article['title'],
                'description' => $article['description']
            ], $article);
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
        return response()->json("Added " . ($afterSize - $beforeSize) . " record(s)!");
    }

}
