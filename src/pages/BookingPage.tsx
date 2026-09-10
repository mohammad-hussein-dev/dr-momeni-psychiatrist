/// <reference types="vite/client" />
// ─── src/pages/BookingPage.tsx ──────────────────────────────────────────────
/**
 * @fileoverview Smart Bilingual Booking Orchestrator Page
 * @description A unified, fully bilingual booking hub that intelligently routes users
 *              to either the custom online booking form OR the in-person hospital
 *              booking information based on URL query parameters or route state.
 *
 * @features
 * - Full Persian (fa) and English (en) support with proper RTL/LTR alignment.
 * - Standardized hospital phone (02129129 / ۰۲۱-۲۹۱۲۹) everywhere.
 * - URL and route state detection (?type=in-person | state: { visit_type: 'in_person' }).
 * - Seamless switching between Online Telehealth and Hospital In-Person consultation.
 *
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 2.4.0
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
    CalendarCheck,
    Shield,
    Clock,
    Phone,
    MapPin,
    ExternalLink,
    Building2,
    Stethoscope,
    MessageCircle,
    Heart,
    Sparkles,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { IBookingRequest, IBookingResponse } from '../types/booking';
import { BookingForm } from '../components/booking/BookingForm';
import { BookingSuccess } from '../components/booking/BookingSuccess';
import {
    HOSPITAL_CENTRAL_PHONE,
    HOSPITAL_CENTRAL_PHONE_FA,
    HOSPITAL_NAME_FA,
    HOSPITAL_NAME_EN,
    HOSPITAL_URL,
    ADDRESS_FA,
    ADDRESS_EN,
} from '../lib/siteConstants';

// ─── Type Definitions ───────────────────────────────────────────────────────

type VisitMode = 'online' | 'in-person';
type BookingFlowState = 'form' | 'success';

const CLINIC_WHATSAPP = '989934420967';

// ─── Component Implementation ───────────────────────────────────────────────

export const BookingPage: React.FC = () => {
    const { t, lang, isRTL } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [flowState, setFlowState] = useState<BookingFlowState>('form');
    const [bookingData, setBookingData] = useState<IBookingRequest | null>(null);
    const [bookingResponse, setBookingResponse] = useState<IBookingResponse | null>(null);

    const pageRef = useRef<HTMLDivElement>(null);

    // ─── Mode Detection (Supports both Query Param and Route Navigation State) ─
    const typeParam = searchParams.get('type');
    const locationVisitType = (location.state as { visit_type?: string } | null)?.visit_type;
    const isInPerson = typeParam === 'in-person' || locationVisitType === 'in_person';
    const isOnline = !isInPerson;

    const hospitalName = lang === 'fa' ? HOSPITAL_NAME_FA : HOSPITAL_NAME_EN;
    const hospitalAddress = lang === 'fa' ? ADDRESS_FA : ADDRESS_EN;
    const displayPhone = lang === 'fa' ? HOSPITAL_CENTRAL_PHONE_FA : HOSPITAL_CENTRAL_PHONE;

    // ─── Effects ─────────────────────────────────────────────────────────────
    useEffect(() => {
        if (pageRef.current) {
            pageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isInPerson, flowState]);

    // ─── Event Handlers ──────────────────────────────────────────────────────
    const handleModeChange = useCallback((mode: VisitMode) => {
        setSearchParams({ type: mode });
        setFlowState('form');
        setBookingData(null);
        setBookingResponse(null);
    }, [setSearchParams]);

    const handleBookingSuccess = useCallback((response: IBookingResponse, data: IBookingRequest) => {
        setBookingResponse(response);
        setBookingData(data);
        setFlowState('success');
    }, []);

    const handleBookingError = useCallback((response: IBookingResponse) => {
        console.error('[BookingPage] Booking failed:', response);
    }, []);

    const handleReset = useCallback(() => {
        setFlowState('form');
        setBookingData(null);
        setBookingResponse(null);
    }, []);

    // ─── Render Logic: In-Person Mode ────────────────────────────────────────
    if (isInPerson) {
        return (
            <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                            <Building2 className="w-4 h-4 text-primary" aria-hidden="true" />
                            <span className="text-sm font-semibold text-primary">{t('booking_in_person_badge')}</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
                            {t('booking_in_person_title')}
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {t('booking_in_person_desc')}
                        </p>
                    </div>

                    <div className="bg-card border border-border/80 rounded-3xl shadow-lg overflow-hidden">
                        <div className="bg-primary/5 p-6 sm:p-8 border-b border-border/60">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shrink-0 shadow-sm">
                                    <Building2 className="w-8 h-8" aria-hidden="true" />
                                </div>
                                <div className="flex-1 text-center sm:text-start">
                                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                                        {hospitalName}
                                    </h2>
                                    <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                                        <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                                        {t('booking_hospital_department')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a
                                    href={`tel:${HOSPITAL_CENTRAL_PHONE}`}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-success/10 text-success group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">{t('booking_contact_reception')}</p>
                                        <p className="text-lg font-bold text-foreground font-mono" dir="ltr">{displayPhone}</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                                        <Clock className="w-6 h-6" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">{t('booking_reception_hours_label')}</p>
                                        <p className="text-sm font-semibold text-foreground">{t('booking_reception_hours_val')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-muted/30 border border-border/60">
                                <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{hospitalAddress}</span>
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <a
                                    href={HOSPITAL_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 ease-in-out"
                                >
                                    <ExternalLink className="w-5 h-5 shrink-0" aria-hidden="true" />
                                    <span>{t('booking_hospital_portal_btn')}</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => handleModeChange('online')}
                                    className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl bg-background border border-border text-foreground font-semibold hover:bg-muted active:scale-[0.98] transition-all duration-300 ease-in-out cursor-pointer"
                                >
                                    <CalendarCheck className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                                    <span>{t('booking_want_online_btn')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Render Logic: Online Mode (Default) ─────────────────────────────────
    return (
        <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
            <section className="relative overflow-hidden border-b border-border/60">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
                    <div className="flex justify-center mb-5 sm:mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                            <Shield className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                            <span className="text-xs sm:text-sm font-semibold text-primary">{t('booking_secure_badge')}</span>
                        </div>
                    </div>

                    <div className="text-center space-y-3 sm:space-y-4">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                            {flowState === 'form' ? (
                                <>
                                    {t('booking_hero_online_prefix')}{' '}
                                    <span className="text-primary">{t('booking_hero_online_highlight')}</span>
                                </>
                            ) : (
                                <>
                                    {t('booking_hero_confirmed_prefix')}{' '}
                                    <span className="text-success">{t('booking_hero_confirmed_highlight')}</span>
                                </>
                            )}
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {flowState === 'form'
                                ? t('booking_online_desc')
                                : t('booking_registered_desc')
                            }
                        </p>
                    </div>

                    {flowState === 'form' && (
                        <div className="flex justify-center mt-6 sm:mt-8 w-full">
                            <div className="inline-flex w-full sm:w-auto p-1 rounded-2xl bg-muted/80 border border-border/60 shadow-xs">
                                <button
                                    type="button"
                                    onClick={() => handleModeChange('online')}
                                    className={`flex-1 sm:flex-initial min-h-[48px] px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out active:scale-95 cursor-pointer ${
                                        isOnline
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Stethoscope className="w-4 h-4 text-primary shrink-0" />
                                        <span>{t('booking_tab_online')}</span>
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleModeChange('in-person')}
                                    className={`flex-1 sm:flex-initial min-h-[48px] px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out active:scale-95 cursor-pointer ${
                                        isInPerson
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Building2 className="w-4 h-4 text-primary shrink-0" />
                                        <span>{t('booking_tab_inperson')}</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14">
                {flowState === 'form' && (
                    <div className="animate-fadeIn">
                        <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-border/60">
                                <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 text-primary shrink-0">
                                    <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                                </div>
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-heading font-bold text-foreground">
                                        {t('booking_form_title')}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {t('booking_form_subtitle')}
                                    </p>
                                </div>
                            </div>

                            <BookingForm
                                onSuccess={handleBookingSuccess}
                                onError={handleBookingError}
                            />
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                                <Heart className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{t('booking_confidential_title')}</p>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        {t('booking_confidential_desc')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{t('booking_fast_title')}</p>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        {t('booking_fast_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {flowState === 'success' && (
                    <div className="animate-fadeIn">
                        {bookingData && bookingResponse ? (
                            <BookingSuccess
                                bookingResponse={bookingResponse}
                                bookingData={bookingData}
                                onReset={handleReset}
                            />
                        ) : (
                            <div className="p-8 text-center bg-card rounded-3xl border border-border">
                                <p className="text-muted-foreground mb-4">{t('booking_not_found')}</p>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    {t('booking_back_to_form')}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {flowState === 'form' && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="rounded-3xl bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/20 p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <MessageCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                                <div>
                                    <h3 className="text-base sm:text-lg font-heading font-bold text-foreground">
                                        {t('booking_help_title')}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {t('booking_help_desc')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                                <a
                                    href={`https://wa.me/${CLINIC_WHATSAPP}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-initial min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-success text-success-foreground text-sm font-semibold hover:shadow-md hover:scale-[1.01] active:scale-95 transition-all duration-300 ease-in-out"
                                >
                                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                                    <span>{t('booking_whatsapp_btn')}</span>
                                </a>

                                <a
                                    href={`tel:${HOSPITAL_CENTRAL_PHONE}`}
                                    className="flex-1 sm:flex-initial min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95 transition-all duration-300 ease-in-out font-mono"
                                >
                                    <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                                    <span>{t('booking_call_btn')}</span>
                                </a>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-4 text-center sm:text-start flex items-center justify-center sm:justify-start gap-1">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{t('booking_working_hours')}</span>
                        </p>
                    </div>
                </section>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
            `}</style>
        </div>
    );
};

export default BookingPage;
