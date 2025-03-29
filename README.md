# R3F Studio

A modern, interactive 3D scene composition tool built with React Three Fiber (R3F) and Three.js.

## Features

- Interactive 3D scene creation and manipulation
- Real-time object transformation (translate, rotate, scale)
- Intuitive camera controls
- Asset library with basic shapes and model loading
- Clean, responsive UI with collapsible sidebar
- Scene management with lighting controls
- XR interaction capabilities (in development)

## Tech Stack

- **Frontend Framework:** React with Vite
- **3D Engine:** React Three Fiber (R3F) + Three.js
- **UI & Styling:** TailwindCSS and Shadcn/UI components
- **State Management:** Zustand
- **Interaction Tools:** drei library for object manipulation

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/r3f-studio.git
   cd r3f-studio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Scene Manipulation

- **Select objects** by clicking on them in the scene
- **Transform objects** using the transform controls
- **Change transform mode** using the sidebar controls:
  - Move (translate)
  - Rotate
  - Scale

### Asset Library

- Add basic shapes to your scene:
  - Cubes
  - Spheres
  - Planes
- Import custom models (GLTF/GLB) (in development)

### Camera Controls

- **Orbit** around the scene with left mouse button
- **Pan** with right mouse button
- **Zoom** with mouse wheel

## Project Structure

```
r3f-studio/
├── src/
│   ├── components/
│   │   ├── canvas/         # 3D scene components
│   │   ├── features/       # Feature-specific components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components
│   ├── lib/                # Utility functions
│   ├── store/              # State management
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
└── index.html              # HTML template
```

## Future Enhancements

- Scene saving/loading
- Advanced material editor
- Custom lighting setups
- Physics interactions
- Real-time collaboration
- Advanced shader management
- Automated testing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
