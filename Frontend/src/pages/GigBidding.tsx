import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Code,
  Gift,
  Pencil,
  SendIcon,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import Navbar from "@/components/Navbar";
import TaglineBadge from "@/components/TaglineBadge";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

interface Bid {
  id: number;
  bidder: string;
  avatar: string;
  amount: number;
  timeframe: string;
  rating: number;
  description: string;
  timestamp: Date;
}

const GigBidding = () => {
  const [bids, setBids] = useState<Bid[]>([
    {
      id: 1,
      bidder: "AIDevMaster",
      avatar: "https://i.pravatar.cc/150?img=1",
      amount: 750,
      timeframe: "3 days",
      rating: 4.8,
      description:
        "I can deliver a production-ready solution with full documentation and tests.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: 2,
      bidder: "WebDevPro",
      avatar: "https://i.pravatar.cc/150?img=2",
      amount: 850,
      timeframe: "2 days",
      rating: 5.0,
      description:
        "Experienced developer with 5+ years in React. Can deliver ahead of schedule.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: 3,
      bidder: "CodeNinja",
      avatar: "https://i.pravatar.cc/150?img=3",
      amount: 675,
      timeframe: "4 days",
      rating: 4.7,
      description:
        "Full-stack developer specializing in React and Node.js. Detailed documentation provided.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
  ]);

  const [gigDetails] = useState({
    title: "Build a Modern React Dashboard with Real-time Data",
    description:
      "Looking for an experienced React developer to create a responsive dashboard with real-time data visualization, user authentication, and dark/light theme support. The dashboard needs to connect to our existing API endpoints.",
    budget: "800-1200 USD",
    deadline: "7 days",
    skills: ["React", "TypeScript", "Data Visualization", "Responsive Design"],
    posted: new Date(Date.now() - 1000 * 60 * 60 * 5),
  });

  // Add fade-in effect for content
  useEffect(() => {
    const bidContent = document.getElementById("bid-content");
    if (bidContent) {
      setTimeout(() => {
        bidContent.classList.add("opacity-100");
        bidContent.classList.remove("opacity-0", "translate-y-4");
      }, 300);
    }
  }, []);

  // Simulate real-time bid updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newBidder = [
        "DevWizard",
        "ReactMaster",
        "FullStackHero",
        "CodeCrafter",
        "TechNinja",
      ][Math.floor(Math.random() * 5)];

      const newBid: Bid = {
        id: bids.length + 1,
        bidder: newBidder,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(
          Math.random() * 70
        )}`,
        amount: Math.floor(700 + Math.random() * 500),
        timeframe: `${Math.floor(2 + Math.random() * 5)} days`,
        rating: Math.floor(40 + Math.random() * 10) / 10,
        description:
          "I'm interested in working on this project and can deliver quality results on time.",
        timestamp: new Date(),
      };

      setBids((prev) => [newBid, ...prev.slice(0, 4)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [bids]);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      <style>{`
        .glow-effect {
          box-shadow: 0 0 15px rgba(0, 180, 171, 0.5);
        }
        .bid-card {
          transition: all 0.3s ease;
        }
        .bid-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 180, 171, 0.2);
        }
        .animated-progress .progress-fill {
          transition: width 1s ease-in-out;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
      `}</style>

      <ParticleBackground />

      {/* Navbar */}
      <Navbar />

      {/* Gig Bidding Section */}
      <div
        id="bid-content"
        className="w-full min-h-[calc(100vh-80px)] px-6 md:px-12 lg:px-24 pt-16 pb-20 relative z-10 transform transition-all duration-1000 ease-out opacity-0 translate-y-4"
      >
        {/* Gig Content */}
        <div className="flex flex-col lg:flex-row mt-8 gap-10">
          {/* Left Column - Gig Details */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
              {gigDetails.title}
            </h1>

            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 mb-6">
              <p className="text-[#9CACA9] text-lg mb-6">
                {gigDetails.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Budget</p>
                  <p className="text-white text-xl font-medium">
                    {gigDetails.budget}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Deadline</p>
                  <p className="text-white text-xl font-medium">
                    {gigDetails.deadline}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {gigDetails.skills.map((skill, index) => (
                    <Badge key={index} className="bg-[#064119] text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Posted {formatTimeAgo(gigDetails.posted)}</span>
                <span>5 bids so far</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#064119] opacity-20 blur-[100px]" />
              </div>

              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8 glow-effect">
                    <div className="flex items-center mb-6">
                      <div className="bg-[#064119] p-3 rounded-lg mr-4">
                        <Code size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-medium">
                          React Dashboard
                        </h3>
                        <p className="text-gray-400">Web Development Project</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Time Remaining</span>
                          <span className="text-white font-medium">
                            6 days, 8 hours
                          </span>
                        </div>
                        <Progress value={65} className="h-2 bg-gray-700">
                          <div
                            className="h-full bg-gradient-to-r from-[#064119] to-[#00B4AB] rounded-full progress-fill"
                            style={{ width: "65%" }}
                          />
                        </Progress>
                      </div>

                      <div className="flex items-center justify-between py-3 border-t border-gray-800">
                        <div className="flex items-center">
                          <Clock size={16} className="text-gray-400 mr-2" />
                          <span className="text-gray-400">
                            Avg. Response Time
                          </span>
                        </div>
                        <span className="text-white">4 hours</span>
                      </div>

                      <div className="flex items-center justify-between py-3 border-t border-gray-800">
                        <div className="flex items-center">
                          <Zap size={16} className="text-gray-400 mr-2" />
                          <span className="text-gray-400">Current Top Bid</span>
                        </div>
                        <span className="text-green-400 font-medium">$850</span>
                      </div>

                      <div className="flex items-center justify-between py-3 border-t border-gray-800">
                        <div className="flex items-center">
                          <Gift size={16} className="text-gray-400 mr-2" />
                          <span className="text-gray-400">Bonus Available</span>
                        </div>
                        <span className="text-white">$200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bids Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-white">Latest Bids</h2>
            <Badge
              variant="outline"
              className="text-[#00B4AB] border-[#00B4AB] px-3 py-1"
            >
              Live Updates{" "}
              <span className="ml-2 h-2 w-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <AnimatePresence>
              {bids.map((bid) => (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="bid-card bg-[#111111] border border-gray-800 rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                      <Avatar className="h-12 w-12 border-2 border-[#064119]">
                        <img src={bid.avatar} alt={bid.bidder} />
                      </Avatar>

                      <div className="ml-4">
                        <h3 className="text-white text-lg font-medium">
                          {bid.bidder}
                        </h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-gray-300">
                            {bid.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:ml-auto grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-gray-400 text-sm">Bid Amount</p>
                        <p className="text-white text-xl font-medium">
                          ${bid.amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Delivery</p>
                        <p className="text-white text-xl font-medium">
                          {bid.timeframe}
                        </p>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <p className="text-gray-400 text-sm">Posted</p>
                        <p className="text-white">
                          {formatTimeAgo(bid.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pl-16 md:pl-[4.5rem]">
                    <p className="text-[#9CACA9]">{bid.description}</p>
                  </div>

                  <div className="mt-4 pl-16 md:pl-[4.5rem] flex">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#00B4AB] border-gray-700 mr-3"
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#064119] hover:bg-[#085622] text-white"
                    >
                      Contact
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GigBidding;
