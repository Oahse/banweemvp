import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, MapPinIcon, PhoneIcon, MailIcon, ClockIcon, CheckCircleIcon, MessageCircle } from 'lucide-react';
import { Input } from '../../../../components/generic/Input';
import { Textarea } from '../../../../components/generic/Textarea';
import { Select } from '../../../../components/generic/Select';
import { ContactMessagesAPI } from '../../../../api/contact-messages';
import toast from 'react-hot-toast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await ContactMessagesAPI.create(formData);
      
      // Show success message
      setFormSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.response?.data?.detail || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'Product Inquiry', label: 'Product Inquiry' },
    { value: 'Order Status', label: 'Order Status' },
    { value: 'Shipping & Delivery', label: 'Shipping & Delivery' },
    { value: 'Returns & Refunds', label: 'Returns & Refunds' },
    { value: 'Subscription Box', label: 'Subscription Box' },
    { value: 'Partnership Opportunity', label: 'Partnership Opportunity' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 text-copy font-sans">
      {/* Breadcrumb */}
      <nav className="flex mb-4 text-xs">
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={12} className="mx-1" />
        <span className="text-copy">Contact Us</span>
      </nav>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-base md:text-lg font-semibold text-copy mb-2">Get In Touch</h1>
          <p className="text-xs text-copy-light max-w-2xl mx-auto">
            Have questions about our products, shipping, or anything else? We're here to help. Fill out the form
            below or contact us directly.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-copy mb-3">Contact Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/18002269333"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-lg border-2 border-primary bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-copy mb-0.5">
                    WhatsApp Support
                  </h4>
                  <p className="text-xs text-copy-light mb-1">
                    Get instant help via WhatsApp
                  </p>
                  <div className="text-xs text-copy-lighter space-y-0.5">
                    <div>24/7</div>
                    <div className="font-medium text-primary">
                      &lt; 2 minutes
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+12125551234"
              className={`p-3 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-copy mb-0.5">
                    Phone Support
                  </h4>
                  <p className="text-xs text-copy-light mb-1">
                    Speak directly with our team
                  </p>
                  <div className="text-xs text-copy-lighter space-y-0.5">
                    <div>9 AM - 9 PM EST</div>
                    <div className="font-medium text-primary">
                      Immediate
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:support@banwee.com"
              className={`p-3 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MailIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-copy mb-0.5">
                    Email Support
                  </h4>
                  <p className="text-xs text-copy-light mb-1">
                    Send us a detailed message
                  </p>
                  <div className="text-xs text-copy-lighter space-y-0.5">
                    <div>24/7</div>
                    <div className="font-medium text-primary">
                      &lt; 4 hours
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-surface rounded-lg shadow-sm p-3">
              <h2 className="text-sm font-semibold text-copy mb-3">Send Us a Message</h2>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <CheckCircleIcon size={24} className="text-green-500 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-green-800 mb-1">Message Sent!</h3>
                  <p className="text-xs text-green-700">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <Input
                      label="Your Name *"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Your Email *"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <Select
                      label="Subject *"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      options={subjectOptions}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <Textarea
                      label="Your Message *"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:w-1/3">
            <div className="bg-surface rounded-lg shadow-sm p-3 mb-4">
              <h2 className="text-sm font-semibold text-copy mb-3">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex">
                  <div className="mr-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <MapPinIcon size={14} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-copy mb-0.5">Our Location</h3>
                    <p className="text-xs text-copy-light">
                      1234 Fashion Street, Suite 567
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <PhoneIcon size={14} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-copy mb-0.5">Phone Number</h3>
                    <p className="text-xs text-copy-light">
                      Customer Service: (212) 555-1234
                      <br />
                      Wholesale Inquiries: (212) 555-5678
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <MailIcon size={14} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-copy mb-0.5">Email Address</h3>
                    <p className="text-xs text-copy-light">
                      Customer Support:{' '}
                      <a href="mailto:support@banwee.com" className="text-primary hover:underline">
                        support@banwee.com
                      </a>
                      <br />
                      Business Inquiries:{' '}
                      <a href="mailto:info@banwee.com" className="text-primary hover:underline">
                        info@banwee.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <ClockIcon size={14} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-copy mb-0.5">Working Hours</h3>
                    <p className="text-xs text-copy-light">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                      <br />
                      Saturday: 10:00 AM - 4:00 PM EST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ Link */}
            <div className="bg-primary/10 rounded-lg p-3">
              <h3 className="text-sm font-bold text-copy mb-1">Have a Question?</h3>
              <p className="text-xs text-copy-light mb-2">
                Check our frequently asked questions for quick answers to common inquiries.
              </p>
              <Link to="/faq" className="inline-block text-xs text-primary hover:underline font-medium">
                View FAQs
              </Link>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-6">
          <div className="bg-surface rounded-lg shadow-sm p-3">
            <h2 className="text-sm font-semibold text-copy mb-3">Find Us</h2>
            <div className="h-64 bg-border rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425872418978!3d40.74076097138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685290225594!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Banwee Store Location"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;