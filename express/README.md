# Express TypeScript Server

This project is a simple Express server built with TypeScript. It serves as a template for creating RESTful APIs using Express and TypeScript.

## Project Structure

```text
express-ts-server
├── src
│   ├── app.ts               # Configures the Express application
│   ├── server.ts            # Entry point for starting the server
│   ├── controllers          # Contains route controllers
│   │   └── index.ts         # Exports IndexController
│   ├── routes               # Defines application routes
│   │   └── index.ts         # Exports setRoutes function
│   └── types                # Custom TypeScript types
│       └── index.ts         # Exports custom interfaces
├── package.json             # npm configuration file
├── tsconfig.json            # TypeScript configuration file
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:

```bash
   git clone <repository-url>
   cd express-ts-server
```

2. Install dependencies:

```bash
   npm install
```

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will listen on the specified port (default is 3000). You can access the API at `http://localhost:3000`.

## Development

To compile the TypeScript files, use:

```bash
npm run build
```

For development, you can use:

```bash
npm run dev
```

This will watch for changes in the TypeScript files and automatically recompile them.

## License

This project is licensed under the MIT License.