'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { fetchOrders } from '../../utils/api';
import { LoadingSkeleton } from '@/component/UI/Loading';
import { OrderTable } from '@/component/Admin/OrderTable';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard | Order Management</title>
        <meta name="description" content="Admin panel for managing orders" />
      </Head>

      <div 
        className="min-h-screen bg-gray-100"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Order Dashboard</h1>
            <p className="text-white/80 mt-2">Manage all customer orders in one place</p>
          </header>

          <main className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Recent Orders</h2>
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                {orders.length} orders
              </span>
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>Error loading orders: {error}</p>
              </div>
            ) : (
              <OrderTable orders={orders} />
            )}
          </main>

          <footer className="mt-8 text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} Fussion Report Admin Panel</p>
          </footer>
        </div>
      </div>
    </>
  );
}