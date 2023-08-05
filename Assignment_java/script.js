// Sample customer data
let customers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

// Function to display customers in the table
function displayCustomers() {
    const tableBody = document.querySelector("#customerTable tbody");
    tableBody.innerHTML = "";

    customers.forEach(customer => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td><button class="editButton" data-id="${customer.id}">Edit</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listener to edit buttons
    const editButtons = document.querySelectorAll(".editButton");
    editButtons.forEach(button => {
        button.addEventListener("click", handleEdit);
    });
}

// Function to handle edit action
function handleEdit(event) {
    const customerId = parseInt(event.target.dataset.id);
    const customer = customers.find(c => c.id === customerId);

    // Populate the update form with the selected customer data
    document.querySelector("#updateId").value = customer.id;
    document.querySelector("#updateName").value = customer.name;
    document.querySelector("#updateEmail").value = customer.email;
}

// Function to handle form submission for creating a new customer
document.querySelector("#createCustomerForm").addEventListener("submit", event => {
    event.preventDefault();
    const newName = document.querySelector("#newName").value;
    const newEmail = document.querySelector("#newEmail").value;

    // Create a new customer object and add it to the array
    const newCustomerId = customers.length + 1;
    const newCustomer = { id: newCustomerId, name: newName, email: newEmail };
    customers.push(newCustomer);

    // Clear the form fields and display the updated customer list
    document.querySelector("#newName").value = "";
    document.querySelector("#newEmail").value = "";
    displayCustomers();
});

// Function to handle form submission for updating a customer
document.querySelector("#updateDeleteForm").addEventListener("submit", event => {
    event.preventDefault();
    const customerId = parseInt(document.querySelector("#updateId").value);
    const customer = customers.find(c => c.id === customerId);

    // Update the customer data
    customer.name = document.querySelector("#updateName").value;
    customer.email = document.querySelector("#updateEmail").value;

    // Clear the form fields and display the updated customer list
    document.querySelector("#updateId").value = "";
    document.querySelector("#updateName").value = "";
    document.querySelector("#updateEmail").value = "";
    displayCustomers();
});

// Function to handle delete action
document.querySelector("#deleteButton").addEventListener("click", () => {
    const customerId = parseInt(document.querySelector("#updateId").value);
    customers = customers.filter(c => c.id !== customerId);

    // Clear the form fields and display the updated customer list
    document.querySelector("#updateId").value = "";
    document.querySelector("#updateName").value = "";
    document.querySelector("#updateEmail").value = "";
    displayCustomers();
});

// Initial display of customer data
displayCustomers();