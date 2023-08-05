import { isReturnStatement } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function ReturnStatement( context: FormatterContext ): string {
	const { node } = context;

	if ( !isReturnStatement( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	context = {
		...context,
		node
	};

	const argument = node.argument != null ? ` ${ context.formatDescendant( node.argument ) }` : '';

	return `return${ argument };`;
}
