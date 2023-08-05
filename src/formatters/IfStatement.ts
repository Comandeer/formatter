import { IfStatement as IfStatementNode, isBlockStatement, isIfStatement } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function IfStatement( context: FormatterContext ): string {
	const { node } = context;

	if ( !isIfStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const formattedTest = context.formatDescendant( node.test );
	const formattedBody = formatBody( node, context );
	const formattedAlternate = node.alternate ? ` else ${ formatAlternate( node, context ) }` : '';

	return `if ( ${ formattedTest } ) ${ formattedBody }${ formattedAlternate }`;
}

function formatBody( node: IfStatementNode, context: FormatterContext ): string {
	const body = node.consequent;
	const formattedBody = context.formatDescendant( body );

	if ( !isBlockStatement( body ) ) {
		return `{
	${ formattedBody }
}`;
	}

	return formattedBody;
}

function formatAlternate( node: IfStatementNode, context: FormatterContext ): string {
	const alternate = node.alternate;

	if ( !alternate ) {
		return '';
	}

	const formattedAlternate = context.formatDescendant( alternate );

	if ( !isBlockStatement( alternate ) && !isIfStatement( alternate ) ) {
		return `{
	${ formattedAlternate }
}`;
	}

	return formattedAlternate;
}
