using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SamWonAPI.Data;
using SamWonAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SamWonAPI.Controllers
{
    [Route("api/UserType")]
    [ApiController]
    [AllowAnonymous]
    public class UserTypeController : ControllerBase
    {

        private readonly SamwonDbContext _context;

        public UserTypeController(SamwonDbContext context)
        {
            _context = context;
        }

        [HttpPost("createAccount")]
        public IActionResult createAccount([FromForm] NewAccountModel data)
        {
            // Check if the model stasfies the conditions.
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    success = false,
                    errors = string.Join("; ", ModelState.Values
                                            .SelectMany(x => x.Errors)
                                            .Select(x => x.ErrorMessage))
                });
            }

            try
            {

                //Updating the role from UserLogin table
                var user = _context.UserLogins.SingleOrDefault(u => u.Email == data.Email);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                //Updating the role from userLogIn
                user.Role = data.Role;

                //Inserting new user account in the database
                if (data.Role == "Parent")
                {
                    //Parent has been chosen
                    Parent newParent = new Parent
                    {
                        UserId = "Tester_" + data.Email,
                        Email = data.Email,
                        Givenname = !string.IsNullOrEmpty(data.GivenName) ? data.GivenName : " ",
                        Familyname = !string.IsNullOrEmpty(data.familyName) ? data.familyName : " ",
                        Dob = DateTime.Parse(data.dob),
                        Sex = data.Sex,
                        Picture = data.Picture,
                        AccountStatusId = 1,
                        CreatedAt = DateTime.Now,
                        CreatedBy = "A001",
                        UpdatedAt = DateTime.Now,
                        UpdatedBy = "A001",
                    };
                    // Add the new entity to the context
                    _context.Parents.Add(newParent);
                }
                else if (data.Role == "Student")
                {
                    //Student has been chosen
                    Student newStudent = new Student
                    {
                        UserId = "Tester_" + data.Email,
                        Email = data.Email,
                        Givenname = !string.IsNullOrEmpty(data.GivenName) ? data.GivenName : " ",
                        Familyname = !string.IsNullOrEmpty(data.familyName) ? data.familyName : " ",
                        Dob = DateTime.Parse(data.dob),
                        Sex = data.Sex,
                        Picture = data.Picture,
                        AccountStatusId = 1,
                        CreatedAt = DateTime.Now,
                        CreatedBy = "A001",
                        UpdatedAt = DateTime.Now,
                        UpdatedBy = "A001",
                    };

                    // Add the new entity to the context
                    _context.Students.Add(newStudent);
                }

                _context.SaveChanges();

                return Ok(new
                {
                    success = true,
                    mess = "role udpated."
                });
            }
            catch (DbUpdateException ex)
            {
                // Handle exceptions appropriately
                return BadRequest($"Error updating email: {ex.Message}");
            }

            //Inserting new record in the DB

        }

        //Structure for getting getting the SP with Parameter
        [HttpPost("User")]
        public IActionResult AuthenticateOTP([FromForm] UserAuthModel data)
        {
            // Check if the model stasfies the conditions.
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    success = false,
                    errors = string.Join("; ", ModelState.Values
                                            .SelectMany(x => x.Errors)
                                            .Select(x => x.ErrorMessage))
                });
            }

            try
            {
                var parameters = new
                {
                    email = data.userEmail
                };

                DataTable dt = SharedClass.GetTable("GetStudent", true, parameters);
                if (dt.Rows.Count > 0)
                {
                    string jsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);
                    return Ok(jsonResult);
                }
                else
                {
                    return StatusCode(500, "Please make sure that you have entered a correct google email");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            //try
            //{
            //    var result = await _context.Users.FromSqlRaw("GetUser {0}", email).ToListAsync();
            //    return Ok(result);
            //}
            //catch(Exception ex)
            //{
            //    return BadRequest("Error: "+ ex.Message);
            //}
        }


    }
    public class UserAuthModel()
    {
        [Required]
        [EmailAddress]
        public string userEmail { get; set; }

    }
}
