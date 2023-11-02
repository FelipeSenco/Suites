using Suites.Models;

namespace Suites.Repositories
{
    public class PaymentsRepository : IPaymentRepository
    {
        public Task AddPayment(Payment payment)
        {
            throw new NotImplementedException();
        }

        public Task DeletePayment(Guid paymentId)
        {
            throw new NotImplementedException();
        }

        public Task EditPayment(Payment payment)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetPaymentReceipt(Guid paymentId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Payment>> GetPayments()
        {
            throw new NotImplementedException();
        }
    }
}
