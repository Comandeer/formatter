import { ArrowFunctionExpression as ArrowFunctionExpressionNode, BlockStatement, Expression, isArrowFunctionExpression, isBlockStatement, returnStatement } from '@babel/types';
import { FormatterContext } from '../context.js';
import wrapInBlock from '../utils/wrapInBlock.js';

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
	const body = wrapBodyInBlock( node.body );
	const formattedBody = context.formatDescendant( body );

	return formattedBody;
}

function wrapBodyInBlock( body: BlockStatement | Expression ): BlockStatement {
	if ( isBlockStatement( body ) ) {
		return body;
	}

	const returnStatementNode = returnStatement( body );

	return wrapInBlock( returnStatementNode );
}
