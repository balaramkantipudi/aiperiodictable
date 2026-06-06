/**
 * Periodic Table Interactivity Module
 * Handles tile clicks, modal display, and keyboard navigation
 */

class PeriodicTableManager {
  constructor() {
    this.tiles = document.querySelectorAll('.tile');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.modalClose = document.getElementById('modalClose');
    this.modal = document.getElementById('modal');

    this.init();
  }

  /**
   * Initialize event listeners
   */
  init() {
    // Tile click handlers
    this.tiles.forEach((tile) => {
      tile.addEventListener('click', (e) => this.handleTileClick(e));
    });

    // Modal close handlers
    this.modalClose.addEventListener('click', () => this.closeModal());
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  /**
   * Extract tile data and open modal
   * @param {Event} event - Click event
   */
  handleTileClick(event) {
    const tile = event.currentTarget;
    const data = this.extractTileData(tile);
    this.openModal(data, tile);
  }

  /**
   * Extract text content from tile elements
   * @param {HTMLElement} tile - The tile element
   * @returns {Object} Tile data object
   */
  extractTileData(tile) {
    return {
      num: tile.querySelector('.num')?.textContent || '',
      sym: tile.querySelector('.sym')?.textContent || '',
      name: tile.querySelector('.name')?.textContent || '',
      desc: tile.querySelector('.desc')?.textContent || '',
      category: Array.from(tile.classList)
        .find((cls) => cls.startsWith('cat-'))
        ?.replace('cat-', '') || 'default',
    };
  }

  /**
   * Open modal with tile data
   * @param {Object} data - Tile data
   * @param {HTMLElement} triggerElement - Element that triggered the modal
   */
  openModal(data, triggerElement) {
    document.getElementById('modalNum').textContent = data.num;
    document.getElementById('modalSym').textContent = data.sym;
    document.getElementById('modalTitle').textContent = data.name;
    document.getElementById('modalDesc').textContent = data.desc;

    // Add animation
    this.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus on close button for accessibility
    this.modalClose.focus();
  }

  /**
   * Close modal with animation
   */
  closeModal() {
    this.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PeriodicTableManager();
  });
} else {
  new PeriodicTableManager();
}
