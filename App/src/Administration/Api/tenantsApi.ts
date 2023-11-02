import axios, { AxiosResponse } from "axios";

export class TenantsApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = "https://localhost:7255";
    this.endpoints = {
      getTenants: this.apiUrl + "/api/tenants",
      addTenant: this.apiUrl + "/api/tenants/add",
      editTenant: this.apiUrl + "/api/tenants/edit",
      deleteTenant: this.apiUrl + "/api/tenants/delete?id={id}",
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

  async editTenant(data: EditTenantData): Promise<string> {
    const response = await axios.put(this.endpoints.editTenant, data);
    return response.data;
  }

  async deleteTenant(tenantId: string): Promise<string> {
    const response = await axios.delete(
      this.endpoints.deleteTenant.replace("{id}", tenantId)
    );
    return response.data;
  }
}
