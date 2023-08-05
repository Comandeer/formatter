import { Node } from '@babel/types';
import formatNode from './formatNode.js';

export interface FormatterContextState {
	code: string;
	indent: number;
}

export interface FormatterContext<N extends Node=Node> {
	node: N;
	parent: Node | null;
	state: FormatterContextState;
	createDescendantContext: ( node: Node ) => FormatterContext;
	formatDescendant: ( node: Node ) => string;
	getPreviousNodeContext: () => FormatterContext | null;
	getNextNodeContext: () => FormatterContext | null;
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
		},

		getPreviousNodeContext(): FormatterContext | null {
			return getNodeContext.call( this, -1 );
		},

		getNextNodeContext(): FormatterContext | null {
			return getNodeContext.call( this, 1 );
		}
	};
}

/* eslint-disable @babel/no-invalid-this */
function getNodeContext( this: FormatterContext, direction: -1 | 1 ): FormatterContext | null {
	if ( !this.parent ) {
		return null;
	}

	if ( !( 'body' in this.parent ) || !Array.isArray( this.parent.body ) ) {
		return null;
	}

	const parentBody: Array<Node> = this.parent.body;
	const currentIndex = parentBody.indexOf( this.node );
	const newIndex = currentIndex + direction;
	const newNode = parentBody[ newIndex ];

	if ( newNode === undefined ) {
		return null;
	}

	const newState = { ...this.state };
	const previousNodeContext = createContext( newNode, this.parent, newState );

	return previousNodeContext;
}
/* eslint-enable @babel/no-invalid-this */
