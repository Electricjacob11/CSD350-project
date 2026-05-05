<?php
$conn = new mysqli("localhost", "root", "", "test_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$pin = $_POST['login_id'];
$first = $_POST['student_firstname'];
$last = $_POST['student_lastname'];

$stmt = $conn->prepare("SELECT * FROM students WHERE pin=? AND firstname=? AND lastname=?");
$stmt->bind_param("sss", $pin, $first, $last);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 1) {
    echo "✅ Check-in successful for $first $last";
} else {
    echo "❌ Invalid PIN or name";
}

$conn->close();
?>