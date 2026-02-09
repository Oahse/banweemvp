import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, PlusIcon, MinusIcon, SearchIcon } from 'lucide-react';
import { categories, faqItems } from '../../../data/faq';
import { Button } from '@/components/ui/Button';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestions, setOpenQuestions] = useState([]);

  // Toggle question open/closed
  const toggleQuestion = (id) => {
    if (openQuestions.includes(id)) {
      setOpenQuestions(openQuestions.filter((qId) => qId !== id));
    } else {
      setOpenQuestions([...openQuestions, id]);
    }
  };

  // Filter questions based on search term and active category
  const filteredQuestions = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      className="container mx-auto px-4 py-6 text-copy"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Breadcrumb */}
      <motion.nav className="flex mb-4 text-xs" variants={itemVariants}>
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={12} className="mx-1" />
        <span className="text-copy">Frequently Asked Questions</span>
      </motion.nav>

      <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
        <div className="text-center mb-6">
          <h1 className="text-base md:text-lg font-semibold text-copy mb-2">Frequently Asked Questions</h1>
          <p className="text-xs text-copy-light max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more. Can't find what you're
            looking for? Contact our support team.
          </p>
        </div>

        {/* Search bar */}
        <motion.div className="mb-4" variants={itemVariants}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full px-3 py-2 pl-9 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copy-lighter" />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div className="mb-4 overflow-x-auto" variants={itemVariants}>
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "primary" : "ghost"}
                size="sm"
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-copy hover:bg-border'
                }`}
                onClick={() => setActiveCategory(category.id)}>
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* FAQ items */}
        <motion.div className="space-y-2" variants={containerVariants}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item) => (
              <motion.div 
                key={item.id} 
                className="bg-surface rounded-lg shadow-sm border border-border-light overflow-hidden"
                variants={itemVariants}
              >
                <Button
                  className="flex justify-between items-center w-full p-3 text-left"
                  onClick={() => toggleQuestion(item.id)}
                  variant="ghost"
                  size="sm"
                >
                  <h3 className="text-sm font-medium text-copy">{item.question}</h3>
                  {openQuestions.includes(item.id) ? (
                    <MinusIcon size={14} className="text-primary flex-shrink-0" />
                  ) : (
                    <PlusIcon size={14} className="text-primary flex-shrink-0" />
                  )}
                </Button>
                <AnimatePresence>
                  {openQuestions.includes(item.id) && (
                    <motion.div 
                      className="px-3 pb-3"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="pt-2 border-t border-border-light">
                        <p className="text-xs text-copy-light mt-2">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 bg-surface rounded-lg shadow-sm">
              <div className="mx-auto w-12 h-12 bg-background rounded-full flex items-center justify-center mb-3">
                <SearchIcon size={16} className="text-copy-lighter" />
              </div>
              <h3 className="text-sm font-medium text-copy mb-1">No results found</h3>
              <p className="text-xs text-copy-light">
                Try adjusting your search or filter to find what you're looking for
              </p>
            </div>
          )}
        </motion.div>

        {/* Contact section */}
        <motion.div className="mt-8 bg-primary/10 rounded-lg p-4 text-center" variants={itemVariants}>
          <h2 className="text-sm font-semibold text-copy mb-2">Still have questions?</h2>
          <p className="text-xs text-copy-light mb-3 max-w-md mx-auto">
            If you couldn't find the answer you were looking for, our support team is here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors text-sm">
            Contact Support
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;