
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

export const PrivacyPolicy = () => {
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
        <Text className="text-copy">Privacy Policy</Text>
      </motion.nav>

      <motion.div className="max-w-4xl mx-auto bg-surface p-8 rounded-lg shadow-sm" variants={itemVariants}>
        <Heading level={1} className="text-3xl font-bold text-main mb-6">Privacy Policy</Heading>

        <section className="mb-8">
          <Heading level={2} className="text-2xl font-semibold text-main mb-4">1. Introduction</Heading>
          <Body className="text-copy-light mb-4">
            Welcome to Banwee. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website [Your Website URL], including any other media form, media channel,
            mobile website, or mobile application related or connected thereto (collectively, the “Site”). Please
            read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do
            not access the Site.
          </Body>
          <Body className="text-copy-light">
            We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert
            you about any changes by updating the “Last Updated” date of this Privacy Policy. You are encouraged to
            periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made
            aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy
            Policy by your continued use of the Site after the date such revised Privacy Policy is posted.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={2} className="text-2xl font-semibold text-main mb-4">2. Collection of Your Information</Heading>
          <Body className="text-copy-light mb-4">
            We may collect information about you in a variety of ways. The information we may collect on the Site
            includes:
          </Body>
          <Heading level={3} className="text-xl font-medium text-main mb-2">Personal Data</Heading>
          <Body className="text-copy-light mb-4">
            Personally identifiable information, such as your name, shipping address, email address, and telephone
            number, and demographic information, such as your age, gender, hometown, and interests, that you
            voluntarily give to us when you register with the Site or when you choose to participate in various
            activities related to the Site, such as online chat and message boards.
          </Body>
          <Heading level={3} className="text-xl font-medium text-main mb-2">Derivative Data</Heading>
          <Body className="text-copy-light mb-4">
            Information our servers automatically collect when you access the Site, such as your IP address, your
            browser type, your operating system, your access times, and the pages you have viewed directly before
            and after accessing the Site.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={2} className="text-2xl font-semibold text-main mb-4">3. Use of Your Information</Heading>
          <Body className="text-copy-light mb-4">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized
            experience. Specifically, we may use information collected about you via the Site to:
          </Body>
          <ul className="list-disc list-inside text-copy-light mb-4 ml-4">
            <li>Create and manage your account.</li>
            <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site.</li>
            <li>Email you regarding your account or order.</li>
            <li>Enable user-to-user communications.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Generate a personal profile about you to make your visit to the Site more personalized.</li>
            <li>Increase the efficiency and operation of the Site.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          </ul>
        </section>

        <section className="mb-8">
          <Heading level={2} className="text-2xl font-semibold text-main mb-4">4. Disclosure of Your Information</Heading>
          <Body className="text-copy-light mb-4">
            We may share information we have collected about you in certain situations. Your information may be
            disclosed as follows:
          </Body>
          <Heading level={3} className="text-xl font-medium text-main mb-2">By Law or to Protect Rights</Heading>
          <Body className="text-copy-light mb-4">
            If we believe the release of information about you is necessary to respond to legal process, to investigate
            or remedy potential violations of our policies, or to protect the rights, property, and safety of others,
            we may share your information as permitted or required by any applicable law, rule, or regulation.
          </Body>
          <Heading level={3} className="text-xl font-medium text-main mb-2">Third-Party Service Providers</Heading>
          <Body className="text-copy-light mb-4">
            We may share your information with third parties that perform services for us or on our behalf, including
            data analysis, email delivery, hosting services, customer service, and marketing assistance.
          </Body>
        </section>

        <section className="mb-8">
          <Heading level={2} className="text-2xl font-semibold text-main mb-4">5. Security of Your Information</Heading>
          <Body className="text-copy-light mb-4">
            We use administrative, technical, and physical security measures to help protect your personal
            information. While we have taken reasonable steps to secure the personal information you provide to us,
            please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method
            of data transmission can be guaranteed against any interception or other type of misuse.
          </Body>
        </section>

        <section>
          <Heading level={2} className="text-2xl font-semibold text-main mb-4">6. Contact Us</Heading>
          <Body className="text-copy-light mb-4">
            If you have questions or comments about this Privacy Policy, please contact us at:
          </Body>
          <Body className="text-copy-light">
            Email: <a href="mailto:privacy@banwee.com" className="text-primary hover:underline">privacy@banwee.com</a>
          </Body>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;