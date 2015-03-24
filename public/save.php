<?php
	$data = $_REQUEST['data'];

	$namePath = 'students/'.$data[0].'/name.txt';
	$name = $data[1];

	$descriptionPath = 'students/'.$data[0].'/description.txt';
	$description = $data[2];

	$imagePath = 'students/'.$data[0].'/img.png';
	$image = $data[3];

	// Name
		$fp = fopen( $namePath, 'wb' );
		fwrite( $fp, $name);
		fclose( $fp );
	
	// Description
		$fp = fopen( $descriptionPath, 'wb' );
		fwrite( $fp, $description);
		fclose( $fp );	

	// Image
		// Remove the headers (data:,) part.
		// $filteredData = substr($GLOBALS['HTTP_RAW_POST_DATA'], strpos($GLOBALS['HTTP_RAW_POST_DATA'], ",")+1);	
		$filteredData = substr($image, strpos($image, ",")+1);		
		echo $filteredData;

		// Need to decode before saving since the data we received is already base64 encoded
		$decodedData = base64_decode($filteredData);

		$fp = fopen( $imagePath, 'wb' );
		fwrite( $fp, $decodedData);
		fclose( $fp );		
?>