import { Injectable } from '@angular/core';

import { Address } from '../../account/account-address/model/address.model';
import { UserApplication } from '../../auth/models/ApplicationUser';

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

  public writeUser(user: UserApplication): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public readUser(): UserApplication | null {
    const user: UserApplication = JSON.parse(localStorage.getItem(USER_KEY)!);
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
