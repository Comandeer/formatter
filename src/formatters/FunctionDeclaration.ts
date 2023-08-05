import { FunctionDeclaration as FunctionDeclarationNode, isFunctionDeclaration } from '@babel/types';
import { FormatterContext } from '../context.js';

export default function FunctionDeclaration( context: FormatterContext ): string {
	const { node } = context;

	if ( !isFunctionDeclaration( node ) ) {
		throw new Error( 'Invalid node type' );
	}

	const functionName = formatFunctionName( node, context );
	const params = node.params.map( ( param ) => {
		return context.formatDescendant( param );
	} ).join( ', ' );
	const returnType = formatReturnType( node, context );
	const formattedBody = context.formatDescendant( node.body );

	return `function ${ functionName }(${ params.length > 0 ? ` ${ params } ` : '' })${ returnType } ${ formattedBody }`;
}

function formatFunctionName( node: FunctionDeclarationNode, context: FormatterContext ): string {
	if ( !node.id ) {
		return '';
	}

	return context.formatDescendant( node.id );
}

function formatReturnType( node: FunctionDeclarationNode, context: FormatterContext ): string {
	if ( !node.returnType ) {
		return '';
	}

	const formattedReturnType = context.formatDescendant( node.returnType );

	return `: ${ formattedReturnType }`;
}
