const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
let bearerToken = null;

function authenticate() {
    const loginData = {
        login_id: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Authentication failed');
        }
        return response.json();
    })
    .then(data => {
        bearerToken = data.token;
        fetchCustomerList();
    })
    .catch(error => console.error(error));
}

function fetchCustomerList() {
    fetch(`${apiUrl}?cmd=get_customer_list`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        displayCustomerList(data);
    })
    .catch(error => console.error(error));
}

function displayCustomerList(customers) {
    const tableBody = document.getElementById('customerTableBody');
    tableBody.innerHTML = '';
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.first_name}</td>
            <td>${customer.last_name}</td>
            <!-- Add other customer fields here -->
            <td>
                <button onclick="deleteCustomer('${customer.uuid}')">Delete</button>
                <button onclick="updateCustomer('${customer.uuid}')">Update</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function createCustomer() {
    const customerData = {
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        street: document.getElementById('street').value,
        // Add other customer fields here
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: 'create', ...customerData }),
    })
    .then(response => {
        if (response.status === 201) {
            fetchCustomerList();
        } else if (response.status === 400) {
            alert('First Name or Last Name is missing.');
        }
    })
    .catch(error => console.error(error));
}

function deleteCustomer(uuid) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: 'delete', uuid }),
    })
    .then(response => {
        if (response.status === 200) {
            fetchCustomerList();
        } else if (response.status === 500) {
            alert('Error: Customer not deleted');
        } else if (response.status === 400) {
            alert('UUID not found');
        }
    })
    .catch(error => console.error(error));
}

function updateCustomer(uuid) {
    const customerData = {
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        street: document.getElementById('street').value,
        // Add other customer fields here
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: 'update', uuid, ...customerData }),
    })
    .then(response => {
        if (response.status === 200) {
            fetchCustomerList();
        } else if (response.status === 500) {
            alert('Error: UUID not found');
        } else if (response.status === 400) {
            alert('Error: Body is empty');
        }
    })
    .catch(error => console.error(error));
}
