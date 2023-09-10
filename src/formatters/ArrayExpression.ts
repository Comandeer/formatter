import { Expression, SpreadElement, isArrayExpression, isIdentifier } from '@babel/types';
import { FormatterContext } from '../context.js';
import indent from '../utils/indent.js';

export default function ArrayExpression( context: FormatterContext ): string {
	const { node } = context;

	if ( !isArrayExpression( node ) ) {
		throw new Error( 'Incorrect node type' );
	}

	if ( node.elements.length === 0 ) {
		return '[]';
	}

	const formattedElements = node.elements.map( ( element ) => {
		if ( element === null ) {
			return '';
		}

		return context.formatDescendant( element, {
			increaseIndent: true
		} );
	} ).join( `,\n${ indent( context.state.indent + 1 ) }` );

	if ( isSimpleElementArray( node.elements ) ) {
		return `[ ${ formattedElements } ]`;
	}

	return `[\n${ indent( context.state.indent + 1 ) }${ formattedElements }\n${ indent( context.state.indent ) }]`;
}

function isSimpleElementArray( elements: Array<Expression | SpreadElement | null> ): boolean {
	if ( elements.length !== 1 ) {
		return false;
	}

	return elements.every( ( element ) => {
		if ( element === null ) {
			return true;
		}

		switch ( element.type ) {
			case 'ArrayExpression':
				return isSimpleElementArray( element.elements );
			case 'SpreadElement':
				return isIdentifier( element.argument );
			default:
				return element.type === 'Identifier' || element.type.endsWith( 'Literal' );
		}
	} );
}
