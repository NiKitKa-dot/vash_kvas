import React from 'react';
import './ProductFilters.css';

const ProductFilters = ({ filters = { volume: [], color: [], sweetness: '', priceRange: [0, 1000], sortBy: 'recommended' }, onFilterChange }) => {
  const colorMap = {
    'light': 'Светлый',
    'dark': 'Темный',
    'white': 'Белый',
    'berry': 'Ягодный'
  };
  const sweetnessMap = {
    'dry': 'Сухой',
    'semi_dry': 'Полусухой',
    'semi_sweet': 'Полусладкий',
    'sweet': 'Сладкий'
  };
  const reverseColorMap = Object.fromEntries(Object.entries(colorMap).map(([k,v]) => [v,k]));
  const reverseSweetnessMap = Object.fromEntries(Object.entries(sweetnessMap).map(([k,v]) => [v,k]));

  const volumes = [0.5, 1, 1.5, 2, 3, 5];
  const colors = ['Светлый', 'Темный', 'Белый', 'Ягодный'];
  const sweetnessLevels = ['Сухой', 'Полусухой', 'Полусладкий', 'Сладкий'];

  // Защита от undefined
  const safeFilters = {
    volume: filters?.volume || [],
    color: filters?.color || [],
    sweetness: filters?.sweetness || '',
    priceRange: filters?.priceRange || [0, 1000],
    sortBy: filters?.sortBy || 'recommended'
  };

  const handleChange = (type, value) => {
    const newFilters = { ...filters };
    switch (type) {
      case 'volume':
        const volArray = newFilters.volume || [];
        if (volArray.includes(value)) {
          newFilters.volume = volArray.filter(v => v !== value);
        } else {
          newFilters.volume = [...volArray, value];
        }
        break;
      case 'color':
        const colorCode = reverseColorMap[value];
        const colorArray = newFilters.color || [];
        if (colorArray.includes(colorCode)) {
          newFilters.color = colorArray.filter(c => c !== colorCode);
        } else {
          newFilters.color = [...colorArray, colorCode];
        }
        break;
      case 'sweetness':
        newFilters.sweetness = reverseSweetnessMap[value] || '';
        break;
      case 'priceRange':
        newFilters.priceRange = value;
        break;
      case 'sortBy':
        newFilters.sortBy = value;
        break;
      default: break;
    }
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    onFilterChange({ volume: [], color: [], sweetness: '', priceRange: [0, 1000], sortBy: 'recommended' });
  };

  const currentVolume = filters.volume || [];
  const currentColor = filters.color || [];
  const currentSweetness = filters.sweetness || '';
  const currentPriceRange = filters.priceRange || [0, 1000];
  const currentSortBy = filters.sortBy || 'recommended';

  return (
    <div className="filters-panel">
      <div className="filters-two-columns">
        <div className="filters-left">
          <div className="filter-section">
            <h4>Объем (л)</h4>
            {volumes.map(vol => (
              <label key={vol} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={currentVolume.includes(vol)}
                  onChange={() => handleChange('volume', vol)}
                />
                {vol} л
              </label>
            ))}
          </div>
          <div className="filter-section">
            <h4>Цвет</h4>
            {colors.map(color => (
              <label key={color} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={currentColor.includes(reverseColorMap[color])}
                  onChange={() => handleChange('color', color)}
                />
                {color}
              </label>
            ))}
          </div>
        </div>

        <div className="filters-right">
          <div className="filter-section">
            <h4>Сладость</h4>
            <select
              value={Object.entries(sweetnessMap).find(([k]) => k === currentSweetness)?.[1] || ''}
              onChange={(e) => handleChange('sweetness', e.target.value)}
            >
              <option value="">Все</option>
              {sweetnessLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h4>Цена</h4>
            <input
              type="range"
              min="0"
              max="1000"
              value={currentPriceRange[1]}
              onChange={(e) => handleChange('priceRange', [0, +e.target.value])}
            />
            <div className="price-range">
              <span>0 ₽</span>
              <span>{currentPriceRange[1]} ₽</span>
            </div>
          </div>

          <div className="filter-section">
            <h4>Сортировка</h4>
            <select
              value={currentSortBy}
              onChange={(e) => handleChange('sortBy', e.target.value)}
            >
              <option value="recommended">Рекомендации</option>
              <option value="price_asc">По возрастанию цены</option>
              <option value="price_desc">По убыванию цены</option>
              <option value="newest">Сначала новые</option>
            </select>
          </div>

          <button className="clear-filters" onClick={handleClear}>
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;