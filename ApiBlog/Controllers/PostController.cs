using ApiBlog.Models;
using ApiBlog.Views;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBlog.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private BlogContext _context;

        public PostController(BlogContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            return await _context.Posts
                                 .Select(p => new PostDTO { Id = p.Id, Title = p.Title, Category = p.Category, Image = p.Image, Date = p.Date }).OrderByDescending(p => p.Date).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

    }
}
