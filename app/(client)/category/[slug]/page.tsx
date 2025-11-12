import React from 'react';
import Container from '@/components/common/Container';
import DynamicBreadcrumb from '@/components/common/DynamicBreadcrumb';
import { getAllProducts, getCategories, getAllBrands } from '@/lib/api';
import ShopPageClient from '../../shop/ShopPageClient';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  try {
    const [products, categories, brands] = await Promise.all([
      getAllProducts(),
      getCategories(),
      getAllBrands(),
    ]);

    // Find the category by slug
    const category = categories.find(
      (cat: any) => cat.slug === slug || cat.slug?.current === slug
    );

    if (!category) {
      notFound();
    }

    // Filter products to only show products from this category
    const categoryProducts = products.filter(
      (product: any) => product.category?._id === category._id
    );

    return (
      <Container className="py-4">
        <DynamicBreadcrumb 
          items={[
            { label: 'Shop', href: '/shop' },
            { label: category.name }
          ]} 
        />
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 mt-2">{category.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        <ShopPageClient 
          initialProducts={categoryProducts || []}
          initialCategories={categories || []}
          initialBrands={brands || []}
          preSelectedCategorySlug={slug}
        />
      </Container>
    );
  } catch (error) {
    console.error('Error loading category page:', error);
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg text-red-600">
            Error loading category. Please try again later.
          </div>
        </div>
      </Container>
    );
  }
};

export default CategoryPage;

// Generate static params for all categories (optional, for static optimization)
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    
    return categories.map((category: any) => ({
      slug: category.slug?.current || category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  try {
    const categories = await getCategories();
    const category = categories.find(
      (cat: any) => cat.slug === slug || cat.slug?.current === slug
    );

    if (!category) {
      return {
        title: 'Category Not Found',
      };
    }

    return {
      title: `${category.name} | Shop`,
      description: category.description || `Shop all ${category.name} products`,
    };
  } catch (error) {
    return {
      title: 'Category',
    };
  }
}
