import { isNumericLiteral } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function NumericLiteral( context: FormatterContext ): string {
	const { node } = context;

	if ( !isNumericLiteral( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	return String( node.value );
}
