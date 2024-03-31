using Microsoft.AspNetCore.Mvc;

namespace _01MyFirstApi.Controllers;

[Route("romario/[controller]")]
[ApiController]
public abstract class MyFirstApiBaseController : ControllerBase
{
    public string Author { get; set; } = "José Romário";

    [HttpGet("heathy")]
    public IActionResult Heathy()
    {
        return Ok("It's working");
    }

    protected string GetCustomKey()
    {
        return Request.Headers["MyKey"].ToString();
    }
}
