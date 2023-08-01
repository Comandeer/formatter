import { ArrowFunctionExpression as ArrowFunctionExpressionNode, Node, isArrowFunctionExpression, isBlockStatement } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function ArrowFunctionExpression( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isArrowFunctionExpression( node ) ) {
		throw new TypeError( 'Incorrect node type' );
	}

	context = {
		...context,
		node
	};

	const params = node.params.map( ( param ) => {
		return format( param, context, format );
	} ).join( ', ' );
	const returnType = node.returnType ? `: ${ format( node.returnType, {
		...context,
		node: node.returnType
	}, format ) }` : '';
	const body = formatBody( node, context, format );

	return `( ${ params } )${ returnType } => ${ body }`;
}

function formatBody( node: ArrowFunctionExpressionNode, context: FormatterContext, format: Formatter ): string {
	if ( !isBlockStatement( node.body ) ) {
		return `{
	return ${ format( node.body, context, format ) };
}`;
	}

	return format( node.body, context, format );
}
