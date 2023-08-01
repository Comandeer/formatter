import { parse } from '@babel/parser';
import { Program } from '@babel/types';

export default async function parseCode( code: string ): Promise<Program> {
	const { program } = parse( code, {
		plugins: [
			'typescript'
		]
	} );

	return program;
}