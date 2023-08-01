import { Node, isFunctionDeclaration } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function FunctionDeclaration( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isFunctionDeclaration( node ) ) {
		throw new Error( 'Invalid node type' );
	}

	context = {
		...context,
		node
	};

	const functionName = node.id != null ? format( node.id, context, format ) : '';
	const params = node.params.map( ( param ) => {
		return format( param, context, format );
	} ).join( ', ' );
	const returnType = node.returnType ? `: ${ format( node.returnType, {
		...context,
		node: node.returnType
	}, format ) }` : '';

	return `function ${ functionName }(${ params.length > 0 ? ` ${ params } ` : '' })${ returnType } ${ format( node.body, context, format ) }`;
}
