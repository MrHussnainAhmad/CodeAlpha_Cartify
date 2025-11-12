"use client";

import { FEATURED_PRODUCTSResult } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import AddToCart from "./AddToCart";

// Flexible product type for ProductCard
type ProductCardProduct = {
  _id: string;
  name: string;
  slug: string | { current: string }; // Support both MongoDB (string) and Sanity (object) formats
  description?: string;
  images?: any[];
  originalPrice: number;
  discount?: number;
  sku: string;
  stock: number;
  status?: string;
  variant?: string;
  category?: {
    _id: string;
    name: string;
    slug: string | { current: string };
  };
  brand?: {
    _id: string;
    name: string;
    slug: string | { current: string };
  };
  featured?: boolean;
  customAttributes?: any[];
  tags?: string[];
  couponCode?: {
    code: string;
    discount: number;
  };
  isOnDeal?: boolean;
  dealPercentage?: number;
};

type ProductCardProps = {
  product?: FEATURED_PRODUTSResult[0]; // For backward compatibility
  // New flexible props for direct product data
  _id?: string;
  name?: string;
  slug?: string | { current: string }; // Support both formats
  description?: string;
  images?: any[];
  originalPrice?: number;
  discount?: number;
  sku?: string;
  stock?: number;
  status?: string;
  variant?: string;
  category?: {
    _id: string;
    name: string;
    slug: string | { current: string };
  };
  brand?: {
    _id: string;
    name: string;
    slug: string | { current: string };
  };
  featured?: boolean;
  customAttributes?: any[];
  tags?: string[];
  couponCode?: {
    code: string;
    discount: number;
  };
  isOnDeal?: boolean;
  dealPercentage?: number;
};

const ProductCard = ({ product, ...directProps }: ProductCardProps) => {
  // Create product object from either product prop or direct props
  const productData: ProductCardProduct = product || {
    _id: directProps._id || '',
    name: directProps.name || '',
    slug: directProps.slug || '',
    description: directProps.description,
    images: directProps.images,
    originalPrice: directProps.originalPrice || 0,
    discount: directProps.discount,
    sku: directProps.sku || '',
    stock: directProps.stock || 0,
    status: directProps.status,
    variant: directProps.variant,
    category: directProps.category,
    brand: directProps.brand,
    featured: directProps.featured,
    customAttributes: directProps.customAttributes,
    tags: directProps.tags,
    couponCode: directProps.couponCode,
    isOnDeal: directProps.isOnDeal,
    dealPercentage: directProps.dealPercentage,
  };

  // Manage quantity controls visibility
  const [quantityControlsVisible, setQuantityControlsVisible] = useState(false);

  // Get image URL from Cloudinary
  const getImageUrl = () => {
    if (productData?.images && productData.images.length > 0) {
      // Images are direct URLs from Cloudinary
      return productData.images[0];
    }
    return null;
  };

  const imageUrl = getImageUrl();
  
  // Helper function to get slug string (handles both MongoDB string and Sanity object formats)
  const getSlugString = (slug: string | { current: string } | undefined): string => {
    if (!slug) return '';
    if (typeof slug === 'string') return slug;
    return slug.current || '';
  };
  
  const slugString = getSlugString(productData?.slug);

  // Calculate price with proper discount logic
  const calculatePrice = () => {
    const originalPrice = productData?.originalPrice || 0;
    
    // First apply regular discount if any
    const regularDiscount = productData?.discount || 0;
    let price = originalPrice - (originalPrice * regularDiscount / 100);
    
    // If product is on deal, apply deal discount on top of regular discount (compound)
    if (productData?.isOnDeal && productData?.dealPercentage && productData.dealPercentage > 0) {
      price = price - (price * productData.dealPercentage / 100);
    }
    
    return price;
  };
  
  const actualPrice = calculatePrice();
  
  // Calculate total discount for display
  const totalDiscountAmount = productData?.originalPrice ? productData.originalPrice - actualPrice : 0;
  const showDiscount = totalDiscountAmount > 0;
  
  // Get combined discount percentage for badge display
  const getCombinedDiscountText = () => {
    if (productData?.isOnDeal && productData?.dealPercentage) {
      if (productData?.discount && productData.discount > 0) {
        // Both discounts apply
        return `${productData.discount}% + ${productData.dealPercentage}% DEAL`;
      }
      return `${productData.dealPercentage}% DEAL`;
    }
    return productData?.discount ? `${productData.discount}%` : '';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        {/* Deal Badge - Priority for deal products */}
        {productData?.isOnDeal && productData?.dealPercentage && productData.dealPercentage > 0 && (
          <div className="absolute top-2.5 -left-2.5 bg-red-600 text-white px-4 py-1 text-xs font-semibold rounded-full z-10">
            {getCombinedDiscountText()} OFF
          </div>
        )}
        
        {/* Regular Discount Badge - Only show if not on deal and discount exists */}
        {!productData?.isOnDeal && showDiscount && (
          <div className="absolute top-2.5 -left-2.5 bg-purple-600 text-white px-4 py-1 text-xs font-semibold rounded-full z-10">
            Save: ${totalDiscountAmount.toFixed(0)} (-{getCombinedDiscountText()})
          </div>
        )}
        
        {/* Product Image */}
        <Link href={`/product/${slugString}`} className="block">
          <div className="aspect-square overflow-hidden bg-gray-50">
            <img
              src={imageUrl || '/placeholder-product.jpg'}
              alt={productData?.name || "Product image"}
              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      <div className="p-4">
        {/* Category */}
        {!quantityControlsVisible && (
          <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
            {productData?.category?.name ?? 'General'}
          </p>
        )}

        {/* Product Name - Single line with ellipsis */}
        <Link href={`/product/${slugString}`}>
          <h3 className="font-medium text-gray-900 text-sm mb-2 truncate hover:text-blue-600 transition-colors">
            {productData?.name || 'Unnamed Product'}
          </h3>
        </Link>


        {/* Stock Status */}
        {!quantityControlsVisible && (
          <div className="mb-3">
            {productData?.stock === 0 ? (
              <span className="text-red-600 text-xs font-medium">Out of Stock</span>
            ) : productData?.stock && productData.stock > 0 ? (
              <span className="text-green-600 text-xs font-medium">
                {productData.stock < 10 ? `Only ${productData.stock} left` : 'In Stock'}
              </span>
            ) : (
              <span className="text-gray-600 text-xs">Stock info unavailable</span>
            )}
          </div>
        )}

        {/* Price */}
        {productData?.originalPrice && productData.originalPrice > 0 && (
          <div className="flex items-baseline gap-2 mb-3">
            <span className={`text-xl font-semibold ${
              productData?.isOnDeal ? 'text-red-600' : 'text-orange-600'
            }`}>
              ${actualPrice.toFixed(2)}
            </span>
            {showDiscount && productData.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${productData.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Component */}
        <AddToCart 
          product={product || productData} 
          variant="compact" 
          onQuantityControlsToggle={setQuantityControlsVisible} 
        />
      </div>
    </div>
  );
};

export default ProductCard;
export { ProductCard };
