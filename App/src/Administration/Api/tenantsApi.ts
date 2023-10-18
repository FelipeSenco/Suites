import axios, { AxiosResponse } from "axios";

export class TenantsApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = "https://localhost:7255";
    this.endpoints = {
      getTenants: this.apiUrl + "/api/tenants",
      addTenant: this.apiUrl + "/api/tenants/add",
    };
  }

  async getTenants(): Promise<Tenant[]> {
    const response = await axios.get(this.endpoints.getTenants);
    return response.data;
  }

  async addTenant(data: AddTenantData): Promise<string> {
    const response = await axios.post(this.endpoints.addTenant, data);
    return response.data;
  }
}
