"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import apiClient from "@/lib/apiClient";
import { Mail, MapPin, Phone } from "lucide-react";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await apiClient.post("/contact", data);
      setIsSubmitted(true);
      reset();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-text" />
          </div>
          <h1 className="text-2xl font-bold text-text mb-2">Message Sent!</h1>
          <p className="text-text-secondary mb-6">
            Thank you for contacting us. We&apos;ll get back to you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="w-full">
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text mb-4">Get in Touch</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Have questions about HubAssist? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-text mb-6">Send us a message</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-text mb-2">
                  Full Name *
                </label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                  error={errors.fullName?.message}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                  error={errors.email?.message}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="What is this about?"
                  error={errors.subject?.message}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                />
                {errors.message?.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-mint rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">Email</h3>
                    <p className="text-text-secondary">support@hubassist.com</p>
                    <p className="text-text-secondary">hello@hubassist.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-lavender rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">Phone</h3>
                    <p className="text-text-secondary">+1 (555) 123-4567</p>
                    <p className="text-text-secondary">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">Address</h3>
                    <p className="text-text-secondary">
                      123 Innovation Drive<br />
                      Tech Hub, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-text mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-text mb-1">How quickly do you respond?</h4>
                  <p className="text-sm text-text-secondary">We typically respond to all inquiries within 24 hours during business days.</p>
                </div>
                <div>
                  <h4 className="font-medium text-text mb-1">Do you offer demos?</h4>
                  <p className="text-sm text-text-secondary">Yes! We&apos;d be happy to show you HubAssist in action. Mention &quot;demo&quot; in your message.</p>
                </div>
                <div>
                  <h4 className="font-medium text-text mb-1">Need technical support?</h4>
                  <p className="text-sm text-text-secondary">For existing customers, please include your account details for faster assistance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}