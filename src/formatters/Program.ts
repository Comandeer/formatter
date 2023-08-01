import { Node, isProgram } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function Program( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isProgram( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	context = {
		...context,
		node
	};

	const innerBody = node.body.map( ( node ) => {
		return format( node, context, format );
	} );

	return `${ innerBody.join( '\n' ) }\n`;
}
