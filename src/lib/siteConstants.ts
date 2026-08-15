import { 
  DOCTOR_ASSETS, 
  CLINICAL_ASSETS, 
  PHILOSOPHY_ASSETS, 
  DEVELOPER_ASSETS, 
  BRANDING_ASSETS 
} from './assetRegistry';

/**
 * @fileoverview Global Site Constants and Verified Clinical Metadata for Dr. Fatemeh Momeni's Platform.
 */

// ============================================================================
// COMMUNICATION & TELEPHONY
// ============================================================================
export const PHONE = "09934420967";
export const PHONE_TEL = "+989934420967";
export const WHATSAPP_URL = "https://wa.me/989934420967";

// ============================================================================
// HOSPITAL & MEDICAL COUNCIL CREDENTIALS
// ============================================================================
export const HOSPITAL_NAME_FA = "بیمارستان نیکان غرب";
export const HOSPITAL_NAME_EN = "Nikan Gharb Hospital";
export const HOSPITAL_URL = "https://nikan.hospital/";
export const DOCTOR_NIKAN_URL = "https://nikan.hospital/doctor/838/";
export const MEDICAL_COUNCIL_CODE = "00133439";
export const MEDICAL_COUNCIL_FA = "۱۳۳۴۳۹";
export const HOSPITAL_CENTRAL_PHONE = "02129129";
export const HOSPITAL_CENTRAL_PHONE_FA = "۰۲۱-۲۹۱۲۹";

// ============================================================================
// GEOLOCATION & MAPPING COORDINATES
// ============================================================================
export const LATITUDE = 35.75711;
export const LONGITUDE = 51.27039;

export const ADDRESS_FA = "تهران، اتوبان شهید همت غرب، نرسیده به میدان المپیک، روبروی بوستان جوانمردان، جنب پل کن، بیمارستان فوق تخصصی نیکان غرب، کلینیک اعصاب و روان";
export const ADDRESS_EN = "Tehran, Shahid Hemmat West Expressway, near Olympic Square, opposite Javanmardan Park, beside Kan Bridge, Nikan Gharb Hospital, Department of Psychiatry";
export const ADDRESS_EXACT_HINT_FA = "تهران، بزرگراه همت غرب، بعد از تقاطع آزادگان، نرسیده به میدان المپیک، روبروی پارک جوانمردان، بیمارستان نیکان غرب";
export const ADDRESS_EXACT_HINT_EN = "Tehran, Shahid Hemmat Expressway West, past Azadegan, before Olympic Sq, opp. Javanmardan Park, Nikan Gharb Hospital";

// Navigation Links
export const NESHAN_SHORT_URL = "https://nshn.ir/27_bv2k7WxJlj4";
export const NESHAN_URL = "https://nshn.ir/27_bv2k7WxJlj4";
export const NESHAN_MAP_URL = `https://neshan.org/maps/places/35.75711,51.27039`;
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=35.75711,51.27039`;
export const GOOGLE_MAPS_DIR_URL = `https://www.google.com/maps/dir/?api=1&destination=35.75711,51.27039`;
export const WAZE_URL = `https://waze.com/ul?ll=35.75711,51.27039&navigate=yes`;
export const BALAD_URL = `https://balad.ir/location?latitude=35.75711&longitude=51.27039`;
export const APPLE_MAPS_URL = `https://maps.apple.com/?ll=35.75711,51.27039&q=Nikan+Gharb+Hospital`;
export const MAPS_URL = NESHAN_SHORT_URL;

// High-Precision Map Tile Embed
export const OSM_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=51.2580%2C35.7490%2C51.2830%2C35.7650&layer=mapnik&marker=35.75711%2C51.27039`;

// ============================================================================
// IMAGE PATHS & STANDARDIZED ASSETS
// ============================================================================

/** Primary Doctor Portrait */
export const HERO_IMG = DOCTOR_ASSETS.portrait.src;
export const HERO_IMG_FALLBACK = DOCTOR_ASSETS.portrait.fallbackSrc;

/** About Page Doctor Portrait */
export const ABOUT_IMG = DOCTOR_ASSETS.about.src;
export const ABOUT_IMG_FALLBACK = DOCTOR_ASSETS.about.fallbackSrc;

/** Clinical & Consultation Rooms */
export const CLINIC_ROOM_IMG = CLINICAL_ASSETS.consultingRoom.src;
export const CLINIC_ROOM_FALLBACK = CLINICAL_ASSETS.consultingRoom.fallbackSrc;

export const HOSPITAL_FACADE_IMG = CLINICAL_ASSETS.hospitalFacade.src;
export const HOSPITAL_FACADE_FALLBACK = CLINICAL_ASSETS.hospitalFacade.fallbackSrc;

export const CONSULTATION_IMG = CLINICAL_ASSETS.patientDialogue.src;
export const CONSULTATION_FALLBACK = CLINICAL_ASSETS.patientDialogue.fallbackSrc;

/** Treatment Philosophy & Biopsychosocial Clinical Approach */
export const PHILOSOPHY_IMG = PHILOSOPHY_ASSETS.bioPsychoSocialModel.src;
export const PHILOSOPHY_FALLBACK = PHILOSOPHY_ASSETS.bioPsychoSocialModel.fallbackSrc;

export const CLINICAL_PATHWAY_IMG = PHILOSOPHY_ASSETS.clinicalFlowPathway.src;
export const CLINICAL_PATHWAY_FALLBACK = PHILOSOPHY_ASSETS.clinicalFlowPathway.fallbackSrc;

export const MINDFUL_IMG = PHILOSOPHY_ASSETS.bioPsychoSocialModel.src;

/** Developer Avatar */
export const DEVELOPER_IMG = DEVELOPER_ASSETS.avatar.src;
export const DEVELOPER_FALLBACK = DEVELOPER_ASSETS.avatar.fallbackSrc;

/** Branding & Seals */
export const CLINIC_LOGO_IMG = BRANDING_ASSETS.logo.src;
export const MEDICAL_SEAL_IMG = BRANDING_ASSETS.medicalSeal.src;

