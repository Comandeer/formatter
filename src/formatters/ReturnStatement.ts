import { Node, isReturnStatement } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function ReturnStatement( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isReturnStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const argument = node.argument != null ? ` ${ format( node.argument, context, format ) }` : '';

	return `return${ argument };`;
}
