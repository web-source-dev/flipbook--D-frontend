import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditFlipbook() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchFlipbook();
    }, []);

    const fetchFlipbook = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/flipbooks/${id}`);
            const { name, description } = response.data;
            setName(name);
            setDescription(description);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch flipbook');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.put(`http://localhost:5000/flipbooks/${id}`, {
                name,
                description
            });
            navigate('/manage');
        } catch (err) {
            setError('Failed to update flipbook');
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
                <h1 className="text-3xl text-white font-bold mb-8">Edit Flipbook</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white h-32"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/manage')}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditFlipbook;