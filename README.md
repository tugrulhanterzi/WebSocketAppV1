# WebSocketAppV1

This project demonstrates a WebSocket-based application designed to communicate with sensors connected to a Raspberry Pi Pico W microcontroller. The application is built using React Native and connects to a WebSocket server to fetch real-time sensor data, simulating real-world data from devices like temperature sensors, relays, and more.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Future Plans](#future-plans)

## Features
- Connects to a WebSocket server to fetch real-time data from sensors.
- Displays sensor data in a user-friendly interface.
- Supports multiple sensors, including temperature, humidity, and more.
- Modular component structure (Atoms, Molecules, Organisms) to manage UI.
- React Native Expo-based mobile application.
- Flexible and scalable design to support adding more sensors and devices.

## Technologies
- **React Native**: JavaScript framework for building mobile apps.
- **Expo**: A set of tools to simplify the development of React Native apps.
- **WebSocket**: Real-time communication protocol used to receive data from a server.
- **Raspberry Pi Pico W**: Microcontroller used for data transmission from sensors.

## Installation

### Prerequisites
- Node.js & npm installed
- Expo CLI installed (`npm install -g expo-cli`)
- React Native environment set up ([guide](https://reactnative.dev/docs/environment-setup))
- A WebSocket server to test the app (simulating sensor data)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/tugrulhanterzi/WebSocketAppV1.git
   cd WebSocketAppV1
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Expo Development Server**
   ```bash
   expo start
   ```

4. **Configure the WebSocket URL**
   - Open the `src/config.js` file.
   - Update the WebSocket URL to point to your WebSocket server.
   ```js
   export const WEBSOCKET_URL = 'ws://your-websocket-server-url';
   ```

## Running the Project

1. Ensure that the WebSocket server is running and simulating or providing real sensor data.
2. Run the Expo development server using `expo start`.
3. Use the Expo Go app on your mobile device or a simulator to view the application.
4. The app will connect to the WebSocket server and start displaying the sensor data.

## Usage
- **Main Screen**: Displays real-time sensor values in a graphical format.
- **Modular Design**: Components for different sensors can be found in the `src/components` folder. These include:
  - Atoms: Basic UI elements (buttons, text, etc.).
  - Molecules: Combined components (charts, lists, etc.).
  - Organisms: Complex UI components displaying sensor data.

## Future Plans
- Add support for Bluetooth communication with Raspberry Pi Pico W.
- Add integration with a cloud service for data storage and analysis.
