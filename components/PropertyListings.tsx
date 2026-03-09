"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const properties = [
  {
    id: "1",
    title: "Beautiful Apartment with Balcony",
    location: "10 Rue Georges Pompidou, Talence, France",
    price: 1100,
    rooms: 3,
    area: 63,
    type: "Tenant" as const,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    ],
    isNew: true,
    verified: true,
  },
  {
    id: "2",
    title: "Spacious Studio Apartment",
    location: "Alterric France, Rue du Dépôt, 60280 Venette",
    price: 695,
    rooms: 1,
    area: 37,
    type: "PG" as const,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    ],
    isNew: true,
    verified: false,
  },
  {
    id: "3",
    title: "Modern Apartment with Garden View",
    location: "Aix-en-Provence, Bouches-du-Rhône",
    price: 1500,
    rooms: 3,
    area: 70,
    type: "Tenant" as const,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    ],
    isNew: true,
    verified: true,
  },
  {
    id: "4",
    title: "Cozy One Room Apartment",
    location: "Bitic-Etables-sur-Mer, Côtes-d'Armor",
    price: 560,
    rooms: 1,
    area: 32,
    type: "PG" as const,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    ],
    isNew: true,
    verified: false,
  },
  {
    id: "5",
    title: "Luxury Penthouse",
    location: "Paris 16th, Île-de-France",
    price: 2800,
    rooms: 4,
    area: 120,
    type: "Tenant" as const,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    ],
    badge: "Premium",
    verified: true,
  },
  {
    id: "6",
    title: "Student-Friendly Apartment",
    location: "Lyon 7th, Rhône-Alpes",
    price: 850,
    rooms: 2,
    area: 45,
    type: "PG" as const,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    ],
  },
  {
    id: "7",
    title: "Charming Apartment Near Metro",
    location: "Marseille 8th, Bouches-du-Rhône",
    price: 1200,
    rooms: 3,
    area: 75,
    type: "Tenant" as const,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    ],
    isNew: true,
  },
  {
    id: "8",
    title: "Renovated Studio",
    location: "Toulouse Centre, Haute-Garonne",
    price: 650,
    rooms: 1,
    area: 28,
    type: "PG" as const,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    ],
  },
];

type PropertyType = "all" | "pg" | "flats";

export default function PropertyListings() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<PropertyType>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const tabs = [
    { id: "all" as PropertyType, label: t("properties.allProperties") },
    { id: "pg" as PropertyType, label: t("filters.pg").toUpperCase() },
    { id: "flats" as PropertyType, label: "Flats/Villa" },
  ];

  return (
    <div className="px-4">
    <div className="w-full max-w-7xl mx-auto py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {t("properties.featured")}
        </h2>
        <p className="text-gray-600">
          {t("properties.subtitle")}
        </p>
      </div>

      {/* Property Type Tabs with Navigation Arrows */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-primary hover:bg-primary-light transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-primary hover:bg-primary-light transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {properties.map((property) => (
          <div key={property.id} className="flex-shrink-0 w-[300px]">
            <PropertyCard {...property} />
          </div>
        ))}
      </div>

      {/* View All Properties Button */}
      <div className="text-center mt-8">
        <Link href="/properties">
          <button className="px-8 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg hover:bg-primary-dark hover:shadow-xl transition-all duration-300">
            {t("properties.viewAll")}
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
}
