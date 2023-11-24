import axios from "axios";

export class PaymentsApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = "https://localhost:7255";
    this.endpoints = {
      addPayment: this.apiUrl + "/api/payments/add",
      getPayments: this.apiUrl + "/api/payments?page={page}",
      editPayment: this.apiUrl + "/api/payments/edit",
      deletePayment: this.apiUrl + "/api/payments/delete?id={id}",
      getReceipt: this.apiUrl + "/api/payments/receipt?id={id}",
      addReceipt: this.apiUrl + "/api/payments/receipt/add",
    };
  }

  async getPayments(pageParam: number): Promise<Payment[]> {
    const response = await axios.get(
      this.endpoints.getPayments.replace(
        "{page}",
        encodeURIComponent(pageParam)
      )
    );
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

  async getReceipt(id: string): Promise<Receipt> {
    const response = await axios.get(
      this.endpoints.getReceipt.replace("{id}", id)
    );
    return response.data;
  }

  async addReceipt(data: Receipt): Promise<string> {
    const response = await axios.post(this.endpoints.addReceipt, data);
    return response.data;
  }
}
