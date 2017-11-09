$(document).ready(function(){
	var i = 0,
		j = 0;
	while (i < 4) {
		$('table').html(<tr></tr>);
		while (j < 7) {
			$('tr:nth-of-type(' + (i + 1) + ')').html(<td></td>);
			j++;
		}
		i++;
	}
});