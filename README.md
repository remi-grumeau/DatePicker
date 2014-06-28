# Date Picker
### Lightweight javascript datepicker

This script is a modern browser automatic date picker solution. 
No third-party library dependency, IE support is IE8+.


# How to use
### on an input
For a given id attribute of 'birthday', you should have
- an input text with id equal to 'birthday'
- an onclick event on it to show datepicker 

```html
<input 
	type="text" 
	name="date_button" 
	id="date_button" 
	value="2011-06-02" 
	onclick="ds_sh('date_button','date_button')"
>
```

Then, use ds_sh(id value, position) to use datepicker. 
First parameter is the ID value of the input element, second is the ID value of an element to use its X-Y position (could be any DOM element). 

Position can also be an array with X & Y values as [10,40].

```html
<input
	type="text"
	name="date_button"
	id="date_button"
	value="2011-06-02"
	onclick="ds_sh('date_button', [10,40])"
>
```


### on multiple selects
For a given id attribute of 'birthday', you should have
- 3 selects with ids 'birthday_day', 'birthday_month' & 'birthday_year'.
- an hidden input text with id equal to 'birthday'

```html
<select
	name="date_select1_day"
	id="date_select1_day"
	size="1"
	onblur="ds_update('date_select1')"
>
	...
</select>
			
<select
	name="date_select1_month"
	id="date_select1_month"
	size="1"
	onblur="ds_update('date_select1')"
>
	...
</select>

<select
	name="date_select1_year"
	id="date_select1_year"
	size="1"
	onblur="ds_update('date_select1')"
>
</select>

<input
	type="hidden"
	name="date_select1"
	id="date_select1"
	value="2011-06-02"
>
<a
	href="javascript:ds_sh('date_select1','date_select1_dp')"
	id="date_select1_dp"
><img src="datepicker_cal.gif"></a>
```


## Known issues

At some point, dates & days name is going wrong.


## Want to contribute
Any contribution is always welcome.
As an example, Responsive CSS and multilingual support would be pretty nice contributions :)

## special thanks
Thanks to [DtTvB's work](http://javascriptkit.com/script/script2/dyndateselector.shtml), DatePicker really start as a cleanup of it.
