import { GitHubProvider } from '../GitHub.provider';

export class GitHubProviderMock extends GitHubProvider {
  async urlIsRepository(url: string): Promise<boolean> {
    return !url.includes('invalid-repo');
  }
}
