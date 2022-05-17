import { Injectable } from '@angular/core';
import { Address } from '../../profile/profile-address/model/address.model';

import { User } from './../../auth/models/user';

const USER_KEY = 'userData';
const DEFAULT_ADDRESS_KEY = 'defaultAddressData';

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

  public writeDefaultAddress(address: Address): void {
    localStorage.setItem(DEFAULT_ADDRESS_KEY, JSON.stringify(address));
  }

  public readDefaultAddress(): Address | null {
    const address: Address = JSON.parse(
      localStorage.getItem(DEFAULT_ADDRESS_KEY)!
    );
    return address ?? null;
  }

  public clearDefaultAddress(): void {
    localStorage.removeItem(DEFAULT_ADDRESS_KEY);
  }
}
