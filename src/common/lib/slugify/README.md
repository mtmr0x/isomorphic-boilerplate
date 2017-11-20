# Slugify

`slugify` takes a string as argument and return it slugged for many uses. First written for parse country names from API resonses and apply a proper CSS Class for showing the country flag in product areas.

## Usage

Import it in your code and:

```javascript
slugify('África do Sul'); // africa-do-sul

// second argument is optional. See Doc section
slugify('África do Sul', '_'); // africa_do_sul
```

## Doc

### `slugify(String, separator)`

*String:* a string argument to be slugified. Required argument;

*separator:* the separator for blank spaces. Optional argument.

