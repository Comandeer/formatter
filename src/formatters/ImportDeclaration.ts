import {
	ImportAttribute,
	ImportDeclaration as ImportDeclarationNode,
	ImportDefaultSpecifier,
	ImportNamespaceSpecifier,
	ImportSpecifier,
	isImportDeclaration
} from '@babel/types';
import extractNodeFromCode from '../utils/extractNodeFromCode.js';
import { FormatterContext } from '../context.js';

interface FormattedSpecifier {
	type: 'default' | 'named';
	specifier: string;
}

const assertKeywordRegex = /assert\s*\{/;

export default function ImportDeclaration( context: FormatterContext ): string {
	const { node } = context;

	if ( !isImportDeclaration( node ) ) {
		throw new TypeError( 'Incorrect node type' );
	}

	const specifiers = node.specifiers.map( ( specifier ) => {
		return formatImportSpecifier( specifier, context );
	} ).sort( ( left, right ) => {
		if ( left.type === 'default' ) {
			return -1;
		}

		return left.specifier.localeCompare( right.specifier );
	} ).reduce( ( specifiers: string, specifier: FormattedSpecifier, i, specifierArray ) => {
		const openingBrace = specifier.type === 'named' && !specifiers.includes( '{' ) ? '{ ' : '';
		const comma = i === specifierArray.length - 1 ? '' : ', ';
		const closingBrace = specifier.type === 'named' && i === specifierArray.length - 1 ? ' }' : '';

		return `${ specifiers }${ openingBrace }${ specifier.specifier }${ comma }${ closingBrace }`;
	}, '' );
	const source = `from ${ context.formatDescendant( node.source ) }`;
	const attributes = formatAttributes( node.attributes, context );

	return `import ${ specifiers } ${ source }${ attributes };`;
}

function formatImportSpecifier(
	specifier: ImportSpecifier | ImportNamespaceSpecifier | ImportDefaultSpecifier,
	context: FormatterContext
): FormattedSpecifier {
	const parent = context.node as ImportDeclarationNode;

	if ( specifier.type === 'ImportNamespaceSpecifier' ) {
		return {
			type: 'default',
			specifier: ''
		};
	}

	if ( specifier.type === 'ImportDefaultSpecifier' ) {
		const type = parent.importKind === 'type' ? 'type ' : '';
		const FormattedSpecifier = context.formatDescendant( specifier.local );

		return {
			type: 'default',
			specifier: `${ type }${ FormattedSpecifier }`
		};
	}

	const type = specifier.importKind === 'type' ? 'type ' : '';
	const imported = context.formatDescendant( specifier.imported );
	const local = context.formatDescendant( specifier.local );
	const alias = imported === local ? local : `${ imported } as ${ local }`;

	return {
		type: 'named',
		specifier: `${ type }${ alias }`
	};
}

function formatAttributes(
	importAttributes: Array<ImportAttribute> | undefined | null,
	context: FormatterContext
): string {
	if ( !importAttributes || importAttributes.length === 0 ) {
		return '';
	}

	const importCode = extractNodeFromCode( context.node, context.state.code );
	const keyword = importCode !== null && assertKeywordRegex.test( importCode ) ? 'assert' : 'with';
	const formattedImportAttributes = importAttributes.map( ( importAttribute ) => {
		const attributeContext = context.createDescendantContext( importAttribute );
		const key = attributeContext.formatDescendant( importAttribute.key );
		const value = attributeContext.formatDescendant( importAttribute.value );

		return `${ key }: ${ value }`;
	} ).sort( ( left, right ) => {
		return left.localeCompare( right );
	} ).join( ', ' );

	return ` ${ keyword } { ${ formattedImportAttributes } }`;
}
