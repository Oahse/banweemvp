import React from 'react';
import ProductForm from '../../components/admin/ProductForm';

const CreateProduct: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductForm mode="create" />
    </div>
  );
};

export default CreateProduct;
