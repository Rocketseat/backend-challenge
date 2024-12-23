export const isValidGitUrl = (url: string): boolean => {
  const gitUrlRegex =
    /((http|git|ssh|http(s)|file|\/?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)(\.git)(\/)?/;
  return gitUrlRegex.test(url);
};
