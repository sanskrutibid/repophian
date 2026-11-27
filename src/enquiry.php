<?php
// Homepage enquiry form: emails name, phone and business to info@phianinfotec.com.
// Upload this file next to index.html on PHP hosting (Hostinger). The homepage form posts to /enquiry.php.
// Same approach as apply.php (careers). Replying to the mail goes to the visitor only if they gave an email, so the phone is the main contact.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$TO_EMAIL  = 'info@phianinfotec.com';
$FROM_MAIL = 'info@phianinfotec.com';   // must be a mailbox on your own domain, otherwise mail lands in spam

function out($code, $arr) { http_response_code($code); echo json_encode($arr); exit; }
function clean($s, $max) { return mb_substr(trim(preg_replace('/[\r\n]+/', ' ', (string)$s)), 0, $max); }

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['health'])) out(200, ['ok' => true, 'mail' => function_exists('mail') ? 'mail() available' : 'mail() disabled']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['error' => 'POST only']);
if (!empty($_POST['website'])) out(200, ['ok' => true]);               // honeypot: bots fill this hidden field

// 8 enquiries per hour per visitor
$rl = sys_get_temp_dir() . '/phian_enq_' . md5($_SERVER['REMOTE_ADDR'] ?? 'x');
$hits = is_file($rl) ? array_filter(array_map('intval', explode(',', (string)@file_get_contents($rl))), fn($t) => $t > time() - 3600) : [];
if (count($hits) >= 8) out(429, ['error' => 'Too many enquiries. Please try again later or call +91 77098 09577.']);

$name  = clean($_POST['name'] ?? '', 120);
$phone = clean($_POST['phone'] ?? '', 40);
$biz   = clean($_POST['biz'] ?? '', 160);
if ($name === '' || $biz === '' || !preg_match('/^[0-9+()\-\s]{7,20}$/', $phone)) out(400, ['error' => 'Please add your name, a valid phone number and your business name.']);

$page = clean($_POST['page'] ?? 'Homepage', 120);
$body = "New enquiry from the website ($page)\r\n\r\nName: $name\r\nPhone: $phone\r\nBusiness: $biz\r\n\r\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\r\nTime: " . date('d M Y, H:i') . " (server time)\r\n";
$headers = "From: Phian Website <$FROM_MAIL>\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8";
$subject = '=?UTF-8?B?' . base64_encode("Website enquiry: $name, $biz") . '?=';

$sent = @mail($TO_EMAIL, $subject, $body, $headers, '-f' . $FROM_MAIL) || @mail($TO_EMAIL, $subject, $body, $headers);
if (!$sent) out(500, ['error' => 'Could not send. Please call +91 77098 09577 or email ' . $TO_EMAIL . '.']);

$hits[] = time(); @file_put_contents($rl, implode(',', $hits));
out(200, ['ok' => true]);
