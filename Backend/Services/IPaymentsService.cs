using Suites.Models.Api;

namespace Suites.Services
{
    public interface IPaymentsService
    {
        public Task<List<PaymentProjection>> GetPayments();
        public Task<string> GetPaymentReceipt(Guid paymentId);
        public Task<Guid> AddPayment(AddPayment payment);
        public Task EditPayment(EditPayment payment);
        public Task DeletePayment(Guid paymentId);
    }
}
