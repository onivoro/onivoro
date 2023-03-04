export const logError = e => {
  if (e) {
    process.stdout.write(e);
  }
};
