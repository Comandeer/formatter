import { ArrowFunctionExpression as ArrowFunctionExpressionNode, isArrowFunctionExpression, isBlockStatement } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function ArrowFunctionExpression( context: FormatterContext ): string {
	const { node } = context;

	if ( !isArrowFunctionExpression( node ) ) {
		throw new TypeError( 'Incorrect node type' );
	}

	const params = node.params.map( ( param ) => {
		return context.formatDescendant( param );
	} ).join( ', ' );
	const returnType = formatReturnType( node, context );
	const body = formatBody( node, context );

	return `( ${ params } )${ returnType } => ${ body }`;
}

function formatReturnType( node: ArrowFunctionExpressionNode, context: FormatterContext ): string {
	if ( !node.returnType ) {
		return '';
	}

	const formattedReturnType = context.formatDescendant( node.returnType );

	return `: ${ formattedReturnType }`;
}

function formatBody( node: ArrowFunctionExpressionNode, context: FormatterContext ): string {
	const formattedBody = context.formatDescendant( node.body );

	if ( !isBlockStatement( node.body ) ) {
		return `{
	return ${ formattedBody };
}`;
	}

	return formattedBody;
}
