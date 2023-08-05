import { FormatterContext } from './context.js';
import formatters from './formatters.js';

export type Formatter = ( context: FormatterContext ) => string;

export default function formatNode( context: FormatterContext ): string {
	const formatter = formatters.get( context.node.type );

	if ( !formatter ) {
		throw new Error( `Formatter for "${ context.node.type }" nodes is not implemented!` );
	}

	return formatter( context );
}
