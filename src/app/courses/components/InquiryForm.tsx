"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";
import { sendInquiryEmail } from "@/app/actions/emailActions";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  fee: string;
  requirements: string;
  category: string;
  level: string;
  instructor: string;
  rating: number;
  students: number;
  image: string;
  awarding_body: string;
}

interface InquiryFormProps {
  course: Course;
  onClose: () => void;
}

export default function InquiryForm({ course, onClose }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error("Please fill in all required fields");
      }

      // Send inquiry email
      await sendInquiryEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        courseTitle: course.title,
        courseFee: course.fee,
        courseDuration: course.duration,
        courseRequirements: course.requirements,
        courseAwardingBody: course.awarding_body
      });

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
          <Check className="text-green-600 dark:text-green-400" size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Inquiry Submitted Successfully!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your interest in {course.title}. We ve sent you an email with more details about the course. 
          Our team will contact you shortly to discuss your enrollment options.
        </p>
        <Button onClick={onClose}>Close</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="name" className="block mb-2">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="block mb-2">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="block mb-2">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="message" className="block mb-2">Message (Optional)</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any specific questions about the course?"
            className="w-full"
            rows={4}
          />
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          * Required fields
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 border-t pt-4">
        <p>By submitting this form, you ll receive:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Detailed course information via email</li>
          <li>Registration and payment instructions</li>
          <li>A follow-up call from our admissions team</li>
        </ul>
      </div>
    </form>
  );
}