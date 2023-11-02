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

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddPayment([FromBody] AddPayment payment)
        {
            return Ok();
        }
    }
}
