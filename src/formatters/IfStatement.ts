import { IfStatement as IfStatementNode, Node, isBlockStatement, isIfStatement } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function IfStatement( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isIfStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	context = {
		...context,
		node
	};
	const formattedTest = format( node.test, context, format );
	const formattedBody = formatBody( node, context, format );
	const formattedAlternate = node.alternate ? ` else ${ formatAlternate( node, context, format ) }` : '';

	return `if ( ${ formattedTest } ) ${ formattedBody }${ formattedAlternate }`;
}

function formatBody( node: IfStatementNode, context: FormatterContext, format: Formatter ): string {
	const body = node.consequent;
	const bodyContext = {
		...context,
		node: body
	};
	const formattedBody = format( body, bodyContext, format );

	if ( !isBlockStatement( body ) ) {
		return `{
	${ formattedBody }
}`;
	}

	return formattedBody;
}

function formatAlternate( node: IfStatementNode, context: FormatterContext, format: Formatter ): string {
	const alternate = node.alternate;

	if ( !alternate ) {
		return '';
	}

	const alternateContext = {
		...context,
		node: alternate
	};
	const formattedBody = format( alternate, alternateContext, format );

	if ( !isBlockStatement( alternate ) && !isIfStatement( alternate ) ) {
		return `{
	${ formattedBody }
}`;
	}

	return formattedBody;
}
