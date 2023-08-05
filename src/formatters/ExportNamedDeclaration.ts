import { isExportNamedDeclaration } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function ExportNamedDeclaration( context: FormatterContext ): string {
	const { node } = context;

	if ( !isExportNamedDeclaration( node ) ) {
		throw new TypeError( 'Incorrect node type' );
	}

	if ( node.declaration ) {
		const formattedDeclaration = context.formatDescendant( node.declaration );

		return `export ${ formattedDeclaration }`;
	}

	return 'export';
}
