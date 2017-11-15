$.fn.slideFadeToggle = function(callback) {
	return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', callback);
};

function weekDayCalc(date, month, year) {
	var yearEnd = year % 100,
		mCode,
		centCode,
		yCode,
		weekDay;
	switch (month) {
		case 1:
		case 10:
			mCode = 1;
			break;
		case 5:
			mCode = 2;
			break;
		case 8:
			mCode = 3;
			break;
		case 2:
		case 3:
		case 11:
			mCode = 4;
			break;
		case 6:
			mCode = 5;
			break;
		case 12:
		case 9:
			mCode = 6;
			break;
		case 4:
		case 7:
			mCode = 0;
			break;
	}
	switch (Math.floor(year / 100)) {
		case 16:
		case 20:
			centCode = 6;
			break;
		case 17:
		case 21:
			centCode = 4;
			break;
		case 18:
			centCode = 2;
			break;
		case 19:
			centCode = 0;
			break;
	}
	yCode = (centCode + yearEnd + Math.floor(yearEnd / 4)) % 7;
	weekDay = (date + mCode + yCode) % 7;
	if (weekDay == 0 || weekDay == 1)
		weekDay += 6;
	else
		weekDay--;
	return weekDay;
}

function getWeekday(num) {
	var weekday;
	switch(num) {
		case 1:
			weekday = 'Понедельник';
			break;
		case 2:
			weekday = 'Вторник';
			break;
		case 3:
			weekday = 'Среда';
			break;
		case 4:
			weekday = 'Четверг';
			break;
		case 5:
			weekday = 'Пятница';
			break;
		case 6:
			weekday = 'Суббота';
			break;
		case 7:
			weekday = 'Воскресение';
			break;
	}
	return (weekday);
}

function calendarInit(numMonth, year, date, weekDay, events) {
	var d = new Date(),
		today = d.getDate(),
		curMonth = d.getMonth(),
		month;
	switch(numMonth) {
		case 0:
			month = 'Январь';
			break;
		case 1:
			month = 'Февраль';
			break;
		case 2:
			month = 'Март';
			break;
		case 3:
			month = 'Апрель';
			break;
		case 4:
			month = 'Май';
			break;
		case 5:
			month = 'Июнь';
			break;
		case 6:
			month = 'Июль';
			break;
		case 7:
			month = 'Август';
			break;
		case 8:
			month = 'Сентябрь';
			break;
		case 9:
			month = 'Октябрь';
			break;
		case 10:
			month = 'Ноябрь';
			break;
		case 11:
			month = 'Декабрь';
			break;
	}
	$('#left').after(month + ' ' + year);
	date = date % 7;
	if (date == 0 && weekDay == 7) {
		weekDay = 1;
		date = 1;
	}
	else {
		if (date == 0) {
			if (numMonth == 0) {
				date = 31;
				numMonth = 12;
			}
			else if (numMonth == 2) {
				if (year % 4 == 0)
					date = 29;
				else
					date = 28;
			}
			else if ((numMonth < 8 && (numMonth % 2 == 0)) || (numMonth > 7 && (numMonth % 2 != 0)) /*|| numMonth == 0*/) {
				date = 30;
			}
			else
				date = 31;
			numMonth--;
		}
		while (weekDay > 1) {
			date--;
			if (date == 0) {
				if (numMonth == 0) {
					date = 31;
					numMonth = 12;
				}
				else if (numMonth == 2) {
					if (year % 4 == 0)
						date = 29;
					else
						date = 28;
				}
				else if ((numMonth < 8 && (numMonth % 2 == 0)) || (numMonth > 7 && (numMonth % 2 != 0)) /*|| numMonth == 0*/) {
					date = 30;
				}
				else
					date = 31;
				numMonth--;
			}
			weekDay--;
		}
	}
	if (date > 1 && date < 20) {
		date--;
		weekDay = 7;
		while (weekDay > 1) {
			date--;
			if (date == 0) {
				if (numMonth == 0) {
					date = 31;
					numMonth = 12;
				}
				else if (numMonth == 2) {
					if (year % 4 == 0)
						date = 29;
					else
						date = 28;
				}
				else if ((numMonth < 8 && (numMonth % 2 == 0)) || (numMonth > 7 && (numMonth % 2 != 0)) /*|| numMonth == 0*/) {
					date = 30;
				}
				else
					date = 31;
				numMonth--;
			}
			weekDay--;
		}
	}

	var i = 1,
		j = 1,
		start = date,
		end;
	while (i <= 5) {
		$('table').append("<tr></tr>");
		j = 1;
		while (j < 8) {
			if (i == 1) {
				if (date == today && numMonth == curMonth)
					$('tr').append("<td style='background:#E3E2E2;'>" + getWeekday(weekDay) + ', ' + date + "<h6>" + j + "</h6></td>");
				else
					$('tr').append("<td>" + getWeekday(weekDay) + ', ' + date + "<h6>" + j + "</h6></td>");
				weekDay++;
			}
			else {
				if (date == today && numMonth == curMonth)
					$('tr:nth-of-type(' + i + ')').append("<td style='background:#ECEEEE;'>" + date + "<h6>" + j + "</h6></td>");
				else
					$('tr:nth-of-type(' + i + ')').append("<td>" + date + "<h6>" + j + "</h6></td>");
			}
			for (var e in events) {
				var splitDate = events[e].date.split('/');
				if (year == splitDate[2]) {
					if (numMonth == splitDate[0] - 1) {
						if (date == splitDate[1]) {
							$('tr:last-child td:last-child').append('<p>' + events[e].event + '</p><p>' + events[e].participants + '</p>');
							$('tr:last-child td:last-child').css('background-color', '#ADE5E5');
						}
					}
				}
			}
			date++;
			if (numMonth == 1) {
				if (year % 4 == 0) {
					if (date == 30) {
						date = 1;
						numMonth++;
					}
				}
				else {
					if (date == 29) {
						date = 1;
						numMonth++;
					}
				}
			}
			else if ((numMonth < 7 && (numMonth % 2 == 0)) || (numMonth > 6 && (numMonth % 2 != 0)) /*|| numMonth == 0*/) {
				if (date == 32) {
					date = 1;
					numMonth++;
				}
			}
			else {
				if (date == 31) {
					date = 1;
					numMonth++;
				}
			}
			j++;
		}
		i++;
	}
	end = date;
	$('td').width($('table').width() / 7);
	$('tr').height(($(window).height() - $('#header').outerHeight() - $('#nav').height() - 60) / 5);
	return [start, end];
}

$(document).ready(function(){
	var d = new Date(),
		m = d.getMonth(),
		y = d.getFullYear(),
		w = d.getDay(),
		date = d.getDate(),
		endDates,
		created = false,
		ev;
	$('#date').datepicker();

	var events = [
		{
			"event": "Переговоры",
			"date": "11/17/2017",
			"participants": "Иван Петров, Николай Иванов",
			"description": "Рабочее совещание"
		},
		{
			"event": "Другая встреча",
			"date": "11/1/2017",
			"participants": "Иван Петров, Людмила Николаенко",
			"description": "Иного рода собрание"
		},
		{
			"event": "Совещание",
			"date": "09/1/2017",
			"participants": "Иван Петров, Ирина Тригуб",
			"description": "совещание"
		}
	];

	if (w == 0)
		w = 7;
	endDates = calendarInit(m, y, date, w, events);

	$('#nav').on('click', 'button:last-child', function() {
		$('table').empty();
		$('#nav').html($('#nav').children());
		w = d.getDay();
		if (w == 0)
			w = 7;
		endDates = calendarInit(d.getMonth(), d.getFullYear(), d.getDate(), w, events);
	});

	$('#nav').on('click', '#left', function() {
		if (m == 2) {
			if (y % 4 == 0) {
				if (endDates[0] == 1)
					endDates[0] = 30;
			}
			else {
				if (endDates[0] == 1)
					endDates[0] = 29;
			}
		}
		else if (m == 0) {
			if (endDates[0] == 1)
				endDates[0] = 32;
		}
		else if ((m < 8 && (m % 2 == 0)) || (m > 7 && (m % 2 != 0))) {
			if (endDates[0] == 1)
				endDates[0] = 31;
		}
		else {
			if (endDates[0] == 1)
				endDates[0] = 32;
		}
		if (m == 0) {
			y--;
			m = 11;
		}
		else
			m--;
		$('table').empty();
		$('#nav').html($('#nav').children());
		endDates = calendarInit(m, y, endDates[0] - 1, 7, events);
	});
	$('#nav').on('click', '#right', function() {
		if (endDates[1] > 20) {
			var i = 0;
			while (i < 7) {
				endDates[1]++;
				i++;
				if (m == 1) {
					if (y % 4 == 0) {
						if (endDates[1] == 30)
							endDates[1] = 1;
					}
					else {
						if (endDates[1] == 29)
							endDates[1] = 1;
					}
				}
				else if ((m < 7 && (m % 2 == 0)) || (m > 6 && (m % 2 != 0))) {
					if (endDates[1] == 32)
						endDates[1] = 1;
				}
				else {
					if (endDates[1] == 31)
						endDates[1] = 1;
				}
			}
		}
		if (m == 1) {
			if (y % 4 == 0) {
				if (endDates[1] == 1)
					endDates[1] = 8;
			}
			else {
				if (endDates[1] == 1)
					endDates[1] = 8;
			}
		}
		else if ((m < 8 && (m % 2 == 0)) || (m > 7 && (m % 2 != 0))) {
			if (endDates[1] == 1)
				endDates[1] = 8;
		}
		else {
			if (endDates[1] == 1)
				endDates[1] = 8;
		}
		if (m == 11) {
			y++;
			m = 0;
		}
		else
			m++;
		$('table').empty();
		$('#nav').html($('#nav').children());
		endDates = calendarInit(m, y, endDates[1] - 1, 7, events);
	});

	$('table').on('click', 'td', function() {
		if ($(this).children('p').length > 0) {
			for (ev in events) {
				var splitDate = events[ev].date.split('/');
				if (y == splitDate[2]) {
					if (m == splitDate[0] - 1) {
						if ($(this).contents().get(0).nodeValue.split(' ')[0] == splitDate[1] || $(this).contents().get(0).nodeValue.split(' ')[1] == splitDate[1]) {
							$('.pop #event').attr('value', events[ev].event);
							$('.pop #participants').attr('value', events[ev].participants);
							$('.pop #date').attr('value', events[ev].date);
							$('.pop #description').val(events[ev].description);
							break;
						}
					}
				}
			}
			created = true;
		}
		else {
			var content = $(this).contents().get(0).nodeValue.split(' '),
				day;
			if (content.length == 1)
				day = content[0];
			else
				day = content[1];
			$('.pop #date').attr('value', (m + 1) + '/' + day + '/' + y);
			$('.pop #event').attr('value', '');
			$('.pop #participants').attr('value', '');
			$('.pop #description').val('');
		}
		/*if($(this).hasClass('selected')) {
			$('.pop').slideFadeToggle(function() {
				$(this).removeClass('selected');
			});
		}
		else {
			$(this).addClass('selected');*/
			$('.pop').slideFadeToggle();
		//}
		if ($(window).height() < $(window).width()) {
		var index = $('td').index($(this)) % 7,
			line = Math.floor($('td').index($(this)) / 7);
		if (index < 4) {
			$('.pop').css('left', 0.05 * $(window).width() + $('td').width() * (index + 1) + index + 2);
			$('.pop').css('right', 'auto');
		}
		else {
			$('.pop').css('right', 0.05 * $(window).width() + $('td').width() * (7 - index) + 8 - index);
			$('.pop').css('left', 'auto');
		}
		if (line < 2) {
			$('.pop').css('top', $('#header').outerHeight() + $('#nav').height() + 40);
			$('.pop').css('bottom', 'auto');
		}
		else if (line == 2) {
			$('.pop').css('top', $('#header').outerHeight() + $('#nav').height() + 40 + 1.5 * $('td').height());
			$('.pop').css('bottom', 'auto');
		}
		else {
			$('.pop').css('bottom', $(window).height() - $('body').height());
			$('.pop').css('top', 'auto');
		}
		}
		return false;
	});

	$('#header').on('click', '#adding', function() {
		$('.pop').slideFadeToggle();
		created = false;
		return false;
	});

	$('#header').on('click', '#refresh', function() {
		var date = $('tr:last-child>td:first-of-type').contents().get(0).nodeValue;
		$('table').empty();
		$('#nav').html($('#nav').children());
		endDates = calendarInit(m, y, date, 1, events);
	});

	$('#search-form').on('submit', function(e) {
		debugger;
		e.preventDefault();
		var searchItem = $('#search-field').val(),
			found = false;
		for (ev in events) {
			if (events[ev].event == searchItem || events[ev].date == searchItem) {
				var dateParts = events[ev].date.split('/');
				date = parseInt(dateParts[1]);
				m = parseInt(dateParts[0]) - 1;
				y = parseInt(dateParts[2]);
				w = weekDayCalc(date, m + 1, y);
				$('table').empty();
				$('#nav').html($('#nav').children());
				endDates = calendarInit(m, y, date, w, events);
				$('.pop #event').attr('value', events[ev].event);
				$('.pop #participants').attr('value', events[ev].participants);
				$('.pop #date').attr('value', events[ev].date);
				$('.pop #description').val(events[ev].description);
				$('.pop').slideFadeToggle();
				created = true;
				found = true;
				break;
			}
			var people = events[ev].participants.split(', ');
			for (var p in people) {
				if (people[p] == searchItem) {
					if ($('ul').length == 0)
						$('body').append('<ul></ul>');
					$('ul').append('<li>' + events[ev].date + ' - ' + events[ev].event + '</li>');
					found = true;
					break;
				}
			}
		}
		if (found == false)
			alert("Не найдено ни одного события.");
		return false;
	});

	$('.pop').on('submit', function(e) {
		debugger;
		e.preventDefault();
		if (created == true) {
			events[ev].event = $('#event').val();
			events[ev].date = $('#date').val();
			events[ev].participants = $('#participants').val();
			events[ev].description = $('#description').val();
			created = false;
		}
		else {
			events.push({
			"event": $('#event').val(),
				"date": $('#date').val(),
				"participants": $('#participants').val(),
				"description": $('#description').val()
			});
		}
		$('.pop').slideFadeToggle();
		$('table').empty();
		$('#nav').html($('#nav').children());
		endDates = calendarInit(m, y, date, w, events);
   	});

   	$('.pop').on('click', '#remove', function() {
   		events.splice(ev, 1);
   		$('.pop').slideFadeToggle();
		$('table').empty();
		$('#nav').html($('#nav').children());
		endDates = calendarInit(m, y, date, w, events);
   	});

   	$('body').on('click', 'li', function() {
   		debugger;
		var itemDate = $(this).text().split(' ')[0],
			dateParts = itemDate.split('/');
		date = parseInt(dateParts[1]);
		m = parseInt(dateParts[0]) - 1;
		y = parseInt(dateParts[2]);
		w = weekDayCalc(date, m + 1, y);
		$('table').empty();
		$('#nav').html($('#nav').children());
		endDates = calendarInit(m, y, date, w, events);
		$('ul').remove();
		for (var ev in events) {
			var splitDate = events[ev].date.split('/');
			if (y == parseInt(splitDate[2])) {
				if (m == parseInt(splitDate[0] - 1)) {
					if (date == parseInt(splitDate[1])) {
						$('.pop #event').attr('value', events[ev].event);
						$('.pop #participants').attr('value', events[ev].participants);
						$('.pop #date').attr('value', events[ev].date);
						$('.pop #description').val(events[ev].description);
					}
				}
			}
		}
		$('.pop').slideFadeToggle();
		created = true;
	});

	$('.pop').on('click', '#close', function() {
		debugger;
		$('.pop').slideFadeToggle();
	});
});