# Course Template Repository

Welcome to the course template repository.
This repository serves as a starting point for all assignments and projects in the course.
Each subject has its own directory, and we will be using JavaScript as our main programming language.

# Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Tools](#development-tools)
- [Scripts](#scripts)
- [Coding Conventions](#coding-conventions)

# Prerequisites

You need to have `Node.js` and `npm` installed on your machine.
If you don't have them installed, you can download and install them from the official `Node.js` website:
[Download `Node.js`](https://nodejs.org/en).

`npm` is included with `Node.js`, so installing `Node.js` will also install `npm`.

# Getting Started

To get started with this repository, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/albaniles-digitales/workspace.git
   ```

This template repository may be updated throughout the course.
Make sure to pull the latest changes from the main branch to keep your repository up to date.

2. Install dependencies:

   Navigate to the repository directory and run:
   ```bash
   npm install
   ```

# Project Structure

The repository is organized as follows:

```
root
│   .eslintrc.js
│   .gitignore
│   jest.config.js
│   LICENSE
│   package.json
│   package-lock.json
│   README.md
│
└───subject1
│   │   README.md
│   │   index.js
│   │   ...
│
└───subject2
    │   README.md
    │   index.js
    │   ...
```

- Each subject has its own folder where you can find related assignments and projects.
- Common configurations for linting and testing are located at the root level.
- Each subject's folder contains a `README.md` file with specific information about that subject.

# Development Tools

We use the following tools to maintain code quality and consistency:
- [ESLint](https://eslint.org/): For linting JavaScript code. The configuration follows the Airbnb style guide.
- [Jest](https://jestjs.io/es-ES/): For running tests.

# Scripts

Here are the npm scripts you can use:

- Linting: To run ESLint and check for code quality issues:

  ```bash
  npm run lint
  ```

- Testing: To run the test suite using Jest:

  ```bash
  npm run test
  ```

# Coding conventions

Please adhere to the following coding conventions:

- We follow the Airbnb JavaScript style guide. You can find the full guide [here](https://github.com/airbnb/javascript).
- Ensure your code passes the ESLint checks defined in .eslintrc.js.
- Write meaningful commit messages.
- Use descriptive variable and function names.

# Continuous Integration with GitHub Actions

This repository is configured to use GitHub Actions for continuous integration. The workflow is defined in the `.github/workflows/ci.yml` file.

## Workflow Steps

1. **Install dependencies:** Installs the project dependencies using `npm install`, caching them based on `package-lock.json`.
2. **Run ESLint:** Lints the code to ensure it adheres to the Airbnb style guide.
3. **Run tests:** Runs the test suite using Jest.

## Triggering the Workflow

The workflow is triggered on any push to the repository.

You can view the status of the workflow in the "Actions" tab of your repository on GitHub.
