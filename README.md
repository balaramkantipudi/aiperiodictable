# AI Periodic Table - React Edition

An **interactive, modern React version** of the AI Periodic Table featuring search, filtering, dark/light mode, and expandable concept details.

## ✨ Features

- **🔍 Live Search**: Filter concepts by name, symbol, or description in real-time
- **🏷️ Category Filter**: Toggle between AI/GenAI concept categories
- **🌙 Dark/Light Mode**: Choose your preferred theme with smooth transitions
- **📖 Expandable Modals**: Click any concept to see detailed information, use cases, and related concepts
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Smooth Animations**: Polished UI with fade-ins, slide-ups, and hover effects
- **♿ Accessible**: Keyboard navigation and semantic HTML

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📊 Concept Categories

- **Foundation**: LLM, Transformer, Attention, Tokenization, Inference
- **Generation**: Prompt Engineering, Few-Shot, Fine-Tuning, Temperature, Multimodal
- **Retrieval**: RAG, Embeddings, Vector DB, Chunking, Hybrid Search, Reranking, MMR
- **Agentic**: Agents, Agentic RAG, ReAct, Planning, Tool Use, Function Calling, Memory, Router, Multi-Agent Systems, Observation, Reflection
- **Ops/Evals**: Evaluation, RAG Evaluation, Explainability
- **Safety**: Hallucination, Guardrails, Human-in-the-Loop
- **Infrastructure**: Open-Source LLM, Context Window, Latency, Agent-to-Agent, Workflow, Orchestration

## 🛠️ Tech Stack

- **React 18**: Modern UI framework
- **Lucide React**: Beautiful icon library
- **CSS3**: Modern styling with animations and gradients
- **Create React App**: Zero-config React setup

## 📁 Project Structure

```
src/
├── App.js                 # Main app component with search & filter logic
├── App.css               # App styles
├── index.js              # React entry point
├── index.css             # Global styles
├── components/
│   ├── ConceptTile.js    # Individual concept card
│   ├── ConceptTile.css   # Tile styles
│   ├── ConceptModal.js   # Expandable detail modal
│   └── ConceptModal.css  # Modal styles
└── data/
    └── concepts.js       # All 40 AI/GenAI concepts data
```

## 🎨 Customization

### Adding New Concepts

Edit `src/data/concepts.js`:

```javascript
{
  id: 41,
  symbol: 'XX',
  name: 'New Concept',
  description: 'Brief description...',
  category: 'foundation', // foundation, generation, retrieval, agentic, ops, safety, infra
  details: ['Point 1', 'Point 2'],
  useCases: ['Use case 1', 'Use case 2']
}
```

### Changing Colors

Modify CSS variables in `src/index.css`:

```css
:root {
  --foundation: #2f6fed;
  --generation: #7c3aed;
  /* ... update colors ... */
}
```

## 🌐 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
# Add to package.json: "homepage": "https://yourusername.github.io/aiperiodictable"
npm run build
npm run deploy
```

## 📖 Learning Map

Read left-to-right as a structured learning journey:
**Foundations** → **Generation** → **Retrieval** → **Agents** → **Evaluation/Safety** → **Infrastructure**

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more concepts
- Improve descriptions and use cases
- Suggest UI/UX enhancements
- Fix bugs and optimize performance

## 📝 License

This project is open-source. Share freely with proper attribution.

## 🔗 Original Design

Based on the classic periodic table concept layout with modern GenAI vocabulary.

---

**Made with ❤️ for the AI/GenAI community**
