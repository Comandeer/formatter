import { Node } from '@babel/types';
import formatNode from './formatNode.js';

interface FormatterContextState {
	code: string;
	indent: number;
}

export interface FormatterContext<N extends Node=Node> {
	node: N;
	parent: Node | null;
	state: FormatterContextState;
	createDescendantContext: ( node: Node ) => FormatterContext;
	formatDescendant: ( node: Node ) => string;
}

export function createContext(
	node: Node,
	parent: Node | null,
	state: FormatterContextState
): FormatterContext {
	return {
		node,
		parent,
		state,
		createDescendantContext( node: Node ): FormatterContext {
			const newState = { ...this.state };

			return createContext( node, this.node, newState );
		},
		formatDescendant( node: Node ): string {
			const descendantContext = this.createDescendantContext( node );

			return formatNode( descendantContext );
		}
	};
}
