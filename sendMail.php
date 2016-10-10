<?php
if($_SERVER['REQUEST_METHOD'] == 'GET') {

    $name = $_GET['name'];
	$mail = $_GET['mail'];
	$subject = $_GET['subject'];
	$text = $_GET['text'];
	$random_hash = md5(date('r', time()));
//define the headers we want passed. Note that they are separated with \r\n
$headers = 'From: ' . $name  . ' <' . $mail . '>';
//add boundary string and mime type specification
$headers .= "\r\nContent-Type: multipart/mixed; boundary=\"PHP-mixed-".$random_hash."\"";
//read the atachment file contents into a string,
	$attachment = chunk_split(base64_encode(file_get_contents($_GET['file'])));
	//define the body of the message.
	ob_start();
	?>
--PHP-mixed-<?php echo $random_hash; ?>
Content-Type: multipart/alternative; boundary="PHP-alt-<?php echo $random_hash; ?>"

--PHP-alt-<?php echo $random_hash; ?>
Content-Type: text/plain; charset="iso-8859-1"
Content-Transfer-Encoding: 7bit

Hello World!!!
This is simple text email message.

--PHP-alt-<?php echo $random_hash; ?>
Content-Type: text/html; charset="iso-8859-1"
Content-Transfer-Encoding: 7bit

<h2>Hello World!</h2>
<p>This is something with <b>HTML</b> formatting.</p>

--PHP-alt-<?php echo $random_hash; ?>--

--PHP-mixed-<?php echo $random_hash; ?>
Content-Type: application/png; name="l.png"
Content-Transfer-Encoding: base64
Content-Disposition: attachment

<?php echo $attachment; ?>
--PHP-mixed-<?php echo $random_hash; ?>--
<?php>
		$message = ob_get_clean();
		/*$header='From: ' . $name  . ' <' . $mail . '>';
	$header_ = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/plain; charset=UTF-8' . "\r\n";*/

	$status = @mail("chkeka@ukr.net", '=?UTF-8?B?'.base64_encode($subject).'?=', $message, $headers);

	echo status? '0' : '1';

}
?>