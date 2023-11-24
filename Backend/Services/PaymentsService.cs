using Suites.Models;
using Suites.Models.Api;
using Suites.Repositories;
using System.Reflection.Metadata.Ecma335;

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
            };
            await _paymenRepository.AddPayment(dbPayment);
            return newGuid;
        }

        public async Task DeletePayment(Guid paymentId)
        {
            await _paymenRepository.DeletePayment(paymentId);
        }

        public async Task EditPayment(EditPayment payment)
        {
            var dbPayment = new Payment()
            {
                Id = payment.Id,
                TenantId = payment.TenantId,
                Amount = payment.Amount,
                DateOfPayment = payment.DateOfPayment,
                ReferenceMonth = payment.ReferenceMonth,
                ReferenceYear = payment.ReferenceYear,
            };
            await _paymenRepository.EditPayment(dbPayment);
        }

        public async Task<PaymentReceipt> GetPaymentReceipt(Guid paymentId)
        {
            return await _paymenRepository.GetPaymentReceipt(paymentId);
        }     

        public async Task<List<PaymentProjection>> GetPayments(int? page)
        {
            return await _paymenRepository.GetPayments(page);
        }

        public async Task AddPaymentReceipt(PaymentReceipt receipt)
        {
            await _paymenRepository.AddPaymentReceipt(receipt);
        }
    }
}
