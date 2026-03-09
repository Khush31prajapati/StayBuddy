"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, MapPin, Home, Maximize, Calendar, Phone, Mail, Share2, X, Send, MessageCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactOwnerForm from "@/components/ContactOwnerForm";

// Mock property data - in real app, this would come from API/database
const propertyData: { [key: string]: any } = {
  "1": {
    id: "1",
    title: "Beautiful Apartment with Balcony",
    location: "10 Rue Georges Pompidou, Talence, France",
    fullAddress: "Alterric France, Rue du Dépôt, 60280 Margny-lès-Compiègne, France",
    price: 1100,
    deposit: 2200,
    rooms: 3,
    bathrooms: 2,
    area: 63,
    propertyType: "Tenant",
    category: "Flat",
    rentalPeriod: "Unlimited",
    availableFrom: "ASAP",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    ],
    description: "Beautiful 3-bedroom apartment with modern amenities and stunning views. Perfect for families or professionals looking for a comfortable living space.",
    amenities: ["WiFi", "Parking", "Gym", "Security", "Elevator", "Balcony"],
    rules: {
      smoking: "Not Allowed",
      pets: "Not Allowed",
      visitors: "Allowed with prior notice",
      gateClosing: "11:00 PM"
    },
    services: {
      electricity: "Included",
      water: "Included",
      maintenance: "Included",
      cleaning: "Not Included"
    },
    landlord: {
      name: "Property Manager",
      phone: "+33 1 23 45 67 89",
      email: "contact@renthub.com"
    },
    priceStatus: "below average",
    isNew: true
  },
  "2": {
    id: "2",
    title: "Comfortable PG Accommodation",
    location: "Alterric France, Rue du Dépôt, 60280 Venette",
    fullAddress: "Alterric France, Rue du Dépôt, 60280 Venette, France",
    price: 695,
    deposit: 1390,
    rooms: 1,
    bathrooms: 1,
    area: 37,
    propertyType: "PG",
    category: "Single",
    pgFor: "Both",
    preferredTenants: "Student",
    rentalPeriod: "Unlimited",
    availableFrom: "ASAP",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    ],
    description: "Comfortable PG accommodation perfect for students. Includes meals, WiFi, and all basic amenities. Safe and secure environment.",
    amenities: ["WiFi", "Meals", "Laundry", "AC", "Attached Bathroom", "Study Table"],
    rules: {
      smoking: "Not Allowed",
      drinking: "Not Allowed",
      nonVeg: "Allowed",
      visitors: "Allowed (10 AM - 8 PM)",
      gateClosing: "10:00 PM"
    },
    services: {
      electricity: "Included",
      water: "Included",
      meals: "3 meals/day",
      laundry: "Included",
      cleaning: "Daily"
    },
    landlord: {
      name: "PG Owner",
      phone: "+33 1 23 45 67 89",
      email: "contact@renthub.com"
    },
    priceStatus: "below average",
    isNew: true
  }
};

export default function PropertyDetailsPage() {
  const params = useParams();
  const { language, t: translate } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [direction, setDirection] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Currency symbol based on language from translations
  const currencySymbol = translate('currency.symbol');
  const monthText = translate('currency.perMonth');

  const propertyId = params.id as string;
  const property = propertyData[propertyId] || propertyData["1"];

  const content = {
    en: {
      home: "Home",
      properties: "Properties",
      addToFavorites: "Add to favourites",
      monthlyRent: "Monthly Rent",
      securityDeposit: "Security Deposit",
      budgetFriendly: "Budget-Friendly: The price is",
      belowAverage: "below average",
      priceDescription: "The pricing of this property is well below the average market rate, providing exceptional value for your budget.",
      rentalPeriod: "Rental Period",
      availableFrom: "Available from",
      contactOwner: "Contact Owner",
      anyConcerns: "Any concerns about this listing?",
      reportIt: "Report it",
      toOurTeam: "to our team.",
      propertyDetails: "PROPERTY DETAILS",
      propertyType: "Property Type",
      category: "Category",
      rooms: "Rooms",
      bathrooms: "Bathrooms",
      size: "Size",
      rent: "Monthly Rent",
      deposit: "Security Deposit",
      pgFor: "PG For",
      preferredTenants: "Preferred Tenants",
      amenities: "AMENITIES",
      rules: "RULES & REGULATIONS",
      smoking: "Smoking",
      drinking: "Drinking",
      nonVeg: "Non-Veg",
      pets: "Pets",
      visitors: "Visitors",
      gateClosing: "Gate Closing Time",
      services: "SERVICES INCLUDED",
      electricity: "Electricity",
      water: "Water",
      meals: "Meals",
      laundry: "Laundry",
      cleaning: "Cleaning",
      maintenance: "Maintenance",
      description: "DESCRIPTION",
      map: "LOCATION",
      relatedListings: "Related Properties",
      viewMore: "View more properties",
      share: "Share",
      shareProperty: "Share Property",
      copyLink: "Copy Link",
      linkCopied: "Link Copied!",
      shareVia: "Share via",
      allowed: "Allowed",
      notAllowed: "Not Allowed",
      included: "Included",
      notIncluded: "Not Included"
    },
    fr: {
      home: "Accueil",
      properties: "Propriétés",
      addToFavorites: "Ajouter aux favoris",
      monthlyRent: "Loyer mensuel",
      securityDeposit: "Dépôt de garantie",
      budgetFriendly: "Économique: Le prix est",
      belowAverage: "inférieur à la moyenne",
      priceDescription: "Le prix de cette propriété est bien inférieur au tarif moyen du marché, offrant une valeur exceptionnelle pour votre budget.",
      rentalPeriod: "Période de location",
      availableFrom: "Disponible à partir de",
      contactOwner: "Contacter le propriétaire",
      anyConcerns: "Des préoccupations concernant cette annonce?",
      reportIt: "Signalez-le",
      toOurTeam: "à notre équipe.",
      propertyDetails: "DÉTAILS DE LA PROPRIÉTÉ",
      propertyType: "Type de propriété",
      category: "Catégorie",
      rooms: "Chambres",
      bathrooms: "Salles de bain",
      size: "Taille",
      rent: "Loyer mensuel",
      deposit: "Dépôt de garantie",
      pgFor: "PG Pour",
      preferredTenants: "Locataires préférés",
      amenities: "ÉQUIPEMENTS",
      rules: "RÈGLES ET RÈGLEMENTS",
      smoking: "Fumer",
      drinking: "Boire",
      nonVeg: "Non-végétarien",
      pets: "Animaux",
      visitors: "Visiteurs",
      gateClosing: "Heure de fermeture",
      services: "SERVICES INCLUS",
      electricity: "Électricité",
      water: "Eau",
      meals: "Repas",
      laundry: "Blanchisserie",
      cleaning: "Nettoyage",
      maintenance: "Entretien",
      description: "DESCRIPTION",
      map: "EMPLACEMENT",
      relatedListings: "Propriétés similaires",
      viewMore: "Voir plus de propriétés",
      share: "Partager",
      shareProperty: "Partager la propriété",
      copyLink: "Copier le lien",
      linkCopied: "Lien copié!",
      shareVia: "Partager via",
      allowed: "Autorisé",
      notAllowed: "Non autorisé",
      included: "Inclus",
      notIncluded: "Non inclus"
    }
  };

  const t = content[language];

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
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

  // Share functions
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = encodeURIComponent(`Check out this property: ${property.title} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const url = window.location.href;
    const text = encodeURIComponent(`Check out this property: ${property.title}`);
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    const url = window.location.href;
    const subject = encodeURIComponent(`Property: ${property.title}`);
    const body = encodeURIComponent(`I found this property and thought you might be interested:\n\n${property.title}\n${property.location}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-[500px] bg-gray-900">
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
              src={property.images[currentImageIndex]}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center z-10 shadow-lg transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center z-10 shadow-lg transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {property.images.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentImageIndex ? 1 : -1);
                setCurrentImageIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-primary">{t.home}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/properties" className="hover:text-primary">{t.properties}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">{property.location.split(',')[0]}</span>
            </div>

            {/* Title and Favorite */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {property.title}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.propertyType === "PG" 
                      ? "bg-blue-600 text-white" 
                      : "bg-green-600 text-white"
                  }`}>
                    {property.propertyType}
                  </span>
                </div>
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {property.fullAddress}
                </p>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                  isFavorite
                    ? 'bg-red-50 border-2 border-red-500 text-red-600 hover:bg-red-100'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary hover:bg-primary/5 hover:text-primary'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${
                    isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-current"
                  }`}
                />
                <span className="whitespace-nowrap">{t.addToFavorites}</span>
              </button>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.description}</h3>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Property Details Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.propertyDetails}</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.propertyType}</span>
                  <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                    property.propertyType === "PG" 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-green-100 text-green-700"
                  }`}>
                    {property.propertyType}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.category}</span>
                  <span className="font-semibold text-gray-900">{property.category}</span>
                </div>
                {property.propertyType === "PG" && property.pgFor && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.pgFor}</span>
                    <span className="font-semibold text-gray-900">{property.pgFor}</span>
                  </div>
                )}
                {property.propertyType === "PG" && property.preferredTenants && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.preferredTenants}</span>
                    <span className="font-semibold text-gray-900">{property.preferredTenants}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.rooms}</span>
                  <span className="font-semibold text-gray-900">{property.rooms}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.bathrooms}</span>
                  <span className="font-semibold text-gray-900">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.size}</span>
                  <span className="font-semibold text-gray-900">{property.area} m²</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.rent}</span>
                  <span className="font-semibold text-gray-900">{currencySymbol} {property.price}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.deposit}</span>
                  <span className="font-semibold text-gray-900">{currencySymbol} {property.deposit}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.availableFrom}</span>
                  <span className="font-semibold text-green-600">{property.availableFrom}</span>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.amenities}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.rules}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.smoking}</span>
                  <span className={`font-semibold ${property.rules.smoking === "Allowed" ? "text-green-600" : "text-red-600"}`}>
                    {property.rules.smoking}
                  </span>
                </div>
                {property.propertyType === "PG" && property.rules.drinking && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.drinking}</span>
                    <span className={`font-semibold ${property.rules.drinking === "Allowed" ? "text-green-600" : "text-red-600"}`}>
                      {property.rules.drinking}
                    </span>
                  </div>
                )}
                {property.propertyType === "PG" && property.rules.nonVeg && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.nonVeg}</span>
                    <span className={`font-semibold ${property.rules.nonVeg === "Allowed" ? "text-green-600" : "text-red-600"}`}>
                      {property.rules.nonVeg}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.pets}</span>
                  <span className={`font-semibold ${property.rules.pets === "Allowed" ? "text-green-600" : "text-red-600"}`}>
                    {property.rules.pets}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.visitors}</span>
                  <span className="font-semibold text-gray-900">{property.rules.visitors}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.gateClosing}</span>
                  <span className="font-semibold text-gray-900">{property.rules.gateClosing}</span>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.services}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.electricity}</span>
                  <span className={`font-semibold ${property.services.electricity === "Included" ? "text-green-600" : "text-gray-900"}`}>
                    {property.services.electricity}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.water}</span>
                  <span className={`font-semibold ${property.services.water === "Included" ? "text-green-600" : "text-gray-900"}`}>
                    {property.services.water}
                  </span>
                </div>
                {property.propertyType === "PG" && property.services.meals && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.meals}</span>
                    <span className="font-semibold text-green-600">{property.services.meals}</span>
                  </div>
                )}
                {property.propertyType === "PG" && property.services.laundry && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.laundry}</span>
                    <span className={`font-semibold ${property.services.laundry === "Included" ? "text-green-600" : "text-gray-900"}`}>
                      {property.services.laundry}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">{t.cleaning}</span>
                  <span className={`font-semibold ${property.services.cleaning === "Included" || property.services.cleaning === "Daily" ? "text-green-600" : "text-gray-900"}`}>
                    {property.services.cleaning}
                  </span>
                </div>
                {property.propertyType === "Tenant" && property.services.maintenance && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.maintenance}</span>
                    <span className={`font-semibold ${property.services.maintenance === "Included" ? "text-green-600" : "text-gray-900"}`}>
                      {property.services.maintenance}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.map}</h3>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{property.fullAddress}</span>
              </div>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map placeholder</p>
              </div>
            </div>

            {/* Related Listings Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t.relatedListings} {property.location.split(',')[0]}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Related Property 1 */}
                <Link href="/property/2" className="group">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                    <Image
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop"
                      alt="Related property"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    1 room apartment of 30m²
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    60280 {property.location.split(',')[0]}, France
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {currencySymbol} 560 <span className="text-sm font-normal text-gray-600">/ {monthText}</span>
                  </p>
                </Link>

                {/* Related Property 2 */}
                <Link href="/property/3" className="group">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                    <Image
                      src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
                      alt="Related property"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    2 rooms apartment of 42m²
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    60280 {property.location.split(',')[0]}, France
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {currencySymbol} 618 <span className="text-sm font-normal text-gray-600">/ {monthText}</span>
                  </p>
                </Link>

                {/* Related Property 3 */}
                <Link href="/property/4" className="group">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                    <Image
                      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
                      alt="Related property"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    1 room apartment of 39m²
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    60000 Compiègne, France
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {currencySymbol} 622 <span className="text-sm font-normal text-gray-600">/ {monthText}</span>
                  </p>
                </Link>
              </div>

              {/* View More Button */}
              <div className="text-center">
                <Link href="/properties">
                  <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors">
                    {t.viewMore}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Price Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">{t.monthlyRent}</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">
                  {currencySymbol} {property.price}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {t.securityDeposit}: {currencySymbol} {property.deposit}
                </p>

                {/* Price Status */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    {t.budgetFriendly} <span className="text-green-600">{t.belowAverage}</span>
                  </p>
                  <div className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full mb-2"></div>
                  <p className="text-xs text-gray-600">{t.priceDescription}</p>
                </div>

                {/* Rental Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.rentalPeriod}</span>
                    <span className="font-semibold text-green-600">{property.rentalPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.availableFrom}</span>
                    <span className="font-semibold text-green-600">{property.availableFrom}</span>
                  </div>
                </div>

                {/* Contact Button */}
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors mb-4"
                >
                  {t.contactOwner}
                </button>

                {/* Share Button */}
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="w-full py-3 border-2 border-gray-300 hover:border-primary text-gray-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  {t.share}
                </button>

                {/* Report */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    {t.anyConcerns}
                  </p>
                  <p className="text-sm text-center">
                    <button className="text-red-600 hover:text-red-700 font-semibold">
                      {t.reportIt}
                    </button>{" "}
                    <span className="text-gray-600">{t.toOurTeam}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Owner Form Modal */}
      <ContactOwnerForm 
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
        property={property}
        language={language}
      />

      {/* Share Modal */}
      {showShareModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setShowShareModal(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '450px',
              width: '100%',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Share2 className="w-6 h-6 text-primary" />
                {t.shareProperty}
              </h2>
              <button
                onClick={() => setShowShareModal(false)}
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {copySuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    {t.linkCopied}
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    {t.copyLink}
                  </>
                )}
              </button>

              {/* Share via */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">{t.shareVia}</p>
                <div className="grid grid-cols-2 gap-3">
                  {/* WhatsApp */}
                  <button
                    onClick={handleShareWhatsApp}
                    className="py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={handleShareFacebook}
                    className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Facebook
                  </button>

                  {/* Twitter */}
                  <button
                    onClick={handleShareTwitter}
                    className="py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Twitter
                  </button>

                  {/* Email */}
                  <button
                    onClick={handleShareEmail}
                    className="py-3 px-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
