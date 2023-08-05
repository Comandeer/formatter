import { isBooleanLiteral } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function BooleanLiteral( context: FormatterContext ): string {
	const { node } = context;

	if ( !isBooleanLiteral( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	return String( node.value );
}
