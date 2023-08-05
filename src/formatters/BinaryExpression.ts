import { isBinaryExpression } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function BinaryExpression( context: FormatterContext ): string {
	const { node } = context;

	if ( !isBinaryExpression( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const formattedLeft = context.formatDescendant( node.left );
	const formattedRight = context.formatDescendant( node.right );

	return `${ formattedLeft } ${ node.operator } ${ formattedRight }`;
}
