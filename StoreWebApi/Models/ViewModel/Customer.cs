namespace StoreWebApi.Models.ViewModel
{
    public class CustomerOrderRequest
    {
        public int CustomerId {  get; set; }
        public required List<int> ProductIds { get; set; }
    }

    public class CustomerViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }

    public class CustomerRequest: CustomerViewModel
    {
    }
}
