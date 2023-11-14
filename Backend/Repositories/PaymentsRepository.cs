using Microsoft.EntityFrameworkCore;
using Suites.Models;

namespace Suites.Repositories
{
    public class PaymentsRepository : IPaymentRepository
    {
        private readonly SuitesDbContext _context;

        public PaymentsRepository(SuitesDbContext context)
        {
            _context = context;
        }
        public async Task AddPayment(Payment payment)
        {
            await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePayment(Guid paymentId)
        {

            var removePayment = await _context.Payments.FirstOrDefaultAsync(p => p.Id == paymentId);
            if (removePayment is null)
            {
                throw new Exception("No payment found for the provided id.");
            }
            _context.Payments.Remove(removePayment);
            await _context.SaveChangesAsync();
        }

        public async Task EditPayment(Payment payment)
        {
            var currentPayment = await _context.Payments.FirstOrDefaultAsync(p => p.Id == payment.Id);
            if (currentPayment is null)
            {
                throw new Exception("No payment found for the provided id.");
            }

            currentPayment.Id = payment.Id;
            currentPayment.TenantId = payment.TenantId;
            currentPayment.Amount = payment.Amount;
            currentPayment.DateOfPayment = payment.DateOfPayment;
            currentPayment.ReferenceMonth = payment.ReferenceMonth;
            currentPayment.ReferenceYear = payment.ReferenceYear;           

            await _context.SaveChangesAsync();
        }

        public Task<string> GetPaymentReceipt(Guid paymentId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Payment>> GetPayments()
        {
           return await _context.Payments.Include(p=>p.Tenant).Include(p=>p.Tenant.Property).ToListAsync();
        }
    }
}
