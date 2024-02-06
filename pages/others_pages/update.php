<?php
$filename = "test.txt";
$newContent = $_POST["body"]; // Assuming you're sending the data as POST
file_put_contents($filename, $newContent);
echo "File updated successfully!";
?>