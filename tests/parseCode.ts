import test from 'ava';
import parseCode from '../src/parseCode.js';
import { isProgram } from '@babel/types';

test( 'parseCode() parses JS code', async ( t ) => {
	const code = `function fn() {
		return true;
	}`;
	const parsedCode = await parseCode( code );

	t.true( isProgram( parsedCode ) );
} );

test( 'parseCode() parses TS code', async ( t ) => {
	const code = `function fn(): boolean {
		return true;
	}`;
	const parsedCode = await parseCode( code );

	t.true( isProgram( parsedCode ) );
} );
