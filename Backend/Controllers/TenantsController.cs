
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
                var guidResponse = await _tenantsService.AddTenant(tenantData);
                return Ok(guidResponse);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }                     
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> AddTenant([FromBody] Tenant tenantData)
        {
            try
            {
                await _tenantsService.EditTenant(tenantData);
                return Ok("Tenant Edited");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete([FromQuery] Guid id)
        {
            try
            {
                await _tenantsService.DeleteTenant(id);
                return Ok("Tenant Deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
