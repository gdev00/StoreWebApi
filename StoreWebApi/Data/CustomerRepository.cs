using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreWebApi.Data.Interfaces;
using StoreWebApi.Models.Entities;

namespace StoreWebApi.Data
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly DataContext _dbContext;

        public CustomerRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Customer>> GetAllCustomers()
        {
            return await _dbContext.Set<Customer>().ToListAsync();
        }

        public async Task<Customer?> GetCustomerById(int id)
        {
            return await _dbContext.Set<Customer>().FindAsync(id);
        }

        public async Task<IEnumerable<Customer>> AddCustomer(Customer customer)
        {
            _dbContext.Set<Customer>().Add(customer);
            await _dbContext.SaveChangesAsync();

            return await GetAllCustomers();
        }

        public async Task<Customer?> UpdateCustomer(Customer customer)
        {
            _dbContext.Entry(customer).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return await GetCustomerById(customer.Id);
        }

        public async Task<IEnumerable<Customer>> DeleteCustomer(int id)
        {
            var customer = _dbContext.Set<Customer>().Find(id);
            if (customer is not null)
            {
                _dbContext.Set<Customer>().Remove(customer);
                await _dbContext.SaveChangesAsync();
            }

            return await GetAllCustomers();
        }

        public async Task CustomerOrder(int customerId, int productId)
        {
            _dbContext.Set<CustomerPurchase>().Add(new CustomerPurchase
            {
                CustomerId = customerId,
                ProductId = productId,
            });

            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<CustomerPurchase>> GetAllCustomerPurchases(int customerId)
        {
            return await _dbContext.Set<CustomerPurchase>()
                .Include(x => x.Product)
                .Include(x => x.Customer)
                .Where(x => x.CustomerId == customerId)
                .ToListAsync();
        }
        public bool IsCustomerExist(int id)
        {
            return _dbContext.Set<Customer>().Any(x => x.Id == id);
        }

    }
}
