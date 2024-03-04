using StoreWebApi.Models.Entities;

namespace StoreWebApi.Services.ProductService
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<Product?> GetProduct(int id);
        Task<IEnumerable<Product>> AddProduct(Product product);
        Task<Product?>  UpdateProduct(int id, Product product);
        Task<IEnumerable<Product>> DeleteProduct(int id);
    }
}
