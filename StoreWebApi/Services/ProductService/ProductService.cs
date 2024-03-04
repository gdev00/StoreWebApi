using Microsoft.EntityFrameworkCore;
using StoreWebApi.Data;
using StoreWebApi.Data.Interfaces;
using StoreWebApi.Models.Entities;

namespace StoreWebApi.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public Task<IEnumerable<Product>> AddProduct(Product product)
        {

            if (ValidateProduct(product) && !IsProductExist(product)) 
            {
               return _productRepository.AddProduct(product);
            }
            else
            {
                throw new Exception("Invalid Product Data");
            }
        }

        public Task<IEnumerable<Product>> DeleteProduct(int id)
        {
            return _productRepository.DeleteProduct(id);
        }

        public Task<IEnumerable<Product>> GetAllProducts()
        {
            return _productRepository.GetAllProducts();
        }

        public Task<Product?> GetProduct(int id)
        {
            return _productRepository.GetProductById(id);
        }

        public Task<Product?> UpdateProduct(int id, Product product)
        {
            if (ValidateProduct(product))
            {
                return _productRepository.UpdateProduct(product);
            }
            else
            {
                throw new Exception("Invalid Product Data");
            }
        }

        private bool ValidateProduct(Product product)
        {
            return string.IsNullOrWhiteSpace(product.Name) ? false : true;
        }

        private bool IsProductExist(Product product)
        {
            return _productRepository.IsProductExist(product?.Id ?? 0);
        }
    }
}
