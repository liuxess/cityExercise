# City Exercise by Helmes
Done by Lukas Jankauskas from Telesoftas;

## Prerequisites
- `maven` 
- `npm` or `yarn`
- `MySQL` database

# Setup

### Integration

By Default, the environments expect:
- MySQL reachable in port 3306, with username root and no password;
- Port 8080 available for Backend;
- Port 3000 for Frontend;

To change MySQL settings, go to BE [application.properties](./backend/cities/src/main/resources/application.properties) and update the corresponding fields. Database, if name available, will setup automagically.

If Backend is not available on port 8080, change the FE [Global Config](./frontend/src/API/Config.js) to accommodate the correct BE address.

If Frontend is not available on port 3000, change the BE [SecurityConfiguration](./backend/cities/src/main/java/com/helmes/cities/configuration/SecurityConfiguration.java) and update CORS rules to the correct address.

### Frontend

Located in the [frontend](./frontend) folder.

To launch, open the folder in the terminal, and:

1. Install missing packages via `npm install`;
2. To verify, You can launch the test with `npm test`;
3. Launch the application with `npm start`;

### Backend

Located in the [backend/cities](./backend/cities) folder.

To launch, open the folder in the terminal, and:

1. Install missing packages via `mvn clean install`;
2. To verify, You can launch the test with `mvn test`;
3. Launch the application with `mvn spring-boot:run`;


## Credentials

Currently, the environment is set up with 2 Users:

1. Username: 'User'; Password: 'Password1'; able to view the city list;
2. Username: 'Editor'; Password: 'Password2'; able to view and edit the city list;

Frontend Will Prompt You with a login screen before allowing You to progress to the City list screen. 