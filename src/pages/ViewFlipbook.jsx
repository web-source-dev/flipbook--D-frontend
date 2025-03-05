import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Flipbook from '../components/Flipbook';

function ViewFlipbook() {
    const [flipbook, setFlipbook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchFlipbook();
    }, []);

    const fetchFlipbook = async () => {
        try {
            const response = await axios.get(`https://twod-flipbook.onrender.com/flipbooks/${id}`);
            setFlipbook(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch flipbook');
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!flipbook) return <div className="text-center text-white">Flipbook not found</div>;

    const pdfUrl = `https://twod-flipbook.onrender.com/uploads/${flipbook.filename}`;

    return (
        <div className="min-h-screen bg-gray-900">
                <Flipbook pdfFile={pdfUrl} />
        </div>
    );
}

export default ViewFlipbook;
