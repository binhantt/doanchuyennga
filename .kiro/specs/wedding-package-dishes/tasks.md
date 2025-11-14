# Implementation Plan

- [x] 1. Create enhanced domain entities for wedding packages with dishes


  - Create `WeddingPackageWithDishes` entity extending existing `WeddingPackage`
  - Create `PackageDishDetail` entity for detailed dish information in packages
  - Add proper TypeScript interfaces for menu categorization and totals
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Enhance GetWeddingPackageUseCase with dish information retrieval


  - [ ] 2.1 Add method to retrieve single package with dishes using JOIN queries
    - Implement efficient JOIN query across wedding_packages, package_dishes, dishes, and categories tables
    - Add logic to group dishes by category and calculate menu total value
    - Handle packages with no dishes gracefully

    - _Requirements: 1.1, 1.2, 3.1, 3.4_

  - [ ] 2.2 Add method to retrieve all packages with dishes summary
    - Implement bulk retrieval with dish count and menu value summary
    - Optimize query performance for multiple packages

    - Add proper ordering and pagination support
    - _Requirements: 1.1, 3.1, 3.2_

  - [ ] 2.3 Add method to retrieve available packages with full dish details
    - Filter only available packages and dishes
    - Include dish availability status in response
    - Sort packages by price and dishes by category
    - _Requirements: 1.1, 1.4, 4.2_

  - [ ]* 2.4 Write unit tests for enhanced use case methods
    - Test package retrieval with dishes
    - Test packages without dishes


    - Test dish categorization and menu value calculation
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 3. Enhance WeddingPackageController with new endpoints

  - [ ] 3.1 Add optional dish inclusion to existing endpoints
    - Modify `GetById` to support `?include_dishes=true` query parameter
    - Modify `GetAll` to support `?include_dishes=true` query parameter
    - Maintain backward compatibility for existing API consumers
    - _Requirements: 1.1, 3.3_


  - [ ] 3.2 Add dedicated endpoints for packages with dishes
    - Create `GetWithDishes` endpoint for single package with full dish details
    - Create `GetAllWithDishes` endpoint for all packages with dish summaries
    - Create `GetAvailableWithDishes` endpoint for available packages with dishes
    - _Requirements: 1.1, 1.2, 1.5_

  - [ ] 3.3 Add proper error handling and validation
    - Validate package IDs and query parameters
    - Return appropriate HTTP status codes and error messages
    - Handle database connection issues gracefully
    - _Requirements: 3.3, 3.5_

  - [ ]* 3.4 Write integration tests for enhanced controller endpoints
    - Test new endpoints with various parameters
    - Test backward compatibility of existing endpoints
    - Test error handling scenarios
    - _Requirements: 1.1, 1.2, 3.3_

- [ ] 4. Enhance PackageDishController with menu management features
  - [ ] 4.1 Add menu validation and constraint checking
    - Validate dish availability before adding to packages
    - Check menu value constraints against package budget
    - Validate dish categories for balanced menu composition
    - _Requirements: 2.4, 5.3_

  - [ ] 4.2 Add bulk menu operations
    - Enhance existing `AddMultipleDishesToWeddingPackage` with better validation
    - Add method to replace entire package menu in one operation
    - Add method to copy menu from one package to another
    - _Requirements: 2.1, 2.2, 5.2_

  - [ ] 4.3 Add menu template functionality
    - Create method to save package menu as reusable template
    - Create method to apply menu template to new packages
    - Add template validation and customization options
    - _Requirements: 5.1, 5.2_



  - [ ]* 4.4 Write unit tests for menu management features
    - Test menu validation logic
    - Test bulk operations and template functionality


    - Test error handling for invalid operations
    - _Requirements: 2.1, 2.2, 5.1_

- [ ] 5. Update routing configuration for new endpoints
  - [ ] 5.1 Add new routes to Users.routers.ts for customer-facing endpoints
    - Add `/wedding-packages/with-dishes` route for packages with full dish details
    - Add `/wedding-packages/available/with-dishes` route for available packages with dishes
    - Ensure proper route ordering and parameter handling
    - _Requirements: 1.1, 1.2_

  - [ ] 5.2 Add new routes to Admin.router.ts for admin menu management
    - Add routes for menu template operations
    - Add routes for bulk menu management
    - Add routes for menu validation and constraints
    - _Requirements: 2.1, 2.2, 5.1, 5.2_

- [ ] 6. Add database query optimization
  - [x] 6.1 Create database indexes for improved query performance


    - Add index on `package_dishes.package_id` for faster package lookups
    - Add composite index on `(package_id, dish_id)` for relationship queries
    - Add index on `dishes.category_id` for category-based sorting
    - _Requirements: 3.1, 3.4_


  - [ ] 6.2 Optimize JOIN queries for better performance
    - Review and optimize the complex JOIN query for packages with dishes
    - Add query result caching for frequently accessed packages
    - Implement proper pagination for large result sets
    - _Requirements: 3.1, 3.2_

- [ ] 7. Add comprehensive error handling and logging
  - [ ] 7.1 Implement structured error responses
    - Create consistent error response format with error codes
    - Add detailed error messages in Vietnamese for user-facing errors
    - Include request context in error responses for debugging
    - _Requirements: 3.3, 3.5_

  - [ ] 7.2 Add comprehensive logging for monitoring
    - Log all package and dish operations with relevant context
    - Add performance logging for complex queries
    - Log error details for debugging and monitoring
    - _Requirements: 3.5_



- [ ]* 8. Create comprehensive test suite
  - [ ]* 8.1 Write integration tests for complete workflows
    - Test complete package creation with dishes workflow
    - Test package retrieval with dishes from API to response
    - Test menu management operations end-to-end
    - _Requirements: 1.1, 2.1, 5.1_

  - [ ]* 8.2 Write performance tests for query optimization
    - Test query performance with large datasets
    - Test concurrent access to package with dishes endpoints
    - Test memory usage with complex package responses
    - _Requirements: 3.1, 3.4_

- [ ] 9. Update API documentation and examples
  - [ ] 9.1 Document new API endpoints and response formats
    - Create API documentation for new endpoints with example responses
    - Document query parameters and their effects
    - Provide example requests for common use cases
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ] 9.2 Create sample data and usage examples


    - Create sample wedding packages with diverse dish menus
    - Provide example API calls for different scenarios
    - Document best practices for menu management
    - _Requirements: 1.1, 2.1, 5.1_