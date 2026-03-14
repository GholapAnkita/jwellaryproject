import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/api/enquiries");
            setEnquiries(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Customer Enquiries</h2>

            {loading ? (
                <p className="text-center">Loading messages...</p>
            ) : enquiries.length === 0 ? (
                <p className="text-center text-gray-500">No enquiries found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enquiries.reverse().map((enquiry) => (
                        <div key={enquiry.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{enquiry.name}</h3>
                                    <p className="text-sm text-gray-600">{enquiry.email}</p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(enquiry.date).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded">{enquiry.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminEnquiries;
