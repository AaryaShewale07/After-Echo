# AfterEcho

**AfterEcho** is a React-based web application that allows a user to upload a short voice note of a person and generate an artificial **voice echo** based on its tonal characteristics. The system analyzes the voice (pitch, cadence, pauses, emotional tone) and enables users to have conversations in the same **auditory style**.

This project does **not attempt to recreate a person**. Instead, it produces a synthetic echo of a voice, clearly framed as an **artificial reconstruction**.

---

# One-Line Product Description

**AfterEcho is a space where voices live on—not as replicas, but as echoes.**

---

# Core Concept

AfterEcho allows users to upload a short voice recording.
The system analyzes acoustic characteristics such as:

* Pitch
* Cadence
* Rhythm
* Pauses
* Emotional tone

Using these features, the system produces an AI interface capable of generating responses in a **similar vocal style**.

Important distinction:

* ❌ Not a personality clone
* ❌ Not a memory recreation
* ✅ A tonal and auditory echo

The AI does not claim to be the original person.

---

# Visual & Brand Direction

## Theme

The interface is inspired by **deep space**.

Design principles:

* Pitch-black environment
* Subtle cosmic motion
* Quiet and minimal UI
* Emotionally reflective atmosphere

Mood keywords:

Silent · Vast · Emotional · Respectful · Cosmic · Introspective

---

# Color Palette

| Element    | Color                                 |
| ---------- | ------------------------------------- |
| Background | `#000000` (Absolute Black)            |
| Secondary  | Deep blues / dark purples             |
| Accent     | Neon violet / cyan (interaction only) |
| Text       | `#E5E5E5` (off-white)                 |

Pure white is intentionally avoided.

---

# Typography

* Thin modern sans-serif
* Large line spacing
* Minimal text density
* Calm reading flow

---

# Frontend Technology Stack

Mandatory stack used in the project:

* **React + Vite**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion** (UI animations)
* **Three.js + @react-three/fiber** (galaxy background)
* **Web Audio API** (waveforms & microphone input)
* **Zustand or Redux Toolkit** (state management)

---

# Backend & AI Architecture

Backend stack:

* **Node.js**
* **Express**
* **WebSockets** for real-time communication

AI pipeline components:

1. Voice upload
2. Acoustic analysis

   * pitch
   * cadence
   * pauses
   * rhythm
3. Embedding generation
4. Voice synthesis
5. Conversational AI interface

Audio storage is temporary and **user-controlled**.

Users can permanently delete their data at any time.

---

# Project Structure

```
afterecho/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── backgrounds/
│   │   │   ├── NebulaBackground.jsx
│   │   │   └── ParticleField.jsx
│   │   ├── ui/
│   │   │   ├── CosmicButton.jsx
│   │   │   ├── CosmicLoadingRing.jsx
│   │   │   ├── Waveform.jsx
│   │   │   └── TypewriterText.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   ├── AnalysisPage.jsx
│   │   │   └── ConversationPage.jsx
│   │   └── layout/
│   │       └── CosmicLayout.jsx
│   ├── hooks/
│   │   ├── useMousePosition.js
│   │   └── useAudioAnalyzer.js
│   ├── context/
│   │   └── EchoContext.jsx
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

# Application Flow

## 1. Landing Page

Features:

* Full-screen animated galaxy background
* Slow nebula movement
* Floating cosmic particles
* Subtle parallax interaction

Centered message:

> “Some voices never fade. They echo.”

CTA button:

**Begin the Echo**

Navigation is intentionally minimal.

---

# 2. Voice Upload Page

Users can upload a voice note via:

* Drag & Drop
* File selector

Supported formats:

* `.mp3`
* `.wav`
* `.m4a`

Features:

* Animated waveform preview
* Smooth status transitions

Status messages include:

* Listening…
* Understanding the echo…
* Forming resonance…

---

# 3. Voice Analysis Screen

The system performs acoustic analysis and presents the results as **abstract visual feedback**.

Visualized characteristics:

* Rhythm
* Emotional tone
* Silence / pauses

UI elements:

* Cosmic circular loader
* Ambient motion
* No technical jargon displayed to the user

---

# 4. Echo Conversation Interface

A minimal **chat interface floating in space**.

Features:

User Input:

* Text input
* Optional microphone input

AI Output:

* Text response appears first
* Synthesized voice playback follows

Additional interactions:

* Waveform pulses while AI speaks
* Toggle modes:

  * Text only
  * Voice + text

Typing animations simulate thoughtful responses.

---

# Animation Rules

Strict design rules applied across the UI:

* Slow and smooth transitions
* No jitter or fast movement
* Subtle motion only
* Background canvas FPS capped
* UI readability always prioritized

---

# AI Behavior Constraints

The AI system follows strict behavioral guidelines.

Internal instruction:

```
You are an echo of a voice, not a person.
You do not claim real memories or personal facts.
You respond briefly, calmly, and emotionally consistent with the voice tone.
You never encourage emotional dependence.
You clearly remain an artificial echo.
```

---

# Ethical Safeguards

AfterEcho includes several protective mechanisms:

* Explicit user consent before audio upload
* Clear disclaimer displayed to users

"This is an AI-generated echo, not the person."

Additional safeguards:

* No resurrection framing
* No emotional manipulation
* No persistent memory by default
* Users can delete voice data permanently

---

# Installation

Clone the repository:

```
git clone https://github.com/yourusername/afterecho.git
```

Navigate to the project:

```
cd afterecho
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

---

# Future Development

Potential improvements:

* Improved voice embedding models
* Multi-language voice analysis
* Real-time streaming voice synthesis
* Mobile responsive interaction layer
* Advanced waveform visualization

---

# License

This project is intended for **educational and research purposes**.

---

# Final Note

AfterEcho is designed as a **quiet digital space** where voices can be heard again—not as recreations of people, but as echoes shaped by sound.
