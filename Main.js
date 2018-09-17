(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.ap.V === region.aB.V)
	{
		return 'on line ' + region.ap.V;
	}
	return 'on lines ' + region.ap.V + ' through ' + region.aB.V;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bd,
		impl.bu,
		impl.bp,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		w: func(record.w),
		ar: record.ar,
		an: record.an
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || key !== 'checked' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.w;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.ar;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.an) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bd,
		impl.bu,
		impl.bp,
		function(sendToApp, initialModel) {
			var view = impl.bw;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bd,
		impl.bu,
		impl.bp,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.X && impl.X(sendToApp)
			var view = impl.bw;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.a4);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.bs) && (_VirtualDom_doc.title = title = doc.bs);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.bi;
	var onUrlRequest = impl.bj;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		X: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.aR === next.aR
							&& curr.aF === next.aF
							&& curr.aO.a === next.aO.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		bd: function(flags)
		{
			return A3(impl.bd, flags, _Browser_getUrl(), key);
		},
		bw: impl.bw,
		bu: impl.bu,
		bp: impl.bp
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { ba: 'hidden', S: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { ba: 'mozHidden', S: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { ba: 'msHidden', S: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { ba: 'webkitHidden', S: 'webkitvisibilitychange' }
		: { ba: 'hidden', S: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		aV: _Browser_getScene(),
		a0: {
			av: _Browser_window.pageXOffset,
			aw: _Browser_window.pageYOffset,
			a1: _Browser_doc.documentElement.clientWidth,
			aE: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		a1: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		aE: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			aV: {
				a1: node.scrollWidth,
				aE: node.scrollHeight
			},
			a0: {
				av: node.scrollLeft,
				aw: node.scrollTop,
				a1: node.clientWidth,
				aE: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			aV: _Browser_getScene(),
			a0: {
				av: x,
				aw: y,
				a1: _Browser_doc.documentElement.clientWidth,
				aE: _Browser_doc.documentElement.clientHeight
			},
			a6: {
				av: x + rect.left,
				aw: y + rect.top,
				a1: rect.width,
				aE: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var author$project$Data$Game$Balls = F3(
	function (inGame, incoming, timer) {
		return {b: inGame, C: incoming, ah: timer};
	});
var author$project$Data$Game$FreeSince = function (a) {
	return {$: 1, a: a};
};
var author$project$Physical$Field$playerPadding = 400;
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$LT = 0;
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = 2;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var author$project$Physical$Field$placePlayer1 = _Utils_Tuple2(author$project$Physical$Field$playerPadding, author$project$Physical$Field$playerPadding);
var author$project$Physical$Field$height = 1600;
var elm$core$Basics$sub = _Basics_sub;
var author$project$Physical$Field$placePlayer2 = _Utils_Tuple2(author$project$Physical$Field$playerPadding, author$project$Physical$Field$height - author$project$Physical$Field$playerPadding);
var author$project$Physical$Field$width = 3200;
var author$project$Physical$Field$placePlayer3 = _Utils_Tuple2(author$project$Physical$Field$width - author$project$Physical$Field$playerPadding, author$project$Physical$Field$playerPadding);
var author$project$Physical$Field$placePlayer4 = _Utils_Tuple2(author$project$Physical$Field$width - author$project$Physical$Field$playerPadding, author$project$Physical$Field$height - author$project$Physical$Field$playerPadding);
var elm$core$Basics$False = 1;
var elm$core$Maybe$Nothing = {$: 1};
var author$project$Physical$Player$init = F3(
	function (frameTime, direction, pos) {
		return {
			p: direction,
			W: pos,
			O: elm$core$Maybe$Nothing,
			d: _Utils_Tuple2(0, 0),
			bn: elm$core$Maybe$Nothing,
			br: false,
			_: frameTime
		};
	});
var elm$core$Basics$pi = _Basics_pi;
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var author$project$Data$Game$init = function (startTime) {
	return {
		c: A3(
			author$project$Data$Game$Balls,
			elm$core$Dict$empty,
			_List_fromArray(
				[0, 1, 2]),
			author$project$Data$Game$FreeSince(startTime)),
		a: elm$core$Dict$empty,
		T: startTime,
		i: A3(author$project$Physical$Player$init, startTime, 0, author$project$Physical$Field$placePlayer1),
		j: A3(author$project$Physical$Player$init, startTime, 0, author$project$Physical$Field$placePlayer2),
		k: A3(author$project$Physical$Player$init, startTime, elm$core$Basics$pi, author$project$Physical$Field$placePlayer3),
		l: A3(author$project$Physical$Player$init, startTime, elm$core$Basics$pi, author$project$Physical$Field$placePlayer4),
		N: _Utils_Tuple2(0, 0),
		aX: startTime,
		y: 0
	};
};
var author$project$Physical$Player$Control = F2(
	function (thrusting, holdingShot) {
		return {bb: holdingShot, br: thrusting};
	});
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.e) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.g),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.g);
		} else {
			var treeLen = builder.e * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.h) : builder.h;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.e);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.g) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.g);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{h: nodeList, e: (len / elm$core$Array$branchFactor) | 0, g: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$time$Time$Posix = elm$core$Basics$identity;
var elm$time$Time$millisToPosix = elm$core$Basics$identity;
var author$project$Main$init = function (_n0) {
	var time = _n0.a$;
	var size = _n0.aW;
	var gamepadTime = 0;
	return _Utils_Tuple2(
		{
			ae: size,
			T: elm$time$Time$millisToPosix(gamepadTime),
			U: author$project$Data$Game$init(
				elm$time$Time$millisToPosix(gamepadTime)),
			ag: {
				a9: A2(author$project$Physical$Player$Control, elm$core$Maybe$Nothing, false),
				bk: A2(author$project$Physical$Player$Control, elm$core$Maybe$Nothing, false),
				bq: A2(author$project$Physical$Player$Control, elm$core$Maybe$Nothing, false),
				bt: A2(author$project$Physical$Player$Control, elm$core$Maybe$Nothing, false)
			},
			aW: size
		},
		elm$core$Platform$Cmd$none);
};
var author$project$Main$NewGamepadFrame = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$Resizes = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$array = _Json_decodeArray;
var elm$json$Json$Decode$bool = _Json_decodeBool;
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$float = _Json_decodeFloat;
var elm$json$Json$Decode$index = _Json_decodeIndex;
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Ports$gamepad = _Platform_incomingPort(
	'gamepad',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(
					elm$json$Json$Decode$index,
					1,
					A2(
						elm$json$Json$Decode$andThen,
						function (timestamp) {
							return A2(
								elm$json$Json$Decode$andThen,
								function (gamepads) {
									return elm$json$Json$Decode$succeed(
										{af: gamepads, au: timestamp});
								},
								A2(
									elm$json$Json$Decode$field,
									'gamepads',
									elm$json$Json$Decode$list(
										A2(
											elm$json$Json$Decode$andThen,
											function (mapping) {
												return A2(
													elm$json$Json$Decode$andThen,
													function (index) {
														return A2(
															elm$json$Json$Decode$andThen,
															function (id) {
																return A2(
																	elm$json$Json$Decode$andThen,
																	function (buttons) {
																		return A2(
																			elm$json$Json$Decode$andThen,
																			function (axes) {
																				return elm$json$Json$Decode$succeed(
																					{ai: axes, ak: buttons, J: id, o: index, aH: mapping});
																			},
																			A2(
																				elm$json$Json$Decode$field,
																				'axes',
																				elm$json$Json$Decode$array(elm$json$Json$Decode$float)));
																	},
																	A2(
																		elm$json$Json$Decode$field,
																		'buttons',
																		elm$json$Json$Decode$array(
																			A2(
																				elm$json$Json$Decode$andThen,
																				function (x0) {
																					return A2(
																						elm$json$Json$Decode$andThen,
																						function (x1) {
																							return elm$json$Json$Decode$succeed(
																								_Utils_Tuple2(x0, x1));
																						},
																						A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$float));
																				},
																				A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$bool)))));
															},
															A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string));
													},
													A2(elm$json$Json$Decode$field, 'index', elm$json$Json$Decode$int));
											},
											A2(elm$json$Json$Decode$field, 'mapping', elm$json$Json$Decode$string)))));
						},
						A2(elm$json$Json$Decode$field, 'timestamp', elm$json$Json$Decode$float))));
		},
		A2(
			elm$json$Json$Decode$index,
			0,
			A2(
				elm$json$Json$Decode$andThen,
				function (timestamp) {
					return A2(
						elm$json$Json$Decode$andThen,
						function (gamepads) {
							return elm$json$Json$Decode$succeed(
								{af: gamepads, au: timestamp});
						},
						A2(
							elm$json$Json$Decode$field,
							'gamepads',
							elm$json$Json$Decode$list(
								A2(
									elm$json$Json$Decode$andThen,
									function (mapping) {
										return A2(
											elm$json$Json$Decode$andThen,
											function (index) {
												return A2(
													elm$json$Json$Decode$andThen,
													function (id) {
														return A2(
															elm$json$Json$Decode$andThen,
															function (buttons) {
																return A2(
																	elm$json$Json$Decode$andThen,
																	function (axes) {
																		return elm$json$Json$Decode$succeed(
																			{ai: axes, ak: buttons, J: id, o: index, aH: mapping});
																	},
																	A2(
																		elm$json$Json$Decode$field,
																		'axes',
																		elm$json$Json$Decode$array(elm$json$Json$Decode$float)));
															},
															A2(
																elm$json$Json$Decode$field,
																'buttons',
																elm$json$Json$Decode$array(
																	A2(
																		elm$json$Json$Decode$andThen,
																		function (x0) {
																			return A2(
																				elm$json$Json$Decode$andThen,
																				function (x1) {
																					return elm$json$Json$Decode$succeed(
																						_Utils_Tuple2(x0, x1));
																				},
																				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$float));
																		},
																		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$bool)))));
													},
													A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string));
											},
											A2(elm$json$Json$Decode$field, 'index', elm$json$Json$Decode$int));
									},
									A2(elm$json$Json$Decode$field, 'mapping', elm$json$Json$Decode$string)))));
				},
				A2(elm$json$Json$Decode$field, 'timestamp', elm$json$Json$Decode$float)))));
var author$project$Ports$resizes = _Platform_incomingPort(
	'resizes',
	A2(
		elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (height) {
					return elm$json$Json$Decode$succeed(
						{aE: height, a1: width});
				},
				A2(elm$json$Json$Decode$field, 'height', elm$json$Json$Decode$float));
		},
		A2(elm$json$Json$Decode$field, 'width', elm$json$Json$Decode$float)));
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$Main$subscriptions = function (_n0) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Ports$resizes(author$project$Main$Resizes),
				author$project$Ports$gamepad(author$project$Main$NewGamepadFrame)
			]));
};
var author$project$Gamepad$animationFrameTimestamp = function (_n0) {
	var currentFrame = _n0.a;
	var previousFrame = _n0.b;
	return elm$time$Time$millisToPosix(
		elm$core$Basics$floor(currentFrame.au));
};
var author$project$Controller$Gamepad$animationFrameTimestamp = author$project$Gamepad$animationFrameTimestamp;
var author$project$Gamepad$UserMappings = elm$core$Basics$identity;
var author$project$Gamepad$emptyUserMappings = {H: elm$core$Dict$empty, A: elm$core$Dict$empty};
var author$project$Gamepad$Gamepad = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var author$project$Gamepad$A = 0;
var author$project$Gamepad$Axis = 0;
var author$project$Gamepad$B = 1;
var author$project$Gamepad$Back = 5;
var author$project$Gamepad$Button = 1;
var author$project$Gamepad$DpadDown = 22;
var author$project$Gamepad$DpadLeft = 23;
var author$project$Gamepad$DpadRight = 24;
var author$project$Gamepad$DpadUp = 21;
var author$project$Gamepad$Home = 6;
var author$project$Gamepad$LeftBumper = 13;
var author$project$Gamepad$LeftStickDown = 9;
var author$project$Gamepad$LeftStickLeft = 10;
var author$project$Gamepad$LeftStickPress = 7;
var author$project$Gamepad$LeftStickRight = 11;
var author$project$Gamepad$LeftStickUp = 8;
var author$project$Gamepad$LeftTrigger = 12;
var author$project$Gamepad$Origin = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var author$project$Gamepad$RightBumper = 20;
var author$project$Gamepad$RightStickDown = 16;
var author$project$Gamepad$RightStickLeft = 17;
var author$project$Gamepad$RightStickPress = 14;
var author$project$Gamepad$RightStickRight = 18;
var author$project$Gamepad$RightStickUp = 15;
var author$project$Gamepad$RightTrigger = 19;
var author$project$Gamepad$Start = 4;
var author$project$Gamepad$X = 2;
var author$project$Gamepad$Y = 3;
var author$project$Gamepad$destinationToString = function (destination) {
	switch (destination) {
		case 0:
			return 'a';
		case 1:
			return 'b';
		case 2:
			return 'x';
		case 3:
			return 'y';
		case 4:
			return 'start';
		case 5:
			return 'back';
		case 6:
			return 'home';
		case 10:
			return 'leftleft';
		case 11:
			return 'leftright';
		case 8:
			return 'leftup';
		case 9:
			return 'leftdown';
		case 7:
			return 'leftstick';
		case 13:
			return 'leftbumper';
		case 12:
			return 'lefttrigger';
		case 17:
			return 'rightleft';
		case 18:
			return 'rightright';
		case 15:
			return 'rightup';
		case 16:
			return 'rightdown';
		case 14:
			return 'rightstick';
		case 20:
			return 'rightbumper';
		case 19:
			return 'righttrigger';
		case 21:
			return 'dpadup';
		case 22:
			return 'dpaddown';
		case 23:
			return 'dpadleft';
		default:
			return 'dpadright';
	}
};
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var author$project$Gamepad$pairsToMapping = function (pairs) {
	return elm$core$Dict$fromList(
		A2(
			elm$core$List$map,
			function (_n0) {
				var origin = _n0.a;
				var digital = _n0.b;
				return _Utils_Tuple2(
					author$project$Gamepad$destinationToString(digital),
					origin);
			},
			pairs));
};
var author$project$Gamepad$standardGamepadMapping = author$project$Gamepad$pairsToMapping(
	A2(
		elm$core$List$map,
		function (_n0) {
			var a = _n0.a;
			var b = _n0.b;
			return _Utils_Tuple2(b, a);
		},
		_List_fromArray(
			[
				_Utils_Tuple2(
				0,
				A3(author$project$Gamepad$Origin, false, 1, 0)),
				_Utils_Tuple2(
				1,
				A3(author$project$Gamepad$Origin, false, 1, 1)),
				_Utils_Tuple2(
				2,
				A3(author$project$Gamepad$Origin, false, 1, 2)),
				_Utils_Tuple2(
				3,
				A3(author$project$Gamepad$Origin, false, 1, 3)),
				_Utils_Tuple2(
				4,
				A3(author$project$Gamepad$Origin, false, 1, 9)),
				_Utils_Tuple2(
				5,
				A3(author$project$Gamepad$Origin, false, 1, 8)),
				_Utils_Tuple2(
				6,
				A3(author$project$Gamepad$Origin, false, 1, 16)),
				_Utils_Tuple2(
				10,
				A3(author$project$Gamepad$Origin, true, 0, 0)),
				_Utils_Tuple2(
				11,
				A3(author$project$Gamepad$Origin, false, 0, 0)),
				_Utils_Tuple2(
				8,
				A3(author$project$Gamepad$Origin, true, 0, 1)),
				_Utils_Tuple2(
				9,
				A3(author$project$Gamepad$Origin, false, 0, 1)),
				_Utils_Tuple2(
				7,
				A3(author$project$Gamepad$Origin, false, 1, 10)),
				_Utils_Tuple2(
				13,
				A3(author$project$Gamepad$Origin, false, 1, 4)),
				_Utils_Tuple2(
				12,
				A3(author$project$Gamepad$Origin, false, 1, 6)),
				_Utils_Tuple2(
				17,
				A3(author$project$Gamepad$Origin, true, 0, 2)),
				_Utils_Tuple2(
				18,
				A3(author$project$Gamepad$Origin, false, 0, 2)),
				_Utils_Tuple2(
				15,
				A3(author$project$Gamepad$Origin, true, 0, 3)),
				_Utils_Tuple2(
				16,
				A3(author$project$Gamepad$Origin, false, 0, 3)),
				_Utils_Tuple2(
				14,
				A3(author$project$Gamepad$Origin, false, 1, 11)),
				_Utils_Tuple2(
				20,
				A3(author$project$Gamepad$Origin, false, 1, 5)),
				_Utils_Tuple2(
				19,
				A3(author$project$Gamepad$Origin, false, 1, 7)),
				_Utils_Tuple2(
				21,
				A3(author$project$Gamepad$Origin, false, 1, 12)),
				_Utils_Tuple2(
				22,
				A3(author$project$Gamepad$Origin, false, 1, 13)),
				_Utils_Tuple2(
				23,
				A3(author$project$Gamepad$Origin, false, 1, 14)),
				_Utils_Tuple2(
				24,
				A3(author$project$Gamepad$Origin, false, 1, 15))
			])));
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var author$project$Gamepad$getGamepadMapping = F2(
	function (_n0, frame) {
		var database = _n0;
		var _n1 = A2(
			elm$core$Dict$get,
			_Utils_Tuple2(frame.o, frame.J),
			database.A);
		if (!_n1.$) {
			var mapping = _n1.a;
			return elm$core$Maybe$Just(mapping);
		} else {
			return ((frame.aH === 'standard') || (frame.aH === '')) ? elm$core$Maybe$Just(author$project$Gamepad$standardGamepadMapping) : A2(elm$core$Dict$get, frame.J, database.H);
		}
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var author$project$Gamepad$getGamepads = F2(
	function (userMappings, _n0) {
		var currentBlobFrame = _n0.a;
		var previousBlobFrame = _n0.b;
		var getGamepad = function (currentGamepadFrame) {
			return A3(
				elm$core$Maybe$map2,
				F2(
					function (previousGamepadFrame, mapping) {
						return A3(author$project$Gamepad$Gamepad, mapping, currentGamepadFrame, previousGamepadFrame);
					}),
				A2(
					elm_community$list_extra$List$Extra$find,
					function (prev) {
						return _Utils_eq(prev.o, currentGamepadFrame.o);
					},
					previousBlobFrame.af),
				A2(author$project$Gamepad$getGamepadMapping, userMappings, currentGamepadFrame));
		};
		return A2(elm$core$List$filterMap, getGamepad, currentBlobFrame.af);
	});
var author$project$Controller$Gamepad$getGamepads = author$project$Gamepad$getGamepads(author$project$Gamepad$emptyUserMappings);
var author$project$Controller$Gamepad$deadZone = 1.0e-2;
var author$project$Gamepad$axisToButton = function (n) {
	return n > 0.6;
};
var author$project$Gamepad$mappingToOrigin = F2(
	function (destination, mapping) {
		return A2(
			elm$core$Dict$get,
			author$project$Gamepad$destinationToString(destination),
			mapping);
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var author$project$Gamepad$reverseAxis = F2(
	function (isReverse, n) {
		return isReverse ? (-n) : n;
	});
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_n0.$) {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var author$project$Gamepad$getAsBool = F3(
	function (destination, mapping, frame) {
		var _n0 = A2(author$project$Gamepad$mappingToOrigin, destination, mapping);
		if (_n0.$ === 1) {
			return false;
		} else {
			if (!_n0.a.b) {
				var _n1 = _n0.a;
				var isReverse = _n1.a;
				var _n2 = _n1.b;
				var index = _n1.c;
				return author$project$Gamepad$axisToButton(
					A2(
						author$project$Gamepad$reverseAxis,
						isReverse,
						A2(
							elm$core$Maybe$withDefault,
							0,
							A2(elm$core$Array$get, index, frame.ai))));
			} else {
				var _n3 = _n0.a;
				var isReverse = _n3.a;
				var _n4 = _n3.b;
				var index = _n3.c;
				return A2(
					elm$core$Maybe$withDefault,
					false,
					A2(
						elm$core$Maybe$map,
						elm$core$Tuple$first,
						A2(elm$core$Array$get, index, frame.ak)));
			}
		}
	});
var author$project$Gamepad$isPressed = F2(
	function (_n0, digital) {
		var mapping = _n0.a;
		var currentFrame = _n0.b;
		var previousFrame = _n0.c;
		return A3(author$project$Gamepad$getAsBool, digital, mapping, currentFrame);
	});
var author$project$Gamepad$LeftX = 0;
var author$project$Gamepad$LeftY = 1;
var author$project$Gamepad$One = function (a) {
	return {$: 0, a: a};
};
var author$project$Gamepad$Two = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Gamepad$analogToDestination = function (analog) {
	switch (analog) {
		case 0:
			return A2(author$project$Gamepad$Two, 10, 11);
		case 1:
			return A2(author$project$Gamepad$Two, 9, 8);
		case 2:
			return author$project$Gamepad$One(12);
		case 3:
			return A2(author$project$Gamepad$Two, 17, 18);
		case 4:
			return A2(author$project$Gamepad$Two, 16, 15);
		default:
			return author$project$Gamepad$One(19);
	}
};
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var author$project$Gamepad$getAsFloat = F3(
	function (destination, mapping, frame) {
		var _n0 = A2(author$project$Gamepad$mappingToOrigin, destination, mapping);
		if (_n0.$ === 1) {
			return 0;
		} else {
			if (!_n0.a.b) {
				var _n1 = _n0.a;
				var isReverse = _n1.a;
				var _n2 = _n1.b;
				var index = _n1.c;
				return A2(
					author$project$Gamepad$reverseAxis,
					isReverse,
					A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, index, frame.ai)));
			} else {
				var _n3 = _n0.a;
				var isReverse = _n3.a;
				var _n4 = _n3.b;
				var index = _n3.c;
				return A2(
					elm$core$Maybe$withDefault,
					0,
					A2(
						elm$core$Maybe$map,
						elm$core$Tuple$second,
						A2(elm$core$Array$get, index, frame.ak)));
			}
		}
	});
var author$project$Gamepad$getAxis = F4(
	function (negativeDestination, positiveDestination, mapping, frame) {
		var positive = A3(author$project$Gamepad$getAsFloat, positiveDestination, mapping, frame);
		var negative = A3(author$project$Gamepad$getAsFloat, negativeDestination, mapping, frame);
		return _Utils_eq(positive, -negative) ? positive : (positive - negative);
	});
var author$project$Gamepad$value = F2(
	function (_n0, analog) {
		var mapping = _n0.a;
		var currentFrame = _n0.b;
		var previousFrame = _n0.c;
		var _n1 = author$project$Gamepad$analogToDestination(analog);
		if (!_n1.$) {
			var positive = _n1.a;
			return A3(author$project$Gamepad$getAsFloat, positive, mapping, currentFrame);
		} else {
			var negative = _n1.a;
			var positive = _n1.b;
			return A4(author$project$Gamepad$getAxis, negative, positive, mapping, currentFrame);
		}
	});
var author$project$Gamepad$leftStickPosition = function (pad) {
	return {
		av: A2(author$project$Gamepad$value, pad, 0),
		aw: A2(author$project$Gamepad$value, pad, 1)
	};
};
var elm$core$Basics$atan2 = _Basics_atan2;
var author$project$Controller$Gamepad$toPlayerControl = function (gamepad) {
	var stick = author$project$Gamepad$leftStickPosition(gamepad);
	var thrusting = (_Utils_cmp((stick.av * stick.av) + (stick.aw * stick.aw), author$project$Controller$Gamepad$deadZone) < 0) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
		A2(elm$core$Basics$atan2, -stick.aw, stick.av));
	return {
		bb: A2(author$project$Gamepad$isPressed, gamepad, 0),
		br: thrusting
	};
};
var author$project$Gamepad$getIndex = function (_n0) {
	var mapping = _n0.a;
	var currentFrame = _n0.b;
	var previousFrame = _n0.c;
	return currentFrame.o;
};
var author$project$Controller$Gamepad$toPlayerControlAcc = F2(
	function (gamepad, controls) {
		var _n0 = author$project$Gamepad$getIndex(gamepad);
		switch (_n0) {
			case 1:
				return _Utils_update(
					controls,
					{
						bk: author$project$Controller$Gamepad$toPlayerControl(gamepad)
					});
			case 2:
				return _Utils_update(
					controls,
					{
						bt: author$project$Controller$Gamepad$toPlayerControl(gamepad)
					});
			case 3:
				return _Utils_update(
					controls,
					{
						bq: author$project$Controller$Gamepad$toPlayerControl(gamepad)
					});
			case 4:
				return _Utils_update(
					controls,
					{
						a9: author$project$Controller$Gamepad$toPlayerControl(gamepad)
					});
			default:
				return controls;
		}
	});
var author$project$Controller$Gamepad$updatePlayerControls = F2(
	function (gamepads, controls) {
		return A3(elm$core$List$foldl, author$project$Controller$Gamepad$toPlayerControlAcc, controls, gamepads);
	});
var author$project$Data$Game$WaitingForFreeSpace = {$: 0};
var author$project$Data$Game$ballTimer = 4000;
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0;
	return millis;
};
var author$project$Data$Helper$timeDiff = F2(
	function (t1, t2) {
		return elm$time$Time$posixToMillis(t2) - elm$time$Time$posixToMillis(t1);
	});
var author$project$Physical$Field$center = _Utils_Tuple2(author$project$Physical$Field$width / 2, author$project$Physical$Field$height / 2);
var author$project$Physical$Ball$init = function (frameTime) {
	return {
		W: author$project$Physical$Field$center,
		d: _Utils_Tuple2(0, 0),
		aZ: elm$core$Maybe$Nothing,
		_: frameTime
	};
};
var author$project$Data$Game$checkSpawnBall = F2(
	function (frameTime, balls) {
		var inGame = balls.b;
		var incoming = balls.C;
		var timer = balls.ah;
		var _n0 = _Utils_Tuple2(incoming, timer);
		if (_n0.a.b && (_n0.b.$ === 1)) {
			var _n1 = _n0.a;
			var ballId = _n1.a;
			var otherBallIds = _n1.b;
			var timerStartTime = _n0.b.a;
			return (_Utils_cmp(
				A2(author$project$Data$Helper$timeDiff, timerStartTime, frameTime),
				author$project$Data$Game$ballTimer) > 0) ? A3(
				author$project$Data$Game$Balls,
				A3(
					elm$core$Dict$insert,
					ballId,
					author$project$Physical$Ball$init(frameTime),
					inGame),
				otherBallIds,
				author$project$Data$Game$WaitingForFreeSpace) : balls;
		} else {
			return balls;
		}
	});
var author$project$Physical$Ball$size = 60;
var author$project$Physical$Ball$squareDistanceFrom = F2(
	function (_n0, _n1) {
		var x = _n0.a;
		var y = _n0.b;
		var pos = _n1.W;
		var dy = pos.b - y;
		var dx = pos.a - x;
		return (dx * dx) + (dy * dy);
	});
var elm$core$Dict$values = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			elm$core$List$any,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
			list);
	});
var author$project$Data$Game$centerIsFree = function (ballsInGame) {
	return A2(
		elm$core$List$all,
		function (ball) {
			return _Utils_cmp(
				A2(author$project$Physical$Ball$squareDistanceFrom, author$project$Physical$Field$center, ball),
				(4 * author$project$Physical$Ball$size) * author$project$Physical$Ball$size) > 0;
		},
		elm$core$Dict$values(ballsInGame));
};
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var author$project$Data$Game$checkStartBallCounter = F2(
	function (frameTime, balls) {
		var inGame = balls.b;
		var incoming = balls.C;
		var timer = balls.ah;
		return (_Utils_eq(timer, author$project$Data$Game$WaitingForFreeSpace) && ((!elm$core$List$isEmpty(incoming)) && author$project$Data$Game$centerIsFree(inGame))) ? _Utils_update(
			balls,
			{
				ah: author$project$Data$Game$FreeSince(frameTime)
			}) : balls;
	});
var author$project$Physical$Ball$prepareMovement = F2(
	function (duration, ball) {
		var viscosityCoef = A2(elm$core$Basics$max, 0, 1 - (1.5e-3 * duration));
		var newSpeed = _Utils_Tuple2(viscosityCoef * ball.d.a, viscosityCoef * ball.d.b);
		return _Utils_update(
			ball,
			{d: newSpeed});
	});
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2(elm$core$Dict$map, func, left),
				A2(elm$core$Dict$map, func, right));
		}
	});
var author$project$Data$Game$prepareBallsMovements = F2(
	function (duration, balls) {
		return _Utils_update(
			balls,
			{
				b: A2(
					elm$core$Dict$map,
					F2(
						function (_n0, ball) {
							return A2(author$project$Physical$Ball$prepareMovement, duration, ball);
						}),
					balls.b)
			});
	});
var author$project$Data$Game$changeGameBalls = F3(
	function (newFrameTime, duration, _n0) {
		var game = _n0.a;
		var sounds = _n0.b;
		var newBalls = A2(
			author$project$Data$Game$checkSpawnBall,
			newFrameTime,
			A2(
				author$project$Data$Game$checkStartBallCounter,
				newFrameTime,
				A2(author$project$Data$Game$prepareBallsMovements, duration, game.c)));
		return _Utils_Tuple2(
			_Utils_update(
				game,
				{c: newBalls}),
			sounds);
	});
var author$project$Data$Game$isNothing = function (maybe) {
	if (maybe.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var author$project$Physical$Ball$bounceCoef = 1.0;
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var author$project$Physical$Ball$bounceOnWalls = function (ball) {
	var _n0 = ball.W;
	var x = _n0.a;
	var y = _n0.b;
	var _n1 = ball.d;
	var vX = _n1.a;
	var vY = _n1.b;
	var _n2 = function () {
		if (_Utils_cmp(y, author$project$Physical$Ball$size) < 0) {
			return _Utils_Tuple2(
				author$project$Physical$Ball$size + (author$project$Physical$Ball$bounceCoef * (author$project$Physical$Ball$size - y)),
				author$project$Physical$Ball$bounceCoef * A2(elm$core$Basics$max, -vY, vY));
		} else {
			if (_Utils_cmp(y, author$project$Physical$Field$height - author$project$Physical$Ball$size) > 0) {
				var limit = author$project$Physical$Field$height - author$project$Physical$Ball$size;
				return _Utils_Tuple2(
					limit - (author$project$Physical$Ball$bounceCoef * (y - limit)),
					author$project$Physical$Ball$bounceCoef * A2(elm$core$Basics$min, -vY, vY));
			} else {
				return _Utils_Tuple2(y, vY);
			}
		}
	}();
	var newY = _n2.a;
	var newVY = _n2.b;
	return _Utils_update(
		ball,
		{
			W: _Utils_Tuple2(x, newY),
			d: _Utils_Tuple2(vX, newVY)
		});
};
var author$project$Physical$Ball$moveUntil = F2(
	function (time, ball) {
		var duration = elm$time$Time$posixToMillis(time) - elm$time$Time$posixToMillis(ball._);
		var newPos = _Utils_Tuple2(ball.W.a + (duration * ball.d.a), ball.W.b + (duration * ball.d.b));
		return author$project$Physical$Ball$bounceOnWalls(
			_Utils_update(
				ball,
				{W: newPos, _: time}));
	});
var author$project$Data$Game$moveBallsUntil = F2(
	function (newFrameTime, balls) {
		return _Utils_update(
			balls,
			{
				b: A2(
					elm$core$Dict$map,
					F2(
						function (_n0, ball) {
							return A2(author$project$Physical$Ball$moveUntil, newFrameTime, ball);
						}),
					balls.b)
			});
	});
var author$project$Physical$Bullet$bigSpeed = 1.0;
var author$project$Physical$Bullet$mediumSpeed = 1.2;
var elm$core$Basics$cos = _Basics_cos;
var elm$core$Basics$sin = _Basics_sin;
var author$project$Physical$Bullet$moveAtSpeed = F3(
	function (speed, duration, bullet) {
		var pos = bullet.W;
		var direction = bullet.p;
		var newPos = _Utils_Tuple2(
			pos.a + ((speed * duration) * elm$core$Basics$cos(direction)),
			pos.b + ((speed * duration) * elm$core$Basics$sin(direction)));
		return _Utils_update(
			bullet,
			{W: newPos});
	});
var author$project$Physical$Bullet$smallSpeed = 1.4;
var author$project$Physical$Bullet$move = F2(
	function (duration, bullet) {
		var _n0 = bullet.aW;
		switch (_n0) {
			case 0:
				return A3(author$project$Physical$Bullet$moveAtSpeed, author$project$Physical$Bullet$smallSpeed, duration, bullet);
			case 1:
				return A3(author$project$Physical$Bullet$moveAtSpeed, author$project$Physical$Bullet$mediumSpeed, duration, bullet);
			default:
				return A3(author$project$Physical$Bullet$moveAtSpeed, author$project$Physical$Bullet$bigSpeed, duration, bullet);
		}
	});
var author$project$Physical$Player$size = 40;
var author$project$Physical$Player$checkWallObstacle = F5(
	function (left, right, top, bottom, player) {
		var topLimit = top + author$project$Physical$Player$size;
		var rightLimit = right - author$project$Physical$Player$size;
		var leftLimit = left + author$project$Physical$Player$size;
		var bottomLimit = bottom - author$project$Physical$Player$size;
		var _n0 = player.W;
		var x = _n0.a;
		var y = _n0.b;
		var _n1 = player.d;
		var vX = _n1.a;
		var vY = _n1.b;
		var _n2 = (_Utils_cmp(y, topLimit) < 0) ? _Utils_Tuple2(topLimit + (0.5 * (topLimit - y)), (-0.5) * vY) : ((_Utils_cmp(y, bottomLimit) > 0) ? _Utils_Tuple2(bottomLimit - (0.5 * (y - bottomLimit)), (-0.5) * vY) : _Utils_Tuple2(y, vY));
		var newY = _n2.a;
		var newVY = _n2.b;
		var _n3 = (_Utils_cmp(x, leftLimit) < 0) ? _Utils_Tuple2(leftLimit + (0.5 * (leftLimit - x)), (-0.5) * vX) : ((_Utils_cmp(x, rightLimit) > 0) ? _Utils_Tuple2(rightLimit - (0.5 * (x - rightLimit)), (-0.5) * vX) : _Utils_Tuple2(x, vX));
		var newX = _n3.a;
		var newVX = _n3.b;
		return _Utils_update(
			player,
			{
				W: _Utils_Tuple2(newX, newY),
				d: _Utils_Tuple2(newVX, newVY)
			});
	});
var author$project$Physical$Player$moveUntil = F2(
	function (time, player) {
		var deltaTime = elm$time$Time$posixToMillis(time) - elm$time$Time$posixToMillis(player._);
		var _n0 = player.d;
		var vX = _n0.a;
		var vY = _n0.b;
		var pos = _Utils_Tuple2(player.W.a + (vX * deltaTime), player.W.b + (vY * deltaTime));
		return _Utils_update(
			player,
			{W: pos, _: time});
	});
var author$project$Data$Game$moveAllUntil = F2(
	function (newFrameTime, _n0) {
		var game = _n0.a;
		var sounds = _n0.b;
		var newPlayer4 = A5(
			author$project$Physical$Player$checkWallObstacle,
			0,
			author$project$Physical$Field$width,
			0,
			author$project$Physical$Field$height,
			A2(author$project$Physical$Player$moveUntil, newFrameTime, game.l));
		var newPlayer3 = A5(
			author$project$Physical$Player$checkWallObstacle,
			0,
			author$project$Physical$Field$width,
			0,
			author$project$Physical$Field$height,
			A2(author$project$Physical$Player$moveUntil, newFrameTime, game.k));
		var newPlayer2 = A5(
			author$project$Physical$Player$checkWallObstacle,
			0,
			author$project$Physical$Field$width,
			0,
			author$project$Physical$Field$height,
			A2(author$project$Physical$Player$moveUntil, newFrameTime, game.j));
		var newPlayer1 = A5(
			author$project$Physical$Player$checkWallObstacle,
			0,
			author$project$Physical$Field$width,
			0,
			author$project$Physical$Field$height,
			A2(author$project$Physical$Player$moveUntil, newFrameTime, game.i));
		var newBalls = A2(author$project$Data$Game$moveBallsUntil, newFrameTime, game.c);
		var duration = elm$time$Time$posixToMillis(newFrameTime) - elm$time$Time$posixToMillis(game.T);
		var newBullets = A2(
			elm$core$Dict$map,
			F2(
				function (_n1, pB) {
					return _Utils_update(
						pB,
						{
							q: A2(author$project$Physical$Bullet$move, duration, pB.q)
						});
				}),
			game.a);
		return _Utils_Tuple2(
			_Utils_update(
				game,
				{c: newBalls, a: newBullets, T: newFrameTime, i: newPlayer1, j: newPlayer2, k: newPlayer3, l: newPlayer4}),
			sounds);
	});
var author$project$Physical$Player$maxSpeed = 1.0;
var author$project$Physical$Player$maxStunDuration = 2000;
var author$project$Physical$Player$prepareMovement = F4(
	function (duration, thrusting, direction, player) {
		var viscosity = 4.0e-3 * duration;
		var viscosityCoef = A2(elm$core$Basics$max, 0, 1 - viscosity);
		var thrust = author$project$Physical$Player$maxSpeed * viscosity;
		var stillStunned = function () {
			var _n1 = player.bn;
			if (!_n1.$) {
				var stunnedTime = _n1.a;
				return _Utils_cmp(
					elm$time$Time$posixToMillis(player._) - elm$time$Time$posixToMillis(stunnedTime),
					author$project$Physical$Player$maxStunDuration) < 0;
			} else {
				return false;
			}
		}();
		var stunned = stillStunned ? player.bn : elm$core$Maybe$Nothing;
		var _n0 = player.d;
		var oldVX = _n0.a;
		var oldVY = _n0.b;
		var speed = (stillStunned || (!thrusting)) ? _Utils_Tuple2(viscosityCoef * oldVX, viscosityCoef * oldVY) : _Utils_Tuple2(
			(viscosityCoef * oldVX) + (thrust * elm$core$Basics$cos(direction)),
			(viscosityCoef * oldVY) + (thrust * elm$core$Basics$sin(direction)));
		return _Utils_update(
			player,
			{p: direction, d: speed, bn: stunned, br: thrusting});
	});
var author$project$Data$Game$preparePlayers = F4(
	function (duration, directions, thrustings, _n0) {
		var game = _n0.a;
		var sounds = _n0.b;
		var newPlayer4 = A4(author$project$Physical$Player$prepareMovement, duration, thrustings.a9, directions.a9, game.l);
		var newPlayer3 = A4(author$project$Physical$Player$prepareMovement, duration, thrustings.bq, directions.bq, game.k);
		var newPlayer2 = A4(author$project$Physical$Player$prepareMovement, duration, thrustings.bt, directions.bt, game.j);
		var newPlayer1 = A4(author$project$Physical$Player$prepareMovement, duration, thrustings.bk, directions.bk, game.i);
		return _Utils_Tuple2(
			_Utils_update(
				game,
				{i: newPlayer1, j: newPlayer2, k: newPlayer3, l: newPlayer4}),
			sounds);
	});
var author$project$Data$ListExtra$reversePrepend = F2(
	function (list1, list2) {
		reversePrepend:
		while (true) {
			if (!list1.b) {
				return list2;
			} else {
				var l = list1.a;
				var ls = list1.b;
				var $temp$list1 = ls,
					$temp$list2 = A2(elm$core$List$cons, l, list2);
				list1 = $temp$list1;
				list2 = $temp$list2;
				continue reversePrepend;
			}
		}
	});
var author$project$Data$Vector$dot = F2(
	function (_n0, _n1) {
		var x1 = _n0.a;
		var y1 = _n0.b;
		var x2 = _n1.a;
		var y2 = _n1.b;
		return (x1 * x2) + (y1 * y2);
	});
var author$project$Data$Vector$fromTo = F2(
	function (_n0, _n1) {
		var x1 = _n0.a;
		var y1 = _n0.b;
		var x2 = _n1.a;
		var y2 = _n1.b;
		return _Utils_Tuple2(x2 - x1, y2 - y1);
	});
var author$project$Data$Vector$norm2 = function (_n0) {
	var x = _n0.a;
	var y = _n0.b;
	return (x * x) + (y * y);
};
var author$project$Processing$Collision$BallBall = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var elm$core$Basics$sqrt = _Basics_sqrt;
var author$project$Processing$Collision$collideBallWithBall = F3(
	function (duration, _n0, _n1) {
		var id1 = _n0.a;
		var ball1 = _n0.b;
		var id2 = _n1.a;
		var ball2 = _n1.b;
		var d = 2 * author$project$Physical$Ball$size;
		var dd = d * d;
		var b = A2(author$project$Data$Vector$fromTo, ball1.W, ball2.W);
		var bb = author$project$Data$Vector$norm2(b);
		var a = A2(author$project$Data$Vector$fromTo, ball1.d, ball2.d);
		var aa = author$project$Data$Vector$norm2(a);
		var ab = A2(author$project$Data$Vector$dot, a, b);
		var discriminant = (ab * ab) - (aa * (bb - dd));
		if (discriminant < 0) {
			return elm$core$Maybe$Nothing;
		} else {
			var sqDiscriminant = elm$core$Basics$sqrt(discriminant);
			var t1 = ((-ab) - sqDiscriminant) / aa;
			var t2 = ((-ab) + sqDiscriminant) / aa;
			return ((t2 >= 0) && (_Utils_cmp(t1, duration) < 1)) ? elm$core$Maybe$Just(
				{
					be: A2(author$project$Processing$Collision$BallBall, id1, id2),
					a$: A2(elm$core$Basics$max, 0, t1)
				}) : elm$core$Maybe$Nothing;
		}
	});
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var author$project$Processing$Collision$ballBallAll = F2(
	function (duration, balls) {
		_n0$2:
		while (true) {
			if (balls.b && balls.b.b) {
				if (!balls.b.b.b) {
					var b1 = balls.a;
					var _n1 = balls.b;
					var b2 = _n1.a;
					return A2(
						elm$core$Maybe$withDefault,
						_List_Nil,
						A2(
							elm$core$Maybe$map,
							elm$core$List$singleton,
							A3(author$project$Processing$Collision$collideBallWithBall, duration, b1, b2)));
				} else {
					if (!balls.b.b.b.b) {
						var b1 = balls.a;
						var _n2 = balls.b;
						var b2 = _n2.a;
						var _n3 = _n2.b;
						var b3 = _n3.a;
						return A2(
							elm$core$List$filterMap,
							function (_n4) {
								var b_1 = _n4.a;
								var b_2 = _n4.b;
								return A3(author$project$Processing$Collision$collideBallWithBall, duration, b_1, b_2);
							},
							_List_fromArray(
								[
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(b1, b3),
									_Utils_Tuple2(b2, b3)
								]));
					} else {
						break _n0$2;
					}
				}
			} else {
				break _n0$2;
			}
		}
		return _List_Nil;
	});
var author$project$Physical$Field$Bottom = 3;
var author$project$Physical$Field$Left = 0;
var author$project$Physical$Field$Right = 1;
var author$project$Physical$Field$Top = 2;
var author$project$Processing$Collision$BallWall = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var author$project$Processing$Collision$makeCollisionIfLowerThan = F3(
	function (duration, kind, collisionTime) {
		return ((collisionTime >= 0) && (_Utils_cmp(collisionTime, duration) < 1)) ? elm$core$Maybe$Just(
			{be: kind, a$: collisionTime}) : elm$core$Maybe$Nothing;
	});
var author$project$Processing$Collision$timeOfCollideWithBottomWall = F3(
	function (radius, y, vY) {
		var distance = (author$project$Physical$Field$height - radius) - y;
		return (distance < 0) ? 0 : (distance / vY);
	});
var author$project$Processing$Collision$timeOfCollideWithLeftWall = F3(
	function (radius, x, vX) {
		var negativeDistance = radius - x;
		return (negativeDistance > 0) ? 0 : (negativeDistance / vX);
	});
var author$project$Processing$Collision$timeOfCollideWithRightWall = F3(
	function (radius, x, vX) {
		var distance = (author$project$Physical$Field$width - radius) - x;
		return (distance < 0) ? 0 : (distance / vX);
	});
var author$project$Processing$Collision$timeOfCollideWithTopWall = F3(
	function (radius, y, vY) {
		var negativeDistance = radius - y;
		return (negativeDistance > 0) ? 0 : (negativeDistance / vY);
	});
var author$project$Processing$Collision$collideBallWithWalls = F2(
	function (duration, _n0) {
		var id = _n0.a;
		var ball = _n0.b;
		var _n1 = ball.W;
		var x = _n1.a;
		var y = _n1.b;
		var _n2 = ball.d;
		var vX = _n2.a;
		var vY = _n2.b;
		var leftTime = A3(
			author$project$Processing$Collision$makeCollisionIfLowerThan,
			duration,
			A2(author$project$Processing$Collision$BallWall, id, 0),
			A3(author$project$Processing$Collision$timeOfCollideWithLeftWall, author$project$Physical$Ball$size, x, vX));
		var rightTime = A3(
			author$project$Processing$Collision$makeCollisionIfLowerThan,
			duration,
			A2(author$project$Processing$Collision$BallWall, id, 1),
			A3(author$project$Processing$Collision$timeOfCollideWithRightWall, author$project$Physical$Ball$size, x, vX));
		var bottomTime = A3(
			author$project$Processing$Collision$makeCollisionIfLowerThan,
			duration,
			A2(author$project$Processing$Collision$BallWall, id, 3),
			A3(author$project$Processing$Collision$timeOfCollideWithBottomWall, author$project$Physical$Ball$size, y, vY));
		var topTime = A3(
			author$project$Processing$Collision$makeCollisionIfLowerThan,
			duration,
			A2(author$project$Processing$Collision$BallWall, id, 2),
			A3(author$project$Processing$Collision$timeOfCollideWithTopWall, author$project$Physical$Ball$size, y, vY));
		return A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[leftTime, rightTime, topTime, bottomTime]));
	});
var author$project$Processing$Collision$ballWallAll = F2(
	function (duration, balls) {
		return A3(
			elm$core$List$foldl,
			author$project$Data$ListExtra$reversePrepend,
			_List_Nil,
			A2(
				elm$core$List$map,
				author$project$Processing$Collision$collideBallWithWalls(duration),
				balls));
	});
var author$project$Physical$Bullet$bigSize = 60;
var author$project$Physical$Bullet$mediumSize = 40;
var author$project$Physical$Bullet$smallSize = 20;
var author$project$Physical$Bullet$radiusAndSpeed = function (bullet) {
	var _n0 = bullet.aW;
	switch (_n0) {
		case 0:
			return _Utils_Tuple3(
				author$project$Physical$Bullet$smallSize,
				author$project$Physical$Bullet$smallSpeed * elm$core$Basics$cos(bullet.p),
				author$project$Physical$Bullet$smallSpeed * elm$core$Basics$sin(bullet.p));
		case 1:
			return _Utils_Tuple3(
				author$project$Physical$Bullet$mediumSize,
				author$project$Physical$Bullet$mediumSpeed * elm$core$Basics$cos(bullet.p),
				author$project$Physical$Bullet$mediumSpeed * elm$core$Basics$sin(bullet.p));
		default:
			return _Utils_Tuple3(
				author$project$Physical$Bullet$bigSize,
				author$project$Physical$Bullet$bigSpeed * elm$core$Basics$cos(bullet.p),
				author$project$Physical$Bullet$bigSpeed * elm$core$Basics$sin(bullet.p));
	}
};
var author$project$Processing$Collision$BulletBall = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var author$project$Processing$Collision$collideBallWithBullet = F3(
	function (duration, _n0, _n1) {
		var ballId = _n0.a;
		var ball = _n0.b;
		var id = _n1.a;
		var bullet = _n1.b;
		var b = A2(author$project$Data$Vector$fromTo, ball.W, bullet.W);
		var bb = author$project$Data$Vector$norm2(b);
		var _n2 = author$project$Physical$Bullet$radiusAndSpeed(bullet);
		var bulletRadius = _n2.a;
		var bulletSpeedX = _n2.b;
		var bulletSpeedY = _n2.c;
		var d = author$project$Physical$Ball$size + bulletRadius;
		var dd = d * d;
		var a = A2(
			author$project$Data$Vector$fromTo,
			ball.d,
			_Utils_Tuple2(bulletSpeedX, bulletSpeedY));
		var aa = author$project$Data$Vector$norm2(a);
		var ab = A2(author$project$Data$Vector$dot, a, b);
		var discriminant = (ab * ab) - (aa * (bb - dd));
		if (discriminant < 0) {
			return elm$core$Maybe$Nothing;
		} else {
			var sqDiscriminant = elm$core$Basics$sqrt(discriminant);
			var t1 = ((-ab) - sqDiscriminant) / aa;
			var t2 = ((-ab) + sqDiscriminant) / aa;
			return ((t2 >= 0) && (_Utils_cmp(t1, duration) < 1)) ? elm$core$Maybe$Just(
				{
					be: A2(author$project$Processing$Collision$BulletBall, id, ballId),
					a$: A2(elm$core$Basics$max, 0, t1)
				}) : elm$core$Maybe$Nothing;
		}
	});
var author$project$Processing$Collision$collideBallWithBullets = F3(
	function (duration, bullets, identifiedBall) {
		return A2(
			elm$core$List$filterMap,
			A2(author$project$Processing$Collision$collideBallWithBullet, duration, identifiedBall),
			bullets);
	});
var author$project$Processing$Collision$bulletBallAll = F3(
	function (duration, bullets, balls) {
		return A3(
			elm$core$List$foldl,
			author$project$Data$ListExtra$reversePrepend,
			_List_Nil,
			A2(
				elm$core$List$map,
				A2(author$project$Processing$Collision$collideBallWithBullets, duration, bullets),
				balls));
	});
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var author$project$Data$ListExtra$pairWith = F2(
	function (x, list) {
		return A2(
			elm$core$List$map,
			elm$core$Tuple$pair(x),
			list);
	});
var author$project$Data$ListExtra$pairsAccum = F2(
	function (list, accum) {
		pairsAccum:
		while (true) {
			if (list.b) {
				var x = list.a;
				var xs = list.b;
				var $temp$list = xs,
					$temp$accum = A2(
					author$project$Data$ListExtra$reversePrepend,
					A2(author$project$Data$ListExtra$pairWith, x, xs),
					accum);
				list = $temp$list;
				accum = $temp$accum;
				continue pairsAccum;
			} else {
				return accum;
			}
		}
	});
var author$project$Data$ListExtra$pairs = function (list) {
	return A2(author$project$Data$ListExtra$pairsAccum, list, _List_Nil);
};
var author$project$Processing$Collision$BulletBullet = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var author$project$Processing$Collision$collideBulletWithBullet = F3(
	function (duration, _n0, _n1) {
		var id1 = _n0.a;
		var bullet1 = _n0.b;
		var id2 = _n1.a;
		var bullet2 = _n1.b;
		var b = A2(author$project$Data$Vector$fromTo, bullet1.W, bullet2.W);
		var bb = author$project$Data$Vector$norm2(b);
		var _n2 = author$project$Physical$Bullet$radiusAndSpeed(bullet2);
		var radius2 = _n2.a;
		var speedX2 = _n2.b;
		var speedY2 = _n2.c;
		var _n3 = author$project$Physical$Bullet$radiusAndSpeed(bullet1);
		var radius1 = _n3.a;
		var speedX1 = _n3.b;
		var speedY1 = _n3.c;
		var d = radius1 + radius2;
		var dd = d * d;
		var a = A2(
			author$project$Data$Vector$fromTo,
			_Utils_Tuple2(speedX1, speedX2),
			_Utils_Tuple2(speedX2, speedY2));
		var aa = author$project$Data$Vector$norm2(a);
		var ab = A2(author$project$Data$Vector$dot, a, b);
		var discriminant = (ab * ab) - (aa * (bb - dd));
		if (discriminant < 0) {
			return elm$core$Maybe$Nothing;
		} else {
			var sqDiscriminant = elm$core$Basics$sqrt(discriminant);
			var t1 = ((-ab) - sqDiscriminant) / aa;
			var t2 = ((-ab) + sqDiscriminant) / aa;
			return ((t2 >= 0) && (_Utils_cmp(t1, duration) < 1)) ? elm$core$Maybe$Just(
				{
					be: A2(author$project$Processing$Collision$BulletBullet, id1, id2),
					a$: A2(elm$core$Basics$max, 0, t1)
				}) : elm$core$Maybe$Nothing;
		}
	});
var author$project$Processing$Collision$bulletBulletAll = F2(
	function (duration, bullets) {
		return A2(
			elm$core$List$filterMap,
			function (_n0) {
				var b1 = _n0.a;
				var b2 = _n0.b;
				return A3(author$project$Processing$Collision$collideBulletWithBullet, duration, b1, b2);
			},
			author$project$Data$ListExtra$pairs(bullets));
	});
var author$project$Processing$Collision$BulletWall = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var author$project$Processing$Collision$collideWithWalls = F2(
	function (duration, _n0) {
		var id = _n0.a;
		var bullet = _n0.b;
		var _n1 = bullet.W;
		var x = _n1.a;
		var y = _n1.b;
		var _n2 = author$project$Physical$Bullet$radiusAndSpeed(bullet);
		var radius = _n2.a;
		var vX = _n2.b;
		var vY = _n2.c;
		var leftTime = A3(
			author$project$Processing$Collision$makeCollisionIfLowerThan,
			duration,
			A2(author$project$Processing$Collision$BulletWall, id, 0),
			A3(author$project$Processing$Collision$timeOfCollideWithLeftWall, radius, x, vX));
		var rightTime = A3(
			author$project$Processing$Collision$makeCollisionIfLowerThan,
			duration,
			A2(author$project$Processing$Collision$BulletWall, id, 1),
			A3(author$project$Processing$Collision$timeOfCollideWithRightWall, radius, x, vX));
		var bottomTime = A3(
			author$project$Processing$Collision$makeCollisionIfLowerThan,
			duration,
			A2(author$project$Processing$Collision$BulletWall, id, 3),
			A3(author$project$Processing$Collision$timeOfCollideWithBottomWall, radius, y, vY));
		var topTime = A3(
			author$project$Processing$Collision$makeCollisionIfLowerThan,
			duration,
			A2(author$project$Processing$Collision$BulletWall, id, 2),
			A3(author$project$Processing$Collision$timeOfCollideWithTopWall, radius, y, vY));
		return A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[leftTime, rightTime, topTime, bottomTime]));
	});
var author$project$Processing$Collision$bulletWallAll = F2(
	function (duration, bullets) {
		return A3(
			elm$core$List$foldl,
			author$project$Data$ListExtra$reversePrepend,
			_List_Nil,
			A2(
				elm$core$List$map,
				author$project$Processing$Collision$collideWithWalls(duration),
				bullets));
	});
var author$project$Data$Helper$Deux = 1;
var author$project$Data$Helper$Quatre = 3;
var author$project$Data$Helper$Trois = 2;
var author$project$Data$Helper$Un = 0;
var author$project$Processing$Collision$PlayerBall = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var author$project$Processing$Collision$collidePlayerWithBall = F3(
	function (duration, _n0, _n1) {
		var oneOfFour = _n0.a;
		var player = _n0.b;
		var ballId = _n1.a;
		var ball = _n1.b;
		var d = author$project$Physical$Player$size + author$project$Physical$Ball$size;
		var dd = d * d;
		var b = A2(author$project$Data$Vector$fromTo, player.W, ball.W);
		var bb = author$project$Data$Vector$norm2(b);
		var a = A2(author$project$Data$Vector$fromTo, player.d, ball.d);
		var aa = author$project$Data$Vector$norm2(a);
		var ab = A2(author$project$Data$Vector$dot, a, b);
		var discriminant = (ab * ab) - (aa * (bb - dd));
		if (discriminant < 0) {
			return elm$core$Maybe$Nothing;
		} else {
			var sqDiscriminant = elm$core$Basics$sqrt(discriminant);
			var t1 = ((-ab) - sqDiscriminant) / aa;
			var t2 = ((-ab) + sqDiscriminant) / aa;
			return ((t2 >= 0) && (_Utils_cmp(t1, duration) < 1)) ? elm$core$Maybe$Just(
				{
					be: A2(author$project$Processing$Collision$PlayerBall, oneOfFour, ballId),
					a$: A2(elm$core$Basics$max, 0, t1)
				}) : elm$core$Maybe$Nothing;
		}
	});
var author$project$Processing$Collision$collidePlayerWithAllBalls = F3(
	function (duration, identifiedPlayer, balls) {
		return A2(
			elm$core$List$filterMap,
			A2(author$project$Processing$Collision$collidePlayerWithBall, duration, identifiedPlayer),
			balls);
	});
var author$project$Processing$Collision$playerBallAll = F6(
	function (duration, p1, p2, p3, p4, balls) {
		return A2(
			author$project$Data$ListExtra$reversePrepend,
			A3(
				author$project$Processing$Collision$collidePlayerWithAllBalls,
				duration,
				_Utils_Tuple2(3, p4),
				balls),
			A2(
				author$project$Data$ListExtra$reversePrepend,
				A3(
					author$project$Processing$Collision$collidePlayerWithAllBalls,
					duration,
					_Utils_Tuple2(2, p3),
					balls),
				A2(
					author$project$Data$ListExtra$reversePrepend,
					A3(
						author$project$Processing$Collision$collidePlayerWithAllBalls,
						duration,
						_Utils_Tuple2(1, p2),
						balls),
					A3(
						author$project$Processing$Collision$collidePlayerWithAllBalls,
						duration,
						_Utils_Tuple2(0, p1),
						balls))));
	});
var author$project$Processing$Collision$PlayerBullet = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Processing$Collision$collidePlayerWithBullet = F3(
	function (duration, _n0, _n1) {
		var oneOfFour = _n0.a;
		var player = _n0.b;
		var bulletId = _n1.a;
		var bullet = _n1.b;
		var b = A2(author$project$Data$Vector$fromTo, player.W, bullet.W);
		var bb = author$project$Data$Vector$norm2(b);
		var _n2 = author$project$Physical$Bullet$radiusAndSpeed(bullet);
		var bulletRadius = _n2.a;
		var bulletSpeedX = _n2.b;
		var bulletSpeedY = _n2.c;
		var d = author$project$Physical$Player$size + bulletRadius;
		var dd = d * d;
		var a = A2(
			author$project$Data$Vector$fromTo,
			player.d,
			_Utils_Tuple2(bulletSpeedX, bulletSpeedY));
		var aa = author$project$Data$Vector$norm2(a);
		var ab = A2(author$project$Data$Vector$dot, a, b);
		var discriminant = (ab * ab) - (aa * (bb - dd));
		if (discriminant < 0) {
			return elm$core$Maybe$Nothing;
		} else {
			var sqDiscriminant = elm$core$Basics$sqrt(discriminant);
			var t1 = ((-ab) - sqDiscriminant) / aa;
			var t2 = ((-ab) + sqDiscriminant) / aa;
			return ((t2 >= 0) && (_Utils_cmp(t1, duration) < 1)) ? elm$core$Maybe$Just(
				{
					be: A2(author$project$Processing$Collision$PlayerBullet, oneOfFour, bulletId),
					a$: A2(elm$core$Basics$max, 0, t1)
				}) : elm$core$Maybe$Nothing;
		}
	});
var author$project$Processing$Collision$collidePlayerWithAllBullets = F3(
	function (duration, identifiedPlayer, bullets) {
		return A2(
			elm$core$List$filterMap,
			A2(author$project$Processing$Collision$collidePlayerWithBullet, duration, identifiedPlayer),
			bullets);
	});
var author$project$Processing$Collision$playerBulletAll = F6(
	function (duration, p1, p2, p3, p4, bullets) {
		return A2(
			author$project$Data$ListExtra$reversePrepend,
			A3(
				author$project$Processing$Collision$collidePlayerWithAllBullets,
				duration,
				_Utils_Tuple2(3, p4),
				bullets),
			A2(
				author$project$Data$ListExtra$reversePrepend,
				A3(
					author$project$Processing$Collision$collidePlayerWithAllBullets,
					duration,
					_Utils_Tuple2(2, p3),
					bullets),
				A2(
					author$project$Data$ListExtra$reversePrepend,
					A3(
						author$project$Processing$Collision$collidePlayerWithAllBullets,
						duration,
						_Utils_Tuple2(1, p2),
						bullets),
					A3(
						author$project$Processing$Collision$collidePlayerWithAllBullets,
						duration,
						_Utils_Tuple2(0, p1),
						bullets))));
	});
var author$project$Processing$Collision$playerPlayerAll = F5(
	function (duration, p1, p2, p3, p4) {
		return _List_Nil;
	});
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var author$project$Data$Game$allCollisions = F2(
	function (endTime, game) {
		var player1 = game.i;
		var player2 = game.j;
		var player3 = game.k;
		var player4 = game.l;
		var duration = elm$time$Time$posixToMillis(endTime) - elm$time$Time$posixToMillis(game.T);
		var allBulletsList = A2(
			elm$core$List$map,
			elm$core$Tuple$mapSecond(
				function ($) {
					return $.q;
				}),
			elm$core$Dict$toList(game.a));
		var allBallsWithId = elm$core$Dict$toList(game.c.b);
		return A2(
			author$project$Data$ListExtra$reversePrepend,
			A2(author$project$Processing$Collision$bulletWallAll, duration, allBulletsList),
			A2(
				author$project$Data$ListExtra$reversePrepend,
				A2(author$project$Processing$Collision$ballWallAll, duration, allBallsWithId),
				A2(
					author$project$Data$ListExtra$reversePrepend,
					A2(author$project$Processing$Collision$ballBallAll, duration, allBallsWithId),
					A2(
						author$project$Data$ListExtra$reversePrepend,
						A3(author$project$Processing$Collision$bulletBallAll, duration, allBulletsList, allBallsWithId),
						A2(
							author$project$Data$ListExtra$reversePrepend,
							A2(author$project$Processing$Collision$bulletBulletAll, duration, allBulletsList),
							A2(
								author$project$Data$ListExtra$reversePrepend,
								A6(author$project$Processing$Collision$playerBallAll, duration, player1, player2, player3, player4, allBallsWithId),
								A2(
									author$project$Data$ListExtra$reversePrepend,
									A6(author$project$Processing$Collision$playerBulletAll, duration, player1, player2, player3, player4, allBulletsList),
									A5(author$project$Processing$Collision$playerPlayerAll, duration, player1, player2, player3, player4))))))));
	});
var author$project$Data$Vector$add = F2(
	function (_n0, _n1) {
		var x1 = _n0.a;
		var y1 = _n0.b;
		var x2 = _n1.a;
		var y2 = _n1.b;
		return _Utils_Tuple2(x1 + x2, y1 + y2);
	});
var author$project$Data$Vector$diff = F2(
	function (_n0, _n1) {
		var x1 = _n0.a;
		var y1 = _n0.b;
		var x2 = _n1.a;
		var y2 = _n1.b;
		return _Utils_Tuple2(x1 - x2, y1 - y2);
	});
var author$project$Data$Vector$times = F2(
	function (scalar, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(scalar * x, scalar * y);
	});
var author$project$Physical$Ball$moveDuring = F2(
	function (duration, ball) {
		var time = elm$time$Time$millisToPosix(
			elm$time$Time$posixToMillis(ball._) + elm$core$Basics$floor(duration));
		return A2(author$project$Physical$Ball$moveUntil, time, ball);
	});
var author$project$Data$Game$impactBallBall = F4(
	function (time, id1, id2, game) {
		var balls = game.c;
		var _n0 = _Utils_Tuple2(
			A2(elm$core$Dict$get, id1, balls.b),
			A2(elm$core$Dict$get, id2, balls.b));
		if ((!_n0.a.$) && (!_n0.b.$)) {
			var ball1 = _n0.a.a;
			var ball2 = _n0.b.a;
			var b2 = A2(author$project$Physical$Ball$moveDuring, time, ball2);
			var b1 = A2(author$project$Physical$Ball$moveDuring, time, ball1);
			var centerDiff = A2(author$project$Data$Vector$diff, b1.W, b2.W);
			var squareDistance = 1.0e-6 + author$project$Data$Vector$norm2(centerDiff);
			var speedDiff = A2(author$project$Data$Vector$diff, b1.d, b2.d);
			var newSpeed1 = A2(
				author$project$Data$Vector$diff,
				b1.d,
				A2(
					author$project$Data$Vector$times,
					A2(author$project$Data$Vector$dot, speedDiff, centerDiff) / squareDistance,
					centerDiff));
			var newBall1 = _Utils_update(
				b1,
				{d: newSpeed1});
			var newSpeed2 = A2(
				author$project$Data$Vector$add,
				b2.d,
				A2(
					author$project$Data$Vector$times,
					A2(author$project$Data$Vector$dot, speedDiff, centerDiff) / squareDistance,
					centerDiff));
			var newBall2 = _Utils_update(
				b2,
				{d: newSpeed2});
			var ballsInGame = A3(
				elm$core$Dict$insert,
				id2,
				newBall2,
				A3(elm$core$Dict$insert, id1, newBall1, balls.b));
			return _Utils_update(
				game,
				{
					c: _Utils_update(
						balls,
						{b: ballsInGame})
				});
		} else {
			return game;
		}
	});
var author$project$Data$Game$playerNumber = F2(
	function (oneOfFour, game) {
		switch (oneOfFour) {
			case 0:
				return game.i;
			case 1:
				return game.j;
			case 2:
				return game.k;
			default:
				return game.l;
		}
	});
var author$project$Physical$Player$stun = function (player) {
	return _Utils_update(
		player,
		{
			O: elm$core$Maybe$Nothing,
			bn: elm$core$Maybe$Just(player._)
		});
};
var author$project$Data$Game$impactBallPlayer = F4(
	function (time, ballId, oneOfFour, game) {
		var balls = game.c;
		var _n0 = A2(elm$core$Dict$get, ballId, balls.b);
		if (!_n0.$) {
			var ball = _n0.a;
			var player = A2(author$project$Data$Game$playerNumber, oneOfFour, game);
			var b = A2(author$project$Physical$Ball$moveDuring, time, ball);
			var centerDiff = A2(author$project$Data$Vector$diff, b.W, player.W);
			var squareDistance = 1.0e-6 + author$project$Data$Vector$norm2(centerDiff);
			var speedDiff = A2(author$project$Data$Vector$diff, b.d, player.d);
			var newBallSpeed = A2(
				author$project$Data$Vector$times,
				0.2,
				A2(
					author$project$Data$Vector$diff,
					b.d,
					A2(
						author$project$Data$Vector$times,
						A2(author$project$Data$Vector$dot, speedDiff, centerDiff) / squareDistance,
						centerDiff)));
			var newBall = _Utils_update(
				b,
				{d: newBallSpeed});
			var ballsInGame = A3(elm$core$Dict$insert, ballId, newBall, balls.b);
			var newBalls = _Utils_update(
				balls,
				{b: ballsInGame});
			var newPlayerSpeed = A2(
				author$project$Data$Vector$add,
				player.d,
				A2(
					author$project$Data$Vector$times,
					A2(author$project$Data$Vector$dot, speedDiff, centerDiff) / squareDistance,
					centerDiff));
			var newPlayer = author$project$Physical$Player$stun(
				_Utils_update(
					player,
					{d: newPlayerSpeed}));
			switch (oneOfFour) {
				case 0:
					return _Utils_update(
						game,
						{c: newBalls, i: newPlayer});
				case 1:
					return _Utils_update(
						game,
						{c: newBalls, j: newPlayer});
				case 2:
					return _Utils_update(
						game,
						{c: newBalls, k: newPlayer});
				default:
					return _Utils_update(
						game,
						{c: newBalls, l: newPlayer});
			}
		} else {
			return game;
		}
	});
var author$project$Data$Sound$Goal = 2;
var author$project$Data$Sound$PlaySound = elm$core$Basics$identity;
var author$project$Data$Sound$play = elm$core$Basics$identity;
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === -1) {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === -1) {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var author$project$Data$Game$impactBallWall = F4(
	function (time, ballId, wall, _n0) {
		var game = _n0.a;
		var balls = game.c;
		var sounds = _n0.b;
		var _n1 = _Utils_Tuple2(
			A2(elm$core$Dict$get, ballId, balls.b),
			wall);
		if (!_n1.a.$) {
			switch (_n1.b) {
				case 2:
					var ball = _n1.a.a;
					var _n2 = _n1.b;
					var movedBall = A2(author$project$Physical$Ball$moveDuring, time, ball);
					var _n3 = movedBall.d;
					var vX = _n3.a;
					var vY = _n3.b;
					var newBall = _Utils_update(
						movedBall,
						{
							d: _Utils_Tuple2(
								vX,
								A2(elm$core$Basics$max, -vY, vY))
						});
					var ballsInGame = A3(elm$core$Dict$insert, ballId, newBall, balls.b);
					return _Utils_Tuple2(
						_Utils_update(
							game,
							{
								c: _Utils_update(
									balls,
									{b: ballsInGame})
							}),
						sounds);
				case 3:
					var ball = _n1.a.a;
					var _n4 = _n1.b;
					var movedBall = A2(author$project$Physical$Ball$moveDuring, time, ball);
					var _n5 = movedBall.d;
					var vX = _n5.a;
					var vY = _n5.b;
					var newBall = _Utils_update(
						movedBall,
						{
							d: _Utils_Tuple2(
								vX,
								A2(elm$core$Basics$min, -vY, vY))
						});
					var ballsInGame = A3(elm$core$Dict$insert, ballId, newBall, balls.b);
					return _Utils_Tuple2(
						_Utils_update(
							game,
							{
								c: _Utils_update(
									balls,
									{b: ballsInGame})
							}),
						sounds);
				case 0:
					var ball = _n1.a.a;
					var _n6 = _n1.b;
					var newBalls = _Utils_update(
						balls,
						{
							b: A2(elm$core$Dict$remove, ballId, balls.b),
							C: A2(elm$core$List$cons, ballId, balls.C)
						});
					return _Utils_Tuple2(
						_Utils_update(
							game,
							{
								c: newBalls,
								N: A2(
									elm$core$Tuple$mapSecond,
									elm$core$Basics$add(1),
									game.N)
							}),
						A2(
							elm$core$List$cons,
							author$project$Data$Sound$play(2),
							sounds));
				default:
					var ball = _n1.a.a;
					var _n7 = _n1.b;
					var newBalls = _Utils_update(
						balls,
						{
							b: A2(elm$core$Dict$remove, ballId, balls.b),
							C: A2(elm$core$List$cons, ballId, balls.C)
						});
					return _Utils_Tuple2(
						_Utils_update(
							game,
							{
								c: newBalls,
								N: A2(
									elm$core$Tuple$mapFirst,
									elm$core$Basics$add(1),
									game.N)
							}),
						A2(
							elm$core$List$cons,
							author$project$Data$Sound$play(2),
							sounds));
			}
		} else {
			return _Utils_Tuple2(game, sounds);
		}
	});
var author$project$Data$Game$impactBulletBullet = F3(
	function (id1, id2, game) {
		var bullets = game.a;
		return _Utils_update(
			game,
			{
				a: A2(
					elm$core$Dict$remove,
					id2,
					A2(elm$core$Dict$remove, id1, bullets))
			});
	});
var author$project$Data$Game$impactBulletOnBall = F3(
	function (time, bullet, ball) {
		var movedBall = A2(author$project$Physical$Ball$moveDuring, time, ball);
		var impactForce = function () {
			var _n1 = bullet.aW;
			switch (_n1) {
				case 0:
					return 0.2;
				case 1:
					return 1.0;
				default:
					return 3.0;
			}
		}();
		var _n0 = movedBall.d;
		var speedX = _n0.a;
		var speedY = _n0.b;
		var newSpeed = _Utils_Tuple2(
			speedX + (impactForce * elm$core$Basics$cos(bullet.p)),
			speedY + (impactForce * elm$core$Basics$sin(bullet.p)));
		return _Utils_update(
			movedBall,
			{d: newSpeed});
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var author$project$Data$Game$updateBallWithId = F3(
	function (f, ballId, balls) {
		return _Utils_update(
			balls,
			{
				b: A3(
					elm$core$Dict$update,
					ballId,
					elm$core$Maybe$map(f),
					balls.b)
			});
	});
var author$project$Data$Game$impactIdentifiedBulletOnBall = F4(
	function (time, id, ballId, game) {
		var _n0 = A2(elm$core$Dict$get, id, game.a);
		if (_n0.$ === 1) {
			return game;
		} else {
			var bullet = _n0.a.q;
			return _Utils_update(
				game,
				{
					c: A3(
						author$project$Data$Game$updateBallWithId,
						A2(author$project$Data$Game$impactBulletOnBall, time, bullet),
						ballId,
						game.c),
					a: A2(elm$core$Dict$remove, id, game.a)
				});
		}
	});
var author$project$Physical$Player$moveDuring = F2(
	function (duration, player) {
		var time = elm$time$Time$millisToPosix(
			elm$time$Time$posixToMillis(player._) + elm$core$Basics$floor(duration));
		return A2(author$project$Physical$Player$moveUntil, time, player);
	});
var author$project$Data$Game$impactBulletOnPlayer = F3(
	function (time, bullet, player) {
		var movedPlayer = A2(author$project$Physical$Player$moveDuring, time, player);
		var impactForce = function () {
			var _n2 = bullet.aW;
			switch (_n2) {
				case 0:
					return 0.5;
				case 1:
					return 1.0;
				default:
					return 2.0;
			}
		}();
		var _n0 = player.d;
		var speedX = _n0.a;
		var speedY = _n0.b;
		var newSpeed = _Utils_Tuple2(
			speedX + (impactForce * elm$core$Basics$cos(bullet.p)),
			speedY + (impactForce * elm$core$Basics$sin(bullet.p)));
		var _n1 = player.bn;
		if (_n1.$ === 1) {
			return author$project$Physical$Player$stun(
				_Utils_update(
					movedPlayer,
					{d: newSpeed}));
		} else {
			return _Utils_update(
				movedPlayer,
				{d: newSpeed});
		}
	});
var author$project$Data$Game$impactIdentifiedBulletOnPlayer = F4(
	function (time, bulletId, oneOfFour, game) {
		var _n0 = _Utils_Tuple2(
			A2(elm$core$Dict$get, bulletId, game.a),
			oneOfFour);
		if (!_n0.a.$) {
			switch (_n0.b) {
				case 0:
					var bullet = _n0.a.a.q;
					var _n1 = _n0.b;
					return _Utils_update(
						game,
						{
							a: A2(elm$core$Dict$remove, bulletId, game.a),
							i: A3(author$project$Data$Game$impactBulletOnPlayer, time, bullet, game.i)
						});
				case 1:
					var bullet = _n0.a.a.q;
					var _n2 = _n0.b;
					return _Utils_update(
						game,
						{
							a: A2(elm$core$Dict$remove, bulletId, game.a),
							j: A3(author$project$Data$Game$impactBulletOnPlayer, time, bullet, game.j)
						});
				case 2:
					var bullet = _n0.a.a.q;
					var _n3 = _n0.b;
					return _Utils_update(
						game,
						{
							a: A2(elm$core$Dict$remove, bulletId, game.a),
							k: A3(author$project$Data$Game$impactBulletOnPlayer, time, bullet, game.k)
						});
				default:
					var bullet = _n0.a.a.q;
					var _n4 = _n0.b;
					return _Utils_update(
						game,
						{
							a: A2(elm$core$Dict$remove, bulletId, game.a),
							l: A3(author$project$Data$Game$impactBulletOnPlayer, time, bullet, game.l)
						});
			}
		} else {
			return game;
		}
	});
var author$project$Data$Sound$Collision = 1;
var author$project$Data$Game$processCollision = F2(
	function (_n0, _n1) {
		var time = _n0.a$;
		var kind = _n0.be;
		var game = _n1.a;
		var sounds = _n1.b;
		switch (kind.$) {
			case 5:
				var id = kind.a;
				return _Utils_Tuple2(
					_Utils_update(
						game,
						{
							a: A2(elm$core$Dict$remove, id, game.a)
						}),
					sounds);
			case 6:
				var bulletId = kind.a;
				var ballId = kind.b;
				return _Utils_Tuple2(
					A4(author$project$Data$Game$impactIdentifiedBulletOnBall, time, bulletId, ballId, game),
					sounds);
			case 2:
				var oneOfFour = kind.a;
				var bulletId = kind.b;
				return _Utils_Tuple2(
					A4(author$project$Data$Game$impactIdentifiedBulletOnPlayer, time, bulletId, oneOfFour, game),
					A2(
						elm$core$List$cons,
						author$project$Data$Sound$play(1),
						sounds));
			case 7:
				var id1 = kind.a;
				var id2 = kind.b;
				return _Utils_Tuple2(
					A4(author$project$Data$Game$impactBallBall, time, id1, id2, game),
					sounds);
			case 8:
				var ballId = kind.a;
				var wall = kind.b;
				return A4(
					author$project$Data$Game$impactBallWall,
					time,
					ballId,
					wall,
					_Utils_Tuple2(game, sounds));
			case 4:
				var id1 = kind.a;
				var id2 = kind.b;
				return _Utils_Tuple2(
					A3(author$project$Data$Game$impactBulletBullet, id1, id2, game),
					sounds);
			case 3:
				var oneOfFour = kind.a;
				var ballId = kind.b;
				return _Utils_Tuple2(
					A4(author$project$Data$Game$impactBallPlayer, time, ballId, oneOfFour, game),
					sounds);
			default:
				return _Utils_Tuple2(game, sounds);
		}
	});
var elm$core$List$sortBy = _List_sortBy;
var author$project$Data$Game$processCollisionsUntil = F2(
	function (endTime, _n0) {
		var game = _n0.a;
		var sounds = _n0.b;
		return A3(
			elm$core$List$foldl,
			author$project$Data$Game$processCollision,
			_Utils_Tuple2(game, sounds),
			A2(
				elm$core$List$sortBy,
				function ($) {
					return $.a$;
				},
				A2(author$project$Data$Game$allCollisions, endTime, game)));
	});
var author$project$Physical$Bullet$Big = 2;
var author$project$Physical$Bullet$Medium = 1;
var author$project$Physical$Bullet$Small = 0;
var author$project$Physical$Bullet$Bullet = F3(
	function (size, direction, pos) {
		return {p: direction, W: pos, aW: size};
	});
var author$project$Physical$Bullet$new = author$project$Physical$Bullet$Bullet;
var author$project$Physical$Player$bigChargeTime = 2000;
var author$project$Physical$Player$mediumChargeTime = 1000;
var author$project$Data$Game$spawnPlayerBullet = F2(
	function (duration, player) {
		var _n0 = player.W;
		var x = _n0.a;
		var y = _n0.b;
		var _n1 = (_Utils_cmp(duration, author$project$Physical$Player$bigChargeTime) > 0) ? _Utils_Tuple2(2, author$project$Physical$Bullet$bigSize) : ((_Utils_cmp(duration, author$project$Physical$Player$mediumChargeTime) > 0) ? _Utils_Tuple2(1, author$project$Physical$Bullet$mediumSize) : _Utils_Tuple2(0, author$project$Physical$Bullet$smallSize));
		var bulletSize = _n1.a;
		var bulletSizeFloat = _n1.b;
		var creationDistance = (1.0 + author$project$Physical$Player$size) + bulletSizeFloat;
		var bulletPos = _Utils_Tuple2(
			x + (creationDistance * elm$core$Basics$cos(player.p)),
			y + (creationDistance * elm$core$Basics$sin(player.p)));
		return A3(author$project$Physical$Bullet$new, bulletSize, player.p, bulletPos);
	});
var author$project$Physical$Player$shotRecoil = F2(
	function (chargeDuration, player) {
		var recoilForce = (_Utils_cmp(chargeDuration, author$project$Physical$Player$bigChargeTime) > 0) ? 1.2 : ((_Utils_cmp(chargeDuration, author$project$Physical$Player$mediumChargeTime) > 0) ? 0.8 : 0.4);
		var _n0 = player.d;
		var vX = _n0.a;
		var vY = _n0.b;
		var newSpeed = _Utils_Tuple2(
			vX - (recoilForce * elm$core$Basics$cos(player.p)),
			vY - (recoilForce * elm$core$Basics$sin(player.p)));
		return _Utils_update(
			player,
			{d: newSpeed});
	});
var author$project$Data$Game$updateBullets = F4(
	function (oneOfFour, hasShot, player, game) {
		if (!hasShot.$) {
			return game;
		} else {
			var chargeTime = hasShot.a;
			var playerBullet = {
				q: A2(author$project$Data$Game$spawnPlayerBullet, chargeTime, player),
				aN: oneOfFour
			};
			var newPlayer = A2(author$project$Physical$Player$shotRecoil, chargeTime, player);
			var newId = game.y + 1;
			var newBullets = A3(elm$core$Dict$insert, game.y, playerBullet, game.a);
			switch (oneOfFour) {
				case 0:
					return _Utils_update(
						game,
						{a: newBullets, i: newPlayer, y: newId});
				case 1:
					return _Utils_update(
						game,
						{a: newBullets, j: newPlayer, y: newId});
				case 2:
					return _Utils_update(
						game,
						{a: newBullets, k: newPlayer, y: newId});
				default:
					return _Utils_update(
						game,
						{a: newBullets, l: newPlayer, y: newId});
			}
		}
	});
var author$project$Data$Sound$Bullet = 0;
var author$project$Physical$Player$NoShot = {$: 0};
var author$project$Physical$Player$ShotAfter = function (a) {
	return {$: 1, a: a};
};
var author$project$Physical$Player$updateShot = F2(
	function (spaceBarDown, player) {
		var _n0 = _Utils_Tuple3(player.bn, spaceBarDown, player.O);
		_n0$2:
		while (true) {
			if (_n0.a.$ === 1) {
				if (_n0.b) {
					if (_n0.c.$ === 1) {
						var _n1 = _n0.a;
						var _n2 = _n0.c;
						return _Utils_Tuple3(
							_Utils_update(
								player,
								{
									O: elm$core$Maybe$Just(player._)
								}),
							author$project$Physical$Player$NoShot,
							_List_Nil);
					} else {
						break _n0$2;
					}
				} else {
					if (!_n0.c.$) {
						var _n3 = _n0.a;
						var prepTime = _n0.c.a;
						var duration = elm$time$Time$posixToMillis(player._) - elm$time$Time$posixToMillis(prepTime);
						return _Utils_Tuple3(
							_Utils_update(
								player,
								{O: elm$core$Maybe$Nothing}),
							author$project$Physical$Player$ShotAfter(duration),
							_List_fromArray(
								[
									author$project$Data$Sound$play(0)
								]));
					} else {
						break _n0$2;
					}
				}
			} else {
				break _n0$2;
			}
		}
		return _Utils_Tuple3(player, author$project$Physical$Player$NoShot, _List_Nil);
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var author$project$Data$Game$spawnAllBullets = F2(
	function (shotKeys, _n0) {
		var game = _n0.a;
		var sounds = _n0.b;
		var _n1 = A2(author$project$Physical$Player$updateShot, shotKeys.a9, game.l);
		var newPlayer4 = _n1.a;
		var hasShot4 = _n1.b;
		var soundEffect4 = _n1.c;
		var _n2 = A2(author$project$Physical$Player$updateShot, shotKeys.bq, game.k);
		var newPlayer3 = _n2.a;
		var hasShot3 = _n2.b;
		var soundEffect3 = _n2.c;
		var _n3 = A2(author$project$Physical$Player$updateShot, shotKeys.bt, game.j);
		var newPlayer2 = _n3.a;
		var hasShot2 = _n3.b;
		var soundEffect2 = _n3.c;
		var _n4 = A2(author$project$Physical$Player$updateShot, shotKeys.bk, game.i);
		var newPlayer1 = _n4.a;
		var hasShot1 = _n4.b;
		var soundEffect1 = _n4.c;
		return _Utils_Tuple2(
			A4(
				author$project$Data$Game$updateBullets,
				3,
				hasShot4,
				newPlayer4,
				A4(
					author$project$Data$Game$updateBullets,
					2,
					hasShot3,
					newPlayer3,
					A4(
						author$project$Data$Game$updateBullets,
						1,
						hasShot2,
						newPlayer2,
						A4(
							author$project$Data$Game$updateBullets,
							0,
							hasShot1,
							newPlayer1,
							_Utils_update(
								game,
								{i: newPlayer1, j: newPlayer2, k: newPlayer3, l: newPlayer4}))))),
			elm$core$List$concat(
				_List_fromArray(
					[soundEffect1, soundEffect2, soundEffect3, soundEffect4, sounds])));
	});
var author$project$Data$Game$update = F4(
	function (newFrameTime, duration, playerControls, game) {
		var newThrustings = {
			a9: !author$project$Data$Game$isNothing(playerControls.a9.br),
			bk: !author$project$Data$Game$isNothing(playerControls.bk.br),
			bq: !author$project$Data$Game$isNothing(playerControls.bq.br),
			bt: !author$project$Data$Game$isNothing(playerControls.bt.br)
		};
		var newShotKeys = {a9: playerControls.a9.bb, bk: playerControls.bk.bb, bq: playerControls.bq.bb, bt: playerControls.bt.bb};
		var newDirections = {
			a9: A2(elm$core$Maybe$withDefault, game.l.p, playerControls.a9.br),
			bk: A2(elm$core$Maybe$withDefault, game.i.p, playerControls.bk.br),
			bq: A2(elm$core$Maybe$withDefault, game.k.p, playerControls.bq.br),
			bt: A2(elm$core$Maybe$withDefault, game.j.p, playerControls.bt.br)
		};
		return A2(
			author$project$Data$Game$spawnAllBullets,
			newShotKeys,
			A2(
				author$project$Data$Game$moveAllUntil,
				newFrameTime,
				A2(
					author$project$Data$Game$processCollisionsUntil,
					newFrameTime,
					A4(
						author$project$Data$Game$preparePlayers,
						duration,
						newDirections,
						newThrustings,
						A3(
							author$project$Data$Game$changeGameBalls,
							newFrameTime,
							duration,
							_Utils_Tuple2(game, _List_Nil))))));
	});
var author$project$Data$Sound$handle = F2(
	function (p, _n0) {
		var sound = _n0;
		switch (sound) {
			case 0:
				return p('bullet');
			case 1:
				return p('collision');
			default:
				return p('goal');
		}
	});
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Ports$sounds = _Platform_outgoingPort('sounds', elm$json$Json$Encode$string);
var author$project$Main$update = F2(
	function (msg, model) {
		if (!msg.$) {
			var size = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{aW: size}),
				elm$core$Platform$Cmd$none);
		} else {
			var blob = msg.a;
			var newFrameTime = author$project$Controller$Gamepad$animationFrameTimestamp(blob);
			var gamepads = author$project$Controller$Gamepad$getGamepads(blob);
			var newPlayerControls = A2(author$project$Controller$Gamepad$updatePlayerControls, gamepads, model.ag);
			var duration = elm$time$Time$posixToMillis(newFrameTime) - elm$time$Time$posixToMillis(model.T);
			var _n1 = A4(author$project$Data$Game$update, newFrameTime, duration, newPlayerControls, model.U);
			var game = _n1.a;
			var soundEffects = _n1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{ae: model.aW, T: newFrameTime, U: game, ag: newPlayerControls}),
				elm$core$Platform$Cmd$batch(
					A2(
						elm$core$List$map,
						author$project$Data$Sound$handle(author$project$Ports$sounds),
						soundEffects)));
		}
	});
var author$project$Views$Colors$orange = 'rgba(239, 163, 0, 1)';
var author$project$Views$Colors$playerA = author$project$Views$Colors$orange;
var author$project$Views$Colors$blue = 'rgba(28, 139, 237, 1)';
var author$project$Views$Colors$playerB = author$project$Views$Colors$blue;
var author$project$Views$Colors$gray = 'rgba(87, 123, 147, 1)';
var author$project$Views$Colors$ball = author$project$Views$Colors$gray;
var elm$core$String$fromFloat = _String_fromNumber;
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$circle = elm$svg$Svg$trustedNode('circle');
var elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var author$project$Views$Svg$Ball$view = function (_n0) {
	var pos = _n0.W;
	var speed = _n0.d;
	var superspeed = _n0.aZ;
	var _n1 = pos;
	var x = _n1.a;
	var y = _n1.b;
	return A2(
		elm$svg$Svg$circle,
		_List_fromArray(
			[
				elm$svg$Svg$Attributes$cx(
				elm$core$String$fromFloat(x)),
				elm$svg$Svg$Attributes$cy(
				elm$core$String$fromFloat(y)),
				elm$svg$Svg$Attributes$r(
				elm$core$String$fromFloat(author$project$Physical$Ball$size)),
				elm$svg$Svg$Attributes$fill(author$project$Views$Colors$ball)
			]),
		_List_Nil);
};
var author$project$Views$Colors$bulletA = author$project$Views$Colors$orange;
var author$project$Views$Colors$bulletB = author$project$Views$Colors$blue;
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var elm$svg$Svg$polygon = elm$svg$Svg$trustedNode('polygon');
var elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var author$project$Views$Svg$Bullet$viewTriangle = F4(
	function (color, size, direction, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		var dirC = direction - ((2 * elm$core$Basics$pi) / 3);
		var dirB = direction + ((2 * elm$core$Basics$pi) / 3);
		var _n1 = _Utils_Tuple2(
			x + (size * elm$core$Basics$cos(dirC)),
			y + (size * elm$core$Basics$sin(dirC)));
		var xC = _n1.a;
		var yC = _n1.b;
		var _n2 = _Utils_Tuple2(
			x + (size * elm$core$Basics$cos(dirB)),
			y + (size * elm$core$Basics$sin(dirB)));
		var xB = _n2.a;
		var yB = _n2.b;
		var _n3 = _Utils_Tuple2(
			x + (size * elm$core$Basics$cos(direction)),
			y + (size * elm$core$Basics$sin(direction)));
		var xA = _n3.a;
		var yA = _n3.b;
		var points = elm$core$String$concat(
			_List_fromArray(
				[
					elm$core$String$fromFloat(xA),
					',',
					elm$core$String$fromFloat(yA),
					' ',
					elm$core$String$fromFloat(xB),
					',',
					elm$core$String$fromFloat(yB),
					' ',
					elm$core$String$fromFloat(xC),
					',',
					elm$core$String$fromFloat(yC)
				]));
		return A2(
			elm$svg$Svg$polygon,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$points(points),
					elm$svg$Svg$Attributes$fill(color)
				]),
			_List_Nil);
	});
var author$project$Views$Svg$Bullet$view = function (_n0) {
	var playerId = _n0.aN;
	var bullet = _n0.q;
	var color = function () {
		switch (playerId) {
			case 0:
				return author$project$Views$Colors$bulletA;
			case 1:
				return author$project$Views$Colors$bulletA;
			case 2:
				return author$project$Views$Colors$bulletB;
			default:
				return author$project$Views$Colors$bulletB;
		}
	}();
	var _n1 = bullet.aW;
	switch (_n1) {
		case 0:
			return A4(author$project$Views$Svg$Bullet$viewTriangle, color, author$project$Physical$Bullet$smallSize, bullet.p, bullet.W);
		case 1:
			return A4(author$project$Views$Svg$Bullet$viewTriangle, color, author$project$Physical$Bullet$mediumSize, bullet.p, bullet.W);
		default:
			return A4(author$project$Views$Svg$Bullet$viewTriangle, color, author$project$Physical$Bullet$bigSize, bullet.p, bullet.W);
	}
};
var author$project$Views$Colors$lightYellow = 'rgba(255, 254, 244, 1)';
var author$project$Views$Colors$fieldBackground = author$project$Views$Colors$lightYellow;
var author$project$Views$Svg$Field$stringFieldHeight = elm$core$String$fromFloat(author$project$Physical$Field$height);
var author$project$Views$Svg$Field$stringFieldWidth = elm$core$String$fromFloat(author$project$Physical$Field$width);
var elm$svg$Svg$rect = elm$svg$Svg$trustedNode('rect');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var author$project$Views$Svg$Field$background = A2(
	elm$svg$Svg$rect,
	_List_fromArray(
		[
			elm$svg$Svg$Attributes$x('0'),
			elm$svg$Svg$Attributes$y('0'),
			elm$svg$Svg$Attributes$width(author$project$Views$Svg$Field$stringFieldWidth),
			elm$svg$Svg$Attributes$height(author$project$Views$Svg$Field$stringFieldHeight),
			elm$svg$Svg$Attributes$fill(author$project$Views$Colors$fieldBackground)
		]),
	_List_Nil);
var elm$svg$Svg$path = elm$svg$Svg$trustedNode('path');
var elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm$svg$Svg$Attributes$opacity = _VirtualDom_attribute('opacity');
var author$project$Views$Svg$Field$ballSpawnTimer = function (ratio) {
	var rotationAngle = 360.0 * ratio;
	var _n0 = (rotationAngle <= 180.0) ? _Utils_Tuple2('0', '1') : _Utils_Tuple2('1', '1');
	var largeArcFlag = _n0.a;
	var sweepFlag = _n0.b;
	var _n1 = author$project$Physical$Field$center;
	var centerX = _n1.a;
	var centerY = _n1.b;
	var endX = centerX + (author$project$Physical$Ball$size * elm$core$Basics$cos((ratio * 2.0) * elm$core$Basics$pi));
	var startX = centerX + author$project$Physical$Ball$size;
	var endY = centerY + (author$project$Physical$Ball$size * elm$core$Basics$sin((ratio * 2.0) * elm$core$Basics$pi));
	var startY = centerY;
	var stringPath = A2(
		elm$core$String$join,
		' ',
		_List_fromArray(
			[
				'M',
				elm$core$String$fromFloat(centerX),
				elm$core$String$fromFloat(centerY),
				'L',
				elm$core$String$fromFloat(startX),
				elm$core$String$fromFloat(startY),
				'A',
				elm$core$String$fromFloat(author$project$Physical$Ball$size),
				elm$core$String$fromFloat(author$project$Physical$Ball$size),
				elm$core$String$fromFloat(rotationAngle),
				largeArcFlag,
				sweepFlag,
				elm$core$String$fromFloat(endX),
				elm$core$String$fromFloat(endY)
			]));
	return A2(
		elm$svg$Svg$path,
		_List_fromArray(
			[
				elm$svg$Svg$Attributes$d(stringPath),
				elm$svg$Svg$Attributes$fill(author$project$Views$Colors$ball),
				elm$svg$Svg$Attributes$opacity('0.5')
			]),
		_List_Nil);
};
var author$project$Views$Colors$netA = author$project$Views$Colors$orange;
var author$project$Views$Svg$Field$leftGoalLimit = elm$core$String$fromFloat(2 * author$project$Physical$Ball$size);
var author$project$Views$Svg$Field$leftGoal = A2(
	elm$svg$Svg$rect,
	_List_fromArray(
		[
			elm$svg$Svg$Attributes$x('0'),
			elm$svg$Svg$Attributes$y('0'),
			elm$svg$Svg$Attributes$width(author$project$Views$Svg$Field$leftGoalLimit),
			elm$svg$Svg$Attributes$height(author$project$Views$Svg$Field$stringFieldHeight),
			elm$svg$Svg$Attributes$fill(author$project$Views$Colors$netA)
		]),
	_List_Nil);
var author$project$Views$Colors$netB = author$project$Views$Colors$blue;
var author$project$Views$Svg$Field$rightGoalLimit = elm$core$String$fromFloat(author$project$Physical$Field$width - (2 * author$project$Physical$Ball$size));
var author$project$Views$Svg$Field$rightGoal = A2(
	elm$svg$Svg$rect,
	_List_fromArray(
		[
			elm$svg$Svg$Attributes$x(author$project$Views$Svg$Field$rightGoalLimit),
			elm$svg$Svg$Attributes$y('0'),
			elm$svg$Svg$Attributes$width(author$project$Views$Svg$Field$leftGoalLimit),
			elm$svg$Svg$Attributes$height(author$project$Views$Svg$Field$stringFieldHeight),
			elm$svg$Svg$Attributes$fill(author$project$Views$Colors$netB)
		]),
	_List_Nil);
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var author$project$Views$Svg$Field$viewBox = elm$svg$Svg$Attributes$viewBox(
	A2(
		elm$core$String$join,
		' ',
		_List_fromArray(
			['0 0', author$project$Views$Svg$Field$stringFieldWidth, author$project$Views$Svg$Field$stringFieldHeight])));
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var author$project$Views$Svg$Field$view = elm$svg$Svg$svg(
	_List_fromArray(
		[author$project$Views$Svg$Field$viewBox]));
var author$project$Views$Colors$white = 'rgba(255, 255, 255, 1)';
var author$project$Views$Colors$shootDisk = author$project$Views$Colors$white;
var author$project$Views$Colors$shootDiskContour = author$project$Views$Colors$gray;
var author$project$Views$Colors$stunDisk = author$project$Views$Colors$gray;
var elm$svg$Svg$g = elm$svg$Svg$trustedNode('g');
var elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var author$project$Views$Svg$Player$view = F2(
	function (color, _n0) {
		var pos = _n0.W;
		var direction = _n0.p;
		var shootPrep = _n0.O;
		var stunned = _n0.bn;
		var timeState = _n0._;
		var stunOpacity = function () {
			if (stunned.$ === 1) {
				return '0';
			} else {
				return '0.5';
			}
		}();
		var dirC = direction - ((2 * elm$core$Basics$pi) / 3);
		var dirB = direction + ((2 * elm$core$Basics$pi) / 3);
		var _n1 = pos;
		var x = _n1.a;
		var y = _n1.b;
		var _n2 = _Utils_Tuple2(
			x + (author$project$Physical$Player$size * elm$core$Basics$cos(direction)),
			y + (author$project$Physical$Player$size * elm$core$Basics$sin(direction)));
		var xA = _n2.a;
		var yA = _n2.b;
		var _n3 = _Utils_Tuple2(
			x + (author$project$Physical$Player$size * elm$core$Basics$cos(dirB)),
			y + (author$project$Physical$Player$size * elm$core$Basics$sin(dirB)));
		var xB = _n3.a;
		var yB = _n3.b;
		var _n4 = _Utils_Tuple2(
			x + (author$project$Physical$Player$size * elm$core$Basics$cos(dirC)),
			y + (author$project$Physical$Player$size * elm$core$Basics$sin(dirC)));
		var xC = _n4.a;
		var yC = _n4.b;
		var points = elm$core$String$concat(
			_List_fromArray(
				[
					elm$core$String$fromFloat(xA),
					',',
					elm$core$String$fromFloat(yA),
					' ',
					elm$core$String$fromFloat(xB),
					',',
					elm$core$String$fromFloat(yB),
					' ',
					elm$core$String$fromFloat(x),
					',',
					elm$core$String$fromFloat(y),
					' ',
					elm$core$String$fromFloat(xC),
					',',
					elm$core$String$fromFloat(yC)
				]));
		var player = A2(
			elm$svg$Svg$polygon,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$points(points),
					elm$svg$Svg$Attributes$fill(author$project$Views$Colors$fieldBackground),
					elm$svg$Svg$Attributes$stroke(color),
					elm$svg$Svg$Attributes$strokeWidth('10')
				]),
			_List_Nil);
		var stunDisk = A2(
			elm$svg$Svg$circle,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$cx(
					elm$core$String$fromFloat(x)),
					elm$svg$Svg$Attributes$cy(
					elm$core$String$fromFloat(y)),
					elm$svg$Svg$Attributes$r(
					elm$core$String$fromFloat(author$project$Physical$Player$size)),
					elm$svg$Svg$Attributes$fill(author$project$Views$Colors$stunDisk),
					elm$svg$Svg$Attributes$opacity(stunOpacity)
				]),
			_List_Nil);
		var _n5 = function () {
			if (shootPrep.$ === 1) {
				return _Utils_Tuple2('0', 0);
			} else {
				var prepTime = shootPrep.a;
				return _Utils_Tuple2(
					'0.8',
					elm$time$Time$posixToMillis(timeState) - elm$time$Time$posixToMillis(prepTime));
			}
		}();
		var shootOpacity = _n5.a;
		var prepDuration = _n5.b;
		var shootDiskSize = (_Utils_cmp(prepDuration, author$project$Physical$Player$bigChargeTime) > 0) ? '40' : ((_Utils_cmp(prepDuration, author$project$Physical$Player$mediumChargeTime) > 0) ? '30' : '20');
		var shootDisk = A2(
			elm$svg$Svg$circle,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$cx(
					elm$core$String$fromFloat(xA)),
					elm$svg$Svg$Attributes$cy(
					elm$core$String$fromFloat(yA)),
					elm$svg$Svg$Attributes$r(shootDiskSize),
					elm$svg$Svg$Attributes$fill(author$project$Views$Colors$shootDisk),
					elm$svg$Svg$Attributes$opacity(shootOpacity),
					elm$svg$Svg$Attributes$stroke(author$project$Views$Colors$shootDiskContour)
				]),
			_List_Nil);
		return A2(
			elm$svg$Svg$g,
			_List_Nil,
			_List_fromArray(
				[stunDisk, player, shootDisk]));
	});
var author$project$Views$Svg$Game$viewField = F2(
	function (frameSize, game) {
		var players = A2(
			elm$svg$Svg$g,
			_List_Nil,
			_List_fromArray(
				[
					A2(author$project$Views$Svg$Player$view, author$project$Views$Colors$playerA, game.i),
					A2(author$project$Views$Svg$Player$view, author$project$Views$Colors$playerA, game.j),
					A2(author$project$Views$Svg$Player$view, author$project$Views$Colors$playerB, game.k),
					A2(author$project$Views$Svg$Player$view, author$project$Views$Colors$playerB, game.l)
				]));
		var bullets = A2(
			elm$svg$Svg$g,
			_List_Nil,
			A2(
				elm$core$List$map,
				author$project$Views$Svg$Bullet$view,
				elm$core$Dict$values(game.a)));
		var balls = A2(
			elm$svg$Svg$g,
			_List_Nil,
			A2(
				elm$core$List$map,
				author$project$Views$Svg$Ball$view,
				elm$core$Dict$values(game.c.b)));
		var ballSpawnTimer = function () {
			var _n0 = game.c.ah;
			if (!_n0.$) {
				return A2(elm$svg$Svg$g, _List_Nil, _List_Nil);
			} else {
				var time = _n0.a;
				var duration = A2(author$project$Data$Helper$timeDiff, time, game.T);
				var spawnRatio = duration / author$project$Data$Game$ballTimer;
				return author$project$Views$Svg$Field$ballSpawnTimer(spawnRatio);
			}
		}();
		return author$project$Views$Svg$Field$view(
			_List_fromArray(
				[author$project$Views$Svg$Field$background, author$project$Views$Svg$Field$leftGoal, author$project$Views$Svg$Field$rightGoal, ballSpawnTimer, balls, bullets, players]));
	});
var elm$html$Html$div = _VirtualDom_node('div');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var author$project$Views$Svg$Game$viewScore = F2(
	function (score, color) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2(elm$html$Html$Attributes$style, 'width', '10rem'),
					A2(elm$html$Html$Attributes$style, 'font-size', '4rem'),
					A2(elm$html$Html$Attributes$style, 'color', color),
					A2(elm$html$Html$Attributes$style, 'border', '1rem solid'),
					A2(elm$html$Html$Attributes$style, 'border-color', color)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(
					elm$core$String$fromInt(score))
				]));
	});
var author$project$Views$Colors$textLight = author$project$Views$Colors$white;
var author$project$Views$Svg$Game$viewTime = function (time) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2(elm$html$Html$Attributes$style, 'width', '10rem'),
				A2(elm$html$Html$Attributes$style, 'font-size', '4rem'),
				A2(elm$html$Html$Attributes$style, 'color', author$project$Views$Colors$textLight)
			]),
		_List_fromArray(
			[
				elm$html$Html$text(
				elm$core$String$fromInt(time))
			]));
};
var author$project$Views$Svg$Game$viewScoreboard = F3(
	function (_n0, startTime, frameTime) {
		var score1 = _n0.a;
		var score2 = _n0.b;
		var durationInMillis = elm$time$Time$posixToMillis(frameTime) - elm$time$Time$posixToMillis(startTime);
		var durationInSeconds = (durationInMillis / 1000) | 0;
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'display', 'flex'),
					A2(elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2(elm$html$Html$Attributes$style, 'align-items', 'center')
				]),
			_List_fromArray(
				[
					A2(author$project$Views$Svg$Game$viewScore, score1, author$project$Views$Colors$netA),
					author$project$Views$Svg$Game$viewTime(durationInSeconds),
					A2(author$project$Views$Svg$Game$viewScore, score2, author$project$Views$Colors$netB)
				]));
	});
var author$project$Main$view = function (_n0) {
	var frameSize = _n0.ae;
	var frameTime = _n0.T;
	var game = _n0.U;
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'display', 'flex'),
				A2(elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2(elm$html$Html$Attributes$style, 'height', '100%')
			]),
		_List_fromArray(
			[
				A3(author$project$Views$Svg$Game$viewScoreboard, game.N, game.aX, frameTime),
				A2(author$project$Views$Svg$Game$viewField, frameSize, game)
			]));
};
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {aD: fragment, aF: host, aL: path, aO: port_, aR: protocol, aS: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$element = _Browser_element;
var author$project$Main$main = elm$browser$Browser$element(
	{bd: author$project$Main$init, bp: author$project$Main$subscriptions, bu: author$project$Main$update, bw: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (time) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (size) {
					return elm$json$Json$Decode$succeed(
						{aW: size, a$: time});
				},
				A2(
					elm$json$Json$Decode$field,
					'size',
					A2(
						elm$json$Json$Decode$andThen,
						function (width) {
							return A2(
								elm$json$Json$Decode$andThen,
								function (height) {
									return elm$json$Json$Decode$succeed(
										{aE: height, a1: width});
								},
								A2(elm$json$Json$Decode$field, 'height', elm$json$Json$Decode$float));
						},
						A2(elm$json$Json$Decode$field, 'width', elm$json$Json$Decode$float))));
		},
		A2(elm$json$Json$Decode$field, 'time', elm$json$Json$Decode$int)))(0)}});}(this));