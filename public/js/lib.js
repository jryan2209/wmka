/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

/*! tether 1.3.1 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(require, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

var zeroElement = null;

function getScrollParents(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;
  var parents = [];

  if (position === 'fixed') {
    return [el];
  }

  var parent = el;
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent);
      return parents;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent);
      }
    }
  }

  parents.push(document.body);
  return parents;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin() {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = zeroElement;
  if (!node) {
    node = document.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    document.body.appendChild(node);

    zeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = {};

    var rect = node.getBoundingClientRect();
    for (var k in rect) {
      // Can't use extend, as on IE9, elements don't resolve to be hasOwnProperty
      zeroPosCache[id][k] = rect[k];
    }

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function removeUtilElements() {
  if (zeroElement) {
    document.body.removeChild(zeroElement);
  }
  zeroElement = null;
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = {};
  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = el.getBoundingClientRect();
  for (var k in rect) {
    box[k] = rect[k];
  }

  var origin = getOrigin();

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

function getScrollBarSize() {
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  return { width: width, height: width };
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  if (el.className instanceof SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings !== 'undefined' && typeof this.bindings[event] !== 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getScrollParents: getScrollParents,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize,
  removeUtilElements: removeUtilElements
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParents = _TetherBase$Utils.getScrollParents;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
var removeUtilElements = _TetherBase$Utils.removeUtilElements;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (pendingTimeout != null) {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function (_Evented) {
  _inherits(TetherClass, _Evented);

  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '-' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParents !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      this.scrollParents.forEach(function (parent) {
        if (parent !== document) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var _this4 = this;

      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParents !== 'undefined') {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      });

      // Remove any elements we were using for convenience from the DOM
      if (tethers.length === 0) {
        removeUtilElements();
      }
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this6.getClass('element-attached') + '-' + side);
        all.push(_this6.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, all);
        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, all);
        }

        delete _this6._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this7 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var scrollbarSize = undefined;
      if (document.body.scrollWidth > window.innerWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (document.body.scrollHeight > window.innerHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(document.body.style.position) === -1 || ['', 'static'].indexOf(document.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = document.body.scrollHeight - top - height;
        next.page.right = document.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this7.cache('target-offsetparent', function () {
            return getOffsetParent(_this7.target);
          });
          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this8 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          css[transformKey] = 'translateX(' + Math.round(xPos) + 'px) translateY(' + Math.round(yPos) + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this8.cache('target-offsetparent', function () {
            return getOffsetParent(_this8.target);
          });

          if (getOffsetParent(_this8.element) !== offsetParent) {
            defer(function () {
              _this8.element.parentNode.removeChild(_this8.element);
              offsetParent.appendChild(_this8.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        var offsetParentIsBody = true;
        var currentNode = this.element.parentNode;
        while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
          if (getComputedStyle(currentNode).position !== 'static') {
            offsetParentIsBody = false;
            break;
          }

          currentNode = currentNode.parentNode;
        }

        if (!offsetParentIsBody) {
          this.element.parentNode.removeChild(this.element);
          document.body.appendChild(this.element);
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);
        });
      }
    }
  }]);

  return TetherClass;
})(Evented);

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
        _this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment
        });
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));

/*!
 * Bootstrap v4.0.0-alpha.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 3)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v3.0.0')
  }
}(jQuery);


+function ($) {

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Util = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments);
        }
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var _name in TransitionEndEvent) {
      if (el.style[_name] !== undefined) {
        return { end: TransitionEndEvent[_name] };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        prefix += ~ ~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },

    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },

    reflow: function reflow(element) {
      new Function('bs', 'return bs')(element.offsetHeight);
    },

    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },

    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },

    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = undefined;

          if (value && isElement(value)) {
            valueType = 'element';
          } else {
            valueType = toType(value);
          }

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    IN: 'in'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = (function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Alert, [{
      key: 'close',

      // public

      value: function close(element) {
        element = element || this._element;

        var rootElement = this._getRootElement(element);
        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_getRootElement',
      value: function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = $(selector)[0];
        }

        if (!parent) {
          parent = $(element).closest('.' + ClassName.ALERT)[0];
        }

        return parent;
      }
    }, {
      key: '_triggerCloseEvent',
      value: function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);

        $(element).trigger(closeEvent);
        return closeEvent;
      }
    }, {
      key: '_removeElement',
      value: function _removeElement(element) {
        $(element).removeClass(ClassName.IN);

        if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);
          return;
        }

        $(element).one(Util.TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: '_destroyElement',
      value: function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      }
    }, {
      key: '_handleDismiss',
      value: function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = (function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Button, [{
      key: 'toggle',

      // public

      value: function toggle() {
        var triggerChangeEvent = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(this._element).trigger('change');
            }
          }
        } else {
          this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREVIOUS: 'prev'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'right',
    LEFT: 'left',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.next, .prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = (function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Carousel, [{
      key: 'next',

      // public

      value: function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      }
    }, {
      key: 'nextWhenVisible',
      value: function nextWhenVisible() {
        // Don't call next when the page isn't visible
        if (!document.hidden) {
          this.next();
        }
      }
    }, {
      key: 'prev',
      value: function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREVIOUS);
        }
      }
    }, {
      key: 'pause',
      value: function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      }
    }, {
      key: 'cycle',
      value: function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
        }
      }
    }, {
      key: 'to',
      value: function to(index) {
        var _this2 = this;

        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event.SLID, function () {
            return _this2.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

        this._slide(direction, this._items[index]);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $(this._element).off(EVENT_KEY);
        $.removeData(this._element, DATA_KEY);

        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        if (this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
        }

        if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
          $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
        }
      }
    }, {
      key: '_keydown',
      value: function _keydown(event) {
        event.preventDefault();

        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case 37:
            this.prev();break;
          case 39:
            this.next();break;
          default:
            return;
        }
      }
    }, {
      key: '_getItemIndex',
      value: function _getItemIndex(element) {
        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      }
    }, {
      key: '_getItemByDirection',
      value: function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREVIOUS;
        var activeIndex = this._getItemIndex(activeElement);
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREVIOUS ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;

        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      }
    }, {
      key: '_triggerSlideEvent',
      value: function _triggerSlideEvent(relatedTarget, directionalClassname) {
        var slideEvent = $.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: directionalClassname
        });

        $(this._element).trigger(slideEvent);

        return slideEvent;
      }
    }, {
      key: '_setActiveIndicatorElement',
      value: function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      }
    }, {
      key: '_slide',
      value: function _slide(direction, element) {
        var _this3 = this;

        var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var isCycling = Boolean(this._interval);

        var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: directionalClassName
        });

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

          $(nextElement).addClass(direction);

          Util.reflow(nextElement);

          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);

          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName).removeClass(direction);

            $(nextElement).addClass(ClassName.ACTIVE);

            $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

            _this3._isSliding = false;

            setTimeout(function () {
              return $(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $(activeElement).removeClass(ClassName.ACTIVE);
          $(nextElement).addClass(ClassName.ACTIVE);

          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data());

          if (typeof config === 'object') {
            $.extend(_config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (data[action] === undefined) {
              throw new Error('No method named "' + action + '"');
            }
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      }
    }, {
      key: '_dataApiClickHandler',
      value: function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = $.extend({}, $(target).data(), $(this).data());
        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    IN: 'in',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.panel > .in, .panel > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = (function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Collapse, [{
      key: 'toggle',

      // public

      value: function toggle() {
        if ($(this._element).hasClass(ClassName.IN)) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: 'show',
      value: function show() {
        var _this4 = this;

        if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var actives = undefined;
        var activesData = undefined;

        if (this._parent) {
          actives = $.makeArray($(Selector.ACTIVES));
          if (!actives.length) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).data(DATA_KEY);
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives), 'hide');
          if (!activesData) {
            $(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

        this._element.style[dimension] = 0;
        this._element.setAttribute('aria-expanded', true);

        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

          _this4._element.style[dimension] = '';

          _this4.setTransitioning(false);

          $(_this4._element).trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

        this._element.style[dimension] = this._element[scrollSize] + 'px';
      }
    }, {
      key: 'hide',
      value: function hide() {
        var _this5 = this;

        if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var startEvent = $.Event(Event.HIDE);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();
        var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

        this._element.style[dimension] = this._element[offsetDimension] + 'px';

        Util.reflow(this._element);

        $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

        this._element.setAttribute('aria-expanded', false);

        if (this._triggerArray.length) {
          $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this5.setTransitioning(false);
          $(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = 0;

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: 'setTransitioning',
      value: function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        config.toggle = Boolean(config.toggle); // coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_getDimension',
      value: function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      }
    }, {
      key: '_getParent',
      value: function _getParent() {
        var _this6 = this;

        var parent = $(this._config.parent)[0];
        var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

        $(parent).find(selector).each(function (i, element) {
          _this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });

        return parent;
      }
    }, {
      key: '_addAriaAndCollapsedClass',
      value: function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $(element).hasClass(ClassName.IN);
          element.setAttribute('aria-expanded', isOpen);

          if (triggerArray.length) {
            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }

      // static

    }], [{
      key: '_getTargetFromElement',
      value: function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? $(selector)[0] : null;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    OPEN: 'open'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = (function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Dropdown, [{
      key: 'toggle',

      // public

      value: function toggle() {
        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return false;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        Dropdown._clearMenus();

        if (isActive) {
          return false;
        }

        if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

          // if mobile we use a backdrop because click events don't delegate
          var dropdown = document.createElement('div');
          dropdown.className = ClassName.BACKDROP;
          $(dropdown).insertBefore(this);
          $(dropdown).on('click', Dropdown._clearMenus);
        }

        var relatedTarget = { relatedTarget: this };
        var showEvent = $.Event(Event.SHOW, relatedTarget);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return false;
        }

        this.focus();
        this.setAttribute('aria-expanded', 'true');

        $(parent).toggleClass(ClassName.OPEN);
        $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

        return false;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        $(this._element).on(Event.CLICK, this.toggle);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            $(this).data(DATA_KEY, data = new Dropdown(this));
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config].call(this);
          }
        });
      }
    }, {
      key: '_clearMenus',
      value: function _clearMenus(event) {
        if (event && event.which === 3) {
          return;
        }

        var backdrop = $(Selector.BACKDROP)[0];
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }

        var toggles = $.makeArray($(Selector.DATA_TOGGLE));

        for (var i = 0; i < toggles.length; i++) {
          var _parent = Dropdown._getParentFromElement(toggles[i]);
          var relatedTarget = { relatedTarget: toggles[i] };

          if (!$(_parent).hasClass(ClassName.OPEN)) {
            continue;
          }

          if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(_parent, event.target)) {
            continue;
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(_parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            continue;
          }

          toggles[i].setAttribute('aria-expanded', 'false');

          $(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
        }
      }
    }, {
      key: '_getParentFromElement',
      value: function _getParentFromElement(element) {
        var parent = undefined;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      }
    }, {
      key: '_dataApiKeydownHandler',
      value: function _dataApiKeydownHandler(event) {
        if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        if (!isActive && event.which !== 27 || isActive && event.which === 27) {

          if (event.which === 27) {
            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = $.makeArray($(Selector.VISIBLE_ITEMS));

        items = items.filter(function (item) {
          return item.offsetWidth || item.offsetHeight;
        });

        if (!items.length) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === 38 && index > 0) {
          // up
          index--;
        }

        if (event.which === 40 && index < items.length - 1) {
          // down
          index++;
        }

        if (! ~index) {
          index = 0;
        }

        items[index].focus();
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  })();

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = (function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Modal, [{
      key: 'toggle',

      // public

      value: function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
    }, {
      key: 'show',
      value: function show(relatedTarget) {
        var _this7 = this;

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });

        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();
        this._setScrollbar();

        $(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();
        this._setResizeEvent();

        $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $(_this7._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this7._element)) {
              _this7._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
      }
    }, {
      key: 'hide',
      value: function hide(event) {
        if (event) {
          event.preventDefault();
        }

        var hideEvent = $.Event(Event.HIDE);

        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;

        this._setEscapeEvent();
        this._setResizeEvent();

        $(document).off(Event.FOCUSIN);

        $(this._element).removeClass(ClassName.IN);

        $(this._element).off(Event.CLICK_DISMISS);
        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

          $(this._element).one(Util.TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          this._hideModal();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        $(window).off(EVENT_KEY);
        $(document).off(EVENT_KEY);
        $(this._element).off(EVENT_KEY);
        $(this._backdrop).off(EVENT_KEY);

        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._originalBodyPadding = null;
        this._scrollbarWidth = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_showElement',
      value: function _showElement(relatedTarget) {
        var _this8 = this;

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // don't move modals dom position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';
        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName.IN);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this8._config.focus) {
            _this8._element.focus();
          }
          $(_this8._element).trigger(shownEvent);
        };

        if (transition) {
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          transitionComplete();
        }
      }
    }, {
      key: '_enforceFocus',
      value: function _enforceFocus() {
        var _this9 = this;

        $(document).off(Event.FOCUSIN) // guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (_this9._element !== event.target && !$(_this9._element).has(event.target).length) {
            _this9._element.focus();
          }
        });
      }
    }, {
      key: '_setEscapeEvent',
      value: function _setEscapeEvent() {
        var _this10 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === 27) {
              _this10.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event.KEYDOWN_DISMISS);
        }
      }
    }, {
      key: '_setResizeEvent',
      value: function _setResizeEvent() {
        if (this._isShown) {
          $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
        } else {
          $(window).off(Event.RESIZE);
        }
      }
    }, {
      key: '_hideModal',
      value: function _hideModal() {
        var _this11 = this;

        this._element.style.display = 'none';
        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName.OPEN);
          _this11._resetAdjustments();
          _this11._resetScrollbar();
          $(_this11._element).trigger(Event.HIDDEN);
        });
      }
    }, {
      key: '_removeBackdrop',
      value: function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      }
    }, {
      key: '_showBackdrop',
      value: function _showBackdrop(callback) {
        var _this12 = this;

        var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          var doAnimate = Util.supportsTransitionEnd() && animate;

          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $(this._backdrop).addClass(animate);
          }

          $(this._backdrop).appendTo(document.body);

          $(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this12._ignoreBackdropClick) {
              _this12._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (_this12._config.backdrop === 'static') {
              _this12._element.focus();
            } else {
              _this12.hide();
            }
          });

          if (doAnimate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName.IN);

          if (!callback) {
            return;
          }

          if (!doAnimate) {
            callback();
            return;
          }

          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName.IN);

          var callbackRemove = function callbackRemove() {
            _this12._removeBackdrop();
            if (callback) {
              callback();
            }
          };

          if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }

      // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------

    }, {
      key: '_handleUpdate',
      value: function _handleUpdate() {
        this._adjustDialog();
      }
    }, {
      key: '_adjustDialog',
      value: function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + 'px';
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + 'px~';
        }
      }
    }, {
      key: '_resetAdjustments',
      value: function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      }
    }, {
      key: '_checkScrollbar',
      value: function _checkScrollbar() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
          // workaround for missing window.innerWidth in IE8
          var documentElementRect = document.documentElement.getBoundingClientRect();
          fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this._isBodyOverflowing = document.body.clientWidth < fullWindowWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      }
    }, {
      key: '_setScrollbar',
      value: function _setScrollbar() {
        var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

        this._originalBodyPadding = document.body.style.paddingRight || '';

        if (this._isBodyOverflowing) {
          document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
        }
      }
    }, {
      key: '_resetScrollbar',
      value: function _resetScrollbar() {
        document.body.style.paddingRight = this._originalBodyPadding;
      }
    }, {
      key: '_getScrollbarWidth',
      value: function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this13 = this;

    var target = undefined;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this13).is(':visible')) {
          _this13.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = (function () {
    function ScrollSpy(element, config) {
      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

      this.refresh();
      this._process();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(ScrollSpy, [{
      key: 'refresh',

      // public

      value: function refresh() {
        var _this14 = this;

        var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

        this._offsets = [];
        this._targets = [];

        this._scrollHeight = this._getScrollHeight();

        var targets = $.makeArray($(this._selector));

        targets.map(function (element) {
          var target = undefined;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = $(targetSelector)[0];
          }

          if (target && (target.offsetWidth || target.offsetHeight)) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this14._offsets.push(item[0]);
          _this14._targets.push(item[1]);
        });
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._scrollElement).off(EVENT_KEY);

        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);

        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');
          if (!id) {
            id = Util.getUID(NAME);
            $(config.target).attr('id', id);
          }
          config.target = '#' + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);

        return config;
      }
    }, {
      key: '_getScrollTop',
      value: function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
      }
    }, {
      key: '_getScrollHeight',
      value: function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }
    }, {
      key: '_process',
      value: function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;
        var scrollHeight = this._getScrollHeight();
        var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }
        }

        if (this._activeTarget && scrollTop < this._offsets[0]) {
          this._activeTarget = null;
          this._clear();
          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      }
    }, {
      key: '_activate',
      value: function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',');
        queries = queries.map(function (selector) {
          return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
        });

        var $link = $(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // todo (fat) this is kinda sus…
          // recursively add actives to tested nav-links
          $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      }
    }, {
      key: '_clear',
      value: function _clear() {
        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' && config || null;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  })();

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    UL: 'ul:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = (function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Tab, [{
      key: 'show',

      // public

      value: function show() {
        var _this15 = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
          return;
        }

        var target = undefined;
        var previous = undefined;
        var ulElement = $(this._element).closest(Selector.UL)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (ulElement) {
          previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(Event.HIDE, {
          relatedTarget: this._element
        });

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $(selector)[0];
        }

        this._activate(this._element, ulElement);

        var complete = function complete() {
          var hiddenEvent = $.Event(Event.HIDDEN, {
            relatedTarget: _this15._element
          });

          var shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: previous
          });

          $(previous).trigger(hiddenEvent);
          $(_this15._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeClass(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_activate',
      value: function _activate(element, container, callback) {
        var active = $(container).find(Selector.ACTIVE_CHILD)[0];
        var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

        var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

        if (active && isTransitioning) {
          $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        if (active) {
          $(active).removeClass(ClassName.IN);
        }
      }
    }, {
      key: '_transitionComplete',
      value: function _transitionComplete(element, active, isTransitioning, callback) {
        if (active) {
          $(active).removeClass(ClassName.ACTIVE);

          var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          active.setAttribute('aria-expanded', false);
        }

        $(element).addClass(ClassName.ACTIVE);
        element.setAttribute('aria-expanded', true);

        if (isTransitioning) {
          Util.reflow(element);
          $(element).addClass(ClassName.IN);
        } else {
          $(element).removeClass(ClassName.FADE);
        }

        if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

          var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
          if (dropdownElement) {
            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
})(jQuery);

/* global Tether */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = (function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://github.hubspot.com/tether/
   */
  if (window.Tether === undefined) {
    throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: []
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    IN: 'in',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = (function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Tooltip, [{
      key: 'enable',

      // public

      value: function enable() {
        this._isEnabled = true;
      }
    }, {
      key: 'disable',
      value: function disable() {
        this._isEnabled = false;
      }
    }, {
      key: 'toggleEnabled',
      value: function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {

          if ($(this.getTipElement()).hasClass(ClassName.IN)) {
            this._leave(null, this);
            return;
          }

          this._enter(null, this);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        clearTimeout(this._timeout);

        this.cleanupTether();

        $.removeData(this.element, this.constructor.DATA_KEY);

        $(this.element).off(this.constructor.EVENT_KEY);

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
        this._tether = null;

        this.element = null;
        this.config = null;
        this.tip = null;
      }
    }, {
      key: 'show',
      value: function show() {
        var _this16 = this;

        var showEvent = $.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $(this.element).trigger(showEvent);

          var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);

          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);

          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

          $(this.element).trigger(this.constructor.Event.INSERTED);

          this._tether = new Tether({
            attachment: attachment,
            element: tip,
            target: this.element,
            classes: TetherClass,
            classPrefix: CLASS_PREFIX,
            offset: this.config.offset,
            constraints: this.config.constraints,
            addTargetClasses: false
          });

          Util.reflow(tip);
          this._tether.position();

          $(tip).addClass(ClassName.IN);

          var complete = function complete() {
            var prevHoverState = _this16._hoverState;
            _this16._hoverState = null;

            $(_this16.element).trigger(_this16.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this16._leave(null, _this16);
            }
          };

          if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
            return;
          }

          complete();
        }
      }
    }, {
      key: 'hide',
      value: function hide(callback) {
        var _this17 = this;

        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);
        var complete = function complete() {
          if (_this17._hoverState !== HoverState.IN && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this17.element.removeAttribute('aria-describedby');
          $(_this17.element).trigger(_this17.constructor.Event.HIDDEN);
          _this17.cleanupTether();

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName.IN);

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        this._hoverState = '';
      }

      // protected

    }, {
      key: 'isWithContent',
      value: function isWithContent() {
        return Boolean(this.getTitle());
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());

        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      }
    }, {
      key: 'setElementContent',
      value: function setElementContent($element, content) {
        var html = this.config.html;
        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // content is a DOM node or a jQuery
          if (html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      }
    }, {
      key: 'getTitle',
      value: function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }
    }, {
      key: 'cleanupTether',
      value: function cleanupTether() {
        if (this._tether) {
          this._tether.destroy();
        }
      }

      // private

    }, {
      key: '_getAttachment',
      value: function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this18 = this;

        var triggers = this.config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this18.element).on(_this18.constructor.Event.CLICK, _this18.config.selector, $.proxy(_this18.toggle, _this18));
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSEENTER : _this18.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSELEAVE : _this18.constructor.Event.FOCUSOUT;

            $(_this18.element).on(eventIn, _this18.config.selector, $.proxy(_this18._enter, _this18)).on(eventOut, _this18.config.selector, $.proxy(_this18._leave, _this18));
          }
        });

        if (this.config.selector) {
          this.config = $.extend({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      }
    }, {
      key: '_fixTitle',
      value: function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      }
    }, {
      key: '_enter',
      value: function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
          context._hoverState = HoverState.IN;
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.IN;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.IN) {
            context.show();
          }
        }, context.config.delay.show);
      }
    }, {
      key: '_leave',
      value: function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      }
    }, {
      key: '_isWithActiveTrigger',
      value: function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

        if (config.delay && typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      }
    }, {
      key: '_getDelegateConfig',
      value: function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  })();

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content',
    ARROW: '.popover-arrow'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = (function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Popover, [{
      key: 'isWithContent',

      // overrides

      value: function isWithContent() {
        return this.getTitle() || this._getContent();
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());

        // we use append for html objects to maintain js events
        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      }

      // private

    }, {
      key: '_getContent',
      value: function _getContent() {
        return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',

      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  })(Tooltip);

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
})(jQuery);

}(jQuery);

function scaleVideoContainer() {
    var t = $(window).height() + 5, e = parseInt(t) + "px";
    $(".homepage-hero-module").css("height", e)
}
function initBannerVideoSize(t) {
    $(t).each(function() {
        $(this).data("height", $(this).height()), $(this).data("width", $(this).width())
    }), scaleBannerVideoSize(t)
}
function scaleBannerVideoSize(t) {
    var n, a, e = $(window).width(), i = $(window).height() + 5;
    $(t).each(function() {
        var t = $(this).data("height") / $(this).data("width");
        $(this).width(e), 1e3 > e && (a = i, n = a / t, $(this).css({
            "margin-top": 0,
            "margin-left": - (n - e) / 2 + "px"
        }), $(this).width(n).height(a)), $(".homepage-hero-module .video-container video").addClass("fadeIn animated")
    })
}
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(t, e, i, n, a) {
        return jQuery.easing[jQuery.easing.def](t, e, i, n, a)
    },
    easeInQuad: function(t, e, i, n, a) {
        return n * (e/=a) * e + i
    },
    easeOutQuad: function(t, e, i, n, a) {
        return - n * (e/=a) * (e - 2) + i
    },
    easeInOutQuad: function(t, e, i, n, a) {
        return (e/=a / 2) < 1 ? n / 2 * e * e + i : - n / 2 * (--e * (e - 2) - 1) + i
    },
    easeInCubic: function(t, e, i, n, a) {
        return n * (e/=a) * e * e + i
    },
    easeOutCubic: function(t, e, i, n, a) {
        return n * ((e = e / a - 1) * e * e + 1) + i
    },
    easeInOutCubic: function(t, e, i, n, a) {
        return (e/=a / 2) < 1 ? n / 2 * e * e * e + i : n / 2 * ((e -= 2) * e * e + 2) + i
    },
    easeInQuart: function(t, e, i, n, a) {
        return n * (e/=a) * e * e * e + i
    },
    easeOutQuart: function(t, e, i, n, a) {
        return - n * ((e = e / a - 1) * e * e * e - 1) + i
    },
    easeInOutQuart: function(t, e, i, n, a) {
        return (e/=a / 2) < 1 ? n / 2 * e * e * e * e + i : - n / 2 * ((e -= 2) * e * e * e - 2) + i
    },
    easeInQuint: function(t, e, i, n, a) {
        return n * (e/=a) * e * e * e * e + i
    },
    easeOutQuint: function(t, e, i, n, a) {
        return n * ((e = e / a - 1) * e * e * e * e + 1) + i
    },
    easeInOutQuint: function(t, e, i, n, a) {
        return (e/=a / 2) < 1 ? n / 2 * e * e * e * e * e + i : n / 2 * ((e -= 2) * e * e * e * e + 2) + i
    },
    easeInSine: function(t, e, i, n, a) {
        return - n * Math.cos(e / a * (Math.PI / 2)) + n + i
    },
    easeOutSine: function(t, e, i, n, a) {
        return n * Math.sin(e / a * (Math.PI / 2)) + i
    },
    easeInOutSine: function(t, e, i, n, a) {
        return - n / 2 * (Math.cos(Math.PI * e / a) - 1) + i
    },
    easeInExpo: function(t, e, i, n, a) {
        return 0 == e ? i : n * Math.pow(2, 10 * (e / a - 1)) + i
    },
    easeOutExpo: function(t, e, i, n, a) {
        return e == a ? i + n : n * ( - Math.pow(2, - 10 * e / a) + 1) + i
    },
    easeInOutExpo: function(t, e, i, n, a) {
        return 0 == e ? i : e == a ? i + n : (e/=a / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + i : n / 2 * ( - Math.pow(2, - 10*--e) + 2) + i
    },
    easeInCirc: function(t, e, i, n, a) {
        return - n * (Math.sqrt(1 - (e/=a) * e) - 1) + i
    },
    easeOutCirc: function(t, e, i, n, a) {
        return n * Math.sqrt(1 - (e = e / a - 1) * e) + i
    },
    easeInOutCirc: function(t, e, i, n, a) {
        return (e/=a / 2) < 1?-n / 2 * (Math.sqrt(1 - e * e) - 1) + i : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i
    },
    easeInElastic: function(t, e, i, n, a) {
        var o = 1.70158, s = 0, r = n;
        if (0 == e)
            return i;
        if (1 == (e/=a))
            return i + n;
        if (s || (s = .3 * a), r < Math.abs(n)) {
            r = n;
            var o = s / 4
        } else
            var o = s / (2 * Math.PI) * Math.asin(n / r);
        return - (r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * a - o) * (2 * Math.PI) / s)) + i
    },
    easeOutElastic: function(t, e, i, n, a) {
        var o = 1.70158, s = 0, r = n;
        if (0 == e)
            return i;
        if (1 == (e/=a))
            return i + n;
        if (s || (s = .3 * a), r < Math.abs(n)) {
            r = n;
            var o = s / 4
        } else
            var o = s / (2 * Math.PI) * Math.asin(n / r);
        return r * Math.pow(2, - 10 * e) * Math.sin((e * a - o) * (2 * Math.PI) / s) + n + i
    },
    easeInOutElastic: function(t, e, i, n, a) {
        var o = 1.70158, s = 0, r = n;
        if (0 == e)
            return i;
        if (2 == (e/=a / 2))
            return i + n;
        if (s || (s = a * (.3 * 1.5)), r < Math.abs(n)) {
            r = n;
            var o = s / 4
        } else
            var o = s / (2 * Math.PI) * Math.asin(n / r);
        return 1 > e?-.5 * (r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * a - o) * (2 * Math.PI) / s)) + i : r * Math.pow(2, - 10 * (e -= 1)) * Math.sin((e * a - o) * (2 * Math.PI) / s) * .5 + n + i
    },
    easeInBack: function(t, e, i, n, a, o) {
        return void 0 == o && (o = 1.70158), n * (e/=a) * e * ((o + 1) * e - o) + i
    },
    easeOutBack: function(t, e, i, n, a, o) {
        return void 0 == o && (o = 1.70158), n * ((e = e / a - 1) * e * ((o + 1) * e + o) + 1) + i
    },
    easeInOutBack: function(t, e, i, n, a, o) {
        return void 0 == o && (o = 1.70158), (e/=a / 2) < 1 ? n / 2 * (e * e * (((o*=1.525) + 1) * e - o)) + i : n / 2 * ((e -= 2) * e * (((o*=1.525) + 1) * e + o) + 2) + i
    },
    easeInBounce: function(t, e, i, n, a) {
        return n - jQuery.easing.easeOutBounce(t, a - e, 0, n, a) + i
    },
    easeOutBounce: function(t, e, i, n, a) {
        return (e/=a) < 1 / 2.75 ? n * (7.5625 * e * e) + i : 2 / 2.75 > e ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : 2.5 / 2.75 > e ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
    },
    easeInOutBounce: function(t, e, i, n, a) {
        return a / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, n, a) + i : .5 * jQuery.easing.easeOutBounce(t, 2 * e - a, 0, n, a) + .5 * n + i
    }
}), function(t) {
    t.Package ? Materialize = {} : t.Materialize = {}
}(window), Materialize.guid = function() {
    function t() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return function() {
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
    }
}(), Materialize.elementOrParentIsFixed = function(t) {
    var e = $(t), i = e.add(e.parents()), n=!1;
    return i.each(function() {
        return "fixed" === $(this).css("position") ? (n=!0, !1) : void 0
    }), n
};
var Vel;
Vel = $ ? $.Velocity : jQuery ? jQuery.Velocity : Velocity, jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (!function(t) {
    function e(t) {
        var e = t.length, n = i.type(t);
        return "function" === n || i.isWindow(t)?!1 : 1 === t.nodeType && e?!0 : "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }
    if (!t.jQuery) {
        var i = function(t, e) {
            return new i.fn.init(t, e)
        };
        i.isWindow = function(t) {
            return null != t && t == t.window
        }, i.type = function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? a[s.call(t)] || "object" : typeof t
        }, i.isArray = Array.isArray || function(t) {
            return "array" === i.type(t)
        }, i.isPlainObject = function(t) {
            var e;
            if (!t || "object" !== i.type(t) || t.nodeType || i.isWindow(t))
                return !1;
            try {
                if (t.constructor&&!o.call(t, "constructor")&&!o.call(t.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (n) {
                return !1
            }
            for (e in t);
            return void 0 === e || o.call(t, e)
        }, i.each = function(t, i, n) {
            var a, o = 0, s = t.length, r = e(t);
            if (n) {
                if (r)
                    for (; s > o && (a = i.apply(t[o], n), a!==!1); o++);
                else
                    for (o in t)
                        if (a = i.apply(t[o], n), a===!1)
                            break
            } else if (r)
                for (; s > o && (a = i.call(t[o], o, t[o]), a!==!1); o++);
            else
                for (o in t)
                    if (a = i.call(t[o], o, t[o]), a===!1)
                        break;
            return t
        }, i.data = function(t, e, a) {
            if (void 0 === a) {
                var o = t[i.expando], s = o && n[o];
                if (void 0 === e)
                    return s;
                if (s && e in s)
                    return s[e]
            } else if (void 0 !== e) {
                var o = t[i.expando] || (t[i.expando]=++i.uuid);
                return n[o] = n[o] || {}, n[o][e] = a, a
            }
        }, i.removeData = function(t, e) {
            var a = t[i.expando], o = a && n[a];
            o && i.each(e, function(t, e) {
                delete o[e]
            })
        }, i.extend = function() {
            var t, e, n, a, o, s, r = arguments[0] || {}, l = 1, c = arguments.length, u=!1;
            for ("boolean" == typeof r && (u = r, r = arguments[l] || {}, l++), "object" != typeof r && "function" !== i.type(r) && (r = {}), l === c && (r = this, l--); c > l; l++)
                if (null != (o = arguments[l]))
                    for (a in o)
                        t = r[a], n = o[a], r !== n && (u && n && (i.isPlainObject(n) || (e = i.isArray(n))) ? (e ? (e=!1, s = t && i.isArray(t) ? t : []) : s = t && i.isPlainObject(t) ? t : {}, r[a] = i.extend(u, s, n)) : void 0 !== n && (r[a] = n));
            return r
        }, i.queue = function(t, n, a) {
            function o(t, i) {
                var n = i || [];
                return null != t && (e(Object(t))?!function(t, e) {
                    for (var i =+ e.length, n = 0, a = t.length; i > n;)
                        t[a++] = e[n++];
                    if (i !== i)
                        for (; void 0 !== e[n];)
                            t[a++] = e[n++];
                    return t.length = a, t
                }(n, "string" == typeof t ? [t] : t) : [].push.call(n, t)), n
            }
            if (t) {
                n = (n || "fx") + "queue";
                var s = i.data(t, n);
                return a ? (!s || i.isArray(a) ? s = i.data(t, n, o(a)) : s.push(a), s) : s || []
            }
        }, i.dequeue = function(t, e) {
            i.each(t.nodeType ? [t] : t, function(t, n) {
                e = e || "fx";
                var a = i.queue(n, e), o = a.shift();
                "inprogress" === o && (o = a.shift()), o && ("fx" === e && a.unshift("inprogress"), o.call(n, function() {
                    i.dequeue(n, e)
                }))
            })
        }, i.fn = i.prototype = {
            init: function(t) {
                if (t.nodeType)
                    return this[0] = t, this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var e = this[0].getBoundingClientRect ? this[0].getBoundingClientRect(): {
                    top: 0,
                    left: 0
                };
                return {
                    top: e.top + (t.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: e.left + (t.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                function t() {
                    for (var t = this.offsetParent || document; t && "html"===!t.nodeType.toLowerCase && "static" === t.style.position;)
                        t = t.offsetParent;
                    return t || document
                }
                var e = this[0], t = t.apply(e), n = this.offset(), a = /^(?:body|html)$/i.test(t.nodeName) ? {
                    top: 0,
                    left: 0
                }
                : i(t).offset();
                return n.top -= parseFloat(e.style.marginTop) || 0, n.left -= parseFloat(e.style.marginLeft) || 0, t.style && (a.top += parseFloat(t.style.borderTopWidth) || 0, a.left += parseFloat(t.style.borderLeftWidth) || 0), {
                    top: n.top - a.top,
                    left: n.left - a.left
                }
            }
        };
        var n = {};
        i.expando = "velocity" + (new Date).getTime(), i.uuid = 0;
        for (var a = {}, o = a.hasOwnProperty, s = a.toString, r = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < r.length; l++)
            a["[object " + r[l] + "]"] = r[l].toLowerCase();
        i.fn.init.prototype = i.fn, t.Velocity = {
            Utilities: i
        }
    }
}(window), function(t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : t()
}(function() {
    return function(t, e, i, n) {
        function a(t) {
            for (var e =- 1, i = t ? t.length : 0, n = []; ++e < i;) {
                var a = t[e];
                a && n.push(a)
            }
            return n
        }
        function o(t) {
            return m.isWrapped(t) ? t = [].slice.call(t) : m.isNode(t) && (t = [t]), t
        }
        function s(t) {
            var e = f.data(t, "velocity");
            return null === e ? n : e
        }
        function r(t) {
            return function(e) {
                return Math.round(e * t) * (1 / t)
            }
        }
        function l(t, i, n, a) {
            function o(t, e) {
                return 1 - 3 * e + 3 * t
            }
            function s(t, e) {
                return 3 * e - 6 * t
            }
            function r(t) {
                return 3 * t
            }
            function l(t, e, i) {
                return ((o(e, i) * t + s(e, i)) * t + r(e)) * t
            }
            function c(t, e, i) {
                return 3 * o(e, i) * t * t + 2 * s(e, i) * t + r(e)
            }
            function u(e, i) {
                for (var a = 0; m > a; ++a) {
                    var o = c(i, t, n);
                    if (0 === o)
                        return i;
                    var s = l(i, t, n) - e;
                    i -= s / o
                }
                return i
            }
            function h() {
                for (var e = 0; b > e; ++e)
                    S[e] = l(e * w, t, n)
            }
            function f(e, i, a) {
                var o, s, r = 0;
                do
                    s = i + (a - i) / 2, o = l(s, t, n) - e, o > 0 ? a = s : i = s;
                while (Math.abs(o) > g&&++r < y);
                return s
            }
            function d(e) {
                for (var i = 0, a = 1, o = b - 1; a != o && S[a] <= e; ++a)
                    i += w;
                --a;
                var s = (e - S[a]) / (S[a + 1] - S[a]), r = i + s * w, l = c(r, t, n);
                return l >= v ? u(e, r) : 0 == l ? r : f(e, i, i + w)
            }
            function p() {
                k=!0, (t != i || n != a) && h()
            }
            var m = 4, v = .001, g = 1e-7, y = 10, b = 11, w = 1 / (b - 1), x = "Float32Array"in e;
            if (4 !== arguments.length)
                return !1;
            for (var C = 0; 4 > C; ++C)
                if ("number" != typeof arguments[C] || isNaN(arguments[C]) ||!isFinite(arguments[C]))
                    return !1;
            t = Math.min(t, 1), n = Math.min(n, 1), t = Math.max(t, 0), n = Math.max(n, 0);
            var S = x ? new Float32Array(b): new Array(b), k=!1, P = function(e) {
                return k || p(), t === i && n === a ? e : 0 === e ? 0 : 1 === e ? 1 : l(d(e), i, a)
            };
            P.getControlPoints = function() {
                return [{
                    x: t,
                    y: i
                }, {
                    x: n,
                    y: a
                }
                ]
            };
            var T = "generateBezier(" + [t, i, n, a] + ")";
            return P.toString = function() {
                return T
            }, P
        }
        function c(t, e) {
            var i = t;
            return m.isString(t) ? b.Easings[t] || (i=!1) : i = m.isArray(t) && 1 === t.length ? r.apply(null, t) : m.isArray(t) && 2 === t.length ? w.apply(null, t.concat([e])) : m.isArray(t) && 4 === t.length ? l.apply(null, t) : !1, i===!1 && (i = b.Easings[b.defaults.easing] ? b.defaults.easing : y), i
        }
        function u(t) {
            if (t) {
                var e = (new Date).getTime(), i = b.State.calls.length;
                i > 1e4 && (b.State.calls = a(b.State.calls));
                for (var o = 0; i > o; o++)
                    if (b.State.calls[o]) {
                        var r = b.State.calls[o], l = r[0], c = r[2], d = r[3], p=!!d, v = null;
                        d || (d = b.State.calls[o][3] = e - 16);
                        for (var g = Math.min((e - d) / c.duration, 1), y = 0, w = l.length; w > y; y++) {
                            var C = l[y], k = C.element;
                            if (s(k)) {
                                var P=!1;
                                if (c.display !== n && null !== c.display && "none" !== c.display) {
                                    if ("flex" === c.display) {
                                        var T = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                        f.each(T, function(t, e) {
                                            x.setPropertyValue(k, "display", e)
                                        })
                                    }
                                    x.setPropertyValue(k, "display", c.display)
                                }
                                c.visibility !== n && "hidden" !== c.visibility && x.setPropertyValue(k, "visibility", c.visibility);
                                for (var A in C)
                                    if ("element" !== A) {
                                        var E, M = C[A], L = m.isString(M.easing) ? b.Easings[M.easing]: M.easing;
                                        if (1 === g)
                                            E = M.endValue;
                                        else {
                                            var F = M.endValue - M.startValue;
                                            if (E = M.startValue + F * L(g, c, F), !p && E === M.currentValue)
                                                continue
                                        }
                                        if (M.currentValue = E, "tween" === A)
                                            v = E;
                                        else {
                                            if (x.Hooks.registered[A]) {
                                                var O = x.Hooks.getRoot(A), I = s(k).rootPropertyValueCache[O];
                                                I && (M.rootPropertyValue = I)
                                            }
                                            var R = x.setPropertyValue(k, A, M.currentValue + (0 === parseFloat(E) ? "" : M.unitType), M.rootPropertyValue, M.scrollData);
                                            x.Hooks.registered[A] && (s(k).rootPropertyValueCache[O] = x.Normalizations.registered[O] ? x.Normalizations.registered[O]("extract", null, R[1]) : R[1]), "transform" === R[0] && (P=!0)
                                        }
                                    }
                                    c.mobileHA && s(k).transformCache.translate3d === n && (s(k).transformCache.translate3d = "(0px, 0px, 0px)", P=!0), P && x.flushTransformCache(k)
                                }
                            }
                            c.display !== n && "none" !== c.display && (b.State.calls[o][2].display=!1), c.visibility !== n && "hidden" !== c.visibility && (b.State.calls[o][2].visibility=!1), c.progress && c.progress.call(r[1], r[1], g, Math.max(0, d + c.duration - e), d, v), 1 === g && h(o)
                        }
                }
            b.State.isTicking && S(u)
        }
        function h(t, e) {
            if (!b.State.calls[t])
                return !1;
            for (var i = b.State.calls[t][0], a = b.State.calls[t][1], o = b.State.calls[t][2], r = b.State.calls[t][4], l=!1, c = 0, u = i.length; u > c; c++) {
                var h = i[c].element;
                if (e || o.loop || ("none" === o.display && x.setPropertyValue(h, "display", o.display), "hidden" === o.visibility && x.setPropertyValue(h, "visibility", o.visibility)), o.loop!==!0 && (f.queue(h)[1] === n ||!/\.velocityQueueEntryFlag/i.test(f.queue(h)[1])) && s(h)) {
                    s(h).isAnimating=!1, s(h).rootPropertyValueCache = {};
                    var d=!1;
                    f.each(x.Lists.transforms3D, function(t, e) {
                        var i = /^scale/.test(e) ? 1: 0, a = s(h).transformCache[e];
                        s(h).transformCache[e] !== n && new RegExp("^\\(" + i + "[^.]").test(a) && (d=!0, delete s(h).transformCache[e])
                    }), o.mobileHA && (d=!0, delete s(h).transformCache.translate3d), d && x.flushTransformCache(h), x.Values.removeClass(h, "velocity-animating")
                }
                if (!e && o.complete&&!o.loop && c === u - 1)
                    try {
                        o.complete.call(a, a)
                    } catch (p) {
                    setTimeout(function() {
                        throw p
                    }, 1)
                }
                r && o.loop!==!0 && r(a), s(h) && o.loop===!0&&!e && (f.each(s(h).tweensContainer, function(t, e) {
                    /^rotate/.test(t) && 360 === parseFloat(e.endValue) && (e.endValue = 0, e.startValue = 360), /^backgroundPosition/.test(t) && 100 === parseFloat(e.endValue) && "%" === e.unitType && (e.endValue = 0, e.startValue = 100)
                }), b(h, "reverse", {
                    loop: !0,
                    delay: o.delay
                })), o.queue!==!1 && f.dequeue(h, o.queue)
            }
            b.State.calls[t]=!1;
            for (var m = 0, v = b.State.calls.length; v > m; m++)
                if (b.State.calls[m]!==!1) {
                    l=!0;
                    break
                }
            l===!1 && (b.State.isTicking=!1, delete b.State.calls, b.State.calls = [])
        }
        var f, d = function() {
            if (i.documentMode)
                return i.documentMode;
            for (var t = 7; t > 4; t--) {
                var e = i.createElement("div");
                if (e.innerHTML = "<!--[if IE " + t + "]><span></span><![endif]-->", e.getElementsByTagName("span").length)
                    return e = null, t
            }
            return n
        }(), p = function() {
            var t = 0;
            return e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function(e) {
                var i, n = (new Date).getTime();
                return i = Math.max(0, 16 - (n - t)), t = n + i, setTimeout(function() {
                    e(n + i)
                }, i)
            }
        }(), m = {
            isString: function(t) {
                return "string" == typeof t
            },
            isArray: Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            isFunction: function(t) {
                return "[object Function]" === Object.prototype.toString.call(t)
            },
            isNode: function(t) {
                return t && t.nodeType
            },
            isNodeList: function(t) {
                return "object" == typeof t && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(t)) && t.length !== n && (0 === t.length || "object" == typeof t[0] && t[0].nodeType > 0)
            },
            isWrapped: function(t) {
                return t && (t.jquery || e.Zepto && e.Zepto.zepto.isZ(t))
            },
            isSVG: function(t) {
                return e.SVGElement && t instanceof e.SVGElement
            },
            isEmptyObject: function(t) {
                for (var e in t)
                    return !1;
                return !0
            }
        }, v=!1;
        if (t.fn && t.fn.jquery ? (f = t, v=!0) : f = e.Velocity.Utilities, 8 >= d&&!v)
            throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (7 >= d)
            return void(jQuery.fn.velocity = jQuery.fn.animate);
        var g = 400, y = "swing", b = {
            State: {
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                isAndroid: /Android/i.test(navigator.userAgent),
                isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                isChrome: e.chrome,
                isFirefox: /Firefox/i.test(navigator.userAgent),
                prefixElement: i.createElement("div"),
                prefixMatches: {},
                scrollAnchor: null,
                scrollPropertyLeft: null,
                scrollPropertyTop: null,
                isTicking: !1,
                calls: []
            },
            CSS: {},
            Utilities: f,
            Redirects: {},
            Easings: {},
            Promise: e.Promise,
            defaults: {
                queue: "",
                duration: g,
                easing: y,
                begin: n,
                complete: n,
                progress: n,
                display: n,
                visibility: n,
                loop: !1,
                delay: !1,
                mobileHA: !0,
                _cacheValues: !0
            },
            init: function(t) {
                f.data(t, "velocity", {
                    isSVG: m.isSVG(t),
                    isAnimating: !1,
                    computedStyle: null,
                    tweensContainer: null,
                    rootPropertyValueCache: {},
                    transformCache: {}
                })
            },
            hook: null,
            mock: !1,
            version: {
                major: 1,
                minor: 2,
                patch: 2
            },
            debug: !1
        };
        e.pageYOffset !== n ? (b.State.scrollAnchor = e, b.State.scrollPropertyLeft = "pageXOffset", b.State.scrollPropertyTop = "pageYOffset") : (b.State.scrollAnchor = i.documentElement || i.body.parentNode || i.body, b.State.scrollPropertyLeft = "scrollLeft", b.State.scrollPropertyTop = "scrollTop");
        var w = function() {
            function t(t) {
                return - t.tension * t.x - t.friction * t.v
            }
            function e(e, i, n) {
                var a = {
                    x: e.x + n.dx * i,
                    v: e.v + n.dv * i,
                    tension: e.tension,
                    friction: e.friction
                };
                return {
                    dx: a.v,
                    dv: t(a)
                }
            }
            function i(i, n) {
                var a = {
                    dx: i.v,
                    dv: t(i)
                }, o = e(i, .5 * n, a), s = e(i, .5 * n, o), r = e(i, n, s), l = 1 / 6 * (a.dx + 2 * (o.dx + s.dx) + r.dx), c = 1 / 6 * (a.dv + 2 * (o.dv + s.dv) + r.dv);
                return i.x = i.x + l * n, i.v = i.v + c * n, i
            }
            return function n(t, e, a) {
                var o, s, r, l = {
                    x: - 1,
                    v: 0,
                    tension: null,
                    friction: null
                }, c = [0], u = 0, h = 1e-4, f = .016;
                for (t = parseFloat(t) || 500, e = parseFloat(e) || 20, a = a || null, l.tension = t, l.friction = e, o = null !== a, o ? (u = n(t, e), s = u / a * f) : s = f; r = i(r || l, s), c.push(1 + r.x), u += 16, Math.abs(r.x) > h && Math.abs(r.v) > h;);
                return o ? function(t) {
                    return c[t * (c.length - 1) | 0]
                } : u
            }
        }();
        b.Easings = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            spring: function(t) {
                return 1 - Math.cos(4.5 * t * Math.PI) * Math.exp(6*-t)
            }
        }, f.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function(t, e) {
            b.Easings[e[0]] = l.apply(null, e[1])
        });
        var x = b.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i,
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Lists: {
                colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
            },
            Hooks: {
                templates: {
                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                    boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                    clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                    backgroundPosition: ["X Y", "0% 0%"],
                    transformOrigin: ["X Y Z", "50% 50% 0px"],
                    perspectiveOrigin: ["X Y", "50% 50%"]
                },
                registered: {},
                register: function() {
                    for (var t = 0; t < x.Lists.colors.length; t++) {
                        var e = "color" === x.Lists.colors[t] ? "0 0 0 1": "255 255 255 1";
                        x.Hooks.templates[x.Lists.colors[t]] = ["Red Green Blue Alpha", e]
                    }
                    var i, n, a;
                    if (d)
                        for (i in x.Hooks.templates) {
                            n = x.Hooks.templates[i], a = n[0].split(" ");
                            var o = n[1].match(x.RegEx.valueSplit);
                            "Color" === a[0] && (a.push(a.shift()), o.push(o.shift()), x.Hooks.templates[i] = [a.join(" "), o.join(" ")])
                        }
                    for (i in x.Hooks.templates) {
                        n = x.Hooks.templates[i], a = n[0].split(" ");
                        for (var t in a) {
                            var s = i + a[t], r = t;
                            x.Hooks.registered[s] = [i, r]
                        }
                    }
                },
                getRoot: function(t) {
                    var e = x.Hooks.registered[t];
                    return e ? e[0] : t
                },
                cleanRootPropertyValue: function(t, e) {
                    return x.RegEx.valueUnwrap.test(e) && (e = e.match(x.RegEx.valueUnwrap)[1]), x.Values.isCSSNullValue(e) && (e = x.Hooks.templates[t][1]), e
                },
                extractValue: function(t, e) {
                    var i = x.Hooks.registered[t];
                    if (i) {
                        var n = i[0], a = i[1];
                        return e = x.Hooks.cleanRootPropertyValue(n, e), e.toString().match(x.RegEx.valueSplit)[a]
                    }
                    return e
                },
                injectValue: function(t, e, i) {
                    var n = x.Hooks.registered[t];
                    if (n) {
                        var a, o, s = n[0], r = n[1];
                        return i = x.Hooks.cleanRootPropertyValue(s, i), a = i.toString().match(x.RegEx.valueSplit), a[r] = e, o = a.join(" ")
                    }
                    return i
                }
            },
            Normalizations: {
                registered: {
                    clip: function(t, e, i) {
                        switch (t) {
                        case"name":
                            return "clip";
                        case"extract":
                            var n;
                            return x.RegEx.wrappedValueAlreadyExtracted.test(i) ? n = i : (n = i.toString().match(x.RegEx.valueUnwrap), n = n ? n[1].replace(/,(\s+)?/g, " ") : i), n;
                        case"inject":
                            return "rect(" + i + ")"
                        }
                    },
                    blur: function(t, e, i) {
                        switch (t) {
                        case"name":
                            return b.State.isFirefox ? "filter" : "-webkit-filter";
                        case"extract":
                            var n = parseFloat(i);
                            if (!n && 0 !== n) {
                                var a = i.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                n = a ? a[1] : 0
                            }
                            return n;
                        case"inject":
                            return parseFloat(i) ? "blur(" + i + ")" : "none"
                        }
                    },
                    opacity: function(t, e, i) {
                        if (8 >= d)
                            switch (t) {
                            case"name":
                                return "filter";
                            case"extract":
                                var n = i.toString().match(/alpha\(opacity=(.*)\)/i);
                                return i = n ? n[1] / 100 : 1;
                            case"inject":
                                return e.style.zoom = 1, parseFloat(i) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(i), 10) + ")"
                            } else
                                switch (t) {
                                case"name":
                                    return "opacity";
                                case"extract":
                                    return i;
                                case"inject":
                                    return i
                                }
                    }
                },
                register: function() {
                    9 >= d || b.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));
                    for (var t = 0; t < x.Lists.transformsBase.length; t++)
                        !function() {
                            var e = x.Lists.transformsBase[t];
                            x.Normalizations.registered[e] = function(t, i, a) {
                                switch (t) {
                                case"name":
                                    return "transform";
                                case"extract":
                                    return s(i) === n || s(i).transformCache[e] === n ? /^scale/i.test(e) ? 1 : 0 : s(i).transformCache[e].replace(/[()]/g, "");
                                case"inject":
                                    var o=!1;
                                    switch (e.substr(0, e.length - 1)) {
                                    case"translate":
                                        o=!/(%|px|em|rem|vw|vh|\d)$/i.test(a);
                                        break;
                                    case"scal":
                                    case"scale":
                                        b.State.isAndroid && s(i).transformCache[e] === n && 1 > a && (a = 1), o=!/(\d)$/i.test(a);
                                        break;
                                    case"skew":
                                        o=!/(deg|\d)$/i.test(a);
                                        break;
                                    case"rotate":
                                        o=!/(deg|\d)$/i.test(a)
                                    }
                                    return o || (s(i).transformCache[e] = "(" + a + ")"), s(i).transformCache[e]
                                }
                            }
                        }();
                    for (var t = 0; t < x.Lists.colors.length; t++)
                        !function() {
                            var e = x.Lists.colors[t];
                            x.Normalizations.registered[e] = function(t, i, a) {
                                switch (t) {
                                case"name":
                                    return e;
                                case"extract":
                                    var o;
                                    if (x.RegEx.wrappedValueAlreadyExtracted.test(a))
                                        o = a;
                                    else {
                                        var s, r = {
                                            black: "rgb(0, 0, 0)",
                                            blue: "rgb(0, 0, 255)",
                                            gray: "rgb(128, 128, 128)",
                                            green: "rgb(0, 128, 0)",
                                            red: "rgb(255, 0, 0)",
                                            white: "rgb(255, 255, 255)"
                                        };
                                        /^[A-z]+$/i.test(a) ? s = r[a] !== n ? r[a] : r.black : x.RegEx.isHex.test(a) ? s = "rgb(" + x.Values.hexToRgb(a).join(" ") + ")" : /^rgba?\(/i.test(a) || (s = r.black), o = (s || a).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                    }
                                    return 8 >= d || 3 !== o.split(" ").length || (o += " 1"), o;
                                case"inject":
                                    return 8 >= d ? 4 === a.split(" ").length && (a = a.split(/\s+/).slice(0, 3).join(" ")) : 3 === a.split(" ").length && (a += " 1"), (8 >= d ? "rgb" : "rgba") + "(" + a.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                }
            },
            Names: {
                camelCase: function(t) {
                    return t.replace(/-(\w)/g, function(t, e) {
                        return e.toUpperCase()
                    })
                },
                SVGAttribute: function(t) {
                    var e = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (d || b.State.isAndroid&&!b.State.isChrome) && (e += "|transform"), new RegExp("^(" + e + ")$", "i").test(t)
                },
                prefixCheck: function(t) {
                    if (b.State.prefixMatches[t])
                        return [b.State.prefixMatches[t], !0];
                    for (var e = ["", "Webkit", "Moz", "ms", "O"], i = 0, n = e.length; n > i; i++) {
                        var a;
                        if (a = 0 === i ? t : e[i] + t.replace(/^\w/, function(t) {
                            return t.toUpperCase()
                        }), m.isString(b.State.prefixElement.style[a]))
                            return b.State.prefixMatches[t] = a, [a, !0]
                    }
                    return [t, !1]
                }
            },
            Values: {
                hexToRgb: function(t) {
                    var e, i = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return t = t.replace(i, function(t, e, i, n) {
                        return e + e + i + i + n + n
                    }), e = n.exec(t), e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : [0, 0, 0]
                },
                isCSSNullValue: function(t) {
                    return 0 == t || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(t)
                },
                getUnitType: function(t) {
                    return /^(rotate|skew)/i.test(t) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(t) ? "" : "px"
                },
                getDisplayType: function(t) {
                    var e = t && t.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(e) ? "inline" : /^(li)$/i.test(e) ? "list-item" : /^(tr)$/i.test(e) ? "table-row" : /^(table)$/i.test(e) ? "table" : /^(tbody)$/i.test(e) ? "table-row-group" : "block"
                },
                addClass: function(t, e) {
                    t.classList ? t.classList.add(e) : t.className += (t.className.length ? " " : "") + e
                },
                removeClass: function(t, e) {
                    t.classList ? t.classList.remove(e) : t.className = t.className.toString().replace(new RegExp("(^|\\s)" + e.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                }
            },
            getPropertyValue: function(t, i, a, o) {
                function r(t, i) {
                    function a() {
                        c && x.setPropertyValue(t, "display", "none")
                    }
                    var l = 0;
                    if (8 >= d)
                        l = f.css(t, i);
                    else {
                        var c=!1;
                        if (/^(width|height)$/.test(i) && 0 === x.getPropertyValue(t, "display") && (c=!0, x.setPropertyValue(t, "display", x.Values.getDisplayType(t))), !o) {
                            if ("height" === i && "border-box" !== x.getPropertyValue(t, "boxSizing").toString().toLowerCase()) {
                                var u = t.offsetHeight - (parseFloat(x.getPropertyValue(t, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(t, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(t, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(t, "paddingBottom")) || 0);
                                return a(), u
                            }
                            if ("width" === i && "border-box" !== x.getPropertyValue(t, "boxSizing").toString().toLowerCase()) {
                                var h = t.offsetWidth - (parseFloat(x.getPropertyValue(t, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(t, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(t, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(t, "paddingRight")) || 0);
                                return a(), h
                            }
                        }
                        var p;
                        p = s(t) === n ? e.getComputedStyle(t, null) : s(t).computedStyle ? s(t).computedStyle : s(t).computedStyle = e.getComputedStyle(t, null), "borderColor" === i && (i = "borderTopColor"), l = 9 === d && "filter" === i ? p.getPropertyValue(i) : p[i], ("" === l || null === l) && (l = t.style[i]), a()
                    }
                    if ("auto" === l && /^(top|right|bottom|left)$/i.test(i)) {
                        var m = r(t, "position");
                        ("fixed" === m || "absolute" === m && /top|left/i.test(i)) && (l = f(t).position()[i] + "px")
                    }
                    return l
                }
                var l;
                if (x.Hooks.registered[i]) {
                    var c = i, u = x.Hooks.getRoot(c);
                    a === n && (a = x.getPropertyValue(t, x.Names.prefixCheck(u)[0])), x.Normalizations.registered[u] && (a = x.Normalizations.registered[u]("extract", t, a)), l = x.Hooks.extractValue(c, a)
                } else if (x.Normalizations.registered[i]) {
                    var h, p;
                    h = x.Normalizations.registered[i]("name", t), "transform" !== h && (p = r(t, x.Names.prefixCheck(h)[0]), x.Values.isCSSNullValue(p) && x.Hooks.templates[i] && (p = x.Hooks.templates[i][1])), l = x.Normalizations.registered[i]("extract", t, p)
                }
                if (!/^[\d-]/.test(l))
                    if (s(t) && s(t).isSVG && x.Names.SVGAttribute(i))
                        if (/^(height|width)$/i.test(i))
                            try {
                                l = t.getBBox()[i]
                            } catch (m) {
                    l = 0
                } else
                    l = t.getAttribute(i);
                    else
                        l = r(t, x.Names.prefixCheck(i)[0]);
            return x.Values.isCSSNullValue(l) && (l = 0), b.debug >= 2 && console.log("Get " + i + ": " + l), l
        },
        setPropertyValue: function(t, i, n, a, o) {
            var r = i;
            if ("scroll" === i)
                o.container ? o.container["scroll" + o.direction] = n : "Left" === o.direction ? e.scrollTo(n, o.alternateValue) : e.scrollTo(o.alternateValue, n);
            else if (x.Normalizations.registered[i] && "transform" === x.Normalizations.registered[i]("name", t))
                x.Normalizations.registered[i]("inject", t, n), r = "transform", n = s(t).transformCache[i];
            else {
                if (x.Hooks.registered[i]) {
                    var l = i, c = x.Hooks.getRoot(i);
                    a = a || x.getPropertyValue(t, c), n = x.Hooks.injectValue(l, n, a), i = c
                }
                if (x.Normalizations.registered[i] && (n = x.Normalizations.registered[i]("inject", t, n), i = x.Normalizations.registered[i]("name", t)), r = x.Names.prefixCheck(i)[0], 8 >= d)
                    try {
                        t.style[r] = n
                } catch (u) {
                    b.debug && console.log("Browser does not support [" + n + "] for [" + r + "]")
                } else
                    s(t) && s(t).isSVG && x.Names.SVGAttribute(i) ? t.setAttribute(i, n) : t.style[r] = n;
                b.debug >= 2 && console.log("Set " + i + " (" + r + "): " + n)
            }
            return [r, n]
        },
        flushTransformCache: function(t) {
            function e(e) {
                return parseFloat(x.getPropertyValue(t, e))
            }
            var i = "";
            if ((d || b.State.isAndroid&&!b.State.isChrome) && s(t).isSVG) {
                var n = {
                    translate: [e("translateX"), e("translateY")],
                    skewX: [e("skewX")],
                    skewY: [e("skewY")],
                    scale: 1 !== e("scale") ? [e("scale"), e("scale")]: [e("scaleX"), e("scaleY")],
                    rotate: [e("rotateZ"), 0, 0]
                };
                f.each(s(t).transformCache, function(t) {
                    /^translate/i.test(t) ? t = "translate" : /^scale/i.test(t) ? t = "scale" : /^rotate/i.test(t) && (t = "rotate"), n[t] && (i += t + "(" + n[t].join(" ") + ") ", delete n[t])
                })
            } else {
                var a, o;
                f.each(s(t).transformCache, function(e) {
                    return a = s(t).transformCache[e], "transformPerspective" === e ? (o = a, !0) : (9 === d && "rotateZ" === e && (e = "rotate"), void(i += e + a + " "))
                }), o && (i = "perspective" + o + " " + i)
            }
            x.setPropertyValue(t, "transform", i)
        }
    };
    x.Hooks.register(), x.Normalizations.register(), b.hook = function(t, e, i) {
        var a = n;
        return t = o(t), f.each(t, function(t, o) {
            if (s(o) === n && b.init(o), i === n)
                a === n && (a = b.CSS.getPropertyValue(o, e));
            else {
                var r = b.CSS.setPropertyValue(o, e, i);
                "transform" === r[0] && b.CSS.flushTransformCache(o), a = r
            }
        }), a
    };
    var C = function() {
        function t() {
            return r ? A.promise || null : l
        }
        function a() {
            function t(t) {
                function h(t, e) {
                    var i = n, a = n, s = n;
                    return m.isArray(t) ? (i = t[0], !m.isArray(t[1]) && /^[\d-]/.test(t[1]) || m.isFunction(t[1]) || x.RegEx.isHex.test(t[1]) ? s = t[1] : (m.isString(t[1])&&!x.RegEx.isHex.test(t[1]) || m.isArray(t[1])) && (a = e ? t[1] : c(t[1], r.duration), t[2] !== n && (s = t[2]))) : i = t, e || (a = a || r.easing), m.isFunction(i) && (i = i.call(o, k, S)), m.isFunction(s) && (s = s.call(o, k, S)), [i || 0, a, s]
                }
                function d(t, e) {
                    var i, n;
                    return n = (e || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(t) {
                        return i = t, ""
                    }), i || (i = x.Values.getUnitType(t)), [n, i]
                }
                function g() {
                    var t = {
                        myParent: o.parentNode || i.body,
                        position: x.getPropertyValue(o, "position"),
                        fontSize: x.getPropertyValue(o, "fontSize")
                    }, n = t.position === R.lastPosition && t.myParent === R.lastParent, a = t.fontSize === R.lastFontSize;
                    R.lastParent = t.myParent, R.lastPosition = t.position, R.lastFontSize = t.fontSize;
                    var r = 100, l = {};
                    if (a && n)
                        l.emToPx = R.lastEmToPx, l.percentToPxWidth = R.lastPercentToPxWidth, l.percentToPxHeight = R.lastPercentToPxHeight;
                    else {
                        var c = s(o).isSVG ? i.createElementNS("http://www.w3.org/2000/svg", "rect"): i.createElement("div");
                        b.init(c), t.myParent.appendChild(c), f.each(["overflow", "overflowX", "overflowY"], function(t, e) {
                            b.CSS.setPropertyValue(c, e, "hidden")
                        }), b.CSS.setPropertyValue(c, "position", t.position), b.CSS.setPropertyValue(c, "fontSize", t.fontSize), b.CSS.setPropertyValue(c, "boxSizing", "content-box"), f.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(t, e) {
                            b.CSS.setPropertyValue(c, e, r + "%")
                        }), b.CSS.setPropertyValue(c, "paddingLeft", r + "em"), l.percentToPxWidth = R.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(c, "width", null, !0)) || 1) / r, l.percentToPxHeight = R.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(c, "height", null, !0)) || 1) / r, l.emToPx = R.lastEmToPx = (parseFloat(x.getPropertyValue(c, "paddingLeft")) || 1) / r, t.myParent.removeChild(c)
                    }
                    return null === R.remToPx && (R.remToPx = parseFloat(x.getPropertyValue(i.body, "fontSize")) || 16), null === R.vwToPx && (R.vwToPx = parseFloat(e.innerWidth) / 100, R.vhToPx = parseFloat(e.innerHeight) / 100), l.remToPx = R.remToPx, l.vwToPx = R.vwToPx, l.vhToPx = R.vhToPx, b.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), o), l
                }
                if (r.begin && 0 === k)
                    try {
                        r.begin.call(p, p)
                } catch (w) {
                    setTimeout(function() {
                        throw w
                    }, 1)
                }
                if ("scroll" === E) {
                    var C, P, T, M = /^x$/i.test(r.axis) ? "Left": "Top", L = parseFloat(r.offset) || 0;
                    r.container ? m.isWrapped(r.container) || m.isNode(r.container) ? (r.container = r.container[0] || r.container, C = r.container["scroll" + M], T = C + f(o).position()[M.toLowerCase()] + L) : r.container = null : (C = b.State.scrollAnchor[b.State["scrollProperty" + M]], P = b.State.scrollAnchor[b.State["scrollProperty" + ("Left" === M ? "Top" : "Left")]], T = f(o).offset()[M.toLowerCase()] + L), l = {
                        scroll: {
                            rootPropertyValue: !1,
                            startValue: C,
                            currentValue: C,
                            endValue: T,
                            unitType: "",
                            easing: r.easing,
                            scrollData: {
                                container: r.container,
                                direction: M,
                                alternateValue: P
                            }
                        },
                        element: o
                    }, b.debug && console.log("tweensContainer (scroll): ", l.scroll, o)
                } else if ("reverse" === E) {
                    if (!s(o).tweensContainer)
                        return void f.dequeue(o, r.queue);
                    "none" === s(o).opts.display && (s(o).opts.display = "auto"), "hidden" === s(o).opts.visibility && (s(o).opts.visibility = "visible"), s(o).opts.loop=!1, s(o).opts.begin = null, s(o).opts.complete = null, y.easing || delete r.easing, y.duration || delete r.duration, r = f.extend({}, s(o).opts, r);
                    var F = f.extend(!0, {}, s(o).tweensContainer);
                    for (var O in F)
                        if ("element" !== O) {
                            var I = F[O].startValue;
                            F[O].startValue = F[O].currentValue = F[O].endValue, F[O].endValue = I, m.isEmptyObject(y) || (F[O].easing = r.easing), b.debug && console.log("reverse tweensContainer (" + O + "): " + JSON.stringify(F[O]), o)
                        }
                    l = F
                } else if ("start" === E) {
                    var F;
                    s(o).tweensContainer && s(o).isAnimating===!0 && (F = s(o).tweensContainer), f.each(v, function(t, e) {
                        if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(t)) {
                            var i = h(e, !0), a = i[0], o = i[1], s = i[2];
                            if (x.RegEx.isHex.test(a)) {
                                for (var r = ["Red", "Green", "Blue"], l = x.Values.hexToRgb(a), c = s ? x.Values.hexToRgb(s) : n, u = 0; u < r.length; u++) {
                                    var f = [l[u]];
                                    o && f.push(o), c !== n && f.push(c[u]), v[t + r[u]] = f
                                }
                                delete v[t]
                            }
                        }
                    });
                    for (var z in v) {
                        var V = h(v[z]), W = V[0], _ = V[1], H = V[2];
                        z = x.Names.camelCase(z);
                        var B = x.Hooks.getRoot(z), N=!1;
                        if (s(o).isSVG || "tween" === B || x.Names.prefixCheck(B)[1]!==!1 || x.Normalizations.registered[B] !== n) {
                            (r.display !== n && null !== r.display && "none" !== r.display || r.visibility !== n && "hidden" !== r.visibility) && /opacity|filter/.test(z)&&!H && 0 !== W && (H = 0), r._cacheValues && F && F[z] ? (H === n && (H = F[z].endValue + F[z].unitType), N = s(o).rootPropertyValueCache[B]) : x.Hooks.registered[z] ? H === n ? (N = x.getPropertyValue(o, B), H = x.getPropertyValue(o, z, N)) : N = x.Hooks.templates[B][1] : H === n && (H = x.getPropertyValue(o, z));
                            var j, $, q, X=!1;
                            if (j = d(z, H), H = j[0], q = j[1], j = d(z, W), W = j[0].replace(/^([+-\/*])=/, function(t, e) {
                                return X = e, ""
                            }), $ = j[1], H = parseFloat(H) || 0, W = parseFloat(W) || 0, "%" === $ && (/^(fontSize|lineHeight)$/.test(z) ? (W/=100, $ = "em") : /^scale/.test(z) ? (W/=100, $ = "") : /(Red|Green|Blue)$/i.test(z) && (W = W / 100 * 255, $ = "")), /[\/*]/.test(X))
                                $ = q;
                            else if (q !== $ && 0 !== H)
                                if (0 === W)
                                    $ = q;
                                else {
                                    a = a || g();
                                    var Y = /margin|padding|left|right|width|text|word|letter/i.test(z) || /X$/.test(z) || "x" === z ? "x": "y";
                                    switch (q) {
                                    case"%":
                                        H*="x" === Y ? a.percentToPxWidth : a.percentToPxHeight;
                                        break;
                                    case"px":
                                        break;
                                    default:
                                        H*=a[q + "ToPx"]
                                    }
                                    switch ($) {
                                    case"%":
                                        H*=1 / ("x" === Y ? a.percentToPxWidth : a.percentToPxHeight);
                                        break;
                                    case"px":
                                        break;
                                    default:
                                        H*=1 / a[$ + "ToPx"]
                                    }
                                }
                            switch (X) {
                            case"+":
                                W = H + W;
                                break;
                            case"-":
                                W = H - W;
                                break;
                            case"*":
                                W = H * W;
                                break;
                            case"/":
                                W = H / W
                            }
                            l[z] = {
                                rootPropertyValue: N,
                                startValue: H,
                                currentValue: H,
                                endValue: W,
                                unitType: $,
                                easing: _
                            }, b.debug && console.log("tweensContainer (" + z + "): " + JSON.stringify(l[z]), o)
                        } else
                            b.debug && console.log("Skipping [" + B + "] due to a lack of browser support.")
                        }
                    l.element = o
                }
                l.element && (x.Values.addClass(o, "velocity-animating"), D.push(l), "" === r.queue && (s(o).tweensContainer = l, s(o).opts = r), s(o).isAnimating=!0, k === S - 1 ? (b.State.calls.push([D, p, r, null, A.resolver]), b.State.isTicking===!1 && (b.State.isTicking=!0, u())) : k++)
            }
            var a, o = this, r = f.extend({}, b.defaults, y), l = {};
            switch (s(o) === n && b.init(o), parseFloat(r.delay) && r.queue!==!1 && f.queue(o, r.queue, function(t) {
                b.velocityQueueEntryFlag=!0, s(o).delayTimer = {
                    setTimeout: setTimeout(t, parseFloat(r.delay)),
                    next: t
                }
            }), r.duration.toString().toLowerCase()) {
            case"fast":
                r.duration = 200;
                break;
            case"normal":
                r.duration = g;
                break;
            case"slow":
                r.duration = 600;
                break;
            default:
                r.duration = parseFloat(r.duration) || 1
            }
            b.mock!==!1 && (b.mock===!0 ? r.duration = r.delay = 1 : (r.duration*=parseFloat(b.mock) || 1, r.delay*=parseFloat(b.mock) || 1)), r.easing = c(r.easing, r.duration), r.begin&&!m.isFunction(r.begin) && (r.begin = null), r.progress&&!m.isFunction(r.progress) && (r.progress = null), r.complete&&!m.isFunction(r.complete) && (r.complete = null), r.display !== n && null !== r.display && (r.display = r.display.toString().toLowerCase(), "auto" === r.display && (r.display = b.CSS.Values.getDisplayType(o))), r.visibility !== n && null !== r.visibility && (r.visibility = r.visibility.toString().toLowerCase()), r.mobileHA = r.mobileHA && b.State.isMobile&&!b.State.isGingerbread, r.queue===!1 ? r.delay ? setTimeout(t, r.delay) : t() : f.queue(o, r.queue, function(e, i) {
                return i===!0 ? (A.promise && A.resolver(p), !0) : (b.velocityQueueEntryFlag=!0, void t(e))
            }), "" !== r.queue && "fx" !== r.queue || "inprogress" === f.queue(o)[0] || f.dequeue(o)
        }
        var r, l, d, p, v, y, w = arguments[0] && (arguments[0].p || f.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names || m.isString(arguments[0].properties));
        if (m.isWrapped(this) ? (r=!1, d = 0, p = this, l = this) : (r=!0, d = 1, p = w ? arguments[0].elements || arguments[0].e : arguments[0]), p = o(p)) {
            w ? (v = arguments[0].properties || arguments[0].p, y = arguments[0].options || arguments[0].o) : (v = arguments[d], y = arguments[d + 1]);
            var S = p.length, k = 0;
            if (!/^(stop|finish)$/i.test(v)&&!f.isPlainObject(y)) {
                var P = d + 1;
                y = {};
                for (var T = P; T < arguments.length; T++)
                    m.isArray(arguments[T]) ||!/^(fast|normal|slow)$/i.test(arguments[T])&&!/^\d/.test(arguments[T]) ? m.isString(arguments[T]) || m.isArray(arguments[T]) ? y.easing = arguments[T] : m.isFunction(arguments[T]) && (y.complete = arguments[T]) : y.duration = arguments[T]
            }
            var A = {
                promise: null,
                resolver: null,
                rejecter: null
            };
            r && b.Promise && (A.promise = new b.Promise(function(t, e) {
                A.resolver = t, A.rejecter = e
            }));
            var E;
            switch (v) {
            case"scroll":
                E = "scroll";
                break;
            case"reverse":
                E = "reverse";
                break;
            case"finish":
            case"stop":
                f.each(p, function(t, e) {
                    s(e) && s(e).delayTimer && (clearTimeout(s(e).delayTimer.setTimeout), s(e).delayTimer.next && s(e).delayTimer.next(), delete s(e).delayTimer)
                });
                var M = [];
                return f.each(b.State.calls, function(t, e) {
                    e && f.each(e[1], function(i, a) {
                        var o = y === n ? "": y;
                        return o===!0 || e[2].queue === o || y === n && e[2].queue===!1 ? void f.each(p, function(i, n) {
                            n === a && ((y===!0 || m.isString(y)) && (f.each(f.queue(n, m.isString(y) ? y : ""), function(t, e) {
                                m.isFunction(e) && e(null, !0)
                            }), f.queue(n, m.isString(y) ? y : "", [])), "stop" === v ? (s(n) && s(n).tweensContainer && o!==!1 && f.each(s(n).tweensContainer, function(t, e) {
                                e.endValue = e.currentValue
                            }), M.push(t)) : "finish" === v && (e[2].duration = 1))
                        }) : !0
                    })
                }), "stop" === v && (f.each(M, function(t, e) {
                    h(e, !0)
                }), A.promise && A.resolver(p)), t();
            default:
                if (!f.isPlainObject(v) || m.isEmptyObject(v)) {
                    if (m.isString(v) && b.Redirects[v]) {
                        var L = f.extend({}, y), F = L.duration, O = L.delay || 0;
                        return L.backwards===!0 && (p = f.extend(!0, [], p).reverse()), f.each(p, function(t, e) {
                            parseFloat(L.stagger) ? L.delay = O + parseFloat(L.stagger) * t : m.isFunction(L.stagger) && (L.delay = O + L.stagger.call(e, t, S)), L.drag && (L.duration = parseFloat(F) || (/^(callout|transition)/.test(v) ? 1e3 : g), L.duration = Math.max(L.duration * (L.backwards ? 1 - t / S : (t + 1) / S), .75 * L.duration, 200)), b.Redirects[v].call(e, e, L || {}, t, S, p, A.promise ? A : n)
                        }), t()
                    }
                    var I = "Velocity: First argument (" + v + ") was not a property map, a known action, or a registered redirect. Aborting.";
                    return A.promise ? A.rejecter(new Error(I)) : console.log(I), t()
                }
                E = "start"
            }
            var R = {
                lastParent: null,
                lastPosition: null,
                lastFontSize: null,
                lastPercentToPxWidth: null,
                lastPercentToPxHeight: null,
                lastEmToPx: null,
                remToPx: null,
                vwToPx: null,
                vhToPx: null
            }, D = [];
            f.each(p, function(t, e) {
                m.isNode(e) && a.call(e)
            });
            var z, L = f.extend({}, b.defaults, y);
            if (L.loop = parseInt(L.loop), z = 2 * L.loop - 1, L.loop)
                for (var V = 0; z > V; V++) {
                    var W = {
                        delay: L.delay,
                        progress: L.progress
                    };
                    V === z - 1 && (W.display = L.display, W.visibility = L.visibility, W.complete = L.complete), C(p, "reverse", W)
                }
            return t()
        }
    };
    b = f.extend(C, b), b.animate = C;
    var S = e.requestAnimationFrame || p;
    return b.State.isMobile || i.hidden === n || i.addEventListener("visibilitychange", function() {
        i.hidden ? (S = function(t) {
            return setTimeout(function() {
                t(!0)
            }, 16)
        }, u()) : S = e.requestAnimationFrame || p
    }), t.Velocity = b, t !== e && (t.fn.velocity = C, t.fn.velocity.defaults = b.defaults), f.each(["Down", "Up"], function(t, e) {
        b.Redirects["slide" + e] = function(t, i, a, o, s, r) {
            var l = f.extend({}, i), c = l.begin, u = l.complete, h = {
                height: "",
                marginTop: "",
                marginBottom: "",
                paddingTop: "",
                paddingBottom: ""
            }, d = {};
            l.display === n && (l.display = "Down" === e ? "inline" === b.CSS.Values.getDisplayType(t) ? "inline-block" : "block" : "none"), l.begin = function() {
                c && c.call(s, s);
                for (var i in h) {
                    d[i] = t.style[i];
                    var n = b.CSS.getPropertyValue(t, i);
                    h[i] = "Down" === e ? [n, 0] : [0, n]
                }
                d.overflow = t.style.overflow, t.style.overflow = "hidden"
            }, l.complete = function() {
                for (var e in d)
                    t.style[e] = d[e];
                u && u.call(s, s), r && r.resolver(s)
            }, b(t, h, l)
        }
    }), f.each(["In", "Out"], function(t, e) {
        b.Redirects["fade" + e] = function(t, i, a, o, s, r) {
            var l = f.extend({}, i), c = {
                opacity: "In" === e ? 1: 0
            }, u = l.complete;
            l.complete = a !== o - 1 ? l.begin = null : function() {
                u && u.call(s, s), r && r.resolver(s)
            }, l.display === n && (l.display = "In" === e ? "auto" : "none"), b(this, c, l)
        }
    }), b
}(window.jQuery || window.Zepto || window, window, document)
})), function() {
    "use strict";
    var t = this, e = t.Chart, i = function(t) {
        this.canvas = t.canvas, this.ctx = t;
        var i = function(t, e) {
            return t["offset" + e] ? t["offset" + e] : document.defaultView.getComputedStyle(t).getPropertyValue(e)
        }, a = this.width = i(t.canvas, "Width") || t.canvas.width, o = this.height = i(t.canvas, "Height") || t.canvas.height;
        return a = this.width = t.canvas.width, o = this.height = t.canvas.height, this.aspectRatio = this.width / this.height, n.retinaScale(this), this
    };
    i.defaults = {
        global: {
            animation: !0,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            showScale: !0,
            scaleOverride: !1,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: !0,
            scaleLabel: "<%=value%>",
            scaleIntegersOnly: !0,
            scaleBeginAtZero: !1,
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            responsive: !1,
            maintainAspectRatio: !0,
            showTooltips: !0,
            customTooltips: !1,
            tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
            tooltipFillColor: "rgba(0,0,0,0.8)",
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipFontSize: 14,
            tooltipFontStyle: "normal",
            tooltipFontColor: "#fff",
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 14,
            tooltipTitleFontStyle: "bold",
            tooltipTitleFontColor: "#fff",
            tooltipTitleTemplate: "<%= label%>",
            tooltipYPadding: 6,
            tooltipXPadding: 6,
            tooltipCaretSize: 8,
            tooltipCornerRadius: 6,
            tooltipXOffset: 10,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            multiTooltipTemplate: "<%= value %>",
            multiTooltipKeyBackground: "#fff",
            segmentColorDefault: ["#A6CEE3", "#1F78B4", "#B2DF8A", "#33A02C", "#FB9A99", "#E31A1C", "#FDBF6F", "#FF7F00", "#CAB2D6", "#6A3D9A", "#B4B482", "#B15928"],
            segmentHighlightColorDefaults: ["#CEF6FF", "#47A0DC", "#DAFFB2", "#5BC854", "#FFC2C1", "#FF4244", "#FFE797", "#FFA728", "#F2DAFE", "#9265C2", "#DCDCAA", "#D98150"],
            onAnimationProgress: function() {},
            onAnimationComplete: function() {}
        }
    }, i.types = {};
    var n = i.helpers = {}, a = n.each = function(t, e, i) {
        var n = Array.prototype.slice.call(arguments, 3);
        if (t)
            if (t.length ===+ t.length) {
                var a;
                for (a = 0; a < t.length; a++)
                    e.apply(i, [t[a], a].concat(n))
            } else
                for (var o in t)
                    e.apply(i, [t[o], o].concat(n))
    }, o = n.clone = function(t) {
        var e = {};
        return a(t, function(i, n) {
            t.hasOwnProperty(n) && (e[n] = i)
        }), e
    }, s = n.extend = function(t) {
        return a(Array.prototype.slice.call(arguments, 1), function(e) {
            a(e, function(i, n) {
                e.hasOwnProperty(n) && (t[n] = i)
            })
        }), t
    }, r = n.merge = function(t, e) {
        var i = Array.prototype.slice.call(arguments, 0);
        return i.unshift({}), s.apply(null, i)
    }, l = n.indexOf = function(t, e) {
        if (Array.prototype.indexOf)
            return t.indexOf(e);
        for (var i = 0; i < t.length; i++)
            if (t[i] === e)
                return i;
        return - 1
    }, f = (n.where = function(t, e) {
        var i = [];
        return n.each(t, function(t) {
            e(t) && i.push(t)
        }), i
    }, n.findNextWhere = function(t, e, i) {
        i || (i =- 1);
        for (var n = i + 1; n < t.length; n++) {
            var a = t[n];
            if (e(a))
                return a
        }
    }, n.findPreviousWhere = function(t, e, i) {
        i || (i = t.length);
        for (var n = i - 1; n >= 0; n--) {
            var a = t[n];
            if (e(a))
                return a
        }
    }, n.inherits = function(t) {
        var e = this, i = t && t.hasOwnProperty("constructor") ? t.constructor: function() {
            return e.apply(this, arguments)
        }, n = function() {
            this.constructor = i
        };
        return n.prototype = e.prototype, i.prototype = new n, i.extend = f, t && s(i.prototype, t), i.__super__ = e.prototype, i
    }), d = n.noop = function() {}, p = n.uid = function() {
        var t = 0;
        return function() {
            return "chart-" + t++
        }
    }(), m = n.warn = function(t) {
        window.console && "function" == typeof window.console.warn && console.warn(t)
    }, v = n.amd = "function" == typeof define && define.amd, g = n.isNumber = function(t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
    }, y = n.max = function(t) {
        return Math.max.apply(Math, t)
    }, b = n.min = function(t) {
        return Math.min.apply(Math, t)
    }, x = (n.cap = function(t, e, i) {
        if (g(e)) {
            if (t > e)
                return e
        } else if (g(i) && i > t)
            return i;
        return t
    }, n.getDecimalPlaces = function(t) {
        if (t%1 !== 0 && g(t)) {
            var e = t.toString();
            if (e.indexOf("e-") < 0)
                return e.split(".")[1].length;
            if (e.indexOf(".") < 0)
                return parseInt(e.split("e-")[1]);
            var i = e.split(".")[1].split("e-");
            return i[0].length + parseInt(i[1])
        }
        return 0
    }), C = n.radians = function(t) {
        return t * (Math.PI / 180)
    }, k = (n.getAngleFromPoint = function(t, e) {
        var i = e.x - t.x, n = e.y - t.y, a = Math.sqrt(i * i + n * n), o = 2 * Math.PI + Math.atan2(n, i);
        return 0 > i && 0 > n && (o += 2 * Math.PI), {
            angle: o,
            distance: a
        }
    }, n.aliasPixel = function(t) {
        return t%2 === 0 ? 0 : .5
    }), T = (n.splineCurve = function(t, e, i, n) {
        var a = Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)), o = Math.sqrt(Math.pow(i.x - e.x, 2) + Math.pow(i.y - e.y, 2)), s = n * a / (a + o), r = n * o / (a + o);
        return {
            inner: {
                x: e.x - s * (i.x - t.x),
                y: e.y - s * (i.y - t.y)
            },
            outer: {
                x: e.x + r * (i.x - t.x),
                y: e.y + r * (i.y - t.y)
            }
        }
    }, n.calculateOrderOfMagnitude = function(t) {
        return Math.floor(Math.log(t) / Math.LN10)
    }), E = (n.calculateScaleRange = function(t, e, i, n, o) {
        var s = 2, r = Math.floor(e / (1.5 * i)), l = s >= r, c = [];
        a(t, function(t) {
            null == t || c.push(t)
        });
        var u = b(c), h = y(c);
        h === u && (h += .5, u >= .5&&!n ? u -= .5 : h += .5);
        for (var f = Math.abs(h - u), d = T(f), p = Math.ceil(h / (1 * Math.pow(10, d))) * Math.pow(10, d), m = n ? 0 : Math.floor(u / (1 * Math.pow(10, d))) * Math.pow(10, d), v = p - m, g = Math.pow(10, d), w = Math.round(v / g); (w > r || r > 2 * w)&&!l;)
            if (w > r)
                g*=2, w = Math.round(v / g), w%1 !== 0 && (l=!0);
            else if (o && d >= 0) {
                if (g / 2%1 !== 0)
                    break;
                    g/=2, w = Math.round(v / g)
            } else
                g/=2, w = Math.round(v / g);
        return l && (w = s, g = v / w), {
            steps: w,
            stepValue: g,
            min: m,
            max: m + w * g
        }
    }, n.template = function(t, e) {
        function n(t, e) {
            var n = /\W/.test(t) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + t.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');"): i[t] = i[t];
            return e ? n(e) : n
        }
        if (t instanceof Function)
            return t(e);
        var i = {};
        return n(t, e)
    }), L = (n.generateLabels = function(t, e, i, n) {
        var o = new Array(e);
        return t && a(o, function(e, a) {
            o[a] = E(t, {
                value: i + n * (a + 1)
            })
        }), o
    }, n.easingEffects = {
        linear: function(t) {
            return t
        },
        easeInQuad: function(t) {
            return t * t
        },
        easeOutQuad: function(t) {
            return - 1 * t * (t - 2)
        },
        easeInOutQuad: function(t) {
            return (t/=.5) < 1 ? .5 * t * t : - 0.5 * (--t * (t - 2) - 1)
        },
        easeInCubic: function(t) {
            return t * t * t
        },
        easeOutCubic: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t + 1)
        },
        easeInOutCubic: function(t) {
            return (t/=.5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
        },
        easeInQuart: function(t) {
            return t * t * t * t
        },
        easeOutQuart: function(t) {
            return - 1 * ((t = t / 1 - 1) * t * t * t - 1)
        },
        easeInOutQuart: function(t) {
            return (t/=.5) < 1 ? .5 * t * t * t * t : - 0.5 * ((t -= 2) * t * t * t - 2)
        },
        easeInQuint: function(t) {
            return 1 * (t/=1) * t * t * t * t
        },
        easeOutQuint: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
        },
        easeInOutQuint: function(t) {
            return (t/=.5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
        },
        easeInSine: function(t) {
            return - 1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
        },
        easeOutSine: function(t) {
            return 1 * Math.sin(t / 1 * (Math.PI / 2))
        },
        easeInOutSine: function(t) {
            return - 0.5 * (Math.cos(Math.PI * t / 1) - 1)
        },
        easeInExpo: function(t) {
            return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
        },
        easeOutExpo: function(t) {
            return 1 === t ? 1 : 1 * ( - Math.pow(2, - 10 * t / 1) + 1)
        },
        easeInOutExpo: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t/=.5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * ( - Math.pow(2, - 10*--t) + 2)
        },
        easeInCirc: function(t) {
            return t >= 1 ? t : - 1 * (Math.sqrt(1 - (t/=1) * t) - 1)
        },
        easeOutCirc: function(t) {
            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
        },
        easeInOutCirc: function(t) {
            return (t/=.5) < 1?-0.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        },
        easeInElastic: function(t) {
            var e = 1.70158, i = 0, n = 1;
            return 0 === t ? 0 : 1 == (t/=1) ? 1 : (i || (i = .3), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), - (n * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i)))
        },
        easeOutElastic: function(t) {
            var e = 1.70158, i = 0, n = 1;
            return 0 === t ? 0 : 1 == (t/=1) ? 1 : (i || (i = .3), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, - 10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / i) + 1)
        },
        easeInOutElastic: function(t) {
            var e = 1.70158, i = 0, n = 1;
            return 0 === t ? 0 : 2 == (t/=.5) ? 1 : (i || (i = 1 * (.3 * 1.5)), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), 1 > t?-.5 * (n * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i)) : n * Math.pow(2, - 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i) * .5 + 1)
        },
        easeInBack: function(t) {
            var e = 1.70158;
            return 1 * (t/=1) * t * ((e + 1) * t - e)
        },
        easeOutBack: function(t) {
            var e = 1.70158;
            return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1)
        },
        easeInOutBack: function(t) {
            var e = 1.70158;
            return (t/=.5) < 1 ? .5 * (t * t * (((e*=1.525) + 1) * t - e)) : .5 * ((t -= 2) * t * (((e*=1.525) + 1) * t + e) + 2)
        },
        easeInBounce: function(t) {
            return 1 - L.easeOutBounce(1 - t)
        },
        easeOutBounce: function(t) {
            return (t/=1) < 1 / 2.75 ? 1 * (7.5625 * t * t) : 2 / 2.75 > t ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        },
        easeInOutBounce: function(t) {
            return .5 > t ? .5 * L.easeInBounce(2 * t) : .5 * L.easeOutBounce(2 * t - 1) + .5
        }
    }), F = n.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            return window.setTimeout(t, 1e3 / 60)
        }
    }(), D = (n.cancelAnimFrame = function() {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
            return window.clearTimeout(t, 1e3 / 60)
        }
    }(), n.animationLoop = function(t, e, i, n, a, o) {
        var s = 0, r = L[i] || L.linear, l = function() {
            s++;
            var i = s / e, c = r(i);
            t.call(o, c, i, s), n.call(o, c, i), e > s ? o.animationFrame = F(l) : a.apply(o)
        };
        F(l)
    }, n.getRelativePosition = function(t) {
        var e, i, n = t.originalEvent || t, a = t.currentTarget || t.srcElement, o = a.getBoundingClientRect();
        return n.touches ? (e = n.touches[0].clientX - o.left, i = n.touches[0].clientY - o.top) : (e = n.clientX - o.left, i = n.clientY - o.top), {
            x: e,
            y: i
        }
    }, n.addEvent = function(t, e, i) {
        t.addEventListener ? t.addEventListener(e, i) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i
    }), z = n.removeEvent = function(t, e, i) {
        t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent ? t.detachEvent("on" + e, i) : t["on" + e] = d
    }, W = (n.bindEvents = function(t, e, i) {
        t.events || (t.events = {}), a(e, function(e) {
            t.events[e] = function() {
                i.apply(t, arguments)
            }, D(t.chart.canvas, e, t.events[e])
        })
    }, n.unbindEvents = function(t, e) {
        a(e, function(e, i) {
            z(t.chart.canvas, i, e)
        })
    }), _ = n.getMaximumWidth = function(t) {
        var e = t.parentNode, i = parseInt(B(e, "padding-left")) + parseInt(B(e, "padding-right"));
        return e.clientWidth - i
    }, H = n.getMaximumHeight = function(t) {
        var e = t.parentNode, i = parseInt(B(e, "padding-bottom")) + parseInt(B(e, "padding-top"));
        return e.clientHeight - i
    }, B = n.getStyle = function(t, e) {
        return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
    }, j = (n.getMaximumSize = n.getMaximumWidth, n.retinaScale = function(t) {
        var e = t.ctx, i = t.canvas.width, n = t.canvas.height;
        window.devicePixelRatio && (e.canvas.style.width = i + "px", e.canvas.style.height = n + "px", e.canvas.height = n * window.devicePixelRatio, e.canvas.width = i * window.devicePixelRatio, e.scale(window.devicePixelRatio, window.devicePixelRatio))
    }), $ = n.clear = function(t) {
        t.ctx.clearRect(0, 0, t.width, t.height)
    }, q = n.fontString = function(t, e, i) {
        return e + " " + t + "px " + i
    }, X = n.longestText = function(t, e, i) {
        t.font = e;
        var n = 0;
        return a(i, function(e) {
            var i = t.measureText(e).width;
            n = i > n ? i : n
        }), n
    }, Y = n.drawRoundedRectangle = function(t, e, i, n, a, o) {
        t.beginPath(), t.moveTo(e + o, i), t.lineTo(e + n - o, i), t.quadraticCurveTo(e + n, i, e + n, i + o), t.lineTo(e + n, i + a - o), t.quadraticCurveTo(e + n, i + a, e + n - o, i + a), t.lineTo(e + o, i + a), t.quadraticCurveTo(e, i + a, e, i + a - o), t.lineTo(e, i + o), t.quadraticCurveTo(e, i, e + o, i), t.closePath()
    };
    i.instances = {}, i.Type = function(t, e, n) {
        this.options = e, this.chart = n, this.id = p(), i.instances[this.id] = this, e.responsive && this.resize(), this.initialize.call(this, t)
    }, s(i.Type.prototype, {
        initialize: function() {
            return this
        },
        clear: function() {
            return $(this.chart), this
        },
        stop: function() {
            return i.animationService.cancelAnimation(this), this
        },
        resize: function(t) {
            this.stop();
            var e = this.chart.canvas, i = _(this.chart.canvas), n = this.options.maintainAspectRatio ? i / this.chart.aspectRatio: H(this.chart.canvas);
            return e.width = this.chart.width = i, e.height = this.chart.height = n, j(this.chart), "function" == typeof t && t.apply(this, Array.prototype.slice.call(arguments, 1)), this
        },
        reflow: d,
        render: function(t) {
            if (t && this.reflow(), this.options.animation&&!t) {
                var e = new i.Animation;
                e.numSteps = this.options.animationSteps, e.easing = this.options.animationEasing, e.render = function(t, e) {
                    var i = n.easingEffects[e.easing], a = e.currentStep / e.numSteps, o = i(a);
                    t.draw(o, a, e.currentStep)
                }, e.onAnimationProgress = this.options.onAnimationProgress, e.onAnimationComplete = this.options.onAnimationComplete, i.animationService.addAnimation(this, e)
            } else
                this.draw(), this.options.onAnimationComplete.call(this);
            return this
        },
        generateLegend: function() {
            return E(this.options.legendTemplate, this)
        },
        destroy: function() {
            this.clear(), W(this, this.events);
            var t = this.chart.canvas;
            t.width = this.chart.width, t.height = this.chart.height, t.style.removeProperty ? (t.style.removeProperty("width"), t.style.removeProperty("height")) : (t.style.removeAttribute("width"), t.style.removeAttribute("height")), delete i.instances[this.id]
        },
        showTooltip: function(t, e) {
            "undefined" == typeof this.activeElements && (this.activeElements = []);
            var o = function(t) {
                var e=!1;
                return t.length !== this.activeElements.length ? e=!0 : (a(t, function(t, i) {
                    t !== this.activeElements[i] && (e=!0)
                }, this), e)
            }.call(this, t);
            if (o || e) {
                if (this.activeElements = t, this.draw(), this.options.customTooltips && this.options.customTooltips(!1), t.length > 0)
                    if (this.datasets && this.datasets.length > 1) {
                        for (var s, r, c = this.datasets.length - 1; c >= 0 && (s = this.datasets[c].points || this.datasets[c].bars || this.datasets[c].segments, r = l(s, t[0]), - 1 === r); c--);
                        var u = [], h = [], f = function(t) {
                            var i, s, l, c, f, e = [], a = [], o = [];
                            return n.each(this.datasets, function(t) {
                                i = t.points || t.bars || t.segments, i[r] && i[r].hasValue() && e.push(i[r])
                            }), n.each(e, function(t) {
                                a.push(t.x), o.push(t.y), u.push(n.template(this.options.multiTooltipTemplate, t)), h.push({
                                    fill: t._saved.fillColor || t.fillColor,
                                    stroke: t._saved.strokeColor || t.strokeColor
                                })
                            }, this), f = b(o), l = y(o), c = b(a), s = y(a), {
                                x: c > this.chart.width / 2 ? c: s,
                                y: (f + l) / 2
                            }
                        }.call(this, r);
                        new i.MultiTooltip({
                            x: f.x,
                            y: f.y,
                            xPadding: this.options.tooltipXPadding,
                            yPadding: this.options.tooltipYPadding,
                            xOffset: this.options.tooltipXOffset,
                            fillColor: this.options.tooltipFillColor,
                            textColor: this.options.tooltipFontColor,
                            fontFamily: this.options.tooltipFontFamily,
                            fontStyle: this.options.tooltipFontStyle,
                            fontSize: this.options.tooltipFontSize,
                            titleTextColor: this.options.tooltipTitleFontColor,
                            titleFontFamily: this.options.tooltipTitleFontFamily,
                            titleFontStyle: this.options.tooltipTitleFontStyle,
                            titleFontSize: this.options.tooltipTitleFontSize,
                            cornerRadius: this.options.tooltipCornerRadius,
                            labels: u,
                            legendColors: h,
                            legendColorBackground: this.options.multiTooltipKeyBackground,
                            title: E(this.options.tooltipTitleTemplate, t[0]),
                            chart: this.chart,
                            ctx: this.chart.ctx,
                            custom: this.options.customTooltips
                        }).draw()
                    } else
                        a(t, function(t) {
                            var e = t.tooltipPosition();
                            new i.Tooltip({
                                x: Math.round(e.x),
                                y: Math.round(e.y),
                                xPadding: this.options.tooltipXPadding,
                                yPadding: this.options.tooltipYPadding,
                                fillColor: this.options.tooltipFillColor,
                                textColor: this.options.tooltipFontColor,
                                fontFamily: this.options.tooltipFontFamily,
                                fontStyle: this.options.tooltipFontStyle,
                                fontSize: this.options.tooltipFontSize,
                                caretHeight: this.options.tooltipCaretSize,
                                cornerRadius: this.options.tooltipCornerRadius,
                                text: E(this.options.tooltipTemplate, t),
                                chart: this.chart,
                                custom: this.options.customTooltips
                            }).draw()
                        }, this);
                return this
            }
        },
        toBase64Image: function() {
            return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
        }
    }), i.Type.extend = function(t) {
        var e = this, n = function() {
            return e.apply(this, arguments)
        };
        if (n.prototype = o(e.prototype), s(n.prototype, t), n.extend = i.Type.extend, t.name || e.prototype.name) {
            var a = t.name || e.prototype.name, l = i.defaults[e.prototype.name] ? o(i.defaults[e.prototype.name]): {};
            i.defaults[a] = s(l, t.defaults), i.types[a] = n, i.prototype[a] = function(t, e) {
                var o = r(i.defaults.global, i.defaults[a], e || {});
                return new n(t, o, this)
            }
        } else
            m("Name not provided for this chart, so it hasn't been registered");
        return e
    }, i.Element = function(t) {
        s(this, t), this.initialize.apply(this, arguments), this.save()
    }, s(i.Element.prototype, {
        initialize: function() {},
        restore: function(t) {
            return t ? a(t, function(t) {
                this[t] = this._saved[t]
            }, this) : s(this, this._saved), this
        },
        save: function() {
            return this._saved = o(this), delete this._saved._saved, this
        },
        update: function(t) {
            return a(t, function(t, e) {
                this._saved[e] = this[e], this[e] = t
            }, this), this
        },
        transition: function(t, e) {
            return a(t, function(t, i) {
                this[i] = (t - this._saved[i]) * e + this._saved[i]
            }, this), this
        },
        tooltipPosition: function() {
            return {
                x: this.x,
                y: this.y
            }
        },
        hasValue: function() {
            return g(this.value)
        }
    }), i.Element.extend = f, i.Point = i.Element.extend({
        display: !0,
        inRange: function(t, e) {
            var i = this.hitDetectionRadius + this.radius;
            return Math.pow(t - this.x, 2) + Math.pow(e - this.y, 2) < Math.pow(i, 2)
        },
        draw: function() {
            if (this.display) {
                var t = this.ctx;
                t.beginPath(), t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI), t.closePath(), t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.fillStyle = this.fillColor, t.fill(), t.stroke()
            }
        }
    }), i.Arc = i.Element.extend({
        inRange: function(t, e) {
            var i = n.getAngleFromPoint(this, {
                x: t,
                y: e
            }), a = i.angle%(2 * Math.PI), o = (2 * Math.PI + this.startAngle)%(2 * Math.PI), s = (2 * Math.PI + this.endAngle)%(2 * Math.PI) || 360, r = o > s ? s >= a || a >= o: a >= o && s >= a, l = i.distance >= this.innerRadius && i.distance <= this.outerRadius;
            return r && l
        },
        tooltipPosition: function() {
            var t = this.startAngle + (this.endAngle - this.startAngle) / 2, e = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
            return {
                x: this.x + Math.cos(t) * e,
                y: this.y + Math.sin(t) * e
            }
        },
        draw: function(t) {
            var i = this.ctx;
            i.beginPath(), i.arc(this.x, this.y, this.outerRadius < 0 ? 0 : this.outerRadius, this.startAngle, this.endAngle), i.arc(this.x, this.y, this.innerRadius < 0 ? 0 : this.innerRadius, this.endAngle, this.startAngle, !0), i.closePath(), i.strokeStyle = this.strokeColor, i.lineWidth = this.strokeWidth, i.fillStyle = this.fillColor, i.fill(), i.lineJoin = "bevel", this.showStroke && i.stroke()
        }
    }), i.Rectangle = i.Element.extend({
        draw: function() {
            var t = this.ctx, e = this.width / 2, i = this.x - e, n = this.x + e, a = this.base - (this.base - this.y), o = this.strokeWidth / 2;
            this.showStroke && (i += o, n -= o, a += o), t.beginPath(), t.fillStyle = this.fillColor, t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.moveTo(i, this.base), t.lineTo(i, a), t.lineTo(n, a), t.lineTo(n, this.base), t.fill(), this.showStroke && t.stroke()
        },
        height: function() {
            return this.base - this.y
        },
        inRange: function(t, e) {
            return t >= this.x - this.width / 2 && t <= this.x + this.width / 2 && e >= this.y && e <= this.base
        }
    }), i.Animation = i.Element.extend({
        currentStep: null,
        numSteps: 60,
        easing: "",
        render: null,
        onAnimationProgress: null,
        onAnimationComplete: null
    }), i.Tooltip = i.Element.extend({
        draw: function() {
            var t = this.chart.ctx;
            t.font = q(this.fontSize, this.fontStyle, this.fontFamily), this.xAlign = "center", this.yAlign = "above";
            var e = this.caretPadding = 2, i = t.measureText(this.text).width + 2 * this.xPadding, n = this.fontSize + 2 * this.yPadding, a = n + this.caretHeight + e;
            this.x + i / 2 > this.chart.width ? this.xAlign = "left" : this.x - i / 2 < 0 && (this.xAlign = "right"), this.y - a < 0 && (this.yAlign = "below");
            var o = this.x - i / 2, s = this.y - a;
            if (t.fillStyle = this.fillColor, this.custom)
                this.custom(this);
            else {
                switch (this.yAlign) {
                case"above":
                    t.beginPath(), t.moveTo(this.x, this.y - e), t.lineTo(this.x + this.caretHeight, this.y - (e + this.caretHeight)), t.lineTo(this.x - this.caretHeight, this.y - (e + this.caretHeight)), t.closePath(), t.fill();
                    break;
                case"below":
                    s = this.y + e + this.caretHeight, t.beginPath(), t.moveTo(this.x, this.y + e), t.lineTo(this.x + this.caretHeight, this.y + e + this.caretHeight), t.lineTo(this.x - this.caretHeight, this.y + e + this.caretHeight), t.closePath(), t.fill()
                }
                switch (this.xAlign) {
                case"left":
                    o = this.x - i + (this.cornerRadius + this.caretHeight);
                    break;
                case"right":
                    o = this.x - (this.cornerRadius + this.caretHeight)
                }
                Y(t, o, s, i, n, this.cornerRadius), t.fill(), t.fillStyle = this.textColor, t.textAlign = "center", t.textBaseline = "middle", t.fillText(this.text, o + i / 2, s + n / 2)
            }
        }
    }), i.MultiTooltip = i.Element.extend({
        initialize: function() {
            this.font = q(this.fontSize, this.fontStyle, this.fontFamily), this.titleFont = q(this.titleFontSize, this.titleFontStyle, this.titleFontFamily), this.titleHeight = this.title ? 1.5 * this.titleFontSize : 0, this.height = this.labels.length * this.fontSize + (this.labels.length - 1) * (this.fontSize / 2) + 2 * this.yPadding + this.titleHeight, this.ctx.font = this.titleFont;
            var t = this.ctx.measureText(this.title).width, e = X(this.ctx, this.font, this.labels) + this.fontSize + 3, i = y([e, t]);
            this.width = i + 2 * this.xPadding;
            var n = this.height / 2;
            this.y - n < 0 ? this.y = n : this.y + n > this.chart.height && (this.y = this.chart.height - n), this.x > this.chart.width / 2 ? this.x -= this.xOffset + this.width : this.x += this.xOffset
        },
        getLineHeight: function(t) {
            var e = this.y - this.height / 2 + this.yPadding, i = t - 1;
            return 0 === t ? e + this.titleHeight / 3 : e + (1.5 * this.fontSize * i + this.fontSize / 2) + this.titleHeight
        },
        draw: function() {
            if (this.custom)
                this.custom(this);
            else {
                Y(this.ctx, this.x, this.y - this.height / 2, this.width, this.height, this.cornerRadius);
                var t = this.ctx;
                t.fillStyle = this.fillColor, t.fill(), t.closePath(), t.textAlign = "left", t.textBaseline = "middle", t.fillStyle = this.titleTextColor, t.font = this.titleFont, t.fillText(this.title, this.x + this.xPadding, this.getLineHeight(0)), t.font = this.font, n.each(this.labels, function(e, i) {
                    t.fillStyle = this.textColor, t.fillText(e, this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(i + 1)), t.fillStyle = this.legendColorBackground, t.fillRect(this.x + this.xPadding, this.getLineHeight(i + 1) - this.fontSize / 2, this.fontSize, this.fontSize), t.fillStyle = this.legendColors[i].fill, t.fillRect(this.x + this.xPadding, this.getLineHeight(i + 1) - this.fontSize / 2, this.fontSize, this.fontSize)
                }, this)
            }
        }
    }), i.Scale = i.Element.extend({
        initialize: function() {
            this.fit()
        },
        buildYLabels: function() {
            this.yLabels = [];
            for (var t = x(this.stepValue), e = 0; e <= this.steps; e++)
                this.yLabels.push(E(this.templateString, {
                    value: (this.min + e * this.stepValue).toFixed(t)
                }));
            this.yLabelWidth = this.display && this.showLabels ? X(this.ctx, this.font, this.yLabels) + 10 : 0
        },
        addXLabel: function(t) {
            this.xLabels.push(t), this.valuesCount++, this.fit()
        },
        removeXLabel: function() {
            this.xLabels.shift(), this.valuesCount--, this.fit()
        },
        fit: function() {
            this.startPoint = this.display ? this.fontSize : 0, this.endPoint = this.display ? this.height - 1.5 * this.fontSize - 5 : this.height, this.startPoint += this.padding, this.endPoint -= this.padding;
            var i, t = this.endPoint, e = this.endPoint - this.startPoint;
            for (this.calculateYRange(e), this.buildYLabels(), this.calculateXLabelRotation(); e > this.endPoint - this.startPoint;)
                e = this.endPoint - this.startPoint, i = this.yLabelWidth, this.calculateYRange(e), this.buildYLabels(), i < this.yLabelWidth && (this.endPoint = t, this.calculateXLabelRotation())
        },
        calculateXLabelRotation: function() {
            this.ctx.font = this.font;
            var i, n, t = this.ctx.measureText(this.xLabels[0]).width, e = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width;
            if (this.xScalePaddingRight = e / 2 + 3, this.xScalePaddingLeft = t / 2 > this.yLabelWidth ? t / 2 : this.yLabelWidth, this.xLabelRotation = 0, this.display) {
                var o, a = X(this.ctx, this.font, this.xLabels);
                this.xLabelWidth = a;
                for (var r = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6; this.xLabelWidth > r && 0 === this.xLabelRotation || this.xLabelWidth > r && this.xLabelRotation <= 90 && this.xLabelRotation > 0;)
                    o = Math.cos(C(this.xLabelRotation)), i = o * t, n = o * e, i + this.fontSize / 2 > this.yLabelWidth && (this.xScalePaddingLeft = i + this.fontSize / 2), this.xScalePaddingRight = this.fontSize / 2, this.xLabelRotation++, this.xLabelWidth = o * a;
                this.xLabelRotation > 0 && (this.endPoint -= Math.sin(C(this.xLabelRotation)) * a + 3)
            } else
                this.xLabelWidth = 0, this.xScalePaddingRight = this.padding, this.xScalePaddingLeft = this.padding
        },
        calculateYRange: d,
        drawingArea: function() {
            return this.startPoint - this.endPoint
        },
        calculateY: function(t) {
            var e = this.drawingArea() / (this.min - this.max);
            return this.endPoint - e * (t - this.min)
        },
        calculateX: function(t) {
            var i = (this.xLabelRotation > 0, this.width - (this.xScalePaddingLeft + this.xScalePaddingRight)), n = i / Math.max(this.valuesCount - (this.offsetGridLines ? 0 : 1), 1), a = n * t + this.xScalePaddingLeft;
            return this.offsetGridLines && (a += n / 2), Math.round(a)
        },
        update: function(t) {
            n.extend(this, t), this.fit()
        },
        draw: function() {
            var t = this.ctx, e = (this.endPoint - this.startPoint) / this.steps, i = Math.round(this.xScalePaddingLeft);
            this.display && (t.fillStyle = this.textColor, t.font = this.font, a(this.yLabels, function(a, o) {
                var s = this.endPoint - e * o, r = Math.round(s), l = this.showHorizontalLines;
                t.textAlign = "right", t.textBaseline = "middle", this.showLabels && t.fillText(a, i - 10, s), 0 !== o || l || (l=!0), l && t.beginPath(), o > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), r += n.aliasPixel(t.lineWidth), l && (t.moveTo(i, r), t.lineTo(this.width, r), t.stroke(), t.closePath()), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(i - 5, r), t.lineTo(i, r), t.stroke(), t.closePath()
            }, this), a(this.xLabels, function(e, i) {
                var n = this.calculateX(i) + k(this.lineWidth), a = this.calculateX(i - (this.offsetGridLines ? .5 : 0)) + k(this.lineWidth), o = this.xLabelRotation > 0, s = this.showVerticalLines;
                0 !== i || s || (s=!0), s && t.beginPath(), i > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), s && (t.moveTo(a, this.endPoint), t.lineTo(a, this.startPoint - 3), t.stroke(), t.closePath()), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(a, this.endPoint), t.lineTo(a, this.endPoint + 5),
                t.stroke(), t.closePath(), t.save(), t.translate(n, o ? this.endPoint + 12 : this.endPoint + 8), t.rotate( - 1 * C(this.xLabelRotation)), t.font = this.font, t.textAlign = o ? "right" : "center", t.textBaseline = o ? "middle" : "top", t.fillText(e, 0, 0), t.restore()
            }, this))
        }
    }), i.RadialScale = i.Element.extend({
        initialize: function() {
            this.size = b([this.height, this.width]), this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2
        },
        calculateCenterOffset: function(t) {
            var e = this.drawingArea / (this.max - this.min);
            return (t - this.min) * e
        },
        update: function() {
            this.lineArc ? this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2 : this.setScaleSize(), this.buildYLabels()
        },
        buildYLabels: function() {
            this.yLabels = [];
            for (var t = x(this.stepValue), e = 0; e <= this.steps; e++)
                this.yLabels.push(E(this.templateString, {
                    value: (this.min + e * this.stepValue).toFixed(t)
                }))
        },
        getCircumference: function() {
            return 2 * Math.PI / this.valuesCount
        },
        setScaleSize: function() {
            var e, i, n, a, s, r, c, u, h, f, d, p, t = b([this.height / 2 - this.pointLabelFontSize - 5, this.width / 2]), o = this.width, l = 0;
            for (this.ctx.font = q(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), i = 0; i < this.valuesCount; i++)
                e = this.getPointPosition(i, t), n = this.ctx.measureText(E(this.templateString, {
                    value: this.labels[i]
                })).width + 5, 0 === i || i === this.valuesCount / 2 ? (a = n / 2, e.x + a > o && (o = e.x + a, s = i), e.x - a < l && (l = e.x - a, c = i)) : i < this.valuesCount / 2 ? e.x + n > o && (o = e.x + n, s = i) : i > this.valuesCount / 2 && e.x - n < l && (l = e.x - n, c = i);
            h = l, f = Math.ceil(o - this.width), r = this.getIndexAngle(s), u = this.getIndexAngle(c), d = f / Math.sin(r + Math.PI / 2), p = h / Math.sin(u + Math.PI / 2), d = g(d) ? d : 0, p = g(p) ? p : 0, this.drawingArea = t - (p + d) / 2, this.setCenterPoint(p, d)
        },
        setCenterPoint: function(t, e) {
            var i = this.width - e - this.drawingArea, n = t + this.drawingArea;
            this.xCenter = (n + i) / 2, this.yCenter = this.height / 2
        },
        getIndexAngle: function(t) {
            var e = 2 * Math.PI / this.valuesCount;
            return t * e - Math.PI / 2
        },
        getPointPosition: function(t, e) {
            var i = this.getIndexAngle(t);
            return {
                x: Math.cos(i) * e + this.xCenter,
                y: Math.sin(i) * e + this.yCenter
            }
        },
        draw: function() {
            if (this.display) {
                var t = this.ctx;
                if (a(this.yLabels, function(e, i) {
                    if (i > 0) {
                        var o, n = i * (this.drawingArea / this.steps), a = this.yCenter - n;
                        if (this.lineWidth > 0)
                            if (t.strokeStyle = this.lineColor, t.lineWidth = this.lineWidth, this.lineArc)
                                t.beginPath(), t.arc(this.xCenter, this.yCenter, n, 0, 2 * Math.PI), t.closePath(), t.stroke();
                            else {
                                t.beginPath();
                                for (var s = 0; s < this.valuesCount; s++)
                                    o = this.getPointPosition(s, this.calculateCenterOffset(this.min + i * this.stepValue)), 0 === s ? t.moveTo(o.x, o.y) : t.lineTo(o.x, o.y);
                                    t.closePath(), t.stroke()
                                }
                        if (this.showLabels) {
                            if (t.font = q(this.fontSize, this.fontStyle, this.fontFamily), this.showLabelBackdrop) {
                                var r = t.measureText(e).width;
                                t.fillStyle = this.backdropColor, t.fillRect(this.xCenter - r / 2 - this.backdropPaddingX, a - this.fontSize / 2 - this.backdropPaddingY, r + 2 * this.backdropPaddingX, this.fontSize + 2 * this.backdropPaddingY)
                            }
                            t.textAlign = "center", t.textBaseline = "middle", t.fillStyle = this.fontColor, t.fillText(e, this.xCenter, a)
                        }
                    }
                }, this), !this.lineArc) {
                    t.lineWidth = this.angleLineWidth, t.strokeStyle = this.angleLineColor;
                    for (var e = this.valuesCount - 1; e >= 0; e--) {
                        var i = null, n = null;
                        if (this.angleLineWidth > 0 && (i = this.calculateCenterOffset(this.max), n = this.getPointPosition(e, i), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(n.x, n.y), t.stroke(), t.closePath()), this.backgroundColors && this.backgroundColors.length == this.valuesCount) {
                            null == i && (i = this.calculateCenterOffset(this.max)), null == n && (n = this.getPointPosition(e, i));
                            var o = this.getPointPosition(0 === e ? this.valuesCount - 1 : e - 1, i), s = this.getPointPosition(e === this.valuesCount - 1 ? 0 : e + 1, i), r = {
                                x: (o.x + n.x) / 2,
                                y: (o.y + n.y) / 2
                            }, l = {
                                x: (n.x + s.x) / 2,
                                y: (n.y + s.y) / 2
                            };
                            t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(r.x, r.y), t.lineTo(n.x, n.y), t.lineTo(l.x, l.y), t.fillStyle = this.backgroundColors[e], t.fill(), t.closePath()
                        }
                        var c = this.getPointPosition(e, this.calculateCenterOffset(this.max) + 5);
                        t.font = q(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), t.fillStyle = this.pointLabelFontColor;
                        var u = this.labels.length, h = this.labels.length / 2, f = h / 2, d = f > e || e > u - f, p = e === f || e === u - f;
                        0 === e ? t.textAlign = "center" : e === h ? t.textAlign = "center" : h > e ? t.textAlign = "left" : t.textAlign = "right", p ? t.textBaseline = "middle" : d ? t.textBaseline = "bottom" : t.textBaseline = "top", t.fillText(this.labels[e], c.x, c.y)
                    }
                }
            }
        }
    }), i.animationService = {
        frameDuration: 17,
        animations: [],
        dropFrames: 0,
        addAnimation: function(t, e) {
            for (var i = 0; i < this.animations.length; ++i)
                if (this.animations[i].chartInstance === t)
                    return void(this.animations[i].animationObject = e);
            this.animations.push({
                chartInstance: t,
                animationObject: e
            }), 1 == this.animations.length && n.requestAnimFrame.call(window, this.digestWrapper)
        },
        cancelAnimation: function(t) {
            var e = n.findNextWhere(this.animations, function(e) {
                return e.chartInstance === t
            });
            e && this.animations.splice(e, 1)
        },
        digestWrapper: function() {
            i.animationService.startDigest.call(i.animationService)
        },
        startDigest: function() {
            var t = Date.now(), e = 0;
            this.dropFrames > 1 && (e = Math.floor(this.dropFrames), this.dropFrames -= e);
            for (var i = 0; i < this.animations.length; i++)
                null === this.animations[i].animationObject.currentStep && (this.animations[i].animationObject.currentStep = 0), this.animations[i].animationObject.currentStep += 1 + e, this.animations[i].animationObject.currentStep > this.animations[i].animationObject.numSteps && (this.animations[i].animationObject.currentStep = this.animations[i].animationObject.numSteps), this.animations[i].animationObject.render(this.animations[i].chartInstance, this.animations[i].animationObject), this.animations[i].animationObject.currentStep == this.animations[i].animationObject.numSteps && (this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance), this.animations.splice(i, 1), i--);
            var a = Date.now(), o = a - t - this.frameDuration, s = o / this.frameDuration;
            s > 1 && (this.dropFrames += s), this.animations.length > 0 && n.requestAnimFrame.call(window, this.digestWrapper)
        }
    }, n.addEvent(window, "resize", function() {
        var t;
        return function() {
            clearTimeout(t), t = setTimeout(function() {
                a(i.instances, function(t) {
                    t.options.responsive && t.resize(t.render, !0)
                })
            }, 50)
        }
    }()), v ? define(function() {
        return i
    }) : "object" == typeof module && module.exports && (module.exports = i), t.Chart = i, i.noConflict = function() {
        return t.Chart = e, i
    }
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers, n = {
        scaleBeginAtZero: !0,
        scaleShowGridLines: !0,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !0,
        barShowStroke: !0,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'
    };
    e.Type.extend({
        name: "Bar",
        defaults: n,
        initialize: function(t) {
            var n = this.options;
            this.ScaleClass = e.Scale.extend({
                offsetGridLines: !0,
                calculateBarX: function(t, e, i) {
                    var a = this.calculateBaseWidth(), o = this.calculateX(i) - a / 2, s = this.calculateBarWidth(t);
                    return o + s * e + e * n.barDatasetSpacing + s / 2
                },
                calculateBaseWidth: function() {
                    return this.calculateX(1) - this.calculateX(0) - 2 * n.barValueSpacing
                },
                calculateBarWidth: function(t) {
                    var e = this.calculateBaseWidth() - (t - 1) * n.barDatasetSpacing;
                    return e / t
                }
            }), this.datasets = [], this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getBarsAtEvent(t): [];
                this.eachBars(function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                }), this.showTooltip(e)
            }), this.BarClass = e.Rectangle.extend({
                strokeWidth: this.options.barStrokeWidth,
                showStroke: this.options.barShowStroke,
                ctx: this.chart.ctx
            }), i.each(t.datasets, function(e, n) {
                var a = {
                    label: e.label || null,
                    fillColor: e.fillColor,
                    strokeColor: e.strokeColor,
                    bars: []
                };
                this.datasets.push(a), i.each(e.data, function(i, n) {
                    a.bars.push(new this.BarClass({
                        value: i,
                        label: t.labels[n],
                        datasetLabel: e.label,
                        strokeColor: e.strokeColor,
                        fillColor: e.fillColor,
                        highlightFill: e.highlightFill || e.fillColor,
                        highlightStroke: e.highlightStroke || e.strokeColor
                    }))
                }, this)
            }, this), this.buildScale(t.labels), this.BarClass.prototype.base = this.scale.endPoint, this.eachBars(function(t, e, n) {
                i.extend(t, {
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    x: this.scale.calculateBarX(this.datasets.length, n, e),
                    y: this.scale.endPoint
                }), t.save()
            }, this), this.render()
        },
        update: function() {
            this.scale.update(), i.each(this.activeElements, function(t) {
                t.restore(["fillColor", "strokeColor"])
            }), this.eachBars(function(t) {
                t.save()
            }), this.render()
        },
        eachBars: function(t) {
            i.each(this.datasets, function(e, n) {
                i.each(e.bars, t, this, n)
            }, this)
        },
        getBarsAtEvent: function(t) {
            for (var o, e = [], n = i.getRelativePosition(t), a = function(t) {
                e.push(t.bars[o])
            }, s = 0; s < this.datasets.length; s++)
                for (o = 0; o < this.datasets[s].bars.length; o++)
                    if (this.datasets[s].bars[o].inRange(n.x, n.y))
                        return i.each(this.datasets, a), e;
            return e
        },
        buildScale: function(t) {
            var e = this, n = function() {
                var t = [];
                return e.eachBars(function(e) {
                    t.push(e.value)
                }), t
            }, a = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: t.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function(t) {
                    var e = i.calculateScaleRange(n(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                    i.extend(this, e)
                },
                xLabels: t,
                font: i.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                showHorizontalLines: this.options.scaleShowHorizontalLines,
                showVerticalLines: this.options.scaleShowVerticalLines,
                gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth: 0,
                gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor: "rgba(0,0,0,0)",
                padding: this.options.showScale ? 0: this.options.barShowStroke ? this.options.barStrokeWidth: 0,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            this.options.scaleOverride && i.extend(a, {
                calculateYRange: i.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }), this.scale = new this.ScaleClass(a)
        },
        addData: function(t, e) {
            i.each(t, function(t, i) {
                this.datasets[i].bars.push(new this.BarClass({
                    value: t,
                    label: e,
                    datasetLabel: this.datasets[i].label,
                    x: this.scale.calculateBarX(this.datasets.length, i, this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    base: this.scale.endPoint,
                    strokeColor: this.datasets[i].strokeColor,
                    fillColor: this.datasets[i].fillColor
                }))
            }, this), this.scale.addXLabel(e), this.update()
        },
        removeData: function() {
            this.scale.removeXLabel(), i.each(this.datasets, function(t) {
                t.bars.shift()
            }, this), this.update()
        },
        reflow: function() {
            i.extend(this.BarClass.prototype, {
                y: this.scale.endPoint,
                base: this.scale.endPoint
            });
            var t = i.extend({
                height: this.chart.height,
                width: this.chart.width
            });
            this.scale.update(t)
        },
        draw: function(t) {
            var e = t || 1;
            this.clear();
            this.chart.ctx;
            this.scale.draw(e), i.each(this.datasets, function(t, n) {
                i.each(t.bars, function(t, i) {
                    t.hasValue() && (t.base = this.scale.endPoint, t.transition({
                        x: this.scale.calculateBarX(this.datasets.length, n, i),
                        y: this.scale.calculateY(t.value),
                        width: this.scale.calculateBarWidth(this.datasets.length)
                    }, e).draw())
                }, this)
            }, this)
        }
    })
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers, n = {
        segmentShowStroke: !0,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 50,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: !0,
        animateScale: !1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'
    };
    e.Type.extend({
        name: "Doughnut",
        defaults: n,
        initialize: function(t) {
            this.segments = [], this.outerRadius = (i.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, this.SegmentArc = e.Arc.extend({
                ctx: this.chart.ctx,
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t): [];
                i.each(this.segments, function(t) {
                    t.restore(["fillColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightColor
                }), this.showTooltip(e)
            }), this.calculateTotal(t), i.each(t, function(e, i) {
                e.color || (e.color = "hsl(" + 360 * i / t.length + ", 100%, 50%)"), this.addData(e, i, !0)
            }, this), this.render()
        },
        getSegmentsAtEvent: function(t) {
            var e = [], n = i.getRelativePosition(t);
            return i.each(this.segments, function(t) {
                t.inRange(n.x, n.y) && e.push(t)
            }, this), e
        },
        addData: function(t, i, n) {
            var a = void 0 !== i ? i : this.segments.length;
            "undefined" == typeof t.color && (t.color = e.defaults.global.segmentColorDefault[a%e.defaults.global.segmentColorDefault.length], t.highlight = e.defaults.global.segmentHighlightColorDefaults[a%e.defaults.global.segmentHighlightColorDefaults.length]), this.segments.splice(a, 0, new this.SegmentArc({
                value: t.value,
                outerRadius: this.options.animateScale ? 0: this.outerRadius,
                innerRadius: this.options.animateScale ? 0: this.outerRadius / 100 * this.options.percentageInnerCutout,
                fillColor: t.color,
                highlightColor: t.highlight || t.color,
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                startAngle: 1.5 * Math.PI,
                circumference: this.options.animateRotate ? 0: this.calculateCircumference(t.value),
                label: t.label
            })), n || (this.reflow(), this.update())
        },
        calculateCircumference: function(t) {
            return this.total > 0 ? 2 * Math.PI * (t / this.total) : 0
        },
        calculateTotal: function(t) {
            this.total = 0, i.each(t, function(t) {
                this.total += Math.abs(t.value)
            }, this)
        },
        update: function() {
            this.calculateTotal(this.segments), i.each(this.activeElements, function(t) {
                t.restore(["fillColor"])
            }), i.each(this.segments, function(t) {
                t.save()
            }), this.render()
        },
        removeData: function(t) {
            var e = i.isNumber(t) ? t: this.segments.length - 1;
            this.segments.splice(e, 1), this.reflow(), this.update()
        },
        reflow: function() {
            i.extend(this.SegmentArc.prototype, {
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.outerRadius = (i.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, i.each(this.segments, function(t) {
                t.update({
                    outerRadius: this.outerRadius,
                    innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                })
            }, this)
        },
        draw: function(t) {
            var e = t ? t: 1;
            this.clear(), i.each(this.segments, function(t, i) {
                t.transition({
                    circumference: this.calculateCircumference(t.value),
                    outerRadius: this.outerRadius,
                    innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                }, e), t.endAngle = t.startAngle + t.circumference, t.draw(), 0 === i && (t.startAngle = 1.5 * Math.PI), i < this.segments.length - 1 && (this.segments[i + 1].startAngle = t.endAngle)
            }, this)
        }
    }), e.types.Doughnut.extend({
        name: "Pie",
        defaults: i.merge(n, {
            percentageInnerCutout: 0
        })
    })
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers, n = {
        scaleShowGridLines: !0,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !0,
        bezierCurve: !0,
        bezierCurveTension: .4,
        pointDot: !0,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: !0,
        datasetStrokeWidth: 2,
        datasetFill: !0,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>',
        offsetGridLines: !1
    };
    e.Type.extend({
        name: "Line",
        defaults: n,
        initialize: function(t) {
            this.PointClass = e.Point.extend({
                offsetGridLines: this.options.offsetGridLines,
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx,
                inRange: function(t) {
                    return Math.pow(t - this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2)
                }
            }), this.datasets = [], this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getPointsAtEvent(t): [];
                this.eachPoints(function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                }), this.showTooltip(e)
            }), i.each(t.datasets, function(e) {
                var n = {
                    label: e.label || null,
                    fillColor: e.fillColor,
                    strokeColor: e.strokeColor,
                    pointColor: e.pointColor,
                    pointStrokeColor: e.pointStrokeColor,
                    points: []
                };
                this.datasets.push(n), i.each(e.data, function(i, a) {
                    n.points.push(new this.PointClass({
                        value: i,
                        label: t.labels[a],
                        datasetLabel: e.label,
                        strokeColor: e.pointStrokeColor,
                        fillColor: e.pointColor,
                        highlightFill: e.pointHighlightFill || e.pointColor,
                        highlightStroke: e.pointHighlightStroke || e.pointStrokeColor
                    }))
                }, this), this.buildScale(t.labels), this.eachPoints(function(t, e) {
                    i.extend(t, {
                        x: this.scale.calculateX(e),
                        y: this.scale.endPoint
                    }), t.save()
                }, this)
            }, this), this.render()
        },
        update: function() {
            this.scale.update(), i.each(this.activeElements, function(t) {
                t.restore(["fillColor", "strokeColor"])
            }), this.eachPoints(function(t) {
                t.save()
            }), this.render()
        },
        eachPoints: function(t) {
            i.each(this.datasets, function(e) {
                i.each(e.points, t, this)
            }, this)
        },
        getPointsAtEvent: function(t) {
            var e = [], n = i.getRelativePosition(t);
            return i.each(this.datasets, function(t) {
                i.each(t.points, function(t) {
                    t.inRange(n.x, n.y) && e.push(t)
                })
            }, this), e
        },
        buildScale: function(t) {
            var n = this, a = function() {
                var t = [];
                return n.eachPoints(function(e) {
                    t.push(e.value)
                }), t
            }, o = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                offsetGridLines: this.options.offsetGridLines,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: t.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function(t) {
                    var e = i.calculateScaleRange(a(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                    i.extend(this, e)
                },
                xLabels: t,
                font: i.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                showHorizontalLines: this.options.scaleShowHorizontalLines,
                showVerticalLines: this.options.scaleShowVerticalLines,
                gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth: 0,
                gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor: "rgba(0,0,0,0)",
                padding: this.options.showScale ? 0: this.options.pointDotRadius + this.options.pointDotStrokeWidth,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            this.options.scaleOverride && i.extend(o, {
                calculateYRange: i.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }), this.scale = new e.Scale(o)
        },
        addData: function(t, e) {
            i.each(t, function(t, i) {
                this.datasets[i].points.push(new this.PointClass({
                    value: t,
                    label: e,
                    datasetLabel: this.datasets[i].label,
                    x: this.scale.calculateX(this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    strokeColor: this.datasets[i].pointStrokeColor,
                    fillColor: this.datasets[i].pointColor
                }))
            }, this), this.scale.addXLabel(e), this.update()
        },
        removeData: function() {
            this.scale.removeXLabel(), i.each(this.datasets, function(t) {
                t.points.shift()
            }, this), this.update()
        },
        reflow: function() {
            var t = i.extend({
                height: this.chart.height,
                width: this.chart.width
            });
            this.scale.update(t)
        },
        draw: function(t) {
            var e = t || 1;
            this.clear();
            var n = this.chart.ctx, a = function(t) {
                return null !== t.value
            }, o = function(t, e, n) {
                return i.findNextWhere(e, a, n) || t
            }, s = function(t, e, n) {
                return i.findPreviousWhere(e, a, n) || t
            };
            this.scale && (this.scale.draw(e), i.each(this.datasets, function(t) {
                var r = i.where(t.points, a);
                i.each(t.points, function(t, i) {
                    t.hasValue() && t.transition({
                        y: this.scale.calculateY(t.value),
                        x: this.scale.calculateX(i)
                    }, e)
                }, this), this.options.bezierCurve && i.each(r, function(t, e) {
                    var n = e > 0 && e < r.length - 1 ? this.options.bezierCurveTension: 0;
                    t.controlPoints = i.splineCurve(s(t, r, e), t, o(t, r, e), n), t.controlPoints.outer.y > this.scale.endPoint ? t.controlPoints.outer.y = this.scale.endPoint : t.controlPoints.outer.y < this.scale.startPoint && (t.controlPoints.outer.y = this.scale.startPoint), t.controlPoints.inner.y > this.scale.endPoint ? t.controlPoints.inner.y = this.scale.endPoint : t.controlPoints.inner.y < this.scale.startPoint && (t.controlPoints.inner.y = this.scale.startPoint)
                }, this), n.lineWidth = this.options.datasetStrokeWidth, n.strokeStyle = t.strokeColor, n.beginPath(), i.each(r, function(t, e) {
                    if (0 === e)
                        n.moveTo(t.x, t.y);
                    else if (this.options.bezierCurve) {
                        var i = s(t, r, e);
                        n.bezierCurveTo(i.controlPoints.outer.x, i.controlPoints.outer.y, t.controlPoints.inner.x, t.controlPoints.inner.y, t.x, t.y)
                    } else
                        n.lineTo(t.x, t.y)
                }, this), this.options.datasetStroke && n.stroke(), this.options.datasetFill && r.length > 0 && (n.lineTo(r[r.length - 1].x, this.scale.endPoint), n.lineTo(r[0].x, this.scale.endPoint), n.fillStyle = t.fillColor, n.closePath(), n.fill()), i.each(r, function(t) {
                    t.draw()
                })
            }, this))
        }
    })
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers, n = {
        scaleShowLabelBackdrop: !0,
        scaleBackdropColor: "rgba(255,255,255,0.75)",
        scaleBeginAtZero: !0,
        scaleBackdropPaddingY: 2,
        scaleBackdropPaddingX: 2,
        scaleShowLine: !0,
        segmentShowStroke: !0,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: !0,
        animateScale: !1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'
    };
    e.Type.extend({
        name: "PolarArea",
        defaults: n,
        initialize: function(t) {
            this.segments = [], this.SegmentArc = e.Arc.extend({
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                ctx: this.chart.ctx,
                innerRadius: 0,
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.scale = new e.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth: 0,
                lineColor: this.options.scaleLineColor,
                lineArc: !0,
                width: this.chart.width,
                height: this.chart.height,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                valuesCount: t.length
            }), this.updateScaleRange(t), this.scale.update(), i.each(t, function(t, e) {
                this.addData(t, e, !0)
            }, this), this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t): [];
                i.each(this.segments, function(t) {
                    t.restore(["fillColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightColor
                }), this.showTooltip(e)
            }), this.render()
        },
        getSegmentsAtEvent: function(t) {
            var e = [], n = i.getRelativePosition(t);
            return i.each(this.segments, function(t) {
                t.inRange(n.x, n.y) && e.push(t)
            }, this), e
        },
        addData: function(t, e, i) {
            var n = e || this.segments.length;
            this.segments.splice(n, 0, new this.SegmentArc({
                fillColor: t.color,
                highlightColor: t.highlight || t.color,
                label: t.label,
                value: t.value,
                outerRadius: this.options.animateScale ? 0: this.scale.calculateCenterOffset(t.value),
                circumference: this.options.animateRotate ? 0: this.scale.getCircumference(),
                startAngle: 1.5 * Math.PI
            })), i || (this.reflow(), this.update())
        },
        removeData: function(t) {
            var e = i.isNumber(t) ? t: this.segments.length - 1;
            this.segments.splice(e, 1), this.reflow(), this.update()
        },
        calculateTotal: function(t) {
            this.total = 0, i.each(t, function(t) {
                this.total += t.value
            }, this), this.scale.valuesCount = this.segments.length
        },
        updateScaleRange: function(t) {
            var e = [];
            i.each(t, function(t) {
                e.push(t.value)
            });
            var n = this.options.scaleOverride ? {
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }
            : i.calculateScaleRange(e, i.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            i.extend(this.scale, n, {
                size: i.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            })
        },
        update: function() {
            this.calculateTotal(this.segments), i.each(this.segments, function(t) {
                t.save()
            }), this.reflow(), this.render()
        },
        reflow: function() {
            i.extend(this.SegmentArc.prototype, {
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.updateScaleRange(this.segments), this.scale.update(), i.extend(this.scale, {
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            }), i.each(this.segments, function(t) {
                t.update({
                    outerRadius: this.scale.calculateCenterOffset(t.value)
                })
            }, this)
        },
        draw: function(t) {
            var e = t || 1;
            this.clear(), i.each(this.segments, function(t, i) {
                t.transition({
                    circumference: this.scale.getCircumference(),
                    outerRadius: this.scale.calculateCenterOffset(t.value)
                }, e), t.endAngle = t.startAngle + t.circumference, 0 === i && (t.startAngle = 1.5 * Math.PI), i < this.segments.length - 1 && (this.segments[i + 1].startAngle = t.endAngle), t.draw()
            }, this), this.scale.draw()
        }
    })
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers;
    e.Type.extend({
        name: "Radar",
        defaults: {
            scaleShowLine: !0,
            angleShowLineOut: !0,
            scaleShowLabels: !1,
            scaleBeginAtZero: !0,
            angleLineColor: "rgba(0,0,0,.1)",
            angleLineWidth: 1,
            pointLabelFontFamily: "'Arial'",
            pointLabelFontStyle: "normal",
            pointLabelFontSize: 10,
            pointLabelFontColor: "#666",
            pointDot: !0,
            pointDotRadius: 3,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: !0,
            datasetStrokeWidth: 2,
            datasetFill: !0,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'
        },
        initialize: function(t) {
            this.PointClass = e.Point.extend({
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx
            }), this.datasets = [], this.buildScale(t), this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getPointsAtEvent(t): [];
                this.eachPoints(function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                }), this.showTooltip(e)
            }), i.each(t.datasets, function(e) {
                var n = {
                    label: e.label || null,
                    fillColor: e.fillColor,
                    strokeColor: e.strokeColor,
                    pointColor: e.pointColor,
                    pointStrokeColor: e.pointStrokeColor,
                    points: []
                };
                this.datasets.push(n), i.each(e.data, function(i, a) {
                    var o;
                    this.scale.animation || (o = this.scale.getPointPosition(a, this.scale.calculateCenterOffset(i))), n.points.push(new this.PointClass({
                        value: i,
                        label: t.labels[a],
                        datasetLabel: e.label,
                        x: this.options.animation ? this.scale.xCenter: o.x,
                        y: this.options.animation ? this.scale.yCenter: o.y,
                        strokeColor: e.pointStrokeColor,
                        fillColor: e.pointColor,
                        highlightFill: e.pointHighlightFill || e.pointColor,
                        highlightStroke: e.pointHighlightStroke || e.pointStrokeColor
                    }))
                }, this)
            }, this), this.render()
        },
        eachPoints: function(t) {
            i.each(this.datasets, function(e) {
                i.each(e.points, t, this)
            }, this)
        },
        getPointsAtEvent: function(t) {
            var e = i.getRelativePosition(t), n = i.getAngleFromPoint({
                x: this.scale.xCenter,
                y: this.scale.yCenter
            }, e), a = 2 * Math.PI / this.scale.valuesCount, o = Math.round((n.angle - 1.5 * Math.PI) / a), s = [];
            return (o >= this.scale.valuesCount || 0 > o) && (o = 0), n.distance <= this.scale.drawingArea && i.each(this.datasets, function(t) {
                s.push(t.points[o])
            }), s
        },
        buildScale: function(t) {
            this.scale = new e.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backgroundColors: this.options.scaleBackgroundColors,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth: 0,
                lineColor: this.options.scaleLineColor,
                angleLineColor: this.options.angleLineColor,
                angleLineWidth: this.options.angleShowLineOut ? this.options.angleLineWidth: 0,
                pointLabelFontColor: this.options.pointLabelFontColor,
                pointLabelFontSize: this.options.pointLabelFontSize,
                pointLabelFontFamily: this.options.pointLabelFontFamily,
                pointLabelFontStyle: this.options.pointLabelFontStyle,
                height: this.chart.height,
                width: this.chart.width,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                labels: t.labels,
                valuesCount: t.datasets[0].data.length
            }), this.scale.setScaleSize(), this.updateScaleRange(t.datasets), this.scale.buildYLabels()
        },
        updateScaleRange: function(t) {
            var e = function() {
                var e = [];
                return i.each(t, function(t) {
                    t.data ? e = e.concat(t.data) : i.each(t.points, function(t) {
                        e.push(t.value)
                    })
                }), e
            }(), n = this.options.scaleOverride ? {
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }
            : i.calculateScaleRange(e, i.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            i.extend(this.scale, n)
        },
        addData: function(t, e) {
            this.scale.valuesCount++, i.each(t, function(t, i) {
                var n = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(t));
                this.datasets[i].points.push(new this.PointClass({
                    value: t,
                    label: e,
                    datasetLabel: this.datasets[i].label,
                    x: n.x,
                    y: n.y,
                    strokeColor: this.datasets[i].pointStrokeColor,
                    fillColor: this.datasets[i].pointColor
                }))
            }, this), this.scale.labels.push(e), this.reflow(), this.update()
        },
        removeData: function() {
            this.scale.valuesCount--, this.scale.labels.shift(), i.each(this.datasets, function(t) {
                t.points.shift()
            }, this), this.reflow(), this.update()
        },
        update: function() {
            this.eachPoints(function(t) {
                t.save()
            }), this.reflow(), this.render()
        },
        reflow: function() {
            i.extend(this.scale, {
                width: this.chart.width,
                height: this.chart.height,
                size: i.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            }), this.updateScaleRange(this.datasets), this.scale.setScaleSize(), this.scale.buildYLabels()
        },
        draw: function(t) {
            var e = t || 1, n = this.chart.ctx;
            this.clear(), this.scale.draw(), i.each(this.datasets, function(t) {
                i.each(t.points, function(t, i) {
                    t.hasValue() && t.transition(this.scale.getPointPosition(i, this.scale.calculateCenterOffset(t.value)), e)
                }, this), n.lineWidth = this.options.datasetStrokeWidth, n.strokeStyle = t.strokeColor, n.beginPath(), i.each(t.points, function(t, e) {
                    0 === e ? n.moveTo(t.x, t.y) : n.lineTo(t.x, t.y)
                }, this), n.closePath(), n.stroke(), n.fillStyle = t.fillColor, this.options.datasetFill && n.fill(), i.each(t.points, function(t) {
                    t.hasValue() && t.draw()
                })
            }, this)
        }
    })
}.call(this), $(document).ready(function() {
    scaleVideoContainer(), initBannerVideoSize(".video-container .poster img"), initBannerVideoSize(".video-container .filter"), initBannerVideoSize(".video-container video"), $(window).on("resize", function() {
        scaleVideoContainer(), scaleBannerVideoSize(".video-container .poster img"), scaleBannerVideoSize(".video-container .filter"), scaleBannerVideoSize(".video-container video")
    })
}), function() {
    var t, e, i, n, a, o = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }, s = [].indexOf || function(t) {
        for (var e = 0, i = this.length; i > e; e++)
            if (e in this && this[e] === t)
                return e;
        return - 1
    };
    e = function() {
        function t() {}
        return t.prototype.extend = function(t, e) {
            var i, n;
            for (i in e)
                n = e[i], null == t[i] && (t[i] = n);
            return t
        }, t.prototype.isMobile = function(t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.createEvent = function(t, e, i, n) {
            var a;
            return null == e && (e=!1), null == i && (i=!1), null == n && (n = null), null != document.createEvent ? (a = document.createEvent("CustomEvent"), a.initCustomEvent(t, e, i, n)) : null != document.createEventObject ? (a = document.createEventObject(), a.eventType = t) : a.eventName = t, a
        }, t.prototype.emitEvent = function(t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }, t.prototype.addEvent = function(t, e, i) {
            return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
        }, t.prototype.removeEvent = function(t, e, i) {
            return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
        }, t.prototype.innerHeight = function() {
            return "innerHeight"in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), i = this.WeakMap || this.MozWeakMap || (i = function() {
        function t() {
            this.keys = [], this.values = []
        }
        return t.prototype.get = function(t) {
            var e, i, n, a, o;
            for (o = this.keys, e = n = 0, a = o.length; a > n; e=++n)
                if (i = o[e], i === t)
                    return this.values[e]
        }, t.prototype.set = function(t, e) {
            var i, n, a, o, s;
            for (s = this.keys, i = a = 0, o = s.length; o > a; i=++a)
                if (n = s[i], n === t)
                    return void(this.values[i] = e);
            return this.keys.push(t), this.values.push(e)
        }, t
    }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function() {
        function t() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return t.notSupported=!0, t.prototype.observe = function() {}, t
    }()), n = this.getComputedStyle || function(t, e) {
        return this.getPropertyValue = function(e) {
            var i;
            return "float" === e && (e = "styleFloat"), a.test(e) && e.replace(a, function(t, e) {
                return e.toUpperCase()
            }), (null != (i = t.currentStyle) ? i[e] : void 0) || null
        }, this
    }, a = /(\-([a-z]){1})/g, this.WOW = function() {
        function a(t) {
            null == t && (t = {}), this.scrollCallback = o(this.scrollCallback, this), this.scrollHandler = o(this.scrollHandler, this), this.resetAnimation = o(this.resetAnimation, this), this.start = o(this.start, this), this.scrolled=!0, this.config = this.util().extend(t, this.defaults), null != t.scrollContainer && (this.config.scrollContainer = document.querySelector(t.scrollContainer)), this.animationNameCache = new i, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return a.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, a.prototype.init = function() {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, a.prototype.start = function() {
            var e, i, n, a;
            if (this.stopped=!1, this.boxes = function() {
                var t, i, n, a;
                for (n = this.element.querySelectorAll("." + this.config.boxClass), a = [], t = 0, i = n.length; i > t; t++)
                    e = n[t], a.push(e);
                return a
            }.call(this), this.all = function() {
                var t, i, n, a;
                for (n = this.boxes, a = [], t = 0, i = n.length; i > t; t++)
                    e = n[t], a.push(e);
                return a
            }.call(this), this.boxes.length)
                if (this.disabled())
                    this.resetStyle();
                else
                    for (a = this.boxes, i = 0, n = a.length; n > i; i++)
                        e = a[i], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function(t) {
                return function(e) {
                    var i, n, a, o, s;
                    for (s = [], i = 0, n = e.length; n > i; i++)
                        o = e[i], s.push(function() {
                            var t, e, i, n;
                            for (i = o.addedNodes || [], n = [], t = 0, e = i.length; e > t; t++)
                                a = i[t], n.push(this.doSync(a));
                                return n
                            }.call(t));
                    return s
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, a.prototype.stop = function() {
            return this.stopped=!0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, a.prototype.sync = function(e) {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, a.prototype.doSync = function(t) {
            var e, i, n, a, o;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (t = t.parentNode || t, a = t.querySelectorAll("." + this.config.boxClass), o = [], i = 0, n = a.length; n > i; i++)
                    e = a[i], s.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), o.push(this.scrolled=!0)) : o.push(void 0);
                return o
            }
        }, a.prototype.show = function(t) {
            return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t
        }, a.prototype.applyStyle = function(t, e) {
            var i, n, a;
            return n = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), a = t.getAttribute("data-wow-iteration"), this.animate(function(o) {
                return function() {
                    return o.customStyle(t, e, n, i, a)
                }
            }(this))
        }, a.prototype.animate = function() {
            return "requestAnimationFrame"in window ? function(t) {
                return window.requestAnimationFrame(t)
            } : function(t) {
                return t()
            }
        }(), a.prototype.resetStyle = function() {
            var t, e, i, n, a;
            for (n = this.boxes, a = [], e = 0, i = n.length; i > e; e++)
                t = n[e], a.push(t.style.visibility = "visible");
            return a
        }, a.prototype.resetAnimation = function(t) {
            var e;
            return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement, e.className = e.className.replace(this.config.animateClass, "").trim()) : void 0
        }, a.prototype.customStyle = function(t, e, i, n, a) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {
                animationDuration: i
            }), n && this.vendorSet(t.style, {
                animationDelay: n
            }), a && this.vendorSet(t.style, {
                animationIterationCount: a
            }), this.vendorSet(t.style, {
                animationName: e ? "none": this.cachedAnimationName(t)
            }), t
        }, a.prototype.vendors = ["moz", "webkit"], a.prototype.vendorSet = function(t, e) {
            var i, n, a, o;
            n = [];
            for (i in e)
                a = e[i], t["" + i] = a, n.push(function() {
                    var e, n, s, r;
                    for (s = this.vendors, r = [], e = 0, n = s.length; n > e; e++)
                        o = s[e], r.push(t["" + o + i.charAt(0).toUpperCase() + i.substr(1)] = a);
                        return r
                    }.call(this));
            return n
        }, a.prototype.vendorCSS = function(t, e) {
            var i, a, o, s, r, l;
            for (r = n(t), s = r.getPropertyCSSValue(e), o = this.vendors, i = 0, a = o.length; a > i; i++)
                l = o[i], s = s || r.getPropertyCSSValue("-" + l + "-" + e);
            return s
        }, a.prototype.animationName = function(t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (i) {
                e = n(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, a.prototype.cacheAnimationName = function(t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, a.prototype.cachedAnimationName = function(t) {
            return this.animationNameCache.get(t)
        }, a.prototype.scrollHandler = function() {
            return this.scrolled=!0
        }, a.prototype.scrollCallback = function() {
            var t;
            return !this.scrolled || (this.scrolled=!1, this.boxes = function() {
                var e, i, n, a;
                for (n = this.boxes, a = [], e = 0, i = n.length; i > e; e++)
                    t = n[e], t && (this.isVisible(t) ? this.show(t) : a.push(t));
                return a
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, a.prototype.offsetTop = function(t) {
            for (var e; void 0 === t.offsetTop;)
                t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;)
                e += t.offsetTop;
            return e
        }, a.prototype.isVisible = function(t) {
            var e, i, n, a, o;
            return i = t.getAttribute("data-wow-offset") || this.config.offset, o = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, a = o + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, n = this.offsetTop(t), e = n + t.clientHeight, a >= n && e >= o
        }, a.prototype.util = function() {
            return null != this._util ? this._util : this._util = new e
        }, a.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, a
    }()
}.call(this), $(window).scroll(function() {
    $(".navbar").offset() && ($(".navbar").offset().top > 50 ? $(".scrolling-navbar").addClass("top-nav-collapse") : $(".scrolling-navbar").removeClass("top-nav-collapse"))
}), $(function() {
    $("a.page-scroll").bind("click", function(t) {
        var e = $(this);
        $("html, body").stop().animate({
            scrollTop: $(e.attr("href")).offset().top
        }, 1500, "easeInOutExpo"), t.preventDefault()
    })
}), function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define([], function() {
        return e.apply(t)
    }) : "object" == typeof exports ? module.exports = e.call(t) : t.Waves = e.call(t)
}("object" == typeof global ? global : this, function() {
    "use strict";
    function a(t) {
        return null !== t && t === t.window
    }
    function o(t) {
        return a(t) ? t : 9 === t.nodeType && t.defaultView
    }
    function s(t) {
        var e = typeof t;
        return "function" === e || "object" === e&&!!t
    }
    function r(t) {
        return s(t) && t.nodeType > 0
    }
    function l(t) {
        var n = i.call(t);
        return "[object String]" === n ? e(t) : s(t) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(n) && t.hasOwnProperty("length") ? t : r(t) ? [t] : []
    }
    function c(t) {
        var e, i, n = {
            top: 0,
            left: 0
        }, a = t && t.ownerDocument;
        return e = a.documentElement, "undefined" != typeof t.getBoundingClientRect && (n = t.getBoundingClientRect()), i = o(a), {
            top: n.top + i.pageYOffset - e.clientTop,
            left: n.left + i.pageXOffset - e.clientLeft
        }
    }
    function u(t) {
        var e = "";
        for (var i in t)
            t.hasOwnProperty(i) && (e += i + ":" + t[i] + ";");
        return e
    }
    function d(t, e, i) {
        if (i) {
            i.classList.remove("waves-rippling");
            var n = i.getAttribute("data-x"), a = i.getAttribute("data-y"), o = i.getAttribute("data-scale"), s = i.getAttribute("data-translate"), r = Date.now() - Number(i.getAttribute("data-hold")), l = 350 - r;
            0 > l && (l = 0), "mousemove" === t.type && (l = 150);
            var c = "mousemove" === t.type ? 2500: h.duration;
            setTimeout(function() {
                var t = {
                    top: a + "px",
                    left: n + "px",
                    opacity: "0",
                    "-webkit-transition-duration": c + "ms",
                    "-moz-transition-duration": c + "ms",
                    "-o-transition-duration": c + "ms",
                    "transition-duration": c + "ms",
                    "-webkit-transform": o + " " + s,
                    "-moz-transform": o + " " + s,
                    "-ms-transform": o + " " + s,
                    "-o-transform": o + " " + s,
                    transform: o + " " + s
                };
                i.setAttribute("style", u(t)), setTimeout(function() {
                    try {
                        e.removeChild(i)
                    } catch (t) {
                        return !1
                    }
                }, c)
            }, l)
        }
    }
    function m(t) {
        if (p.allowEvent(t)===!1)
            return null;
        for (var e = null, i = t.target || t.srcElement; null !== i.parentElement;) {
            if (i.classList.contains("waves-effect")&&!(i instanceof SVGElement)) {
                e = i;
                break
            }
            i = i.parentElement
        }
        return e
    }
    function v(t) {
        var e = m(t);
        if (null !== e) {
            if (e.disabled || e.getAttribute("disabled") || e.classList.contains("disabled"))
                return;
            if (p.registerEvent(t), "touchstart" === t.type && h.delay) {
                var i=!1, a = setTimeout(function() {
                    a = null, h.show(t, e)
                }, h.delay), o = function(n) {
                    a && (clearTimeout(a), a = null, h.show(t, e)), i || (i=!0, h.hide(n, e))
                }, s = function(t) {
                    a && (clearTimeout(a), a = null), o(t)
                };
                e.addEventListener("touchmove", s, !1), e.addEventListener("touchend", o, !1), e.addEventListener("touchcancel", o, !1)
            } else
                h.show(t, e), n && (e.addEventListener("touchend", h.hide, !1), e.addEventListener("touchcancel", h.hide, !1)), e.addEventListener("mouseup", h.hide, !1), e.addEventListener("mouseleave", h.hide, !1)
        }
    }
    var t = t || {}, e = document.querySelectorAll.bind(document), i = Object.prototype.toString, n = "ontouchstart"in window, h = {
        duration: 750,
        delay: 200,
        show: function(t, e, i) {
            if (2 === t.button)
                return !1;
            e = e || this;
            var n = document.createElement("div");
            n.className = "waves-ripple waves-rippling", e.appendChild(n);
            var a = c(e), o = 0, s = 0;
            "touches"in t && t.touches.length ? (o = t.touches[0].pageY - a.top, s = t.touches[0].pageX - a.left) : (o = t.pageY - a.top, s = t.pageX - a.left), s = s >= 0 ? s : 0, o = o >= 0 ? o : 0;
            var r = "scale(" + e.clientWidth / 100 * 3 + ")", l = "translate(0,0)";
            i && (l = "translate(" + i.x + "px, " + i.y + "px)"), n.setAttribute("data-hold", Date.now()), n.setAttribute("data-x", s), n.setAttribute("data-y", o), n.setAttribute("data-scale", r), n.setAttribute("data-translate", l);
            var f = {
                top: o + "px",
                left: s + "px"
            };
            n.classList.add("waves-notransition"), n.setAttribute("style", u(f)), n.classList.remove("waves-notransition"), f["-webkit-transform"] = r + " " + l, f["-moz-transform"] = r + " " + l, f["-ms-transform"] = r + " " + l, f["-o-transform"] = r + " " + l, f.transform = r + " " + l, f.opacity = "1";
            var d = "mousemove" === t.type ? 2500: h.duration;
            f["-webkit-transition-duration"] = d + "ms", f["-moz-transition-duration"] = d + "ms", f["-o-transition-duration"] = d + "ms", f["transition-duration"] = d + "ms", n.setAttribute("style", u(f))
        },
        hide: function(t, e) {
            e = e || this;
            for (var i = e.getElementsByClassName("waves-rippling"), n = 0, a = i.length; a > n; n++)
                d(t, e, i[n])
        }
    }, f = {
        input: function(t) {
            var e = t.parentNode;
            if ("i" !== e.tagName.toLowerCase() ||!e.classList.contains("waves-effect")) {
                var i = document.createElement("i");
                i.className = t.className + " waves-input-wrapper", t.className = "waves-button-input", e.replaceChild(i, t), i.appendChild(t);
                var n = window.getComputedStyle(t, null), a = n.color, o = n.backgroundColor;
                i.setAttribute("style", "color:" + a + ";background:" + o), t.setAttribute("style", "background-color:rgba(0,0,0,0);")
            }
        },
        img: function(t) {
            var e = t.parentNode;
            if ("i" !== e.tagName.toLowerCase() ||!e.classList.contains("waves-effect")) {
                var i = document.createElement("i");
                e.replaceChild(i, t), i.appendChild(t)
            }
        }
    }, p = {
        touches: 0,
        allowEvent: function(t) {
            var e=!0;
            return /^(mousedown|mousemove)$/.test(t.type) && p.touches && (e=!1), e
        },
        registerEvent: function(t) {
            var e = t.type;
            "touchstart" === e ? p.touches += 1 : /^(touchend|touchcancel)$/.test(e) && setTimeout(function() {
                p.touches && (p.touches -= 1)
            }, 500)
        }
    };
    return t.init = function(t) {
        var e = document.body;
        t = t || {}, "duration"in t && (h.duration = t.duration), "delay"in t && (h.delay = t.delay), n && (e.addEventListener("touchstart", v, !1), e.addEventListener("touchcancel", p.registerEvent, !1), e.addEventListener("touchend", p.registerEvent, !1)), e.addEventListener("mousedown", v, !1)
    }, t.attach = function(t, e) {
        t = l(t), "[object Array]" === i.call(e) && (e = e.join(" ")), e = e ? " " + e : "";
        for (var n, a, o = 0, s = t.length; s > o; o++)
            n = t[o], a = n.tagName.toLowerCase(), - 1 !== ["input", "img"].indexOf(a) && (f[a](n), n = n.parentElement), - 1 === n.className.indexOf("waves-effect") && (n.className += " waves-effect" + e)
    }, t.ripple = function(t, e) {
        t = l(t);
        var i = t.length;
        if (e = e || {}, e.wait = e.wait || 0, e.position = e.position || null, i)
            for (var n, a, o, s = {}, r = 0, u = {
                type: "mousedown",
                button: 1
            }, f = function(t, e) {
                return function() {
                    h.hide(t, e)
                }
            }; i > r; r++)
                if (n = t[r], a = e.position || {
                    x: n.clientWidth / 2,
                    y: n.clientHeight / 2
                }, o = c(n), s.x = o.left + a.x, s.y = o.top + a.y, u.pageX = s.x, u.pageY = s.y, h.show(u, n), e.wait >= 0 && null !== e.wait) {
                    var d = {
                        type: "mouseup",
                        button: 1
                    };
                    setTimeout(f(d, n), e.wait)
                }
    }, t.calm = function(t) {
        t = l(t);
        for (var e = {
            type: "mouseup",
            button: 1
        }, i = 0, n = t.length; n > i; i++)
            h.hide(e, t[i])
    }, t.displayEffect = function(e) {
        console.error("Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"), t.init(e)
    }, t
}), Waves.attach(".btn, .btn-floating", ["waves-light"]), Waves.attach(".view .mask", ["waves-light"]), Waves.attach(".waves-light", ["waves-light"]), Waves.attach(".navbar-nav a, .navbar form", ["waves-light"]), Waves.attach(".navbar-brand", ["waves-light"]), Waves.attach(".double-nav li", ["waves-light"]), Waves.init(), $(document).ready(function() {
    $("#preloader-markup").load("mdb-addons/preloader.html", function() {
        $(window).load(function() {
            $("#mdb-preloader").fadeOut("slow")
        })
    })
}), function(t) {
    t(document).ready(function() {
        t(document).on("click.card", ".card", function(e) {
            t(this).find(".card-reveal").length && (t(e.target).is(t(".card-reveal .card-title")) || t(e.target).is(t(".card-reveal .card-title i")) ? t(this).find(".card-reveal").velocity({
                translateY: 0
            }, {
                duration: 225,
                queue: !1,
                easing: "easeInOutQuad",
                complete: function() {
                    t(this).css({
                        display: "none"
                    })
                }
            }) : (t(e.target).is(t(".card .activator")) || t(e.target).is(t(".card .activator i"))) && t(this).find(".card-reveal").css({
                display: "block"
            }).velocity("stop", !1).velocity({
                translateY: "-100%"
            }, {
                duration: 300,
                queue: !1,
                easing: "easeInOutQuad"
            }))
        })
    })
}(jQuery), $(document).ready(function(t) {
    t(".card-share > a").on("click", function(e) {
        e.preventDefault(), t(this).parent().find("div").toggleClass("social-reveal-active"), t(this).toggleClass("share-expanded")
    })
}), function(t) {
    function e() {
        var e =+ t(this).attr("length"), i =+ t(this).val().length, n = e >= i;
        t(this).parent().find('span[class="character-counter"]').html(i + "/" + e), a(n, t(this))
    }
    function i(e) {
        var i = t("<span/>").addClass("character-counter").css("float", "right").css("font-size", "12px").css("height", 1);
        e.parent().append(i)
    }
    function n() {
        t(this).parent().find('span[class="character-counter"]').html("")
    }
    function a(t, e) {
        var i = e.hasClass("invalid");
        t && i ? e.removeClass("invalid") : t || i || (e.removeClass("valid"), e.addClass("invalid"))
    }
    t.fn.characterCounter = function() {
        return this.each(function() {
            var a = void 0 !== t(this).attr("length");
            a && (t(this).on("input", e), t(this).on("focus", e), t(this).on("blur", n), i(t(this)))
        })
    }, t(document).ready(function() {
        t("input, textarea").characterCounter()
    })
}(jQuery), function(t) {
    t(["jquery"], function(t) {
        return function() {
            function r(t, e, i) {
                return w({
                    type: a.error,
                    iconClass: x().iconClasses.error,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }
            function l(i, n) {
                return i || (i = x()), e = t("#" + i.containerId), e.length ? e : (n && (e = g(i)), e)
            }
            function c(t, e, i) {
                return w({
                    type: a.info,
                    iconClass: x().iconClasses.info,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }
            function u(t) {
                i = t
            }
            function h(t, e, i) {
                return w({
                    type: a.success,
                    iconClass: x().iconClasses.success,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }
            function f(t, e, i) {
                return w({
                    type: a.warning,
                    iconClass: x().iconClasses.warning,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }
            function d(t, i) {
                var n = x();
                e || l(n), v(t, n, i) || m(n)
            }
            function p(i) {
                var n = x();
                return e || l(n), i && 0 === t(":focus", i).length ? void C(i) : void(e.children().length && e.remove())
            }
            function m(i) {
                for (var n = e.children(), a = n.length - 1; a >= 0; a--)
                    v(t(n[a]), i)
            }
            function v(e, i, n) {
                var a = n && n.force ? n.force: !1;
                return e && (a || 0 === t(":focus", e).length) ? (e[i.hideMethod]({
                    duration: i.hideDuration,
                    easing: i.hideEasing,
                    complete: function() {
                        C(e)
                    }
                }), !0) : !1
            }
            function g(i) {
                return e = t("<div/>").attr("id", i.containerId).addClass(i.positionClass).attr("aria-live", "polite").attr("role", "alert"), e.appendTo(t(i.target)), e
            }
            function y() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    closeMethod: !1,
                    closeDuration: !1,
                    closeEasing: !1,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    }, iconClass : "toast-info", positionClass : "toast-top-right", timeOut : 5e3, titleClass : "toast-title", messageClass : "toast-message", escapeHtml : !1, target : "body", closeHtml : '<button type="button">&times;</button>', newestOnTop : !0, preventDuplicates : !1, progressBar : !1
                }
            }
            function b(t) {
                i && i(t)
            }
            function w(i) {
                function v(t) {
                    return null == t && (t = ""), new String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }
                function g() {
                    S(), P(), T(), A(), E(), k()
                }
                function y() {
                    c.hover(O, F), !a.onclick && a.tapToDismiss && c.click(L), a.closeButton && d && d.click(function(t) {
                        t.stopPropagation ? t.stopPropagation() : void 0 !== t.cancelBubble && t.cancelBubble!==!0 && (t.cancelBubble=!0), L(!0)
                    }), a.onclick && c.click(function(t) {
                        a.onclick(t), L()
                    })
                }
                function w() {
                    c.hide(), c[a.showMethod]({
                        duration: a.showDuration,
                        easing: a.showEasing,
                        complete: a.onShown
                    }), a.timeOut > 0 && (r = setTimeout(L, a.timeOut), p.maxHideTime = parseFloat(a.timeOut), p.hideEta = (new Date).getTime() + p.maxHideTime, a.progressBar && (p.intervalId = setInterval(I, 10)))
                }
                function S() {
                    i.iconClass && c.addClass(a.toastClass).addClass(o)
                }
                function k() {
                    a.newestOnTop ? e.prepend(c) : e.append(c)
                }
                function P() {
                    i.title && (u.append(a.escapeHtml ? v(i.title) : i.title).addClass(a.titleClass), c.append(u))
                }
                function T() {
                    i.message && (h.append(a.escapeHtml ? v(i.message) : i.message).addClass(a.messageClass), c.append(h))
                }
                function A() {
                    a.closeButton && (d.addClass("toast-close-button").attr("role", "button"), c.prepend(d))
                }
                function E() {
                    a.progressBar && (f.addClass("toast-progress"), c.prepend(f))
                }
                function M(t, e) {
                    if (t.preventDuplicates) {
                        if (e.message === s)
                            return !0;
                        s = e.message
                    }
                    return !1
                }
                function L(e) {
                    var i = e && a.closeMethod!==!1 ? a.closeMethod: a.hideMethod, n = e && a.closeDuration!==!1 ? a.closeDuration: a.hideDuration, o = e && a.closeEasing!==!1 ? a.closeEasing: a.hideEasing;
                    return !t(":focus", c).length || e ? (clearTimeout(p.intervalId), c[i]({
                        duration: n,
                        easing: o,
                        complete: function() {
                            C(c), a.onHidden && "hidden" !== m.state && a.onHidden(), m.state = "hidden", m.endTime = new Date, b(m)
                        }
                    })) : void 0
                }
                function F() {
                    (a.timeOut > 0 || a.extendedTimeOut > 0) && (r = setTimeout(L, a.extendedTimeOut), p.maxHideTime = parseFloat(a.extendedTimeOut), p.hideEta = (new Date).getTime() + p.maxHideTime)
                }
                function O() {
                    clearTimeout(r), p.hideEta = 0, c.stop(!0, !0)[a.showMethod]({
                        duration: a.showDuration,
                        easing: a.showEasing
                    })
                }
                function I() {
                    var t = (p.hideEta - (new Date).getTime()) / p.maxHideTime * 100;
                    f.width(t + "%")
                }
                var a = x(), o = i.iconClass || a.iconClass;
                if ("undefined" != typeof i.optionsOverride && (a = t.extend(a, i.optionsOverride), o = i.optionsOverride.iconClass || o), !M(a, i)) {
                    n++, e = l(a, !0);
                    var r = null, c = t("<div/>"), u = t("<div/>"), h = t("<div/>"), f = t("<div/>"), d = t(a.closeHtml), p = {
                        intervalId: null,
                        hideEta: null,
                        maxHideTime: null
                    }, m = {
                        toastId: n,
                        state: "visible",
                        startTime: new Date,
                        options: a,
                        map: i
                    };
                    return g(), w(), y(), b(m), a.debug && console && console.log(m), c
                }
            }
            function x() {
                return t.extend({}, y(), o.options)
            }
            function C(t) {
                e || (e = l()), t.is(":visible") || (t.remove(), t = null, 0 === e.children().length && (e.remove(), s = void 0))
            }
            var e, i, s, n = 0, a = {
                error: "error",
                info: "info",
                success: "success",
                warning: "warning"
            }, o = {
                clear: d,
                remove: p,
                error: r,
                getContainer: l,
                info: c,
                options: {},
                subscribe: u,
                success: h,
                version: "2.1.2",
                warning: f
            };
            return o
        }()
    })
}("function" == typeof define && define.amd ? define : function(t, e) {
    "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : window.toastr = e(window.jQuery)
}), $(".smooth-scroll").on("click", "a", function(t) {
    t.preventDefault();
    var e = $(this).attr("href");
    $("body,html").animate({
        scrollTop: $(e).offset().top
    }, 700)
}), function(t) {
    t.fn.scrollTo = function(e) {
        return t(this).scrollTop(t(this).scrollTop() - t(this).offset().top + t(e).offset().top), this
    }, t.fn.dropdown = function(e) {
        var i = {
            inDuration: 300,
            outDuration: 225,
            constrain_width: !0,
            hover: !1,
            gutter: 0,
            belowOrigin: !1,
            alignment: "left"
        };
        this.each(function() {
            function r() {
                void 0 !== n.data("induration") && (a.inDuration = n.data("inDuration")), void 0 !== n.data("outduration") && (a.outDuration = n.data("outDuration")), void 0 !== n.data("constrainwidth") && (a.constrain_width = n.data("constrainwidth")), void 0 !== n.data("hover") && (a.hover = n.data("hover")), void 0 !== n.data("gutter") && (a.gutter = n.data("gutter")), void 0 !== n.data("beloworigin") && (a.belowOrigin = n.data("beloworigin")), void 0 !== n.data("alignment") && (a.alignment = n.data("alignment"))
            }
            function l(e) {
                "focus" === e && (o=!0), r(), s.addClass("active"), n.addClass("active"), a.constrain_width===!0 ? s.css("width", n.outerWidth()) : s.css("white-space", "nowrap");
                var i = window.innerHeight, l = n.innerHeight(), c = n.offset().left, u = n.offset().top - t(window).scrollTop(), h = a.alignment, f = 0, d = 0, p = 0;
                a.belowOrigin===!0 && (p = l);
                var m = 0, v = n.parent();
                if (!v.is("body") && v[0].scrollHeight > v[0].clientHeight && (m = v[0].scrollTop), c + s.innerWidth() > t(window).width() ? h = "right" : c - s.innerWidth() + n.innerWidth() < 0 && (h = "left"), u + s.innerHeight() > i)
                    if (u + l - s.innerHeight() < 0) {
                        var g = i - u - p;
                        s.css("max-height", g)
                    } else
                        p || (p += l), p -= s.innerHeight();
                if ("left" === h)
                    f = a.gutter, d = n.position().left + f;
                else if ("right" === h) {
                    var y = n.position().left + n.outerWidth() - s.outerWidth();
                    f =- a.gutter, d = y + f
                }
                s.css({
                    position: "absolute",
                    top: n.position().top + p + m,
                    left: d
                }), s.stop(!0, !0).css("opacity", 0).slideDown({
                    queue: !1,
                    duration: a.inDuration,
                    easing: "easeOutCubic",
                    complete: function() {
                        t(this).css("height", "")
                    }
                }).animate({
                    opacity: 1
                }, {
                    queue: !1,
                    duration: a.inDuration,
                    easing: "easeOutSine"
                })
            }
            function c() {
                o=!1, s.fadeOut(a.outDuration), s.removeClass("active"), n.removeClass("active"), setTimeout(function() {
                    s.css("max-height", "")
                }, a.outDuration)
            }
            var n = t(this), a = t.extend({}, i, e), o=!1, s = t("#" + n.attr("data-activates"));
            if (r(), n.after(s), a.hover) {
                var u=!1;
                n.unbind("click." + n.attr("id")), n.on("mouseenter", function(t) {
                    u===!1 && (l(), u=!0)
                }), n.on("mouseleave", function(e) {
                    var i = e.toElement || e.relatedTarget;
                    t(i).closest(".dropdown-content").is(s) || (s.stop(!0, !0), c(), u=!1)
                }), s.on("mouseleave", function(e) {
                    var i = e.toElement || e.relatedTarget;
                    t(i).closest(".dropdown-button").is(n) || (s.stop(!0, !0), c(), u=!1)
                })
            } else
                n.unbind("click." + n.attr("id")), n.bind("click." + n.attr("id"), function(e) {
                    o || (n[0] != e.currentTarget || n.hasClass("active") || 0 !== t(e.target).closest(".dropdown-content").length ? n.hasClass("active") && (c(), t(document).unbind("click." + s.attr("id") + " touchstart." + s.attr("id"))) : (e.preventDefault(), l("click")), s.hasClass("active") && t(document).bind("click." + s.attr("id") + " touchstart." + s.attr("id"), function(e) {
                        s.is(e.target) || n.is(e.target) || n.find(e.target).length || (c(), t(document).unbind("click." + s.attr("id") + " touchstart." + s.attr("id")))
                    }))
                });
            n.on("open", function(t, e) {
                l(e)
            }), n.on("close", c)
        })
    }, t(document).ready(function() {
        t(".dropdown-button").dropdown()
    })
}(jQuery), $(".rotate-btn").on("click", function() {
    var t = $(this).attr("data-card");
    $("#" + t).toggleClass("flipped")
}), function(t) {
    function n(e) {
        if ($this = e, $this.hasClass("active")===!1) {
            $this.addClass("active"), $this.find("ul .btn-floating").velocity({
                scaleY: ".4",
                scaleX: ".4",
                translateY: "40px"
            }, {
                duration: 0
            });
            var i = 0;
            $this.find("ul .btn-floating").reverse().each(function() {
                t(this).velocity({
                    opacity: "1",
                    scaleX: "1",
                    scaleY: "1",
                    translateY: "0"
                }, {
                    duration: 80,
                    delay: i
                }), i += 40
            })
        } else {
            $this.removeClass("active");
            var i = 0;
            $this.find("ul .btn-floating").velocity("stop", !0), $this.find("ul .btn-floating").velocity({
                opacity: "0",
                scaleX: ".4",
                scaleY: ".4",
                translateY: "40px"
            }, {
                duration: 80
            })
        }
    }
    t(document).ready(function() {
        t.fn.reverse = [].reverse, t(document).on("mouseenter.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function(i) {
            var n = t(this);
            e(n)
        }), t(document).on("mouseleave.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function(e) {
            var n = t(this);
            i(n)
        }), t(document).on("click.fixedActionBtn", ".fixed-action-btn.click-to-toggle > a", function(n) {
            var a = t(this), o = a.parent();
            o.hasClass("active") ? i(o) : e(o)
        })
    }), t.fn.extend({
        openFAB: function() {
            e(t(this))
        },
        closeFAB: function() {
            i(t(this))
        }
    });
    var e = function(e) {
        if ($this = e, $this.hasClass("active")===!1) {
            var n, a, i = $this.hasClass("horizontal");
            i===!0 ? a = 40 : n = 40, $this.addClass("active"), $this.find("ul .btn-floating").velocity({
                scaleY: ".4",
                scaleX: ".4",
                translateY: n + "px",
                translateX: a + "px"
            }, {
                duration: 0
            });
            var o = 0;
            $this.find("ul .btn-floating").reverse().each(function() {
                t(this).velocity({
                    opacity: "1",
                    scaleX: "1",
                    scaleY: "1",
                    translateY: "0",
                    translateX: "0"
                }, {
                    duration: 80,
                    delay: o
                }), o += 40
            })
        }
    }, i = function(t) {
        $this = t;
        var i, n, e = $this.hasClass("horizontal");
        e===!0 ? n = 40 : i = 40, $this.removeClass("active");
        $this.find("ul .btn-floating").velocity("stop", !0), $this.find("ul .btn-floating").velocity({
            opacity: "0",
            scaleX: ".4",
            scaleY: ".4",
            translateY: i + "px",
            translateX: n + "px"
        }, {
            duration: 80
        })
    };
    t(".fixed-action-btn").on({
        click: function(e) {
            return e.preventDefault(), n(t(".fixed-action-btn")), !1
        }
    })
}(jQuery), function(t) {
    var e = 0, i = 0, n = function() {
        return i++, "materialize-lean-overlay-" + i
    };
    t.fn.extend({
        openModal: function(i) {
            t("body").css("overflow", "hidden");
            var a = {
                opacity: .5,
                in_duration: 350,
                out_duration: 250,
                ready: void 0,
                complete: void 0,
                dismissible: !0,
                starting_top: "4%"
            }, o = n(), s = t(this), r = t('<div class="lean-overlay"></div>'), l=++e;
            r.attr("id", o).css("z-index", 1e3 + 2 * l), s.data("overlay-id", o).css("z-index", 1e3 + 2 * l + 1), t("body").append(r), i = t.extend(a, i), i.dismissible && (r.click(function() {
                s.closeModal(i)
            }), t(document).on("keyup.leanModal" + o, function(t) {
                27 === t.keyCode && s.closeModal(i)
            })), s.find(".modal-close").on("click.close", function(t) {
                s.closeModal(i)
            }), r.css({
                display: "block",
                opacity: 0
            }), s.css({
                display: "block",
                opacity: 0
            }), r.velocity({
                opacity: i.opacity
            }, {
                duration: i.in_duration,
                queue: !1,
                ease: "easeOutCubic"
            }), s.data("associated-overlay", r[0]), s.hasClass("bottom-sheet") ? s.velocity({
                bottom: "0",
                opacity: 1
            }, {
                duration: i.in_duration,
                queue: !1,
                ease: "easeOutCubic",
                complete: function() {
                    "function" == typeof i.ready && i.ready()
                }
            }) : (t.Velocity.hook(s, "scaleX", .7), s.css({
                top: i.starting_top
            }), s.velocity({
                top: "10%",
                opacity: 1,
                scaleX: "1"
            }, {
                duration: i.in_duration,
                queue: !1,
                ease: "easeOutCubic",
                complete: function() {
                    "function" == typeof i.ready && i.ready()
                }
            }))
        }
    }), t.fn.extend({
        closeModal: function(i) {
            var n = {
                out_duration: 250,
                complete: void 0
            }, a = t(this), o = a.data("overlay-id"), s = t("#" + o);
            i = t.extend(n, i), t("body").css("overflow", ""), a.find(".modal-close").off("click.close"), t(document).off("keyup.leanModal" + o), s.velocity({
                opacity: 0
            }, {
                duration: i.out_duration,
                queue: !1,
                ease: "easeOutQuart"
            }), a.hasClass("bottom-sheet") ? a.velocity({
                bottom: "-100%",
                opacity: 0
            }, {
                duration: i.out_duration,
                queue: !1,
                ease: "easeOutCubic",
                complete: function() {
                    s.css({
                        display: "none"
                    }), "function" == typeof i.complete && i.complete(), s.remove(), e--
                }
            }) : a.velocity({
                top: i.starting_top,
                opacity: 0,
                scaleX: .7
            }, {
                duration: i.out_duration,
                complete: function() {
                    t(this).css("display", "none"), "function" == typeof i.complete && i.complete(), s.remove(), e--
                }
            })
        }
    }), t.fn.extend({
        leanModal: function(e) {
            return this.each(function() {
                var i = {
                    starting_top: "4%"
                }, n = t.extend(i, e);
                t(this).click(function(e) {
                    n.starting_top = (t(this).offset().top - t(window).scrollTop()) / 1.15;
                    var i = t(this).attr("href") || "#" + t(this).data("target");
                    t(i).openModal(n), e.preventDefault()
                })
            })
        }
    })
}(jQuery), function(t, e, i, n) {
    "use strict";
    function u(t, e, i) {
        return setTimeout(y(t, i), e)
    }
    function h(t, e, i) {
        return Array.isArray(t) ? (f(t, i[e], i), !0) : !1
    }
    function f(t, e, i) {
        var a;
        if (t)
            if (t.forEach)
                t.forEach(e, i);
            else if (t.length !== n)
                for (a = 0; a < t.length;)
                    e.call(i, t[a], a, t), a++;
            else
                for (a in t)
                    t.hasOwnProperty(a) && e.call(i, t[a], a, t)
    }
    function d(e, i, n) {
        var a = "DEPRECATED METHOD: " + i + "\n" + n + " AT \n";
        return function() {
            var i = new Error("get-stack-trace"), n = i && i.stack ? i.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@"): "Unknown Stack Trace", o = t.console && (t.console.warn || t.console.log);
            return o && o.call(t.console, a, n), e.apply(this, arguments)
        }
    }
    function g(t, e, i) {
        var a, n = e.prototype;
        a = t.prototype = Object.create(n), a.constructor = t, a._super = n, i && p(a, i)
    }
    function y(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function b(t, e) {
        return typeof t == s ? t.apply(e ? e[0] || n : n, e) : t
    }
    function w(t, e) {
        return t === n ? e : t
    }
    function x(t, e, i) {
        f(P(e), function(e) {
            t.addEventListener(e, i, !1)
        })
    }
    function C(t, e, i) {
        f(P(e), function(e) {
            t.removeEventListener(e, i, !1)
        })
    }
    function S(t, e) {
        for (; t;) {
            if (t == e)
                return !0;
            t = t.parentNode
        }
        return !1
    }
    function k(t, e) {
        return t.indexOf(e)>-1
    }
    function P(t) {
        return t.trim().split(/\s+/g)
    }
    function T(t, e, i) {
        if (t.indexOf&&!i)
            return t.indexOf(e);
        for (var n = 0; n < t.length;) {
            if (i && t[n][i] == e ||!i && t[n] === e)
                return n;
            n++
        }
        return - 1
    }
    function A(t) {
        return Array.prototype.slice.call(t, 0)
    }
    function E(t, e, i) {
        for (var n = [], a = [], o = 0; o < t.length;) {
            var s = e ? t[o][e]: t[o];
            T(a, s) < 0 && n.push(t[o]), a[o] = s, o++
        }
        return i && (n = e ? n.sort(function(t, i) {
            return t[e] > i[e]
        }) : n.sort()), n
    }
    function M(t, e) {
        for (var i, o, s = e[0].toUpperCase() + e.slice(1), r = 0; r < a.length;) {
            if (i = a[r], o = i ? i + s : e, o in t)
                return o;
            r++
        }
        return n
    }
    function F() {
        return L++
    }
    function O(e) {
        var i = e.ownerDocument || e;
        return i.defaultView || i.parentWindow || t
    }
    function it(t, e) {
        var i = this;
        this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function(e) {
            b(t.options.enable, [t]) && i.handler(e)
        }, this.init()
    }
    function nt(t) {
        var e, i = t.options.inputClass;
        return new (e = i ? i : D ? kt : z ? Ot : R ? zt : bt)(t, at)
    }
    function at(t, e, i) {
        var n = i.pointers.length, a = i.changedPointers.length, o = e & N && n - a === 0, s = e & ($ | q) && n - a === 0;
        i.isFirst=!!o, i.isFinal=!!s, o && (t.session = {}), i.eventType = e, ot(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i
    }
    function ot(t, e) {
        var i = t.session, n = e.pointers, a = n.length;
        i.firstInput || (i.firstInput = lt(e)), a > 1&&!i.firstMultiple ? i.firstMultiple = lt(e) : 1 === a && (i.firstMultiple=!1);
        var o = i.firstInput, s = i.firstMultiple, r = s ? s.center: o.center, u = e.center = ct(n);
        e.timeStamp = c(), e.deltaTime = e.timeStamp - o.timeStamp, e.angle = dt(r, u), e.distance = ft(r, u), st(i, e), e.offsetDirection = ht(e.deltaX, e.deltaY);
        var h = ut(e.deltaTime, e.deltaX, e.deltaY);
        e.overallVelocityX = h.x, e.overallVelocityY = h.y, e.overallVelocity = l(h.x) > l(h.y) ? h.x : h.y, e.scale = s ? mt(s.pointers, n) : 1, e.rotation = s ? pt(s.pointers, n) : 0, e.maxPointers = i.prevInput ? e.pointers.length > i.prevInput.maxPointers ? e.pointers.length : i.prevInput.maxPointers : e.pointers.length,
        rt(i, e);
        var f = t.element;
        S(e.srcEvent.target, f) && (f = e.srcEvent.target), e.target = f
    }
    function st(t, e) {
        var i = e.center, n = t.offsetDelta || {}, a = t.prevDelta || {}, o = t.prevInput || {};
        (e.eventType === N || o.eventType === $) && (a = t.prevDelta = {
            x: o.deltaX || 0,
            y: o.deltaY || 0
        }, n = t.offsetDelta = {
            x: i.x,
            y: i.y
        }), e.deltaX = a.x + (i.x - n.x), e.deltaY = a.y + (i.y - n.y)
    }
    function rt(t, e) {
        var o, s, r, c, i = t.lastInterval || e, a = e.timeStamp - i.timeStamp;
        if (e.eventType != q && (a > B || i.velocity === n)) {
            var u = e.deltaX - i.deltaX, h = e.deltaY - i.deltaY, f = ut(a, u, h);
            s = f.x, r = f.y, o = l(f.x) > l(f.y) ? f.x : f.y, c = ht(u, h), t.lastInterval = e
        } else
            o = i.velocity, s = i.velocityX, r = i.velocityY, c = i.direction;
        e.velocity = o, e.velocityX = s, e.velocityY = r, e.direction = c
    }
    function lt(t) {
        for (var e = [], i = 0; i < t.pointers.length;)
            e[i] = {
                clientX: r(t.pointers[i].clientX),
                clientY: r(t.pointers[i].clientY)
            }, i++;
        return {
            timeStamp: c(),
            pointers: e,
            center: ct(e),
            deltaX: t.deltaX,
            deltaY: t.deltaY
        }
    }
    function ct(t) {
        var e = t.length;
        if (1 === e)
            return {
                x: r(t[0].clientX),
                y: r(t[0].clientY)
            };
        for (var i = 0, n = 0, a = 0; e > a;)
            i += t[a].clientX, n += t[a].clientY, a++;
        return {
            x: r(i / e),
            y: r(n / e)
        }
    }
    function ut(t, e, i) {
        return {
            x: e / t || 0,
            y: i / t || 0
        }
    }
    function ht(t, e) {
        return t === e ? X : l(t) >= l(e) ? 0 > t ? Y : Q : 0 > e ? Z : G
    }
    function ft(t, e, i) {
        i || (i = tt);
        var n = e[i[0]] - t[i[0]], a = e[i[1]] - t[i[1]];
        return Math.sqrt(n * n + a * a)
    }
    function dt(t, e, i) {
        i || (i = tt);
        var n = e[i[0]] - t[i[0]], a = e[i[1]] - t[i[1]];
        return 180 * Math.atan2(a, n) / Math.PI
    }
    function pt(t, e) {
        return dt(e[1], e[0], et) + dt(t[1], t[0], et)
    }
    function mt(t, e) {
        return ft(e[0], e[1], et) / ft(t[0], t[1], et)
    }
    function bt() {
        this.evEl = gt, this.evWin = yt, this.pressed=!1, it.apply(this, arguments)
    }
    function kt() {
        this.evEl = Ct, this.evWin = St, it.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }
    function Et() {
        this.evTarget = Tt, this.evWin = At, this.started=!1, it.apply(this, arguments)
    }
    function Mt(t, e) {
        var i = A(t.touches), n = A(t.changedTouches);
        return e & ($ | q) && (i = E(i.concat(n), "identifier", !0)), [i, n]
    }
    function Ot() {
        this.evTarget = Ft, this.targetIds = {}, it.apply(this, arguments)
    }
    function It(t, e) {
        var i = A(t.touches), n = this.targetIds;
        if (e & (N | j) && 1 === i.length)
            return n[i[0].identifier]=!0, [i, i];
        var a, o, s = A(t.changedTouches), r = [], l = this.target;
        if (o = i.filter(function(t) {
            return S(t.target, l)
        }), e === N)
            for (a = 0; a < o.length;)
                n[o[a].identifier]=!0, a++;
        for (a = 0; a < s.length;)
            n[s[a].identifier] && r.push(s[a]), e & ($ | q) && delete n[s[a].identifier], a++;
        return r.length ? [E(o.concat(r), "identifier", !0), r] : void 0
    }
    function zt() {
        it.apply(this, arguments);
        var t = y(this.handler, this);
        this.touch = new Ot(this.manager, t), this.mouse = new bt(this.manager, t), this.primaryTouch = null, this.lastTouches = []
    }
    function Vt(t, e) {
        t & N ? (this.primaryTouch = e.changedPointers[0].identifier, Wt.call(this, e)) : t & ($ | q) && Wt.call(this, e)
    }
    function Wt(t) {
        var e = t.changedPointers[0];
        if (e.identifier === this.primaryTouch) {
            var i = {
                x: e.clientX,
                y: e.clientY
            };
            this.lastTouches.push(i);
            var n = this.lastTouches, a = function() {
                var t = n.indexOf(i);
                t>-1 && n.splice(t, 1)
            };
            setTimeout(a, Rt)
        }
    }
    function _t(t) {
        for (var e = t.srcEvent.clientX, i = t.srcEvent.clientY, n = 0; n < this.lastTouches.length; n++) {
            var a = this.lastTouches[n], o = Math.abs(e - a.x), s = Math.abs(i - a.y);
            if (Dt >= o && Dt >= s)
                return !0
        }
        return !1
    }
    function Zt(t, e) {
        this.manager = t, this.set(e)
    }
    function Gt(t) {
        if (k(t, qt))
            return qt;
        var e = k(t, Xt), i = k(t, Yt);
        return e && i ? qt : e || i ? e ? Xt : Yt : k(t, $t) ? $t : jt
    }
    function Ut() {
        if (!Bt)
            return !1;
        var e = {}, i = t.CSS && t.CSS.supports;
        return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(n) {
            e[n] = i ? t.CSS.supports("touch-action", n) : !0
        }), e
    }
    function oe(t) {
        this.options = p({}, this.defaults, t || {}), this.id = F(), this.manager = null, this.options.enable = w(this.options.enable, !0), this.state = Kt, this.simultaneous = {}, this.requireFail = []
    }
    function se(t) {
        return t & ne ? "cancel" : t & ee ? "end" : t & te ? "move" : t & Jt ? "start" : ""
    }
    function re(t) {
        return t == G ? "down" : t == Z ? "up" : t == Y ? "left" : t == Q ? "right" : ""
    }
    function le(t, e) {
        var i = e.manager;
        return i ? i.get(t) : t
    }
    function ce() {
        oe.apply(this, arguments)
    }
    function ue() {
        ce.apply(this, arguments), this.pX = null, this.pY = null
    }
    function he() {
        ce.apply(this, arguments)
    }
    function fe() {
        oe.apply(this, arguments), this._timer = null, this._input = null
    }
    function de() {
        ce.apply(this, arguments)
    }
    function pe() {
        ce.apply(this, arguments)
    }
    function me() {
        oe.apply(this, arguments), this.pTime=!1, this.pCenter=!1, this._timer = null, this._input = null, this.count = 0
    }
    function ve(t, e) {
        return e = e || {}, e.recognizers = w(e.recognizers, ve.defaults.preset), new be(t, e)
    }
    function be(t, e) {
        this.options = p({}, ve.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = nt(this), this.touchAction = new Zt(this, this.options.touchAction), we(this, !0), f(this.options.recognizers, function(t) {
            var e = this.add(new t[0](t[1]));
            t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
        }, this)
    }
    function we(t, e) {
        var i = t.element;
        if (i.style) {
            var n;
            f(t.options.cssProps, function(a, o) {
                n = M(i.style, o), e ? (t.oldCssProps[n] = i.style[n], i.style[n] = a) : i.style[n] = t.oldCssProps[n] || ""
            }), e || (t.oldCssProps = {})
        }
    }
    function xe(t, i) {
        var n = e.createEvent("Event");
        n.initEvent(t, !0, !0), n.gesture = i, i.target.dispatchEvent(n)
    }
    var p, a = ["", "webkit", "Moz", "MS", "ms", "o"], o = e.createElement("div"), s = "function", r = Math.round, l = Math.abs, c = Date.now;
    p = "function" != typeof Object.assign ? function(t) {
        if (t === n || null === t)
            throw new TypeError("Cannot convert undefined or null to object");
        for (var e = Object(t), i = 1; i < arguments.length; i++) {
            var a = arguments[i];
            if (a !== n && null !== a)
                for (var o in a)
                    a.hasOwnProperty(o) && (e[o] = a[o])
        }
        return e
    } : Object.assign;
    var m = d(function(t, e, i) {
        for (var a = Object.keys(e), o = 0; o < a.length;)(!i || i && t[a[o]] === n)
            && (t[a[o]] = e[a[o]]), o++;
        return t
    }, "extend", "Use `assign`."), v = d(function(t, e) {
        return m(t, e, !0)
    }, "merge", "Use `assign`."), L = 1, I = /mobile|tablet|ip(ad|hone|od)|android/i, R = "ontouchstart"in t, D = M(t, "PointerEvent") !== n, z = R && I.test(navigator.userAgent), V = "touch", W = "pen", _ = "mouse", H = "kinect", B = 25, N = 1, j = 2, $ = 4, q = 8, X = 1, Y = 2, Q = 4, Z = 8, G = 16, U = Y | Q, K = Z | G, J = U | K, tt = ["x", "y"], et = ["clientX", "clientY"];
    it.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && x(this.element, this.evEl, this.domHandler), this.evTarget && x(this.target, this.evTarget, this.domHandler), this.evWin && x(O(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && C(this.element, this.evEl, this.domHandler), this.evTarget && C(this.target, this.evTarget, this.domHandler), this.evWin && C(O(this.element), this.evWin, this.domHandler)
        }
    };
    var vt = {
        mousedown: N,
        mousemove: j,
        mouseup: $
    }, gt = "mousedown", yt = "mousemove mouseup";
    g(bt, it, {
        handler: function(t) {
            var e = vt[t.type];
            e & N && 0 === t.button && (this.pressed=!0), e & j && 1 !== t.which && (e = $), this.pressed && (e & $ && (this.pressed=!1), this.callback(this.manager, e, {
                pointers: [t],
                changedPointers: [t],
                pointerType: _,
                srcEvent: t
            }))
        }
    });
    var wt = {
        pointerdown: N,
        pointermove: j,
        pointerup: $,
        pointercancel: q,
        pointerout: q
    }, xt = {
        2: V,
        3: W,
        4: _,
        5: H
    }, Ct = "pointerdown", St = "pointermove pointerup pointercancel";
    t.MSPointerEvent&&!t.PointerEvent && (Ct = "MSPointerDown", St = "MSPointerMove MSPointerUp MSPointerCancel"), g(kt, it, {
        handler: function(t) {
            var e = this.store, i=!1, n = t.type.toLowerCase().replace("ms", ""), a = wt[n], o = xt[t.pointerType] || t.pointerType, s = o == V, r = T(e, t.pointerId, "pointerId");
            a & N && (0 === t.button || s) ? 0 > r && (e.push(t), r = e.length - 1) : a & ($ | q) && (i=!0), 0 > r || (e[r] = t, this.callback(this.manager, a, {
                pointers: e,
                changedPointers: [t],
                pointerType: o,
                srcEvent: t
            }), i && e.splice(r, 1))
        }
    });
    var Pt = {
        touchstart: N,
        touchmove: j,
        touchend: $,
        touchcancel: q
    }, Tt = "touchstart", At = "touchstart touchmove touchend touchcancel";
    g(Et, it, {
        handler: function(t) {
            var e = Pt[t.type];
            if (e === N && (this.started=!0), this.started) {
                var i = Mt.call(this, t, e);
                e & ($ | q) && i[0].length - i[1].length === 0 && (this.started=!1), this.callback(this.manager, e, {
                    pointers: i[0],
                    changedPointers: i[1],
                    pointerType: V,
                    srcEvent: t
                })
            }
        }
    });
    var Lt = {
        touchstart: N,
        touchmove: j,
        touchend: $,
        touchcancel: q
    }, Ft = "touchstart touchmove touchend touchcancel";
    g(Ot, it, {
        handler: function(t) {
            var e = Lt[t.type], i = It.call(this, t, e);
            i && this.callback(this.manager, e, {
                pointers: i[0],
                changedPointers: i[1],
                pointerType: V,
                srcEvent: t
            })
        }
    });
    var Rt = 2500, Dt = 25;
    g(zt, it, {
        handler: function(t, e, i) {
            var n = i.pointerType == V, a = i.pointerType == _;
            if (!(a && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
                if (n)
                    Vt.call(this, e, i);
                else if (a && _t.call(this, i))
                    return;
                this.callback(t, e, i)
            }
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var Ht = M(o.style, "touchAction"), Bt = Ht !== n, Nt = "compute", jt = "auto", $t = "manipulation", qt = "none", Xt = "pan-x", Yt = "pan-y", Qt = Ut();
    Zt.prototype = {
        set: function(t) {
            t == Nt && (t = this.compute()), Bt && this.manager.element.style && Qt[t] && (this.manager.element.style[Ht] = t), this.actions = t.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var t = [];
            return f(this.manager.recognizers, function(e) {
                b(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
            }), Gt(t.join(" "))
        },
        preventDefaults: function(t) {
            var e = t.srcEvent, i = t.offsetDirection;
            if (this.manager.session.prevented)
                return void e.preventDefault();
            var n = this.actions, a = k(n, qt)&&!Qt[qt], o = k(n, Yt)&&!Qt[Yt], s = k(n, Xt)&&!Qt[Xt];
            if (a) {
                var r = 1 === t.pointers.length, l = t.distance < 2, c = t.deltaTime < 250;
                if (r && l && c)
                    return
            }
            return s && o ? void 0 : a || o && i & U || s && i & K ? this.preventSrc(e) : void 0
        },
        preventSrc: function(t) {
            this.manager.session.prevented=!0, t.preventDefault()
        }
    };
    var Kt = 1, Jt = 2, te = 4, ee = 8, ie = ee, ne = 16, ae = 32;
    oe.prototype = {
        defaults: {},
        set: function(t) {
            return p(this.options, t), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function(t) {
            if (h(t, "recognizeWith", this))
                return this;
            var e = this.simultaneous;
            return t = le(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
        },
        dropRecognizeWith: function(t) {
            return h(t, "dropRecognizeWith", this) ? this : (t = le(t, this), delete this.simultaneous[t.id], this)
        },
        requireFailure: function(t) {
            if (h(t, "requireFailure", this))
                return this;
            var e = this.requireFail;
            return t = le(t, this), - 1 === T(e, t) && (e.push(t), t.requireFailure(this)), this
        },
        dropRequireFailure: function(t) {
            if (h(t, "dropRequireFailure", this))
                return this;
            t = le(t, this);
            var e = T(this.requireFail, t);
            return e>-1 && this.requireFail.splice(e, 1), this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(t) {
            return !!this.simultaneous[t.id]
        },
        emit: function(t) {
            function n(i) {
                e.manager.emit(i, t)
            }
            var e = this, i = this.state;
            ee > i && n(e.options.event + se(i)), n(e.options.event), t.additionalEvent && n(t.additionalEvent), i >= ee && n(e.options.event + se(i))
        },
        tryEmit: function(t) {
            return this.canEmit() ? this.emit(t) : void(this.state = ae)
        },
        canEmit: function() {
            for (var t = 0; t < this.requireFail.length;) {
                if (!(this.requireFail[t].state & (ae | Kt)))
                    return !1;
                t++
            }
            return !0
        },
        recognize: function(t) {
            var e = p({}, t);
            return b(this.options.enable, [this, e]) ? (this.state & (ie | ne | ae) && (this.state = Kt), this.state = this.process(e), void(this.state & (Jt | te | ee | ne) && this.tryEmit(e))) : (this.reset(), void(this.state = ae))
        },
        process: function(t) {},
        getTouchAction: function() {},
        reset: function() {}
    }, g(ce, oe, {
        defaults: {
            pointers: 1
        },
        attrTest: function(t) {
            var e = this.options.pointers;
            return 0 === e || t.pointers.length === e
        },
        process: function(t) {
            var e = this.state, i = t.eventType, n = e & (Jt | te), a = this.attrTest(t);
            return n && (i & q ||!a) ? e | ne : n || a ? i & $ ? e | ee : e & Jt ? e | te : Jt : ae
        }
    }), g(ue, ce, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: J
        },
        getTouchAction: function() {
            var t = this.options.direction, e = [];
            return t & U && e.push(Yt), t & K && e.push(Xt), e
        },
        directionTest: function(t) {
            var e = this.options, i=!0, n = t.distance, a = t.direction, o = t.deltaX, s = t.deltaY;
            return a & e.direction || (e.direction & U ? (a = 0 === o ? X : 0 > o ? Y : Q, i = o != this.pX, n = Math.abs(t.deltaX)) : (a = 0 === s ? X : 0 > s ? Z : G, i = s != this.pY, n = Math.abs(t.deltaY))), t.direction = a, i && n > e.threshold && a & e.direction
        },
        attrTest: function(t) {
            return ce.prototype.attrTest.call(this, t) && (this.state & Jt ||!(this.state & Jt) && this.directionTest(t))
        },
        emit: function(t) {
            this.pX = t.deltaX, this.pY = t.deltaY;
            var e = re(t.direction);
            e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t)
        }
    }), g(he, ce, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [qt]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & Jt)
        },
        emit: function(t) {
            if (1 !== t.scale) {
                var e = t.scale < 1 ? "in": "out";
                t.additionalEvent = this.options.event + e
            }
            this._super.emit.call(this, t)
        }
    }), g(fe, oe, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function() {
            return [jt]
        },
        process: function(t) {
            var e = this.options, i = t.pointers.length === e.pointers, n = t.distance < e.threshold, a = t.deltaTime > e.time;
            if (this._input = t, !n ||!i || t.eventType & ($ | q)&&!a)
                this.reset();
            else if (t.eventType & N)
                this.reset(), this._timer = u(function() {
                    this.state = ie, this.tryEmit()
                }, e.time, this);
            else if (t.eventType & $)
                return ie;
            return ae
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(t) {
            this.state === ie && (t && t.eventType & $ ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = c(), this.manager.emit(this.options.event, this._input)))
        }
    }), g(de, ce, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [qt]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & Jt)
        }
    }), g(pe, ce, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: U | K,
            pointers: 1
        },
        getTouchAction: function() {
            return ue.prototype.getTouchAction.call(this)
        },
        attrTest: function(t) {
            var i, e = this.options.direction;
            return e & (U | K) ? i = t.overallVelocity : e & U ? i = t.overallVelocityX : e & K && (i = t.overallVelocityY), this._super.attrTest.call(this, t) && e & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && l(i) > this.options.velocity && t.eventType & $
        },
        emit: function(t) {
            var e = re(t.offsetDirection);
            e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
        }
    }), g(me, oe, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [$t]
        },
        process: function(t) {
            var e = this.options, i = t.pointers.length === e.pointers, n = t.distance < e.threshold, a = t.deltaTime < e.time;
            if (this.reset(), t.eventType & N && 0 === this.count)
                return this.failTimeout();
            if (n && a && i) {
                if (t.eventType != $)
                    return this.failTimeout();
                var o = this.pTime ? t.timeStamp - this.pTime < e.interval: !0, s=!this.pCenter || ft(this.pCenter, t.center) < e.posThreshold;
                this.pTime = t.timeStamp, this.pCenter = t.center, s && o ? this.count += 1 : this.count = 1, this._input = t;
                var r = this.count%e.taps;
                if (0 === r)
                    return this.hasRequireFailures() ? (this._timer = u(function() {
                        this.state = ie, this.tryEmit()
                    }, e.interval, this), Jt) : ie
            }
            return ae
        },
        failTimeout: function() {
            return this._timer = u(function() {
                this.state = ae
            }, this.options.interval, this), ae
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == ie && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), ve.VERSION = "2.0.7", ve.defaults = {
        domEvents: !1,
        touchAction: Nt,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [[de, {
            enable: !1
        }
        ], [he, {
            enable: !1
        }, ["rotate"]], [pe, {
            direction: U
        }
        ], [ue, {
            direction: U
        }, ["swipe"]], [me], [me, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [fe]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var ge = 1, ye = 2;
    be.prototype = {
        set: function(t) {
            return p(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
        },
        stop: function(t) {
            this.session.stopped = t ? ye : ge
        },
        recognize: function(t) {
            var e = this.session;
            if (!e.stopped) {
                this.touchAction.preventDefaults(t);
                var i, n = this.recognizers, a = e.curRecognizer;
                (!a || a && a.state & ie) && (a = e.curRecognizer = null);
                for (var o = 0; o < n.length;)
                    i = n[o], e.stopped === ye || a && i != a&&!i.canRecognizeWith(a) ? i.reset() : i.recognize(t), !a && i.state & (Jt | te | ee) && (a = e.curRecognizer = i), o++
            }
        },
        get: function(t) {
            if (t instanceof oe)
                return t;
            for (var e = this.recognizers, i = 0; i < e.length; i++)
                if (e[i].options.event == t)
                    return e[i];
            return null
        },
        add: function(t) {
            if (h(t, "add", this))
                return this;
            var e = this.get(t.options.event);
            return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
        },
        remove: function(t) {
            if (h(t, "remove", this))
                return this;
            if (t = this.get(t)) {
                var e = this.recognizers, i = T(e, t);
                - 1 !== i && (e.splice(i, 1), this.touchAction.update())
            }
            return this
        },
        on: function(t, e) {
            if (t !== n && e !== n) {
                var i = this.handlers;
                return f(P(t), function(t) {
                    i[t] = i[t] || [], i[t].push(e)
                }), this
            }
        },
        off: function(t, e) {
            if (t !== n) {
                var i = this.handlers;
                return f(P(t), function(t) {
                    e ? i[t] && i[t].splice(T(i[t], e), 1) : delete i[t]
                }), this
            }
        },
        emit: function(t, e) {
            this.options.domEvents && xe(t, e);
            var i = this.handlers[t] && this.handlers[t].slice();
            if (i && i.length) {
                e.type = t, e.preventDefault = function() {
                    e.srcEvent.preventDefault()
                };
                for (var n = 0; n < i.length;)
                    i[n](e), n++
            }
        },
        destroy: function() {
            this.element && we(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, p(ve, {
        INPUT_START: N,
        INPUT_MOVE: j,
        INPUT_END: $,
        INPUT_CANCEL: q,
        STATE_POSSIBLE: Kt,
        STATE_BEGAN: Jt,
        STATE_CHANGED: te,
        STATE_ENDED: ee,
        STATE_RECOGNIZED: ie,
        STATE_CANCELLED: ne,
        STATE_FAILED: ae,
        DIRECTION_NONE: X,
        DIRECTION_LEFT: Y,
        DIRECTION_RIGHT: Q,
        DIRECTION_UP: Z,
        DIRECTION_DOWN: G,
        DIRECTION_HORIZONTAL: U,
        DIRECTION_VERTICAL: K,
        DIRECTION_ALL: J,
        Manager: be,
        Input: it,
        TouchAction: Zt,
        TouchInput: Ot,
        MouseInput: bt,
        PointerEventInput: kt,
        TouchMouseInput: zt,
        SingleTouchInput: Et,
        Recognizer: oe,
        AttrRecognizer: ce,
        Tap: me,
        Pan: ue,
        Swipe: pe,
        Pinch: he,
        Rotate: de,
        Press: fe,
        on: x,
        off: C,
        each: f,
        merge: v,
        extend: m,
        assign: p,
        inherit: g,
        bindFn: y,
        prefixed: M
    });
    var Ce = "undefined" != typeof t ? t: "undefined" != typeof self ? self: {};
    Ce.Hammer = ve, "function" == typeof define && define.amd ? define(function() {
        return ve
    }) : "undefined" != typeof module && module.exports ? module.exports = ve : t[i] = ve
}(window, document, "Hammer"), function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "hammerjs"], t) : "object" == typeof exports ? t(require("jquery"), require("hammerjs")) : t(jQuery, Hammer)
}(function(t, e) {
    function i(i, n) {
        var a = t(i);
        a.data("hammer") || a.data("hammer", new e(a[0], n))
    }
    t.fn.hammer = function(t) {
        return this.each(function() {
            i(this, t)
        })
    }, e.Manager.prototype.emit = function(e) {
        return function(i, n) {
            e.call(this, i, n), t(this.element).trigger({
                type: i,
                gesture: n
            })
        }
    }(e.Manager.prototype.emit)
}), function(t) {
    var e = {
        init: function(e) {
            var i = {
                menuWidth: 240,
                edge: "left",
                closeOnClick: !1
            };
            e = t.extend(i, e), t(this).each(function() {
                function o(i) {
                    s=!1, r=!1, t("body").css({
                        overflow: "",
                        width: ""
                    }), t("#sidenav-overlay").velocity({
                        opacity: 0
                    }, {
                        duration: 200,
                        queue: !1,
                        easing: "easeOutQuad",
                        complete: function() {
                            t(this).remove()
                        }
                    }), "left" === e.edge ? (a.css({
                        width: "",
                        right: "",
                        left: "0"
                    }), n.velocity({
                        translateX: "-100%"
                    }, {
                        duration: 200,
                        queue: !1,
                        easing: "easeOutCubic",
                        complete: function() {
                            i===!0 && (n.removeAttr("style"), n.css("width", e.menuWidth))
                        }
                    })) : (a.css({
                        width: "",
                        right: "0",
                        left: ""
                    }), n.velocity({
                        translateX: "100%"
                    }, {
                        duration: 200,
                        queue: !1,
                        easing: "easeOutCubic",
                        complete: function() {
                            i===!0 && (n.removeAttr("style"), n.css("width", e.menuWidth))
                        }
                    }))
                }
                var i = t(this), n = t("#" + i.attr("data-activates"));
                240 != e.menuWidth && n.css("width", e.menuWidth);
                var a = t('<div class="drag-target"></div>');
                t("body").append(a), "left" == e.edge ? (n.css("transform", "translateX(-100%)"), a.css({
                    left: 0
                })) : (n.addClass("right-aligned").css("transform", "translateX(100%)"), a.css({
                    right: 0
                })), n.hasClass("fixed") && window.innerWidth > 992 && n.css("transform", "translateX(0)"), n.hasClass("fixed") && t(window).resize(function() {
                    window.innerWidth > 992 ? 0 != t("#sidenav-overlay").length && r ? o(!0) : n.css("transform", "translateX(0%)") : r===!1 && ("left" === e.edge ? n.css("transform", "translateX(-100%)") : n.css("transform", "translateX(100%)"))
                }), e.closeOnClick===!0 && n.on("click.itemclick", "a:not(.collapsible-header)", function() {
                    o()
                });
                var s=!1, r=!1;
                a.on("click", function() {
                    o()
                }), a.hammer({
                    prevent_default: !1
                }).bind("pan", function(i) {
                    if ("touch" == i.gesture.pointerType) {
                        var s = (i.gesture.direction, i.gesture.center.x), u = (i.gesture.center.y, i.gesture.velocityX, t("body")), h = u.innerWidth();
                        if (u.css("overflow", "hidden"), u.width(h), 0 === t("#sidenav-overlay").length) {
                            var f = t('<div id="sidenav-overlay"></div>');
                            f.css("opacity", 0).click(function() {
                                o()
                            }), t("body").append(f)
                        }
                        if ("left" === e.edge && (s > e.menuWidth ? s = e.menuWidth : 0 > s && (s = 0)), "left" === e.edge)
                            s < e.menuWidth / 2 ? r=!1 : s >= e.menuWidth / 2 && (r=!0), n.css("transform", "translateX(" + (s - e.menuWidth) + "px)");
                        else {
                            s < window.innerWidth - e.menuWidth / 2 ? r=!0 : s >= window.innerWidth - e.menuWidth / 2 && (r=!1);
                            var d = s - e.menuWidth / 2;
                            0 > d && (d = 0), n.css("transform", "translateX(" + d + "px)")
                        }
                        var p;
                        "left" === e.edge ? (p = s / e.menuWidth, t("#sidenav-overlay").velocity({
                            opacity: p
                        }, {
                            duration: 10,
                            queue: !1,
                            easing: "easeOutQuad"
                        })) : (p = Math.abs((s - window.innerWidth) / e.menuWidth), t("#sidenav-overlay").velocity({
                            opacity: p
                        }, {
                            duration: 10,
                            queue: !1,
                            easing: "easeOutQuad"
                        }))
                    }
                }).bind("panend", function(i) {
                    if ("touch" == i.gesture.pointerType) {
                        var o = i.gesture.velocityX, l = i.gesture.center.x, c = l - e.menuWidth, u = l - e.menuWidth / 2;
                        c > 0 && (c = 0), 0 > u && (u = 0), s=!1, "left" === e.edge ? r && .3 >= o||-.5 > o ? (0 != c && n.velocity({
                            translateX: [0, c]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), t("#sidenav-overlay").velocity({
                            opacity: 1
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a.css({
                            width: "50%",
                            right: 0,
                            left: ""
                        })) : (!r || o > .3) && (t("body").css({
                            overflow: "",
                            width: ""
                        }), n.velocity({
                            translateX: [ - 1 * e.menuWidth - 10, c]
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), t("#sidenav-overlay").velocity({
                            opacity: 0
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                t(this).remove()
                            }
                        }), a.css({
                            width: "10px",
                            right: "",
                            left: 0
                        })) : r && o>=-.3 || o > .5 ? (n.velocity({
                            translateX: [0, u]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), t("#sidenav-overlay").velocity({
                            opacity: 1
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a.css({
                            width: "50%",
                            right: "",
                            left: 0
                        })) : (!r||-.3 > o) && (t("body").css({
                            overflow: "",
                            width: ""
                        }), n.velocity({
                            translateX: [e.menuWidth + 10, u]
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), t("#sidenav-overlay").velocity({
                            opacity: 0
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                t(this).remove()
                            }
                        }), a.css({
                            width: "10px",
                            right: 0,
                            left: ""
                        }))
                    }
                }), i.click(function() {
                    if (r===!0)
                        r=!1, s=!1, o();
                    else {
                        var i = t("body"), l = i.innerWidth();
                        i.css("overflow", "hidden"), i.width(l), t("body").append(a), "left" === e.edge ? (a.css({
                            width: "50%",
                            right: 0,
                            left: ""
                        }), n.velocity({
                            translateX: [0, - 1 * e.menuWidth]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        })) : (a.css({
                            width: "50%",
                            right: "",
                            left: 0
                        }), n.velocity({
                            translateX: [0, e.menuWidth]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }));
                        var c = t('<div id="sidenav-overlay"></div>');
                        c.css("opacity", 0).click(function() {
                            r=!1, s=!1, o(), c.velocity({
                                opacity: 0
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function() {
                                    t(this).remove()
                                }
                            })
                        }), t("body").append(c), c.velocity({
                            opacity: 1
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                r=!0, s=!1
                            }
                        })
                    }
                    return !1
                })
            })
        },
        show: function() {
            this.trigger("click")
        },
        hide: function() {
            t("#sidenav-overlay").trigger("click")
        }
    };
    t.fn.sideNav = function(i) {
        return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sideNav") : e.init.apply(this, arguments)
    }
}(jQuery), function(t) {
    t.fn.collapsible = function(e) {
        var i = {
            accordion: void 0
        };
        return e = t.extend(i, e), this.each(function() {
            function o(e) {
                n = i.find("> li > .collapsible-header"), e.hasClass("active") ? e.parent().addClass("active") : e.parent().removeClass("active"), e.parent().hasClass("active") ? e.siblings(".collapsible-body").stop(!0, !1).slideDown({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                }) : e.siblings(".collapsible-body").stop(!0, !1).slideUp({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                }), n.not(e).removeClass("active").parent().removeClass("active"), n.not(e).parent().children(".collapsible-body").stop(!0, !1).slideUp({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                })
            }
            function s(e) {
                e.hasClass("active") ? e.parent().addClass("active") : e.parent().removeClass("active"), e.parent().hasClass("active") ? e.siblings(".collapsible-body").stop(!0, !1).slideDown({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                }) : e.siblings(".collapsible-body").stop(!0, !1).slideUp({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                })
            }
            function r(t) {
                var e = l(t);
                return e.length > 0
            }
            function l(t) {
                return t.closest("li > .collapsible-header")
            }
            var i = t(this), n = t(this).find("> li > .collapsible-header"), a = i.data("collapsible");
            i.off("click.collapse", ".collapsible-header"), n.off("click.collapse"), e.accordion || "accordion" === a || void 0 === a ? (n = i.find("> li > .collapsible-header"), n.on("click.collapse", function(e) {
                var i = t(e.target);
                r(i) && (i = l(i)), i.toggleClass("active"), o(i)
            }), o(n.filter(".active").first())) : n.each(function() {
                t(this).on("click.collapse", function(e) {
                    var i = t(e.target);
                    r(i) && (i = l(i)), i.toggleClass("active"), s(i)
                }), t(this).hasClass("active") && s(t(this))
            })
        })
    }, t(document).ready(function() {
        t(".collapsible").collapsible()
    })
}(jQuery), function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(this, function(t) {
    var e = function(t, e) {
        var i, n = document.createElement("canvas");
        t.appendChild(n), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(n);
        var a = n.getContext("2d");
        n.width = n.height = e.size;
        var o = 1;
        window.devicePixelRatio > 1 && (o = window.devicePixelRatio, n.style.width = n.style.height = [e.size, "px"].join(""), n.width = n.height = e.size * o, a.scale(o, o)), a.translate(e.size / 2, e.size / 2), a.rotate(( - 0.5 + e.rotate / 180) * Math.PI);
        var s = (e.size - e.lineWidth) / 2;
        e.scaleColor && e.scaleLength && (s -= e.scaleLength + 2), Date.now = Date.now || function() {
            return + new Date
        };
        var r = function(t, e, i) {
            i = Math.min(Math.max( - 1, i || 0), 1);
            var n = 0 >= i?!0 : !1;
            a.beginPath(), a.arc(0, 0, s, 0, 2 * Math.PI * i, n), a.strokeStyle = t, a.lineWidth = e, a.stroke()
        }, l = function() {
            var t, i;
            a.lineWidth = 1, a.fillStyle = e.scaleColor, a.save();
            for (var n = 24; n > 0; --n)
                n%6 === 0 ? (i = e.scaleLength, t = 0) : (i = .6 * e.scaleLength, t = e.scaleLength - i), a.fillRect( - e.size / 2 + t, 0, i, 1), a.rotate(Math.PI / 12);
            a.restore()
        }, c = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                window.setTimeout(t, 1e3 / 60)
            }
        }(), u = function() {
            e.scaleColor && l(), e.trackColor && r(e.trackColor, e.trackWidth || e.lineWidth, 1)
        };
        this.getCanvas = function() {
            return n
        }, this.getCtx = function() {
            return a
        }, this.clear = function() {
            a.clearRect(e.size/-2, e.size/-2, e.size, e.size)
        }, this.draw = function(t) {
            e.scaleColor || e.trackColor ? a.getImageData && a.putImageData ? i ? a.putImageData(i, 0, 0) : (u(), i = a.getImageData(0, 0, e.size * o, e.size * o)) : (this.clear(), u()) : this.clear(), a.lineCap = e.lineCap;
            var n;
            n = "function" == typeof e.barColor ? e.barColor(t) : e.barColor, r(n, e.lineWidth, t / 100)
        }.bind(this), this.animate = function(t, i) {
            var n = Date.now();
            e.onStart(t, i);
            var a = function() {
                var o = Math.min(Date.now() - n, e.animate.duration), s = e.easing(this, o, t, i - t, e.animate.duration);
                this.draw(s), e.onStep(t, i, s), o >= e.animate.duration ? e.onStop(t, i) : c(a)
            }.bind(this);
            c(a)
        }.bind(this)
    }, i = function(t, i) {
        var n = {
            barColor: "#ef1e25",
            trackColor: "#f9f9f9",
            scaleColor: "#dfe0e0",
            scaleLength: 5,
            lineCap: "round",
            lineWidth: 3,
            trackWidth: void 0,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1e3,
                enabled: !0
            }, easing : function(t, e, i, n, a) {
                return e/=a / 2, 1 > e ? n / 2 * e * e + i : - n / 2 * (--e * (e - 2) - 1) + i
            }, onStart: function(t, e) {}, onStep: function(t, e, i) {}, onStop: function(t, e) {}
        };
        if ("undefined" != typeof e)
            n.renderer = e;
        else {
            if ("undefined" == typeof SVGRenderer)
                throw new Error("Please load either the SVG- or the CanvasRenderer");
            n.renderer = SVGRenderer
        }
        var a = {}, o = 0, s = function() {
            this.el = t, this.options = a;
            for (var e in n)
                n.hasOwnProperty(e) && (a[e] = i && "undefined" != typeof i[e] ? i[e] : n[e], "function" == typeof a[e] && (a[e] = a[e].bind(this)));
            "string" == typeof a.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[a.easing]) ? a.easing = jQuery.easing[a.easing] : a.easing = n.easing, "number" == typeof a.animate && (a.animate = {
                duration: a.animate,
                enabled: !0
            }), "boolean" != typeof a.animate || a.animate || (a.animate = {
                duration: 1e3,
                enabled: a.animate
            }), this.renderer = new a.renderer(t, a), this.renderer.draw(o), t.dataset && t.dataset.percent ? this.update(parseFloat(t.dataset.percent)) : t.getAttribute && t.getAttribute("data-percent") && this.update(parseFloat(t.getAttribute("data-percent")))
        }.bind(this);
        this.update = function(t) {
            return t = parseFloat(t), a.animate.enabled ? this.renderer.animate(o, t) : this.renderer.draw(t), o = t, this
        }.bind(this), this.disableAnimation = function() {
            return a.animate.enabled=!1, this
        }, this.enableAnimation = function() {
            return a.animate.enabled=!0, this
        }, s()
    }; t.fn.easyPieChart = function(e) {
        return this.each(function() {
            var n;
            t.data(this, "easyPieChart") || (n = t.extend({}, e, t(this).data()), t.data(this, "easyPieChart", new i(this, n)))
        })
    }
}), $(function() {
    var t=!0;
    $("#accordion").on("show.bs.collapse", function() {
        t && $("#accordion .in").collapse("hide")
    })
}), function(t) {
    t(document).ready(function() {
        function a(e) {
            var n = e.css("font-family"), a = e.css("font-size");
            a && i.css("font-size", a), n && i.css("font-family", n), "off" === e.attr("wrap") && i.css("overflow-wrap", "normal").css("white-space", "pre"), i.text(e.val() + "\n");
            var o = i.html().replace(/\n/g, "<br>");
            i.html(o), e.is(":visible") ? i.css("width", e.width()) : i.css("width", t(window).width() / 2), e.css("height", i.height())
        }
        Materialize.updateTextFields = function() {
            var e = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
            t(e).each(function(e, i) {
                t(i).val().length > 0 || i.autofocus || void 0 !== t(this).attr("placeholder") || t(i)[0].validity.badInput===!0 ? t(this).siblings("label, i").addClass("active") : t(this).siblings("label, i").removeClass("active")
            })
        };
        var e = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
        t(document).on("change", e, function() {
            (0 !== t(this).val().length || void 0 !== t(this).attr("placeholder")) && t(this).siblings("label").addClass("active"), validate_field(t(this))
        }), t(document).ready(function() {
            Materialize.updateTextFields()
        }), t(document).on("reset", function(i) {
            var n = t(i.target);
            n.is("form") && (n.find(e).removeClass("valid").removeClass("invalid"), n.find(e).each(function() {
                "" === t(this).attr("value") && t(this).siblings("label, i").removeClass("active")
            }), n.find("select.initialized").each(function() {
                var t = n.find("option[selected]").text();
                n.siblings("input.select-dropdown").val(t)
            }))
        }), t(document).on("focus", e, function() {
            t(this).siblings("label, i").addClass("active")
        }), t(document).on("blur", e, function() {
            var e = t(this);
            0 === e.val().length && e[0].validity.badInput!==!0 && void 0 === e.attr("placeholder") && e.siblings("label, i").removeClass("active"), 0 === e.val().length && e[0].validity.badInput!==!0 && void 0 !== e.attr("placeholder") && e.siblings("i").removeClass("active"), validate_field(e)
        }), window.validate_field = function(t) {
            var e = void 0 !== t.attr("length"), i = parseInt(t.attr("length")), n = t.val().length;
            0 === t.val().length && t[0].validity.badInput===!1 ? t.hasClass("validate") && (t.removeClass("valid"), t.removeClass("invalid")) : t.hasClass("validate") && (t.is(":valid") && e && i >= n || t.is(":valid")&&!e ? (t.removeClass("invalid"), t.addClass("valid")) : (t.removeClass("valid"), t.addClass("invalid")))
        };
        var i = t(".hiddendiv").first();
        i.length || (i = t('<div class="hiddendiv common"></div>'), t("body").append(i));
        var n = ".materialize-textarea";
        t(n).each(function() {
            var e = t(this);
            e.val().length && a(e)
        }), t("body").on("keyup keydown autoresize", n, function() {
            a(t(this))
        }), t(document).on("change", '.file-field input[type="file"]', function() {
            for (var e = t(this).closest(".file-field"), i = e.find("input.file-path"), n = t(this)[0].files, a = [], o = 0; o < n.length; o++)
                a.push(n[o].name);
            i.val(a.join(", ")), i.trigger("change")
        });
        var r, o = "input[type=range]", s=!1;
        t(o).each(function() {
            var e = t('<span class="thumb"><span class="value"></span></span>');
            t(this).after(e)
        });
        var l = ".range-field";
        t(document).on("change", o, function(e) {
            var i = t(this).siblings(".thumb");
            i.find(".value").html(t(this).val())
        }), t(document).on("input mousedown touchstart", o, function(e) {
            var i = t(this).siblings(".thumb"), n = t(this).outerWidth();
            i.length <= 0 && (i = t('<span class="thumb"><span class="value"></span></span>'), t(this).after(i)), i.find(".value").html(t(this).val()), s=!0, t(this).addClass("active"), i.hasClass("active") || i.velocity({
                height: "30px",
                width: "30px",
                top: "-20px",
                marginLeft: "-15px"
            }, {
                duration: 300,
                easing: "easeOutExpo"
            }), "input" !== e.type && (r = void 0 === e.pageX || null === e.pageX ? e.originalEvent.touches[0].pageX - t(this).offset().left : e.pageX - t(this).offset().left, 0 > r ? r = 0 : r > n && (r = n), i.addClass("active").css("left", r)), i.find(".value").html(t(this).val())
        }), t(document).on("mouseup touchend", l, function() {
            s=!1, t(this).removeClass("active")
        }), t(document).on("mousemove touchmove", l, function(e) {
            var n, i = t(this).children(".thumb");
            if (s) {
                i.hasClass("active") || i.velocity({
                    height: "30px",
                    width: "30px",
                    top: "-20px",
                    marginLeft: "-15px"
                }, {
                    duration: 300,
                    easing: "easeOutExpo"
                }), n = void 0 === e.pageX || null === e.pageX ? e.originalEvent.touches[0].pageX - t(this).offset().left : e.pageX - t(this).offset().left;
                var a = t(this).outerWidth();
                0 > n ? n = 0 : n > a && (n = a), i.addClass("active").css("left", n), i.find(".value").html(i.siblings(o).val())
            }
        }), t(document).on("mouseout touchleave", l, function() {
            if (!s) {
                var e = t(this).children(".thumb");
                e.hasClass("active") && e.velocity({
                    height: "0",
                    width: "0",
                    top: "10px",
                    marginLeft: "-6px"
                }, {
                    duration: 100
                }), e.removeClass("active")
            }
        })
    }), t.fn.material_select = function(e) {
        function i(t, e, i) {
            var a = t.indexOf(e), o =- 1 === a;
            return o ? t.push(e) : t.splice(a, 1), i.siblings("ul.dropdown-content").find("li").eq(e).toggleClass("active"), i.find("option").eq(e).prop("selected", o), n(t, i), o
        }
        function n(t, e) {
            for (var i = "", n = 0, a = t.length; a > n; n++) {
                var o = e.find("option").eq(t[n]).text();
                i += 0 === n ? o : ", " + o
            }
            "" === i && (i = e.find("option:disabled").eq(0).text()), e.siblings("input.select-dropdown").val(i)
        }
        t(this).each(function() {
            var n = t(this);
            if (!n.hasClass("browser-default")) {
                var a = n.attr("multiple")?!0 : !1, o = n.data("select-id");
                if (o && (n.parent().find("span.caret").remove(), n.parent().find("input").remove(), n.unwrap(), t("ul#select-options-" + o).remove()), "destroy" === e)
                    return void n.data("select-id", null).removeClass("initialized");
                var s = Materialize.guid();
                n.data("select-id", s);
                var r = t('<div class="select-wrapper"></div>');
                r.addClass(n.attr("class"));
                var l = t('<ul id="select-options-' + s + '" class="dropdown-content select-dropdown ' + (a ? "multiple-select-dropdown" : "") + '"></ul>'), c = n.children("option, optgroup"), u = [], h=!1, f = n.find("option:selected").html() || n.find("option:first").html() || "", d = function(e, i, n) {
                    var a = i.is(":disabled") ? "disabled ": "", o = i.data("icon"), s = i.attr("class");
                    if (o) {
                        var r = "";
                        return s && (r = ' class="' + s + '"'), "multiple" === n ? l.append(t('<li class="' + a + '"><img src="' + o + '"' + r + '><span><input type="checkbox"' + a + "/><label></label>" + i.html() + "</span></li>")) : l.append(t('<li class="' + a + '"><img src="' + o + '"' + r + "><span>" + i.html() + "</span></li>")), !0
                    }
                    "multiple" === n ? l.append(t('<li class="' + a + '"><span><input type="checkbox"' + a + "/><label></label>" + i.html() + "</span></li>")) : l.append(t('<li class="' + a + '"><span>' + i.html() + "</span></li>"))
                };
                c.length && c.each(function() {
                    if (t(this).is("option"))
                        a ? d(n, t(this), "multiple") : d(n, t(this));
                    else if (t(this).is("optgroup")) {
                        var e = t(this).children("option");
                        l.append(t('<li class="optgroup"><span>' + t(this).attr("label") + "</span></li>")), e.each(function() {
                            d(n, t(this))
                        })
                    }
                }), l.find("li:not(.optgroup)").each(function(o) {
                    t(this).click(function(s) {
                        if (!t(this).hasClass("disabled")&&!t(this).hasClass("optgroup")) {
                            var r=!0;
                            a ? (t('input[type="checkbox"]', this).prop("checked", function(t, e) {
                                return !e
                            }), r = i(u, t(this).index(), n), v.trigger("focus")) : (l.find("li").removeClass("active"), t(this).toggleClass("active"), v.val(t(this).text())), activateOption(l, t(this)), n.find("option").eq(o).prop("selected", r), n.trigger("change"), "undefined" != typeof e && e()
                        }
                        s.stopPropagation()
                    })
                }), n.wrap(r);
                var p = t('<span class="caret">&#9660;</span>');
                n.is(":disabled") && p.addClass("disabled");
                var m = f.replace(/"/g, "&quot;"), v = t('<input type="text" class="select-dropdown" readonly="true" ' + (n.is(":disabled") ? "disabled" : "") + ' data-activates="select-options-' + s + '" value="' + m + '"/>');
                n.before(v), v.before(p), v.after(l), n.is(":disabled") || v.dropdown({
                    hover: !1,
                    closeOnClick: !1
                }), n.attr("tabindex") && t(v[0]).attr("tabindex", n.attr("tabindex")), n.addClass("initialized"), v.on({
                    focus: function() {
                        if (t("ul.select-dropdown").not(l[0]).is(":visible") && t("input.select-dropdown").trigger("close"), !l.is(":visible")) {
                            t(this).trigger("open", ["focus"]);
                            var e = t(this).val(), i = l.find("li").filter(function() {
                                return t(this).text().toLowerCase() === e.toLowerCase()
                            })[0];
                            activateOption(l, i)
                        }
                    },
                    click: function(t) {
                        t.stopPropagation()
                    }
                }), v.on("blur", function() {
                    a || t(this).trigger("close"), l.find("li.selected").removeClass("selected")
                }), l.hover(function() {
                    h=!0
                }, function() {
                    h=!1
                }), t(window).on({
                    click: function() {
                        a && (h || v.trigger("close"))
                    }
                }), a && n.find("option:selected:not(:disabled)").each(function() {
                    var e = t(this).index();
                    i(u, e, n), l.find("li").eq(e).find(":checkbox").prop("checked", !0)
                }), activateOption = function(e, i) {
                    if (i) {
                        e.find("li.selected").removeClass("selected");
                        var n = t(i);
                        n.addClass("selected"), l.scrollTo(n)
                    }
                };
                var g = [], y = function(e) {
                    if (9 == e.which)
                        return void v.trigger("close");
                    if (40 == e.which&&!l.is(":visible"))
                        return void v.trigger("open");
                    if (13 != e.which || l.is(":visible")) {
                        e.preventDefault();
                        var i = String.fromCharCode(e.which).toLowerCase(), n = [9, 13, 27, 38, 40];
                        if (i&&-1 === n.indexOf(e.which)) {
                            g.push(i);
                            var o = g.join(""), s = l.find("li").filter(function() {
                                return 0 === t(this).text().toLowerCase().indexOf(o)
                            })[0];
                            s && activateOption(l, s)
                        }
                        if (13 == e.which) {
                            var r = l.find("li.selected:not(.disabled)")[0];
                            r && (t(r).trigger("click"), a || v.trigger("close"))
                        }
                        40 == e.which && (s = l.find("li.selected").length ? l.find("li.selected").next("li:not(.disabled)")[0] : l.find("li:not(.disabled)")[0], activateOption(l, s)), 27 == e.which && v.trigger("close"), 38 == e.which && (s = l.find("li.selected").prev("li:not(.disabled)")[0], s && activateOption(l, s)), setTimeout(function() {
                            g = []
                        }, 1e3)
                    }
                };
                v.on("keydown", y)
            }
        })
    }
}(jQuery), function(t) {
    "function" == typeof define && define.amd ? define("picker", ["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : this.Picker = t(jQuery)
}(function(t) {
    function o(e, c, u, f) {
        function w() {
            return o._.node("div", o._.node("div", o._.node("div", o._.node("div", b.component.nodes(p.open), v.box), v.wrap), v.frame), v.holder, 'tabindex="-1"')
        }
        function x() {
            g.data(c, b).addClass(v.input).val(g.data("value") ? b.get("select", m.format) : e.value), m.editable || g.on("focus." + p.id + " click." + p.id, function(t) {
                t.preventDefault(), b.open()
            }).on("keydown." + p.id, A), l(e, {
                haspopup: !0,
                expanded: !1,
                readonly: !1,
                owns: e.id + "_root"
            })
        }
        function C() {
            l(b.$root[0], "hidden", !0)
        }
        function S() {
            b.$holder.on({
                keydown: A,
                "focus.toOpen": T,
                blur: function() {
                    g.removeClass(v.target)
                },
                focusin: function(t) {
                    b.$root.removeClass(v.focused), t.stopPropagation()
                },
                "mousedown click": function(e) {
                    var i = e.target;
                    i != b.$holder[0] && (e.stopPropagation(), "mousedown" != e.type || t(i).is("input, select, textarea, button, option") || (e.preventDefault(), b.$holder[0].focus()))
                }
            }).on("click", "[data-pick], [data-nav], [data-clear], [data-close]", function() {
                var e = t(this), i = e.data(), n = e.hasClass(v.navDisabled) || e.hasClass(v.disabled), a = h();
                a = a && (a.type || a.href), (n || a&&!t.contains(b.$root[0], a)) && b.$holder[0].focus(), !n && i.nav ? b.set("highlight", b.component.item.highlight, {
                    nav: i.nav
                }) : !n && "pick"in i ? (b.set("select", i.pick), m.closeOnSelect && b.close(!0)) : i.clear ? (b.clear(), m.closeOnClear && b.close(!0)) : i.close && b.close(!0)
            })
        }
        function k() {
            var i;
            m.hiddenName===!0 ? (i = e.name, e.name = "") : (i = ["string" == typeof m.hiddenPrefix ? m.hiddenPrefix: "", "string" == typeof m.hiddenSuffix ? m.hiddenSuffix: "_submit"], i = i[0] + e.name + i[1]), b._hidden = t('<input type=hidden name="' + i + '"' + (g.data("value") || e.value ? ' value="' + b.get("select", m.formatSubmit) + '"' : "") + ">")[0], g.on("change." + p.id, function() {
                b._hidden.value = e.value ? b.get("select", m.formatSubmit) : ""
            })
        }
        function P() {
            d && a ? b.$holder.find("." + v.frame).one("transitionend", function() {
                b.$holder[0].focus()
            }) : b.$holder[0].focus()
        }
        function T(t) {
            t.stopPropagation(), g.addClass(v.target), b.$root.addClass(v.focused), b.open()
        }
        function A(t) {
            var e = t.keyCode, i = /^(8|46)$/.test(e);
            return 27 == e ? (b.close(!0), !1) : void((32 == e || i ||!p.open && b.component.key[e]) && (t.preventDefault(), t.stopPropagation(), i ? b.clear().close() : b.open()))
        }
        if (!e)
            return o;
        var d=!1, p = {
            id: e.id || "P" + Math.abs(~~(Math.random() * new Date))
        }, m = u ? t.extend(!0, {}, u.defaults, f) : f || {}, v = t.extend({}, o.klasses(), m.klass), g = t(e), y = function() {
            return this.start()
        }, b = y.prototype = {
            constructor: y,
            $node: g,
            start: function() {
                return p && p.start ? b : (p.methods = {}, p.start=!0, p.open=!1, p.type = e.type, e.autofocus = e == h(), e.readOnly=!m.editable, e.id = e.id || p.id, "text" != e.type && (e.type = "text"), b.component = new u(b, m), b.$root = t('<div class="' + v.picker + '" id="' + e.id + '_root" />'), C(), b.$holder = t(w()).appendTo(b.$root), S(), m.formatSubmit && k(), x(), m.containerHidden ? t(m.containerHidden).append(b._hidden) : g.after(b._hidden), m.container ? t(m.container).append(b.$root) : g.after(b.$root), b.on({
                    start: b.component.onStart,
                    render: b.component.onRender,
                    stop: b.component.onStop,
                    open: b.component.onOpen,
                    close: b.component.onClose,
                    set: b.component.onSet
                }).on({
                    start: m.onStart,
                    render: m.onRender,
                    stop: m.onStop,
                    open: m.onOpen,
                    close: m.onClose,
                    set: m.onSet
                }), d = s(b.$holder[0]), e.autofocus && b.open(), b.trigger("start").trigger("render"))
            },
            render: function(e) {
                return e ? (b.$holder = t(w()), S(), b.$root.html(b.$holder)) : b.$root.find("." + v.box).html(b.component.nodes(p.open)), b.trigger("render")
            },
            stop: function() {
                return p.start ? (b.close(), b._hidden && b._hidden.parentNode.removeChild(b._hidden), b.$root.remove(), g.removeClass(v.input).removeData(c), setTimeout(function() {
                    g.off("." + p.id)
                }, 0), e.type = p.type, e.readOnly=!1, b.trigger("stop"), p.methods = {}, p.start=!1, b) : b
            },
            open: function(a) {
                return p.open ? b : (g.addClass(v.active), l(e, "expanded", !0), setTimeout(function() {
                    b.$root.addClass(v.opened), l(b.$root[0], "hidden", !1)
                }, 0), a!==!1 && (p.open=!0, d && n.css("overflow", "hidden").css("padding-right", "+=" + r()), P(), i.on("click." + p.id + " focusin." + p.id, function(t) {
                    var i = t.target;
                    i != e && i != document && 3 != t.which && b.close(i === b.$holder[0])
                }).on("keydown." + p.id, function(e) {
                    var i = e.keyCode, n = b.component.key[i], a = e.target;
                    27 == i ? b.close(!0) : a != b.$holder[0] ||!n && 13 != i ? t.contains(b.$root[0], a) && 13 == i && (e.preventDefault(), a.click()) : (e.preventDefault(), n ? o._.trigger(b.component.key.go, b, [o._.trigger(n)]) : b.$root.find("." + v.highlighted).hasClass(v.disabled) || (b.set("select", b.component.item.highlight), m.closeOnSelect && b.close(!0)))
                })), b.trigger("open"))
            },
            close: function(t) {
                return t && (m.editable ? e.focus() : (b.$holder.off("focus.toOpen").focus(), setTimeout(function() {
                    b.$holder.on("focus.toOpen", T)
                }, 0))), g.removeClass(v.active), l(e, "expanded", !1), setTimeout(function() {
                    b.$root.removeClass(v.opened + " " + v.focused), l(b.$root[0], "hidden", !0)
                }, 0), p.open ? (p.open=!1, d && n.css("overflow", "").css("padding-right", "-=" + r()), i.off("." + p.id), b.trigger("close")) : b
            },
            clear: function(t) {
                return b.set("clear", null, t)
            },
            set: function(e, i, n) {
                var a, o, s = t.isPlainObject(e), r = s ? e: {};
                if (n = s && t.isPlainObject(i) ? i : n || {}, e) {
                    s || (r[e] = i);
                    for (a in r)
                        o = r[a], a in b.component.item && (void 0 === o && (o = null), b.component.set(a, o, n)), ("select" == a || "clear" == a) && g.val("clear" == a ? "" : b.get(a, m.format)).trigger("change");
                    b.render()
                }
                return n.muted ? b : b.trigger("set", r)
            },
            get: function(t, i) {
                if (t = t || "value", null != p[t])
                    return p[t];
                if ("valueSubmit" == t) {
                    if (b._hidden)
                        return b._hidden.value;
                    t = "value"
                }
                if ("value" == t)
                    return e.value;
                if (t in b.component.item) {
                    if ("string" == typeof i) {
                        var n = b.component.get(t);
                        return n ? o._.trigger(b.component.formats.toString, b.component, [i, n]) : ""
                    }
                    return b.component.get(t)
                }
            },
            on: function(e, i, n) {
                var a, o, s = t.isPlainObject(e), r = s ? e: {};
                if (e) {
                    s || (r[e] = i);
                    for (a in r)
                        o = r[a], n && (a = "_" + a), p.methods[a] = p.methods[a] || [], p.methods[a].push(o)
                }
                return b
            },
            off: function() {
                var t, e, i = arguments;
                for (t = 0, namesCount = i.length; t < namesCount; t += 1)
                    e = i[t], e in p.methods && delete p.methods[e];
                return b
            },
            trigger: function(t, e) {
                var i = function(t) {
                    var i = p.methods[t];
                    i && i.map(function(t) {
                        o._.trigger(t, b, [e])
                    })
                };
                return i("_" + t), i(t), b
            }
        };
        return new y
    }
    function s(t) {
        var e, i = "position";
        return t.currentStyle ? e = t.currentStyle[i] : window.getComputedStyle && (e = getComputedStyle(t)[i]), "fixed" == e
    }
    function r() {
        if (n.height() <= e.height())
            return 0;
        var i = t('<div style="visibility:hidden;width:100px" />').appendTo("body"), a = i[0].offsetWidth;
        i.css("overflow", "scroll");
        var o = t('<div style="width:100%" />').appendTo(i), s = o[0].offsetWidth;
        return i.remove(), a - s
    }
    function l(e, i, n) {
        if (t.isPlainObject(i))
            for (var a in i)
                c(e, a, i[a]);
        else
            c(e, i, n)
    }
    function c(t, e, i) {
        t.setAttribute(("role" == e ? "" : "aria-") + e, i)
    }
    function u(e, i) {
        t.isPlainObject(e) || (e = {
            attribute: i
        }), i = "";
        for (var n in e) {
            var a = ("role" == n ? "" : "aria-") + n, o = e[n];
            i += null == o ? "" : a + '="' + e[n] + '"'
        }
        return i
    }
    function h() {
        try {
            return document.activeElement
        } catch (t) {}
    }
    var e = t(window), i = t(document), n = t(document.documentElement), a = null != document.documentElement.style.transition;
    return o.klasses = function(t) {
        return t = t || "picker", {
            picker: t,
            opened: t + "--opened",
            focused: t + "--focused",
            input: t + "__input",
            active: t + "__input--active",
            target: t + "__input--target",
            holder: t + "__holder",
            frame: t + "__frame",
            wrap: t + "__wrap",
            box: t + "__box"
        }
    }, o._ = {
        group: function(t) {
            for (var e, i = "", n = o._.trigger(t.min, t); n <= o._.trigger(t.max, t, [n]); n += t.i)
                e = o._.trigger(t.item, t, [n]), i += o._.node(t.node, e[0], e[1], e[2]);
            return i
        },
        node: function(e, i, n, a) {
            return i ? (i = t.isArray(i) ? i.join("") : i, n = n ? ' class="' + n + '"' : "", a = a ? " " + a : "", "<" + e + n + a + ">" + i + "</" + e + ">") : ""
        },
        lead: function(t) {
            return (10 > t ? "0" : "") + t
        },
        trigger: function(t, e, i) {
            return "function" == typeof t ? t.apply(e, i || []) : t
        },
        digits: function(t) {
            return /\d/.test(t[1]) ? 2 : 1
        },
        isDate: function(t) {
            return {}.toString.call(t).indexOf("Date")>-1 && this.isInteger(t.getDate())
        },
        isInteger: function(t) {
            return {}.toString.call(t).indexOf("Number")>-1 && t%1 === 0
        },
        ariaAttr: u
    }, o.extend = function(e, i) {
        t.fn[e] = function(n, a) {
            var s = this.data(e);
            return "picker" == n ? s : s && "string" == typeof n ? o._.trigger(s[n], s, [a]) : this.each(function() {
                var a = t(this);
                a.data(e) || new o(this, e, i, n)
            })
        }, t.fn[e].defaults = i.defaults
    }, o
}), function(t) {
    "function" == typeof define && define.amd ? define(["picker", "jquery"], t) : "object" == typeof exports ? module.exports = t(require("./picker.js"), require("jquery")) : t(Picker, jQuery)
}(function(t, e) {
    function o(t, e) {
        var i = this, n = t.$node[0], a = n.value, o = t.$node.data("value"), s = o || a, r = o ? e.formatSubmit: e.format, l = function() {
            return n.currentStyle ? "rtl" == n.currentStyle.direction : "rtl" == getComputedStyle(t.$root[0]).direction
        };
        i.settings = e, i.$node = t.$node, i.queue = {
            min: "measure create",
            max: "measure create",
            now: "now create",
            select: "parse create validate",
            highlight: "parse navigate create validate",
            view: "parse create validate viewset",
            disable: "deactivate",
            enable: "activate"
        }, i.item = {}, i.item.clear = null, i.item.disable = (e.disable || []).slice(0), i.item.enable =- function(t) {
            return t[0]===!0 ? t.shift() : - 1
        }(i.item.disable), i.set("min", e.min).set("max", e.max).set("now"), s ? i.set("select", s, {
            format: r,
            defaultValue: !0
        }) : i.set("select", null).set("highlight", i.item.now), i.key = {
            40: 7,
            38: - 7,
            39: function() {
                return l()?-1 : 1
            },
            37: function() {
                return l() ? 1 : - 1
            },
            go: function(t) {
                var e = i.item.highlight, n = new Date(e.year, e.month, e.date + t);
                i.set("highlight", n, {
                    interval: t
                }), this.render()
            }
        }, t.on("render", function() {
            t.$root.find("." + e.klass.selectMonth).on("change", function() {
                var i = this.value;
                i && (t.set("highlight", [t.get("view").year, i, t.get("highlight").date]), t.$root.find("." + e.klass.selectMonth).trigger("focus"))
            }), t.$root.find("." + e.klass.selectYear).on("change", function() {
                var i = this.value;
                i && (t.set("highlight", [i, t.get("view").month, t.get("highlight").date]), t.$root.find("." + e.klass.selectYear).trigger("focus"))
            })
        }, 1).on("open", function() {
            var n = "";
            i.disabled(i.get("now")) && (n = ":not(." + e.klass.buttonToday + ")"), t.$root.find("button" + n + ", select").attr("disabled", !1)
        }, 1).on("close", function() {
            t.$root.find("button, select").attr("disabled", !0)
        }, 1)
    }
    var i = 7, n = 6, a = t._;
    o.prototype.set = function(t, e, i) {
        var n = this, a = n.item;
        return null === e ? ("clear" == t && (t = "select"), a[t] = e, n) : (a["enable" == t ? "disable": "flip" == t ? "enable": t] = n.queue[t].split(" ").map(function(a) {
            return e = n[a](t, e, i)
        }).pop(), "select" == t ? n.set("highlight", a.select, i) : "highlight" == t ? n.set("view", a.highlight, i) : t.match(/^(flip|min|max|disable|enable)$/) && (a.select && n.disabled(a.select) && n.set("select", a.select, i), a.highlight && n.disabled(a.highlight) && n.set("highlight", a.highlight, i)), n)
    }, o.prototype.get = function(t) {
        return this.item[t]
    }, o.prototype.create = function(t, i, n) {
        var o, s = this;
        return i = void 0 === i ? t : i, i==-(1 / 0) || i == 1 / 0 ? o = i : e.isPlainObject(i) && a.isInteger(i.pick) ? i = i.obj : e.isArray(i) ? (i = new Date(i[0], i[1], i[2]), i = a.isDate(i) ? i : s.create().obj) : i = a.isInteger(i) || a.isDate(i) ? s.normalize(new Date(i), n) : s.now(t, i, n), {
            year: o || i.getFullYear(),
            month: o || i.getMonth(),
            date: o || i.getDate(),
            day: o || i.getDay(),
            obj: o || i,
            pick: o || i.getTime()
        }
    }, o.prototype.createRange = function(t, i) {
        var n = this, o = function(t) {
            return t===!0 || e.isArray(t) || a.isDate(t) ? n.create(t) : t
        };
        return a.isInteger(t) || (t = o(t)), a.isInteger(i) || (i = o(i)), a.isInteger(t) && e.isPlainObject(i) ? t = [i.year, i.month, i.date + t] : a.isInteger(i) && e.isPlainObject(t) && (i = [t.year, t.month, t.date + i]), {
            from: o(t),
            to: o(i)
        }
    }, o.prototype.withinRange = function(t, e) {
        return t = this.createRange(t.from, t.to), e.pick >= t.from.pick && e.pick <= t.to.pick
    }, o.prototype.overlapRanges = function(t, e) {
        var i = this;
        return t = i.createRange(t.from, t.to), e = i.createRange(e.from, e.to), i.withinRange(t, e.from) || i.withinRange(t, e.to) || i.withinRange(e, t.from) || i.withinRange(e, t.to)
    }, o.prototype.now = function(t, e, i) {
        return e = new Date, i && i.rel && e.setDate(e.getDate() + i.rel), this.normalize(e, i)
    }, o.prototype.navigate = function(t, i, n) {
        var a, o, s, r, l = e.isArray(i), c = e.isPlainObject(i), u = this.item.view;
        if (l || c) {
            for (c ? (o = i.year, s = i.month, r = i.date) : (o =+ i[0], s =+ i[1], r =+ i[2]), n && n.nav && u && u.month !== s && (o = u.year, s = u.month), a = new Date(o, s + (n && n.nav ? n.nav : 0), 1), o = a.getFullYear(), s = a.getMonth(); new Date(o, s, r)
                .getMonth() !== s;
            )r -= 1;
            i = [o, s, r]
        }
        return i
    }, o.prototype.normalize = function(t) {
        return t.setHours(0, 0, 0, 0), t
    }, o.prototype.measure = function(t, e) {
        var i = this;
        return e ? "string" == typeof e ? e = i.parse(t, e) : a.isInteger(e) && (e = i.now(t, e, {
            rel: e
        })) : e = "min" == t?-(1 / 0) : 1 / 0, e
    }, o.prototype.viewset = function(t, e) {
        return this.create([e.year, e.month, 1])
    }, o.prototype.validate = function(t, i, n) {
        var c, u, d, p, o = this, s = i, r = n && n.interval ? n.interval: 1, l =- 1 === o.item.enable, h = o.item.min, f = o.item.max, m = l && o.item.disable.filter(function(t) {
            if (e.isArray(t)) {
                var n = o.create(t).pick;
                n < i.pick ? c=!0 : n > i.pick && (u=!0)
            }
            return a.isInteger(t)
        }).length;
        if ((!n ||!n.nav&&!n.defaultValue) && (!l && o.disabled(i) || l && o.disabled(i) && (m || c || u) ||!l && (i.pick <= h.pick || i.pick >= f.pick)))
            for (l&&!m && (!u && r > 0 ||!c && 0 > r) && (r*=-1); o.disabled(i) && (Math.abs(r) > 1 && (i.month < s.month || i.month > s.month) && (i = s, r = r > 0 ? 1 : - 1), i.pick <= h.pick ? (d=!0, r = 1, i = o.create([h.year, h.month, h.date + (i.pick === h.pick ? 0 : - 1)])) : i.pick >= f.pick && (p=!0, r =- 1, i = o.create([f.year, f.month, f.date + (i.pick === f.pick ? 0 : 1)])), !d ||!p);)
                i = o.create([i.year, i.month, i.date + r]);
        return i
    }, o.prototype.disabled = function(t) {
        var i = this, n = i.item.disable.filter(function(n) {
            return a.isInteger(n) ? t.day === (i.settings.firstDay ? n : n - 1)%7 : e.isArray(n) || a.isDate(n) ? t.pick === i.create(n).pick : e.isPlainObject(n) ? i.withinRange(n, t) : void 0
        });
        return n = n.length&&!n.filter(function(t) {
            return e.isArray(t) && "inverted" == t[3] || e.isPlainObject(t) && t.inverted
        }).length, - 1 === i.item.enable?!n : n || t.pick < i.item.min.pick || t.pick > i.item.max.pick
    }, o.prototype.parse = function(t, e, i) {
        var n = this, o = {};
        return e && "string" == typeof e ? (i && i.format || (i = i || {}, i.format = n.settings.format), n.formats.toArray(i.format).map(function(t) {
            var i = n.formats[t], s = i ? a.trigger(i, n, [e, o]): t.replace(/^!/, "").length;
            i && (o[t] = e.substr(0, s)), e = e.substr(s)
        }), [o.yyyy || o.yy, + (o.mm || o.m) - 1, o.dd || o.d]) : e
    }, o.prototype.formats = function() {
        function t(t, e, i) {
            var n = t.match(/[^\x00-\x7F]+|\w+/)[0];
            return i.mm || i.m || (i.m = e.indexOf(n) + 1), n.length
        }
        function e(t) {
            return t.match(/\w+/)[0].length
        }
        return {
            d: function(t, e) {
                return t ? a.digits(t) : e.date
            },
            dd: function(t, e) {
                return t ? 2 : a.lead(e.date)
            },
            ddd: function(t, i) {
                return t ? e(t) : this.settings.weekdaysShort[i.day]
            },
            dddd: function(t, i) {
                return t ? e(t) : this.settings.weekdaysFull[i.day]
            },
            m: function(t, e) {
                return t ? a.digits(t) : e.month + 1
            },
            mm: function(t, e) {
                return t ? 2 : a.lead(e.month + 1)
            },
            mmm: function(e, i) {
                var n = this.settings.monthsShort;
                return e ? t(e, n, i) : n[i.month]
            },
            mmmm: function(e, i) {
                var n = this.settings.monthsFull;
                return e ? t(e, n, i) : n[i.month]
            },
            yy: function(t, e) {
                return t ? 2 : ("" + e.year).slice(2)
            },
            yyyy: function(t, e) {
                return t ? 4 : e.year
            },
            toArray: function(t) {
                return t.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)
            },
            toString: function(t, e) {
                var i = this;
                return i.formats.toArray(t).map(function(t) {
                    return a.trigger(i.formats[t], i, [0, e]) || t.replace(/^!/, "")
                }).join("")
            }
        }
    }(), o.prototype.isDateExact = function(t, i) {
        var n = this;
        return a.isInteger(t) && a.isInteger(i) || "boolean" == typeof t && "boolean" == typeof i ? t === i : (a.isDate(t) || e.isArray(t)) && (a.isDate(i) || e.isArray(i)) ? n.create(t).pick === n.create(i).pick : e.isPlainObject(t) && e.isPlainObject(i) ? n.isDateExact(t.from, i.from) && n.isDateExact(t.to, i.to) : !1
    }, o.prototype.isDateOverlap = function(t, i) {
        var n = this, o = n.settings.firstDay ? 1: 0;
        return a.isInteger(t) && (a.isDate(i) || e.isArray(i)) ? (t = t%7 + o, t === n.create(i).day + 1) : a.isInteger(i) && (a.isDate(t) || e.isArray(t)) ? (i = i%7 + o, i === n.create(t).day + 1) : e.isPlainObject(t) && e.isPlainObject(i) ? n.overlapRanges(t, i) : !1
    }, o.prototype.flipEnable = function(t) {
        var e = this.item;
        e.enable = t || ( - 1 == e.enable ? 1 : - 1)
    }, o.prototype.deactivate = function(t, i) {
        var n = this, o = n.item.disable.slice(0);
        return "flip" == i ? n.flipEnable() : i===!1 ? (n.flipEnable(1), o = []) : i===!0 ? (n.flipEnable( - 1), o = []) : i.map(function(t) {
            for (var i, s = 0; s < o.length; s += 1)
                if (n.isDateExact(t, o[s])) {
                    i=!0;
                    break
                }
            i || (a.isInteger(t) || a.isDate(t) || e.isArray(t) || e.isPlainObject(t) && t.from && t.to) && o.push(t)
        }), o
    }, o.prototype.activate = function(t, i) {
        var n = this, o = n.item.disable, s = o.length;
        return "flip" == i ? n.flipEnable() : i===!0 ? (n.flipEnable(1), o = []) : i===!1 ? (n.flipEnable( - 1), o = []) : i.map(function(t) {
            var i, r, l, c;
            for (l = 0; s > l; l += 1) {
                if (r = o[l], n.isDateExact(r, t)) {
                    i = o[l] = null, c=!0;
                    break
                }
                if (n.isDateOverlap(r, t)) {
                    e.isPlainObject(t) ? (t.inverted=!0, i = t) : e.isArray(t) ? (i = t, i[3] || i.push("inverted")) : a.isDate(t) && (i = [t.getFullYear(), t.getMonth(), t.getDate(), "inverted"]);
                    break
                }
            }
            if (i)
                for (l = 0; s > l; l += 1)
                    if (n.isDateExact(o[l], t)) {
                        o[l] = null;
                        break
                    }
            if (c)
                for (l = 0; s > l; l += 1)
                    if (n.isDateOverlap(o[l], t)) {
                        o[l] = null;
                        break
                    }
            i && o.push(i)
        }), o.filter(function(t) {
            return null != t
        })
    }, o.prototype.nodes = function(t) {
        var e = this, o = e.settings, s = e.item, r = s.now, l = s.select, c = s.highlight, u = s.view, h = s.disable, f = s.min, d = s.max, p = function(t, e) {
            return o.firstDay && (t.push(t.shift()), e.push(e.shift())), a.node("thead", a.node("tr", a.group({
                min: 0,
                max: i - 1,
                i: 1,
                node: "th",
                item: function(i) {
                    return [t[i], o.klass.weekdays, 'scope=col title="' + e[i] + '"']
                }
            })))
        }((o.showWeekdaysFull ? o.weekdaysFull : o.weekdaysShort).slice(0), o.weekdaysFull.slice(0)), m = function(t) {
            return a.node("div", " ", o.klass["nav" + (t ? "Next" : "Prev")] + (t && u.year >= d.year && u.month >= d.month ||!t && u.year <= f.year && u.month <= f.month ? " " + o.klass.navDisabled : ""), "data-nav=" + (t||-1) + " " + a.ariaAttr({
                role: "button",
                controls: e.$node[0].id + "_table"
            }) + ' title="' + (t ? o.labelMonthNext : o.labelMonthPrev) + '"')
        }, v = function() {
            var i = o.showMonthsShort ? o.monthsShort: o.monthsFull;
            return o.selectMonths ? a.node("select", a.group({
                min: 0,
                max: 11,
                i: 1,
                node: "option",
                item: function(t) {
                    return [i[t], 0, "value=" + t + (u.month == t ? " selected" : "") + (u.year == f.year && t < f.month || u.year == d.year && t > d.month ? " disabled" : "")]
                }
            }), o.klass.selectMonth, (t ? "" : "disabled") + " " + a.ariaAttr({
                controls: e.$node[0].id + "_table"
            }) + ' title="' + o.labelMonthSelect + '"') : a.node("div", i[u.month], o.klass.month)
        }, g = function() {
            var i = u.year, n = o.selectYears===!0 ? 5: ~~(o.selectYears / 2);
            if (n) {
                var s = f.year, r = d.year, l = i - n, c = i + n;
                if (s > l && (c += s - l, l = s), c > r) {
                    var h = l - s, p = c - r;
                    l -= h > p ? p : h, c = r
                }
                return a.node("select", a.group({
                    min: l,
                    max: c,
                    i: 1,
                    node: "option",
                    item: function(t) {
                        return [t, 0, "value=" + t + (i == t ? " selected" : "")]
                    }
                }), o.klass.selectYear, (t ? "" : "disabled") + " " + a.ariaAttr({
                    controls: e.$node[0].id + "_table"
                }) + ' title="' + o.labelYearSelect + '"')
            }
            return a.node("div", i, o.klass.year)
        };
        return a.node("div", (o.selectYears ? g() + v() : v() + g()) + m() + m(1), o.klass.header) + a.node("table", p + a.node("tbody", a.group({
            min: 0,
            max: n - 1,
            i: 1,
            node: "tr",
            item: function(t) {
                var n = o.firstDay && 0 === e.create([u.year, u.month, 1]).day?-7 : 0;
                return [a.group({
                    min: i * t - u.day + n + 1,
                    max: function() {
                        return this.min + i - 1
                    },
                    i: 1,
                    node: "td",
                    item: function(t) {
                        t = e.create([u.year, u.month, t + (o.firstDay ? 1 : 0)]);
                        var i = l && l.pick == t.pick, n = c && c.pick == t.pick, s = h && e.disabled(t) || t.pick < f.pick || t.pick > d.pick, p = a.trigger(e.formats.toString, e, [o.format, t]);
                        return [a.node("div", t.date, function(e) {
                            return e.push(u.month == t.month ? o.klass.infocus : o.klass.outfocus), r.pick == t.pick && e.push(o.klass.now), i && e.push(o.klass.selected), n && e.push(o.klass.highlighted), s && e.push(o.klass.disabled), e.join(" ")
                        }([o.klass.day]), "data-pick=" + t.pick + " " + a.ariaAttr({
                            role: "gridcell",
                            label: p,
                            selected: i && e.$node.val() === p?!0: null,
                            activedescendant: n?!0: null,
                            disabled: s?!0: null
                        })), "", a.ariaAttr({
                            role: "presentation"
                        })]
                    }
                })]
            }
        })), o.klass.table, 'id="' + e.$node[0].id + '_table" ' + a.ariaAttr({
            role: "grid",
            controls: e.$node[0].id,
            readonly: !0
        })) + a.node("div", a.node("button", o.today, o.klass.buttonToday, "type=button data-pick=" + r.pick + (t&&!e.disabled(r) ? "" : " disabled") + " " + a.ariaAttr({
            controls: e.$node[0].id
        })) + a.node("button", o.clear, o.klass.buttonClear, "type=button data-clear=1" + (t ? "" : " disabled") + " " + a.ariaAttr({
            controls: e.$node[0].id
        })) + a.node("button", o.close, o.klass.buttonClose, "type=button data-close=true " + (t ? "" : " disabled") + " " + a.ariaAttr({
            controls: e.$node[0].id
        })), o.klass.footer)
    }, o.defaults = function(t) {
        return {
            labelMonthNext: "Next month",
            labelMonthPrev: "Previous month",
            labelMonthSelect: "Select a month",
            labelYearSelect: "Select a year",
            monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            today: "Today",
            clear: "Clear",
            close: "Close",
            closeOnSelect: !0,
            closeOnClear: !0,
            format: "d mmmm, yyyy",
            klass: {
                table: t + "table",
                header: t + "header",
                navPrev: t + "nav--prev",
                navNext: t + "nav--next",
                navDisabled: t + "nav--disabled",
                month: t + "month",
                year: t + "year",
                selectMonth: t + "select--month",
                selectYear: t + "select--year",
                weekdays: t + "weekday",
                day: t + "day",
                disabled: t + "day--disabled",
                selected: t + "day--selected",
                highlighted: t + "day--highlighted",
                now: t + "day--today",
                infocus: t + "day--infocus",
                outfocus: t + "day--outfocus",
                footer: t + "footer",
                buttonClear: t + "button--clear",
                buttonToday: t + "button--today",
                buttonClose: t + "button--close"
            }
        }
    }(t.klasses().picker + "__"), t.extend("pickadate", o)
}), $.extend($.fn.pickadate.defaults, {
    selectMonths: !0,
    selectYears: 15,
    onRender: function() {
        var t = this.$root, e = this.get("highlight", "yyyy"), i = this.get("highlight", "dd"), n = this.get("highlight", "mmm"), a = this.get("highlight", "dddd");
        t.find(".picker__header").prepend('<div class="picker__date-display"><div class="picker__weekday-display">' + a + '</div><div class="picker__month-display"><div>' + n + '</div></div><div class="picker__day-display"><div>' + i + '</div></div><div    class="picker__year-display"><div>' + e + "</div></div></div>")
    }
}), function() {
    function h(t) {
        return document.createElementNS(n, t)
    }
    function f(t) {
        return (10 > t ? "0" : "") + t
    }
    function p(t) {
        var e=++d + "";
        return t ? t + e : e
    }
    function C(e, n) {
        function W(t, e) {
            var o = s.offset(), r = /^touch/.test(t.type), u = o.left + m, h = o.top + m, f = (r ? t.originalEvent.touches[0] : t).pageX - u, d = (r ? t.originalEvent.touches[0] : t).pageY - h, p = Math.sqrt(f * f + d * d), g=!1;
            if (!e ||!(v - y > p || p > v + y)) {
                t.preventDefault();
                var b = setTimeout(function() {
                    E.popover.addClass("clockpicker-moving")
                }, 200);
                a && s.append(E.canvas), E.setHand(f, d, !e, !0), i.off(l).on(l, function(t) {
                    t.preventDefault();
                    var e = /^touch/.test(t.type), i = (e ? t.originalEvent.touches[0] : t).pageX - u, n = (e ? t.originalEvent.touches[0] : t).pageY - h;
                    (g || i !== f || n !== d) && (g=!0, E.setHand(i, n, !1, !0))
                }), i.off(c).on(c, function(t) {
                    i.off(c), t.preventDefault();
                    var a = /^touch/.test(t.type), o = (a ? t.originalEvent.changedTouches[0] : t).pageX - u, r = (a ? t.originalEvent.changedTouches[0] : t).pageY - h;
                    (e || g) && o === f && r === d && E.setHand(o, r), "hours" === E.currentView ? E.toggleView("minutes", w / 2) : n.autoclose && (E.minutesView.addClass("clockpicker-dial-out"), setTimeout(function() {
                        E.done()
                    }, w / 2)), s.prepend(_), clearTimeout(b), E.popover.removeClass("clockpicker-moving"), i.off(l)
                })
            }
        }
        var o = t(x), s = o.find(".clockpicker-plate"), u = o.find(".picker__holder"), d = o.find(".clockpicker-hours"), C = o.find(".clockpicker-minutes"), k = o.find(".clockpicker-am-pm-block"), P = "INPUT" === e.prop("tagName"), T = P ? e: e.find("input"), A = t("label[for=" + T.attr("id") + "]"), E = this;
        if (this.id = p("cp"), this.element = e, this.holder = u, this.options = n, this.isAppended=!1, this.isShown=!1, this.currentView = "hours", this.isInput = P, this.input = T, this.label = A, this.popover = o, this.plate = s, this.hoursView = d, this.minutesView = C, this.amPmBlock = k, this.spanHours = o.find(".clockpicker-span-hours"), this.spanMinutes = o.find(".clockpicker-span-minutes"), this.spanAmPm = o.find(".clockpicker-span-am-pm"), this.footer = o.find(".picker__footer"), this.amOrPm = "PM", n.twelvehour) {
            var L = ['<div class="clockpicker-am-pm-block">', '<button type="button" class="btn-floating btn-flat clockpicker-button clockpicker-am-button">', "AM", "</button>", '<button type="button" class="btn-floating btn-flat clockpicker-button clockpicker-pm-button">', "PM", "</button>", "</div>"].join("");
            t(L);
            n.ampmclickable ? (this.spanAmPm.empty(), t('<div id="click-am">AM</div>').on("click", function() {
                E.spanAmPm.children("#click-am").addClass("text-primary"), E.spanAmPm.children("#click-pm").removeClass("text-primary"), E.amOrPm = "AM"
            }).appendTo(this.spanAmPm), t('<div id="click-pm">PM</div>').on("click", function() {
                E.spanAmPm.children("#click-pm").addClass("text-primary"), E.spanAmPm.children("#click-am").removeClass("text-primary"), E.amOrPm = "PM"
            }).appendTo(this.spanAmPm)) : (t('<button type="button" class="btn-floating btn-flat clockpicker-button am-button" tabindex="1">AM</button>').on("click", function() {
                E.amOrPm = "AM", E.amPmBlock.children(".pm-button").removeClass("active"), E.amPmBlock.children(".am-button").addClass("active"), E.spanAmPm.empty().append("AM")
            }).appendTo(this.amPmBlock), t('<button type="button" class="btn-floating btn-flat clockpicker-button pm-button" tabindex="2">PM</button>').on("click", function() {
                E.amOrPm = "PM", E.amPmBlock.children(".am-button").removeClass("active"), E.amPmBlock.children(".pm-button").addClass("active"), E.spanAmPm.empty().append("PM")
            }).appendTo(this.amPmBlock))
        }
        n.darktheme && o.addClass("darktheme"), t('<button type="button" class="btn-flat clockpicker-button" tabindex="' + (n.twelvehour ? "3" : "1") + '">' + n.donetext + "</button>").click(t.proxy(this.done, this)).appendTo(this.footer), this.spanHours.click(t.proxy(this.toggleView, this, "hours")), this.spanMinutes.click(t.proxy(this.toggleView, this, "minutes")), T.on("focus.clockpicker click.clockpicker", t.proxy(this.show, this));
        var I, R, D, z, O = t('<div class="clockpicker-tick"></div>');
        if (n.twelvehour)
            for (I = 1; 13 > I; I += 1)
                R = O.clone(), D = I / 6 * Math.PI, z = v, R.css("font-size", "140%"), R.css({
                    left: m + Math.sin(D) * z - y,
                    top: m - Math.cos(D) * z - y
                }), R.html(0 === I ? "00" : I), d.append(R), R.on(r, W);
        else
            for (I = 0; 24 > I; I += 1) {
                R = O.clone(), D = I / 6 * Math.PI;
                var V = I > 0 && 13 > I;
                z = V ? g : v, R.css({
                    left: m + Math.sin(D) * z - y,
                    top: m - Math.cos(D) * z - y
                }), V && R.css("font-size", "120%"), R.html(0 === I ? "00" : I), d.append(R), R.on(r, W)
            }
        for (I = 0; 60 > I; I += 5)
            R = O.clone(), D = I / 30 * Math.PI, R.css({
                left: m + Math.sin(D) * v - y,
                top: m - Math.cos(D) * v - y
            }), R.css("font-size", "140%"), R.html(f(I)), C.append(R), R.on(r, W);
        if (s.on(r, function(e) {
            0 === t(e.target).closest(".clockpicker-tick").length && W(e, !0)
        }), a) {
            var _ = o.find(".clockpicker-canvas"), H = h("svg");
            H.setAttribute("class", "clockpicker-svg"), H.setAttribute("width", b), H.setAttribute("height", b);
            var B = h("g");
            B.setAttribute("transform", "translate(" + m + "," + m + ")");
            var N = h("circle");
            N.setAttribute("class", "clockpicker-canvas-bearing"), N.setAttribute("cx", 0), N.setAttribute("cy", 0), N.setAttribute("r", 2);
            var j = h("line");
            j.setAttribute("x1", 0), j.setAttribute("y1", 0);
            var $ = h("circle");
            $.setAttribute("class", "clockpicker-canvas-bg"), $.setAttribute("r", y);
            var q = h("circle");
            q.setAttribute("class", "clockpicker-canvas-fg"), q.setAttribute("r", 5), B.appendChild(j), B.appendChild($), B.appendChild(q), B.appendChild(N),
            H.appendChild(B), _.append(H), this.hand = j, this.bg = $, this.fg = q, this.bearing = N, this.g = B, this.canvas = _
        }
        S(this.options.init)
    }
    function S(t) {
        t && "function" == typeof t && t()
    }
    var t = window.jQuery, e = t(window), i = t(document), n = "http://www.w3.org/2000/svg", a = "SVGAngle"in window && function() {
        var t, e = document.createElement("div");
        return e.innerHTML = "<svg/>", t = (e.firstChild && e.firstChild.namespaceURI) == n, e.innerHTML = "", t
    }(), o = function() {
        var t = document.createElement("div").style;
        return "transition"in t || "WebkitTransition"in t || "MozTransition"in t || "msTransition"in t || "OTransition"in t
    }(), s = "ontouchstart"in window, r = "mousedown" + (s ? " touchstart" : ""), l = "mousemove.clockpicker" + (s ? " touchmove.clockpicker" : ""), c = "mouseup.clockpicker" + (s ? " touchend.clockpicker" : ""), u = navigator.vibrate ? "vibrate": navigator.webkitVibrate ? "webkitVibrate": null, d = 0, m = 135, v = 110, g = 80, y = 20, b = 2 * m, w = o ? 350: 1, x = ['<div class="clockpicker picker">', '<div class="picker__holder">', '<div class="picker__frame">', '<div class="picker__wrap">', '<div class="picker__box">', '<div class="picker__date-display">', '<div class="clockpicker-display">', '<div class="clockpicker-display-column">', '<span class="clockpicker-span-hours text-primary"></span>', ":", '<span class="clockpicker-span-minutes"></span>', "</div>", '<div class="clockpicker-display-column clockpicker-display-am-pm">', '<div class="clockpicker-span-am-pm"></div>', "</div>", "</div>", "</div>", '<div class="picker__calendar-container">', '<div class="clockpicker-plate">', '<div class="clockpicker-canvas"></div>', '<div class="clockpicker-dial clockpicker-hours"></div>', '<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>', "</div>", '<div class="clockpicker-am-pm-block">', "</div>", "</div>", '<div class="picker__footer">', "</div>", "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
    C.DEFAULTS = {
        "default": "",
        fromnow: 0,
        donetext: "Done",
        autoclose: !1,
        ampmclickable: !1,
        darktheme: !1,
        twelvehour: !0,
        vibrate: !0
    }, C.prototype.toggle = function() {
        this[this.isShown ? "hide": "show"]()
    }, C.prototype.locate = function() {
        var t = this.element, e = this.popover;
        t.offset(), t.outerWidth(), t.outerHeight(), this.options.align;
        e.show()
    }, C.prototype.show = function(n) {
        if (!this.isShown) {
            S(this.options.beforeShow), t(":input").each(function() {
                t(this).attr("tabindex", - 1)
            });
            var a = this;
            this.input.blur(), this.popover.addClass("picker--opened"), this.input.addClass("picker__input picker__input--active"), t(document.body).css("overflow", "hidden"), this.isAppended || (this.popover.insertAfter(this.input), this.options.twelvehour && (this.amOrPm = "PM", this.options.ampmclickable ? (this.spanAmPm.children("#click-pm").addClass("text-primary"), this.spanAmPm.children("#click-am").removeClass("text-primary")) : (this.amPmBlock.children(".am-button").removeClass("active"), this.amPmBlock.children(".pm-button").addClass("active"), this.spanAmPm.empty().append("PM"))), e.on("resize.clockpicker" + this.id, function() {
                a.isShown && a.locate()
            }), this.isAppended=!0);
            var o = ((this.input.prop("value") || this.options["default"] || "") + "").split(":");
            if (this.options.twelvehour && "undefined" != typeof o[1] && (o[1] = o[1].replace("AM", "").replace("PM", "")), "now" === o[0]) {
                var s = new Date( + new Date + this.options.fromnow);
                o = [s.getHours(), s.getMinutes()]
            }
            this.hours =+ o[0] || 0, this.minutes =+ o[1] || 0, this.spanHours.html(f(this.hours)), this.spanMinutes.html(f(this.minutes)), this.toggleView("hours"), this.locate(), this.isShown=!0, i.on("click.clockpicker." + this.id + " focusin.clockpicker." + this.id, function(e) {
                var i = t(e.target);
                0 === i.closest(a.popover.find(".picker__wrap")).length && 0 === i.closest(a.input).length && a.hide()
            }), i.on("keyup.clockpicker." + this.id, function(t) {
                27 === t.keyCode && a.hide()
            }), S(this.options.afterShow)
        }
    }, C.prototype.hide = function() {
        S(this.options.beforeHide), this.input.removeClass("picker__input picker__input--active"), this.popover.removeClass("picker--opened"), t(document.body).css("overflow", "visible"), this.isShown=!1, t(":input").each(function(e) {
            t(this).attr("tabindex", e + 1)
        }), i.off("click.clockpicker." + this.id + " focusin.clockpicker." + this.id), i.off("keyup.clockpicker." + this.id), this.popover.hide(), S(this.options.afterHide)
    }, C.prototype.toggleView = function(e, i) {
        var n=!1;
        "minutes" === e && "visible" === t(this.hoursView).css("visibility") && (S(this.options.beforeHourSelect), n=!0);
        var a = "hours" === e, o = a ? this.hoursView: this.minutesView, s = a ? this.minutesView: this.hoursView;
        this.currentView = e, this.spanHours.toggleClass("text-primary", a), this.spanMinutes.toggleClass("text-primary", !a), s.addClass("clockpicker-dial-out"), o.css("visibility", "visible").removeClass("clockpicker-dial-out"), this.resetClock(i), clearTimeout(this.toggleViewTimer), this.toggleViewTimer = setTimeout(function() {
            s.css("visibility", "hidden")
        }, w), n && S(this.options.afterHourSelect)
    }, C.prototype.resetClock = function(t) {
        var e = this.currentView, i = this[e], n = "hours" === e, o = Math.PI / (n ? 6 : 30), s = i * o, r = n && i > 0 && 13 > i ? g: v, l = Math.sin(s) * r, c =- Math.cos(s) * r, u = this;
        a && t ? (u.canvas.addClass("clockpicker-canvas-out"), setTimeout(function() {
            u.canvas.removeClass("clockpicker-canvas-out"), u.setHand(l, c)
        }, t)) : this.setHand(l, c)
    }, C.prototype.setHand = function(e, i, n, o) {
        var m, s = Math.atan2(e, - i), r = "hours" === this.currentView, l = Math.PI / (r || n ? 6 : 30), c = Math.sqrt(e * e + i * i), h = this.options, d = r && (v + g) / 2 > c, p = d ? g: v;
        if (h.twelvehour && (p = v), 0 > s && (s = 2 * Math.PI + s), m = Math.round(s / l), s = m * l, h.twelvehour ? r ? 0 === m && (m = 12) : (n && (m*=5), 60 === m && (m = 0)) : r ? (12 === m && (m = 0), m = d ? 0 === m ? 12 : m : 0 === m ? 0 : m + 12) : (n && (m*=5), 60 === m && (m = 0)), r ? this.fg.setAttribute("class", "clockpicker-canvas-fg") : m%5 == 0 ? this.fg.setAttribute("class", "clockpicker-canvas-fg") : this.fg.setAttribute("class", "clockpicker-canvas-fg active"), this[this.currentView] !== m && u && this.options.vibrate && (this.vibrateTimer || (navigator[u](10), this.vibrateTimer = setTimeout(t.proxy(function() {
            this.vibrateTimer = null
        }, this), 100))), this[this.currentView] = m, this[r ? "spanHours": "spanMinutes"].html(f(m)), !a)
            return void this[r ? "hoursView": "minutesView"].find(".clockpicker-tick").each(function() {
            var e = t(this);
            e.toggleClass("active", m ===+ e.html())
        });
        o ||!r && m%5 ? (this.g.insertBefore(this.hand, this.bearing), this.g.insertBefore(this.bg, this.fg), this.bg.setAttribute("class", "clockpicker-canvas-bg clockpicker-canvas-bg-trans")) : (this.g.insertBefore(this.hand, this.bg), this.g.insertBefore(this.fg, this.bg), this.bg.setAttribute("class", "clockpicker-canvas-bg"));
        var b = Math.sin(s) * (p - y), w =- Math.cos(s) * (p - y), x = Math.sin(s) * p, C =- Math.cos(s) * p;
        this.hand.setAttribute("x2", b), this.hand.setAttribute("y2", w), this.bg.setAttribute("cx", x), this.bg.setAttribute("cy", C), this.fg.setAttribute("cx", x), this.fg.setAttribute("cy", C)
    }, C.prototype.done = function() {
        S(this.options.beforeDone), this.hide(), this.label.addClass("active");
        var t = this.input.prop("value"), e = f(this.hours) + ":" + f(this.minutes);
        this.options.twelvehour && (e += this.amOrPm), this.input.prop("value", e), e !== t && (this.input.triggerHandler("change"), this.isInput || this.element.trigger("change")), this.options.autoclose && this.input.trigger("blur"), S(this.options.afterDone)
    }, C.prototype.remove = function() {
        this.element.removeData("clockpicker"), this.input.off("focus.clockpicker click.clockpicker"), this.isShown && this.hide(), this.isAppended && (e.off("resize.clockpicker" + this.id), this.popover.remove())
    }, t.fn.pickatime = function(e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var n = t(this), a = n.data("clockpicker");
            if (a)
                "function" == typeof a[e] && a[e].apply(a, i);
            else {
                var o = t.extend({}, C.DEFAULTS, n.data(), "object" == typeof e && e);
                n.data("clockpicker", new C(n, o))
            }
        })
    }
}(), !function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.PhotoSwipe = e()
}(this, function() {
    "use strict";
    var t = function(t, e, i, n) {
        var a = {
            features: null,
            bind: function(t, e, i, n) {
                var a = (n ? "remove" : "add") + "EventListener";
                e = e.split(" ");
                for (var o = 0; o < e.length; o++)
                    e[o] && t[a](e[o], i, !1)
            },
            isArray: function(t) {
                return t instanceof Array
            },
            createEl: function(t, e) {
                var i = document.createElement(e || "div");
                return t && (i.className = t), i
            },
            getScrollY: function() {
                var t = window.pageYOffset;
                return void 0 !== t ? t : document.documentElement.scrollTop
            },
            unbind: function(t, e, i) {
                a.bind(t, e, i, !0)
            },
            removeClass: function(t, e) {
                var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
                t.className = t.className.replace(i, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(t, e) {
                a.hasClass(t, e) || (t.className += (t.className ? " " : "") + e)
            },
            hasClass: function(t, e) {
                return t.className && new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
            },
            getChildByClass: function(t, e) {
                for (var i = t.firstChild; i;) {
                    if (a.hasClass(i, e))
                        return i;
                    i = i.nextSibling
                }
            },
            arraySearch: function(t, e, i) {
                for (var n = t.length; n--;)
                    if (t[n][i] === e)
                        return n;
                return - 1
            },
            extend: function(t, e, i) {
                for (var n in e)
                    if (e.hasOwnProperty(n)) {
                        if (i && t.hasOwnProperty(n))
                            continue;
                            t[n] = e[n]
                    }
            },
            easing: {
                sine: {
                    out: function(t) {
                        return Math.sin(t * (Math.PI / 2))
                    },
                    inOut: function(t) {
                        return - (Math.cos(Math.PI * t) - 1) / 2
                    }
                },
                cubic: {
                    out: function(t) {
                        return --t * t * t + 1
                    }
                }
            },
            detectFeatures: function() {
                if (a.features)
                    return a.features;
                var t = a.createEl(), e = t.style, i = "", n = {};
                if (n.oldIE = document.all&&!document.addEventListener, n.touch = "ontouchstart"in window, window.requestAnimationFrame && (n.raf = window.requestAnimationFrame, n.caf = window.cancelAnimationFrame), n.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !n.pointerEvent) {
                    var o = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var s = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        s && s.length > 0 && (s = parseInt(s[1], 10), s >= 1 && 8 > s && (n.isOldIOSPhone=!0))
                    }
                    var r = o.match(/Android\s([0-9\.]*)/), l = r ? r[1]: 0;
                    l = parseFloat(l), l >= 1 && (4.4 > l && (n.isOldAndroid=!0), n.androidVersion = l), n.isMobileOpera = /opera mini|opera mobi/i.test(o)
                }
                for (var c, u, h = ["transform", "perspective", "animationName"], f = ["", "webkit", "Moz", "ms", "O"], d = 0; 4 > d; d++) {
                    i = f[d];
                    for (var p = 0; 3 > p; p++)
                        c = h[p], u = i + (i ? c.charAt(0).toUpperCase() + c.slice(1) : c), !n[c] && u in e && (n[c] = u);
                    i&&!n.raf && (i = i.toLowerCase(), n.raf = window[i + "RequestAnimationFrame"], n.raf && (n.caf = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]))
                }
                if (!n.raf) {
                    var m = 0;
                    n.raf = function(t) {
                        var e = (new Date).getTime(), i = Math.max(0, 16 - (e - m)), n = window.setTimeout(function() {
                            t(e + i)
                        }, i);
                        return m = e + i, n
                    }, n.caf = function(t) {
                        clearTimeout(t)
                    }
                }
                return n.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, a.features = n, n
            }
        };
        a.detectFeatures(), a.features.oldIE && (a.bind = function(t, e, i, n) {
            e = e.split(" ");
            for (var a, o = (n ? "detach" : "attach") + "Event", s = function() {
                i.handleEvent.call(i)
            }, r = 0; r < e.length; r++)
                if (a = e[r])
                    if ("object" == typeof i && i.handleEvent) {
                        if (n) {
                            if (!i["oldIE" + a])
                                return !1
                        } else
                            i["oldIE" + a] = s;
                            t[o]("on" + a, i["oldIE" + a])
                    } else
                        t[o]("on" + a, i)
        });
        var o = this, s = 25, r = 3, l = {
            allowPanToNext: !0,
            spacing: .12,
            bgOpacity: 1,
            mouseUsed: !1,
            loop: !0,
            pinchToClose: !0,
            closeOnScroll: !0,
            closeOnVerticalDrag: !0,
            verticalDragRange: .75,
            hideAnimationDuration: 333,
            showAnimationDuration: 333,
            showHideOpacity: !1,
            focus: !0,
            escKey: !0,
            arrowKeys: !0,
            mainScrollEndFriction: .35,
            panEndFriction: .35,
            isClickableElement: function(t) {
                return "A" === t.tagName
            },
            getDoubleTapZoom: function(t, e) {
                return t ? 1 : e.initialZoomLevel < .7 ? 1 : 1.33
            },
            maxSpreadZoom: 1.33,
            modal: !0,
            scaleMode: "fit"
        };
        a.extend(l, n);
        var c, u, h, f, d, p, m, v, g, y, b, w, x, C, S, k, P, T, A, E, M, L, F, O, I, R, D, z, V, W, _, H, B, N, j, $, q, X, Y, Q, Z, G, U, K, J, tt, et, it, nt, at, ot, st, rt, lt, ct, ut, ht = function() {
            return {
                x: 0,
                y: 0
            }
        }, ft = ht(), dt = ht(), pt = ht(), mt = {}, vt = 0, gt = {}, yt = ht(), bt = 0, wt=!0, xt = [], Ct = {}, St=!1, kt = function(t, e) {
            a.extend(o, e.publicMethods), xt.push(t)
        }, Pt = function(t) {
            var e = Je();
            return t > e - 1 ? t - e : 0 > t ? e + t : t
        }, Tt = {}, At = function(t, e) {
            return Tt[t] || (Tt[t] = []), Tt[t].push(e)
        }, Et = function(t) {
            var e = Tt[t];
            if (e) {
                var i = Array.prototype.slice.call(arguments);
                i.shift();
                for (var n = 0; n < e.length; n++)
                    e[n].apply(o, i)
            }
        }, Mt = function() {
            return (new Date).getTime()
        }, Lt = function(t) {
            lt = t, o.bg.style.opacity = t * l.bgOpacity
        }, Ft = function(t, e, i, n, a) {
            (!St || a && a !== o.currItem) && (n/=a ? a.fitRatio : o.currItem.fitRatio), t[L] = w + e + "px, " + i + "px" + x + " scale(" + n + ")"
        }, Ot = function(t) {
            nt && (t && (y > o.currItem.fitRatio ? St || (hi(o.currItem, !1, !0), St=!0) : St && (hi(o.currItem), St=!1)), Ft(nt, pt.x, pt.y, y))
        }, It = function(t) {
            t.container && Ft(t.container.style, t.initialPosition.x, t.initialPosition.y, t.initialZoomLevel, t)
        }, Rt = function(t, e) {
            e[L] = w + t + "px, 0px" + x
        }, Dt = function(t, e) {
            if (!l.loop && e) {
                var i = f + (yt.x * vt - t) / yt.x, n = Math.round(t - ye.x);
                (0 > i && n > 0 || i >= Je() - 1 && 0 > n) && (t = ye.x + n * l.mainScrollEndFriction)
            }
            ye.x = t, Rt(t, d)
        }, zt = function(t, e) {
            var i = be[t] - gt[t];
            return dt[t] + ft[t] + i - i * (e / b)
        }, Vt = function(t, e) {
            t.x = e.x, t.y = e.y, e.id && (t.id = e.id)
        }, Wt = function(t) {
            t.x = Math.round(t.x), t.y = Math.round(t.y)
        }, _t = null, Ht = function() {
            _t && (a.unbind(document, "mousemove", Ht), a.addClass(t, "pswp--has_mouse"), l.mouseUsed=!0, Et("mouseUsed")), _t = setTimeout(function() {
                _t = null
            }, 100)
        }, Bt = function() {
            a.bind(document, "keydown", o), _.transform && a.bind(o.scrollWrap, "click", o), l.mouseUsed || a.bind(document, "mousemove", Ht), a.bind(window, "resize scroll", o), Et("bindEvents")
        }, Nt = function() {
            a.unbind(window, "resize", o), a.unbind(window, "scroll", g.scroll), a.unbind(document, "keydown", o), a.unbind(document, "mousemove", Ht), _.transform && a.unbind(o.scrollWrap, "click", o), X && a.unbind(window, m, o), Et("unbindEvents")
        }, jt = function(t, e) {
            var i = ri(o.currItem, mt, t);
            return e && (it = i), i
        }, $t = function(t) {
            return t || (t = o.currItem), t.initialZoomLevel
        }, qt = function(t) {
            return t || (t = o.currItem), t.w > 0 ? l.maxSpreadZoom : 1
        }, Xt = function(t, e, i, n) {
            return n === o.currItem.initialZoomLevel ? (i[t] = o.currItem.initialPosition[t], !0) : (i[t] = zt(t, n), i[t] > e.min[t] ? (i[t] = e.min[t], !0) : i[t] < e.max[t] ? (i[t] = e.max[t], !0) : !1)
        }, Yt = function() {
            if (L) {
                var e = _.perspective&&!O;
                return w = "translate" + (e ? "3d(" : "("), void(x = _.perspective ? ", 0px)" : ")")
            }
            L = "left", a.addClass(t, "pswp--ie"), Rt = function(t, e) {
                e.left = t + "px"
            }, It = function(t) {
                var e = t.fitRatio > 1 ? 1: t.fitRatio, i = t.container.style, n = e * t.w, a = e * t.h;
                i.width = n + "px", i.height = a + "px", i.left = t.initialPosition.x + "px", i.top = t.initialPosition.y + "px"
            }, Ot = function() {
                if (nt) {
                    var t = nt, e = o.currItem, i = e.fitRatio > 1 ? 1: e.fitRatio, n = i * e.w, a = i * e.h;
                    t.width = n + "px", t.height = a + "px", t.left = pt.x + "px", t.top = pt.y + "px"
                }
            }
        }, Qt = function(t) {
            var e = "";
            l.escKey && 27 === t.keyCode ? e = "close" : l.arrowKeys && (37 === t.keyCode ? e = "prev" : 39 === t.keyCode && (e = "next")), e && (t.ctrlKey || t.altKey || t.shiftKey || t.metaKey || (t.preventDefault ? t.preventDefault() : t.returnValue=!1, o[e]()))
        }, Zt = function(t) {
            t && (Z || Q || at || $) && (t.preventDefault(), t.stopPropagation())
        }, Gt = function() {
            o.setScrollOffset(0, a.getScrollY())
        }, Ut = {}, Kt = 0, Jt = function(t) {
            Ut[t] && (Ut[t].raf && R(Ut[t].raf), Kt--, delete Ut[t])
        }, te = function(t) {
            Ut[t] && Jt(t), Ut[t] || (Kt++, Ut[t] = {})
        }, ee = function() {
            for (var t in Ut)
                Ut.hasOwnProperty(t) && Jt(t)
        }, ie = function(t, e, i, n, a, o, s) {
            var r, l = Mt();
            te(t);
            var c = function() {
                if (Ut[t]) {
                    if (r = Mt() - l, r >= n)
                        return Jt(t), o(i), void(s && s());
                    o((i - e) * a(r / n) + e), Ut[t].raf = I(c)
                }
            };
            c()
        }, ne = {
            shout: Et,
            listen: At,
            viewportSize: mt,
            options: l,
            isMainScrollAnimating: function() {
                return at
            },
            getZoomLevel: function() {
                return y
            },
            getCurrentIndex: function() {
                return f
            },
            isDragging: function() {
                return X
            },
            isZooming: function() {
                return J
            },
            setScrollOffset: function(t, e) {
                gt.x = t, W = gt.y = e, Et("updateScrollOffset", gt)
            },
            applyZoomPan: function(t, e, i, n) {
                pt.x = e, pt.y = i, y = t, Ot(n)
            },
            init: function() {
                if (!c&&!u) {
                    var i;
                    o.framework = a, o.template = t, o.bg = a.getChildByClass(t, "pswp__bg"), D = t.className, c=!0, _ = a.detectFeatures(), I = _.raf, R = _.caf, L = _.transform, V = _.oldIE, o.scrollWrap = a.getChildByClass(t, "pswp__scroll-wrap"), o.container = a.getChildByClass(o.scrollWrap, "pswp__container"), d = o.container.style, o.itemHolders = k = [{
                        el: o.container.children[0],
                        wrap: 0,
                        index: - 1
                    }, {
                        el: o.container.children[1],
                        wrap: 0,
                        index: - 1
                    }, {
                        el: o.container.children[2],
                        wrap: 0,
                        index: - 1
                    }
                    ], k[0].el.style.display = k[2].el.style.display = "none", Yt(), g = {
                        resize: o.updateSize,
                        scroll: Gt,
                        keydown: Qt,
                        click: Zt
                    };
                    var n = _.isOldIOSPhone || _.isOldAndroid || _.isMobileOpera;
                    for (_.animationName && _.transform&&!n || (l.showAnimationDuration = l.hideAnimationDuration = 0), i = 0; i < xt.length; i++)
                        o["init" + xt[i]]();
                    if (e) {
                        var s = o.ui = new e(o, a);
                        s.init()
                    }
                    Et("firstUpdate"), f = f || l.index || 0, (isNaN(f) || 0 > f || f >= Je()) && (f = 0), o.currItem = Ke(f), (_.isOldIOSPhone || _.isOldAndroid) && (wt=!1), t.setAttribute("aria-hidden", "false"), l.modal && (wt ? t.style.position = "fixed" : (t.style.position = "absolute", t.style.top = a.getScrollY() + "px")), void 0 === W && (Et("initialLayout"), W = z = a.getScrollY());
                    var h = "pswp--open ";
                    for (l.mainClass && (h += l.mainClass + " "), l.showHideOpacity && (h += "pswp--animate_opacity "), h += O ? "pswp--touch" : "pswp--notouch", h += _.animationName ? " pswp--css_animation" : "", h += _.svg ? " pswp--svg" : "", a.addClass(t, h), o.updateSize(), p =- 1, bt = null, i = 0; r > i; i++)
                        Rt((i + p) * yt.x, k[i].el.style);
                    V || a.bind(o.scrollWrap, v, o), At("initialZoomInEnd", function() {
                        o.setContent(k[0], f - 1), o.setContent(k[2], f + 1), k[0].el.style.display = k[2].el.style.display = "block", l.focus && t.focus(), Bt()
                    }), o.setContent(k[1], f), o.updateCurrItem(), Et("afterInit"), wt || (C = setInterval(function() {
                        Kt || X || J || y !== o.currItem.initialZoomLevel || o.updateSize()
                    }, 1e3)), a.addClass(t, "pswp--visible")
                }
            },
            close: function() {
                c && (c=!1, u=!0, Et("close"), Nt(), ei(o.currItem, null, !0, o.destroy))
            },
            destroy: function() {
                Et("destroy"), Qe && clearTimeout(Qe), t.setAttribute("aria-hidden", "true"), t.className = D, C && clearInterval(C), a.unbind(o.scrollWrap, v, o), a.unbind(window, "scroll", o), ke(), ee(), Tt = null
            },
            panTo: function(t, e, i) {
                i || (t > it.min.x ? t = it.min.x : t < it.max.x && (t = it.max.x), e > it.min.y ? e = it.min.y : e < it.max.y && (e = it.max.y)), pt.x = t, pt.y = e, Ot()
            },
            handleEvent: function(t) {
                t = t || window.event, g[t.type] && g[t.type](t)
            },
            goTo: function(t) {
                t = Pt(t);
                var e = t - f;
                bt = e, f = t, o.currItem = Ke(f), vt -= e, Dt(yt.x * vt), ee(), at=!1, o.updateCurrItem()
            },
            next: function() {
                o.goTo(f + 1)
            },
            prev: function() {
                o.goTo(f - 1)
            },
            updateCurrZoomItem: function(t) {
                if (t && Et("beforeChange", 0), k[1].el.children.length) {
                    var e = k[1].el.children[0];
                    nt = a.hasClass(e, "pswp__zoom-wrap") ? e.style : null
                } else
                    nt = null;
                it = o.currItem.bounds, b = y = o.currItem.initialZoomLevel, pt.x = it.center.x, pt.y = it.center.y, t && Et("afterChange")
            },
            invalidateCurrItems: function() {
                S=!0;
                for (var t = 0; r > t; t++)
                    k[t].item && (k[t].item.needsUpdate=!0)
            },
            updateCurrItem: function(t) {
                if (0 !== bt) {
                    var e, i = Math.abs(bt);
                    if (!(t && 2 > i)) {
                        o.currItem = Ke(f), St=!1, Et("beforeChange", bt), i >= r && (p += bt + (bt > 0?-r : r), i = r);
                        for (var n = 0; i > n; n++)
                            bt > 0 ? (e = k.shift(), k[r - 1] = e, p++, Rt((p + 2) * yt.x, e.el.style), o.setContent(e, f - i + n + 1 + 1)) : (e = k.pop(), k.unshift(e), p--, Rt(p * yt.x, e.el.style), o.setContent(e, f + i - n - 1 - 1));
                        if (nt && 1 === Math.abs(bt)) {
                            var a = Ke(P);
                            a.initialZoomLevel !== y && (ri(a, mt), hi(a), It(a))
                        }
                        bt = 0, o.updateCurrZoomItem(), P = f, Et("afterChange")
                    }
                }
            },
            updateSize: function(e) {
                if (!wt && l.modal) {
                    var i = a.getScrollY();
                    if (W !== i && (t.style.top = i + "px", W = i), !e && Ct.x === window.innerWidth && Ct.y === window.innerHeight)
                        return;
                    Ct.x = window.innerWidth, Ct.y = window.innerHeight, t.style.height = Ct.y + "px"
                }
                if (mt.x = o.scrollWrap.clientWidth, mt.y = o.scrollWrap.clientHeight, Gt(), yt.x = mt.x + Math.round(mt.x * l.spacing), yt.y = mt.y, Dt(yt.x * vt), Et("beforeResize"), void 0 !== p) {
                    for (var n, s, c, u = 0; r > u; u++)
                        n = k[u], Rt((u + p) * yt.x, n.el.style), c = f + u - 1, l.loop && Je() > 2 && (c = Pt(c)), s = Ke(c), s && (S || s.needsUpdate ||!s.bounds) ? (o.cleanSlide(s), o.setContent(n, c), 1 === u && (o.currItem = s, o.updateCurrZoomItem(!0)), s.needsUpdate=!1) : - 1 === n.index && c >= 0 && o.setContent(n, c), s && s.container && (ri(s, mt), hi(s), It(s));
                    S=!1
                }
                b = y = o.currItem.initialZoomLevel, it = o.currItem.bounds, it && (pt.x = it.center.x, pt.y = it.center.y, Ot(!0)), Et("resize")
            },
            zoomTo: function(t, e, i, n, o) {
                e && (b = y, be.x = Math.abs(e.x) - pt.x, be.y = Math.abs(e.y) - pt.y, Vt(dt, pt));
                var s = jt(t, !1), r = {};
                Xt("x", s, r, t), Xt("y", s, r, t);
                var l = y, c = {
                    x: pt.x,
                    y: pt.y
                };
                Wt(r);
                var u = function(e) {
                    1 === e ? (y = t, pt.x = r.x, pt.y = r.y) : (y = (t - l) * e + l, pt.x = (r.x - c.x) * e + c.x, pt.y = (r.y - c.y) * e + c.y), o && o(e), Ot(1 === e)
                };
                i ? ie("customZoomTo", 0, 1, i, n || a.easing.sine.inOut, u) : u(1)
            }
        }, ae = 30, oe = 10, se = {}, re = {}, le = {}, ce = {}, ue = {}, he = [], fe = {}, de = [], pe = {}, me = 0, ve = ht(), ge = 0, ye = ht(), be = ht(), we = ht(), xe = function(t, e) {
            return t.x === e.x && t.y === e.y
        }, Ce = function(t, e) {
            return Math.abs(t.x - e.x) < s && Math.abs(t.y - e.y) < s
        }, Se = function(t, e) {
            return pe.x = Math.abs(t.x - e.x), pe.y = Math.abs(t.y - e.y), Math.sqrt(pe.x * pe.x + pe.y * pe.y)
        }, ke = function() {
            G && (R(G), G = null)
        }, Pe = function() {
            X && (G = I(Pe), Be())
        }, Te = function() {
            return !("fit" === l.scaleMode && y === o.currItem.initialZoomLevel)
        }, Ae = function(t, e) {
            return t && t !== document ? t.getAttribute("class") && t.getAttribute("class").indexOf("pswp__scroll-wrap")>-1?!1 : e(t) ? t : Ae(t.parentNode, e) : !1
        }, Ee = {}, Me = function(t, e) {
            return Ee.prevent=!Ae(t.target, l.isClickableElement), Et("preventDragEvent", t, e, Ee), Ee.prevent
        }, Le = function(t, e) {
            return e.x = t.pageX, e.y = t.pageY, e.id = t.identifier, e
        }, Fe = function(t, e, i) {
            i.x = .5 * (t.x + e.x), i.y = .5 * (t.y + e.y)
        }, Oe = function(t, e, i) {
            if (t - B > 50) {
                var n = de.length > 2 ? de.shift(): {};
                n.x = e, n.y = i, de.push(n), B = t
            }
        }, Ie = function() {
            var t = pt.y - o.currItem.initialPosition.y;
            return 1 - Math.abs(t / (mt.y / 2))
        }, Re = {}, De = {}, ze = [], Ve = function(t) {
            for (; ze.length > 0;)
                ze.pop();
            return F ? (ut = 0, he.forEach(function(t) {
                0 === ut ? ze[0] = t : 1 === ut && (ze[1] = t), ut++
            })) : t.type.indexOf("touch")>-1 ? t.touches && t.touches.length > 0 && (ze[0] = Le(t.touches[0], Re), t.touches.length > 1 && (ze[1] = Le(t.touches[1], De))) : (Re.x = t.pageX, Re.y = t.pageY, Re.id = "", ze[0] = Re), ze
        }, We = function(t, e) {
            var i, n, a, s, r = 0, c = pt[t] + e[t], u = e[t] > 0, h = ye.x + e.x, f = ye.x - fe.x;
            return i = c > it.min[t] || c < it.max[t] ? l.panEndFriction : 1, c = pt[t] + e[t] * i, !l.allowPanToNext && y !== o.currItem.initialZoomLevel || (nt ? "h" !== ot || "x" !== t || Q || (u ? (c > it.min[t] && (i = l.panEndFriction, r = it.min[t] - c, n = it.min[t] - dt[t]), (0 >= n || 0 > f) && Je() > 1 ? (s = h, 0 > f && h > fe.x && (s = fe.x)) : it.min.x !== it.max.x && (a = c)) : (c < it.max[t] && (i = l.panEndFriction, r = c - it.max[t], n = dt[t] - it.max[t]), (0 >= n || f > 0) && Je() > 1 ? (s = h, f > 0 && h < fe.x && (s = fe.x)) : it.min.x !== it.max.x && (a = c))) : s = h, "x" !== t) ? void(at || U || y > o.currItem.fitRatio && (pt[t] += e[t] * i)) : (void 0 !== s && (Dt(s, !0), U = s === fe.x?!1 : !0), it.min.x !== it.max.x && (void 0 !== a ? pt.x = a : U || (pt.x += e.x * i)), void 0 !== s)
        }, _e = function(t) {
            if (!("mousedown" === t.type && t.button > 0)) {
                if (Ue)
                    return void t.preventDefault();
                if (!q || "mousedown" !== t.type) {
                    if (Me(t, !0) && t.preventDefault(), Et("pointerDown"), F) {
                        var e = a.arraySearch(he, t.pointerId, "id");
                        0 > e && (e = he.length), he[e] = {
                            x: t.pageX,
                            y: t.pageY,
                            id: t.pointerId
                        }
                    }
                    var i = Ve(t), n = i.length;
                    K = null, ee(), X && 1 !== n || (X = st=!0, a.bind(window, m, o), j = ct = rt = $ = U = Z = Y = Q=!1, ot = null, Et("firstTouchStart", i), Vt(dt, pt), ft.x = ft.y = 0, Vt(ce, i[0]), Vt(ue, ce), fe.x = yt.x * vt, de = [{
                        x: ce.x,
                        y: ce.y
                    }
                    ], B = H = Mt(), jt(y, !0), ke(), Pe()), !J && n > 1&&!at&&!U && (b = y, Q=!1, J = Y=!0, ft.y = ft.x = 0, Vt(dt, pt), Vt(se, i[0]), Vt(re, i[1]), Fe(se, re, we), be.x = Math.abs(we.x) - pt.x, be.y = Math.abs(we.y) - pt.y, tt = et = Se(se, re))
                }
            }
        }, He = function(t) {
            if (t.preventDefault(), F) {
                var e = a.arraySearch(he, t.pointerId, "id");
                if (e>-1) {
                    var i = he[e];
                    i.x = t.pageX, i.y = t.pageY
                }
            }
            if (X) {
                var n = Ve(t);
                if (ot || Z || J)
                    K = n;
                else if (ye.x !== yt.x * vt)
                    ot = "h";
                else {
                    var o = Math.abs(n[0].x - ce.x) - Math.abs(n[0].y - ce.y);
                    Math.abs(o) >= oe && (ot = o > 0 ? "h" : "v", K = n)
                }
            }
        }, Be = function() {
            if (K) {
                var t = K.length;
                if (0 !== t)
                    if (Vt(se, K[0]), le.x = se.x - ce.x, le.y = se.y - ce.y, J && t > 1) {
                        if (ce.x = se.x, ce.y = se.y, !le.x&&!le.y && xe(K[1], re))
                            return;
                            Vt(re, K[1]), Q || (Q=!0, Et("zoomGestureStarted"));
                            var e = Se(se, re), i = Xe(e);
                            i > o.currItem.initialZoomLevel + o.currItem.initialZoomLevel / 15 && (ct=!0);
                            var n = 1, a = $t(), s = qt();
                            if (a > i)
                                if (l.pinchToClose&&!ct && b <= o.currItem.initialZoomLevel) {
                                    var r = a - i, c = 1 - r / (a / 1.2);
                                    Lt(c), Et("onPinchClose", c), rt=!0
                                } else
                                    n = (a - i) / a, n > 1 && (n = 1), i = a - n * (a / 3);
                            else
                                i > s && (n = (i - s) / (6 * a), n > 1 && (n = 1), i = s + n * a);
                                0 > n && (n = 0), tt = e, Fe(se, re, ve), ft.x += ve.x - we.x, ft.y += ve.y - we.y, Vt(we, ve), pt.x = zt("x", i), pt.y = zt("y", i), j = i > y, y = i, Ot()
                    } else {
                        if (!ot)
                            return;
                            if (st && (st=!1, Math.abs(le.x) >= oe && (le.x -= K[0].x - ue.x), Math.abs(le.y) >= oe && (le.y -= K[0].y - ue.y)), ce.x = se.x, ce.y = se.y, 0 === le.x && 0 === le.y)
                                return;
                                if ("v" === ot && l.closeOnVerticalDrag&&!Te()) {
                                    ft.y += le.y, pt.y += le.y;
                                    var u = Ie();
                                    return $=!0, Et("onVerticalDrag", u), Lt(u), void Ot()
                                }
                                Oe(Mt(), se.x, se.y), Z=!0, it = o.currItem.bounds;
                                var h = We("x", le);
                                h || (We("y", le), Wt(pt), Ot())
                            }
                        }
            }, Ne = function(t) {
            if (_.isOldAndroid) {
                if (q && "mouseup" === t.type)
                    return;
                t.type.indexOf("touch")>-1 && (clearTimeout(q), q = setTimeout(function() {
                    q = 0
                }, 600))
            }
            Et("pointerUp"), Me(t, !1) && t.preventDefault();
            var e;
            if (F) {
                var i = a.arraySearch(he, t.pointerId, "id");
                if (i>-1)
                    if (e = he.splice(i, 1)[0], navigator.pointerEnabled)
                        e.type = t.pointerType || "mouse";
                    else {
                        var n = {
                            4: "mouse",
                            2: "touch",
                            3: "pen"
                        };
                        e.type = n[t.pointerType], e.type || (e.type = t.pointerType || "mouse")
                    }
                }
            var s, r = Ve(t), c = r.length;
            if ("mouseup" === t.type && (c = 0), 2 === c)
                return K = null, !0;
            1 === c && Vt(ue, r[0]), 0 !== c || ot || at || (e || ("mouseup" === t.type ? e = {
                x: t.pageX,
                y: t.pageY,
                type: "mouse"
            } : t.changedTouches && t.changedTouches[0] && (e = {
                x: t.changedTouches[0].pageX,
                y: t.changedTouches[0].pageY,
                type: "touch"
            })), Et("touchRelease", t, e));
            var u =- 1;
            if (0 === c && (X=!1, a.unbind(window, m, o), ke(), J ? u = 0 : - 1 !== ge && (u = Mt() - ge)), ge = 1 === c ? Mt() : - 1, s =- 1 !== u && 150 > u ? "zoom" : "swipe", J && 2 > c && (J=!1, 1 === c && (s = "zoomPointerUp"), Et("zoomGestureEnded")), K = null, Z || Q || at || $)
                if (ee(), N || (N = je()), N.calculateSwipeSpeed("x"), $) {
                    var h = Ie();
                    if (h < l.verticalDragRange)
                        o.close();
                    else {
                        var f = pt.y, d = lt;
                        ie("verticalDrag", 0, 1, 300, a.easing.cubic.out, function(t) {
                            pt.y = (o.currItem.initialPosition.y - f) * t + f, Lt((1 - d) * t + d), Ot()
                        }), Et("onVerticalDrag", 1)
                    }
                } else {
                    if ((U || at) && 0 === c) {
                        var p = qe(s, N);
                        if (p)
                            return;
                            s = "zoomPointerUp"
                    }
                    if (!at)
                        return "swipe" !== s ? void Ye() : void(!U && y > o.currItem.fitRatio && $e(N))
                }
            }, je = function() {
            var t, e, i = {
                lastFlickOffset: {},
                lastFlickDist: {},
                lastFlickSpeed: {},
                slowDownRatio: {},
                slowDownRatioReverse: {},
                speedDecelerationRatio: {},
                speedDecelerationRatioAbs: {},
                distanceOffset: {},
                backAnimDestination: {},
                backAnimStarted: {},
                calculateSwipeSpeed: function(n) {
                    de.length > 1 ? (t = Mt() - B + 50, e = de[de.length - 2][n]) : (t = Mt() - H, e = ue[n]), i.lastFlickOffset[n] = ce[n] - e, i.lastFlickDist[n] = Math.abs(i.lastFlickOffset[n]), i.lastFlickDist[n] > 20 ? i.lastFlickSpeed[n] = i.lastFlickOffset[n] / t : i.lastFlickSpeed[n] = 0, Math.abs(i.lastFlickSpeed[n]) < .1 && (i.lastFlickSpeed[n] = 0), i.slowDownRatio[n] = .95, i.slowDownRatioReverse[n] = 1 - i.slowDownRatio[n], i.speedDecelerationRatio[n] = 1
                },
                calculateOverBoundsAnimOffset: function(t, e) {
                    i.backAnimStarted[t] || (pt[t] > it.min[t] ? i.backAnimDestination[t] = it.min[t] : pt[t] < it.max[t] && (i.backAnimDestination[t] = it.max[t]), void 0 !== i.backAnimDestination[t] && (i.slowDownRatio[t] = .7, i.slowDownRatioReverse[t] = 1 - i.slowDownRatio[t], i.speedDecelerationRatioAbs[t] < .05 && (i.lastFlickSpeed[t] = 0, i.backAnimStarted[t]=!0, ie("bounceZoomPan" + t, pt[t], i.backAnimDestination[t], e || 300, a.easing.sine.out, function(e) {
                        pt[t] = e, Ot()
                    }))))
                },
                calculateAnimOffset: function(t) {
                    i.backAnimStarted[t] || (i.speedDecelerationRatio[t] = i.speedDecelerationRatio[t] * (i.slowDownRatio[t] + i.slowDownRatioReverse[t] - i.slowDownRatioReverse[t] * i.timeDiff / 10), i.speedDecelerationRatioAbs[t] = Math.abs(i.lastFlickSpeed[t] * i.speedDecelerationRatio[t]), i.distanceOffset[t] = i.lastFlickSpeed[t] * i.speedDecelerationRatio[t] * i.timeDiff, pt[t] += i.distanceOffset[t])
                },
                panAnimLoop: function() {
                    return Ut.zoomPan && (Ut.zoomPan.raf = I(i.panAnimLoop), i.now = Mt(), i.timeDiff = i.now - i.lastNow, i.lastNow = i.now, i.calculateAnimOffset("x"), i.calculateAnimOffset("y"), Ot(), i.calculateOverBoundsAnimOffset("x"), i.calculateOverBoundsAnimOffset("y"), i.speedDecelerationRatioAbs.x < .05 && i.speedDecelerationRatioAbs.y < .05) ? (pt.x = Math.round(pt.x), pt.y = Math.round(pt.y), Ot(), void Jt("zoomPan")) : void 0
                }
            };
            return i
        }, $e = function(t) {
            return t.calculateSwipeSpeed("y"), it = o.currItem.bounds, t.backAnimDestination = {}, t.backAnimStarted = {}, Math.abs(t.lastFlickSpeed.x) <= .05 && Math.abs(t.lastFlickSpeed.y) <= .05 ? (t.speedDecelerationRatioAbs.x = t.speedDecelerationRatioAbs.y = 0, t.calculateOverBoundsAnimOffset("x"), t.calculateOverBoundsAnimOffset("y"), !0) : (te("zoomPan"), t.lastNow = Mt(), void t.panAnimLoop())
        }, qe = function(t, e) {
            var i;
            at || (me = f);
            var n;
            if ("swipe" === t) {
                var s = ce.x - ue.x, r = e.lastFlickDist.x < 10;
                s > ae && (r || e.lastFlickOffset.x > 20) ? n =- 1 : - ae > s && (r || e.lastFlickOffset.x<-20) && (n = 1)
            }
            var c;
            n && (f += n, 0 > f ? (f = l.loop ? Je() - 1 : 0, c=!0) : f >= Je() && (f = l.loop ? 0 : Je() - 1, c=!0), (!c || l.loop) && (bt += n, vt -= n, i=!0));
            var u, h = yt.x * vt, d = Math.abs(h - ye.x);
            return i || h > ye.x == e.lastFlickSpeed.x > 0 ? (u = Math.abs(e.lastFlickSpeed.x) > 0 ? d / Math.abs(e.lastFlickSpeed.x) : 333, u = Math.min(u, 400), u = Math.max(u, 250)) : u = 333, me === f && (i=!1), at=!0, Et("mainScrollAnimStart"), ie("mainScroll", ye.x, h, u, a.easing.cubic.out, Dt, function() {
                ee(), at=!1, me =- 1, (i || me !== f) && o.updateCurrItem(), Et("mainScrollAnimComplete")
            }), i && o.updateCurrItem(!0), i
        }, Xe = function(t) {
            return 1 / et * t * b
        }, Ye = function() {
            var t = y, e = $t(), i = qt();
            e > y ? t = e : y > i && (t = i);
            var n, s = 1, r = lt;
            return rt&&!j&&!ct && e > y ? (o.close(), !0) : (rt && (n = function(t) {
                Lt((s - r) * t + r)
            }), o.zoomTo(t, 0, 200, a.easing.cubic.out, n), !0)
        };
        kt("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var t = function(t, e, i, n, a) {
                        T = t + e, A = t + i, E = t + n, M = a ? t + a : ""
                    };
                    F = _.pointerEvent, F && _.touch && (_.touch=!1), F ? navigator.pointerEnabled ? t("pointer", "down", "move", "up", "cancel") : t("MSPointer", "Down", "Move", "Up", "Cancel") : _.touch ? (t("touch", "start", "move", "end", "cancel"), O=!0) : t("mouse", "down", "move", "up"), m = A + " " + E + " " + M, v = T, F&&!O && (O = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), o.likelyTouchDevice = O, g[T] = _e, g[A] = He, g[E] = Ne, M && (g[M] = g[E]), _.touch && (v += " mousedown", m += " mousemove mouseup", g.mousedown = g[T], g.mousemove = g[A], g.mouseup = g[E]), O || (l.allowPanToNext=!1)
                }
            }
        });
        var Qe, Ze, Ge, Ue, Ke, Je, ti, ei = function(e, i, n, s) {
            Qe && clearTimeout(Qe), Ue=!0, Ge=!0;
            var r;
            e.initialLayout ? (r = e.initialLayout, e.initialLayout = null) : r = l.getThumbBoundsFn && l.getThumbBoundsFn(f);
            var c = n ? l.hideAnimationDuration: l.showAnimationDuration, u = function() {
                Jt("initialZoom"), n ? (o.template.removeAttribute("style"), o.bg.removeAttribute("style")) : (Lt(1), i && (i.style.display = "block"), a.addClass(t, "pswp--animated-in"), Et("initialZoom" + (n ? "OutEnd" : "InEnd"))), s && s(), Ue=!1
            };
            if (!c ||!r || void 0 === r.x)
                return Et("initialZoom" + (n ? "Out" : "In")), y = e.initialZoomLevel, Vt(pt, e.initialPosition), Ot(), t.style.opacity = n ? 0 : 1, Lt(1), void(c ? setTimeout(function() {
                    u()
                }, c) : u());
            var d = function() {
                var i = h, s=!o.currItem.src || o.currItem.loadError || l.showHideOpacity;
                e.miniImg && (e.miniImg.style.webkitBackfaceVisibility = "hidden"), n || (y = r.w / e.w, pt.x = r.x, pt.y = r.y - z, o[s ? "template": "bg"].style.opacity = .001, Ot()), te("initialZoom"), n&&!i && a.removeClass(t, "pswp--animated-in"), s && (n ? a[(i ? "remove" : "add") + "Class"](t, "pswp--animate_opacity") : setTimeout(function() {
                    a.addClass(t, "pswp--animate_opacity")
                }, 30)), Qe = setTimeout(function() {
                    if (Et("initialZoom" + (n ? "Out" : "In")), n) {
                        var o = r.w / e.w, l = {
                            x: pt.x,
                            y: pt.y
                        }, h = y, f = lt, d = function(e) {
                            1 === e ? (y = o, pt.x = r.x, pt.y = r.y - W) : (y = (o - h) * e + h, pt.x = (r.x - l.x) * e + l.x, pt.y = (r.y - W - l.y) * e + l.y), Ot(), s ? t.style.opacity = 1 - e : Lt(f - e * f)
                        };
                        i ? ie("initialZoom", 0, 1, c, a.easing.cubic.out, d, u) : (d(1), Qe = setTimeout(u, c + 20))
                    } else
                        y = e.initialZoomLevel, Vt(pt, e.initialPosition), Ot(), Lt(1), s ? t.style.opacity = 1 : Lt(1), Qe = setTimeout(u, c + 20)
                }, n ? 25 : 90)
            };
            d()
        }, ii = {}, ni = [], ai = {
            index: 0,
            errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
            forceProgressiveLoading: !1,
            preload: [1, 1],
            getNumItemsFn: function() {
                return Ze.length
            }
        }, oi = function() {
            return {
                center: {
                    x: 0,
                    y: 0
                },
                max: {
                    x: 0,
                    y: 0
                },
                min: {
                    x: 0,
                    y: 0
                }
            }
        }, si = function(t, e, i) {
            var n = t.bounds;
            n.center.x = Math.round((ii.x - e) / 2), n.center.y = Math.round((ii.y - i) / 2) + t.vGap.top, n.max.x = e > ii.x ? Math.round(ii.x - e) : n.center.x, n.max.y = i > ii.y ? Math.round(ii.y - i) + t.vGap.top : n.center.y, n.min.x = e > ii.x ? 0 : n.center.x, n.min.y = i > ii.y ? t.vGap.top : n.center.y
        }, ri = function(t, e, i) {
            if (t.src&&!t.loadError) {
                var n=!i;
                if (n && (t.vGap || (t.vGap = {
                    top: 0,
                    bottom: 0
                }), Et("parseVerticalMargin", t)), ii.x = e.x, ii.y = e.y - t.vGap.top - t.vGap.bottom, n) {
                    var a = ii.x / t.w, o = ii.y / t.h;
                    t.fitRatio = o > a ? a : o;
                    var s = l.scaleMode;
                    "orig" === s ? i = 1 : "fit" === s && (i = t.fitRatio), i > 1 && (i = 1), t.initialZoomLevel = i, t.bounds || (t.bounds = oi())
                }
                if (!i)
                    return;
                return si(t, t.w * i, t.h * i), n && i === t.initialZoomLevel && (t.initialPosition = t.bounds.center), t.bounds
            }
            return t.w = t.h = 0, t.initialZoomLevel = t.fitRatio = 1, t.bounds = oi(), t.initialPosition = t.bounds.center, t.bounds
        }, li = function(t, e, i, n, a, s) {
            e.loadError || n && (e.imageAppended=!0, hi(e, n, e === o.currItem && St), i.appendChild(n), s && setTimeout(function() {
                e && e.loaded && e.placeholder && (e.placeholder.style.display = "none", e.placeholder = null)
            }, 500))
        }, ci = function(t) {
            t.loading=!0, t.loaded=!1;
            var e = t.img = a.createEl("pswp__img", "img"), i = function() {
                t.loading=!1, t.loaded=!0, t.loadComplete ? t.loadComplete(t) : t.img = null, e.onload = e.onerror = null, e = null
            };
            return e.onload = i, e.onerror = function() {
                t.loadError=!0, i()
            }, e.src = t.src, e
        }, ui = function(t, e) {
            return t.src && t.loadError && t.container ? (e && (t.container.innerHTML = ""), t.container.innerHTML = l.errorMsg.replace("%url%", t.src), !0) : void 0
        }, hi = function(t, e, i) {
            if (t.src) {
                e || (e = t.container.lastChild);
                var n = i ? t.w: Math.round(t.w * t.fitRatio), a = i ? t.h: Math.round(t.h * t.fitRatio);
                t.placeholder&&!t.loaded && (t.placeholder.style.width = n + "px", t.placeholder.style.height = a + "px"), e.style.width = n + "px", e.style.height = a + "px"
            }
        }, fi = function() {
            if (ni.length) {
                for (var t, e = 0; e < ni.length; e++)
                    t = ni[e], t.holder.index === t.index && li(t.index, t.item, t.baseDiv, t.img, !1, t.clearPlaceholder);
                ni = []
            }
        };
        kt("Controller", {
            publicMethods: {
                lazyLoadItem: function(t) {
                    t = Pt(t);
                    var e = Ke(t);
                    e && (!e.loaded&&!e.loading || S) && (Et("gettingData", t, e), e.src && ci(e))
                },
                initController: function() {
                    a.extend(l, ai, !0), o.items = Ze = i, Ke = o.getItemAt, Je = l.getNumItemsFn, ti = l.loop, Je() < 3 && (l.loop=!1), At("beforeChange", function(t) {
                        var e, i = l.preload, n = null === t?!0 : t >= 0, a = Math.min(i[0], Je()), s = Math.min(i[1], Je());
                        for (e = 1; (n ? s : a) >= e; e++)
                            o.lazyLoadItem(f + e);
                        for (e = 1; (n ? a : s) >= e; e++)
                            o.lazyLoadItem(f - e)
                    }), At("initialLayout", function() {
                        o.currItem.initialLayout = l.getThumbBoundsFn && l.getThumbBoundsFn(f)
                    }), At("mainScrollAnimComplete", fi), At("initialZoomInEnd", fi), At("destroy", function() {
                        for (var t, e = 0; e < Ze.length; e++)
                            t = Ze[e], t.container && (t.container = null), t.placeholder && (t.placeholder = null), t.img && (t.img = null), t.preloader && (t.preloader = null), t.loadError && (t.loaded = t.loadError=!1);
                        ni = null
                    })
                },
                getItemAt: function(t) {
                    return t >= 0 && void 0 !== Ze[t] ? Ze[t] : !1
                },
                allowProgressiveImg: function() {
                    return l.forceProgressiveLoading ||!O || l.mouseUsed || screen.width > 1200
                },
                setContent: function(t, e) {
                    l.loop && (e = Pt(e));
                    var i = o.getItemAt(t.index);
                    i && (i.container = null);
                    var n, s = o.getItemAt(e);
                    if (!s)
                        return void(t.el.innerHTML = "");
                    Et("gettingData", e, s), t.index = e, t.item = s;
                    var r = s.container = a.createEl("pswp__zoom-wrap");
                    if (!s.src && s.html && (s.html.tagName ? r.appendChild(s.html) : r.innerHTML = s.html), ui(s), ri(s, mt), !s.src || s.loadError || s.loaded)
                        s.src&&!s.loadError && (n = a.createEl("pswp__img", "img"), n.style.opacity = 1, n.src = s.src, hi(s, n), li(e, s, r, n, !0));
                    else {
                        if (s.loadComplete = function(i) {
                            if (c) {
                                if (t && t.index === e) {
                                    if (ui(i, !0))
                                        return i.loadComplete = i.img = null, ri(i, mt), It(i), void(t.index === f && o.updateCurrZoomItem());
                                    i.imageAppended?!Ue && i.placeholder && (i.placeholder.style.display = "none", i.placeholder = null) : _.transform && (at || Ue) ? ni.push({
                                        item: i,
                                        baseDiv: r,
                                        img: i.img,
                                        index: e,
                                        holder: t,
                                        clearPlaceholder: !0
                                    }) : li(e, i, r, i.img, at || Ue, !0)
                                }
                                i.loadComplete = null, i.img = null, Et("imageLoadComplete", e, i)
                            }
                        }, a.features.transform) {
                            var u = "pswp__img pswp__img--placeholder";
                            u += s.msrc ? "" : " pswp__img--placeholder--blank";
                            var h = a.createEl(u, s.msrc ? "img" : "");
                            s.msrc && (h.src = s.msrc), hi(s, h), r.appendChild(h), s.placeholder = h
                        }
                        s.loading || ci(s), o.allowProgressiveImg() && (!Ge && _.transform ? ni.push({
                            item: s,
                            baseDiv: r,
                            img: s.img,
                            index: e,
                            holder: t
                        }) : li(e, s, r, s.img, !0, !0))
                    }
                    Ge || e !== f ? It(s) : (nt = r.style, ei(s, n || s.img)), t.el.innerHTML = "", t.el.appendChild(r)
                },
                cleanSlide: function(t) {
                    t.img && (t.img.onload = t.img.onerror = null), t.loaded = t.loading = t.img = t.imageAppended=!1
                }
            }
        });
        var di, pi = {}, mi = function(t, e, i) {
            var n = document.createEvent("CustomEvent"), a = {
                origEvent: t,
                target: t.target,
                releasePoint: e,
                pointerType: i || "touch"
            };
            n.initCustomEvent("pswpTap", !0, !0, a), t.target.dispatchEvent(n)
        };
        kt("Tap", {
            publicMethods: {
                initTap: function() {
                    At("firstTouchStart", o.onTapStart), At("touchRelease", o.onTapRelease), At("destroy", function() {
                        pi = {}, di = null
                    })
                },
                onTapStart: function(t) {
                    t.length > 1 && (clearTimeout(di), di = null)
                },
                onTapRelease: function(t, e) {
                    if (e&&!Z&&!Y&&!Kt) {
                        var i = e;
                        if (di && (clearTimeout(di), di = null, Ce(i, pi)))
                            return void Et("doubleTap", i);
                        if ("mouse" === e.type)
                            return void mi(t, e, "mouse");
                        var n = t.target.tagName.toUpperCase();
                        if ("BUTTON" === n || a.hasClass(t.target, "pswp__single-tap"))
                            return void mi(t, e);
                        Vt(pi, i), di = setTimeout(function() {
                            mi(t, e), di = null
                        }, 300)
                    }
                }
            }
        });
        var vi;
        kt("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    V || (O ? At("mouseUsed", function() {
                        o.setupDesktopZoom()
                    }) : o.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(e) {
                    vi = {};
                    var i = "wheel mousewheel DOMMouseScroll";
                    At("bindEvents", function() {
                        a.bind(t, i, o.handleMouseWheel)
                    }), At("unbindEvents", function() {
                        vi && a.unbind(t, i, o.handleMouseWheel)
                    }), o.mouseZoomedIn=!1;
                    var n, s = function() {
                        o.mouseZoomedIn && (a.removeClass(t, "pswp--zoomed-in"), o.mouseZoomedIn=!1), 1 > y ? a.addClass(t, "pswp--zoom-allowed") : a.removeClass(t, "pswp--zoom-allowed"), r()
                    }, r = function() {
                        n && (a.removeClass(t, "pswp--dragging"), n=!1)
                    };
                    At("resize", s), At("afterChange", s), At("pointerDown", function() {
                        o.mouseZoomedIn && (n=!0, a.addClass(t, "pswp--dragging"))
                    }), At("pointerUp", r), e || s()
                },
                handleMouseWheel: function(t) {
                    if (y <= o.currItem.fitRatio)
                        return l.modal && (!l.closeOnScroll || Kt || X ? t.preventDefault() : L && Math.abs(t.deltaY) > 2 && (h=!0, o.close())), !0;
                    if (t.stopPropagation(), vi.x = 0, "deltaX"in t)
                        1 === t.deltaMode ? (vi.x = 18 * t.deltaX, vi.y = 18 * t.deltaY) : (vi.x = t.deltaX, vi.y = t.deltaY);
                    else if ("wheelDelta"in t)
                        t.wheelDeltaX && (vi.x =- .16 * t.wheelDeltaX), t.wheelDeltaY ? vi.y =- .16 * t.wheelDeltaY : vi.y =- .16 * t.wheelDelta;
                    else {
                        if (!("detail"in t))
                            return;
                        vi.y = t.detail
                    }
                    jt(y, !0);
                    var e = pt.x - vi.x, i = pt.y - vi.y;
                    (l.modal || e <= it.min.x && e >= it.max.x && i <= it.min.y && i >= it.max.y) && t.preventDefault(), o.panTo(e, i)
                },
                toggleDesktopZoom: function(e) {
                    e = e || {
                        x: mt.x / 2 + gt.x,
                        y: mt.y / 2 + gt.y
                    };
                    var i = l.getDoubleTapZoom(!0, o.currItem), n = y === i;
                    o.mouseZoomedIn=!n, o.zoomTo(n ? o.currItem.initialZoomLevel : i, e, 333), a[(n ? "remove" : "add") + "Class"](t, "pswp--zoomed-in")
                }
            }
        });
        var gi, yi, bi, wi, xi, Ci, Si, ki, Pi, Ti, Ai, Ei, Mi = {
            history: !0,
            galleryUID: 1
        }, Li = function() {
            return Ai.hash.substring(1)
        }, Fi = function() {
            gi && clearTimeout(gi), bi && clearTimeout(bi)
        }, Oi = function() {
            var t = Li(), e = {};
            if (t.length < 5)
                return e;
            var i, n = t.split("&");
            for (i = 0; i < n.length; i++)
                if (n[i]) {
                    var a = n[i].split("=");
                    a.length < 2 || (e[a[0]] = a[1])
                }
            if (l.galleryPIDs) {
                var o = e.pid;
                for (e.pid = 0, i = 0; i < Ze.length; i++)
                    if (Ze[i].pid === o) {
                        e.pid = i;
                        break
                    }
            } else
                e.pid = parseInt(e.pid, 10) - 1;
            return e.pid < 0 && (e.pid = 0), e
        }, Ii = function() {
            if (bi && clearTimeout(bi), Kt || X)
                return void(bi = setTimeout(Ii, 500));
            wi ? clearTimeout(yi) : wi=!0;
            var t = f + 1, e = Ke(f);
            e.hasOwnProperty("pid") && (t = e.pid);
            var i = Si + "&gid=" + l.galleryUID + "&pid=" + t;
            ki||-1 === Ai.hash.indexOf(i) && (Ti=!0);
            var n = Ai.href.split("#")[0] + "#" + i;
            Ei ? "#" + i !== window.location.hash && history[ki ? "replaceState": "pushState"]("", document.title, n) : ki ? Ai.replace(n) : Ai.hash = i, ki=!0, yi = setTimeout(function() {
                wi=!1
            }, 60)
        };
        kt("History", {
            publicMethods: {
                initHistory: function() {
                    if (a.extend(l, Mi, !0), l.history) {
                        Ai = window.location, Ti=!1, Pi=!1, ki=!1, Si = Li(), Ei = "pushState"in history, Si.indexOf("gid=")>-1 && (Si = Si.split("&gid=")[0], Si = Si.split("?gid=")[0]), At("afterChange", o.updateURL), At("unbindEvents", function() {
                            a.unbind(window, "hashchange", o.onHashChange)
                        });
                        var t = function() {
                            Ci=!0, Pi || (Ti ? history.back() : Si ? Ai.hash = Si : Ei ? history.pushState("", document.title, Ai.pathname + Ai.search) : Ai.hash = ""), Fi()
                        };
                        At("unbindEvents", function() {
                            h && t()
                        }), At("destroy", function() {
                            Ci || t()
                        }), At("firstUpdate", function() {
                            f = Oi().pid
                        });
                        var e = Si.indexOf("pid=");
                        e>-1 && (Si = Si.substring(0, e), "&" === Si.slice( - 1) && (Si = Si.slice(0, - 1))), setTimeout(function() {
                            c && a.bind(window, "hashchange", o.onHashChange)
                        }, 40)
                    }
                },
                onHashChange: function() {
                    return Li() === Si ? (Pi=!0, void o.close()) : void(wi || (xi=!0, o.goTo(Oi().pid), xi=!1))
                },
                updateURL: function() {
                    Fi(), xi || (ki ? gi = setTimeout(Ii, 800) : Ii())
                }
            }
        }), a.extend(o, ne)
    };
    return t
}), !function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.PhotoSwipeUI_Default = e()
}(this, function() {
    "use strict";
    var t = function(t, e) {
        var i, n, a, o, s, r, l, c, u, h, f, d, p, m, v, g, y, b, w, x = this, C=!1, S=!0, k=!0, P = {
            barsSize: {
                top: 44,
                bottom: "auto"
            },
            closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
            timeToIdle: 4e3,
            timeToIdleOutside: 1e3,
            loadingIndicatorDelay: 1e3,
            addCaptionHTMLFn: function(t, e) {
                return t.title ? (e.children[0].innerHTML = t.title, !0) : (e.children[0].innerHTML = "", !1)
            },
            closeEl: !0,
            captionEl: !0,
            fullscreenEl: !0,
            zoomEl: !0,
            shareEl: !0,
            counterEl: !0,
            arrowEl: !0,
            preloaderEl: !0,
            tapToClose: !1,
            tapToToggleControls: !0,
            clickToCloseNonZoomable: !0,
            shareButtons: [{
                id: "facebook",
                label: "Share on Facebook",
                url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
            }, {
                id: "twitter",
                label: "Tweet",
                url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
            }, {
                id: "pinterest",
                label: "Pin it",
                url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
            }, {
                id: "download",
                label: "Download image",
                url: "{{raw_image_url}}",
                download: !0
            }
            ],
            getImageURLForShare: function() {
                return t.currItem.src || ""
            },
            getPageURLForShare: function() {
                return window.location.href
            },
            getTextForShare: function() {
                return t.currItem.title || ""
            },
            indexIndicatorSep: " / ",
            fitControlsWidth: 1200
        }, T = function(t) {
            if (g)
                return !0;
            t = t || window.event, v.timeToIdle && v.mouseUsed&&!u && z();
            for (var i, n, a = t.target || t.srcElement, o = a.getAttribute("class") || "", s = 0; s < $.length; s++)
                i = $[s], i.onTap && o.indexOf("pswp__" + i.name)>-1 && (i.onTap(), n=!0);
            if (n) {
                t.stopPropagation && t.stopPropagation(), g=!0;
                var r = e.features.isOldAndroid ? 600: 30;
                y = setTimeout(function() {
                    g=!1
                }, r)
            }
        }, A = function() {
            return !t.likelyTouchDevice || v.mouseUsed || screen.width > v.fitControlsWidth
        }, E = function(t, i, n) {
            e[(n ? "add" : "remove") + "Class"](t, "pswp__" + i)
        }, M = function() {
            var t = 1 === v.getNumItemsFn();
            t !== m && (E(n, "ui--one-slide", t), m = t)
        }, L = function() {
            E(l, "share-modal--hidden", k)
        }, F = function() {
            return k=!k, k ? (e.removeClass(l, "pswp__share-modal--fade-in"), setTimeout(function() {
                k && L()
            }, 300)) : (L(), setTimeout(function() {
                k || e.addClass(l, "pswp__share-modal--fade-in")
            }, 30)), k || I(), !1
        }, O = function(e) {
            e = e || window.event;
            var i = e.target || e.srcElement;
            return t.shout("shareLinkClick", e, i), i.href ? i.hasAttribute("download")?!0 : (window.open(i.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), k || F(), !1) : !1
        }, I = function() {
            for (var t, e, i, n, a, o = "", s = 0; s < v.shareButtons.length; s++)
                t = v.shareButtons[s], i = v.getImageURLForShare(t), n = v.getPageURLForShare(t), a = v.getTextForShare(t), e = t.url.replace("{{url}}", encodeURIComponent(n)).replace("{{image_url}}", encodeURIComponent(i)).replace("{{raw_image_url}}", i).replace("{{text}}", encodeURIComponent(a)), o += '<a href="' + e + '" target="_blank" class="pswp__share--' + t.id + '"' + (t.download ? "download" : "") + ">" + t.label + "</a>", v.parseShareButtonOut && (o = v.parseShareButtonOut(t, o));
            l.children[0].innerHTML = o, l.children[0].onclick = O
        }, R = function(t) {
            for (var i = 0; i < v.closeElClasses.length; i++)
                if (e.hasClass(t, "pswp__" + v.closeElClasses[i]))
                    return !0
        }, D = 0, z = function() {
            clearTimeout(w), D = 0, u && x.setIdle(!1)
        }, V = function(t) {
            t = t ? t : window.event;
            var e = t.relatedTarget || t.toElement;
            e && "HTML" !== e.nodeName || (clearTimeout(w), w = setTimeout(function() {
                x.setIdle(!0)
            }, v.timeToIdleOutside))
        }, W = function() {
            v.fullscreenEl&&!e.features.isOldAndroid && (i || (i = x.getFullscreenAPI()), i ? (e.bind(document, i.eventK, x.updateFullscreen), x.updateFullscreen(), e.addClass(t.template, "pswp--supports-fs")) : e.removeClass(t.template, "pswp--supports-fs"))
        }, _ = function() {
            v.preloaderEl && (H(!0), h("beforeChange", function() {
                clearTimeout(p), p = setTimeout(function() {
                    t.currItem && t.currItem.loading ? (!t.allowProgressiveImg() || t.currItem.img&&!t.currItem.img.naturalWidth) && H(!1) : H(!0)
                }, v.loadingIndicatorDelay)
            }), h("imageLoadComplete", function(e, i) {
                t.currItem === i && H(!0)
            }))
        }, H = function(t) {
            d !== t && (E(f, "preloader--active", !t), d = t)
        }, B = function(t) {
            var i = t.vGap;
            if (A()) {
                var s = v.barsSize;
                if (v.captionEl && "auto" === s.bottom)
                    if (o || (o = e.createEl("pswp__caption pswp__caption--fake"), o.appendChild(e.createEl("pswp__caption__center")), n.insertBefore(o, a), e.addClass(n, "pswp__ui--fit")), v.addCaptionHTMLFn(t, o, !0)) {
                        var r = o.clientHeight;
                        i.bottom = parseInt(r, 10) || 44
                    } else
                        i.bottom = s.top;
                else
                    i.bottom = "auto" === s.bottom ? 0 : s.bottom;
                i.top = s.top
            } else
                i.top = i.bottom = 0
        }, N = function() {
            v.timeToIdle && h("mouseUsed", function() {
                e.bind(document, "mousemove", z), e.bind(document, "mouseout", V), b = setInterval(function() {
                    D++, 2 === D && x.setIdle(!0)
                }, v.timeToIdle / 2)
            })
        }, j = function() {
            h("onVerticalDrag", function(t) {
                S && .95 > t ? x.hideControls() : !S && t >= .95 && x.showControls()
            });
            var t;
            h("onPinchClose", function(e) {
                S && .9 > e ? (x.hideControls(), t=!0) : t&&!S && e > .9 && x.showControls()
            }), h("zoomGestureEnded", function() {
                t=!1, t&&!S && x.showControls()
            })
        }, $ = [{
            name: "caption",
            option: "captionEl",
            onInit: function(t) {
                a = t
            }
        }, {
            name: "share-modal",
            option: "shareEl",
            onInit: function(t) {
                l = t
            },
            onTap: function() {
                F()
            }
        }, {
            name: "button--share",
            option: "shareEl",
            onInit: function(t) {
                r = t
            },
            onTap: function() {
                F()
            }
        }, {
            name: "button--zoom",
            option: "zoomEl",
            onTap: t.toggleDesktopZoom
        }, {
            name: "counter",
            option: "counterEl",
            onInit: function(t) {
                s = t
            }
        }, {
            name: "button--close",
            option: "closeEl",
            onTap: t.close
        }, {
            name: "button--arrow--left",
            option: "arrowEl",
            onTap: t.prev
        }, {
            name: "button--arrow--right",
            option: "arrowEl",
            onTap: t.next
        }, {
            name: "button--fs",
            option: "fullscreenEl",
            onTap: function() {
                i.isFullscreen() ? i.exit() : i.enter()
            }
        }, {
            name: "preloader",
            option: "preloaderEl",
            onInit: function(t) {
                f = t
            }
        }
        ], q = function() {
            var t, i, a, o = function(n) {
                if (n)
                    for (var o = n.length, s = 0; o > s; s++) {
                        t = n[s], i = t.className;
                        for (var r = 0; r < $.length; r++)
                            a = $[r], i.indexOf("pswp__" + a.name)>-1 && (v[a.option] ? (e.removeClass(t, "pswp__element--disabled"), a.onInit && a.onInit(t)) : e.addClass(t, "pswp__element--disabled"))
                    }
            };
            o(n.children);
            var s = e.getChildByClass(n, "pswp__top-bar");
            s && o(s.children)
        };
        x.init = function() {
            e.extend(t.options, P, !0), v = t.options, n = e.getChildByClass(t.scrollWrap, "pswp__ui"), h = t.listen, j(), h("beforeChange", x.update), h("doubleTap", function(e) {
                var i = t.currItem.initialZoomLevel;
                t.getZoomLevel() !== i ? t.zoomTo(i, e, 333) : t.zoomTo(v.getDoubleTapZoom(!1, t.currItem), e, 333)
            }), h("preventDragEvent", function(t, e, i) {
                var n = t.target || t.srcElement;
                n && n.getAttribute("class") && t.type.indexOf("mouse")>-1 && (n.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(n.tagName)) && (i.prevent=!1)
            }), h("bindEvents", function() {
                e.bind(n, "pswpTap click", T), e.bind(t.scrollWrap, "pswpTap", x.onGlobalTap), t.likelyTouchDevice || e.bind(t.scrollWrap, "mouseover", x.onMouseOver)
            }), h("unbindEvents", function() {
                k || F(), b && clearInterval(b), e.unbind(document, "mouseout", V), e.unbind(document, "mousemove", z), e.unbind(n, "pswpTap click", T), e.unbind(t.scrollWrap, "pswpTap", x.onGlobalTap), e.unbind(t.scrollWrap, "mouseover", x.onMouseOver), i && (e.unbind(document, i.eventK, x.updateFullscreen), i.isFullscreen() && (v.hideAnimationDuration = 0, i.exit()), i = null)
            }), h("destroy", function() {
                v.captionEl && (o && n.removeChild(o), e.removeClass(a, "pswp__caption--empty")), l && (l.children[0].onclick = null), e.removeClass(n, "pswp__ui--over-close"), e.addClass(n, "pswp__ui--hidden"), x.setIdle(!1)
            }), v.showAnimationDuration || e.removeClass(n, "pswp__ui--hidden"), h("initialZoomIn", function() {
                v.showAnimationDuration && e.removeClass(n, "pswp__ui--hidden")
            }), h("initialZoomOut", function() {
                e.addClass(n, "pswp__ui--hidden")
            }), h("parseVerticalMargin", B), q(), v.shareEl && r && l && (k=!0), M(), N(), W(), _()
        }, x.setIdle = function(t) {
            u = t, E(n, "ui--idle", t)
        }, x.update = function() {
            S && t.currItem ? (x.updateIndexIndicator(), v.captionEl && (v.addCaptionHTMLFn(t.currItem, a), E(a, "caption--empty", !t.currItem.title)), C=!0) : C=!1, k || F(), M()
        }, x.updateFullscreen = function(n) {
            n && setTimeout(function() {
                t.setScrollOffset(0, e.getScrollY())
            }, 50), e[(i.isFullscreen() ? "add" : "remove") + "Class"](t.template, "pswp--fs")
        }, x.updateIndexIndicator = function() {
            v.counterEl && (s.innerHTML = t.getCurrentIndex() + 1 + v.indexIndicatorSep + v.getNumItemsFn())
        }, x.onGlobalTap = function(i) {
            i = i || window.event;
            var n = i.target || i.srcElement;
            if (!g)
                if (i.detail && "mouse" === i.detail.pointerType) {
                    if (R(n))
                        return void t.close();
                        e.hasClass(n, "pswp__img") && (1 === t.getZoomLevel() && t.getZoomLevel() <= t.currItem.fitRatio ? v.clickToCloseNonZoomable && t.close() : t.toggleDesktopZoom(i.detail.releasePoint))
                } else if (v.tapToToggleControls && (S ? x.hideControls() : x.showControls()), v.tapToClose && (e.hasClass(n, "pswp__img") || R(n)))
                    return void t.close()
        }, x.onMouseOver = function(t) {
            t = t || window.event;
            var e = t.target || t.srcElement;
            E(n, "ui--over-close", R(e))
        }, x.hideControls = function() {
            e.addClass(n, "pswp__ui--hidden"), S=!1
        }, x.showControls = function() {
            S=!0, C || x.update(), e.removeClass(n, "pswp__ui--hidden")
        }, x.supportsFullscreen = function() {
            var t = document;
            return !!(t.exitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen || t.msExitFullscreen)
        }, x.getFullscreenAPI = function() {
            var e, i = document.documentElement, n = "fullscreenchange";
            return i.requestFullscreen ? e = {
                enterK: "requestFullscreen",
                exitK: "exitFullscreen",
                elementK: "fullscreenElement",
                eventK: n
            } : i.mozRequestFullScreen ? e = {
                enterK: "mozRequestFullScreen",
                exitK: "mozCancelFullScreen",
                elementK: "mozFullScreenElement",
                eventK: "moz" + n
            } : i.webkitRequestFullscreen ? e = {
                enterK: "webkitRequestFullscreen",
                exitK: "webkitExitFullscreen",
                elementK: "webkitFullscreenElement",
                eventK: "webkit" + n
            } : i.msRequestFullscreen && (e = {
                enterK: "msRequestFullscreen",
                exitK: "msExitFullscreen",
                elementK: "msFullscreenElement",
                eventK: "MSFullscreenChange"
            }), e && (e.enter = function() {
                return c = v.closeOnScroll, v.closeOnScroll=!1, "webkitRequestFullscreen" !== this.enterK ? t.template[this.enterK]() : void t.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
            }, e.exit = function() {
                return v.closeOnScroll = c, document[this.exitK]()
            }, e.isFullscreen = function() {
                return document[this.elementK]
            }), e
        }
    };
    return t
});
var initPhotoSwipeFromDOM = function(t) {
    for (var e = function(t) {
        for (var a, o, s, r, e = t.childNodes, i = e.length, n = [], l = 0; i > l; l++)
            a = e[l], 1 === a.nodeType && (o = a.children[0], s = o.getAttribute("data-size").split("x"), r = {
                src: o.getAttribute("href"),
                w: parseInt(s[0], 10),
                h: parseInt(s[1], 10)
            }, a.children.length > 1 && (r.title = a.children[1].innerHTML), o.children.length > 0 && (r.msrc = o.children[0].getAttribute("src")), r.el = a, n.push(r));
        return n
    }, i = function u(t, e) {
        return t && (e(t) ? t : u(t.parentNode, e))
    }, n = function(t) {
        t = t || window.event, t.preventDefault ? t.preventDefault() : t.returnValue=!1;
        var e = t.target || t.srcElement, n = i(e, function(t) {
            return t.tagName && "FIGURE" === t.tagName.toUpperCase()
        });
        if (n) {
            for (var c, a = n.parentNode, s = n.parentNode.childNodes, r = s.length, l = 0, u = 0; r > u; u++)
                if (1 === s[u].nodeType) {
                    if (s[u] === n) {
                        c = l;
                        break
                    }
                    l++
                }
            return c >= 0 && o(c, a), !1
        }
    }, a = function() {
        var t = window.location.hash.substring(1), e = {};
        if (t.length < 5)
            return e;
        for (var i = t.split("&"), n = 0; n < i.length; n++)
            if (i[n]) {
                var a = i[n].split("=");
                a.length < 2 || (e[a[0]] = a[1])
            }
        return e.gid && (e.gid = parseInt(e.gid, 10)), e
    }, o = function(t, i, n, a) {
        var s, r, l, o = document.querySelectorAll(".pswp")[0];
        if (l = e(i), r = {
            galleryUID: i.getAttribute("data-pswp-uid"),
            getThumbBoundsFn: function(t) {
                var e = l[t].el.getElementsByTagName("img")[0], i = window.pageYOffset || document.documentElement.scrollTop, n = e.getBoundingClientRect();
                return {
                    x: n.left,
                    y: n.top + i,
                    w: n.width
                }
            }
        }, a)
            if (r.galleryPIDs) {
                for (var c = 0; c < l.length; c++)
                    if (l[c].pid == t) {
                        r.index = c;
                        break
                    }
            } else
                r.index = parseInt(t, 10) - 1;
        else
            r.index = parseInt(t, 10);
        isNaN(r.index) || (n && (r.showAnimationDuration = 0), s = new PhotoSwipe(o, PhotoSwipeUI_Default, l, r), s.init())
    }, s = document.querySelectorAll(t), r = 0, l = s.length; l > r; r++)
        s[r].setAttribute("data-pswp-uid", r + 1), s[r].onclick = n;
    var c = a();
    c.pid && c.gid && o(c.pid, s[c.gid - 1], !0, !0)
};
initPhotoSwipeFromDOM(".mdb-lightbox"), function(t) {
    t.fn.sticky = function(e) {
        function a() {
            return "number" == typeof n.zIndex?!0 : !1
        }
        function s() {
            return 0 < t(n.stopper).length || "number" == typeof n.stopper?!0 : !1
        }
        var i = {
            topSpacing: 0,
            zIndex: "",
            stopper: ".sticky-stopper"
        }, n = t.extend({}, i, e), o = a(), r = s();
        return this.each(function() {
            function d() {
                var n = f.scrollTop();
                if (r && "string" == typeof h)
                    var a = t(h).offset().top, d = a - i - s;
                else if (r && "number" == typeof h)
                    var d = h;
                if (n > c) {
                    if (e.after(u).css({
                        position: "fixed",
                        top: s
                    }), o && e.css({
                        zIndex: l
                    }), r && n > d) {
                        var p = d - n + s;
                        e.css({
                            top: p
                        })
                    }
                } else
                    e.css({
                        position: "static",
                        top: null,
                        left: null
                    }), u.remove()
            }
            var e = t(this), i = e.outerHeight(), a = e.outerWidth(), s = n.topSpacing, l = n.zIndex, c = e.offset().top - s, u = t("<div></div>").width(a).height(i).addClass("sticky-placeholder"), h = n.stopper, f = t(window);
            f.bind("scroll", d)
        })
    }
}(jQuery);

//# sourceMappingURL=lib.js.map
