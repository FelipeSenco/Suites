import axios from "axios";

export class PaymentsApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = "https://localhost:7255";
    this.endpoints = {
      addPayment: this.apiUrl + "/api/payments/add",
      getPayments: this.apiUrl + "/api/payments",
      editPayment: this.apiUrl + "/api/payments/edit",
      deletePayment: this.apiUrl + "/api/payments/delete?id={id}",
    };
  }

  async getPayments(): Promise<Payment[]> {
    const response = await axios.get(this.endpoints.getPayments);
    return response.data;
  }

  async addPayment(data: AddPaymentData): Promise<string> {
    const response = await axios.post(this.endpoints.addPayment, data);
    return response.data;
  }

  async editPayment(data: EditPaymentData): Promise<string> {
    const response = await axios.put(this.endpoints.editPayment, data);
    return response.data;
  }

  async deletePayment(id: string): Promise<string> {
    const response = await axios.delete(
      this.endpoints.deletePayment.replace("{id}", id)
    );
    return response.data;
  }
}
