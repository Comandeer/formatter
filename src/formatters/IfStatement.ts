import { IfStatement as IfStatementNode, isIfStatement } from '@babel/types';
import { FormatterContext } from '../context.js';
import wrapInBlock from '../utils/wrapInBlock.js';

export default function IfStatement( context: FormatterContext ): string {
	const { node } = context;

	if ( !isIfStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const previousNodeContext = context.getPreviousNodeContext();
	const newLine = previousNodeContext ? '\n' : '';
	const formattedTest = context.formatDescendant( node.test );
	const formattedBody = formatBody( node, context );
	const formattedAlternate = node.alternate ? ` else ${ formatAlternate( node, context ) }` : '';

	return `${ newLine }if ( ${ formattedTest } ) ${ formattedBody }${ formattedAlternate }`;
}

function formatBody( node: IfStatementNode, context: FormatterContext ): string {
	const body = wrapInBlock( node.consequent );
	const formattedBody = context.formatDescendant( body );

	return formattedBody;
}

function formatAlternate( node: IfStatementNode, context: FormatterContext ): string {
	if ( !node.alternate ) {
		return '';
	}

	const alternate = isIfStatement( node.alternate ) ? node.alternate : wrapInBlock( node.alternate );
	const formattedAlternate = context.formatDescendant( alternate );

	return formattedAlternate;
}
