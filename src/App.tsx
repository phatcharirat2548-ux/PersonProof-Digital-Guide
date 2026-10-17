/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { CategoriesSection } from './components/CategoriesSection';
import { WorkflowSection } from './components/WorkflowSection';
import { ChecklistSection } from './components/ChecklistSection';
import { ReferenceSection } from './components/ReferenceSection';
import { SOPDetailModal } from './components/SOPDetailModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { TabType, SOPItem } from './types';
import { SOP_ITEMS } from './data/forensicData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedSOP, setSelectedSOP] = useState<SOPItem | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedCategoryForCatalog, setSelectedCategoryForCatalog] = useState<string | null>(null);
  const [selectedStageForWorkflow, setSelectedStageForWorkflow] = useState<string | undefined>(undefined);
  
  // Font size scaling state ('normal' | 'large' | 'xlarge')
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Bookmarked SOP IDs in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('personproof_bookmarks');
      return saved ? JSON.parse(saved) : ['lp-01', 'bio-01'];
    } catch {
      return ['lp-01', 'bio-01'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('personproof_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectCategoryFromHome = (categoryId: string) => {
    setSelectedCategoryForCatalog(categoryId);
    setCurrentTab('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateFromSearch = (tab: TabType, extraId?: string) => {
    if (tab === 'workflow' && extraId) {
      setSelectedStageForWorkflow(extraId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChecklistForCategory = (categoryId: string) => {
    setCurrentTab('checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Font size modifier class
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-[1.05rem]';
      case 'xlarge':
        return 'text-[1.15rem]';
      default:
        return 'text-base';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-800 ${getFontSizeClass()} selection:bg-sky-500 selection:text-white`}>
      
      {/* 1. Official Prototype Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 2. Official Header with Navigation, Search Trigger, Font Sizing */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'categories') {
            setSelectedCategoryForCatalog(null);
          }
          setCurrentTab(tab);
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        savedBookmarkCount={bookmarkedIds.length}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-12">
        {currentTab === 'home' && (
          <HomeSection
            onSelectTab={setCurrentTab}
            onOpenSearch={() => setSearchModalOpen(true)}
            onSelectCategory={handleSelectCategoryFromHome}
            onSelectSOP={(sop) => setSelectedSOP(sop)}
            savedBookmarkCount={bookmarkedIds.length}
          />
        )}

        {currentTab === 'categories' && (
          <CategoriesSection
            key={selectedCategoryForCatalog || 'all'}
            initialCategoryId={selectedCategoryForCatalog}
            onSelectSOP={(sop) => setSelectedSOP(sop)}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'workflow' && (
          <WorkflowSection
            onNavigateTab={setCurrentTab}
            selectedStageId={selectedStageForWorkflow}
          />
        )}

        {currentTab === 'checklist' && (
          <ChecklistSection />
        )}

        {currentTab === 'references' && (
          <ReferenceSection />
        )}
      </main>

      {/* 4. Institutional Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* 5. SOP Detail Modal View */}
      {selectedSOP && (
        <SOPDetailModal
          item={selectedSOP}
          onClose={() => setSelectedSOP(null)}
          isBookmarked={bookmarkedIds.includes(selectedSOP.id)}
          onToggleBookmark={handleToggleBookmark}
          onOpenChecklistForCategory={handleOpenChecklistForCategory}
        />
      )}

      {/* 6. Global Search Overlay Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSOP={(sop) => setSelectedSOP(sop)}
        onNavigateTab={handleNavigateFromSearch}
      />

    </div>
  );
}
