using Suites.Models;

namespace Suites.Repositories
{
    public class PaymentsRepository : IPaymentRepository
    {
        private readonly SuitesDbContext _dbContext;
        public PaymentsRepository(SuitesDbContext context)
        {
            _dbContext = context;
        }
        public async Task AddPayment(Payment payment)
        {
            await _dbContext.Payments.AddAsync(payment);
            await _dbContext.SaveChangesAsync();
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
