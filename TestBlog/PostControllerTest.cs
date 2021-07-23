using ApiBlog.Controllers;
using ApiBlog.Models;
using ApiBlog.Views;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;


namespace TestBlog
{
    public class PostControllerTest
    {
        BlogContext databaseContext;
        public PostControllerTest()
        {
            var options = new DbContextOptionsBuilder<BlogContext>()
                                                      .UseInMemoryDatabase(databaseName: "Test_AddNewPost").Options;
            databaseContext = new BlogContext(options);
            databaseContext.Database.EnsureCreated();
        }

        /// <summary>
        /// Save new post and consult it
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Save_New_Post_And_Consult_It()
        {
            var postOriginal = new Post() { 
                Title = "test",
                Content = "prueba",
                Image = "imagen",
                Category = "noticias",
                Date = DateTime.Now
                };


            var controller = new PostController(databaseContext);

            var actionResult = await controller.PostPost(postOriginal);

            ActionResult < Post > ArPost = actionResult.Result;

            var CodeStatus = ArPost.Result.GetType().GetProperty("StatusCode")?.GetValue(ArPost.Result);

            var PostResponse = ArPost.Result.GetType().GetProperty("Value")?.GetValue(ArPost.Result) as Post;

            Assert.NotNull(PostResponse);
            Assert.Equal(201, CodeStatus);
            Assert.Equal(PostResponse.Title, postOriginal.Title);
            Assert.Equal(PostResponse.Content, postOriginal.Content);
            Assert.Equal(PostResponse.Category, postOriginal.Category);
            Assert.Equal(PostResponse.Image, postOriginal.Image);
            Assert.Equal(PostResponse.Date, postOriginal.Date);

            var PostDB = await databaseContext.Posts.FindAsync(PostResponse.Id);

            Assert.Equal(PostDB.Title, postOriginal.Title);
            Assert.Equal(PostDB.Content, postOriginal.Content);
            Assert.Equal(PostDB.Category, postOriginal.Category);
            Assert.Equal(PostDB.Image, postOriginal.Image);
            Assert.Equal(PostDB.Date, postOriginal.Date);

        }

        /// <summary>
        /// save 2 posts and then verify that there are only 2
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task GetPosts_Returns_The_Correct_Number_Posts()
        {
            var count = 2;
            var posts = new List<Post>()
            {
                new Post() { Title="Tadpole", Content = "prueba", Image = "imagen",Category = "noticias",Date = DateTime.Now },
                new Post() { Title="Tadpole2", Content = "prueba2", Image = "imagen",Category = "noticias2",Date = DateTime.Now },
            };

            databaseContext.Posts.AddRange(posts);
            await databaseContext.SaveChangesAsync();

            var controller = new PostController(databaseContext);

            var actionResult = await controller.GetPosts();

            List<PostDTO> ArPost = actionResult.Value as List<PostDTO>;

            Assert.NotNull(ArPost);
            Assert.Equal(count, ArPost.Count);

        }
        /// <summary>
        /// Add and soft delete test
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Soft_Delete_A_Post()
        {
            var postOriginal = new Post()
            {
                Title = "test",
                Content = "prueba",
                Image = "imagen",
                Category = "noticias",
                Date = DateTime.Now
            };

            databaseContext.Posts.Add(postOriginal);
            await databaseContext.SaveChangesAsync();

            var controller = new PostController(databaseContext);

            var actionResult = await controller.DeletePost(postOriginal.Id);

            Assert.NotNull(actionResult);

            var postDB = await databaseContext.Posts.FindAsync(postOriginal.Id);

            Assert.NotNull(postDB);
            Assert.True(postDB.isDeleted);


        }
    }
}
