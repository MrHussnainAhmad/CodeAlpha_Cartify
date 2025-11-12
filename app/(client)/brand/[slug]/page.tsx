import React from 'react';
import Container from '@/components/common/Container';
import DynamicBreadcrumb from '@/components/common/DynamicBreadcrumb';
import { getAllProducts, getCategories, getAllBrands } from '@/lib/api';
import ShopPageClient from '../../shop/ShopPageClient';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface BrandPageProps {
  params: {
    slug: string;
  };
}

const BrandPage = async ({ params }: BrandPageProps) => {
  const { slug } = await params;

  try {
    const [products, categories, brands] = await Promise.all([
      getAllProducts(),
      getCategories(),
      getAllBrands(),
    ]);

    // Find the brand by slug
    const brand = brands.find(
      (b: any) => b.slug === slug || b.slug?.current === slug
    );

    if (!brand) {
      notFound();
    }

    // Filter products to only show products from this brand
    const brandProducts = products.filter(
      (product: any) => product.brand?._id === brand._id
    );

    return (
      <Container className="py-4">
        <DynamicBreadcrumb 
          items={[
            { label: 'Shop', href: '/shop' },
            { label: 'Brands', href: '/shop' },
            { label: brand.name }
          ]} 
        />
        
        {/* Brand Header */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-6">
            {/* Brand Logo */}
            {(brand.logo || brand.logoUrl) && (
              <div className="flex-shrink-0">
                <div className="w-24 h-24 relative bg-gray-100 rounded-lg flex items-center justify-center p-4">
                  <Image
                    src={brand.logo || brand.logoUrl}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
            
            {/* Brand Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {brand.name}
              </h1>
              {brand.description && (
                <p className="text-gray-600 mb-3">{brand.description}</p>
              )}
              <p className="text-sm text-gray-500 mb-3">
                {brandProducts.length} {brandProducts.length === 1 ? 'product' : 'products'} available
              </p>
              
              {/* Brand Voucher */}
              {brand.voucher && brand.voucher.name && brand.voucher.value && (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="font-semibold">
                    Use code <span className="font-mono bg-white px-2 py-0.5 rounded">{brand.voucher.name}</span> for {brand.voucher.value}% off
                  </span>
                </div>
              )}
              
              {/* Brand Website */}
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2"
                >
                  Visit website
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <ShopPageClient 
          initialProducts={brandProducts || []}
          initialCategories={categories || []}
          initialBrands={brands || []}
          preSelectedBrandSlug={slug}
        />
      </Container>
    );
  } catch (error) {
    console.error('Error loading brand page:', error);
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg text-red-600">
            Error loading brand. Please try again later.
          </div>
        </div>
      </Container>
    );
  }
};

export default BrandPage;

// Generate static params for all brands (optional, for static optimization)
export async function generateStaticParams() {
  try {
    const brands = await getAllBrands();
    
    return brands.map((brand: any) => ({
      slug: brand.slug?.current || brand.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for brands:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;
  
  try {
    const brands = await getAllBrands();
    const brand = brands.find(
      (b: any) => b.slug === slug || b.slug?.current === slug
    );

    if (!brand) {
      return {
        title: 'Brand Not Found',
      };
    }

    return {
      title: `${brand.name} Products | Shop`,
      description: brand.description || `Shop all ${brand.name} products`,
    };
  } catch (error) {
    return {
      title: 'Brand',
    };
  }
}
