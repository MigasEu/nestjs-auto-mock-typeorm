# nestjs-auto-mock Typeorm Repository addon

This is an add-on for *nestjs-auto-mock*.

It is meant to deal with the TypeORM's default repositories. We cannot get the class type from the metadata, so we need an add-on to deal with it.

## How to initiate it

```javascript
import { init as repoMockInit } from 'nestjs-auto-mock-typeorm';

repoMockInit();
```

or

```javascript
import { init as repoMockInit } from 'nestjs-auto-mock-typeorm';

repoMockInit(MockitoTest); // pass the MockTest you're using
```
