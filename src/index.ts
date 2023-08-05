import parseCode from './parseCode.js';
import { createContext } from './context.js';
import formatNode from './formatNode.js';

export default async function format( code: string ): Promise<string> {
	const program = await parseCode( code );
	const context = createContext( program, null, {
		indent: 0,
		code
	} );
	const formattedCode = formatNode( context );

	return formattedCode;
}
