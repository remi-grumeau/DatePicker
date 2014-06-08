# Date Picker
### Lightweight javascript framework-free datepicker

Based on [DtTvB work](http://javascriptkit.com/script/script2/dyndateselector.shtml), this is just an improved way for automatic usage.
It also includes some bugfixes, improvements and fully compatible with IE8+. 
No third-party library dependency.

# How to use
## on an input
For a given id attribute of 'birthday', you should have
- an input text with id equal to 'birthday'
- an onclick event on it to show datepicker 

``` <input type="text" name="date_button" id="date_button" value="2011-06-02" onclick="ds_sh('date_button','date_button')"> ```

Then, use ds_sh(id value, position) to use datepicker. 
First parameter is the ID value of the input element, second is the ID value of an element to use its X-Y position (could be any DOM element). 

Position can also be an array with X & Y values as [10,40].
```  <input type="text" name="date_button" id="date_button" value="2011-06-02" onclick="ds_sh('date_button', [10,40])"> ```


## on multiple selects
For a given id attribute of 'birthday', you should have
- 3 selects with ids 'birthday_day', 'birthday_month' & 'birthday_year'.
- an hidden input text with id equal to 'birthday'

# Known issues
If no valid date is given, everything blows, where it should use today date.