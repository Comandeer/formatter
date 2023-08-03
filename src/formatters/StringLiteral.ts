import { Node, isStringLiteral } from '@babel/types';

export default function StringLiteral( node: Node ): string {
	if ( !isStringLiteral( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	return `'${ node.value }'`;
}
