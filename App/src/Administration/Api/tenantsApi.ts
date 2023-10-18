import axios from "axios";

export class TenantsApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = "https://localhost:7255";
    this.endpoints = {
      getTenants: this.apiUrl + "/api/tenants",
    };
  }

  async getTenants(): Promise<string[]> {
    const response = await axios.get(this.endpoints.getTenants);
    return response.data;
  }
}
