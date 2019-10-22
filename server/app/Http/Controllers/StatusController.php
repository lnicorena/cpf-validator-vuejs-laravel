<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Log;
use App\Http\Helpers\Server;


class StatusController extends Controller
{
    
    public function getInfo(Request $request)
    {
        
        $logs = Log::where('uptime', '=', Server::getUptimeInteger())->get();

        $stats = [];

        $stats['uptime'] = Server::getUptimeString();

        $stats['requests'] = array_map(function ($log) {
            return array_filter($log, function($key){
                return in_array($key, ["uri", "method", "count", "last_request", "last_ip"]);
            }, ARRAY_FILTER_USE_KEY);
        }, $logs->toArray());

        return response()->json($stats, 200);
    }
}
