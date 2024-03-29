### App

GymPass style app.

### FRs (Functional Requirements)

- [x] It should be possible to register;
- [x] It should be possible to authenticate;
- [x] It should be possible to obtain the profile of a logged-in user;
- [x] It should be possible to obtain the number of check-ins made by the logged-in user;
- [x] It should be possible to obtain your check-in history;
- [x] The user should be able to search for nearby gyms (until 10km);
- [x] The user should be able to search for gyms by name;
- [x] It should be possible to check-in at a gym;
- [x] It should be possible to validate a user’s check-in;
- [x] It should be possible to register a gym;

### BRs (Business Rules)

- [x] The user should not be able to register with a duplicate email;
- [x] The user cannot make 2 check-ins on the same day;
- [x] The user cannot check-in if they are not close (100m) to the gym;
- [x] The check-in can only be validated up to 20 minutes after being created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

### NFRs (Non-Functional Requirements)

- [x] The user’s password needs to be encrypted;
- [x] The application data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token).
