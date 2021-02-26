PHP Cheat Sheet
======================

### Dump Prepared SQL statement for debugging
[PHP Manual Comment](http://php.net/manual/en/pdostatement.debugdumpparams.php)
```
<?php
    function parms($string,$data) {
        $indexed=$data==array_values($data);
        foreach($data as $k=>$v) {
            if(is_string($v)) $v="'$v'";
            if($indexed) $string=preg_replace('/\?/',$v,$string,1);
            else $string=str_replace(":$k",$v,$string);
        }
        return $string;
    }

    //    Index Parameters
        $string='INSERT INTO stuff(name,value) VALUES (?,?)';
        $data=array('Fred',23);

    //    Named Parameters
        $string='INSERT INTO stuff(name,value) VALUES (:name,:value)';
        $data=array('name'=>'Fred','value'=>23);

    print parms($string,$data);
?>
```

### Date/Time with Zone
[Stack Overflow](http://stackoverflow.com/a/20289096)  
This will give you a date in GMT, or whatever the time zone is set to in your php config file  
`$date = date("D M d H:i:s Y");`

This is how you get a date string with your desired time zone
```
$tz = 'America/Chicago';
$dt = new DateTime("now", new DateTimeZone($tz));
$date = $dt->format("D M d H:i:s Y");
```
The list of supported time zones is [here](http://php.net/manual/en/timezones.php).