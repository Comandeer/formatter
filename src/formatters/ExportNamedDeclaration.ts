import { Node, isExportNamedDeclaration } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

export default function ExportNamedDeclaration( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isExportNamedDeclaration( node ) ) {
		throw new TypeError( 'Incorrect node type' );
	}

	context = {
		...context,
		node
	};

	if ( node.declaration ) {
		return `export ${ format( node.declaration, context, format ) }`;
	}

	return 'export';
}
