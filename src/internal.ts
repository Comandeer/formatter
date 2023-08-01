import { Node } from '@babel/types';

export type FormatterContext = Record<string, unknown>;
export type Formatter = ( node: Node, context: FormatterContext, format: Formatter ) => string;
