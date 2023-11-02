using Suites.Models;

namespace Suites.Repositories
{
    public interface IPaymentRepository
    {
        public Task<List<Payment>> GetPayments();
        public Task<string> GetPaymentReceipt(Guid paymentId);
        public Task AddPayment(Payment payment);
        public Task EditPayment(Payment payment);
        public Task DeletePayment(Guid paymentId);
    }
}
