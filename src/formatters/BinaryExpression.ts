import { Node, isBinaryExpression } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function BinaryExpression( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isBinaryExpression( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	return `${ format( node.left, context, format ) } ${ node.operator } ${ format( node.right, context, format ) }`;
}
