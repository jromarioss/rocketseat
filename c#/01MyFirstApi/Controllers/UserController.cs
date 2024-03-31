using _01MyFirstApi.Communication.Requests;
using _01MyFirstApi.Communication.Responses;
using Microsoft.AspNetCore.Mvc;

namespace _01MyFirstApi.Controllers;

public class UserController : MyFirstApiBaseController
{
    [HttpGet]
    [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
    public IActionResult Get([FromHeader] int id, [FromHeader] string? name) // para enviar so no query
    {
        var response = new User
        {
            Id = 1,
            Age = 7,
            Name = "Romário"
        };

        return Ok(response);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ResponseRegisterUserJson), StatusCodes.Status201Created)]
    public IActionResult Create([FromBody] RequestRegisterUserJson request)
    {
        var response = new ResponseRegisterUserJson
        {
            Id = 1,
            Name = request.Name,
        };

        return Created(string.Empty, response);
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public IActionResult Update([FromBody] RequestUpdateUserProfileJson request)
    {
        return NoContent();
    }

    [HttpDelete]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public IActionResult Delete([FromRoute] int id)
    {
        return NoContent();
    }

    [HttpGet("all-users")]
    [ProducesResponseType(typeof(List<User>), StatusCodes.Status200OK)]
    public IActionResult GetAll()
    {
        var response = new List<User>()
        {
            new User { Id = 1, Age = 10, Name = "João"},
            new User { Id = 2, Age = 13, Name = "Pedro"},
            new User { Id = 3, Age = 17, Name = "Maria"},
        };

        return Ok(response);
    }

    [HttpPut("change-password")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public IActionResult ChangePassword([FromBody] RequestChangePasswordJson request)
    {
        return NoContent();
    }
}
