## How to setup a new TS Express Project:

```
1. npm init -y
```

```
2. npm i -D typescript
```

```
3. tsc --init
```

---
## Adding required Scripts:

```
1. "build": "npx tsc" -> Going to build (compile our Project)
```

```
2. "start": "npx nodemon dist/index.js" -> To keep track of any file changes in index.js File (final file)
```

Now, Before we start, We need to ensure that we have the latest compiled TS code -> compile before start -> before Start -> 'prestart'
Since prestart runs automatically before start, it can be used to compile our code before running
```
3. "prestart": "npm run build" -> going to run compiler before npm start
```

Now, even though we are running latest code, no-one is actually watching changes in our code -> So basically we're not getting latest code to compiler -> no latest code to nodemon
Hence, we need someone to watch for changes in our code -> 'tsc -w'
So, lets create a new Script for it: let's name it watch
```
4. "watch": "npx tsc -w"
```

Now, we need to run 2 processes concurrently -> one is watch and other is npm start!
One will watch the code, and other will run it!
But how will they run in parallel?
Ans -> new pkg -> concurrently -> npm i concurrently
now, concurrently can run multiple pkg simultaneously so we can have a final script like:
```
5. "dev": "npx concurrently \"npm run watch\" \"npm start\""
```

But wait -> one process keep running even after other terminates!
we want to terminate process even if a single piece of code fails!
So, modify as:
```
6. "dev": "npx --kill-others concurrently \"npx run watch\" \"npm start\""
```


---
## Adding ESLint

Run this:
```
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```
And Trust Me, It was a Hell Lot of Problem Setting it Up -> At end, I have to rely on AI to do it for me...., So If Possible, just copy the eslint.config.js. And set type to module in pkg.json

---

