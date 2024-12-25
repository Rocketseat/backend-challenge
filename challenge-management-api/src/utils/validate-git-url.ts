export const validateGitUrl = async (repositoryUrl: string): Promise<{ valid: boolean, message?: string}> => {
    const isGithubRepo = /(?:git@|https:\/\/)github.com[:/](.*)/.test(repositoryUrl);
    if (!isGithubRepo) {
      return {
        valid: false,
        message: 'Not a valid github.com repository',
      }
    }

    const repoResponse = await fetch(repositoryUrl, {
        method: 'HEAD',
    });
    if (!repoResponse.ok) {
        return {
            valid: false,
            message: 'Repository not found'
        }
    }

    return {
        valid: true,
    }
}
