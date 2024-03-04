using StoreWebApi.Models.Entities;
using StoreWebApi.Models.ViewModel;

namespace StoreWebApi.Services.CustomerService
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetAllCustomers();
        Task<Customer?> GetCustomer(int id);
        Task<IEnumerable<Customer>> AddCustomer(Customer customer);
        Task<Customer?> UpdateCustomer(int id, Customer customer);
        Task<IEnumerable<Customer>> DeleteCustomer(int id);
        Task<IEnumerable<CustomerPurchase>> GetAllCustomerPurchases(int customerId);
        Task CustomerOrder(CustomerOrderRequest request);
    }
}
