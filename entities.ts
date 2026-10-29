export interface Location {
  locationId: number;
  locationName: string;
  locationAddress: string;
  locationLatLng: number[];
  manager?: Manager | string;
  region?: any;
  employees?: Employee[];
}

export interface Employee {
  id: string;
  employeeName: string;
  employeeLastName: string;
  employeePhoneNumber: string;
  employeeEmail: string;
  employeePhoto?: string;
  location?: Location;
  user?: any;
}

export interface Manager {
  managerId: string;
  managerFullName: string;
  managerSalary: number;
  managerEmail: string;
  managerPhoneNumber: string;
  location?: Location;
  user?: any;
}

export interface Product {
  productId: string;
  productName: string;
  price: number;
  countSeal: number;
  provider?: Provider;
}

export interface Provider {
  providerId: string;
  providerName: string;
  providerEmail: string;
  providerPhoneNumber: string;
  products?: Product[];
}
