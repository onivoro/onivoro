export const richTextValidator = (contentType: string, mimeType: string) =>
  contentType === 'application/rtf' && mimeType === 'text/rtf';