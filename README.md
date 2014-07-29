# Lightweight javascript datepicker

![Lightweight javascript datepicker](http://remi-grumeau.github.io/DatePicker/images/preview.png "Javascript DatePicker")

This script is a modern browser automatic date picker solution. 
No third-party library dependency, IE support is IE8+.

See [live demo](http://remi-grumeau.github.io/DatePicker/demo/datepicker-demo.html).


# How to use
### Simple usage

First, you need to put a table element inside your page which the library can use to generate the calendar.

```html
<table 
	id="datepicker" 
	class="dp_calendar" 
	cellpadding="0" 
	cellspacing="0"
></table>
```

For a given id attribute of 'birthday', you should have
- an input text with id equal to 'birthday'
- an onclick event on it to open datepicker

```html
<input 
	type="text" 
	name="date_button" 
	id="date_button" 
	value="2011-06-02" 
	onclick="DP.open('date_button')"
>
```

### Positionning
You can specify a second parameter to specify the datepicker position. If empty, datepicker use the first parameter (aka element ID value) to get its position.
It can be an element ID value, a DOM element or a X,Y array.

```html
<input 
	type="text" 
	name="date_button" 
	id="date_button" 
	value="2011-06-02" 
	onclick="DP.open('date_button','date_button')"
>

<input 
	type="text" 
	name="date_button" 
	id="date_button" 
	value="2011-06-02" 
	onclick="DP.open('date_button', myDomElement)"
>

<input
	type="text"
	name="date_button"
	id="date_button"
	value="2011-06-02"
	onclick="DP.open('date_button', [10,40])"
>
```


### On multiple selects
For a given id attribute of 'birthday', you should have
- 3 selects with ids 'birthday_day', 'birthday_month' & 'birthday_year'.
- an hidden input text with id equal to 'birthday'

```html
<select
	name="date_select1_day"
	id="date_select1_day"
	size="1"
	onblur="DP.update('date_select1')"
>
	...
</select>
			
<select
	name="date_select1_month"
	id="date_select1_month"
	size="1"
	onblur="DP.update('date_select1')"
>
	...
</select>

<select
	name="date_select1_year"
	id="date_select1_year"
	size="1"
	onblur="DP.update('date_select1')"
>
</select>

<input
	type="hidden"
	name="date_select1"
	id="date_select1"
	value="2011-06-02"
>
<a
	href="javascript:DP.open('date_select1','date_select1_dp')"
	id="date_select1_dp"
><img src="datepicker_cal.gif"></a>
```

Please note that in this case, it might be a good idea to add onblur events on select to update the hidden input value when a select value changes.

### Onchange event callback

DatePicker can also trigger a function on

```html
<input
	readonly
	type="hidden"
	name="date_callback"
	id="date_callback"
	value="2011-06-02"
	onchange="myFunction(this.value,'date_callback_text')"
>
<input
	readonly
	type="text"
	id="date_callback_text"
	value="June 2th, 2011"
	onclick="DP.open('date_callback','date_callback_text')"
>

<script>
function myFunction(val, tid) {
	DP.gbi(tid).value = DP.toString(val);
}
</script>
```

## API
####DP._locale
An object contains a "months" array, and a "days" array.
```months[]``` goes from 0 to 11 as 'January' to 'December', and ```days[]``` goes from 0 to 6 as 'Sun' to 'Sat'.

####DP.gbi(eid)
Just a shortcut to ```document.getElementById```.

####DP.formatDate(d,m,y)
A function to return a well formated ```yyyy-mm-dd``` string from strings or integers.
```ex: DP.formatDate(2,6,1982) ---> "1982-06-02"```

####DP.toString(d)
Returns a human friendly date from a well formated ```yyyy-mm-dd``` string.
```ex: DP.toString('1982-06-02') ---> "June 2th, 1982"```


## Want to contribute?
Any contribution is always welcome.
As an example, Responsive CSS and multilingual support would be pretty nice contributions :)

## Special thanks
Thanks to [DtTvB's work](http://javascriptkit.com/script/script2/dyndateselector.shtml), DatePicker really start as a cleanup of it.
