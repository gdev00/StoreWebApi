using Microsoft.EntityFrameworkCore;
using StoreWebApi.Data;
using StoreWebApi.Data.Interfaces;
using StoreWebApi.Models.Entities;
using StoreWebApi.Models.ViewModel;

namespace StoreWebApi.Services.CustomerService
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public Task<IEnumerable<CustomerPurchase>> GetAllCustomerPurchases(int customerId)
        {
            return _customerRepository.GetAllCustomerPurchases(customerId);
        }

        public async Task CustomerOrder(CustomerOrderRequest request)
        {
           foreach(var id in request.ProductIds)
            {
                await _customerRepository.CustomerOrder(request.CustomerId, id);
            }
        }

        public Task<IEnumerable<Customer>> GetAllCustomers()
        {
            return _customerRepository.GetAllCustomers();
        }

        public Task<Customer?> GetCustomer(int id)
        {
            return _customerRepository.GetCustomerById(id);
        }

        public Task<IEnumerable<Customer>> AddCustomer(Customer customer)
        {
            if (ValidateCustomer(customer) && !IsCustomerExist(customer))
            {
                return _customerRepository.AddCustomer(customer);
            }
            else
            {
                throw new Exception("Invalid Customer Data");
            }
        }

        public Task<Customer?> UpdateCustomer(int id, Customer customer)
        {
            if (ValidateCustomer(customer))
            {
                return _customerRepository.UpdateCustomer(customer);
            }
            else
            {
                throw new Exception("Invalid Customere Data");
            }
        }

        public Task<IEnumerable<Customer>> DeleteCustomer(int id)
        {
            return _customerRepository.DeleteCustomer(id);
        }

        private bool ValidateCustomer (Customer customer)
        {
            return string.IsNullOrWhiteSpace(customer.FirstName) && string.IsNullOrWhiteSpace(customer.LastName) ? false : true;
        }

        private bool IsCustomerExist(Customer customer)
        {
            return _customerRepository.IsCustomerExist(customer?.Id ?? 0);
        }
    }
}
