
using Microsoft.AspNetCore.Mvc;
using Suites.Services;

namespace Suites.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TenantsController : ControllerBase
    {
        private readonly ITenantsService _tenantsService;

        public TenantsController(ITenantsService tenantsService)
        {
            _tenantsService = tenantsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTenants()
        {
            var tenants = await _tenantsService.GetTenants();
            return Ok(tenants);
        }
    }
}
