import assert from 'node:assert';
import { isVariableDeclaration } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function VariableDeclaration( context: FormatterContext ): string {
	const { node } = context;

	if ( !isVariableDeclaration( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const keyword = node.kind;

	assert( node.declarations[ 0 ], 'There is at least one declaration' );

	const declaration = node.declarations[ 0 ];
	const identifier = context.formatDescendant( declaration.id );
	const initializer = declaration.init ? ` = ${ context.formatDescendant( declaration.init ) }` : '';
	const nextNodeContext = context.getNextNodeContext();
	const isNextNodeVariableDeclaration = nextNodeContext !== null && isVariableDeclaration( nextNodeContext.node );
	const finalNewLine = isNextNodeVariableDeclaration ? '' : '\n';

	return `${ keyword } ${ identifier }${ initializer };${ finalNewLine }`;
}
