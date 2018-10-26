# Mindjholts
Mindjholts takes a JavaScript object or JSON string and inserts its values into DOM elements using each object key as a list of CSS selector rules. JavaScript objects don't need to be modified or prefixed with symbols to take advantage of this micro-library.

Forget about manually mapping your RESTful API to DOM elements using a mapping layer. Just create a template with attributes that match your API and voila!

This HTML form...
```html
<form>
	<label>First name: <input name=firstname></label>
	<label>Surname: <input name=surname></label>
	<label>Club: <input name=club></label>
	<label>Age: <input name=age></label>
	<button>Save</button>
</form>
```
will be rendered as...
```html
<form>
	<label>First name: <input name=firstname value=Fred></label>
	<label>Surname: <input name=surname value=Flinstone></label>
	<label>Club: <input name=club value=Bowling></label>
	<label>Age: <input name=age value=42></label>
	<button>Save</button>
</form>
```
using this JavaScript object and then calling m.render.
```js
var object = {firstname: 'Fred', surname: 'Flinstone', club: 'Bowling', age: 42};
m.render(document.querySelector('form'), object);
```

Mindjholts searches for child DOM elements with each JavaScript object key surrounded with the following CSS notation:
* :nth-child - ```:nth-child(key_name + 1)``` (expects numeric or string integers e.g: 1 or "1")
* Id - ```#key_name```
* Class - ```.key_name```
* Name attribute - ```[name=key_name]```

It is also possible to use arrays.
```js
var data = [
	['Fred', 'Flinstone', 'Bowling', 42],
	['Bob', 'Bilsteen', 'Basketball', 88],
	{0: 'Sam', '1': 'Smith', '2': 'Tennis', 3: 7}
];
m.render(document.querySelector('tbody tr'), data);
```
```html
<table>
	<thead>
		<tr><th>Firstname<th>Surname<th>Club<th>Age
	</thead>
	<tr><td><td><td><td>
</table>
```
Is transformed into:
```html
<table>
	<thead>
		<tr><th>Firstname<th>Surname<th>Club<th>Age
	</thead>
	<tr><td>Fred<td>Flinstone<td>Bowling<td>42
	<tr><td>Bob<td>Bilsteen<td>Basketball<td>88
	<tr><td>Sam<td>Smith<td>Tennis<td>7
</table>
```

Why name it Mindjholts? It's an anagram of _HTML JSON ID's_.
