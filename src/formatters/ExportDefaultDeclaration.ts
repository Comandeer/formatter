import { Node, isExportDefaultDeclaration } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function ExportDefaultDeclaration( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isExportDefaultDeclaration( node ) ) {
		throw new TypeError( 'Incorrect node type' );
	}

	context = {
		...context,
		node
	};

	return `export default ${ format( node.declaration, context, format ) }`;
}
