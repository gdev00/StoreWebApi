using StoreWebApi.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace StoreWebApi.Models.ViewModel
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string? Name { get; set; } = null;
        public string? Description { get; set; } = null;
        public double Price { get; set; }
    }
    public class ProductRequest: ProductViewModel
    {
    }
}
