using Microsoft.AspNetCore.Mvc;
using StoreWebApi.Models.Entities;
using StoreWebApi.Models.ViewModel;
using StoreWebApi.Services.CustomerService;
using StoreWebApi.Services.ProductService;

namespace StoreWebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Customer>>> GetAllCustomers()
        {
            var customers = await _customerService.GetAllCustomers();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetCustomer(int id)
        { 
            var customer = await _customerService.GetCustomer(id);

            return Ok(customer);
        }

        [HttpPost]
        public async Task<ActionResult<List<Customer>>> AddCustomer(CustomerRequest request)
        {
            var customers = await _customerService.AddCustomer(new Customer
            {
                FirstName = request.FirstName,
                LastName = request.LastName
            });

            if (customers is null)
            {
                return NotFound("Add failed: Customer not found");
            }

            return Ok(customers);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Customer>>> DeleteCustomer(int id)
        {
            var result = await _customerService.DeleteCustomer(id);

            if (result is null)
            {
                return NotFound("Delete failed. Customer not found.");
            }

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Customer>>> UpdateCustomer(int id, Customer request)
        {
            if (id != request.Id) return BadRequest();

            var result = await _customerService.UpdateCustomer(id, request);

            if (result is null)
            {
                return NotFound("Update failed. Customer not found.");
            }

            return Ok(result);
        }

        [HttpGet("customer-purchase/{customerId}")]
        public async Task<ActionResult<List<CustomerPurchase>>> GetCustomerPurchases(int customerId)
        {
            var customerPurchases = await _customerService.GetAllCustomerPurchases(customerId);
            return Ok(customerPurchases);
        }

        [HttpPost("customer-order")]
        public async Task<ActionResult> CustomerOrderRequest(CustomerOrderRequest request)
        {
            await _customerService.CustomerOrder(request);

            return Ok();
        }

    }
}
