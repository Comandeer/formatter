import { isProgram } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function Program( context: FormatterContext ): string {
	const { node } = context;

	if ( !isProgram( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const innerBody = node.body.map( ( node ) => {
		return context.formatDescendant( node );
	} ).filter( ( node ) => {
		return node.length > 0;
	} );

	return `${ innerBody.join( '\n' ) }\n`;
}
