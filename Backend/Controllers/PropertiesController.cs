
using Microsoft.AspNetCore.Mvc;
using Suites.Services;

namespace Suites.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertiesService _propertiesService;

        public PropertiesController(IPropertiesService propertiesService)
        {
            _propertiesService = propertiesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTenants()
        {
            try
            {
                var properties = await _propertiesService.GetProperties();
                return Ok(properties);
            } 
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }        
    }
}
