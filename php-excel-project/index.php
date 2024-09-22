<?php

require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Define the file path
$fileName = 'data.xlsx';
$filePath = __DIR__ . '/files/' . $fileName;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(['status' => 'error', 'message' => 'No data received.']);
        exit();
    }

    // Check if the Excel file exists
    if (file_exists($filePath)) {
        // Load the existing file
        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();
    } else {
        // Create a new spreadsheet if the file doesn't exist
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
    }

    // Find the next available row in the existing sheet
    $highestRow = $sheet->getHighestRow() + 1;

    // Assuming the POST data is an associative array, append data to the next row
    $col = 'A';
    foreach ($data as $key => $value) {
        $sheet->setCellValue($col . $highestRow, $value);
        $col++;
    }

    // Create an Excel writer
    $writer = new Xlsx($spreadsheet);

    // Save the updated file
    $writer->save($filePath);

    // Get the file URL
    $fileUrl = 'https://' . $_SERVER['HTTP_HOST'] . '/files/' . $fileName;

    // Respond with success and the URL to download the file
    echo json_encode([
        'status' => 'success',
        'message' => 'Data appended to Excel successfully.',
        'file_url' => $fileUrl
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
