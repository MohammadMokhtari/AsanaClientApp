import { Injectable } from '@angular/core';

import { Address } from './../../../pages/layout/header/bottom-header/site-option/user-location/address.model';
import { User } from './../../auth/models/user';

const USER_KEY = 'userData';
const ADDRESS_KEY = 'addressData';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public clearStorage() {
    localStorage.clear();
  }

  public writeUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public readUser(): User | null {
    const user: User = JSON.parse(localStorage.getItem(USER_KEY)!);
    return user ?? null;
  }

  public clearUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  public writeAddress(address: Address): void {
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
  }

  public readAddress(): Address | null {
    const address: Address = JSON.parse(localStorage.getItem(ADDRESS_KEY)!);
    return address ?? null;
  }

  public clearAddress(): void {
    localStorage.removeItem(ADDRESS_KEY);
  }
}
