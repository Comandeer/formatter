import test from 'ava';
import { FormatterContextState, createContext } from '../src/context.js';
import {
	binaryExpression,
	blockStatement,
	expressionStatement,
	numericLiteral
} from '@babel/types';

const defaultContextState: FormatterContextState = {
	indent: 0,
	code: ''
};

test( 'FormatterContext#getPreviousNodeContext() returns context containg the previous node', ( t ) => {
	const firstNode = expressionStatement( binaryExpression( '+', numericLiteral( 1 ), numericLiteral( 2 ) ) );
	const secondNode = expressionStatement( binaryExpression( '+', numericLiteral( 1 ), numericLiteral( 2 ) ) );
	const rootNode = blockStatement( [
		firstNode,
		secondNode
	] );
	const secondNodeContext = createContext( secondNode, rootNode, defaultContextState );
	const previousNodeContext = secondNodeContext.getPreviousNodeContext();

	t.is( previousNodeContext?.node, firstNode );
	t.is( previousNodeContext?.parent, rootNode );
} );

test( 'FormatterContext#getPreviousNodeContext() returns null if there is no previous node', ( t ) => {
	const firstNode = expressionStatement( binaryExpression( '+', numericLiteral( 1 ), numericLiteral( 2 ) ) );
	const rootNode = blockStatement( [
		firstNode
	] );
	const firstNodeContext = createContext( firstNode, rootNode, defaultContextState );
	const previousNodeContext = firstNodeContext.getPreviousNodeContext();

	t.is( previousNodeContext, null );
} );

test( 'FormatterContext#getPreviousNodeContext() returns null if the node has no parent', ( t ) => {
	const firstNode = expressionStatement( binaryExpression( '+', numericLiteral( 1 ), numericLiteral( 2 ) ) );
	const firstNodeContext = createContext( firstNode, null, defaultContextState );
	const previousNodeContext = firstNodeContext.getPreviousNodeContext();

	t.is( previousNodeContext, null );
} );

test( 'FormatterContext#getNextNodeContext() returns context containg the next node', ( t ) => {
	const firstNode = expressionStatement( binaryExpression( '+', numericLiteral( 1 ), numericLiteral( 2 ) ) );
	const secondNode = expressionStatement( binaryExpression( '+', numericLiteral( 1 ), numericLiteral( 2 ) ) );
	const rootNode = blockStatement( [
		firstNode,
		secondNode
	] );
	const firstNodeContext = createContext( firstNode, rootNode, defaultContextState );
	const nextNodeContext = firstNodeContext.getNextNodeContext();

	t.is( nextNodeContext?.node, secondNode );
	t.is( nextNodeContext?.parent, rootNode );
} );

test( 'FormatterContext#getNextNodeContext() returns null if there is no previous node', ( t ) => {
	const firstNode = expressionStatement( binaryExpression( '+', numericLiteral( 1 ), numericLiteral( 2 ) ) );
	const rootNode = blockStatement( [
		firstNode
	] );
	const firstNodeContext = createContext( firstNode, rootNode, defaultContextState );
	const previousNodeContext = firstNodeContext.getNextNodeContext();

	t.is( previousNodeContext, null );
} );

test( 'FormatterContext#getNextNodeContext() returns null if the node has no parent', ( t ) => {
	const firstNode = expressionStatement( binaryExpression( '+', numericLiteral( 1 ), numericLiteral( 2 ) ) );
	const firstNodeContext = createContext( firstNode, null, defaultContextState );
	const previousNodeContext = firstNodeContext.getNextNodeContext();

	t.is( previousNodeContext, null );
} );
