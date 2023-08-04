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
import ExportDefaultDeclaration from './formatters/ExportDefaultDeclaration.js';
import ArrowFunctionExpression from './formatters/ArrowFunctionExpression.js';
import ImportDeclaration from './formatters/ImportDeclaration.js';
import StringLiteral from './formatters/StringLiteral.js';
import IfStatement from './formatters/IfStatement.js';
import BooleanLiteral from './formatters/BooleanLiteral.js';
import ExpressionStatement from './formatters/ExpressionStatement.js';
import NumericLiteral from './formatters/NumericLiteral.js';

export default new Map<Node['type'], Formatter>( [
	[
		'ArrowFunctionExpression',
		ArrowFunctionExpression
	],

	[
		'BinaryExpression',
		BinaryExpression
	],

	[
		'BlockStatement',
		BlockStatement
	],

	[
		'BooleanLiteral',
		BooleanLiteral
	],

	[
		'EmptyStatement',
		EmptyStatement
	],

	[
		'ExportDefaultDeclaration',
		ExportDefaultDeclaration
	],

	[
		'ExportNamedDeclaration',
		ExportNamedDeclaration
	],

	[
		'ExpressionStatement',
		ExpressionStatement
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
		'IfStatement',
		IfStatement
	],

	[
		'ImportDeclaration',
		ImportDeclaration
	],

	[
		'NumericLiteral',
		NumericLiteral
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
		'StringLiteral',
		StringLiteral
	],

	[
		'TSTypeAnnotation',
		TSTypeAnnotation
	]
] );
