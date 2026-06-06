# Spring-Security-API

This project is a Spring Boot + Spring Security + PostgreSQL API starter for the Sientenium Asset Management System.

## Included
- Spring Web
- Spring Security
- Spring Data JPA
- PostgreSQL driver
- Validation
- Role-based access control
- Auth endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
  - Protected dashboard endpoints under /api/admin, /api/manager, /api/staff

## Run locally
1. Start PostgreSQL:
   docker compose up -d
2. Run the API:
   mvn spring-boot:run

## Test
mvn test
