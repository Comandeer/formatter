export default function indent( indentationLevel: number ): string {
	if ( indentationLevel < 0 ) {
		indentationLevel = 0;
	}

	return '\t'.repeat( indentationLevel );
}
