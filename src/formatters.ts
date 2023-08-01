import { Node } from '@babel/types';
import BinaryExpression from './formatters/BinaryExpression.js';
import BlockStatement from './formatters/BlockStatement.js';
import EmptyStatement from './formatters/EmptyStatement.js';
import ExportNamedDeclaration from './formatters/ExportNamedDeclaration.js';
import FunctionDeclaration from './formatters/FunctionDeclaration.js';
import Identifier from './formatters/Identifier.js';
import Program from './formatters/Program.js';
import ReturnStatement from './formatters/ReturnStatement.js';
import { Formatter } from './internal.js';
import TSTypeAnnotation from './formatters/TSTypeAnnotation.js';

export default new Map<Node['type'], Formatter>( [
	[
		'BinaryExpression',
		BinaryExpression
	],

	[
		'BlockStatement',
		BlockStatement
	],

	[
		'EmptyStatement',
		EmptyStatement
	],

	[
		'ExportNamedDeclaration',
		ExportNamedDeclaration
	],

	[
		'FunctionDeclaration',
		FunctionDeclaration
	],

	[
		'Identifier',
		Identifier
	],

	[
		'Program',
		Program
	],

	[
		'ReturnStatement',
		ReturnStatement
	],

	[
		'TSTypeAnnotation',
		TSTypeAnnotation
	]
] );
