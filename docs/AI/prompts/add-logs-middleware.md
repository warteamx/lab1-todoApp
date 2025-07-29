# 🧠 AI Prompt: Create a Logger for Node.js Express Using Winston + Morgan

Act as an expert Node.js backend developer. Use Best Practices. Domain Driven Design. Easy To Change. Add documentation Readme.logger.md. 

## 🎯 Goal

Generate code that:

- ✅ Creates a **centralized logger** using **Winston**
- ✅ Integrates **Morgan** to log HTTP requests
- ✅ Sends Morgan logs through Winston
- ✅ Writes logs to:
  - Dev mode: choose a library for log-viewer with UI in a dedicated Port (in development)
  - Files (in all environments) (In the future we will choose a cloud service)
- ✅ Supports **log levels** (`info`, `error`, `debug`, etc.)
- ✅ Structures the logger in a separate `common/utils/logger.ts` file
- ✅ Apply the logger in the middleware  `common/middleware//logger.middleware.ts` file
- ✅ Uses environment detection (`process.env.NODE_ENV`)
- ✅ Prevents sensitive info from being logged
- ✅ Logs errors with stack traces
- ✅ In dev mode see full body, tokens. 

## 📦 Additional Requirements

- Use TypeScript
- Use file logs:
  - `logs/combined.log`
  - `logs/error.log`
- Use `morgan("combined")` format
- Pipe Morgan logs to Winston via a custom stream
- Export the logger for use in other files

## 💡 Optional (Advanced)

If possible, show how to:

- Add a transport for Easy to Change external logging (like AWS, GCP, CloudWatch, BetterTrace etc...)
- Highlight differences between dev/prod logging formats
- In Production environment Mask sensitive data from request body or query strings