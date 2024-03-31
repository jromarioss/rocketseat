using Microsoft.AspNetCore.Mvc;

namespace _01MyFirstApi.Controllers;

public class DeviceController : MyFirstApiBaseController
{
    [HttpGet]
    public IActionResult Get()
    {
        var key = GetCustomKey();

        return Ok(key);
    }
}
