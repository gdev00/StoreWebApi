using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreWebApi.Models.Entities
{
    public class CustomerPurchase
    {
        [Key]
        public int PurchaseId {  get; set; }
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }
        public virtual Customer? Customer { get; set; } = null;
       

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product? Product { get; set; } = null;
    }
}
