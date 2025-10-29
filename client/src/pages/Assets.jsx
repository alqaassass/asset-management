import { useState, useEffect } from 'react';
import api from '../api/axios';

function Assets() {
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [assetTypes, setAssetTypes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    type: true,
    serial: true,
    location: true,
    assigned_to: true,
    status: true
  });
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serial_number: '',
    location: '',
    assigned_to: '',
    status: 'in_use'
  });
  const [editFormData, setEditFormData] = useState({
    name: '',
    type: '',
    serial_number: '',
    location: '',
    assigned_to: '',
    status: 'in_use'
  });

  useEffect(() => {
    fetchAssets();
    fetchAssetTypes();
    fetchEmployees();
  }, []);

  const fetchAssets = async () => {
    try {
      console.log('Fetching assets...');
      const response = await api.get('/assets');
      console.log('Assets response:', response.data);
      console.log('Number of assets:', response.data.length);
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
      console.error('Error details:', error.response?.data);
    }
  };

  const fetchAssetTypes = async () => {
    try {
      const response = await api.get('/asset-types');
      setAssetTypes(response.data);
    } catch (error) {
      console.error('Error fetching asset types:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };



  const getStatusColor = (status) => {
    switch (status) {
      case 'in_use':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'in_repair':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'in_use':
        return 'In Use';
      case 'inactive':
        return 'Inactive';
      case 'in_repair':
        return 'In Repair';
      default:
        return status;
    }
  };

  const toggleColumn = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.serial_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (asset.location && asset.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (asset.assigned_to && asset.assigned_to.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/assets', formData);
      fetchAssets();
      resetForm();
    } catch (error) {
      console.error('Error creating asset:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/assets/${editingAsset.id}`, editFormData);
      fetchAssets();
      setShowEditModal(false);
      setEditingAsset(null);
    } catch (error) {
      console.error('Error updating asset:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await api.delete(`/assets/${id}`);
        fetchAssets();
      } catch (error) {
        console.error('Error deleting asset:', error);
      }
    }
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setEditFormData({
      name: asset.name,
      type: asset.type,
      serial_number: asset.serial_number,
      location: asset.location || '',
      assigned_to: asset.assigned_to || '',
      status: asset.status
    });
    setShowEditModal(true);
  };

  const showQR = async (id) => {
    try {
      const response = await api.get(`/assets/${id}/qr`);
      setQrCode(response.data.qrCode);
    } catch (error) {
      alert('Error generating QR code');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      serial_number: '',
      location: '',
      assigned_to: '',
      status: 'active'
    });
    setShowForm(false);
  };



  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingAsset(null);
    setEditFormData({
      name: '',
      type: '',
      serial_number: '',
      location: '',
      assigned_to: '',
      status: 'active'
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">Assets</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Manage and track all your IT assets</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Asset</span>
        </button>
      </div>

      {/* Search Bar and Column Settings */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="🔍 Search assets by name, type, serial, location, or assigned to..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl leading-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md hover:shadow-lg focus:shadow-xl transition-all duration-200 sm:text-sm font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Column Settings */}
        <div className="relative">
          <button
            onClick={() => setShowColumnSettings(!showColumnSettings)}
            className="px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Columns
          </button>
          {showColumnSettings && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-20 border border-gray-200 overflow-hidden">
              <div className="py-2">
                <div className="px-4 py-3 text-sm font-semibold text-gray-700 border-b bg-gray-50">Show/Hide Columns</div>
                {Object.entries(visibleColumns).map(([column, visible]) => (
                  <label key={column} className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={visible}
                      onChange={() => toggleColumn(column)}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium capitalize text-gray-700">
                      {column.replace('_', ' ').replace('serial', 'Serial Number')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Asset Modal */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-gray-600/50 dark:bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetForm();
          }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-zoomIn">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Asset</h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Asset Name <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Asset Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Type</option>
                      {assetTypes.map((type) => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Serial Number <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Serial Number"
                      required
                      value={formData.serial_number}
                      onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned To
                    </label>
                    <select
                      value={formData.assigned_to}
                      onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Employee (Optional)</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.name}>{employee.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="in use">In Use</option>
                      <option value="available">Available</option>
                      <option value="in repair">In Repair</option>
                    </select>
                  </div>
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
                  Create Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              {visibleColumns.name && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>}
              {visibleColumns.type && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>}
              {visibleColumns.serial && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Serial</th>}
              {visibleColumns.location && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>}
              {visibleColumns.assignedTo && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned To</th>}
              {visibleColumns.status && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAssets.map((asset) => (
              <tr key={asset.id}>

                {visibleColumns.name && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{asset.name}</td>}
                {visibleColumns.type && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{asset.type}</td>}
                {visibleColumns.serial && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{asset.serial_number}</td>}
                {visibleColumns.location && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{asset.location || '-'}</td>}
                {visibleColumns.assignedTo && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{asset.assigned_to || '-'}</td>}
                {visibleColumns.status && <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    asset.status === 'in use' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 
                    asset.status === 'in repair' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 
                    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  }`}>
                    {asset.status}
                  </span>
                </td>}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => showQR(asset.id)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                  >
                    QR
                  </button>
                  <button
                    onClick={() => handleEdit(asset)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(asset.id)}
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

      {/* Mobile Card View - Hidden on desktop */}
      <div className="lg:hidden space-y-4">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-gray-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                <p className="text-sm text-gray-500">{asset.type}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                {getStatusLabel(asset.status)}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Serial:</span>
                <span className="text-gray-900 font-medium">{asset.serial_number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location:</span>
                <span className="text-gray-900">{asset.location || '-'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Assigned To:</span>
                <span className="text-gray-900">{asset.assigned_to || '-'}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => showQR(asset.id)}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 text-white text-sm rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105"
              >
                📱 QR
              </button>
              <button
                onClick={() => handleEdit(asset)}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm rounded-xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(asset.id)}
                className="px-4 py-2.5 bg-gradient-to-r from-red-500 via-red-600 to-orange-600 text-white text-sm rounded-xl hover:from-red-600 hover:via-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Asset Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600/50 dark:bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Asset</h3>
                <button
                  onClick={closeEditModal}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleEditSubmit} className="px-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Asset Name <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={editFormData.type}
                      onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Type</option>
                      {assetTypes.map((type) => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Serial Number <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.serial_number}
                      onChange={(e) => setEditFormData({ ...editFormData, serial_number: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editFormData.location}
                      onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Assigned To
                    </label>
                    <select
                      value={editFormData.assigned_to}
                      onChange={(e) => setEditFormData({ ...editFormData, assigned_to: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Employee (Optional)</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.name}>{employee.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="in use">In Use</option>
                      <option value="available">Available</option>
                      <option value="in repair">In Repair</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {qrCode && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Asset QR Code</h3>
            <img src={qrCode} alt="QR Code" className="w-full" />
            <div className="mt-4 space-y-2">
              <a
                href={qrCode}
                download="asset-qr.png"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Download QR Code
              </a>
              <button
                onClick={() => setQrCode(null)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assets;
