<?php
/******************************************************
*  Author: Doe 
*  Date: 03/28/2018
*  Purpose: Backend.
*******************************************************/

class Rentals {

    function __construct()
    {
        $this->url = 'http://rentcafe.com/rentcafeapi.aspx?requestType=apartmentavailability&APIToken=NDY5OTI%3d-XDY6KCjhwhg%3d&propertyCode=p0155985';
        $this->filename = 'data.json';
    }

    function get_json() {
        //Let's double check that the file has data.
        $data = file_get_contents($this->filename);
        echo $data; 
    }


    function write_data_to_file() {
        $json = file_get_contents( $this->url );
        $time = time();
        file_put_contents( $this->filename, $json );
    }

    function save_to_cachefile() {

        // If our file exists, lets check the cache.
        if ( file_exists( $this->filename ) ) {
            $file_time = filemtime( $this->filename );
            $expire = 10; 

            // If our time is over ten minutes lets rewrite the data.
            if ( $file_time < ( time() - $expire ) ) {
                $this->write_data_to_file();
            }

        // If file does not exist, write to file
        } else {
            $this->write_data_to_file();
        }   

    }

}

$rentals = new Rentals();
$rentals->save_to_cachefile();
$rentals->get_json();