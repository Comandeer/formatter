import { Node, isIdentifier } from '@babel/types';

export default function Identifier( node: Node ): string {
	if ( !isIdentifier( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	return node.name;
}
