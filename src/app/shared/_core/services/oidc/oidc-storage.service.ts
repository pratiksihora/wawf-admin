import { Injectable } from '@angular/core';

// External Modules
import { AbstractSecurityStorage } from 'angular-auth-oidc-client';

@Injectable()
export class OidcStoargeService implements AbstractSecurityStorage {
  read(key: string) {
    return localStorage.getItem(key);
  }

  write(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}