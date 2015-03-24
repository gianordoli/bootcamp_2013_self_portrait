<?php
	// array scandir ( string $directory [, int $sorting_order = SCANDIR_SORT_ASCENDING [, resource $context ]] );

	$dir    = 'students';
	$files1 = scandir($dir);
	// $files2 = scandir($dir, 1);

	$myArray = json_encode($files1);
	echo $myArray;
	// print_r($files2);
?>