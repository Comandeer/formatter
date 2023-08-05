import { isStringLiteral } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function StringLiteral( context: FormatterContext ): string {
	const { node } = context;

	if ( !isStringLiteral( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	return `'${ node.value }'`;
}
