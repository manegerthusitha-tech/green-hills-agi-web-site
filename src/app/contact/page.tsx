"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, MessageCircle, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Export Inquiry",
    company: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "Export Inquiry",
        company: "",
        message: ""
      });
      // Clear success state after 6 seconds
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or email us directly at info@greenhillsagri.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const waUrl = "https://wa.me/94774652552?text=" + encodeURIComponent("Hello Green Hills Agriculture, I'm interested in making an inquiry about your products.");

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24">
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-20 px-4 md:px-6">
        <div className="container mx-auto mt-8">
          <SectionHeading
            title="Get In Touch"
            subtitle="Whether you are looking for export partnerships, wholesale supply, or general inquiries, our team is ready to assist you."
            light
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-6 -mt-10 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Contact Details & Map & Hours */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Details Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-border p-8">
              <h3 className="font-outfit text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Head Office & Farms</h4>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      Manuwangama/E,<br />Chilaw, Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <p className="text-muted-foreground mt-1 text-sm">+94 77 465 2552</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground mt-1 text-sm break-all">info@greenhillsagri.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-border p-8">
              <h3 className="font-outfit text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Business Hours
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-semibold text-foreground">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-semibold text-foreground">8:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday & Holidays</span>
                  <span className="font-semibold text-primary">Closed</span>
                </div>
              </div>
            </div>

            {/* OpenStreetMap Embed */}
            <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden h-[300px] relative">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.7700%2C7.5500%2C79.8200%2C7.6000&amp;layer=mapnik&amp;marker=7.5760%2C79.7952"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Green Hills Location (Chilaw, Sri Lanka)"
              ></iframe>
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-muted-foreground z-10">
                <a href="https://www.openstreetmap.org/#map=14/7.5760/79.7952" target="_blank" rel="noopener noreferrer" className="hover:underline">View Larger Map</a>
              </div>
            </div>
          </div>

          {/* Inquiry Forms */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-border p-8 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="font-outfit text-2xl md:text-3xl font-bold">Send an Inquiry</h3>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all shadow-sm max-w-max self-start sm:self-auto"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Inquiry
              </a>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-8 bg-green-50/50 rounded-2xl border border-green-100 text-center my-12"
                >
                  <CheckCircle2 className="w-16 h-16 text-primary mb-4 animate-bounce" />
                  <h4 className="font-outfit text-2xl font-bold text-foreground mb-2">Inquiry Submitted Successfully!</h4>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Thank you for reaching out to Green Hills Agriculture. Our exports and partnerships team will review your message and respond within 24 business hours.
                  </p>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-foreground uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 bg-muted/30 border ${errors.name ? 'border-red-500' : 'border-border'} rounded-xl focus:outline-none focus:border-primary text-sm transition-all`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-foreground uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 bg-muted/30 border ${errors.email ? 'border-red-500' : 'border-border'} rounded-xl focus:outline-none focus:border-primary text-sm transition-all`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-semibold text-foreground uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 bg-muted/30 border ${errors.phone ? 'border-red-500' : 'border-border'} rounded-xl focus:outline-none focus:border-primary text-sm transition-all`}
                        placeholder="+94 77 465 2552"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Inquiry Type */}
                    <div className="space-y-2">
                      <label htmlFor="inquiryType" className="text-xs font-semibold text-foreground uppercase tracking-wider">Inquiry Type *</label>
                      <select
                        id="inquiryType"
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-foreground transition-all"
                      >
                        <option>Export Inquiry</option>
                        <option>Wholesale Inquiry</option>
                        <option>Retail Supply</option>
                        <option>Partnership</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-xs font-semibold text-foreground uppercase tracking-wider">Company Name (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:border-primary text-sm transition-all"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-foreground uppercase tracking-wider">Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 bg-muted/30 border ${errors.message ? 'border-red-500' : 'border-border'} rounded-xl focus:outline-none focus:border-primary text-sm resize-none transition-all`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Error */}
                  {submitError && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p>{submitError}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base h-14 rounded-full font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5" />
                        Submit Inquiry
                      </>
                    )}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
