import { Node, isTSTypeAnnotation } from '@babel/types';

export default function TSTypeAnnotation( node: Node ): string {
	if ( !isTSTypeAnnotation( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	switch ( node.typeAnnotation.type ) {
		case 'TSNumberKeyword':
			return 'number';

		default:
			return '';
	}
}
