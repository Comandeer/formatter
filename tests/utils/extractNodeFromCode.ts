import test from 'ava';
import extractNodeFromCode from '../../src/utils/extractNodeFromCode.js';
import parseCode from '../../src/parseCode.js';

test( 'extractNodeFromCode() correctly extracts the node from the code', async ( t ) => {
	const code = 'console.log( true );';
	const ast = await parseCode( code );
	const extractedNode = extractNodeFromCode( ast.body[ 0 ]!, code );

	t.is( extractedNode, code );
} );

test( 'extractNodeFromCode() returns null if the node#start is not set', async ( t ) => {
	const code = 'console.log( true );';
	const ast = await parseCode( code );
	const node = ast.body[ 0 ]!;

	delete node.start;

	const extractedNode = extractNodeFromCode( node, code );

	t.is( extractedNode, null );
} );

test( 'extractNodeFromCode() returns null if the node#end is not set', async ( t ) => {
	const code = 'console.log( true );';
	const ast = await parseCode( code );
	const node = ast.body[ 0 ]!;

	delete node.end;

	const extractedNode = extractNodeFromCode( node, code );

	t.is( extractedNode, null );
} );
