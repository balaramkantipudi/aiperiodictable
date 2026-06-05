import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import './ConceptModal.css';

function ConceptModal({ concept, onClose, relatedConcepts }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Close">
          <X size={24} />
        </button>

        <div className={`modal-header cat-${concept.category}`}>
          <div className="modal-number">{concept.id.toString().padStart(2, '0')}</div>
          <div className="modal-symbol">{concept.symbol}</div>
        </div>

        <div className="modal-body">
          <div className="modal-category">
            {concept.category.charAt(0).toUpperCase() + concept.category.slice(1)}
          </div>

          <h2 className="modal-title">{concept.name}</h2>

          <p className="modal-description">{concept.description}</p>

          {concept.details && (
            <div className="modal-details">
              <h3>Key Points</h3>
              <ul>
                {concept.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

          {concept.useCases && (
            <div className="modal-use-cases">
              <h3>Use Cases</h3>
              <ul>
                {concept.useCases.map((useCase, idx) => (
                  <li key={idx}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}

          {relatedConcepts.length > 0 && (
            <div className="modal-related">
              <h3>Related Concepts</h3>
              <div className="related-list">
                {relatedConcepts.map(related => (
                  <div key={related.id} className="related-item">
                    <span className="related-name">{related.name}</span>
                    <ArrowRight size={14} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-footer">
            <p><strong>Learning Path:</strong> foundations → generation → retrieval → agents → evaluation/safety → infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConceptModal;
