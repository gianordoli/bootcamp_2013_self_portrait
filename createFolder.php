<?php
	$data = json_decode(stripslashes($_POST['data']));
	foreach($data as $d){
		echo $d;
	}

	$directory = 'students/'.$data;
	mkdir($directory);
?>