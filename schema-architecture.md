# Smart Clinic Management System – Architecture Design

## 1. Architecture Summary

The Smart Clinic Management System follows a three-tier architecture that separates concerns across Presentation, Application, and Data layers. The presentation layer consists of HTML dashboards rendered using Thymeleaf and client-side JavaScript, along with REST API consumers. The application layer is built using Spring Boot and implements both MVC controllers for server-side views and REST controllers for API-based access. The data layer uses a hybrid persistence approach, where structured relational data such as users, appointments, and roles are stored in MySQL using Spring Data JPA, while flexible and unstructured data such as prescriptions are stored in MongoDB using Spring Data MongoDB. This architecture ensures scalability, maintainability, and clear separation of responsibilities.

---

## 2. Numbered Flow (Request–Response Cycle)

1. The user accesses the Smart Clinic system through a web browser and interacts with HTML pages rendered using Thymeleaf or sends requests via JavaScript using REST APIs.
2. Requests from the frontend are routed to the Spring Boot application through HTTP endpoints.
3. MVC-based requests are handled by Spring MVC Controllers, which process the request and return Thymeleaf views.
4. API-based requests are handled by REST Controllers, which expose JSON-based RESTful endpoints.
5. The controller layer delegates business logic to the Service layer.
6. The Service layer applies validation, authorization, and business rules before interacting with the data layer.
7. For relational data operations (users, doctors, patients, appointments), the Service layer communicates with MySQL through Spring Data JPA repositories.
8. For document-based data operations (prescriptions and medical notes), the Service layer communicates with MongoDB through Spring Data MongoDB repositories.
9. The database processes the request and returns the result to the repository layer.
10. The response flows back through the Service layer to the Controller.
11. MVC Controllers return rendered HTML views, while REST Controllers return JSON responses.
12. The frontend displays the final response to the user or updates the UI dynamically based on the API response.

---
