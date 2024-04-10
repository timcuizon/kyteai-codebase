using Microsoft.EntityFrameworkCore;
using SamWonAPI.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using System.ComponentModel;
using SamWonAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SamWonAPI.Services.EmailService;
using SamWonAPI.Services.Formats;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

// Add DbContext for SQL Server
builder.Services.AddDbContext<SamwonDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString"));
});

//Setting Up allowed requestors links
builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
{
    build.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
}));

services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    // configure cookie authentication options if needed
})
.AddGoogle(GoogleDefaults.AuthenticationScheme, googleoptions =>
{
    //google auth creds for local dev (samwon-local)
    googleoptions.ClientId = configuration["Authentication:Google:ClientId"];
    googleoptions.ClientSecret = configuration["Authentication:Google:ClientSecret"];

    //google auth creds for local dev (samwon-live)
    //googleoptions.ClientId = configuration["Authentication:GoogleLive:ClientId"];
    //googleoptions.ClientSecret = configuration["Authentication:GoogleLive:ClientSecret"];

    googleoptions.SaveTokens = true;

    //googleoptions.scope.add("https://www.googleapis.com/auth/drive.metadata");
    //googleoptions.scope.add("https://www.googleapis.com/auth/drive.metadata.readonly");
    //googleoptions.scope.add("https://www.googleapis.com/auth/drive.metadata.readonly");
    //googleoptions.scope.add("https://www.googleapis.com/auth/calendar.events.readonly");
    //googleoptions.scope.add("https://www.googleapis.com/auth/drive.readonly");

    googleoptions.AuthorizationEndpoint = "https://accounts.google.com/o/oauth2/auth";
    googleoptions.TokenEndpoint = "https://accounts.google.com/o/oauth2/token";
    googleoptions.UserInformationEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";

    //{

    //    context.response.redirect(uri);k
    //    return context.response.completeasync();
    //});
});

// Add JWT Bearer authentication
//services.AddAuthentication()
//    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, jwtOptions =>
//    {
//        // Configure JWT authentication options
//        jwtOptions.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidIssuer = configuration.GetSection("AppSettings:Issuer").Value,
//            ValidateAudience = true,
//            ValidAudience = configuration.GetSection("AppSettings:Audience").Value,
//            ValidateLifetime = true,
//            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value))
//        };
//    });

//services.AddAuthentication(options =>
//{
//    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; // Set JWT as the default scheme
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; // Set JWT as the default authentication scheme
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; // Set JWT as the default challenge scheme
//})
//.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, jwtOptions =>
//{
//    // Configure JWT authentication options
//    jwtOptions.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidIssuer = configuration.GetSection("AppSettings:Issuer").Value,
//        ValidateAudience = true,
//        ValidAudience = configuration.GetSection("AppSettings:Audience").Value,
//        ValidateLifetime = true,
//        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value))
//    };
//})
//.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
//{
//    // Configure cookie authentication options if needed
//})
//.AddGoogle(GoogleDefaults.AuthenticationScheme, googleOptions =>
//{
//    googleOptions.ClientId = configuration["Authentication:Google:ClientId"];
//    googleOptions.ClientSecret = configuration["Authentication:Google:ClientSecret"];
//    googleOptions.SaveTokens = true;
//    googleOptions.AuthorizationEndpoint = "https://accounts.google.com/o/oauth2/auth";
//    googleOptions.TokenEndpoint = "https://accounts.google.com/o/oauth2/token";
//    googleOptions.UserInformationEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";
//    // Add any additional Google-specific configuration here
//});

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options => {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
//            ValidateIssuer = false,
//            ValidateAudience = false
//        };
//    });


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<JwtValidationService>();
builder.Services.AddHttpContextAccessor(); // Add IHttpContextAccessor

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
services.AddScoped<IEmailService, EmailService>();
services.AddScoped<IEmailContent, EmailContent>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API v1"));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
}

app.UseCors("corspolicy");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization(); 

app.MapControllers();

app.Run();