"use client";
import React, { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus, Order } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  // Local pending selection for fulfillment status per order
  const [pendingFulfillment, setPendingFulfillment] = useState<Record<string, string>>({});
  const [savingFulfillment, setSavingFulfillment] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadOrders = async () => {
      const fetchedOrders = await fetchAllOrders();
      setOrders(fetchedOrders);
      // initialize pending fulfillment selections from fetched orders
      const initial: Record<string, string> = {};
      fetchedOrders.forEach(o => { initial[o._id] = (o.dbStatus || 'processing'); });
      setPendingFulfillment(initial);
      setLoading(false);
    };
    loadOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, status: string, paymentStatus: string) => {
    const success = await updateOrderStatus(orderId, status, paymentStatus);
    if (success) {
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, status: status as any, paymentStatus: paymentStatus as any }
          : order
      ));
    }
  };

  const toFulfillmentDisplay = (code: string) => {
    switch ((code || '').toLowerCase()) {
      case 'processing':
      case 'pending':
        return 'Processing';
      case 'on_way':
      case 'shipped':
        return 'On Way';
      case 'about_to_deliver':
        return 'About to Deliver';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
      case 'canceled':
        return 'Canceled';
      default:
        return 'Processing';
    }
  };

  const handleFulfillmentUpdate = async (orderId: string, dbStatus: 'processing' | 'on_way' | 'about_to_deliver' | 'delivered' | 'cancelled') => {
    const { updateFulfillmentStatus } = await import('@/lib/orders');
    setSavingFulfillment(prev => ({ ...prev, [orderId]: true }));
    const success = await updateFulfillmentStatus(orderId, dbStatus);
    if (success) {
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, dbStatus, fulfillmentStatus: toFulfillmentDisplay(dbStatus) as any }
          : order
      ));
      setPendingFulfillment(prev => ({ ...prev, [orderId]: dbStatus }));
    }
    setSavingFulfillment(prev => ({ ...prev, [orderId]: false }));
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'canceled':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading orders...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>
      
      {orders.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">No orders found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order #{order.paymentIntentId}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={`${getStatusBadgeColor(order.status)} text-white`}>
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Customer Information</h4>
                    <p className="text-sm text-gray-600">Email: {order.customerEmail}</p>
                    <p className="text-sm text-gray-600">User ID: {order.userId}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Order Details</h4>
                    <p className="text-sm text-gray-600">
                      Total: {order.currency.toUpperCase()} ${order.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment Status: {order.paymentStatus}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium">Payment Summary:</label>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusUpdate(order._id, value, order.paymentStatus)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="text-sm font-medium">Payment Status:</label>
                    <Select
                      value={order.paymentStatus}
                      onValueChange={(value) => handleStatusUpdate(order._id, order.status, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="succeeded">Succeeded</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <label className="text-sm font-medium">Order Status:</label>
                    <Select
                      value={pendingFulfillment[order._id] ?? order.dbStatus}
                      onValueChange={(value) => setPendingFulfillment(prev => ({ ...prev, [order._id]: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={order.fulfillmentStatus} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="on_way">On Way</SelectItem>
                        <SelectItem value="about_to_deliver">About to Deliver</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="mt-2">
                      <Button
                        onClick={() => handleFulfillmentUpdate(order._id, (pendingFulfillment[order._id] ?? order.dbStatus) as any)}
                        disabled={!!savingFulfillment[order._id]}
                        className="w-full"
                      >
                        {savingFulfillment[order._id] ? 'Updating...' : 'Update Status'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
