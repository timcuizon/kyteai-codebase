using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamWonAPI.Data;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SamWonAPI.Controllers
{
    [Route("api/Module")]
    [ApiController]
    [AllowAnonymous]
    public class ModuleController : ControllerBase
    {

        private readonly SamwonDbContext _context;
        private readonly JwtValidationService _jwtValidationService;
        string[] allowedRoles;

        public ModuleController(SamwonDbContext context, JwtValidationService jwtValidationService)
        {
            _context = context;
            _jwtValidationService = jwtValidationService;
            allowedRoles = ["Admin"];
        }

        [HttpPost("GetModules")]
        public IActionResult GetModules()
        {
            try
            {
                var modules = _context.Modules.ToList();

                return Ok(modules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("UpdateModules")]
        public IActionResult UpdateModules([FromForm] ModulesModel data)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                try
                {
                    var ids = data.id.Split(',');
                    var modules = data.module1.Split(',');
                    var isActives = data.isActive.Split(',');

                    for (var cnt = 0; cnt < ids.Length; cnt++)
                    {
                        var module = _context.Modules.Where(e => e.Id == int.Parse(ids[cnt])).FirstOrDefault();
                        if (module != null)
                        {
                            module.IsActive = int.Parse(isActives[cnt]);
                            _context.SaveChanges(); // Save changes to the database
                        }
                        else
                        {
                            continue;
                        }
                    }
                    return Ok();
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }
    }
    public class ModulesModel
    {
        [Required]
        public string id { get; set; }

        public string module1 { get; set; }

        public string isActive { get; set; }
    }
}
