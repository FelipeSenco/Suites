using Microsoft.AspNetCore.Mvc;
using Suites.Models.Api;
using Suites.Services;

namespace Suites.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : Controller
    {        
        private readonly IPaymentsService _paymentService;
        public PaymentsController(IPaymentsService paymentsService) 
        {
            _paymentService = paymentsService;
        }

        [HttpGet]     
        public async Task<IActionResult> GetPayments()
        {
            try
            {
                var paymentProjections = await _paymentService.GetPayments();
                return Ok(paymentProjections);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddPayment([FromBody] AddPayment payment)
        {
            try
            {
                var guidResponse = await _paymentService.AddPayment(payment);
                return Ok(guidResponse);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditPayment([FromBody] EditPayment payment)
        {
            try
            {
                await _paymentService.EditPayment(payment);
                return Ok("Payment edited");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeletePayment([FromQuery] Guid id)
        {
            try
            {
                await _paymentService.DeletePayment(id);
                return Ok("Payment deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
