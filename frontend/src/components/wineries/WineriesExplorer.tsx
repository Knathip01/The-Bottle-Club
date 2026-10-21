'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  WINERIES_DATA,
  Winery,
  COUNTRIES_FACET,
} from '@/data/wineriesData';
import { SPANISH_WINERY_LISTINGS } from '@/data/spanishWineryListings';
import { UNITED_STATES_WINERY_LISTINGS } from '@/data/unitedStatesWineryListings';
import { AUSTRALIAN_WINERY_LISTINGS } from '@/data/australianWineryListings';

// Vivino Partner Badge Shield-Check SVG Component
function VivinoPartnerBadge() {
  const rawId = React.useId();
  const gradId = 'badgeGrad_' + rawId.replace(/:/g, '_');
  return (
    <span data-testid="partnerBadge" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z"
          fill={`url(#${gradId})`}
        />
        <defs>
          <linearGradient id={gradId} x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EE803E" />
            <stop offset="1" stopColor="#BA1628" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

// Vivino Star Rating Icons Component
function FilterStars({ score }: { score: number }) {
  // score is 4.2, 3.8, or 3.6
  const stars = [1, 2, 3, 4, 5];
  return (
    <div
      role="img"
      aria-label={`Rated ${score} stars`}
      className="rating-module__rating--1E0Fn filterByRating__rating--1B51-"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}
    >
      {stars.map((starIdx) => {
        const fillAmount = Math.max(0, Math.min(1, score - (starIdx - 1)));
        const gradId = `starGrad_${score}_${starIdx}`;

        return (
          <svg key={starIdx} width="17" height="17" viewBox="0 0 24 24" fill={`url(#${gradId})`} stroke="#e6a100" strokeWidth="0.5">
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${fillAmount * 100}%`} stopColor="#e6a100" />
                <stop offset={`${fillAmount * 100}%`} stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11 1 3.09 6.26L21 8.27l-5 4.87 1.18 6.88L11 16.77l-6.18 3.25L6 13.14 1 8.27l6.91-1.01L11 1Z"
            />
          </svg>
        );
      })}
    </div>
  );
}

const ALLOWED_COUNTRY_CODES = ['fr', 'it', 'es', 'us', 'au', 'de'];
const addedCountryListings = [...SPANISH_WINERY_LISTINGS, ...UNITED_STATES_WINERY_LISTINGS, ...AUSTRALIAN_WINERY_LISTINGS];
const addedListingsBySlug = new Map(addedCountryListings.map((winery) => [winery.seo_name, winery]));
const existingWinerySlugs = new Set(WINERIES_DATA.map((winery) => winery.seo_name));
const rawExplorerData: Winery[] = [
  ...WINERIES_DATA.map((winery) => {
    const listing = addedListingsBySlug.get(winery.seo_name);
    return listing ? { ...winery, ...listing, id: winery.id, wines: winery.wines } : winery;
  }),
  ...addedCountryListings.filter((winery) => !existingWinerySlugs.has(winery.seo_name)),
];

const seenExplorerSlugs = new Set<string>();
const WINERIES_EXPLORER_DATA: Winery[] = rawExplorerData.filter((winery) => {
  const slug = winery.seo_name.toLowerCase();
  if (seenExplorerSlugs.has(slug)) return false;
  seenExplorerSlugs.add(slug);
  return true;
});
const SPAIN_RANKED_ORDER = SPANISH_WINERY_LISTINGS.map((winery) => winery.seo_name.toLowerCase());
const UNITED_STATES_RANKED_ORDER = UNITED_STATES_WINERY_LISTINGS.map((winery) => winery.seo_name.toLowerCase());
const AUSTRALIA_RANKED_ORDER = AUSTRALIAN_WINERY_LISTINGS.map((winery) => winery.seo_name.toLowerCase());

export default function WineriesExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCountry =
    searchParams.get('country_codes[]') ||
    searchParams.get('country_codes%5B%5D') ||
    searchParams.get('country_codes') ||
    searchParams.get('country');

  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) || 1 : 1;

  // Filter States
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    initialCountry ? [initialCountry.toLowerCase()] : []
  );
  // Search filter inputs
  const [searchCountry, setSearchCountry] = useState('');

  // Expand / collapse section states
  const [expandedSections, setExpandedSections] = useState({
    rating: true,
    countries: true,
  });

  // Show more states
  const [showMoreCountries, setShowMoreCountries] = useState(false);

  // Pagination state (25 items per page to show all 25 wineries directly on page 1)
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 25;

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', pageNum.toString());
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCountry = (code: string) => {
    setSelectedCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
    handlePageChange(1);
  };

  // Sync URL search parameters (e.g. ?country_codes[]=fr&page=2)
  useEffect(() => {
    const cParam =
      searchParams.get('country_codes[]') ||
      searchParams.get('country_codes%5B%5D') ||
      searchParams.get('country_codes') ||
      searchParams.get('country');

    if (cParam) {
      setSelectedCountries([cParam.toLowerCase()]);
      setExpandedSections((prev) => ({ ...prev, countries: true }));
    }

    const pParam = searchParams.get('page');
    if (pParam) {
      const p = parseInt(pParam, 10);
      if (!isNaN(p) && p > 0) {
        setCurrentPage(p);
      }
    }
  }, [searchParams]);

  // Filtered Wineries Logic
  const filteredWineries = useMemo(() => {
    const list = WINERIES_EXPLORER_DATA.filter((winery) => {
      // Must belong to one of the 6 allowed countries
      if (!ALLOWED_COUNTRY_CODES.includes(winery.country_code.toLowerCase())) {
        return false;
      }

      // Rating filter
      if (selectedRating !== null && winery.ratings_average < selectedRating) {
        return false;
      }

      // Country filter
      if (
        selectedCountries.length > 0 &&
        !selectedCountries.includes(winery.country_code.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // If filtered by France specifically and no sub-filters, ensure exact Vivino ranking order
    if (selectedCountries.length === 1 && selectedCountries[0].toLowerCase() === 'fr') {
      const frOrder = [
        // Page 1 (1 - 25)
        'm-chapoutier', 'veuve-clicquot', 'moet-chandon', 'dom-perignon', 'ruinart',
        'chateau-d-esclans', 'laroche', 'minuty', 'nicolas-feuillatte', 'cos-d-estournel',
        'miraval', 'xavier-vignon', 'krug', 'piper-heidsieck', 'sieur-d-arques',
        'chateau-cheval-blanc', 'vignerons-de-buxy', 'la-perriere-loire-valley', 'joseph-mellot',
        'bouvet-ladubay', 'maison-saint-aix', 'maison-champy', 'figuiere-famille-combard',
        'mythique', 'champagne-lallier',
        // Page 2 (26 - 50)
        'la-burgondie', 'chateau-sainte-marguerite-cotes-de-provence', 'famille-de-lorgeril',
        'chateau-de-pennautier', 'villebois', 'mercier', 'castelnau', 'domaine-joblot',
        'champagne-haton', 'chateau-gort-gort', 'chateau-de-la-dauphine', 'armand-de-brignac',
        'domaine-de-la-croix', 'nomine-renard', 'abele-1757', 'millebuis',
        'stanzinger-wines-chateau-la-faviere', 'champagne-telmont', 'avaline',
        'chateau-meaume', 'chateau-de-ciffre', 'champagne-a-j-demiere', 'chateau-galoupet',
        'chateau-clarisse', 'favori',
        // Page 3 (51 - 67)
        'chateau-margui', 'domaine-sainte-marie', 'domaine-de-la-borie-blanche',
        'rumor-cotes-de-provence', 'chateau-de-mille', 'domaine-bleger-claude-et-christophe',
        'domaine-du-bourrian', 'bargemone', 'les-glories-cremant-de-loire',
        'chateau-camp-del-saltre', 'chateau-maine-gazin', 'agrapart-avize',
        'clos-de-caille', 'domaine-belle-d-argence', 'alenti', 'u-weini',
        'flying-whale-wine'
      ];
      return [...list].sort((a, b) => {
        const idxA = frOrder.indexOf(a.seo_name.toLowerCase());
        const idxB = frOrder.indexOf(b.seo_name.toLowerCase());
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }

    // If filtered by Italy specifically, ensure exact Vivino ranking order
    if (selectedCountries.length === 1 && selectedCountries[0].toLowerCase() === 'it') {
      const itOrder = [
        // Page 1 (1 - 25)
        'san-marzano', 'piccini', 'ornellaia', 'tinazzi', 'planeta',
        'g-d-vajra', 'zonin', 'epicuro', 'santa-margherita', 'frescobaldi',
        'castello-nipozzano', 'masca-del-tacco', 'tenuta-castelgiocondo', 'tenuta-luce', 'avignonesi',
        'astrale', 'brancaia', 'nativ', 'scaia', 'alois-lageder',
        'albino-armani', 'guido-berlucchi', 'cantele', 'stella-rosa', 'tenuta-castiglioni',
        // Page 2 (26 - 50)
        'geografico', 'castello-di-albola', 'villa-sandi', 'gran-appasso', 'buglioni',
        'verrazzano', 'cantine-paradiso', 'masseria-trajone', 'michele-satta', 'masseto',
        'tenuta-ammiraglia', 'castello-del-poggio', 'castello-pomino', 'tator', 'cignomoro',
        'valiano', 'castello-del-terriccio', 'palagetto', 'ca-bolani', 'cantine-volpi',
        'luigi-baudana', 'coppi', 'panizzi', 'torre-mora', 'tenuta-perano',
        // Page 3 (51 - 75)
        'danzante', 'la-pruina', 'fontezoppa', 'in-me', 'tenuta-moraia',
        'monterustico', 'terra-alpina', 'candoni', 'guasti-clemente', 'icario',
        'dacastello', 'puglia-pop', 'belposto', 'le-clivie', 'l-olivella',
        'tenuta-polvaro', 'valpanera', 'podere-la-pace', 'filodivino', 'tenute-tomasella',
        'tenuta-calimaia', 'setriolo', 'sassaia', 'il-ponte', 'la-piemontina',
        // Page 4 (76 - 100)
        'lidia-e-amato', 'terrapremiata', 'riva-de-la-rosa', 'imperiale-winery', 'famiglia-rivetti',
        'torre-bisenzio', 'tenute-maestrale', 'retroterra', 'tenuta-mahtani', 'il-fantone-societa-agricola',
        'tenuta-maryamado', 'tommasi', 'ricasoli', 'vietti', 'argiolas',
        'col-d-orcia', 'cusumano', 'firriato', 'tramin', 'tenuta-il-poggione',
        'zeni', 'mastroberardino', 'poliziano', 'ricossa', 'schola-sarmenti'
      ];
      return [...list].sort((a, b) => {
        const idxA = itOrder.indexOf(a.seo_name.toLowerCase());
        const idxB = itOrder.indexOf(b.seo_name.toLowerCase());
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }

    if (selectedCountries.length === 1 && selectedCountries[0].toLowerCase() === 'es') {
      return [...list].sort((a, b) => {
        const idxA = SPAIN_RANKED_ORDER.indexOf(a.seo_name.toLowerCase());
        const idxB = SPAIN_RANKED_ORDER.indexOf(b.seo_name.toLowerCase());
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }

    if (selectedCountries.length === 1 && selectedCountries[0].toLowerCase() === 'us') {
      return [...list].sort((a, b) => {
        const idxA = UNITED_STATES_RANKED_ORDER.indexOf(a.seo_name.toLowerCase());
        const idxB = UNITED_STATES_RANKED_ORDER.indexOf(b.seo_name.toLowerCase());
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }

    if (selectedCountries.length === 1 && selectedCountries[0].toLowerCase() === 'au') {
      return [...list].sort((a, b) => {
        const idxA = AUSTRALIA_RANKED_ORDER.indexOf(a.seo_name.toLowerCase());
        const idxB = AUSTRALIA_RANKED_ORDER.indexOf(b.seo_name.toLowerCase());
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }

    // If filtered by Germany specifically, ensure exact Vivino ranking order
    if (selectedCountries.length === 1 && selectedCountries[0].toLowerCase() === 'de') {
      const deOrder = ['von-winning', 'dreissigacker', 'gut-hermannsberg'];
      return [...list].sort((a, b) => {
        const idxA = deOrder.indexOf(a.seo_name.toLowerCase());
        const idxB = deOrder.indexOf(b.seo_name.toLowerCase());
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }

    return list;
  }, [
    selectedRating,
    selectedCountries,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredWineries.length / itemsPerPage);
  const displayedWineries = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWineries.slice(start, start + itemsPerPage);
  }, [filteredWineries, currentPage]);

  // Filtered lists for search bars
  const visibleCountries = useMemo(() => {
    const list = COUNTRIES_FACET.filter((c) =>
      c.name.toLowerCase().includes(searchCountry.toLowerCase())
    );
    return showMoreCountries ? list : list.slice(0, 10);
  }, [searchCountry, showMoreCountries]);

  return (
    <div className="MuiContainer-root MuiContainer-maxWidthLg wineryExplorer-module__container--63Av2 vivino-mui-1qsxih2">
      <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3 vivino-mui-v57kt1">
        {/* ========================================================= */}
        {/* LEFT COLUMN: FILTERS SIDEBAR                              */}
        {/* ========================================================= */}
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-lg-4 vivino-mui-12z04l9">
          <div className="filters-module__filters--172A0">
            {/* Results count */}
            {/* Vivino average rating filter */}
            <div className="filterByRating__filterByRating--3ah2K filters-module__filterFirst--2uW4C">
              <fieldset className="filterByRating__inner--1bMg8" data-qa="filterByRating">
                <legend
                  className="filterByRating__header--2zOvS filterByRating__toggleHeader--1cREv"
                  role="button"
                  tabIndex={0}
                  aria-controls="filter-content"
                  aria-expanded={expandedSections.rating}
                  data-testid="filter-toggle-button"
                  onClick={() => toggleSection('rating')}
                >
                  <div className="filterByRating__headingContainer--3zRzs">
                    <h5 className="MuiTypography-root MuiTypography-body1 filterByRating__heading--lW1CC vivino-mui-1g0v4f0-titleExtraLarge">
                      TheBottleClub average rating
                    </h5>
                    <svg
                      className={`MuiSvgIcon-root MuiSvgIcon-fontSizeMedium _3sn-K filterByRating__chevron--2l9y1 ${
                        expandedSections.rating ? 'filterByRating__expanded--2AUDj' : ''
                      } vivino-mui-vubbuv`}
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                        d="M12 16.209a.502.502 0 0 1-.354-.146l-7-7a.502.502 0 0 1 .708-.709L12 15.002l6.646-6.648a.502.502 0 0 1 .708.709l-7 7a.502.502 0 0 1-.354.146"
                      ></path>
                    </svg>
                  </div>
                </legend>

                <div
                  id="filter-content"
                  className={`filterByRating__toggleContainer--3t9RO ${
                    expandedSections.rating ? '' : 'filterByRating__hidden--2arlm'
                  }`}
                  aria-hidden={!expandedSections.rating}
                >
                    {/* 4.2+ */}
                    <label
                      className="filterByRating__item--acHhz"
                      onClick={() => {
                        setSelectedRating(selectedRating === 4.2 ? null : 4.2);
                        setCurrentPage(1);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <label className="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd vivino-mui-1dglx7f-root">
                        <span
                          className={`MuiButtonBase-root PrivateSwitchBase-root MuiRadio-root MuiRadio-colorDefault ${
                            selectedRating === 4.2 ? 'Mui-checked vivino-mui-1tbcd9h-root-root-checked-root' : 'vivino-mui-dimxrt-root-root-root'
                          }`}
                        >
                          <input
                            className="PrivateSwitchBase-input vivino-mui-1m9pwf3"
                            id="4.2"
                            name="rating"
                            type="radio"
                            checked={selectedRating === 4.2}
                            readOnly
                            value="4.2"
                          />
                        </span>
                        <span className="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label vivino-mui-22-label-ref vivino-mui-kpdhrk-label"></span>
                      </label>
                      <FilterStars score={4.2} />
                      <div className="filterByRating__ratingText--3XmLz">4.2+</div>
                    </label>

                    {/* 3.8+ */}
                    <label
                      className="filterByRating__item--acHhz"
                      onClick={() => {
                        setSelectedRating(selectedRating === 3.8 ? null : 3.8);
                        setCurrentPage(1);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <label className="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd vivino-mui-1dglx7f-root">
                        <span
                          className={`MuiButtonBase-root PrivateSwitchBase-root MuiRadio-root MuiRadio-colorDefault ${
                            selectedRating === 3.8 ? 'Mui-checked vivino-mui-1tbcd9h-root-root-checked-root' : 'vivino-mui-dimxrt-root-root-root'
                          }`}
                        >
                          <input
                            className="PrivateSwitchBase-input vivino-mui-1m9pwf3"
                            id="3.8"
                            name="rating"
                            type="radio"
                            checked={selectedRating === 3.8}
                            readOnly
                            value="3.8"
                          />
                        </span>
                        <span className="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label vivino-mui-22-label-ref vivino-mui-kpdhrk-label"></span>
                      </label>
                      <FilterStars score={3.8} />
                      <div className="filterByRating__ratingText--3XmLz">3.8+</div>
                    </label>

                    {/* 3.6+ */}
                    <label
                      className="filterByRating__item--acHhz"
                      onClick={() => {
                        setSelectedRating(selectedRating === 3.6 ? null : 3.6);
                        setCurrentPage(1);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <label className="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd vivino-mui-1dglx7f-root">
                        <span
                          className={`MuiButtonBase-root PrivateSwitchBase-root MuiRadio-root MuiRadio-colorDefault ${
                            selectedRating === 3.6 ? 'Mui-checked vivino-mui-1tbcd9h-root-root-checked-root' : 'vivino-mui-dimxrt-root-root-root'
                          }`}
                        >
                          <input
                            className="PrivateSwitchBase-input vivino-mui-1m9pwf3"
                            id="3.6"
                            name="rating"
                            type="radio"
                            checked={selectedRating === 3.6}
                            readOnly
                            value="3.6"
                          />
                        </span>
                        <span className="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label vivino-mui-22-label-ref vivino-mui-kpdhrk-label"></span>
                      </label>
                      <FilterStars score={3.6} />
                      <div className="filterByRating__ratingText--3XmLz">3.6+</div>
                    </label>

                    {/* Any rating */}
                    <label
                      className="filterByRating__item--acHhz"
                      onClick={() => {
                        setSelectedRating(null);
                        setCurrentPage(1);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <label className="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd vivino-mui-1dglx7f-root">
                        <span
                          className={`MuiButtonBase-root PrivateSwitchBase-root MuiRadio-root MuiRadio-colorDefault ${
                            selectedRating === null ? 'Mui-checked vivino-mui-1tbcd9h-root-root-checked-root' : 'vivino-mui-dimxrt-root-root-root'
                          }`}
                        >
                          <input
                            className="PrivateSwitchBase-input vivino-mui-1m9pwf3"
                            id="1"
                            name="rating"
                            type="radio"
                            checked={selectedRating === null}
                            readOnly
                            value="1"
                          />
                        </span>
                        <span className="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label vivino-mui-22-label-ref vivino-mui-kpdhrk-label"></span>
                      </label>
                      <div className="filterByRating__superlative--2vla9">Any rating</div>
                    </label>
                  </div>
              </fieldset>
            </div>

            {/* 3. Countries filter */}
            <div className="FilterCheckboxes__filterCheckboxes--1-QUm filters-module__filter--xDduJ">
              <fieldset className="FilterCheckboxes__inner--39kxz" name="countries">
                <legend
                  className="FilterCheckboxes__header--2XC75 FilterCheckboxes__toggleHeader--3gtdF"
                  role="button"
                  tabIndex={0}
                  aria-controls="filter-content"
                  aria-expanded={expandedSections.countries}
                  data-testid="filter-toggle-button"
                  onClick={() => toggleSection('countries')}
                >
                  <div className="FilterCheckboxes__headingContainer--1OTeL">
                    <div className="FilterCheckboxes__headingWrapper--3pS-l">
                      <h2 className="MuiTypography-root MuiTypography-body1 vivino-mui-1g0v4f0-titleExtraLarge">
                        Countries
                      </h2>
                    </div>
                    <svg
                      className={`MuiSvgIcon-root MuiSvgIcon-fontSizeMedium _3sn-K FilterCheckboxes__chevron--vBEBK ${
                        expandedSections.countries ? 'FilterCheckboxes__expanded--1ip2Z' : ''
                      } vivino-mui-vubbuv`}
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                        d="M12 16.209a.502.502 0 0 1-.354-.146l-7-7a.502.502 0 0 1 .708-.709L12 15.002l6.646-6.648a.502.502 0 0 1 .708.709l-7 7a.502.502 0 0 1-.354.146"
                      ></path>
                    </svg>
                  </div>
                </legend>

                <div
                  className={`FilterCheckboxes__toggleContainer--38vCR ${
                    expandedSections.countries ? '' : 'FilterCheckboxes__hidden--1uJ60'
                  }`}
                  aria-hidden={!expandedSections.countries}
                >
                    <div>
                      <div
                        aria-label="Search countries"
                        className="MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-adornedStart MuiInputBase-adornedEnd FilterCheckboxes__search--3vmc8 vivino-mui-4878vj-root"
                      >
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium vivino-mui-1ezbgwc-manignifier"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          style={{ fill: 'none', width: '24px', height: '24px' }}
                        >
                          <circle cx="10.588" cy="10.588" r="6.588" stroke="currentColor" strokeWidth="1.882"></circle>
                          <path
                            d="M16.235 16.235 20 20"
                            stroke="currentColor"
                            strokeWidth="1.882"
                            strokeLinecap="round"
                            strokeLinejoin="bevel"
                          ></path>
                        </svg>
                        <input
                          id="filter-checkboxes-search"
                          placeholder="Search countries"
                          type="search"
                          className="MuiInputBase-input MuiInputBase-inputTypeSearch MuiInputBase-inputAdornedStart MuiInputBase-inputAdornedEnd vivino-mui-1kfp1yc-inputTypeSearch"
                          value={searchCountry}
                          onChange={(e) => setSearchCountry(e.target.value)}
                        />
                      </div>
                    </div>

                    <div role="group" aria-label="Filter options">
                      {visibleCountries.map((c) => {
                        const isChecked = selectedCountries.includes(c.code);
                        return (
                          <div key={c.code} className="FilterCheckboxes__checkboxContainer--32N4m">
                            <label
                              className="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd FilterCheckboxes__filterCheckbox--2HkoU vivino-mui-1dglx7f-root"
                              data-testid={`countries_${c.code}`}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleCountry(c.code);
                              }}
                            >
                              <span
                                className={`MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium PrivateSwitchBase-root vivino-mui-1xatpg0-root-root-root ${
                                  isChecked ? 'Mui-checked' : ''
                                }`}
                              >
                                <input
                                  className="PrivateSwitchBase-input vivino-mui-1m9pwf3"
                                  type="checkbox"
                                  checked={isChecked}
                                  readOnly
                                  value={c.code}
                                />
                                {isChecked ? (
                                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="4" fill="#BA1628" />
                                    <path
                                      d="m6 12 4 4 8-8"
                                      stroke="#fff"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : (
                                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="4" fill="#fff" />
                                    <rect
                                      x=".5"
                                      y=".5"
                                      width="23"
                                      height="23"
                                      rx="3.5"
                                      stroke="#BFBFBF"
                                      className="vivino-mui-1lx5h8j-squareIcon vivino-mui-19-squareIcon-ref"
                                    />
                                  </svg>
                                )}
                              </span>
                              <span className="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label vivino-mui-22-label-ref vivino-mui-kpdhrk-label">
                                <span className="FilterCheckboxes__labelWithIcon--O5JmJ">
                                  <span
                                    title={c.name}
                                    className="countryFlag-module__flag--_m0bm filters-module__flagPill--2RR8P"
                                    data-testid={`countryFlag-${c.code}`}
                                    style={{
                                      backgroundImage: `url(https://flagcdn.com/w40/${c.code}.png)`,
                                    }}
                                  ></span>
                                  {c.name}
                                </span>
                              </span>
                            </label>
                          </div>
                        );
                      })}

                      {COUNTRIES_FACET.length > 6 && (
                        <button
                          className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-disableElevation FilterCheckboxes__showMoreAction--MRKZY vivino-mui-1aru4d3-root-themePlain-root-themePlain"
                          tabIndex={0}
                          type="button"
                          data-testid="show-more-button"
                          onClick={() => setShowMoreCountries(!showMoreCountries)}
                        >
                          <span className="vivino-mui-14ngluw-componentChildren">
                            {showMoreCountries ? 'Show less' : 'Show more'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: HEADLINE, CARDS & PAGINATION                 */}
        {/* ========================================================= */}
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-lg-8 MuiGrid2-grid-sm-12 MuiGrid2-grid-xs-12 vivino-mui-uub793">
          {/* Headline wrapper */}
          <div className="wineryExplorer-module__headlineWrapper--1ABay">
            <h1 className="MuiTypography-root MuiTypography-body1 vivino-mui-1jgl903-headlineLarge">
              Discover wineries around the World
            </h1>
            <p className="MuiTypography-root MuiTypography-body1 vivino-mui-dd3lp3-bodyMedium">
              Explore the world’s most captivating wineries. Whether you&apos;re looking for a “winery near me” or planning your next wine country escape, TheBottleClub makes it easy to find wineries that match your taste.
            </p>
          </div>

          {/* Cards List */}
          <div className="pageResults-module__pageResults--3LS4s">
            {displayedWineries.map((winery) => {
              const displayRegion = winery.region_name || winery.address?.city;
              return (
                <div key={winery.id} className="card__card--25az9 wineryCard-module__wineryCard--WGctk">
                  <Link
                    href={`/wineries/${winery.seo_name}`}
                    className="wineryCard-module__cardLink--1UUtJ"
                    data-testid="cardLink"
                    data-mp-id="winery-card:click"
                    data-mp-entity-id={winery.id}
                    data-mp-entity-name={winery.name}
                  >
                    <span id="" data-testid="sentinel"></span>
                    <div className="wineryCard-module__wineryImage--1bZCZ">
                      <img
                        src={winery.cover_image}
                        alt={winery.seo_name}
                        className="wineryCard-module__backgroundImage--2Y4iQ"
                      />
                      {winery.logo_image ? (
                        <img
                          src={winery.logo_image}
                          alt={`${winery.seo_name}_logo`}
                          className="wineryCard-module__wineryLogo---Pwzk"
                        />
                      ) : (
                        <div className="wineryCard-module__defaultWineryLogoContainer---b-YR">
                          <svg
                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium wineryCard-module__defaultWineryLogo--3lEq0 vivino-mui-vubbuv"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                          >
                            <path
                              d="M11.392 22.723c.2.095.3.143.431.167.105.018.25.018.354 0 .132-.024.231-.072.431-.167C14.777 21.692 22 17.854 22 12.5V8.287c0-.773 0-1.159-.123-1.493a2 2 0 0 0-.519-.777c-.262-.242-.618-.39-1.331-.686l-7.414-3.076c-.226-.094-.34-.141-.456-.16a1 1 0 0 0-.314 0c-.117.019-.23.066-.456.16L3.973 5.33c-.713.296-1.07.444-1.331.686a2 2 0 0 0-.519.777C2 7.128 2 7.514 2 8.287V12.5c0 5.354 7.223 9.192 9.392 10.223Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                            <path
                              d="M12 16.9a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8ZM17.5 12.5h-2.2M8.7 12.5H6.5M12 9.2V7M12 18v-2.2"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="wineryCard-module__content--182AW wineryCard-module__partnerContent--22d8F">
                      <div className="wineryCard-module__coreDetails--3SpzI">
                        <div className="wineryCard-module__wineryAndRegion--mituc">
                          <div className="wineryCard-module__wineryNameAndPartner--3a4no">
                            <div className="truncatedText-module__truncatedText--iw6IH truncatedText-module__large--1uIAc truncatedText-module__truncatedText-2--vkCmk">
                              <h2 className="MuiTypography-root MuiTypography-body1 vivino-mui-1g0v4f0-titleExtraLarge">
                                {winery.name}
                              </h2>
                            </div>
                            <VivinoPartnerBadge />
                          </div>
                          <div className="wineryCard-module__region--gZMbF">
                            <span id="" data-testid="sentinel"></span>
                            <span
                              className="countryFlag-module__flag--_m0bm wineryCard-module__countryIcon--QP14T"
                              data-testid={`countryFlag-${winery.country_code.toLowerCase()}`}
                              style={{
                                backgroundImage: `url(https://flagcdn.com/w40/${winery.country_code.toLowerCase()}.png)`,
                              }}
                            ></span>
                            <div className="truncatedText-module__truncatedText--iw6IH truncatedText-module__large--1uIAc truncatedText-module__truncatedText-2--vkCmk wineryCard-module__regionName--mC4Bi">
                              <p className="MuiTypography-root MuiTypography-body1 vivino-mui-dd3lp3-bodyMedium">
                                Winery in {displayRegion}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="wineryStats-module__wineryStats--FK76u wineryStats-module__horizontal--3TNDO">
                            <div className="wineryStats-module__ratingWrapper--18bfQ">
                              <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium vivino-mui-vubbuv"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  fill="#BA1628"
                                  stroke="#BA1628"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="m11 1 3.09 6.26L21 8.27l-5 4.87 1.18 6.88L11 16.77l-6.18 3.25L6 13.14 1 8.27l6.91-1.01L11 1Z"
                                ></path>
                              </svg>
                              <p className="MuiTypography-root MuiTypography-body1 wineryStats-module__ratingText--teYL1 vivino-mui-dd3lp3-bodyMedium">
                                <strong>{winery.ratings_average.toFixed(1)}</strong>{' '}
                                {winery.ratings_count.toLocaleString()} total ratings
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="wineryCard-module__ctas--3_0U8">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push(`/search?q=${encodeURIComponent(winery.name)}`);
                          }}
                          className="wineryCard-module__winesCta--1K1Nq hover:bg-stone-100 transition-colors cursor-pointer"
                          data-testid="winesButton"
                          data-mp-id="winery-card:wines-button"
                          data-mp-entity-id={winery.id}
                          data-mp-entity-name={winery.name}
                        >
                          View wines
                        </button>
                        <div
                          className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-disableElevation wineryCard-module__discoverTheWinery--1x0b8 vivino-mui-1sloeqk-root-themePrimary-root-themePrimary"
                          tabIndex={0}
                          data-mp-id="winery-card:discover-button"
                          data-mp-entity-id={winery.id}
                          data-mp-entity-name={winery.name}
                          data-testid="discoverButton"
                          data-trackingid="buttonPrimary"
                        >
                          <span className="vivino-mui-14ngluw-componentChildren">Discover the Winery</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}

            {displayedWineries.length === 0 && (
              <div className="pageResults-module__noResultsMessage--3Ucut">
                <h2>No wineries match your filter criteria</h2>
                <div>Try clearing or adjusting some filters to explore more wineries.</div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="pagination navigation"
              className="MuiPagination-root MuiPagination-text wineryExplorer-module__pagination--3eTu2 vivino-mui-1tcpznh-root"
            >
              <ul className="MuiPagination-ul vivino-mui-nhb8h9">
                <li>
                  <button
                    className={`MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-previousNext vivino-mui-l2rsv8-root-root ${
                      currentPage === 1 ? 'Mui-disabled' : ''
                    }`}
                    tabIndex={currentPage === 1 ? -1 : 0}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  >
                    <svg
                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiPaginationItem-icon vivino-mui-lrb33l"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="NavigateBeforeIcon"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                    </svg>
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <li key={pageNum}>
                    <button
                      className={`MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-page vivino-mui-l2rsv8-root-root ${
                        pageNum === currentPage ? 'Mui-selected' : ''
                      }`}
                      tabIndex={0}
                      aria-current={pageNum === currentPage ? 'true' : undefined}
                      aria-label={`page ${pageNum}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    className={`MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-previousNext vivino-mui-l2rsv8-root-root ${
                      currentPage === totalPages ? 'Mui-disabled' : ''
                    }`}
                    tabIndex={currentPage === totalPages ? -1 : 0}
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  >
                    <svg
                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiPaginationItem-icon vivino-mui-lrb33l"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="NavigateNextIcon"
                    >
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
