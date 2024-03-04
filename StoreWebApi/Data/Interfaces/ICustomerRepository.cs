using StoreWebApi.Models.Entities;

namespace StoreWebApi.Data.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetAllCustomers();
        Task<Customer?> GetCustomerById(int id);
        Task<IEnumerable<Customer>> AddCustomer(Customer customer);
        Task<Customer?> UpdateCustomer(Customer customer);
        Task<IEnumerable<Customer>> DeleteCustomer(int id);
        Task<IEnumerable<CustomerPurchase>> GetAllCustomerPurchases(int customerId);
        Task CustomerOrder(int customerId, int productId);
        bool IsCustomerExist(int id);
    }
}
