/**
 * Extracts a readable message from the error; returns the fallback if it has none.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error) return error.message;
    if (error && typeof error === 'object' && 'message' in error) {
        return String((error as { message: unknown }).message);
    }
    return fallback;
}
