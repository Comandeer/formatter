import { isTSTypeAnnotation } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function TSTypeAnnotation( context: FormatterContext ): string {
	const { node } = context;

	if ( !isTSTypeAnnotation( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	switch ( node.typeAnnotation.type ) {
		case 'TSNumberKeyword':
			return 'number';

		case 'TSStringKeyword':
			return 'string';

		default:
			return '';
	}
}
