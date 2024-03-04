using StoreWebApi.Models.Entities;

namespace StoreWebApi.Data.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<Product?> GetProductById(int id);
        Task<IEnumerable<Product>> AddProduct(Product product);
        Task<Product?> UpdateProduct(Product product);
        Task<IEnumerable<Product>> DeleteProduct(int id);
        bool IsProductExist(int id);
    }
}
