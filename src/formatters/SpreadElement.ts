import { isSpreadElement } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function SpreadElement( context: FormatterContext ): string {
	const { node } = context;

	if ( !isSpreadElement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	const formattedArgument = context.formatDescendant( node.argument );

	return `...${ formattedArgument }`;
}
