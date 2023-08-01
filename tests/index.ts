import test from 'ava';
import format from '../src/index.js';
import testFormatting from './__helpers__/macros/testFormatting.js';

test( 'format() is a function', ( t ) => {
	t.is( typeof format, 'function' );
} );

test( 'format() formats a simple function', testFormatting, {
	fixture: '1-simple-function'
} );

test( 'format() formats a simple arrow function', testFormatting, {
	fixture: '2-arrow-function'
} );
