_This project has been created as part of the 42 curriculum by mnijsen, svan-hoo, lade-kon, and mde-beer_

# People In Tires
## __Description:__

PIT(People In Tires) is a game in which you play as the pitstop crew in a F1 race.

## __Instructions:__

To start the server it needs a .env with some server details.  

```
DATABASE_URL="postgresql://postgres:admin@localhost:5432/prisma"
POSTGRES_HOST_AUTH_METHOD=trust
AUTH_TRUST_HOST=true

POSTGRES_USER="postgres"
POSTGRES_DB="prisma"
POSTGRES_PASSWORD= {password}

AUTH_42_SCHOOL_ID= {key from oauth service}
AUTH_42_SCHOOL_SECRET= {key from oauth service}
AUTH_GITHUB_ID= {key from oauth service}
AUTH_GITHUB_SECRET= {key from oauth service}
```

For the OAuth to work the service needs to be registered at either/both Github and 42, provide the keys for the registered server in .env.
`docker compose up --build`

## __Resources:__

- [react](https://react.dev/reference/react)  
	- [react-draggable](https://www.npmjs.com/package/react-draggable)  
	- [react-zustand](https://www.npmjs.com/package/zustand)  
- [next](http://nextjs.org/docs)  
- [prisma](https://www.prisma.io/docs/orm)  
- [rust](https://docs.rs/docsrs/latest/docsrs/)  

ai usage: Suspiciously high fidelity leaf used as a temp image.

## __Team Information:__

- Milan Nijsen(mnijsen): PO, Developer, Artist  
- Simon van Hoogstraaten(svan-hoo): Developer  
- Laura de Koning(lade-kon): PM, Developer  
- Mats de Beer(mde-beer): Tech Lead, Developer  

## __Project Management:__

Communication and coordination in this project happened primarily over a discord, github issues, and sprints.

## __Technical Stack:__

- Front and backend: Next.js (built on react): cause first on list  
- Database: Prisma  
- Simulation: Wasm, Rust  

## __Database Schema:__


## __Features List:__


## __Modules:__

- (2)Fullstack framework: PIT has been built using next.js which provides tools for the front- and backend.  
- (2)User to user interaction: PIT has a global chat, a profile page for the user, and supports adding/removing friends.  
- (1)ORM implementation: PIT's database is implemented using Prisma ORM.  
- (1)Additional browser support: PIT functions on all browsers which support modern css (make concrete list).  
- (2)Standard user management and authentication: 
	- Users can modify profile information like: username, avatar, personal details etc.  
	- Pit features a friend list with their current status.  
	- Users can visit their friends profile pages.  
- (1)Server-Side rendering: Next.js's server components have been utilized throughout PIT.  
- (1)OAuth 2.0: PIT allows for linking a account with a GitHub and 42 account.  

- (2)Web based game: PIT features minigames implemented in React and a simulation created in Rust.  
- (2)Remote players: Multiple clients can subsribe to a lobby, information in syncronised via the database as this contains the most recent 'race state'.  
- (2)Multiplayer game: The lobby is limited to 12 players max. Balance is fairer the more players as the cpus are busted.  

Custom Modules:
- (1)Web assembly: idk webassembly and rust are weird and utilizing and communicating between different languages is hard (js with null pointers).  
- (1)Simulation: same as creating a game requires knowing some tech a sim also???????????.  

## __Individual Contributions:__

- Milan Nijsen(mnijsen): Game dev
- Simon van Hoogstraaten(svan-hoo): State system game, 
- Laura de Koning(lade-kon): Database, webpages
- Mats de Beer(mde-beer): Simulation, Docker
