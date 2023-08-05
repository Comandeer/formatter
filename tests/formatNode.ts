import test from 'ava';
import formatNode from '../src/formatNode.js';
import { Node } from '@babel/types';
import { createContext } from '../src/context.js';

test( 'formatNode() throws error if the unsupported node type is passed', ( t ) => {
	const node = {
		type: 'hublabubla'
	} as unknown as Node;
	const context = createContext( node, null, {
		indent: 0,
		code: ''
	} );

	t.throws( () => {
		formatNode( context );
	}, {
		instanceOf: Error,
		message: `Formatter for "${ context.node.type }" nodes is not implemented!`
	} );
} );
