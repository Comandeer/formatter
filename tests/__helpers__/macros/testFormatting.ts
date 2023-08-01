import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'ava';
import { dirname, resolve as resolvePath } from 'pathe';
import format from '../../../src/index.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const fixtureDirPath = resolvePath( __dirname, '..', '..', '__fixtures__' );

interface TestFormattingOptions {
	fixture: string;
}

export default test.macro( async ( t, {
	fixture
}: TestFormattingOptions ): Promise<void> => {
	const fixturePath = resolvePath( fixtureDirPath, fixture );
	const inputCodePath = resolvePath( fixturePath, 'input.ts' );
	const inputCode = await readFile( inputCodePath, 'utf-8' );
	const expectedCodePath = resolvePath( fixturePath, 'expected.ts' );
	const expectedCode = await readFile( expectedCodePath, 'utf-8' );
	const actualCode = await format( inputCode );

	t.is( actualCode, expectedCode );
} );
