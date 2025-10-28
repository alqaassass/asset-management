import { useState, useEffect } from 'react';
import api from '../api/axios';

function AssetTypes() {
    const [types, setTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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

    const resetForm = () => {
        setFormData({ name: '' });
        setShowForm(false);
    };

    // Filter types based on search query
    const filteredTypes = types.filter(type => {
        const query = searchQuery.toLowerCase();
        return type.name.toLowerCase().includes(query);
    });

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">Asset Types</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Manage asset categories and types</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Type</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="🔍 Search asset types..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl leading-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md hover:shadow-lg focus:shadow-xl transition-all duration-200 sm:text-sm font-medium"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Add Type Modal */}
            {showForm && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) resetForm();
                    }}
                >
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-zoomIn">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Add New Asset Type</h3>
                                <button
                                    onClick={resetForm}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-4">
                            <div className="space-y-4">
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Add Type
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type Name</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredTypes.map((type) => (
                                <tr key={type.id}>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{type.name}</td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(type.id)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
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
