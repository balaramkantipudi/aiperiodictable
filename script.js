/**
 * Periodic Table Interactivity Module
 * Handles tile clicks, modal display, and keyboard navigation
 * Enhanced with detailed topic explanations
 */

const TOPIC_DATA = {
  '01': {
    name: 'Large Language Model',
    sym: 'LLM',
    explanation: 'A Large Language Model (LLM) is a deep neural network trained on vast amounts of text data (often billions of tokens from internet text, books, and other sources). LLMs learn to predict the next token in a sequence, developing emergent abilities in reasoning, creativity, and domain knowledge. Famous examples include GPT-4, Claude, and Gemini. They power conversational AI, code generation, summarization, and reasoning tasks. Key characteristics include massive parameter counts (billions to trillions), transformer architecture, and ability to understand context across long sequences.'
  },
  '02': {
    name: 'Transformer',
    sym: 'Tr',
    explanation: 'The Transformer architecture, introduced in "Attention is All You Need" (2017), revolutionized NLP by replacing RNNs with a stack of self-attention layers. Each layer allows every token to attend to every other token in parallel, enabling efficient training on large datasets. Transformers consist of an encoder (processing input) and decoder (generating output), connected via cross-attention. The architecture enabled training of increasingly larger models and became the foundation for all modern LLMs. Self-attention weights are learned during training and represent which tokens are most relevant to each other.'
  },
  '03': {
    name: 'Attention',
    sym: 'At',
    explanation: 'Attention is a mechanism that allows neural networks to dynamically focus on relevant parts of input based on importance weights. In self-attention, each token computes three vectors: Query (Q), Key (K), and Value (V). The attention scores are computed as softmax(QK^T/√d)V, producing a weighted combination of values. This lets the model learn which tokens should influence which other tokens. Multi-head attention applies this process multiple times in parallel with different learned representations. Attention is crucial for handling long-range dependencies and understanding relationships between distant words in text.'
  },
  '04': {
    name: 'Tokenization',
    sym: 'Tk',
    explanation: 'Tokenization is the process of breaking raw text into smaller units (tokens) that the model can process. Tokens can be words, subwords, characters, or bytes depending on the tokenizer. Byte-pair encoding (BPE), WordPiece, and SentencePiece are common algorithms. A token is typically 4 characters of English text on average. Tokenization affects model behavior, context window capacity, and cost (since tokens determine input/output length). Special tokens like [CLS], [SEP], or <|end_of_text|> mark structural boundaries. The same text can have different token counts across models due to different tokenizers.'
  },
  '05': {
    name: 'Inference',
    sym: 'Inf',
    explanation: 'Inference is the process of running a trained model to generate predictions or completions without updating weights. For LLMs, inference means generating text token-by-token, where the model predicts the probability of each possible next token given all previous tokens. Methods include greedy decoding (always pick highest probability), beam search (explore multiple paths), and sampling (probabilistically pick tokens). Inference latency, throughput, and cost depend on batch size, context length, model size, and hardware. Techniques like quantization, distillation, and speculative decoding reduce inference costs. Inference accounts for the majority of LLM deployment costs.'
  },
  '06': {
    name: 'Prompt Engineering',
    sym: 'Pr',
    explanation: 'Prompt engineering is the art and science of crafting input text to elicit desired behavior from LLMs. Effective prompts include clear instructions, relevant context, examples, and specification of output format. Techniques include: zero-shot (no examples), few-shot (provide examples), chain-of-thought (ask to reason step-by-step), role-playing ("act as a..."), and specifying constraints. Prompt quality dramatically affects model performance—two equivalent problems phrased differently can yield vastly different results. Advanced techniques include prompt chaining (break complex tasks into steps), meta-prompting (prompt the model to improve its own prompts), and automatic prompt optimization. Prompting democratizes AI by enabling capability without retraining.'
  },
  '07': {
    name: 'Few-Shot',
    sym: 'FS',
    explanation: 'Few-shot learning enables models to learn new tasks from just a handful of examples provided in the prompt context. Unlike traditional ML which requires thousands of labeled examples and retraining, few-shot leverages in-context learning—the model\'s ability to adapt behavior based on demonstration. For example, showing 2-3 examples of sentiment analysis in the prompt teaches the model to perform sentiment analysis without any parameter updates. The quality and diversity of examples matters greatly. Few-shot is more reliable than zero-shot but sometimes less reliable than full fine-tuning. It enables rapid task adaptation and is central to prompt engineering workflows.'
  },
  '08': {
    name: 'Fine-Tuning',
    sym: 'FT',
    explanation: 'Fine-tuning adapts a pretrained model to a specific domain or task by training it on task-specific data. The model starts with weights from pretraining and updates them on new data, typically with a smaller learning rate. Full fine-tuning updates all parameters; parameter-efficient methods like LoRA (Low-Rank Adaptation) update only a small subset of trainable parameters. Fine-tuning requires labeled data (hundreds to thousands of examples depending on task difficulty). Benefits include better task performance, reduced latency (no need for in-context examples), and ability to encode domain knowledge. Trade-offs include requiring labeled data, computational cost, and potential catastrophic forgetting of pretraining knowledge.'
  },
  '09': {
    name: 'Temperature',
    sym: 'Tmp',
    explanation: 'Temperature is a hyperparameter that controls randomness in text generation by scaling logits before the softmax. Temperature = 0 means greedy decoding (always pick highest probability, deterministic). Temperature > 1 makes the distribution smoother (more random, more diverse). Temperature < 1 makes it sharper (less random, more focused). For example, with temperature=0.7, a token with logit 5 gets lower relative probability than with temperature=0.3. Higher temperature generates more creative, diverse, but potentially incoherent text (good for brainstorming). Lower temperature generates more deterministic, focused, but repetitive text (good for factual tasks). Top-p (nucleus sampling) and top-k are alternative methods to control diversity without temperature.'
  },
  '10': {
    name: 'Multimodal',
    sym: 'MM',
    explanation: 'Multimodal models process and generate multiple types of data: text, images, audio, video, and sometimes code or scientific notation. Models like GPT-4V, Claude 3, and Gemini accept images as input alongside text. DALL-E generates images from text. Audiobox generates audio from text and audio prompts. Training multimodal models requires aligned datasets where text descriptions correspond to images/audio. Vision transformers (ViT) tokenize images into visual tokens similar to text tokens, enabling joint processing. Multimodal capabilities expand application domains from pure text (Q&A, writing) to cross-modal tasks (image captioning, visual question answering, image-to-text). Scaling to more modalities is an active research area.'
  },
  '11': {
    name: 'Retrieval-Augmented Generation',
    sym: 'RAG',
    explanation: 'RAG (Retrieval-Augmented Generation) enhances LLMs with access to external knowledge by retrieving relevant documents and including them in the prompt context. The pipeline is: (1) Convert user query to embeddings, (2) Search vector database for similar documents, (3) Include top-k retrieved documents in prompt, (4) Generate response grounded in retrieved context. Benefits: reduces hallucinations (model must cite sources), enables knowledge cutoff updates without retraining, handles domain-specific information. Challenges: retrieval quality affects output quality (garbage in, garbage out), increased latency, managing context length. RAG is widely used for question-answering over documents, support chatbots, and enterprise AI systems where currency and accuracy matter.'
  },
  '12': {
    name: 'Embeddings',
    sym: 'Emb',
    explanation: 'Embeddings are dense vector representations of text (or images, audio) that capture semantic meaning. A text embedding model (like OpenAI\'s text-embedding-3 or Cohere) converts arbitrary-length text into fixed-size vectors (typically 384-1536 dimensions). Similar texts have similar embeddings (high cosine similarity). Embeddings enable semantic search (find documents similar to a query), clustering, classification, and anomaly detection without explicit labeled data. They\'re computed once and cached, making semantic search fast via vector database nearest-neighbor search. Different models produce different embeddings; there\'s no universally "correct" embedding, only embeddings suitable for specific tasks. Embeddings are the foundation of RAG systems.'
  },
  '13': {
    name: 'Vector Database',
    sym: 'VDB',
    explanation: 'Vector databases (Pinecone, Weaviate, Milvus, FAISS) are specialized systems optimized for storing and searching high-dimensional vectors. They support exact and approximate nearest-neighbor search at scale (millions to billions of vectors). Key features: fast similarity search via approximate algorithms (HNSW, IVF), metadata filtering (e.g., "find vectors from documents from 2024"), scalability, and persistence. Approximate methods trade accuracy for speed—essential when exact search is too slow. Vector DBs power RAG systems, semantic search, recommendation systems, and similarity-based classification. They efficiently solve the "needle in haystack" problem: finding the k most similar vectors to a query among billions of candidates in milliseconds.'
  },
  '14': {
    name: 'Chunking',
    sym: 'Ch',
    explanation: 'Chunking is splitting long documents into smaller, semantically meaningful pieces before embedding and storing in vector databases. Strategies include: fixed-size (e.g., 512 tokens), semantic (split at logical boundaries), sliding window (overlap between chunks), and hierarchical (chunks at multiple granularities). Chunk size is a trade-off: small chunks = more precise retrieval but more storage; large chunks = less retrieval precision. Overlap (e.g., 50 tokens) preserves context across chunk boundaries. Bad chunking (e.g., splitting sentences midway) loses meaning and degrades retrieval quality. Sophisticated approaches use language models to identify semantic boundaries or use recursive strategies to maintain structure. Chunking strategy significantly impacts RAG system performance.'
  },
  '15': {
    name: 'Hybrid Search',
    sym: 'Hy',
    explanation: 'Hybrid search combines semantic search (embedding-based) and keyword search (BM25, full-text) to get benefits of both. Semantic search finds conceptually similar documents ("autonomous vehicles" matches "self-driving cars") but can miss exact keywords. Keyword search excels at exact term matching and rare entities but misses semantic synonyms. Hybrid search ranks results by combining scores (e.g., 70% semantic + 30% keyword via linear combination or learned rankers). It\'s particularly effective for domain-specific search where exact terminology matters, queries with rare entities, and situations where vocabulary mismatch is common. Implementing hybrid search: use a vector DB with text search (e.g., Pinecone with hybrid search enabled) or combine separate systems (vector DB + Elasticsearch).'
  },
  '16': {
    name: 'Reranking',
    sym: 'RR',
    explanation: 'Reranking is a post-processing step that reorders search results after retrieval to improve relevance. Typically: (1) Retrieve k larger candidate set (e.g., 100 documents via fast approximate search), (2) Apply expensive reranker model to compute relevance scores (e.g., cross-encoder), (3) Return top-n reranked results (e.g., 10 documents). Rerankers are typically cross-encoder models that score query-document pairs jointly, more accurate than dual-encoder embeddings but slower (O(k) inference vs O(1)). Reranking significantly improves RAG quality by catching relevant documents missed by initial retrieval and filtering false positives. Common rerankers: Cohere Rerank, BGE Reranker, open-source cross-encoders. Trade-off: improved relevance vs increased latency.'
  },
  '17': {
    name: 'Max Marginal Relevance',
    sym: 'MMR',
    explanation: 'Max Marginal Relevance (MMR) is a diversity-aware ranking method that balances relevance with diversity in search results. Standard search returns the k most relevant results, which are often redundant (very similar to each other). MMR iteratively selects documents that are: (1) Highly relevant to the query AND (2) Dissimilar to already-selected documents. Mathematically, MMR(d_i) = λ * sim(query, d_i) - (1-λ) * max_j sim(d_j, d_i) for already-selected d_j. Lambda controls the trade-off (λ=1 is pure relevance, λ=0 is pure diversity). MMR reduces redundancy in search results, improving user experience and RAG answer quality by providing diverse perspectives. Particularly useful for exploratory search, research, and scenarios where different viewpoints matter.'
  },
  '18': {
    name: 'Agent',
    sym: 'Ag',
    explanation: 'An Agent is an LLM-based system with goals, external tools, memory, and the ability to plan and take actions. Unlike static models that just generate text, agents: (1) Perceive the environment, (2) Plan multi-step solutions, (3) Execute actions (call APIs, search, compute), (4) Observe outcomes, (5) Adapt based on feedback. Key components: language model (the "brain"), tools (functions it can call), memory (short-term context, long-term knowledge base), and a controller (planning/decision logic). Examples: ReAct agents (reason then act), tool-using agents that call code interpreters or APIs, autonomous research agents. Agents enable automation of complex workflows, research tasks, and problem-solving that single LLM calls cannot handle. Challenges: error handling, context management, hallucinating tool calls, and reasoning reliability.'
  },
  '19': {
    name: 'Agentic RAG',
    sym: 'AR',
    explanation: 'Agentic RAG combines agents with retrieval-augmented generation for more intelligent information retrieval and reasoning. Instead of one retrieval step, an agentic RAG system: (1) Decides whether retrieval is needed and what to retrieve, (2) Refines queries based on intermediate results, (3) Iteratively retrieves and reasons, (4) Routes between different knowledge sources, (5) Validates and synthesizes retrieved information. The agent can make retrieval decisions (e.g., "need more recent data"), perform multi-hop queries ("find papers about X that cite Y"), and recover from failed searches. Benefits: handles complex information needs, reduces unnecessary retrievals, improves relevance by active search strategies. Challenges: more complex to implement, increased latency, potential for infinite loops if not designed carefully. Agentic RAG is more powerful but harder to control than static RAG.'
  },
  '20': {
    name: 'ReAct',
    sym: 'ReA',
    explanation: 'ReAct (Reasoning + Acting) is a prompting technique where agents interleave reasoning (Thought), actions (Act), and observations (Observation). The loop: Thought → Act → Observation → [repeat]. Example: "Thought: I need to find the capital of France. Act: Search for \'capital of France\'. Observation: The capital of France is Paris. Thought: This is correct, I can answer now." ReAct prompting improves accuracy on complex tasks by making reasoning transparent and enabling self-correction. The model reasons before acting (reducing hallucinated actions) and observes results (enabling course correction). ReAct can be implemented via careful prompting or with structured tools. It\'s a simple but powerful technique that significantly improves agent reasoning reliability compared to "just do it" instructions.'
  },
  '21': {
    name: 'Planning',
    sym: 'Pln',
    explanation: 'Planning in agent systems involves breaking down complex goals into ordered subtasks before execution. Rather than reactively responding to each step, planning enables agents to: (1) Decompose a goal into substeps, (2) Estimate feasibility and costs, (3) Identify dependencies and parallelizable steps, (4) Recover from failures by replanning. Planning strategies include: hierarchical (high-level plan, then detail), least-commitment (specify only necessary details), and reactive (plan as you go). Language models can generate plans via prompting ("Here\'s my plan to solve this..."). Good planning reduces wasted actions, handles complex multi-step tasks, and enables parallelization. Challenges: LLMs can generate infeasible plans, long-term reasoning is unreliable, plans can become stale. Combining LLM planning with execution monitoring (detecting failures and replanning) is most robust.'
  },
  '22': {
    name: 'Tool Use',
    sym: 'TUl',
    explanation: 'Tool use enables LLMs to call external functions, APIs, and code to extend capabilities beyond text generation. Tools include: search engines, calculators, code interpreters, databases, web APIs, sensors, and robotics. The model is given tool definitions (name, description, parameters) and can decide when to invoke tools. Tool-using workflow: LLM generates a tool call → tool executes → result fed back to LLM → LLM generates next action or response. This overcomes LLM limitations: they can\'t do precise math (use calculator), can\'t access current information (use search), can\'t run code (use interpreter). Enabling tool use requires: defining a tool calling format (OpenAI function calling, JSON schemas), implementing tool execution, and handling errors. Agentic systems with tool use are far more capable than models alone.'
  },
  '23': {
    name: 'Function Calling',
    sym: 'Fn',
    explanation: 'Function calling is a structured way for LLMs to invoke external functions or APIs by generating specially formatted function call requests. Models like GPT-4 and Claude can output function calls in JSON format. Instead of generating text like "call search for Paris", the model outputs: {"function": "search", "parameters": {"query": "Paris"}}. This is more reliable than parsing free-form text. Function calling requires: (1) Defining available functions and their signatures (using JSON schemas), (2) Teaching the model about these functions (via system prompts or training), (3) Parsing model output for function calls, (4) Executing functions, (5) Feeding results back to model. Benefits: structured, reliable, enables validation of parameters before execution. Challenges: requires tool/function definitions, overhead of parsing, the model might choose wrong functions or parameters. Function calling is standard in agent frameworks like AutoGPT, LangChain, and Anthropic\'s tool_use mode.'
  },
  '24': {
    name: 'Memory',
    sym: 'Mem',
    explanation: 'Memory in agents stores information across interactions enabling context preservation and learning. Types: (1) Short-term: current conversation context (all previous messages in a session), stored in prompt context window, limited by token limits. (2) Long-term: persistent knowledge (user preferences, facts), typically stored in vector DBs or knowledge bases, retrieved when relevant. (3) Episodic: summaries of past interactions, enabling learning from history. (4) Semantic: structured facts and relationships. Challenges: context window limits (tokens add up), determining what\'s worth remembering, forgetting irrelevant old information, and managing memory growth. Techniques: summarization (compress old context), sliding window (keep recent), importance weighting (remember important facts), external storage (vector DB). Effective memory management is crucial for multi-turn conversations, continuous learning, and personalization.'
  },
  '25': {
    name: 'Router',
    sym: 'Rt',
    explanation: 'A Router is an agent component that intelligently directs queries to the most appropriate tool, agent, or knowledge source. Instead of a single response path, routers enable: "Route questions about medicine to the medical domain expert agent", "Route database queries to the SQL expert", "Route creative writing to the creative writing model". Routers can be implemented via: (1) LLM-based routing (the model decides where to route), (2) Classifier-based (trained classifier predicts best destination), (3) Rule-based (explicit rules for routing). Benefits: specialist models often outperform generalists, enables scaling (add more specialists), enables cost optimization (cheap models for simple queries, expensive for complex). Challenges: routing errors send queries to wrong agents, requires diversity of backend systems. Mixture-of-Experts (MoE) is related—multiple specialist "experts" with a learned gating mechanism selecting which experts to activate.'
  },
  '26': {
    name: 'Multi-Agent System',
    sym: 'MAS',
    explanation: 'Multi-Agent Systems (MAS) involve multiple specialized agents coordinating to solve problems collectively. Each agent has specific roles and expertise. Communication patterns: (1) Sequential (A→B→C, each agent processes then passes to next), (2) Hierarchical (controller agent delegates to workers), (3) Peer-to-peer (agents negotiate directly). Examples: code review (reviewer agent + coder agent), research (literature searcher + analyzer + synthesizer agents), customer service (routing agent + expert agents). Benefits: specialization (each agent is expert in domain), parallelization (agents work in parallel), resilience (if one fails, others continue), human-in-the-loop (humans can intervene). Challenges: coordination overhead, debugging (harder with multiple agents), emergent failures (interactions produce bugs). Multi-agent systems are powerful for complex problems but require careful design to manage complexity.'
  },
  '27': {
    name: 'Observation',
    sym: 'Obs',
    explanation: 'Observation is feedback an agent receives after taking an action, providing information about the action\'s outcome and environment state. Observations enable agents to: (1) Evaluate whether actions succeeded, (2) Detect failures and adapt, (3) Gather information for next action planning. Types of observations: (1) Action results (tool output, code execution result), (2) Environment state (updated after action), (3) Error messages (when actions fail), (4) Rewards (in RL context). Quality of observation significantly affects agent reasoning—incomplete or incorrect observations lead to hallucination. Observation→Thought→Action feedback loop is core to ReAct and other agentic patterns. Challenges: determining what to observe (information overload), handling missing or contradictory observations, and dealing with stochastic environments. Observation becomes especially complex in physical systems (robots) where sensor noise and delays are inevitable.'
  },
  '28': {
    name: 'Reflection',
    sym: 'Ref',
    explanation: 'Reflection is self-critique or re-evaluation of agent outputs to improve accuracy and catch errors. Reflection mechanisms include: (1) Self-verification ("Is my answer correct?"), (2) Explanation generation ("Why is this answer correct?"), (3) Error analysis ("Why might I be wrong?"), (4) Refinement ("How can I improve?"). Implemented via prompting: "Check your answer for errors and provide corrections." or via separate verification agents that critique outputs. Research shows reflection dramatically improves reasoning accuracy—especially for math, code, and logic tasks. Iterative reflection (reflect→refine→reflect) improves results further. Reflection is computationally expensive (requires additional inference) but worth it for accuracy-critical tasks. Multi-stage pipelines (generate→reflect→refine) are standard in high-quality reasoning systems like Claude and o1 models.'
  },
  '29': {
    name: 'Evaluation',
    sym: 'Eval',
    explanation: 'Evaluation measures whether system performance meets requirements. Types: (1) Task-specific metrics (accuracy for classification, BLEU/ROUGE for generation, F1 for information extraction), (2) General metrics (latency, throughput, cost), (3) Qualitative (human assessment of quality). LLM-based evaluation: use another LLM as judge to score outputs ("Rate this answer 1-5"). Challenges: metrics don\'t always correlate with user satisfaction, evaluation can be expensive, evaluation data requirements, distribution shift (eval set differs from production). Benchmarks (MMLU, HumanEval, GLUE) enable comparison. A/B testing measures real user satisfaction. Continuous evaluation on production data detects degradation. Good evaluation is critical for development (knowing what to improve) and deployment (confidence in production quality). Evaluation should be built in from the start, not an afterthought.'
  },
  '30': {
    name: 'RAG Evaluation',
    sym: 'RGE',
    explanation: 'RAG Evaluation assesses whether retrieved documents are relevant and whether generated answers are grounded in those documents. Key metrics: (1) Retrieval metrics: Precision@k (fraction of top-k results relevant), Recall (fraction of all relevant documents found), NDCG (ranking quality considering position). (2) Generation metrics: Faithfulness (does answer follow from retrieved documents?), Answer Relevance (does answer address query?), Context Relevance (are retrieved docs relevant?). Evaluation methods: (1) Automatic (compute metrics on benchmark datasets), (2) LLM-based (use GPT as judge: "Is the answer faithful to context?"), (3) Human annotation (ground truth labels). Challenges: defining "relevant", evaluating long-form answers, handling multiple correct answers, evaluation cost. RAG systems often fail at retrieval (got wrong docs) not generation, so good retrieval evaluation is critical. Tools: RAGAS framework, Tonic Validate, manual inspection.'
  },
  '31': {
    name: 'Explainability',
    sym: 'Exp',
    explanation: 'Explainability makes AI system decisions transparent and trustworthy by showing reasoning and sources. Techniques: (1) Source attribution (cite which retrieved documents support the answer), (2) Reasoning traces (show Thought→Act→Observation chain), (3) Feature importance (show which inputs most influenced output), (4) Counterfactuals ("If input changed to X, output would be Y"). Benefits: debugging (identify reasoning errors), user trust (understand why system answered this way), regulatory compliance (GDPR, EU AI Act require explainability), identifying bias. Challenges: explanations can be wrong or misleading, trade-off with accuracy (simpler models are more interpretable), full explanation can overwhelm users. In RAG, explainability is partly built-in (citations to documents), but generation can still hallucinate or misinterpret sources. Explainability is increasingly critical as AI gets deployed in high-stakes domains (healthcare, law, finance).'
  },
  '32': {
    name: 'Hallucination',
    sym: 'Hal',
    explanation: 'Hallucination is when LLMs generate plausible-sounding but false information—the model outputs text confidently even when facts are wrong or invented. Examples: LLM invents citations that don\'t exist, makes up historical events, or confidently provides wrong answers. Root cause: LLMs are trained to predict the next likely token, not to verify truth. The model learns to write fluently, and fluent text that matches training distribution is more probable than "I don\'t know" even if factually incorrect. Hallucinations are particularly problematic in tasks requiring factual accuracy (medical advice, legal information, journalism). Mitigation strategies: (1) RAG (ground answers in retrieved documents), (2) Few-shot with examples of correct behavior, (3) Asking model to cite sources, (4) Ensemble and verification (ask two models, compare answers), (5) Fine-tuning on factual data. Some models hallucinate more than others. Addressing hallucination is an open research problem.'
  },
  '33': {
    name: 'Guardrails',
    sym: 'Grd',
    explanation: 'Guardrails are constraints and rules that keep LLM outputs and actions safe and within bounds. Types: (1) Output constraints (only respond with JSON, max length, stay in character), (2) Safety constraints (refuse harmful requests, don\'t provide instructions for violence/illegal acts), (3) Domain constraints (route to appropriate handler), (4) Format constraints (structured output, specific schema). Implementation: (1) Prompt-based (include rules in system prompt), (2) Post-processing (filter outputs before returning), (3) Tool validation (check parameters before executing), (4) Specialized models (smaller models trained for safety checks). Guardrails libraries: NEMO Guardrails (NVIDIA), Outlines (structured output), LLM-Guard (safety). Challenges: guardrails can be circumvented (jailbreaking), overly strict guardrails limit usefulness, false positives (reject safe outputs), computational cost. Well-designed guardrails are essential for production systems to prevent misuse, ensure quality, and meet regulations.'
  },
  '34': {
    name: 'Human-in-the-Loop',
    sym: 'HITL',
    explanation: 'Human-in-the-Loop (HITL) embeds human judgment into automated workflows at critical points, improving safety and quality. Patterns: (1) Review before execution (human approves agent actions before they affect the world), (2) Review after generation (human checks outputs before delivery), (3) Disambiguation (when ambiguous, ask human), (4) Active learning (model asks human for labels on uncertain examples). Benefits: catches AI errors before consequences, improves user trust, enables learning from human feedback, handles edge cases that AI can\'t. Challenges: human bottleneck (reduces automation benefits), consistency (different humans may judge differently), cost (human labor is expensive), defining when to involve humans. HITL is critical for high-stakes domains: medical diagnosis (doctor reviews AI recommendations), legal contracts (lawyer reviews AI summaries), content moderation (humans review flagged content). The goal is not "humans in loop" vs "automation", but optimal balance: automate routine tasks, keep humans for complex decisions.'
  },
  '35': {
    name: 'Open-Source LLM',
    sym: 'OSS',
    explanation: 'Open-Source LLMs are models with publicly available weights, enabling anyone to download, run, and potentially fine-tune locally. Examples: Meta\'s Llama family (7B to 405B parameters), Mistral, Qwen, Phi, Code Llama. Benefits: privacy (model runs locally, data doesn\'t go to cloud), cost (no API fees), customization (fine-tune for your domain), no vendor lock-in, transparency (can inspect model architecture). Challenges: running large models requires significant GPU compute (e.g., 70B model needs high-end GPU or cluster), fine-tuning requires engineering expertise, open models lag behind proprietary (GPT-4, Claude) on many benchmarks. OSS models are catching up rapidly and enable practical deployment for cost-sensitive or privacy-critical applications. Hybrid approaches combine OSS (cheap, fast) for routine tasks with proprietary models (capable, accurate) for complex tasks.'
  },
  '36': {
    name: 'Context Window',
    sym: 'Ctx',
    explanation: 'Context Window is the maximum amount of text (measured in tokens) that an LLM can consider in a single inference. Early LLMs had 512-2048 token windows. Modern models: GPT-4 (128K tokens), Claude 3.5 (200K tokens), Gemini 2.0 (1M tokens). Larger context enables: (1) Processing long documents in one shot, (2) Holding more conversation history, (3) In-context learning with more examples, (4) Better reasoning on complex problems. Limitations: inference is O(context_length²) due to attention (doubling context ≈ 4x slower), longer context can dilute signal (model attends to irrelevant info), latency increases. Techniques to work within limits: summarization (condense old context), hierarchical processing (process document sections separately), efficient attention (linear attention instead of quadratic). Sparse attention and other optimizations aim to enable "infinite context" but are not yet mainstream. Context window size is a key limitation and differentiator for modern LLMs.'
  },
  '37': {
    name: 'Latency',
    sym: 'Lat',
    explanation: 'Latency is the delay between sending a query and receiving a usable response. For LLMs: (1) Time to First Token (TTFT, how long before first response appears) matters for UX, (2) Inter-token latency (time between tokens) determines perceived responsiveness, (3) End-to-end latency (total time for full response). Latency depends on: model size (larger models are slower), batch size (larger batches amortize compute), hardware (GPUs faster than CPUs), system load (contention), and optimization. For user-facing applications: sub-second TTFT is ideal. Batch inference (process many requests together) reduces latency per request but increases end-to-end time (trade-off). Techniques to reduce latency: quantization (smaller model size), distillation (smaller student model), speculative decoding (guess next tokens, verify), and caching (key-value cache for context). Latency-sensitive applications (real-time chat, search) require careful optimization and often use smaller, faster models over larger ones.'
  },
  '38': {
    name: 'Agent-to-Agent',
    sym: 'A2A',
    explanation: 'Agent-to-Agent (A2A) communication enables multiple autonomous agents to coordinate and collaborate. Protocols include: (1) Message passing (agents send structured messages), (2) Shared memory (agents write to and read from shared state), (3) Contract negotiation (agents propose and agree on tasks), (4) Auction-based (agents bid for tasks). Use cases: multi-agent research (information-gathering agent queries retrieval agent), collaborative problem-solving (planner delegates to specialist agents), swarm robotics (robots coordinate via wireless), trading systems (multiple trading agents compete/cooperate). Challenges: communication overhead (adds latency), coordination failure (agents misunderstand or deadlock), emergent behavior (unexpected interactions between agents), monitoring/debugging (complex to trace). A2A is needed for complex systems beyond single-agent capabilities. Research explores agent communication languages, protocols, and trust mechanisms to make A2A more reliable.'
  },
  '39': {
    name: 'Workflow',
    sym: 'Wrk',
    explanation: 'A Workflow is a structured sequence of steps combining models, tools, and human decision points to solve a task. Components: (1) Steps (what to execute: model call, tool call, human approval), (2) Branching (conditional logic: if A then do X else Y), (3) Loops (repeat until condition), (4) Sequential (step 1 → step 2 → ...), (5) Parallel (independent steps run together). Examples: RAG pipeline (retrieve → rank → generate), customer service (classify ticket → route → resolve → escalate if needed), code review (analyze code → run tests → generate comments → submit). Benefits: explicit logic (easier to understand and debug), reusability (workflows are templates), monitoring (track each step), optimization (parallelize independent steps), governance (enforce process). Workflow engines: LangChain, LlamaIndex, Crew AI, n8n. Workflows bridge gap between rigid automation and fully unpredictable agents.'
  },
  '40': {
    name: 'Orchestration',
    sym: 'Orc',
    explanation: 'Orchestration is coordinating agents, tools, prompts, and control flows to build complex systems. It\'s the "glue" that ties components together. Responsibilities: (1) Sequencing (decide what executes when), (2) State management (track variables, context), (3) Error handling (retry failed steps, fallbacks), (4) Monitoring (log steps, performance), (5) Scaling (parallelization, load balancing). Orchestration frameworks: LangChain (chains and agents), LlamaIndex (RAG), Crew AI (multi-agent), AutoGPT (autonomous agents). Challenges: defining clear interfaces between components, handling stateful interactions, debugging (complex execution traces), managing context across steps. Well-orchestrated systems are: modular (components are reusable), observable (can see what\'s happening), resilient (handle failures gracefully), and maintainable (easy to modify workflows). Orchestration is distinct from individual component quality—bad orchestration makes good components fail. It\'s an underappreciated but crucial part of production AI systems.'
  }
};

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
    const num = tile.querySelector('.num')?.textContent || '';
    const sym = tile.querySelector('.sym')?.textContent || '';
    const name = tile.querySelector('.name')?.textContent || '';
    const desc = tile.querySelector('.desc')?.textContent || '';
    const category = Array.from(tile.classList)
      .find((cls) => cls.startsWith('cat-'))
      ?.replace('cat-', '') || 'default';

    // Get detailed explanation from TOPIC_DATA
    const topicData = TOPIC_DATA[num];
    const explanation = topicData?.explanation || desc;

    return {
      num,
      sym,
      name,
      desc,
      explanation,
      category,
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
    document.getElementById('modalDesc').textContent = data.explanation;

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
