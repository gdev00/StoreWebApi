using Microsoft.AspNetCore.Mvc;
using StoreWebApi.Models.Entities;
using StoreWebApi.Models.ViewModel;
using StoreWebApi.Services.ProductService;


namespace StoreWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productService.GetProduct(id);

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<List<Product>>> AddProduct(ProductRequest request)
        {
            var products = await _productService.AddProduct(new Product
            {
                Description = request.Description,
                Name = request.Name,
                Price = request.Price,
            });

            if (products is null)
            {
                return NotFound("Add failed: Product not found");
            }

            return Ok(products);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Product>>> DeleteProduct(int id)
        {
            var result = await _productService.DeleteProduct(id);

            if (result is null)
            {
                return NotFound("Delete failed. Product not found.");
            }

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Product>>> UpdateProduct(int id, Product request)
        {
            if (id != request.Id) return BadRequest();

            var result = await _productService.UpdateProduct(id, request);

            if (result is null)
            {
                return NotFound("Update failed. Product not found.");
            }

            return Ok(result);
        }
    }
}
