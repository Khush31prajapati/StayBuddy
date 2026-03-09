"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rooms: number;
  area: number;
  images: string[];
  isNew?: boolean;
  badge?: string;
  type?: "PG" | "Tenant";
  verified?: boolean;
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  rooms,
  area,
  images,
  isNew = false,
  badge,
  type = "Tenant",
  verified = false,
}: PropertyCardProps) {
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [direction, setDirection] = useState(0);

  // Currency symbol based on language from translations
  const currencySymbol = t('currency.symbol');
  const monthText = t('currency.perMonth');

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <Link href={`/property/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
      {/* Image Carousel */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImageIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIndex]}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-md"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {type && (
            <span className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${
              type === "PG" ? "bg-blue-600" : "bg-green-600"
            }`}>
              {type}
            </span>
          )}
          {verified && (
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}
          {badge && (
            <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
              {badge}
            </span>
          )}
          {isNew && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              New
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-300 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </button>

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDirection(index > currentImageIndex ? 1 : -1);
                  setCurrentImageIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {rooms} rooms apartment of {area}m²
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">{location}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">
            {currencySymbol} {price.toLocaleString()} <span className="text-sm font-normal text-gray-600">/ {monthText}</span>
          </p>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
