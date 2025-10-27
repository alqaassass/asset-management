import { useState, useEffect } from 'react';
import api from '../api/axios';

function AssetTypes() {
    const [types, setTypes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '' });

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await api.get('/asset-types');
            setTypes(response.data);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/asset-types', formData);
            fetchTypes();
            setFormData({ name: '' });
            setShowForm(false);
        } catch (error) {
            alert(error.response?.data?.error || 'Error adding type');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this type?')) {
            try {
                await api.delete(`/asset-types/${id}`);
                fetchTypes();
            } catch (error) {
                alert('Error deleting type');
            }
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Asset Types</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    {showForm ? 'Cancel' : 'Add Type'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Add New Asset Type</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type Name (e.g., Laptop, Monitor)"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add Type
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type Name</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {types.map((type) => (
                                <tr key={type.id}>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type.name}</td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(type.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AssetTypes;
