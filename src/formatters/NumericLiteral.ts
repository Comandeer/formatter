import { Node, isNumericLiteral } from '@babel/types';

export default function NumericLiteral( node: Node ): string {
	if ( !isNumericLiteral( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	return String( node.value );
}
