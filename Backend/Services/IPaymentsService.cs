using Suites.Models;
using Suites.Models.Api;

namespace Suites.Services
{
    public interface IPaymentsService
    {
        public Task<List<PaymentProjection>> GetPayments(int? page);
        public Task<PaymentReceipt> GetPaymentReceipt(Guid paymentId);
        public Task<Guid> AddPayment(AddPayment payment);
        public Task EditPayment(EditPayment payment);
        public Task DeletePayment(Guid paymentId);
        public Task AddPaymentReceipt(PaymentReceipt receipt);
    }
}
