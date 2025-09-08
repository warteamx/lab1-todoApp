un docker build -t lab1-todoapp-server:latest --target production .
docker build -t lab1-todoapp-server:latest --target production .
docker save lab1-todoapp-server:latest | gzip > lab1-todoapp-server.tar.gz
shell: /usr/bin/bash -e {0}
env:
AWS_DEFAULT_REGION: **_
AWS_REGION: _**
AWS_ACCESS_KEY_ID: **_
AWS_SECRET_ACCESS_KEY: _**
#0 building with "default" instance using docker driver

#1 [internal] load build definition from Dockerfile
#1 transferring dockerfile: 1.90kB done
#1 DONE 0.0s

#2 [internal] load metadata for docker.io/library/node:18-alpine
#2 ...

#3 [auth] library/node:pull token for registry-1.docker.io
#3 DONE 0.0s

#2 [internal] load metadata for docker.io/library/node:18-alpine
#2 DONE 0.7s

#4 [internal] load .dockerignore
#4 transferring context: 853B done
#4 DONE 0.0s

#5 [internal] load build context
#5 transferring context: 425.49kB 0.0s done
#5 DONE 0.0s

#6 [base 1/5] FROM docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e
#6 resolve docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e done
#6 sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e 7.67kB / 7.67kB done
#6 sha256:929b04d7c782f04f615cf785488fed452b6569f87c73ff666ad553a7554f0006 1.72kB / 1.72kB done
#6 sha256:ee77c6cd7c1886ecc802ad6cedef3a8ec1ea27d1fb96162bf03dd3710839b8da 6.18kB / 6.18kB done
#6 sha256:dd71dde834b5c203d162902e6b8994cb2309ae049a0eabc4efea161b2b5a3d0e 0B / 40.01MB 0.1s
#6 sha256:1e5a4c89cee5c0826c540ab06d4b6b491c96eda01837f430bd47f0d26702d6e3 0B / 1.26MB 0.1s
#6 sha256:dd71dde834b5c203d162902e6b8994cb2309ae049a0eabc4efea161b2b5a3d0e 26.21MB / 40.01MB 0.3s
#6 sha256:1e5a4c89cee5c0826c540ab06d4b6b491c96eda01837f430bd47f0d26702d6e3 1.26MB / 1.26MB 0.1s done
#6 extracting sha256:f18232174bc91741fdf3da96d85011092101a032a93a388b79e99e69c2d5c870 0.1s done
#6 sha256:25ff2da83641908f65c3a74d80409d6b1b62ccfaab220b9ea70b80df5a2e0549 446B / 446B 0.2s done
#6 sha256:f18232174bc91741fdf3da96d85011092101a032a93a388b79e99e69c2d5c870 3.64MB / 3.64MB 0.1s done
#6 sha256:dd71dde834b5c203d162902e6b8994cb2309ae049a0eabc4efea161b2b5a3d0e 34.60MB / 40.01MB 0.4s
#6 sha256:dd71dde834b5c203d162902e6b8994cb2309ae049a0eabc4efea161b2b5a3d0e 40.01MB / 40.01MB 0.5s done
#6 extracting sha256:dd71dde834b5c203d162902e6b8994cb2309ae049a0eabc4efea161b2b5a3d0e 0.1s
#6 extracting sha256:dd71dde834b5c203d162902e6b8994cb2309ae049a0eabc4efea161b2b5a3d0e 1.0s done
#6 extracting sha256:1e5a4c89cee5c0826c540ab06d4b6b491c96eda01837f430bd47f0d26702d6e3
#6 extracting sha256:1e5a4c89cee5c0826c540ab06d4b6b491c96eda01837f430bd47f0d26702d6e3 0.0s done
#6 extracting sha256:25ff2da83641908f65c3a74d80409d6b1b62ccfaab220b9ea70b80df5a2e0549 done
#6 DONE 1.7s

#7 [base 2/5] WORKDIR /app
#7 DONE 0.0s

#8 [base 3/5] RUN apk add --no-cache dumb-init
#8 0.154 fetch https://dl-cdn.alpinelinux.org/alpine/v3.21/main/x86_64/APKINDEX.tar.gz
#8 0.223 fetch https://dl-cdn.alpinelinux.org/alpine/v3.21/community/x86_64/APKINDEX.tar.gz
#8 0.487 (1/1) Installing dumb-init (1.2.5-r3)
#8 0.494 Executing busybox-1.37.0-r12.trigger
#8 0.501 OK: 10 MiB in 18 packages
#8 DONE 0.6s

#9 [base 4/5] RUN addgroup -g 1001 -S nodejs
#9 DONE 0.1s

#10 [base 5/5] RUN adduser -S serveruser -u 1001
#10 DONE 0.1s

#11 [build 1/4] COPY package\*.json ./
#11 DONE 0.0s

#12 [deps 2/2] RUN npm ci --only=production && npm cache clean --force
#12 0.299 npm warn config only Use `--omit=dev` to omit dev dependencies from the install.
#12 1.340 npm warn ERESOLVE overriding peer dependency
#12 1.341 npm warn While resolving: vite@7.0.4
#12 1.341 npm warn Found: @types/node@22.9.0
#12 1.341 npm warn node_modules/@types/node
#12 1.341 npm warn dev @types/node@"22.9.0" from the root project
#12 1.341 npm warn 3 more (@types/morgan, ts-node, vitest)
#12 1.341 npm warn
#12 1.341 npm warn Could not resolve dependency:
#12 1.341 npm warn peerOptional @types/node@"^20.19.0 || >=22.12.0" from vite@7.0.4
#12 1.341 npm warn node_modules/vite
#12 1.341 npm warn peerOptional vite@"^5.0.0 || ^6.0.0 || ^7.0.0-0" from @vitest/mocker@3.2.4
#12 1.341 npm warn node_modules/@vitest/mocker
#12 1.341 npm warn 2 more (vite-node, vitest)
#12 1.341 npm warn
#12 1.341 npm warn Conflicting peer dependency: @types/node@24.3.0
#12 1.341 npm warn node_modules/@types/node
#12 1.341 npm warn peerOptional @types/node@"^20.19.0 || >=22.12.0" from vite@7.0.4
#12 1.341 npm warn node_modules/vite
#12 1.341 npm warn peerOptional vite@"^5.0.0 || ^6.0.0 || ^7.0.0-0" from @vitest/mocker@3.2.4
#12 1.341 npm warn node_modules/@vitest/mocker
#12 1.341 npm warn 2 more (vite-node, vitest)
#12 1.349 npm warn EBADENGINE Unsupported engine {
#12 1.349 npm warn EBADENGINE package: 'vite@7.0.4',
#12 1.349 npm warn EBADENGINE required: { node: '^20.19.0 || >=22.12.0' },
#12 1.349 npm warn EBADENGINE current: { node: 'v18.20.8', npm: '10.8.2' }
#12 1.349 npm warn EBADENGINE }
#12 3.046
#12 3.046 added 138 packages, and audited 139 packages in 3s
#12 3.046
#12 3.046 18 packages are looking for funding
#12 3.046 run `npm fund` for details
#12 3.048
#12 3.048 found 0 vulnerabilities
#12 3.049 npm notice
#12 3.049 npm notice New major version of npm available! 10.8.2 -> 11.5.2
#12 3.049 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.5.2
#12 3.049 npm notice To update run: npm install -g npm@11.5.2
#12 3.049 npm notice
#12 3.230 npm warn using --force Recommended protections disabled.
#12 DONE 3.7s

#13 [build 2/4] RUN npm ci
#13 1.317 npm warn ERESOLVE overriding peer dependency
#13 1.318 npm warn While resolving: vite@7.0.4
#13 1.318 npm warn Found: @types/node@22.9.0
#13 1.318 npm warn node_modules/@types/node
#13 1.318 npm warn dev @types/node@"22.9.0" from the root project
#13 1.318 npm warn 3 more (@types/morgan, ts-node, vitest)
#13 1.318 npm warn
#13 1.318 npm warn Could not resolve dependency:
#13 1.318 npm warn peerOptional @types/node@"^20.19.0 || >=22.12.0" from vite@7.0.4
#13 1.318 npm warn node_modules/vite
#13 1.318 npm warn peerOptional vite@"^5.0.0 || ^6.0.0 || ^7.0.0-0" from @vitest/mocker@3.2.4
#13 1.318 npm warn node_modules/@vitest/mocker
#13 1.318 npm warn 2 more (vite-node, vitest)
#13 1.318 npm warn
#13 1.318 npm warn Conflicting peer dependency: @types/node@24.3.0
#13 1.318 npm warn node_modules/@types/node
#13 1.318 npm warn peerOptional @types/node@"^20.19.0 || >=22.12.0" from vite@7.0.4
#13 1.318 npm warn node_modules/vite
#13 1.318 npm warn peerOptional vite@"^5.0.0 || ^6.0.0 || ^7.0.0-0" from @vitest/mocker@3.2.4
#13 1.318 npm warn node_modules/@vitest/mocker
#13 1.318 npm warn 2 more (vite-node, vitest)
#13 1.324 npm warn EBADENGINE Unsupported engine {
#13 1.324 npm warn EBADENGINE package: 'vite@7.0.4',
#13 1.324 npm warn EBADENGINE required: { node: '^20.19.0 || >=22.12.0' },
#13 1.324 npm warn EBADENGINE current: { node: 'v18.20.8', npm: '10.8.2' }
#13 1.324 npm warn EBADENGINE }
#13 ...

#14 [production 1/5] COPY --from=deps /app/node_modules ./node_modules
#14 DONE 0.4s

#13 [build 2/4] RUN npm ci
#13 7.502
#13 7.502 added 510 packages, and audited 511 packages in 7s
#13 7.502
#13 7.502 103 packages are looking for funding
#13 7.502 run `npm fund` for details
#13 7.504
#13 7.504 1 critical severity vulnerability
#13 7.504
#13 7.504 To address all issues, run:
#13 7.504 npm audit fix
#13 7.504
#13 7.504 Run `npm audit` for details.
#13 7.506 npm notice
#13 7.506 npm notice New major version of npm available! 10.8.2 -> 11.5.2
#13 7.506 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.5.2
#13 7.506 npm notice To update run: npm install -g npm@11.5.2
#13 7.506 npm notice
#13 DONE 7.7s

#15 [build 3/4] COPY . .
#15 DONE 0.0s

#16 [build 4/4] RUN npm run build
#16 0.280
#16 0.280 > server@1.1.0 build
#16 0.280 > tsc
#16 0.280
#16 0.439 Version 5.8.3
#16 0.443 tsc: The TypeScript Compiler - Version 5.8.3
#16 0.443
#16 0.443 COMMON COMMANDS
#16 0.443
#16 0.443 tsc
#16 0.443 Compiles the current project (tsconfig.json in the working directory.)
#16 0.443
#16 0.443 tsc app.ts util.ts
#16 0.443 Ignoring tsconfig.json, compiles the specified files with default compiler options.
#16 0.443
#16 0.443 tsc -b
#16 0.443 Build a composite project in the working directory.
#16 0.443
#16 0.443 tsc --init
#16 0.443 Creates a tsconfig.json with the recommended settings in the working directory.
#16 0.443
#16 0.443 tsc -p ./path/to/tsconfig.json
#16 0.443 Compiles the TypeScript project located at the specified path.
#16 0.443
#16 0.443 tsc --help --all
#16 0.443 An expanded version of this information, showing all possible compiler options
#16 0.443
#16 0.443 tsc --noEmit
#16 0.443 tsc --target esnext
#16 0.443 Compiles the current project, with additional settings.
#16 0.443
#16 0.444 COMMAND LINE FLAGS
#16 0.444
#16 0.444 --help, -h
#16 0.444 Print this message.
#16 0.444
#16 0.444 --watch, -w
#16 0.444 Watch input files.
#16 0.444
#16 0.444 --all
#16 0.444 Show all compiler options.
#16 0.444
#16 0.444 --version, -v
#16 0.444 Print the compiler's version.
#16 0.444
#16 0.444 --init
#16 0.444 Initializes a TypeScript project and creates a tsconfig.json file.
#16 0.444
#16 0.444 --project, -p
#16 0.444 Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.
#16 0.444
#16 0.444 --showConfig
#16 0.444 Print the final configuration instead of building.
#16 0.444
#16 0.444 --build, -b
#16 0.444 Build one or more projects and their dependencies, if out of date
#16 0.444
#16 0.444 COMMON COMPILER OPTIONS
#16 0.444
#16 0.444 --pretty
#16 0.444 Enable color and formatting in TypeScript's output to make compiler errors easier to read.
#16 0.444 type: boolean
#16 0.444 default: true
#16 0.444
#16 0.444 --declaration, -d
#16 0.444 Generate .d.ts files from TypeScript and JavaScript files in your project.
#16 0.444 type: boolean
#16 0.444 default: `false`, unless `composite` is set
#16 0.444
#16 0.444 --declarationMap
#16 0.444 Create sourcemaps for d.ts files.
#16 0.444 type: boolean
#16 0.444 default: false
#16 0.444
#16 0.444 --emitDeclarationOnly
#16 0.445 Only output d.ts files and not JavaScript files.
#16 0.445 type: boolean
#16 0.445 default: false
#16 0.445
#16 0.445 --sourceMap
#16 0.445 Create source map files for emitted JavaScript files.
#16 0.445 type: boolean
#16 0.445 default: false
#16 0.445
#16 0.445 --noEmit
#16 0.445 Disable emitting files from a compilation.
#16 0.445 type: boolean
#16 0.445 default: false
#16 0.445
#16 0.445 --target, -t
#16 0.445 Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
#16 0.445 one of: es5, es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, esnext
#16 0.445 default: es5
#16 0.445
#16 0.445 --module, -m
#16 0.445 Specify what module code is generated.
#16 0.445 one of: none, commonjs, amd, umd, system, es6/es2015, es2020, es2022, esnext, node16, node18, nodenext, preserve
#16 0.445 default: undefined
#16 0.445
#16 0.445 --lib
#16 0.445 Specify a set of bundled library declaration files that describe the target runtime environment.
#16 0.445 one or more: es5, es6/es2015, es7/es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, esnext, dom, dom.iterable, dom.asynciterable, webworker, webworker.importscripts, webworker.iterable, webworker.asynciterable, scripthost, es2015.core, es2015.collection, es2015.generator, es2015.iterable, es2015.promise, es2015.proxy, es2015.reflect, es2015.symbol, es2015.symbol.wellknown, es2016.array.include, es2016.intl, es2017.arraybuffer, es2017.date, es2017.object, es2017.sharedmemory, es2017.string, es2017.intl, es2017.typedarrays, es2018.asyncgenerator, es2018.asynciterable/esnext.asynciterable, es2018.intl, es2018.promise, es2018.regexp, es2019.array, es2019.object, es2019.string, es2019.symbol/esnext.symbol, es2019.intl, es2020.bigint/esnext.bigint, es2020.date, es2020.promise, es2020.sharedmemory, es2020.string, es2020.symbol.wellknown, es2020.intl, es2020.number, es2021.promise, es2021.string, es2021.weakref/esnext.weakref, es2021.intl, es2022.array, es2022.error, es2022.intl, es2022.object, es2022.string, es2022.regexp, es2023.array, es2023.collection, es2023.intl, es2024.arraybuffer, es2024.collection, es2024.object/esnext.object, es2024.promise, es2024.regexp/esnext.regexp, es2024.sharedmemory, es2024.string/esnext.string, esnext.array, esnext.collection, esnext.intl, esnext.disposable, esnext.promise, esnext.decorators, esnext.iterator, esnext.float16, decorators, decorators.legacy
#16 0.445 default: undefined
#16 0.445
#16 0.445 --allowJs
#16 0.445 Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files.
#16 0.445 type: boolean
#16 0.445 default: false
#16 0.445
#16 0.445 --checkJs
#16 0.445 Enable error reporting in type-checked JavaScript files.
#16 0.445 type: boolean
#16 0.445 default: false
#16 0.445
#16 0.445 --jsx
#16 0.445 Specify what JSX code is generated.
#16 0.445 one of: preserve, react, react-native, react-jsx, react-jsxdev
#16 0.445 default: undefined
#16 0.445
#16 0.445 --outFile
#16 0.445 Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output.
#16 0.445
#16 0.445 --outDir
#16 0.445 Specify an output folder for all emitted files.
#16 0.445
#16 0.445 --removeComments
#16 0.445 Disable emitting comments.
#16 0.445 type: boolean
#16 0.445 default: false
#16 0.445
#16 0.445 --strict
#16 0.445 Enable all strict type-checking options.
#16 0.445 type: boolean
#16 0.445 default: false
#16 0.445
#16 0.445 --types
#16 0.445 Specify type package names to be included without being referenced in a source file.
#16 0.445
#16 0.445 --esModuleInterop
#16 0.445 Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility.
#16 0.445 type: boolean
#16 0.445 default: false
#16 0.445
#16 0.445 You can learn about all of the compiler options at https://aka.ms/tsc
#16 0.445
#16 ERROR: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1

---

> [build 4/4] RUN npm run build:
> 0.445 --types
> 0.445 Specify type package names to be included without being referenced in a source file.
> 0.445
> 0.445 --esModuleInterop
> 0.445 Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility.
> 0.445 type: boolean
> 0.445 default: false
> 0.445
> 0.445 You can learn about all of the compiler options at https://aka.ms/tsc

## 0.445

## Dockerfile:47

45 | COPY . .
46 | # Build the application
47 | >>> RUN npm run build
48 |  
 49 | # Production stage

---

ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1
Error: Process completed with exit code 1.
