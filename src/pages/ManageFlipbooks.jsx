import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageFlipbooks() {
    const [flipbooks, setFlipbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFlipbooks();
    }, []);

    const fetchFlipbooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/flipbooks');
            setFlipbooks(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch flipbooks');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this flipbook?')) {
            try {
                await axios.delete(`http://localhost:5000/flipbooks/${id}`);
                fetchFlipbooks();
            } catch (err) {
                setError('Failed to delete flipbook');
            }
        }
    };

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl text-white font-bold">Manage Flipbooks</h1>
                    <Link 
                        to="/create" 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Create New Flipbook
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {flipbooks.map((flipbook) => (
                        <div key={flipbook._id} className="bg-gray-800 rounded-lg p-6 text-white">
                            <h2 className="text-xl font-semibold mb-2">{flipbook.name}</h2>
                            <p className="text-gray-400 mb-4">{flipbook.description}</p>
                            <div className="flex gap-4">
                                <Link 
                                    to={`/view/${flipbook._id}`}
                                    className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
                                >
                                    View
                                </Link>
                                <Link 
                                    to={`/edit/${flipbook._id}`}
                                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(flipbook._id)}
                                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageFlipbooks;