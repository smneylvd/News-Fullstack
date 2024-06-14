<?php

namespace App\Http\Controllers;

use App\Models\SourceApi;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SourceApiController extends Controller
{
    public function getAllSources() {
        return response()->json(SourceApi::all());
    }

    public function fetchArticlesList(): array|string
    {

        $articles = [];

        $newsAPIs = SourceApi::all();

        foreach ($newsAPIs as $newsAPI) {
            if (!$newsAPI) {
                return "Error: Source not found";
            }

            $response = Http::get($newsAPI->api_url)->json();

            if (isset($response['response'])) {
                $response = $response['response'];
            }

            if (!isset($response['status']) || strtolower($response['status']) != 'ok') {
                return "Error occurred while calling url: " . $newsAPI->api_url;
            }

            try {

                switch ($newsAPI->id) {

                    case 1:
                    {
                        foreach ($response['results'] as $article) {

                            $data = array();

                            $data["title"] = $article["title"];
                            $data["description"] = $article["abstract"] ?? "";
                            $data["author"] = substr($article["byline"], 3) ?? "";
                            $data["original_source_url"] = $article["url"] ?? "";
                            $data["source_id"] = $newsAPI->id;
                            $data["category"] = $articles["section"] ?? $article['nytdsection'] ?? '';
                            $data["published_at"] = $article["published_date"];

                            foreach ($article['media'] as $media) {

                                if ($media['type'] == 'image') {

                                    foreach ($media['media-metadata'] as $mediametadatum) {

                                        if ($mediametadatum['format'] == "mediumThreeByTwo440") {
                                            $data["image_url"] = $mediametadatum["url"];
                                            break;
                                        }

                                    }

                                    break;

                                }

                            }

                            $articles[] = $data;
                        }

                        break;
                    }

                    case 2:
                    {
                        foreach ($response['articles'] as $article) {

                            $data = array();

                            $data["title"] = $article["title"];
                            $data["description"] = $article["description"];
                            $data["author"] = $article["author"] ?? "";
                            $data["original_source_url"] = $article["url"] ?? "";
                            $data["source_id"] = $newsAPI->id;
                            $data["image_url"] = $article["urlToImage"] ?? "";
                            $data["category"] = "";
                            $data["published_at"] = $article["publishedAt"];

                            $articles[] = $data;
                        }

                        break;

                    }

                    case 3:
                    {
                        foreach ($response['results'] as $article) {

                            $data = array();

                            $data["title"] = $article["webTitle"];
                            $data["description"] = $article["fields"]["trailText"] ?? "";
                            $data["image_url"] = $article["fields"]["thumbnail"] ?? "";
                            $data["author"] = $article["fields"]["byline"] ?? "";
                            $data["original_source_url"] = $article["webUrl"];
                            $data["published_at"] = $article["webPublicationDate"];
                            $data["source_id"] = $newsAPI->id;
                            $data["category"] = $article["sectionName"];

                            $articles[] = $data;
                        }

                        break;

                    }
                    default :
                    {
                        return "Error: source not supported";
                    }

                }

            } catch (Exception $e) {
                return $e->getMessage();
            }

        }

        return $articles;
    }

}
