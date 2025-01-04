import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Calendar,
  MapPin,
  Car,
  Wallet,
  Shield,
  Users,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Lottie from "lottie-react";
import contactAnimation from "../assets/lottie/contact-animation.json";
import Loader from '../Components/Loader';

const Help = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState({
    status: 'idle',
    message: 'Send Message'
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Add this effect to simulate initial loading
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds
  }, []);

  useEffect(() => {
    if (submitStatus.status === 'success' || submitStatus.status === 'error') {
      const timer = setTimeout(() => {
        setSubmitStatus({ status: 'idle', message: 'Send Message' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ status: 'submitting', message: 'Sending...' });
    
    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSubmitStatus({ status: 'success', message: 'Sent!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ status: 'error', message: 'Not Sent' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ status: 'error', message: 'Not Sent' });
    }
  };

  const getButtonStyles = () => {
    const baseStyles = "w-full px-8 py-4 rounded-lg transition-colors";
    switch (submitStatus.status) {
      case 'success':
        return `${baseStyles} bg-green-500 text-white hover:bg-green-600`;
      case 'error':
        return `${baseStyles} bg-red-500 text-white hover:bg-red-600`;
      default:
        return `${baseStyles} bg-black text-white hover:bg-gray-800`;
    }
  };

  // Rest of the component remains the same
  const faqCategories = [
    {
      title: "Vehicle Rental",
      icon: Car,
      questions: [
        {
          q: "How do I rent a vehicle?",
          a: "Simply select your location, date, and time, then browse available vehicles. Choose your preferred vehicle and complete the booking process.",
        },
        {
          q: "What documents do I need?",
          a: "You'll need a valid driver's license, proof of insurance, and a credit card for the security deposit.",
        },
        {
          q: "Can I modify my booking?",
          a: "Yes, you can modify your booking up to 24 hours before the pickup time.",
        },
        {
          q: "Is there a minimum rental period?",
          a: "Our minimum rental period is 24 hours. For shorter durations, please contact our support team.",
        },
      ],
    },
    {
      title: "Payments",
      icon: Wallet,
      questions: [
        {
          q: "What payment methods are accepted?",
          a: "We accept all major credit cards, debit cards, and digital wallets.",
        },
        {
          q: "How is the security deposit handled?",
          a: "A hold is placed on your card and released after the vehicle is returned in good condition.",
        },
        {
          q: "Do you offer refunds?",
          a: "Full refunds are available for cancellations made 48 hours before pickup time.",
        },
      ],
    },
    {
      title: "Safety & Insurance",
      icon: Shield,
      questions: [
        {
          q: "What insurance is included?",
          a: "Basic insurance is included with all rentals. Additional coverage options are available.",
        },
        {
          q: "How are vehicles verified?",
          a: "Each vehicle undergoes thorough mechanical inspection and safety checks.",
        },
        {
          q: "What happens in case of an accident?",
          a: "Contact emergency services if needed, then call our 24/7 support line for assistance.",
        },
      ],
    },
    {
      title: "Reservations",
      icon: Calendar,
      questions: [
        {
          q: "How far in advance should I book?",
          a: "We recommend booking at least 24 hours in advance to ensure vehicle availability.",
        },
        {
          q: "Can I extend my rental period?",
          a: "Yes, you can extend through the app or by contacting support, subject to availability.",
        },
        {
          q: "What is your cancellation policy?",
          a: "Free cancellation up to 48 hours before pickup, after that a fee may apply.",
        },
      ],
    },
    {
      title: "Account Management",
      icon: Users,
      questions: [
        {
          q: "How do I create an account?",
          a: "Sign up using your email or social media accounts and verify your driving credentials.",
        },
        {
          q: "Can I add multiple drivers?",
          a: "Yes, additional drivers can be added for a small fee after meeting our eligibility criteria.",
        },
      ],
    },
    {
      title: "Pickup & Return",
      icon: MapPin,
      questions: [
        {
          q: "Where can I pick up the vehicle?",
          a: "Vehicles can be picked up at our designated locations or delivered to your address.",
        },
        {
          q: "What is the fuel policy?",
          a: "Return the vehicle with the same fuel level as pickup to avoid additional charges.",
        },
      ],
    },
    {
      title: "Maintenance & Support",
      icon: Settings,
      questions: [
        {
          q: "What if the vehicle breaks down?",
          a: "24/7 roadside assistance is included with every rental.",
        },
        {
          q: "How do I report vehicle issues?",
          a: "Use our app to document and report any issues before starting your trip.",
        },
      ],
    },
  ];

  // Add this at the very beginning of your return statement
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="min-h-screen max-w-[1570px] mx-auto p-8 lg:p-16">
      <h1 className="text-5xl mb-12">
        Need help? We're here
        <br /> <span className="font-bold">to assist you</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-gray-100 rounded-lg p-8">
        <div>
          <Lottie
            animationData={contactAnimation}
            loop={true}
            className="w-full h-full"
          />
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>

          <div className="flex gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Phone className="text-gray-500" />
              <span>+91 8121744089</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" />
              <span>support.rentopia@co.in</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-lg border"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-lg border"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-4 rounded-lg border"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className={getButtonStyles()}
              disabled={submitStatus.status === 'submitting'}
            >
              {submitStatus.message}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10">
        <div className="space-y-6">
          {faqCategories.map((category, index) => (
            <div key={index} className="border rounded-lg p-6">
              <button
                className="w-full flex items-center justify-between"
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === index ? null : index
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <category.icon className="text-gray-500" />
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                </div>
                {expandedCategory === index ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedCategory === index && (
                <div className="mt-4 space-y-4">
                  {category.questions.map((item, qIndex) => (
                    <div key={qIndex} className="pl-9">
                      <h3 className="font-medium mb-2">{item.q}</h3>
                      <p className="text-gray-600">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Help;