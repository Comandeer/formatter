import { isBlockStatement } from '@babel/types';
import { FormatterContext } from '../context.js';
import indent from '../utils/indent.js';

export default function BlockStatement( context: FormatterContext ): string {
	const { node } = context;

	if ( !isBlockStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const body = node.body.map( ( node ) => {
		return context.formatDescendant( node, {
			increaseIndent: true
		} );
	} ).join( '\n' );

	return `{\n${ indent( context.state.indent + 1 ) }${ body }\n${ indent( context.state.indent ) }}`;
}
