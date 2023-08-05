import { isExportDefaultDeclaration } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function ExportDefaultDeclaration( context: FormatterContext ): string {
	const { node } = context;

	if ( !isExportDefaultDeclaration( node ) ) {
		throw new TypeError( 'Incorrect node type' );
	}

	const formattedDeclaration = context.formatDescendant( node.declaration );

	return `export default ${ formattedDeclaration }`;
}
