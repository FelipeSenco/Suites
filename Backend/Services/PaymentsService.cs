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
                Receipt = !string.IsNullOrWhiteSpace(payment.Receipt) ? payment.Receipt : null,              
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

        public Task<string> GetPaymentReceipt(Guid paymentId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<PaymentProjection>> GetPayments()
        {
            var result = new List<PaymentProjection>();
            var dbPayments = await _paymenRepository.GetPayments();
            dbPayments.ForEach(payment =>
            {
                var projection = new PaymentProjection()
                {
                    Id = payment.Id,
                    TenantId = payment.TenantId,
                    TenantName = payment.Tenant.Name,
                    TenantLastName = payment.Tenant.LastName,
                    PropertyName = payment.Tenant.Property.Name,
                    RoomNumber = payment.Tenant.RoomNumber,
                    Amount = payment.Amount,
                    DateOfPayment = payment.DateOfPayment,
                    ReferenceMonth = payment.ReferenceMonth,
                    ReferenceYear = payment.ReferenceYear,
                    Receipt = payment.Receipt,
                };
                result.Add(projection);
            });
            return result;
        }
    }
}
