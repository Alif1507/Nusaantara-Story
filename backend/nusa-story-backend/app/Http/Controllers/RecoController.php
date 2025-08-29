<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class RecoController extends Controller
{
    public function recommend(Request $r) {
        $svc = env('RECO_SERVICE_URL','http://localhost:8081');
        $client = new Client(['base_uri'=>$svc, 'timeout'=>8]);

        $res = $client->post('/recommend', [
            'json' => [
                'query'   => (string)$r->input('query',''),
                'top_k'   => (int)$r->input('top_k',5),
                'filters' => $r->input('filters', null),
            ]
        ]);
        return response()->json(json_decode($res->getBody()->getContents(), true));
    }
}