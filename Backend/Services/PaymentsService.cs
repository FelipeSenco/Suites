using Suites.Models;
using Suites.Models.Api;
using Suites.Repositories;

namespace Suites.Services
{
    public class PaymentsService : IPaymentsService
    {
        private readonly IPaymentRepository _paymenRepository;

        public PaymentsService(IPaymentRepository paymenRepository)
        {
            _paymenRepository = paymenRepository;
        }
        public async Task<Guid> AddPayment(AddPayment payment)
        {
            Guid newGuid = Guid.NewGuid();
            var dbPayment = new Payment()
            {
                Id = newGuid,
                TenantId = payment.TenantId,
                Amount = payment.Amount,
                DateOfPayment = payment.DateOfPayment,
                ReferenceMonth = payment.ReferenceMonth,
                ReferenceYear = payment.ReferenceYear,
                Receipt = !string.IsNullOrWhiteSpace(payment.Receipt) ? payment.Receipt : null,              
            };
            await _paymenRepository.AddPayment(dbPayment);
            return newGuid;
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
