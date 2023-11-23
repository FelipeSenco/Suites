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

        public async Task<PaymentReceipt> GetPaymentReceipt(Guid paymentId)
        {
            var paymentReceipt = await _context.Payments
            .Where(p => p.Id == paymentId)
            .Select(p => new PaymentReceipt
            {
                Id = p.Id,
                Image = p.Receipt
            })
            .FirstOrDefaultAsync();

            if (paymentReceipt == null)
            {
                throw new KeyNotFoundException("Payment not found with the given ID.");
            }

            return paymentReceipt;
        }

        public async Task<List<PaymentProjection>> GetPayments()
        {
           return await _context.Set<PaymentProjection>().FromSqlRaw("EXEC GetPaymentsProjections").ToListAsync();
        }

        public async Task AddPaymentReceipt(PaymentReceipt paymentReceipt)
        {
            var currentPayment = await _context.Payments.FirstOrDefaultAsync(p => p.Id == paymentReceipt.Id);
            if (currentPayment is null)
            {
                throw new Exception("No payment found for the provided id.");
            };

            currentPayment.Receipt = paymentReceipt.Image;
            await _context.SaveChangesAsync();
        }
    }
}
