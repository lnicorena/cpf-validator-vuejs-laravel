<?php

namespace App\Http\Helpers;

use Illuminate\Support\Facades\DB;

class Server
{

    /*
     * Get the uptime info from the database local log
     */
    public static function getUptimeString() {
        
        return self::getUptimeInfo()->toDateTime()->format('Y-m-d H:i:s');
    }
    
    public static function getUptimeInteger() {

        return self::getUptimeInfo()->toDateTime()->getTimestamp();
    }

    private static function getUptimeInfo () {

        $uptime = DB::connection('mongodb_local')
        ->collection('startup_log')
        ->orderByDesc('startTime')
        ->get();

        return count($uptime) ? $uptime[0]['startTime'] : false;
    }
    

    /*
     * Get uptime info from web server
     */ 
    public static function getUptimeStringFromServer() {
        
        $data = shell_exec('uptime -s');
        $uptime = trim($data);
        
        return $uptime;
    }

    public static function getUptimeStringPrettyFromServer() {
        $data = shell_exec('uptime -p');
        $uptime = trim($data);
        
        return $uptime;
    }

    public static function getUptimeStringHashFromServer( $str = '' ) {
        return $str ? md5 ($str) : md5 (self::getUptimeString());
    }

}
