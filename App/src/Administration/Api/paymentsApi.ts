import axios from "axios";

export class PaymentsApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = "https://localhost:7255";
    this.endpoints = {
      addPayment: this.apiUrl + "/api/payments/add",
    };
  }

  async addPayment(data: AddPaymentData): Promise<string> {
    const response = await axios.post(this.endpoints.addPayment, data);
    return response.data;
  }
}
