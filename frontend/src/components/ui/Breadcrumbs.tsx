import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { Text } from '@/components/ui/Text/Text';



const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRightIcon size={16} className="mx-2 text-copy-lighter" />
            )}
            {item.link ? (
              <Link to={item.link} className="text-copy-lighter hover:text-primary">
                <Text as="span">{item.label}</Text>
              </Link>
            ) : (
              <Text as="span" className="text-main">{item.label}</Text>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;