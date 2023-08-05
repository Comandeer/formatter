import { Identifier as IdentifierNode, isIdentifier } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function Identifier( context: FormatterContext ): string {
	const { node } = context;

	if ( !isIdentifier( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const typeAnnotation = formatTypeAnnotation( node, context );

	return `${ node.name }${ typeAnnotation }`;
}

function formatTypeAnnotation( node: IdentifierNode, context: FormatterContext ): string {
	if ( !node.typeAnnotation ) {
		return '';
	}

	const formattedTypeAnnotation = context.formatDescendant( node.typeAnnotation );

	return `: ${ formattedTypeAnnotation }`;
}
