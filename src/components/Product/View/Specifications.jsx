import React from "react";

const Specifications = ({ product }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Product Specifications</h2>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(product.specs).map(([key, value]) => (
          <div key={key} className="border-b py-2">
            <dt className="font-medium text-gray-600">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </dt>
            <dd className="text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Specifications;
