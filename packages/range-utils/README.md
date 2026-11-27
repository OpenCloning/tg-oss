<!-- TOC -->

- [[CHANGELOG](Changelog.md)](#changelogchangelogmd)
- [Installing](#installing)
- [Usage](#usage)
- [About this Repo](#about-this-repo)
- [Editing This Repo:](#editing-this-repo)
  - [All collaborators:](#all-collaborators)
- [Updating this repo:](#updating-this-repo)
  - [Outside collaborators:](#outside-collaborators)
- [Building](#building)
- [Running unit tests](#running-unit-tests)

<!-- /TOC -->

## [CHANGELOG](Changelog.md)

## Installing

```
npm install @opencloning/tg-oss-range-utils
```

## Usage

```
import { getRangeLength } from '@opencloning/tg-oss-range-utils';
```

## About this Repo

This is a collection of range utility functions.

A range must be an object with a start and end property.
Eg:

```
const myRange = {
	start: 10,
	end: 40
}
```

A "circular" range has a start > end.
Eg:

```
const myRange2 = {
	start: 50,
	end: 40
}
```

All ranges are assumed to have 0-based inclusive indices:

rrrr
0123
start = 0,
end = 3

## Editing This Repo:

### All collaborators:

Edit/create a new file and update/add any relevant tests.
You can run `npm test` to make sure all tests pass.
Tests will automatically be run pre-commit.

## Updating this repo:

### Outside collaborators:

fork and pull request please :)

## Building

Run `yarn workspace @opencloning/tg-oss-range-utils build` to build the library.

## Running unit tests

Run `yarn workspace @opencloning/tg-oss-range-utils test` to execute the unit tests (with bun).
