# AStar Agents - LangGraph Workflow Enhancement

## Overview

**AStar Agents** is a Visual Studio Code extension designed to enhance your workflow when working with LangGraphs. This extension provides a simple command that allows you to quickly create a standard folder structure and files necessary to start working with LangGraphs in your project.

## Features

- **Create LangGraph Structure**: Automatically generate a pre-defined folder structure with all necessary files for LangGraph development by running a simple command.

## Installation

You can install this extension from the Visual Studio Code Marketplace.

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for "AStar Agents".
4. Click "Install" to install the extension.

Alternatively, if you have the `.vsix` file:

1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X`).
3. Click on the three-dot menu at the top and select **Install from VSIX...**.
4. Choose the `.vsix` file.

## Usage

1. Open your workspace in Visual Studio Code.
2. Press `Ctrl+Shift+P` to open the Command Palette.
3. Type "Create Langgraph Structure" and select the command.
4. Enter the name for your new LangGraph agent when prompted.
5. The extension will create the necessary folder structure and files in your workspace.

## Folder Structure

The extension creates the following folder structure:

my-agent/
├── utils/
│ ├── init.py
│ ├── tools.py
│ ├── nodes.py
│ └── state.py
├── init.py
├── agent.py
├── requirements.txt
└── langgraph.json


- **`utils/`**: Contains utility scripts for your graph.
- **`agent.py`**: Main script for constructing your graph.
- **`requirements.txt`**: Lists the dependencies required for your LangGraph project.
- **`langgraph.json`**: Configuration file for LangGraph.

## Contributing

Contributions are welcome! If you have suggestions or encounter any issues, please feel free to create a pull request or file an issue on the [GitHub repository](#).

