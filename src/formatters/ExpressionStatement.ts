import { Node, isExpressionStatement } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function ExpressionStatement( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isExpressionStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	context = {
		...context,
		node
	};

	const formattedExpression = format( node.expression, context, format );

	return `${ formattedExpression };`;
}
