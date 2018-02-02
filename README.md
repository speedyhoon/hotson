# Mindjholts
Mindjholts takes a JavaScript object or JSON string and inserts its values into DOM elements using each object key within a list of CSS selector rules. JavaScript objects don't need to be modified or prefixed with symbols to take advantage of this micro-library.

Forget about manually mapping your RESTful API to DOM elements using a mapping layer. Just create a template with attributes that match your API and voila!

This HTML form...
```html
<form>
	<label>First name: <input name=f></label>
	<label>Surname: <input name=s></label>
	<label>Club: <input name=c></label>
	<label>Age: <input name=a></label>
	<button>Save</button>
</form>
```
will be rendered as...
```html
<form>
	<label>First name: <input name=f value=Fred></label>
	<label>Surname: <input name=s value=Flinstone></label>
	<label>Club: <input name=c value=Bowling></label>
	<label>Age: <input name=a value=42></label>
	<button>Save</button>
</form>
```
using this JavaScript object and then calling m.render.
```js
var jsonData = {f: 'Fred', s: 'Flinstone', c: 'Bowling', a: 42};
m.render(document.querySelector('form'), jsonData);
```

Mindjholts searches for child DOM elements with each JavaScript object key surrounded with the following CSS notation:
* :nth-child - ```:nth-child(key_name + 1)``` (expects ints or string ints e.g: 1 or "1")
* Id - ```#key_name```
* Class - ```.key_name```
* Name attribute - ```[name=key_name]```

It is also possible to use arrays.
```js
jsonData = [
	['Fred', 'Flinstone', 'Bowling', 42],
	['Bob', 'Bilsteen', 'Basketball', 88],
	{0: 'Sam', '1': 'Smith', '2': 'Tennis', 3: 7}
];
m.render(document.querySelector('tbody tr'), jsonData);
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

Why name it mindjholts? It is an anagram of _HTML JSON ids_.
