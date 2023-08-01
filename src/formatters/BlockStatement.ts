import { Node, isBlockStatement } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function BlockStatement( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isBlockStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const body = node.body.map( ( node ) => {
		return format( node, context, format );
	} ).join( '\n' );

	return `{
	${ body }
}`;
}
