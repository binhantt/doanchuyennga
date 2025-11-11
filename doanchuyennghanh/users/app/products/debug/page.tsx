'use client';

import { useState, useEffect } from 'react';
import { productsApi } from '../../../features/products/api/productsApi';
import { Product } from '../../../features/products/types';
import { createSlug, formatPrice } from '../../../lib/utils';
import Link from 'next/link';

export default function ProductsDebugPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug: Available Products</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
          
          {products.length === 0 ? (
            <p className="text-red-600">No products found. Check if backend is running on port 3001.</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">ID: {product.id}</p>
                      <p className={`text-sm ${product.is_available ? 'text-green-600' : 'text-red-600'}`}>
                        {product.is_available ? 'Còn hàng' : 'Hết hàng'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Slug:</strong> {createSlug(product.name)}
                      </p>
                      <p className="text-sm">
                        <strong>Price:</strong> {formatPrice(product.price)}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/products/${createSlug(product.name)}`}
                        className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                      >
                        View Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test URLs</h2>
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="text-sm">
                <Link
                  href={`/products/${createSlug(product.name)}`}
                  className="text-purple-600 hover:underline"
                >
                  /products/{createSlug(product.name)}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Link
            href="/products"
            className="text-purple-600 hover:underline"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}