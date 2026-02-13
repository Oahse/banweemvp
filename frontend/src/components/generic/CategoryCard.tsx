
import { Link } from 'react-router-dom';
import { Heading, Body, Label } from '@/components/ui/Text/Text';

export const CategoryCard = ({ category }) => {
  return (
    <Link to={category.path} className="block group">
      <div className="bg-surface rounded-lg overflow-hidden shadow-sm border border-border-light transition-shadow hover:shadow-md">
        <div className="relative h-40">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <Label className="font-medium group-hover:text-primary transition-colors">
            {category.name}
          </Label>
          {category.count !== undefined && category.count > 0 && (
            <Body tone="secondary">{category.count} items</Body>
          )}
        </div>
      </div>
    </Link>
  );
};