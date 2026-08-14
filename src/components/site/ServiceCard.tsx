import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  HeartHandshake, 
  Users, 
  Baby, 
  CloudRain, 
  Wind, 
  ArrowRight,
  Sparkles,
  Brain,
  Moon,
  Activity
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';

interface ServiceCardProps {
  icon: string;
  title: string;
  desc: string;
  serviceKey: string;
  compact?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  desc,
  serviceKey,
  compact = false
}) => {
  const { t, isRTL } = useLanguage();

  const getIcon = (name: string) => {
    switch (name) {
      case 'CloudRain':
        return <CloudRain className="w-5 h-5" />;
      case 'Wind':
        return <Wind className="w-5 h-5" />;
      case 'Brain':
        return <Brain className="w-5 h-5" />;
      case 'Baby':
        return <Baby className="w-5 h-5" />;
      case 'Moon':
        return <Moon className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="group h-full rounded-2xl bg-card border border-border/70 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/40 flex flex-col justify-between">
      <div>
        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 shadow-2xs">
          {getIcon(icon)}
        </div>
        <h3 className="font-heading font-bold text-foreground text-base sm:text-lg mb-1.5 group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border/50">
        <Link
          to="/panel"
          state={{ service: serviceKey }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary transition-all hover:gap-2"
        >
          <span>{t('book_this_service')}</span>
          <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    </div>
  );
};
