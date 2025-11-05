"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { useAdminAuth } from '@/app/contexts/AdminAuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Calendar,
  LogOut,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  Clock,
  Shield,
} from 'lucide-react';
import { AdminDashboardTab, AdminStats } from '@/app/types';
import UserManagement from '@/app/components/admin/UserManagement';
import AppointmentManagement from '@/app/components/admin/AppointmentManagement';
import ProductManagement from '@/app/components/admin/ProductManagement';
import OrderManagement from '@/app/components/admin/OrderManagement';

type AdminDashboardPageProps = {
  onLogout: () => void;
};

export default function AdminDashboardPage({ onLogout }: AdminDashboardPageProps) {
  const { admin, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminDashboardTab>('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch admin stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const StatCard = ({ icon: Icon, title, value, trend, color }: any) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-sm font-medium text-green-600 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );

  const OverviewTab = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
          <p className="mt-4 text-gray-600">Loading statistics...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Total Users"
              value={stats.totalUsers.toLocaleString()}
              trend="+12%"
              color="bg-blue-500"
            />
            <StatCard
              icon={ShoppingBag}
              title="Total Orders"
              value={stats.totalOrders.toLocaleString()}
              trend="+8%"
              color="bg-brand-500"
            />
            <StatCard
              icon={DollarSign}
              title="Total Revenue"
              value={`₹${stats.totalRevenue.toLocaleString()}`}
              trend="+23%"
              color="bg-green-500"
            />
            <StatCard
              icon={Package}
              title="Total Products"
              value={stats.totalProducts.toLocaleString()}
              color="bg-orange-500"
            />
            <StatCard
              icon={Clock}
              title="Pending Orders"
              value={stats.pendingOrders.toLocaleString()}
              color="bg-yellow-500"
            />
            <StatCard
              icon={CheckCircle}
              title="Completed Orders"
              value={stats.completedOrders.toLocaleString()}
              color="bg-emerald-500"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New order placed</p>
                    <p className="text-sm text-gray-500">Order #12345</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New user registered</p>
                    <p className="text-sm text-gray-500">user@example.com</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">15 min ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New appointment booked</p>
                    <p className="text-sm text-gray-500">Consultation service</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-brand-500 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
                <p className="text-xs text-gray-500">DEECEE HAIR</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{admin?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{admin?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-8">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-brand-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'products'
                      ? 'bg-brand-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-brand-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'users'
                      ? 'bg-brand-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Users
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'appointments'
                      ? 'bg-brand-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Appointments
                </button>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <div style={{ display: activeTab === 'overview' ? 'block' : 'none' }}>
              <OverviewTab />
            </div>
            <div style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
              <ProductManagement />
            </div>
            <div style={{ display: activeTab === 'orders' ? 'block' : 'none' }}>
              <OrderManagement />
            </div>
            <div style={{ display: activeTab === 'users' ? 'block' : 'none' }}>
              <UserManagement />
            </div>
            <div style={{ display: activeTab === 'appointments' ? 'block' : 'none' }}>
              <AppointmentManagement />
            </div>
          </main>
        </div>
      </div>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} DEECEE HAIR Admin Portal. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>Developed by</span>
              <a
                href="https://github.com/Deepak5310"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-500 hover:text-brand-700 font-medium transition flex items-center space-x-1"
              >
                <span>Deepak</span>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
