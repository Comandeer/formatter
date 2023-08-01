import { Identifier as IdentifierNode, Node, isIdentifier } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function Identifier( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isIdentifier( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const typeAnnotation = formatTypeAnnotation( node, context, format );

	return `${ node.name }${ typeAnnotation }`;
}

function formatTypeAnnotation( identifier: IdentifierNode, context: FormatterContext, format: Formatter ): string {
	if ( !identifier.typeAnnotation ) {
		return '';
	}

	context = {
		...context,
		node: identifier
	};

	return `: ${ format( identifier.typeAnnotation, context, format ) }`;
}
