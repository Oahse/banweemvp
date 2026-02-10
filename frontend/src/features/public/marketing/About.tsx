import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Amara Okafor',
      position: 'Founder & CEO',
      bio: 'Amara founded Banwee with a vision to connect African producers with global markets while ensuring fair compensation and sustainable practices.',
      image: 'https://randomuser.me/portraits/women/23.jpg',
    },
    {
      name: 'David Mensah',
      position: 'Chief Operating Officer',
      bio: 'David oversees day-to-day operations and our partnerships with producer cooperatives across Africa.',
      image: 'https://randomuser.me/portraits/men/32.jpg',
    },
    {
      name: 'Fatima Diallo',
      position: 'Head of Sustainability',
      bio: 'Fatima ensures that all our products and practices meet the highest standards of environmental and social responsibility.',
      image: 'https://randomuser.me/portraits/women/65.jpg',
    },
    {
      name: 'Michael Osei',
      position: 'Product Director',
      bio: 'Michael leads our product curation team, discovering exceptional African products and bringing them to our customers.',
      image: 'https://randomuser.me/portraits/men/67.jpg',
    },
  ];

  // Values data
  const values = [
    { title: 'Quality', description: 'We curate only the finest products that meet our rigorous standards for excellence.' },
    { title: 'Sustainability', description: 'Environmental stewardship guides every decision we make, from sourcing to packaging.' },
    { title: 'Fair Trade', description: 'We ensure producers receive fair compensation and work in safe, ethical conditions.' },
    { title: 'Transparency', description: 'We share the complete story behind each product, from origin to impact.' },
    { title: 'Community', description: 'We invest in the communities we work with through education and infrastructure.' },
    { title: 'Innovation', description: 'We continuously seek new ways to showcase African excellence to the world.' },
  ];

  return (
    <motion.div 
      className="container mx-auto px-4 py-6 text-copy"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Breadcrumb */}
      <motion.nav className="flex mb-4" variants={itemVariants}>
        <Text variant="caption" tone="secondary">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
        </Text>
        <ChevronRightIcon size={12} className="mx-1" />
        <Text variant="caption">About Us</Text>
      </motion.nav>

      {/* Hero Section */}
      <motion.div className="relative mb-6" variants={itemVariants}>
        <div className="h-[150px] md:h-[200px] w-full rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1595356161904-6708c97be89c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="African farmers working in a field"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <Heading level={5} weight="semibold" className="text-lg md:text-xl mb-2">Our Story</Heading>
              <Text variant="body-sm" className="text-white/90 text-sm">
                Connecting African producers with global markets through ethical, sustainable, and transparent trade.
              </Text>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div className="max-w-4xl mx-auto mb-6" variants={itemVariants}>
        <div className="text-center mb-4">
          <Heading level={5} weight="semibold" className="text-base md:text-lg mb-2">Our Mission & Vision</Heading>
          <div className="w-12 h-0.5 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <Heading level={5} weight="semibold" className="text-sm md:text-base mb-2 text-copy">Our Mission</Heading>
            <Text variant="body-sm" tone="secondary" className="mb-2 text-sm">
              Banwee exists to create sustainable economic opportunities for African producers by connecting them with
              global markets through ethical trade practices.
            </Text>
            <Text variant="body-sm" tone="secondary" className="text-sm">
              We provide fair pricing, transparent transactions, and direct access to international buyers, ensuring that
              producers receive the true value of their products.
            </Text>
          </div>
          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <Heading level={5} weight="semibold" className="text-sm md:text-base mb-2 text-copy">Our Vision</Heading>
            <Text variant="body-sm" tone="secondary" className="mb-2 text-sm">
              We envision a world where African products are recognized globally for their exceptional quality and where
              the people who create them prosper through fair and direct trade relationships.
            </Text>
            <Text variant="body-sm" tone="secondary" className="text-sm">
              We believe in a future where sustainability and profitability go hand in hand, creating lasting positive
              impact for all stakeholders.
            </Text>
          </div>
        </div>
      </motion.div>

      {/* Our Story */}
      <motion.div className="max-w-4xl mx-auto mb-6" variants={itemVariants}>
        <div className="text-center mb-4">
          <Heading level={5} weight="semibold" className="text-base md:text-lg mb-2">The Banwee Journey</Heading>
          <div className="w-12 h-0.5 bg-primary mx-auto"></div>
        </div>
        <div className="bg-surface p-4 rounded-lg shadow-sm space-y-4">
          <div>
            <Heading level={5} weight="semibold" className="text-sm md:text-base mb-2 text-copy">The Beginning</Heading>
            <Text variant="body-sm" tone="secondary" className="mb-2 text-sm">
              Banwee began in 2019 when our founder, Amara Okafor, returned to her ancestral home in Ghana and
              witnessed the incredible quality of local products that struggled to reach international markets.
            </Text>
            <Text variant="body-sm" tone="secondary" className="text-sm">
              Determined to make a difference, she started building connections between local producers and
              international buyers, focusing on transparency and fair trade.
            </Text>
          </div>
          <div>
            <Heading level={5} weight="semibold" className="text-sm md:text-base mb-2 text-copy">Growth & Impact</Heading>
            <Text variant="body-sm" tone="secondary" className="mb-2 text-sm">
              What started with a single cooperative of women producing shea butter has grown into partnerships with
              over 25 producer groups across 8 African countries. Today, Banwee offers a diverse range of products,
              from gourmet foods to skincare to home goods.
            </Text>
            <Text variant="body-sm" tone="secondary" className="text-sm">
              Along the way, we&apos;ve remained committed to our core values of fair trade, sustainability, and
              transparency, ensuring that every product tells a story of empowerment and quality.
            </Text>
          </div>
          <div>
            <Heading level={5} weight="semibold" className="text-sm md:text-base mb-2 text-copy">Looking Forward</Heading>
            <Text variant="body-sm" tone="secondary" className="mb-2 text-sm">
              As we continue to grow, we&apos;re expanding our impact through educational initiatives, infrastructure
              development, and increased market access for our producer partners.
            </Text>
            <Text variant="body-sm" tone="secondary" className="text-sm">
              We&apos;re also innovating in sustainable packaging, carbon-neutral shipping, and digital traceability to
              ensure that our environmental footprint remains as positive as our social impact.
            </Text>
          </div>
        </div>
      </motion.div>

      {/* Our Values */}
      <motion.div className="max-w-4xl mx-auto mb-6" variants={itemVariants}>
        <div className="text-center mb-4">
          <Heading level={5} weight="semibold" className="text-base md:text-lg mb-2">Our Values</Heading>
          <div className="w-12 h-0.5 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {values.map((value, index) => (
            <div key={index} className="flex gap-3 bg-surface p-3 rounded-lg">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckIcon size={12} className="text-primary" />
                </div>
              </div>
              <div>
                <Text variant="body-sm" weight="bold" className="text-sm text-copy">{value.title}</Text>
                <Text variant="body-sm" tone="secondary" className="text-sm">{value.description}</Text>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Our Team */}
      <motion.div className="max-w-4xl mx-auto mb-6" variants={itemVariants}>
        <div className="text-center mb-4">
          <Heading level={5} weight="semibold" className="text-base md:text-lg mb-2">Meet Our Team</Heading>
          <div className="w-12 h-0.5 bg-primary mx-auto mb-2"></div>
          <Text variant="body-sm" tone="secondary" className="max-w-2xl mx-auto text-sm">
            Our diverse team brings together expertise in sustainable development, international trade, product
            curation, and community building.
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-surface rounded-lg shadow-sm overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-1/3 h-32 sm:h-auto">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 sm:w-2/3 flex flex-col justify-center">
                <Text variant="body-sm" weight="bold" className="text-sm text-copy">{member.name}</Text>
                <Text variant="caption" tone="primary" weight="medium" className="text-sm mb-1">{member.position}</Text>
                <Text variant="body-sm" tone="secondary" className="text-sm">{member.bio}</Text>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Impact Stats */}
      <motion.div className="bg-primary/10 py-6 mb-6 rounded-lg" variants={itemVariants}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-4">
            <Heading level={5} weight="semibold" className="text-base md:text-lg mb-2">Our Impact</Heading>
            <div className="w-12 h-0.5 bg-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/50 rounded-lg p-3">
              <Text variant="body-lg" weight="semibold" tone="primary" className="text-lg md:text-xl">1,000+</Text>
              <Text variant="caption" weight="medium" className="text-sm text-copy-light">Producers Supported</Text>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <Text variant="body-lg" weight="semibold" tone="primary" className="text-lg md:text-xl">8</Text>
              <Text variant="caption" weight="medium" className="text-sm text-copy-light">African Countries</Text>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <Text variant="body-lg" weight="semibold" tone="primary" className="text-lg md:text-xl">12</Text>
              <Text variant="caption" weight="medium" className="text-sm text-copy-light">Community Projects</Text>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;