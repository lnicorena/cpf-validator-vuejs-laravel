<?php

namespace App\Http\Middleware;

use Closure;

use App\Log;
use App\Http\Helpers\Server;

class LogRoutes
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
       
        $this->logRequestInfo();

        return $next($request);
    }

    private function logRequestInfo () {

        $uri = $_SERVER['REQUEST_URI'];
        $upsince = Server::getUptimeInteger();

        $log = Log::where('uri', '=', $uri)->where('uptime', '=', $upsince)->first();

        if (!$log) {
            $log = new Log();
            $log->uri = $uri;
            $log->uptime = $upsince;
            $log->count = 1;
        }
        else {
            $log->count++;
        }
        $log->last_request = date('Y-m-d H:i:s');
        $log->last_ip = $_SERVER['REMOTE_ADDR'];;
        $log->save();
    }

    
}

