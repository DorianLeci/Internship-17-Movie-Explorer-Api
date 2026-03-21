# Internship-17-Movie-Explorer-Api
**React App for exploring movies using local database which is populated from TMDB**

---

## Features
- Browse popular movies

- Search for movies with filters (release date, rating, popularity)

- View movie details: cast, crew, trailers, reviews

- Mark movies as favorites
---

## Requirements
- Node.js (v18+ recommended)
- npm (Node Package Manager)
- Docker & Docker Compose:
---

## Installation
1. Clone the repository:
```
git clone git@github.com:DorianLeci/Internship-17-Movie-Explorer-Api.git
```

2. Navigate into the project folder:
```
cd Internship-17-Movie-Explorer-Api
```

## Environment Variables

1. Navigate into backend folder:
   ```
   cd apps/backend
   ```
3. Copy the example environment file and create .env file:
   ```
   cp .env.example .env
   ```
   Read instructions in .env.example to generate JWT secret key for signing access tokens

4. Open .env and add your key: JWT_SECRET=your_secret_here


## Finally
3. Run with docker compose:
   Navigate into root folder:
   ```
   cd ..
   ``` 
-  Windows/Mac
   ```
   docker compose up --build
   ```
-  Linux
   ```
   sudo usermod -aG docker $USER
   docker compose up --build
   ```
---

## Access

   Frontend:
   ```
   http://localhost:5173/
   ```
   Backend Swagger documentation:
   ```
   http://localhost:3000/api
   ```







