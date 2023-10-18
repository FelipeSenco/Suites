
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

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddTenant([FromBody] AddTenant tenantData)
        {       
            try
            {
                await _tenantsService.AddTenant(tenantData);
                return Ok("Tenant Added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }                     
        }
    }
}
