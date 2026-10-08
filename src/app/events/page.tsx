"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, ArrowLeft, CheckCircle2, User, HelpCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface EventItem {
  id: number;
  title: string;
  description: string;
  extendedDescription: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "past";
}

const events: EventItem[] = [
  {
    id: 1,
    title: "GAP Awareness & Compliance Workshop",
    description: "A comprehensive training session for our partner farmers to review local GAP guidelines, water quality management, and clean harvesting protocols.",
    extendedDescription: "This workshop is designed to ensure all our outgrowers and core farm operators are aligned with Good Agricultural Practices (GAP). Led by senior agronomists and external agricultural officers, the event covers strict microbiological controls, safe soil management, proper fertilizer application, and maintaining complete harvest logs for full traceability.",
    date: "September 12, 2026",
    time: "09:00 AM - 01:00 PM",
    location: "Chilaw Training Center, Sri Lanka",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Net House Cultivation Demonstration",
    description: "Hands-on showcase of our upcoming modern Net House farming systems, demonstrating how to optimize yield and control crop environment.",
    extendedDescription: "As Green Hills prepares to expand its high-tech cultivation footprint, this session will demonstrate modern Net House structures to our outgrowers. We will discuss setup economics, pest exclusion mechanisms, water efficiency techniques, and micro-climate control to ensure year-round premium leafy vegetable supply.",
    date: "October 05, 2026",
    time: "10:00 AM - 03:00 PM",
    location: "Green Hills Demonstration Farm, Chilaw",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Export Quality Assurance & Harvest Workshop",
    description: "Specialized training for packaging, sorting, and field teams on maintaining export quality, cold chain storage, and zero contamination.",
    extendedDescription: "This technical training focuses on post-harvest management. Teams will learn about double-bubble washing systems, strict humidity extraction, and temperature-controlled packing guidelines that are essential for long-distance Middle Eastern and European exports.",
    date: "November 14, 2026",
    time: "08:30 AM - 04:30 PM",
    location: "Processing & Sorting Facility, Chilaw",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Keells Approved Supplier Launch Ceremony",
    description: "Official ceremony celebrating our approval and launch as a trusted leafy vegetable supplier to Keells Supermarkets.",
    extendedDescription: "Celebrating the approval of Green Hills as an official supplier to Keells Supermarket in February 2023. We hosted retail managers, sorting facility leads, and partner farmers to inaugurate our first daily fresh supply channels and launch our QR code traceability program.",
    date: "February 28, 2023",
    time: "10:00 AM - 01:00 PM",
    location: "Keells Distribution Center, Colombo",
    status: "past",
  },
  {
    id: 5,
    title: "Cargills Strategic Supplier Partner Review",
    description: "Review and recognition session with Cargills supermarket category heads to align on premium GAP-certified leafy vegetable supplies.",
    extendedDescription: "Our strategic review with Cargills Supermarket leadership focused on volume expansion and SL-GAP compliance optimization. The meeting successfully established new daily supply quotas and recognized our farmers for maintaining zero-residue standards.",
    date: "August 18, 2024",
    time: "09:00 AM - 12:30 PM",
    location: "Cargills Head Office, Colombo",
    status: "past",
  },
  {
    id: 6,
    title: "Farmer Recognition & Community Meetup",
    description: "Annual ceremony celebrating the hard work of our outgrower farmers, presenting performance bonuses, and distributing seeds.",
    extendedDescription: "We gathered over 100 farmers from our outgrower network to celebrate our 2025 growth milestone. Green Hills presented performance bonuses to high-compliance farmers, distributed premium seeds, and discussed local community employment growth strategies.",
    date: "January 15, 2026",
    time: "02:00 PM - 05:30 PM",
    location: "Community Center, Chilaw",
    status: "past",
  },
];

export default function EventsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [registeringId, setRegisteringId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [successId, setSuccessId] = useState<number | null>(null);

  const upcomingEvents = events.filter(e => e.status === "upcoming");
  const pastEvents = events.filter(e => e.status === "past");

  const handleRegisterSubmit = (e: React.FormEvent, eventId: number) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    // Simulate API registration call
    setSuccessId(eventId);
    setFormData({ name: "", email: "", phone: "" });
    setTimeout(() => {
      setSuccessId(null);
      setRegisteringId(null);
    }, 4000);
  };

  const EventCard = ({ event, index }: { event: EventItem, index: number }) => {
    const isExpanded = expandedId === event.id;
    const isRegistering = registeringId === event.id;
    const isSuccess = successId === event.id;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="bg-white rounded-3xl border border-border p-6 md:p-8 flex flex-col gap-6 hover:shadow-lg transition-all relative overflow-hidden shadow-sm"
      >
        {/* Status indicator line */}
        <div className={`absolute left-0 top-0 bottom-0 w-2 ${event.status === 'upcoming' ? 'bg-primary' : 'bg-muted-foreground/40'}`} />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Date Block */}
          <div className="flex flex-col items-center justify-center min-w-[140px] p-4 bg-muted/40 rounded-2xl border border-border/60 self-start md:self-center">
            <Calendar className={`w-8 h-8 mb-2 ${event.status === 'upcoming' ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="text-sm font-bold text-center text-foreground">{event.date.split(',')[0]}</span>
            {event.date.includes(',') && <span className="text-xs text-muted-foreground">{event.date.split(',')[1]}</span>}
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold font-outfit text-foreground mb-3 leading-tight">
              {event.title}
            </h3>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {event.description}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-auto">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-2 justify-center border-t border-border/50 md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0 min-w-[140px]">
            <Button 
              onClick={() => setExpandedId(isExpanded ? null : event.id)}
              variant="outline" 
              className="rounded-full text-xs"
            >
              {isExpanded ? "Hide Details" : "More Info"}
            </Button>

            {event.status === 'upcoming' && (
              <Button 
                onClick={() => {
                  setRegisteringId(isRegistering ? null : event.id);
                  setSuccessId(null);
                }}
                variant="default" 
                className="rounded-full text-xs bg-primary hover:bg-primary/95 text-white"
              >
                Register
              </Button>
            )}
          </div>
        </div>

        {/* Expandable Extended Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border mt-2 pt-6"
            >
              <h4 className="text-sm font-bold font-outfit text-primary uppercase tracking-wider mb-2">Event Overview</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{event.extendedDescription}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expandable Registration Form */}
        <AnimatePresence>
          {isRegistering && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border mt-2 pt-6 bg-muted/20 p-4 rounded-2xl"
            >
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-primary mb-3 animate-bounce" />
                  <h4 className="font-bold text-lg text-foreground mb-1">Registration Successful!</h4>
                  <p className="text-sm text-muted-foreground">Thank you for registering. A confirmation email and pass has been sent to your address.</p>
                </div>
              ) : (
                <form onSubmit={(e) => handleRegisterSubmit(e, event.id)} className="space-y-4 max-w-md">
                  <h4 className="text-sm font-bold font-outfit text-primary uppercase tracking-wider">Attend this Event</h4>
                  <p className="text-xs text-muted-foreground mb-2">Provide your contact info to secure your seat. Pass will be sent via email.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-foreground">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full text-xs p-2 rounded-lg border border-border bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-foreground">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+94 77 123 4567" 
                        className="w-full text-xs p-2 rounded-lg border border-border bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-foreground">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="johndoe@example.com" 
                      className="w-full text-xs p-2 rounded-lg border border-border bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      type="button" 
                      onClick={() => setRegisteringId(null)}
                      variant="outline" 
                      className="rounded-full text-xs px-4"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      variant="default" 
                      className="rounded-full text-xs px-6 bg-primary text-white"
                    >
                      Confirm Seat
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24">
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto mt-8">
          <SectionHeading 
            title="Events & Meetups" 
            subtitle="Join us at industry trade shows, farmer training workshops, and official company events."
            light
          />
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 mt-16 max-w-4xl">
        
        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-outfit text-foreground mb-8 flex items-center gap-3">
            <div className="w-2.5 h-7 bg-primary rounded-full"></div>
            Upcoming Events
          </h2>
          <div className="flex flex-col gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-2xl font-bold font-outfit text-foreground mb-8 flex items-center gap-3">
            <div className="w-2.5 h-7 bg-muted-foreground/60 rounded-full"></div>
            Past Events
          </h2>
          <div className="flex flex-col gap-6">
            {pastEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
