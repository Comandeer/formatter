import { Node } from '@babel/types';

export default function extractNodeFromCode( node: Node, code: string ): string | null {
	if ( typeof node.start !== 'number' || typeof node.end !== 'number' ) {
		return null;
	}

	return code.substring( node.start, node.end );
}
