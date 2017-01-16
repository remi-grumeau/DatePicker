;(function() {
	window.DP = {

		_today : {},
		_inputDate : {},
		_output : '',
		_calendar : '',
		_element : null,		// text element
		_locale : {		// locales - you can translate this
			months : [
				'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
			],
			days : [
				'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
			]
		},

		// getById selector
		gbi : function(a) { return document.getElementById(a); },

		// initial load
		init : function() {
			var d = new Date();
			DP._today.day = d.getDate();
			DP._today.month = d.getMonth() + 1;
			DP._today.year = d.getFullYear();
		},

		build : function(a) {
			DP._output += a;
		},

		getPosition : function(el) {
			// Get the left and the top of the element.
			var left = el.offsetLeft, top = el.offsetTop;
			el = el.offsetParent;
			while(el) {
				left += el.offsetLeft;
				top += el.offsetTop;
				el = el.offsetParent;
			}
			return [left,top];
		},

		// Output Buffering
		outputClear : function() {
			DP._output = '';
		},

		outputFlush : function() {
			DP._calendar.innerHTML = DP._output;
			DP.outputClear();
		},

		// Calendar template
		_template : {
			header : function(t) {
				return '<table cellpadding="3" cellspacing="1">'
					 + '<tr>'
					 + '  <td class="dp_nav" onclick="DP.prevYear();">&lt;&lt;</td>'
					 + '  <td class="dp_nav" onclick="DP.prevMonth();">&lt;</td>'
					 + '  <td class="dp_nav" onclick="DP.hide();" colspan="3">close</td>'
					 + '  <td class="dp_nav" onclick="DP.nextMonth();">&gt;</td>'
					 + '  <td class="dp_nav" onclick="DP.nextYear();">&gt;&gt;</td>'
					 + '</tr>'
					 + '<tr>'
					 + '  <td colspan="7" class="dp_header">' + t + '</td>'
					 + '</tr>'
					 + '<tr>';
			},
			footer : function() {
				return '</tr>'
					 + '</table>';
			},
			day : function(t) {
				return '<td class="dp_subheader">' + t + '</td>';			// define width in CSS, XHTML 1.0 Strict doesn't have width property for it.
			},
			week : function() {
				return '</tr><tr>';	// adds a row between days to separate them
			},
			empty : function(colspan) {
				return '<td colspan="' + colspan + '"></td>';	// add a blank cell - if week does not start of finish during the week
			},

			addCell : function(d, m, y) {
				var c = 'dp_cell';
				if(DP._today.day == d && DP._today.month == m && DP._today.year == y)
					c += ' dp_cell_today';
				else if(DP._inputDate.day == d && DP._inputDate.month == m && DP._inputDate.year == y)
					c += ' dp_cell_active';
				return '<td class="'+c+'" onclick="DP.chooseDate(' + d + ',' + m + ',' + y + ')">' + d + '</td>';
			}
		},

		drawCalendar : function() {
			// This one draws calendar...
			// First clean the output buffer.
			DP.outputClear();

			// set short name variables
			var d=DP._inputDate.day, m=DP._inputDate.month, y=DP._inputDate.year, dayLabel, days;
			// set day label
			switch(DP._inputDate.day) {
				case 1 :
					dayLabel = '1st';
					break;
				case 2 :
					dayLabel = '2nd';
					break;
				case 3 :
					dayLabel = '3rd';
					break;
                                case 21:
                                        dayLabel = '21st';
                                        break;
                               case 22:
                                        dayLabel = '22nd';
                                        break;
                               case 23:
                                        dayLabel = '23rd';
                                        break;
                                case 31:
                                        dayLabel = '31st';
                                        break;
				default :
					dayLabel = DP._inputDate.day+'th';
			}

			// Here we go, do the header
			DP.build(DP._template.header(DP._locale.months[m - 1] + ' ' + dayLabel + ' ' + y));
			for (var i = 0; i < 7; i ++) {
				DP.build(DP._template.day(DP._locale.days[i]));
			}

			// number of days in a month
			if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
				days = 31;
			} else if (m == 4 || m == 6 || m == 9 || m == 11) {
				days = 30;
			} else {
				days = !!((!(y%4)&&y%100)||!(y%400)) ? 29 : 28;
			}
			// Make a date object.
			var date = new Date();
			date.setDate(1);
			date.setMonth(m - 1);
			date.setFullYear(y);
			var first_day = date.getDay();
			var first_loop = 1;
			// Start the first week
			DP.build(DP._template.week());
			// If sunday is not the first day of the month, make a blank cell...
			if (first_day != 0) {
				DP.build(DP._template.empty(first_day));
			}
			var j = first_day;
			for (i = 0; i < days; i ++) {
				// Today is sunday, make a new week.
				// If this sunday is the first day of the month,
				// we've made a new row for you already.
				if (j == 0 && !first_loop) {
					// New week!!
					DP.build(DP._template.week());
				}
				// Make a row of that day!
				DP.build(DP._template.addCell(i + 1, m, y));
				// This is not first loop anymore...
				first_loop = 0;
				// What is the next day?
				j ++;
				j %= 7;
			}
			// Do the footer
			DP.build(DP._template.footer());
			// And let's display..
			DP.outputFlush();
		},

		open : function(t,pos) {
			// A function to open the calendar.
			// When user click on the date, it will set the content of t.
			// When user click on the icon, it will position the content at el x & y.
			// When user click on the date, it will set the data to d.

			// Set element as active element
			DP._element = (typeof t =='string')?DP.gbi(t):t;
                        // Make a new date (for defaults)
                        var d = new Date();

			if(DP._element.value!='') {
				// if the element has a value
				DP._inputDate.day = parseInt(DP._element.value.substring(8,10)) || 1;
				DP._inputDate.month = parseInt(DP._element.value.substring(5,7)) || 1;
				DP._inputDate.year = parseInt(DP._element.value.substring(0,4)) || d.getFullYear();
			} else {
				// set the current day, month and year.
				DP._inputDate.day = d.getDate();
				DP._inputDate.month = d.getMonth() + 1;
				DP._inputDate.year = d.getFullYear();
			}
			// Draw the calendar
			DP._outputElement = DP.gbi('datepicker_content');
			DP._calendar = DP.gbi('datepicker');
			DP.drawCalendar();

			// To change the position properly, we must open it first.
			DP._calendar.style.display = '';

			// Move the calendar container position
			if(typeof pos=='string')
				pos = DP.getPosition(DP.gbi(pos));
			else if(typeof pos=='object' && ~~pos[1]!=pos[1])
				pos = DP.getPosition(pos);
			else if(typeof pos=='undefined')
				pos = DP.getPosition(DP._element);

			DP._calendar.style.left = pos[0] + 'px';
			DP._calendar.style.top = pos[1] + 'px';
		},

		hide : function() {
			// Hide the calendar
			DP._calendar.style.display = 'none';
		},

		nextMonth : function() {
			// Moves to the next month...
			// Increase the current month.
			DP._inputDate.month++;
			// We have passed December, let's go to the next year.
			// Increase the current year, and set the current month to January.
			if (DP._inputDate.month > 12) {
				DP._inputDate.month = 1;
				DP._inputDate.year++;
			}
			// Redraw the calendar.
			DP.drawCalendar(DP._inputDate.month, DP._inputDate.year);
		},

		prevMonth : function() {
			// Moves to the previous month...
			// Can't use dash-dash here, it will make the page invalid.
			DP._inputDate.month = DP._inputDate.month - 1;
			// We have passed January, let's go back to the previous year.
			// Decrease the current year, and set the current month to December.
			if (DP._inputDate.month < 1) {
				DP._inputDate.month = 12;
				DP._inputDate.year = DP._inputDate.year - 1; // Can't use dash-dash here, it will make the page invalid.
			}
			// Redraw the calendar.
			DP.drawCalendar(DP._inputDate.month, DP._inputDate.year);
		},

		nextYear : function() {
			// Moves to the next year...
			// Increase the current year.
			DP._inputDate.year++;
			// Redraw the calendar.
			DP.drawCalendar(DP._inputDate.month, DP._inputDate.year);
		},

		prevYear : function() {
			// Moves to the previous year...
			// Decrease the current year.
			DP._inputDate.year = DP._inputDate.year - 1; // Can't use dash-dash here, it will make the page invalid.
			// Redraw the calendar.
			DP.drawCalendar(DP._inputDate.month, DP._inputDate.year);
		},

		formatDate : function(d, m, y) {
			// Format the date to output.
			// 2 digits month.
			var m2 = (m<10)?'0'+m:m;
			// 2 digits day.
			var d2 = (d<10)?'0'+d:d;
			// YYYY-MM-DD
			return y + '-' + m2 + '-' + d2;
		},

		chooseDate : function(d, m, y) {
			// When the user clicks the day
			// Hide the calendar.
			DP.hide();
			if (typeof(DP._element.value) != 'undefined') {
				// Set the value of it, if we can
				DP._element.value = DP.formatDate(d, m, y);
			} else if (typeof(DP._element.innerHTML) != 'undefined') {
				// Maybe we want to set the HTML in it
				DP._element.innerHTML = DP.formatDate(d, m, y);
			} else {
				// I don't know how should we display it, just alert it to user
				alert (DP.formatDate(d, m, y));
			}
			DP.update(DP._element.id,d,m,y);
		},

		update : function(t,d,m,y) {
			// IE bugfix
			t = (typeof t !=='string')?t.toString():t;

			if(d && m && y)
			{
				// set value if an element exists with this id
				if(DP.gbi(t)) {
					DP.gbi(t).value = y+'-'+((m<10)?'0'+m:m)+'-'+((d<10)?'0'+d:d);
					if(DP.gbi(t).getAttribute('onchange'))
						DP.gbi(t).onchange();
				}

				// set value on each select elements if they exists
				if(DP.gbi(t+'_day'))
					DP.gbi(t+'_day').value=(d<10)?'0'+d:d;
				if(DP.gbi(t+'_month'))
					DP.gbi(t+'_month').value=(m<10)?'0'+m:m;
				if(DP.gbi(t+'_year'))
					DP.gbi(t+'_year').value=y;
			}
		},
		
		toString : function(d) {
			var dayNum = parseInt(d.substr(8,2)),day,month,year,fulltext;
			if(dayNum==1)
				day = '1st';
			else if(dayNum==2)
				day = '2nd';
			else if(dayNum==3)
				day = '3rd';
                        else if(dayNum==21)
                                day = '21st';
                        else if(dayNum==22)
                                day = '22nd';
                        else if(dayNum==23)
                                day = '23rd';
                        else if(dayNum==31)
                                day = '31st';
			else
				day = dayNum+'th';
			month = DP._locale.months[parseInt(d.substr(5,2))-1];
			year = d.substr(0,4);
			return month+' '+day+', '+year;
		}
	};
	DP.init();
})();
