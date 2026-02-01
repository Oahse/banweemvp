import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="p-8 text-center text-red-600">Product ID is required</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductForm productId={id} mode="edit" />
    </div>
  );
};

export default EditProduct;
