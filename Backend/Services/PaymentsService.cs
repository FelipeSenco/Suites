using Suites.Models.Api;

namespace Suites.Services
{
    public class PaymentsService : IPaymentsService
    {
        public Task<Guid> AddPayment(AddPayment payment)
        {
            throw new NotImplementedException();
        }

        public Task DeletePayment(Guid paymentId)
        {
            throw new NotImplementedException();
        }

        public Task EditPayment(EditPayment payment)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetPaymentReceipt(Guid paymentId)
        {
            throw new NotImplementedException();
        }

        public Task<List<PaymentProjection>> GetPayments()
        {
            throw new NotImplementedException();
        }
    }
}
