var ds_i_date = new Date();
ds_c_month = ds_i_date.getMonth() + 1;
ds_c_year = ds_i_date.getFullYear();

var ds_today = new Date();
ds_today_d = ds_today.getDate();
ds_today_m = ds_today.getMonth() + 1;
ds_today_y = ds_today.getFullYear();
ds_today = undefined;

// cleaner in code
function ds_gbi(a) { return document.getElementById(a); }

// Get the left and the top of the element.
function ds_getleft(el) {
	var tmp = el.offsetLeft;
	el = el.offsetParent
	while(el) {
		tmp += el.offsetLeft;
		el = el.offsetParent;
	}
	return tmp;
}
function ds_gettop(el) {
	var tmp = el.offsetTop;
	el = el.offsetParent
	while(el) {
		tmp += el.offsetTop;
		el = el.offsetParent;
	}
	return tmp;
}

var ds_oe = '';
var ds_ce = '';

// Output Buffering
var ds_ob = '';
function ds_ob_clean() {
	ds_ob = '';
}
function ds_ob_flush() {
	ds_oe.innerHTML = ds_ob;
	ds_ob_clean();
}
function ds_echo(t) {
	ds_ob += t;
}

var ds_element; // Text Element...

var ds_monthnames = [
'January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'November', 'December'
]; // You can translate it for your language.

var ds_daynames = [
'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
]; // You can translate it for your language.

// Calendar template
function ds_template_main_above(t) {
	return '<table cellpadding="3" cellspacing="1" class="ds_tbl">'
	     + '<tr>'
		 + '  <td class="ds_headnav" onclick="ds_py();">&lt;&lt;</td>'
		 + '  <td class="ds_headnav" onclick="ds_pm();">&lt;</td>'
		 + '  <td class="ds_headnav" onclick="ds_hi();" colspan="3">close</td>'
		 + '  <td class="ds_headnav" onclick="ds_nm();">&gt;</td>'
		 + '  <td class="ds_headnav" onclick="ds_ny();">&gt;&gt;</td>'
		 + '</tr>'
	     + '<tr>'
		 + '  <td colspan="7" class="ds_head">' + t + '</td>'
		 + '</tr>'
		 + '<tr>';
}

function ds_template_day_row(t) {
	return '<td class="ds_subhead">' + t + '</td>';
	// Define width in CSS, XHTML 1.0 Strict doesn't have width property for it.
}

function ds_template_new_week() {
	return '</tr><tr>';
}

function ds_template_blank_cell(colspan) {
	return '<td colspan="' + colspan + '"></td>'
}

function ds_template_day(d, m, y) {
	if(ds_today_d == d && ds_today_m == m && ds_today_y == y)
		return '<td class="ds_cell ds_cell_today" onclick="ds_onclick(' + d + ',' + m + ',' + y + ')">' + d + '</td>';
	else if(ds_active_d == d && ds_active_m == m && ds_active_y == y)
		return '<td class="ds_cell ds_cell_active" onclick="ds_onclick(' + d + ',' + m + ',' + y + ')">' + d + '</td>';
	else
		return '<td class="ds_cell" onclick="ds_onclick(' + d + ',' + m + ',' + y + ')">' + d + '</td>';
}

function ds_template_main_below() {
	return '</tr>'
	     + '</table>';
}

// This one draws calendar...
function ds_draw_calendar(m, y) {
	// First clean the output buffer.
	ds_ob_clean();
	// Here we go, do the header
	if(ds_c_day==1)var d='1st';
	else if(ds_c_day==2)var d='2nd';
	else if(ds_c_day==3)var d='3rd';
	else var d = ds_c_day+'th';

	ds_echo (ds_template_main_above(ds_monthnames[m - 1] + ' ' + d + ' ' + y));
	for (i = 0; i < 7; i ++) {
		ds_echo (ds_template_day_row(ds_daynames[i]));
	}
	// Make a date object.
	var ds_dc_date = new Date();

	ds_dc_date.setMonth(m - 1);
	ds_dc_date.setFullYear(y);
	ds_dc_date.setDate(1);
	if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
		days = 31;
	} else if (m == 4 || m == 6 || m == 9 || m == 11) {
		days = 30;
	} else {
		days = (y % 4 == 0) ? 29 : 28;
	}
	var first_day = ds_dc_date.getDay();
	var first_loop = 1;
	// Start the first week
	ds_echo (ds_template_new_week());
	// If sunday is not the first day of the month, make a blank cell...
	if (first_day != 0) {
		ds_echo (ds_template_blank_cell(first_day));
	}
	var j = first_day;
	for (i = 0; i < days; i ++) {
		// Today is sunday, make a new week.
		// If this sunday is the first day of the month,
		// we've made a new row for you already.
		if (j == 0 && !first_loop) {
			// New week!!
			ds_echo (ds_template_new_week());
		}
		// Make a row of that day!
		ds_echo (ds_template_day(i + 1, m, y));
		// This is not first loop anymore...
		first_loop = 0;
		// What is the next day?
		j ++;
		j %= 7;
	}
	// Do the footer
	ds_echo (ds_template_main_below());
	// And let's display..
	ds_ob_flush();
}

// A function to show the calendar.
// When user click on the date, it will set the content of t.
// When user click on the icon, it will position the content at el x & y.
// When user click on the date, it will set the data to d.
function ds_sh(t,pos) {
	// IE bugfix
	t = (typeof t =='string')?ds_gbi(t):t;

	ds_element = t;
	
	if(ds_element.value!=''){
		ds_c_day = ds_active_d = ds_element.value.substring(8,10);
		ds_c_month = ds_active_m = ds_element.value.substring(5,7);
		ds_c_year = ds_active_y = ds_element.value.substring(0,4);
	}else{
		// Make a new date, and set the current month and year.
		var ds_sh_date = new Date();
		ds_c_day = ds_sh_date.getDate();
		ds_c_month = ds_sh_date.getMonth() + 1;
		ds_c_year = ds_sh_date.getFullYear();
	}
	// Draw the calendar
	ds_oe = ds_gbi('ds_calclass');
	ds_ce = ds_gbi('ds_conclass');
	ds_draw_calendar(ds_c_month, ds_c_year);
	// To change the position properly, we must show it first.
	ds_ce.style.display = '';

	// Move the calendar container
	if(typeof pos=='object') 
	{
		the_left = pos[0];
		the_top = pos[1];
	}
	else
	{
		pos = (typeof pos=='string')?ds_gbi(pos):pos;
		the_left = ds_getleft(pos);
		the_top = ds_gettop(pos);
	}
	ds_ce.style.left = the_left + 'px';
	ds_ce.style.top = the_top + 'px';
}

// Hide the calendar.
function ds_hi() {
	ds_ce.style.display = 'none';
}

// Moves to the next month...
function ds_nm() {
	// Increase the current month.
	ds_c_month ++;
	// We have passed December, let's go to the next year.
	// Increase the current year, and set the current month to January.
	if (ds_c_month > 12) {
		ds_c_month = 1; 
		ds_c_year++;
	}
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Moves to the previous month...
function ds_pm() {
	ds_c_month = ds_c_month - 1; // Can't use dash-dash here, it will make the page invalid.
	// We have passed January, let's go back to the previous year.
	// Decrease the current year, and set the current month to December.
	if (ds_c_month < 1) {
		ds_c_month = 12; 
		ds_c_year = ds_c_year - 1; // Can't use dash-dash here, it will make the page invalid.
	}
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Moves to the next year...
function ds_ny() {
	// Increase the current year.
	ds_c_year++;
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Moves to the previous year...
function ds_py() {
	// Decrease the current year.
	ds_c_year = ds_c_year - 1; // Can't use dash-dash here, it will make the page invalid.
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Format the date to output.
function ds_format_date(d, m, y) {
	// 2 digits month.
	m2 = (m<10)?'0'+m:m;
	// 2 digits day.
	d2 = (d<10)?'0'+d:d;
	// YYYY-MM-DD
	return y + '-' + m2 + '-' + d2;
}

// When the user clicks the day.
function ds_onclick(d, m, y) {
	// Hide the calendar.
	ds_hi();
	// Set the value of it, if we can.
	if (typeof(ds_element.value) != 'undefined') {
		ds_element.value = ds_format_date(d, m, y);
	// Maybe we want to set the HTML in it.
	} else if (typeof(ds_element.innerHTML) != 'undefined') {
		ds_element.innerHTML = ds_format_date(d, m, y);
	// I don't know how should we display it, just alert it to user.
	} else {
		alert (ds_format_date(d, m, y));
	}
	ds_update(ds_element.id,d,m,y);
}

function ds_update(t,d,m,y) {
	t = (typeof t !=='string')?t.toString():t;
	ds_gbi(t).value = y+'-'+((m<10)?'0'+m:m)+'-'+((d<10)?'0'+d:d);

	if(ds_gbi(t+'_day'))
		ds_gbi(t+'_day').value=(d<10)?'0'+d:d;
	if(ds_gbi(t+'_month'))
		ds_gbi(t+'_month').value=(m<10)?'0'+m:m;
	if(ds_gbi(t+'_year'))
		ds_gbi(t+'_year').value=y;
}
// And here is the end.
