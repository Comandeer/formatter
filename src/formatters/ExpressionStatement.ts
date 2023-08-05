import { isExpressionStatement } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function ExpressionStatement( context: FormatterContext ): string {
	const { node } = context;

	if ( !isExpressionStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const formattedExpression = context.formatDescendant( node.expression );

	return `${ formattedExpression };`;
}
