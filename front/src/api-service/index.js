import axios from 'axios'

class ApiService
{
    _baseUrl = 'http://127.0.0.1:8000';
    _companiesURL = `${this._baseUrl}/api/companies`;
    _employeesURL = `${this._baseUrl}/api/employees`;

    getAllCompanies = () => {
        return this.getAllItems(this._companiesURL);
    }

    getAllEmployees = () => {
        return this.getAllItems(this._employeesURL);
    }

    getCompany = (id) => {
        return this.getItem(`${this._companiesURL}/${id}`);
    }

    getEmployee = (id) => {
        return this.getItem(`${this._employeesURL}/${id}`);
    }

    deleteCompany = (id) => {
        return this.deleteItem(`${this._companiesURL}/${id}`);
    }

    deleteEmployee = (id) => {
        return this.deleteItem(`${this._employeesURL}/${id}`);
    }

    createCompany = async (company) => {
        const { name, email, website, file} = company;

        const formData = new FormData();
        formData.set('name', name ? name : '');
        formData.set('email', email ? email : '');
        formData.set('website', website? website : '');
        formData.append('logo', file ? file : '');

        return await axios({
            method: 'POST',
            url: `${this._companiesURL}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('token'),
            },
            data: formData,
        })
    }
    
    updateCompany = async (company) => {
        const { id, name, email, website, file } = company;

        const formData = new FormData();
        formData.set('id', id ? id : '');
        formData.set('name', name ? name : '');
        formData.set('email', email ? email : '');
        formData.set('website', website? website : '');
        if (typeof logo==='object') {
            formData.append('logo', file ? file : '');
        }
        formData.append('_method', 'PUT');

        return await axios({
            method: 'POST',
            url: `${this._companiesURL}/${id}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('token'),
            },
            data: formData,
        })
    }

    createEmployee = async (employee) => {
        return await axios.post(`${this._employeesURL}`, 
            {
                token: localStorage.getItem('token'),
                ...employee,
            })
    }

    updateEmployee = async (employee) => {
        return await axios.put(`${this._employeesURL}/${employee.id}`, {
            token: localStorage.getItem('token'),
            ...employee,
        })
    }

    // -------------------------------------------------

    getAllItems = async (url) => {
        const result = await axios.get(`${url}`, {
            params: {
                token: localStorage.getItem('token'),
            }
        });
        return result.data;
    }

    getItem = async (url) => {
        const result = await axios.get(`${url}`, {
            params: {
                token: localStorage.getItem('token'),
            }
        });
        return result.data;
    }

    deleteItem = async (url) => {
        const result = await axios({
            method: 'DELETE',
            url: `${url}`,
            params: {
                token:  localStorage.getItem('token'),
            }
        });
        return result.data;
    }
}

export default ApiService;