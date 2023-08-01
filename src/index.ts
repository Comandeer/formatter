import { Node } from '@babel/types';
import parseCode from './parseCode.js';
import formatters from './formatters.js';
import { Formatter, FormatterContext } from './internal.js';

export default async function format( code: string ): Promise<string> {
	const program = await parseCode( code );
	const context = {};
	const formattedCode = formatNode( program, context, formatNode );

	return formattedCode;
}

function formatNode( node: Node, context: FormatterContext, format: Formatter ): string {
	const formatter = formatters.get( node.type );

	if ( !formatter ) {
		throw new Error( `Formatter for "${ node.type }" nodes is not implemented!` );
	}

	return formatter( node, context, format );
}
