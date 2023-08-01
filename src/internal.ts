import { Node } from '@babel/types';

export interface FormatterContext {
	node: Node;
	indent: number;
}
export type Formatter = ( node: Node, context: FormatterContext, format: Formatter ) => string;
