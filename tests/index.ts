import test from 'ava';
import format from '../src/index.js';

test( '#format() is a function', ( t ) => {
	t.is( typeof format, 'function' );
} );
