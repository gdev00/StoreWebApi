using Microsoft.EntityFrameworkCore;
using StoreWebApi.Data.Interfaces;
using StoreWebApi.Models.Entities;

namespace StoreWebApi.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _dbContext;

        public ProductRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _dbContext.Set<Product>().ToListAsync();
        }

        public async Task<Product?> GetProductById(int id)
        {
            return await _dbContext.Set<Product>().FindAsync(id);
        }

        public async Task<IEnumerable<Product>> AddProduct(Product product)
        {
            _dbContext.Set<Product>().Add(product);
           await _dbContext.SaveChangesAsync();

            return await GetAllProducts();
        }

        public async Task<Product?> UpdateProduct(Product product)
        {
            _dbContext.Entry(product).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return await GetProductById(product.Id);
        }

        public async Task<IEnumerable<Product>> DeleteProduct(int id)
        {
            var product = _dbContext.Set<Product>().Find(id);
            if (product is not null)
            {
                _dbContext.Set<Product>().Remove(product);
                await _dbContext.SaveChangesAsync();
            }

            return await GetAllProducts();
        }

        public bool IsProductExist(int id)
        {
            return _dbContext.Set<Product>().Any(x => x.Id == id);
        }
    }
}
