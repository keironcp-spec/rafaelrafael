import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, ChevronDown, Check, 
  MessageSquare, Shield, Users, Zap, BarChart3, 
  Lock, Clock, Send, FileText, Layers, Globe,
  TrendingUp, HeadphonesIcon, RefreshCw, Dices,
  Gamepad2, Heart, Building2, LayoutDashboard,
  UserPlus, StickyNote, ArrowRight, ChevronRight
} from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import './index.css';

// Header Component
const Header = () => {
  const { isDark, toggleTheme, accentColor, setAccentColor, accentColors } = useTheme();
  const { t, language, changeLanguage, languages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showLangs, setShowLangs] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-card !rounded-none border-x-0 border-t-0' : ''
        }`}
        style={{ background: isScrolled ? 'var(--glass-bg)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, var(--clr-accent) 100%)` }}>
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Outfit' }}>OnlyCRM</span>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo('features')} className="text-sm font-medium text-[var(--clr-text-muted)] hover:text-[var(--clr-text)] transition-colors">
                {t('nav.features')}
              </button>
              <button onClick={() => scrollTo('pricing')} className="text-sm font-medium text-[var(--clr-text-muted)] hover:text-[var(--clr-text)] transition-colors">
                {t('nav.pricing')}
              </button>
              <button onClick={() => scrollTo('guide')} className="text-sm font-medium text-[var(--clr-text-muted)] hover:text-[var(--clr-text)] transition-colors">
                {t('nav.guide')}
              </button>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-[var(--clr-primary)] transition-colors"
                data-testid="theme-toggle"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* Color picker */}
              <div className="relative hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowColors(!showColors)}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-[var(--clr-primary)] transition-colors"
                  data-testid="color-picker-btn"
                >
                  <div className="w-5 h-5 rounded-full" style={{ background: accentColor }} />
                </motion.button>
                <AnimatePresence>
                  {showColors && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-12 right-0 glass-card p-3 min-w-[140px]"
                    >
                      <div className="grid grid-cols-3 gap-2">
                        {accentColors.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => { setAccentColor(color.value); setShowColors(false); }}
                            className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                            style={{ background: color.value }}
                          >
                            {accentColor === color.value && <Check className="w-4 h-4 text-white" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language picker */}
              <div className="relative hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLangs(!showLangs)}
                  className="h-10 px-3 rounded-full glass-card flex items-center gap-2 hover:border-[var(--clr-primary)] transition-colors text-sm"
                  data-testid="language-picker-btn"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{language}</span>
                  <ChevronDown className="w-3 h-3" />
                </motion.button>
                <AnimatePresence>
                  {showLangs && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-12 right-0 glass-card p-2 min-w-[160px]"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { changeLanguage(lang.code); setShowLangs(false); }}
                          className="w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm">{lang.name}</span>
                          {language === lang.code && <Check className="w-4 h-4 ml-auto text-[var(--clr-primary)]" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Try Free Button */}
              <motion.a
                href="https://onlycrm.tech/auth/register"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:flex btn-primary text-sm !py-2.5 !px-5"
                data-testid="try-free-btn"
              >
                {t('nav.tryFree')}
              </motion.a>

              {/* Login Button */}
              <motion.a
                href="https://onlycrm.tech/login"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden lg:flex btn-secondary text-sm !py-2.5 !px-5"
                data-testid="login-btn"
              >
                {t('nav.login')}
              </motion.a>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 rounded-full glass-card flex items-center justify-center"
                data-testid="mobile-menu-btn"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-main)]"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, var(--clr-accent) 100%)` }}>
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold" style={{ fontFamily: 'Outfit' }}>OnlyCRM</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mb-8">
                <button onClick={() => scrollTo('features')} className="text-lg font-medium py-3 text-left">
                  {t('nav.features')}
                </button>
                <button onClick={() => scrollTo('pricing')} className="text-lg font-medium py-3 text-left">
                  {t('nav.pricing')}
                </button>
                <button onClick={() => scrollTo('guide')} className="text-lg font-medium py-3 text-left">
                  {t('nav.guide')}
                </button>
              </nav>

              <div className="flex flex-col gap-3">
                <a href="https://onlycrm.tech/auth/register" target="_blank" rel="noopener noreferrer" className="btn-primary text-center">
                  {t('nav.tryFree')}
                </a>
                <a href="https://onlycrm.tech/login" target="_blank" rel="noopener noreferrer" className="btn-secondary text-center">
                  {t('nav.login')}
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-[var(--glass-border)]">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-[var(--clr-text-muted)]">Тема:</span>
                  <button onClick={toggleTheme} className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span className="text-sm">{isDark ? 'Светлая' : 'Тёмная'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-[var(--clr-text-muted)]">Цвет:</span>
                  <div className="flex gap-2">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setAccentColor(color.value)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: color.value }}
                      >
                        {accentColor === color.value && <Check className="w-3 h-3 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[var(--clr-text-muted)]">Язык:</span>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`px-3 py-1.5 rounded-full text-sm ${language === lang.code ? 'bg-[var(--clr-primary)] text-white' : 'glass-card'}`}
                      >
                        {lang.flag} {lang.code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section
const HeroSection = () => {
  const { t } = useLanguage();
  const { accentColor } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="hero-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
            <span className="text-sm font-medium">{t('hero.badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Outfit' }}
          >
            {t('hero.title').split(' ').map((word, i) => (
              <span key={i} className={i % 3 === 1 ? 'gradient-text' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-[var(--clr-text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="https://onlycrm.tech/auth/register"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
              data-testid="hero-cta-btn"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              {t('hero.ctaSecondary')}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 md:mt-20"
          >
            <div className="glass-card p-2 md:p-4 rounded-2xl md:rounded-3xl">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/990764/2026-02-26/af845e5d-d568-45d9-b7b2-7b3e750c1225.png" 
                  alt="OnlyCRM Dashboard"
                  className="w-full h-auto rounded-xl md:rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass-card glass-card-hover p-6 md:p-8"
  >
    <div className="feature-icon mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit' }}>{title}</h3>
    <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed">{desc}</p>
  </motion.div>
);

// Features Section
const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    { key: 'accounts', icon: Layers },
    { key: 'dialogs', icon: MessageSquare },
    { key: 'analytics', icon: BarChart3 },
    { key: 'security', icon: Shield },
    { key: 'team', icon: Users },
    { key: 'automation', icon: Zap },
    { key: 'crm', icon: FileText },
    { key: 'mass', icon: Send },
    { key: 'history', icon: Clock },
  ];

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>
            {t('features.title')}
          </h2>
          <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.key}
              icon={feature.icon}
              title={t(`features.items.${feature.key}.title`)}
              desc={t(`features.items.${feature.key}.desc`)}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Who Needs Section
const WhoNeedsSection = () => {
  const { t } = useLanguage();
  
  const items = [
    { key: 'gambling', icon: Dices },
    { key: 'igaming', icon: Gamepad2 },
    { key: 'adult', icon: Heart },
    { key: 'agencies', icon: Building2 },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>
            {t('whoNeeds.title')}
          </h2>
          <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
            {t('whoNeeds.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card glass-card-hover p-6 md:p-8 flex items-start gap-4"
            >
              <div className="feature-icon flex-shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit' }}>
                  {t(`whoNeeds.items.${item.key}.title`)}
                </h3>
                <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed">
                  {t(`whoNeeds.items.${item.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Section
const WhyChooseSection = () => {
  const { t } = useLanguage();
  
  const items = [
    { key: 'security', icon: Lock },
    { key: 'performance', icon: TrendingUp },
    { key: 'support', icon: HeadphonesIcon },
    { key: 'updates', icon: RefreshCw },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>
            {t('whyChoose.title')}
          </h2>
          <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
            {t('whyChoose.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card glass-card-hover p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" 
                     style={{ background: 'rgba(100, 69, 178, 0.15)' }}>
                  <item.icon className="w-6 h-6 text-[var(--clr-primary)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit' }}>
                    {t(`whyChoose.items.${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed">
                    {t(`whyChoose.items.${item.key}.desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Metrics Section
const MetricsSection = () => {
  const { t } = useLanguage();
  const { accentColor } = useTheme();
  
  const metrics = ['users', 'messages', 'accounts', 'uptime'];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>
            {t('metrics.title')}
          </h2>
          <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
            {t('metrics.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 text-center"
            >
              <div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                style={{ fontFamily: 'Outfit', color: accentColor }}
              >
                {t(`metrics.items.${key}.value`)}
              </div>
              <div className="text-sm text-[var(--clr-text-muted)]">
                {t(`metrics.items.${key}.label`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const { t } = useLanguage();
  const { accentColor } = useTheme();
  const plans = ['free', 'monthly', 'quarterly'];

  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>
            {t('pricing.title')}
          </h2>
          <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`glass-card glass-card-hover p-6 md:p-8 relative ${plan === 'monthly' ? 'ring-2' : ''}`}
              style={{ '--tw-ring-color': plan === 'monthly' ? accentColor : 'transparent' }}
            >
              {plan === 'monthly' && (
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${accentColor} 0%, var(--clr-accent) 100%)` }}
                >
                  Популярный
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Outfit' }}>
                  {t(`pricing.${plan}.name`)}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Outfit', color: accentColor }}>
                    {t(`pricing.${plan}.price`)}
                  </span>
                </div>
                <p className="text-sm text-[var(--clr-text-muted)] mt-1">
                  {t(`pricing.${plan}.period`)}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {t(`pricing.${plan}.features`).map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="https://onlycrm.tech/auth/register"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block text-center w-full py-3 px-6 rounded-full font-semibold transition-all ${
                  plan === 'monthly' 
                    ? 'text-white shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
                style={plan === 'monthly' ? { background: `linear-gradient(135deg, ${accentColor} 0%, var(--clr-accent) 100%)` } : {}}
                data-testid={`pricing-${plan}-btn`}
              >
                {t(`pricing.${plan}.cta`)}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Guide Section
const GuideSection = () => {
  const { t } = useLanguage();
  const { accentColor } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isExpanded, setIsExpanded] = useState(false);

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard },
    { id: 'dialogs', icon: MessageSquare },
    { id: 'accounts', icon: Layers },
    { id: 'employees', icon: UserPlus },
    { id: 'notes', icon: StickyNote },
  ];

  const guideContent = {
    dashboard: {
      title: 'Дашборд — Центр управления',
      content: 'Дашборд — это главная панель управления OnlyCRM, которая предоставляет полный обзор вашей деятельности в реальном времени. Здесь вы найдёте финансовую статистику, аналитику сообщений, структуру диалогов и активность команды.',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/990764/2026-02-26/af845e5d-d568-45d9-b7b2-7b3e750c1225.png'
    },
    dialogs: {
      title: 'Диалоги — Центр коммуникации',
      content: 'Раздел «Диалоги» — это сердце OnlyCRM, где происходит вся коммуникация с клиентами. Здесь вы управляете перепиской, ведёте финансовый учёт по каждому контакту, храните заметки и просматриваете обмен файлами.',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/990764/2026-02-26/a5bc1d6b-7b12-4ec1-891b-6b6bd6c81467.png'
    },
    accounts: {
      title: 'Аккаунты — Управление Telegram',
      content: 'Раздел «Аккаунты» отвечает за подключение и управление вашими Telegram-аккаунтами в OnlyCRM. Система поддерживает подключение нескольких аккаунтов одновременно с полной безопасностью.',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/990764/2026-02-26/cb6f2f65-dff4-45e1-978d-dd4a7cea5716.png'
    },
    employees: {
      title: 'Сотрудники — Управление командой',
      content: 'Раздел «Сотрудники» предназначен для владельцев агентств и менеджеров. Здесь вы можете добавлять новых сотрудников, назначать им роли и аккаунты, отслеживать их активность.',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/990764/2026-02-26/ddba6307-92c0-44b2-9923-db3448b7e802.png'
    },
    notes: {
      title: 'Заметки — Персональное пространство',
      content: 'Раздел «Заметки» — это ваше личное рабочее пространство для хранения любой важной информации, не привязанной к конкретному контакту. Идеально для шаблонов, планов и инструкций.',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/990764/2026-02-26/9ac90e4f-7894-4e13-958f-a93cef02d755.png'
    }
  };

  return (
    <section id="guide" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>
            {t('guide.title')}
          </h2>
          <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
            {t('guide.subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-2 rounded-2xl mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'text-white' 
                    : 'text-[var(--clr-text-muted)] hover:text-[var(--clr-text)] hover:bg-white/5'
                }`}
                style={activeTab === tab.id ? { background: `linear-gradient(135deg, ${accentColor} 0%, var(--clr-accent) 100%)` } : {}}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-medium">{t(`guide.tabs.${tab.id}.label`)}</div>
                  <div className="text-xs opacity-70 hidden sm:block">{t(`guide.tabs.${tab.id}.sub`)}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 md:p-10 relative overflow-hidden"
          >
            <div className={`transition-all duration-500 ${!isExpanded ? 'max-h-[600px] overflow-hidden' : ''}`}>
              <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>
                {guideContent[activeTab].title}
              </h3>
              <p className="text-[var(--clr-text-muted)] mb-8 leading-relaxed">
                {guideContent[activeTab].content}
              </p>
              
              <div className="rounded-xl overflow-hidden border border-[var(--glass-border)]">
                <img 
                  src={guideContent[activeTab].image}
                  alt={guideContent[activeTab].title}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              {isExpanded && (
                <div className="mt-8 space-y-6">
                  <div className="glass-card p-6 rounded-xl" style={{ background: 'rgba(100, 69, 178, 0.1)', borderColor: 'rgba(100, 69, 178, 0.2)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(196, 181, 253, 0.9)' }}>
                      <strong style={{ color: '#c4b5fd' }}>💡 Совет: </strong>
                      Регулярно анализируйте данные в этом разделе для оптимизации вашей работы и повышения эффективности команды.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-surface)] to-transparent flex items-end justify-center pb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsExpanded(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <ChevronDown className="w-5 h-5" />
                  {t('guide.expand')}
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// Social Section
const SocialSection = () => {
  const { t } = useLanguage();
  const { accentColor } = useTheme();

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>
            {t('social.title')}
          </h2>
          <p className="text-[var(--clr-text-muted)] mb-8 max-w-xl mx-auto">
            {t('social.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://t.me/onlycrm"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Send className="w-5 h-5" />
              {t('social.telegram')}
            </motion.a>
            <motion.a
              href="https://t.me/onlycrm_support"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <HeadphonesIcon className="w-5 h-5" />
              {t('social.support')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { t } = useLanguage();
  const { accentColor } = useTheme();

  return (
    <footer className="py-12 border-t border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, var(--clr-accent) 100%)` }}>
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: 'Outfit' }}>OnlyCRM</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-[var(--clr-text-muted)]">
            <a href="#" className="hover:text-[var(--clr-text)] transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-[var(--clr-text)] transition-colors">{t('footer.terms')}</a>
          </div>
          
          <p className="text-sm text-[var(--clr-text-muted)]">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      <div className="noise-overlay" />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhoNeedsSection />
        <WhyChooseSection />
        <MetricsSection />
        <PricingSection />
        <GuideSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
};

// App Component
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
