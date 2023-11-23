using Suites.Models;

namespace Suites.Repositories
{
    public interface IPaymentRepository
    {
        public Task<List<PaymentProjection>> GetPayments();
        public Task<PaymentReceipt> GetPaymentReceipt(Guid paymentId);
        public Task AddPayment(Payment payment);
        public Task EditPayment(Payment payment);
        public Task DeletePayment(Guid paymentId);
        public Task AddPaymentReceipt(PaymentReceipt paymentReceipt);
    }
}
