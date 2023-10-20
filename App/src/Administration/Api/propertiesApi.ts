import axios from "axios";

export class PropertiesApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = "https://localhost:7255";
    this.endpoints = {
      getProperties: this.apiUrl + "/api/properties",
    };
  }

  async getProperties(): Promise<Property[]> {
    const response = await axios.get(this.endpoints.getProperties);
    return response.data;
  }
}
