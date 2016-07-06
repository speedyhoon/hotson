# Hotson
Mindjholts takes a JavaScript object and inserts its values into DOM elements using each object key within a list of CSS selector rules. JavaScript objects don't need to be modified or prefixed with symbols to take advantage of this micro-library.

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
* :nth-child - ```:nth-child(key_name + 1)``` (only works for integers ignoring variable type)
* Id - ```#key_name```
* Class - ```.key_name```
* Tag name - ```[name=key_name]```
