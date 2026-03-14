import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/api/orders");
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Order Management</h2>

            {loading ? (
                <p className="text-center">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders placed yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">Customer</th>
                                <th className="py-3 px-6 text-left">Mobile</th>
                                <th className="py-3 px-6 text-left">Product</th>
                                <th className="py-3 px-6 text-left">Price</th>
                                <th className="py-3 px-6 text-left">Date</th>
                                <th className="py-3 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{order.id}</td>
                                    <td className="py-3 px-6 text-left">{order.customerName}</td>
                                    <td className="py-3 px-6 text-left">{order.customerMobile}</td>
                                    <td className="py-3 px-6 text-left">{order.productName}</td>
                                    <td className="py-3 px-6 text-left">₹{order.productPrice}</td>
                                    <td className="py-3 px-6 text-left">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="py-3 px-6 text-center">
                                        <span className="bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-xs">
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;
