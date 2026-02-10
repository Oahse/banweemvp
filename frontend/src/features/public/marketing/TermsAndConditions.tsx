
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
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

export const TermsAndConditions = () => {
  return (
    <motion.div 
      className="container mx-auto px-4 py-8 text-copy"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Breadcrumb */}
      <motion.nav className="flex mb-6 text-sm" variants={itemVariants}>
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <Text className="text-copy">Terms & Conditions</Text>
      </motion.nav>

      <motion.div className="max-w-4xl mx-auto bg-surface p-8 rounded-lg shadow-sm" variants={itemVariants}>
        <Heading level={5} className="text-3xl font-bold text-main mb-6">Terms & Conditions</Heading>

        <section className="mb-8">
          <Heading level={5} className="text-2xl font-semibold text-main mb-4">1. Introduction</Heading>
          <Body className="text-copy-light mb-4">
            Welcome to Banwee. These Terms and Conditions govern your use of our website and the purchase of any
            products from us. By accessing or using our website, you agree to be bound by these Terms and Conditions
            and our Privacy Policy.
          </Body>
          <Body className="text-copy-light">
            Please read these Terms carefully before using our services. If you do not agree with any part of these
            Terms, you must not use our website.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={5} className="text-2xl font-semibold text-main mb-4">2. Intellectual Property</Heading>
          <Body className="text-copy-light mb-4">
            All content on this website, including text, graphics, logos, images, and software, is the property of
            Banwee or its content suppliers and is protected by international copyright laws.
          </Body>
          <Body className="text-copy-light">
            You may not reproduce, distribute, modify, display, or create derivative works from any content on this
            website without our prior written consent.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={5} className="text-2xl font-semibold text-main mb-4">3. Product Information</Heading>
          <Body className="text-copy-light mb-4">
            We strive to ensure that all product descriptions, images, and prices displayed on our website are
            accurate. However, we do not guarantee that they are error-free, complete, or current. We reserve the
            right to correct any errors, inaccuracies, or omissions and to change or update information at any time
            without prior notice.
          </Body>
          <Body className="text-copy-light">
            All products are subject to availability, and we cannot guarantee that items will be in stock.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={5} className="text-2xl font-semibold text-main mb-4">4. Orders and Payments</Heading>
          <Body className="text-copy-light mb-4">
            By placing an order through our website, you warrant that you are legally capable of entering into binding
            contracts. All orders are subject to acceptance by us. We will confirm acceptance by sending you an email
            confirming that the product has been dispatched.
          </Body>
          <Body className="text-copy-light">
            Payment must be made in full before dispatch of products. We accept various payment methods as indicated
            on our website. Prices are subject to change without notice.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={5} className="text-2xl font-semibold text-main mb-4">5. Shipping and Delivery</Heading>
          <Body className="text-copy-light mb-4">
            We aim to dispatch products within the estimated delivery times. However, delivery times are estimates
            only and we are not responsible for any delays caused by third-party shipping carriers.
          </Body>
          <Body className="text-copy-light">
            Risk of loss and title for items purchased from us pass to you upon our delivery to the carrier.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={5} className="text-2xl font-semibold text-main mb-4">6. Returns and Refunds</Heading>
          <Body className="text-copy-light mb-4">
            Our returns and refunds policy is detailed separately on our website. Please refer to that policy for
            information on how to return products and receive refunds.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={5} className="text-2xl font-semibold text-main mb-4">7. Limitation of Liability</Heading>
          <Body className="text-copy-light mb-4">
            To the fullest extent permitted by law, Banwee shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your
            access to or use of or inability to access or use the website; (b) any conduct or content of any third
            party on the website; (c) any content obtained from the website; and (d) unauthorized access, use or
            alteration of your transmissions or data.
          </Body>
          <Body className="text-copy-light mb-4">
            based on warranty, contract, tort (including
            negligence) or any other legal theory, whether or not we have been informed of the possibility of such
            damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={5} className="text-2xl font-semibold text-main mb-4">8. Governing Law</Heading>
          <Body className="text-copy-light mb-4">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your
            Country/State], without regard to its conflict of law provisions.
          </Body>
        </section>

        <section>
          <Heading level={5} className="text-2xl font-semibold text-main mb-4">9. Changes to Terms</Heading>
          <Body className="text-copy-light mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
            is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </Body>
          <Body className="text-copy-light">
            By continuing to access or use our website after any revisions become effective, you agree to be
            bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the website.
          </Body>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default TermsAndConditions;