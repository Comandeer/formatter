import { Node, isBooleanLiteral } from '@babel/types';

export default function BooleanLiteral( node: Node ): string {
	if ( !isBooleanLiteral( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	return String( node.value );
}
