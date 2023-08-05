import { isBlockStatement } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function BlockStatement( context: FormatterContext ): string {
	const { node } = context;

	if ( !isBlockStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const body = node.body.map( ( node ) => {
		return context.formatDescendant( node );
	} ).join( '\n' );

	return `{
	${ body }
}`;
}
