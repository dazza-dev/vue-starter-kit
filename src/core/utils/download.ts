/**
 * Downloads a blob via a temporary link; fetch it through axios so the interceptor attaches the session.
 */
export function saveBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
}
