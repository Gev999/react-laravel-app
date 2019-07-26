import axios from 'axios';
import store from 'store'

//hapi     - http://127.0.0.1:8080'
//laravel  - http://127.0.0.1:8000'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        store.dispatch({ type: 'LOG_OUT' }); 
        window.location = '/login';
    }
    return Promise.reject(error);
});

class ApiService {
    _baseUrl = 'http://php.blog.loc'
    _nodeUrl = 'http://node.blog.loc'
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
        const { name, email, website, file } = company;

        // --- Laravel version: must be changed!! ---
        const formData = new FormData();
        formData.set('name', name ? name : '');
        formData.set('email', email ? email : '');
        formData.set('website', website ? website : '');
        formData.append('logo', file ? file : '');

        return axios({
            method: 'POST',
            url: `${this._companiesURL}`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        })
        // -----------------------------------------------

        // --- Hapijs version Right VERSION --------------
        // let logo = await this.uploadFile(file);
        // return axios.post(`${this._companiesURL}`, {
        //     name, email, logo, website
        // })
        //--------------------------------------------------
        
    }

    updateCompany = async (company) => {
        const { id, name, email, website, file } = company;

        // --- Laravel version: must be changed!! ---
        const formData = new FormData();
        formData.set('id', id ? id : '');
        formData.set('name', name ? name : '');
        formData.set('email', email ? email : '');
        formData.set('website', website ? website : '');
        if (typeof logo === 'object') {
            formData.append('logo', file ? file : '');
        }
        formData.append('_method', 'PUT');

        return axios({
            method: 'POST',
            url: `${this._companiesURL}/${id}`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        })
        //--------------------------------------------------------

        // --- Hapijs version Right VERSION --------------
        // let logo = await this.uploadFile(file);
        // return axios.put(`${this._companiesURL}/${id}`, {
        //     name, email, logo, website,
        // })
        //------------------------------------------------
    }

    createEmployee = (employee) => {
        return axios.post(`${this._employeesURL}`, employee)
    }

    updateEmployee = (employee) => {
        const { first_name, last_name, company_id, email, phone } = employee;
        return axios.put(`${this._employeesURL}/${employee.id}`, {
            first_name, last_name, company_id: parseInt(company_id), email, phone
        })
    }

    getUser = () => {
        return axios.post(`${this._baseUrl}/api/auth/init`);
    }

    // -------------------------------------------------

    getAllItems = async (url) => {
        const result = await axios.get(`${url}`);
        return result.data;
    }

    getItem = async (url) => {
        const result = await axios.get(`${url}`);
        return result.data;
    }

    deleteItem = async (url) => {
        const result = await axios({
            method: 'DELETE',
            url: `${url}`,
        });
        return result.data;
    }
    //--------------------------------------------------
    uploadFile = async (file) => {
        let result;
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            result =  await axios({
                method: 'POST',
                url: `${this._nodeUrl}/upload`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            });
            return result.data.logo;
        }
    }
}

export default ApiService;