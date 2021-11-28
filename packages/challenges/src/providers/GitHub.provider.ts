import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GitHubProvider {
  private _defaultHeaders = {} as any;

  constructor(private readonly httpService: HttpService) {
    this._defaultHeaders.auth = {
      username: process.env.GITHUB_CLIENT_ID,
      password: process.env.GITHUB_CLIENT_SECRET,
    };
  }

  urlIsValid(url: string): boolean {
    const result = url.match(
      /(http(s)?:\/\/)?(www\.)?github.com([-a-zA-Z0-9@:%_\+.~#?&\/=]*)/g,
    );

    return result !== null;
  }

  async urlIsRepository(url: string): Promise<boolean> {
    const newUrl = url.replace('github.com', 'api.github.com/repos');
    const result = await lastValueFrom(
      this.httpService.get(newUrl, this._defaultHeaders),
    )
      .then(() => true)
      .catch(() => false);

    return result;
  }
}
