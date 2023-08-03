import { ImportAttribute, ImportDeclaration as ImportDeclarationNode, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Node, isImportDeclaration } from '@babel/types';
import { Formatter, FormatterContext } from '../internal.js';

interface FormattedSpecifier {
	type: 'default' | 'named';
	specifier: string;
}

export default function ImportDeclaration( node: Node, context: FormatterContext, format: Formatter ): string {
	if ( !isImportDeclaration( node ) ) {
		throw new TypeError( 'Incorrect node type' );
	}

	context = {
		...context,
		node
	};

	const specifiers = node.specifiers.map( ( specifier ) => {
		return formatImportSpecifier( specifier, context, format );
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
	const source = `from ${ format( node.source, context, format ) }`;
	const attributes = formatAttributes( node.attributes, context, format );

	return `import ${ specifiers } ${ source }${ attributes };`;
}

function formatImportSpecifier(
	specifier: ImportSpecifier | ImportNamespaceSpecifier | ImportDefaultSpecifier,
	context: FormatterContext,
	format: Formatter
): FormattedSpecifier {
	const parent = context.node as ImportDeclarationNode;

	context = {
		...context,
		node: specifier
	};

	if ( specifier.type === 'ImportNamespaceSpecifier' ) {
		return {
			type: 'default',
			specifier: ''
		};
	}

	if ( specifier.type === 'ImportDefaultSpecifier' ) {
		const type = parent.importKind === 'type' ? 'type ' : '';

		return {
			type: 'default',
			specifier: `${ type }${ format( specifier.local, context, format ) }`
		};
	}

	const type = specifier.importKind === 'type' ? 'type ' : '';
	const imported = format( specifier.imported, context, format );
	const local = format( specifier.local, context, format );
	const alias = imported === local ? local : `${ imported } as ${ local }`;

	return {
		type: 'named',
		specifier: `${ type }${ alias }`
	};
}

function formatAttributes(
	importAttributes: Array<ImportAttribute> | undefined | null,
	context: FormatterContext,
	format: Formatter
): string {
	if ( !importAttributes || importAttributes.length === 0 ) {
		return '';
	}

	const keyword = 'with';
	const formattedImportAttributes = importAttributes.map( ( importAttribute ) => {
		const attributeContext = {
			...context,
			importAttribute
		};
		const key = format( importAttribute.key, attributeContext, format );
		const value = format( importAttribute.value, attributeContext, format );

		return `${ key }: ${ value }`;
	} ).sort( ( left, right ) => {
		return left.localeCompare( right );
	} ).join( ', ' );

	return ` ${ keyword } { ${ formattedImportAttributes } }`;
}
