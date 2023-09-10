import { BlockStatement, Expression, Statement, blockStatement, expressionStatement, isBlockStatement, isExpression } from '@babel/types';

export default function wrapInBlock( node: Statement | Expression ): BlockStatement {
	if ( isBlockStatement( node ) ) {
		return node;
	}

	if ( isExpression( node ) ) {
		node = expressionStatement( node );
	}

	return blockStatement( [ node ] );
}
