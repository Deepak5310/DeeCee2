"use client"

import React from "react";
import { Award, Users, Heart, Globe, Sparkles, Target, ShieldCheck, Zap } from "lucide-react";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  weight: "700",
  subsets: ["latin"]
});

export default function AboutUsPage(): React.ReactElement {
  const teamMembers = [
    {
      name: "Sumit Kyamsaria",
      role: "Founder & CEO",
      image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/founder.png",
      description: "With over 10 years of experience in the hair industry"
    },
    {
      name: "Prerak Kyamsaria",
      role: "Head of Sales",
      image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/head_of_sales.png",
      description: "Expert in hair styling and product development"
    },
    {
      name: "Prabhav Kyamsaria",
      role: "Marketing Manager",
      image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/marketing_manager.png",
      description: "Ensuring smooth operations and customer satisfaction"
    }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      description: "We guarantee 100% authentic human hair products that meet the highest standards"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're committed to exceeding your expectations"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Following international quality standards while maintaining affordable prices"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously improving our products with the latest hair technology"
    }
  ];

  const milestones = [
    { year: "2015", event: "DEECEE HAIR Founded", description: "Started with a vision to provide premium hair solutions" },
    { year: "2017", event: "First Boutique Opened", description: "Opened our flagship store in Jhunjhunu" },
    { year: "2019", event: "Online Expansion", description: "Launched our e-commerce platform" },
    { year: "2021", event: "10,000+ Happy Customers", description: "Reached a milestone of serving thousands" },
    { year: "2023", event: "Pan-India Delivery", description: "Expanded delivery across all states" }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-rose-50 opacity-50"></div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-rose-600">DEECEE HAIR</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in premium hair extensions and solutions. We believe everyone deserves to feel beautiful and confident with luxurious, natural-looking hair.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 2015, DEECEE HAIR began with a simple mission: to provide premium quality hair extensions that look and feel natural. What started as a small boutique in Jhunjhunu, Rajasthan, has grown into a trusted brand serving customers across India.
                </p>
                <p>
                  We understand that hair is not just about appearance – it's about confidence, self-expression, and feeling your best every day. That's why we source only the finest 100% human hair and craft each product with meticulous attention to detail.
                </p>
                <p>
                  Today, we're proud to be the choice of thousands of satisfied customers who trust us for their hair extension needs. From straight to curly, short to long, we offer solutions for every style and preference.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/about_us_story.gif"
                alt="DEECEE HAIR Story"
                // className="rounded-2xl shadow-2xl w-full bg-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-rose-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">8+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-rose-50 to-white p-8 rounded-2xl border border-rose-100">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-10 h-10 text-rose-600" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To empower individuals with premium hair solutions that enhance their natural beauty and boost their confidence. We strive to make luxury hair extensions accessible to everyone while maintaining the highest standards of quality and service.
              </p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-white p-8 rounded-2xl border border-rose-100">
              <div className="flex items-center gap-4 mb-4">
                <Sparkles className="w-10 h-10 text-rose-600" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To become India's most trusted and innovative hair extension brand, setting new standards in quality, variety, and customer satisfaction. We envision a future where everyone can achieve their dream hair effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at DEECEE HAIR
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-rose-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to bringing you the best hair solutions
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-rose-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Milestones that define our growth and commitment
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-rose-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <div className={`bg-white p-6 rounded-2xl shadow-lg ${index % 2 === 0 ? 'mr-8 text-right' : 'ml-8'}`}>
                      <div className="text-rose-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-rose-50 to-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-rose-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Recognition & Achievements</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">10,000+</div>
              <div className="text-gray-700 font-medium">Happy Customers</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">4.8/5</div>
              <div className="text-gray-700 font-medium">Average Rating</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">500+</div>
              <div className="text-gray-700 font-medium">Premium Products</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Customer Support</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">100%</div>
              <div className="text-gray-700 font-medium">Authentic Products</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">Pan India</div>
              <div className="text-gray-700 font-medium">Delivery Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Credit - Redesigned */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Meet the Developer</h2>
            <div className="w-16 h-1 bg-rose-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="group relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] overflow-hidden">
            {/* Decorative background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/80 via-orange-50/50 to-amber-50/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full blur opacity-40 md:opacity-20 md:group-hover:opacity-40 transition duration-500 scale-100 md:group-hover:scale-110"></div>
                <img
                  src="/images/dev.jpeg"
                  alt="Deepak Jangir"
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-1 tracking-wide transition-transform duration-300 group-hover:scale-[1.02] ${caveat.className}`}>Deepak Jangir</h3>
                <p className="text-lg bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent font-bold mb-4">Full Stack Developer</p>

                <p className="text-gray-600 font-medium mb-6 leading-relaxed group-hover:text-gray-900 transition-colors">
                  Passionate about building beautiful, high-performance web applications.
                  Crafted this platform using Next.js 15, React, and Firebase.
                </p>

                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a
                    href="https://github.com/Deepak5310"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50 text-gray-900 border border-gray-200 font-semibold transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-transparent hover:shadow-xl hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/deepak-dev5310"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-3 px-6 py-3 rounded-full bg-blue-50 text-[#0077b5] border border-blue-100 font-semibold transition-all duration-300 hover:bg-[#0077b5] hover:text-white hover:border-transparent hover:shadow-xl hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.063 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
