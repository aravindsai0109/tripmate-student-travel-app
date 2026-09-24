# TripMate – Student Travel & Exploration Hub

## Project Theme
Travel & Exploration – Student group tours and weekend trips.

## Project Goal
TripMate is a cross-platform mobile application that allows students to
discover trips, view trip details, RSVP, communicate through real-time
comments, and manage their profiles.

## Technology Stack
- React Native
- Expo
- JavaScript
- Firebase Authentication
- Cloud Firestore
- React Context API

## Team Roles and Contribution
### Aravindsai – Frontend & UI/UX Developer

Aravindsai established the React Native Expo project foundation and configured
the application's navigation structure. He developed the TripMate splash and
welcome screens, Travel & Exploration home interface, reusable trip cards,
trip discovery and Trip Details interfaces.

He also implemented destination search, category and price filtering, See All
navigation, the notification interface, favourite/saved-trip functionality,
responsive two-column destination grids, native trip sharing, and the
multi-guest reservation frontend with dynamic price calculation.

He also performed frontend navigation, responsive-layout and end-to-end
functional testing before group integration.

### Samiksha — Authentication, Security, Profile & Settings Developer

Samiksha implemented the Firebase Authentication foundation for
TripMate and developed the application's secure user access flow. She
created the Login and Register interfaces with email/password
authentication, required-field validation, invalid-email handling,
password confirmation and incorrect-login error handling.

She also created the AuthContext to manage authenticated user state
throughout the application and configured persistent authentication
using React Native AsyncStorage. Protected navigation was integrated
with the final TripMate navigation structure so unauthenticated users
cannot access the main application screens until they successfully
login or register.

Samiksha also developed the authenticated Profile and Settings
interfaces. The Profile screen displays the signed-in user's name,
email address and Firebase user ID and supports updating the user's
display name. The Settings screen provides account information,
profile access and secure logout with confirmation.

She integrated the authentication flow with Aravindsai's completed
frontend navigation, replaced the temporary Profile placeholder with
the functional authenticated Profile screen, aligned the Login,
Register, Profile and Settings interfaces with the shared TripMate
UI/UX design, and tested registration, valid/invalid login, logout,
profile updates, protected access and persistent user sessions before
group integration.

### Sujata – Database, RSVP & Trip Management Developer

Sujata configured the Cloud Firestore database for TripMate and developed the
application's persistent trip and reservation data layer. She created and
maintained the Firestore trip records, migrated the original local sample trip
data to Firestore, and connected the Home, All Destinations and Trip Details
flows to dynamically loaded database content without changing the existing
TripMate UI/UX design.

She implemented the authenticated RSVP workflow using Firebase Authentication
and Cloud Firestore. The reservation functionality supports single and
multi-student bookings, calculates booking totals, stores confirmed RSVP data,
prevents duplicate reservations by the same user for the same trip, and checks
the remaining trip capacity before accepting a booking. Firestore transactions
were used so RSVP creation and reserved-place updates remain consistent.

Sujata also developed the My Trips data functionality so authenticated users can
view only the trips they have successfully joined. RSVP cancellation was
implemented so users can cancel their own reservations, remove the corresponding
RSVP record and automatically return the reserved places to the trip capacity.
The RSVP and trip data were linked using authenticated Firebase user IDs and
Firestore document IDs to maintain user-specific reservation records.

She integrated organiser trip-management functionality with the role-based
authentication structure developed by Samiksha. Authorised organiser accounts
can access the Manage Trips interface to create, edit and delete Firestore trip
records, while normal student accounts do not receive access to organiser-only
management functions. Trip validation was also added before database writes,
including checks for required fields, valid price, capacity, rating and image
data.

Sujata tested Firestore trip loading, successful RSVP creation, multi-guest
reservations, duplicate RSVP prevention, trip-capacity restrictions, My Trips,
reservation cancellation and organiser Create/Edit/Delete operations. She also
checked her implemented database and reservation functionality on Android and
iOS as part of the cross-platform testing process and maintained meaningful Git
commits throughout the development and integration work.

### Jasleen – Real-Time Comments, Testing & Integration Developer

Jasleen implemented the real-time commenting feature for TripMate and integrated it with the existing Trip Details interface. She created a reusable comments component and connected it to Cloud Firestore so authenticated users can post comments for individual trips. Each comment is stored with the related trip ID, authenticated user ID, display name, comment text and Firestore timestamp.

She also implemented a Firestore real-time listener using `onSnapshot()` so new comments appear automatically without requiring users to manually refresh or reopen the Trip Details screen. Comment input validation was added to prevent blank and spaces-only comments, while a maximum comment length of 500 characters was applied to maintain clean and controlled user input. Comments remain associated with the correct trip and previously submitted comments are loaded again when the trip is reopened.

Jasleen also supported the security and integration of the commenting functionality by extending the existing Firestore Security Rules for the trip comments subcollection. These rules ensure that only authenticated users can access comments and that users can only create comments using their own authenticated Firebase user ID. Comment data was tested in Firestore to confirm correct storage of the trip ID, user ID, username, text and timestamp.

In addition to the real-time comments feature, Jasleen coordinated functional and integration testing for the completed TripMate application. She created the overall functional test matrix and tested the integrated flow across authentication, trip discovery, search and filtering, Trip Details, Saved Trips, RSVP, My Trips, Profile, Settings, organiser functionality and real-time comments. She also verified comment validation, persistence, trip-specific association, authenticated author information, timestamps and real-time updates between active sessions, helping ensure the final integrated application was stable for group demonstration and presentation.

## Setup Guide

TripMate is developed using React Native with Expo and JavaScript. Firebase Authentication is used for secure user access, while Cloud Firestore is used for persistent trip, user and RSVP data storage (Google, n.d.).

### Prerequisites

Before running the application, ensure the following are installed:

- Node.js and npm
- Git
- Visual Studio Code or another suitable code editor
- Expo Go on an Android or iOS device
- Internet access for Firebase services
- Access to the shared TripMate Firebase project

### 1. Clone the Repository

Clone the TripMate repository from GitHub and open the project directory:

```bash
git clone <TripMate repository URL>
cd tripmate-student-travel-app/TripMateApp
```

### 2. Install Dependencies

Install all project dependencies using:

```bash
npm install
```

The main technologies and libraries used by the application include:

- React Native
- Expo
- Firebase Authentication
- Cloud Firestore
- React Navigation
- React Native AsyncStorage
- Expo Vector Icons

### 3. Firebase Configuration

TripMate uses one shared Firebase project for Authentication and Cloud Firestore.

The root-level `firebaseConfig.js` file initialises the Firebase application and exports the shared services used throughout the project:

```javascript
export {
  app,
  auth,
  db,
};
```

Where:

- `app` represents the Firebase application instance.
- `auth` provides Firebase Authentication.
- `db` provides access to Cloud Firestore.

Developers joining the project should ensure that `firebaseConfig.js` points to the approved shared TripMate Firebase project.

Private service-account credentials, passwords and other sensitive authentication information must not be committed to the Git repository.

### 4. Firebase Authentication

Email and password authentication must be enabled in the Firebase Console.

Student users can register through the TripMate Register interface. Newly registered users are assigned the `student` role.

Authorised organiser accounts use the `organiser` role stored in the user's Firestore document. Organiser privileges must only be assigned by an authorised project administrator and are not available through public registration.

### 5. Cloud Firestore

Cloud Firestore must be enabled for the shared Firebase project.

The application currently uses the following main collections:

- `users`
- `trips`
- `rsvps`

Firestore Security Rules should also be published so that authenticated students can access only permitted data and organiser-only trip-management actions remain protected.

### 6. Run the Application

Start the Expo development server with:

```bash
npx expo start
```

If Expo caching causes an issue, use:

```bash
npx expo start -c
```

A QR code will be displayed in the terminal or Expo development interface.

#### Android

1. Open Expo Go on the Android device.
2. Scan the displayed QR code.
3. Wait for TripMate to load.

#### iOS

1. Open the iPhone Camera application or Expo Go.
2. Scan the Expo QR code.
3. Open the TripMate project in Expo Go.

The development computer and mobile device should normally be connected to the same network.

If the device cannot connect through the local network, Expo tunnel mode can be used:

```bash
npx expo start --tunnel
```

### 7. Application Testing

After starting TripMate, verify the main application flow:

1. Register or log in.
2. Confirm that trips load from Cloud Firestore.
3. Test search, category and price filtering.
4. Open Trip Details.
5. Add and remove Saved Trips.
6. Create an RSVP.
7. Confirm duplicate RSVP prevention.
8. Confirm trip-capacity validation.
9. Open My Trips.
10. Cancel an RSVP.
11. Verify Profile and Settings.
12. Log out and log in again.

For an organiser account, also verify:

1. Open Profile.
2. Select `Manage Trips`.
3. Create a test trip.
4. Edit the test trip.
5. Delete the test trip.
6. Confirm that normal student accounts cannot access organiser-only trip-management functions.

TripMate has been tested through Expo on Android and iOS to confirm cross-platform operation.


## API / Data Documentation

TripMate uses Firebase services directly through the Firebase JavaScript SDK rather than a separate custom REST API. Firebase Authentication manages authenticated user sessions, while Cloud Firestore provides the application's persistent data layer (Google, n.d.).

### Firebase Services

| Service | Purpose |
|---|---|
| Firebase Authentication | User registration, login, logout and authenticated sessions |
| Cloud Firestore | Stores user profiles, trips and RSVP records |
| AsyncStorage | Supports persistent Firebase Authentication sessions on React Native |
| React Navigation | Manages stack and bottom-tab navigation within TripMate |

### Firestore Data Model

#### `users` Collection

Each authenticated TripMate user has a Firestore document identified by the Firebase Authentication UID.

Structure:

```text
users
└── {userId}
    ├── displayName
    ├── email
    ├── role
    └── createdAt
```

Main fields:

| Field | Type | Description |
|---|---|---|
| `displayName` | String | User's displayed name |
| `email` | String | Authenticated email address |
| `role` | String | User role: `student` or `organiser` |
| `createdAt` | Timestamp | Date and time the user record was created |

Normal registrations receive the `student` role. Organiser access is assigned only to authorised accounts.

#### `trips` Collection

The `trips` collection stores the destinations displayed throughout TripMate.

Structure:

```text
trips
└── {tripId}
    ├── title
    ├── destination
    ├── category
    ├── date
    ├── duration
    ├── meetingPoint
    ├── price
    ├── capacity
    ├── reservedSpots
    ├── rating
    ├── reviews
    ├── difficulty
    ├── image
    ├── description
    ├── createdAt
    └── updatedAt
```

Main fields:

| Field | Type | Description |
|---|---|---|
| `title` | String | Trip name |
| `destination` | String | Travel destination |
| `category` | String | Trip category such as Beach, Mountain, City or Camping |
| `date` | String | Scheduled trip date |
| `duration` | String | Duration of the trip |
| `meetingPoint` | String | Student meeting location |
| `price` | Number | Price per student |
| `capacity` | Number | Maximum number of available student places |
| `reservedSpots` | Number | Number of places currently reserved |
| `rating` | Number | Display rating for the destination |
| `reviews` | String | Display review count |
| `difficulty` | String | Difficulty level such as Easy or Moderate |
| `image` | String | Remote trip image URL |
| `description` | String | Full trip description |
| `createdAt` | Timestamp | Creation timestamp for organiser-created trips |
| `updatedAt` | Timestamp | Most recent organiser update timestamp |

The original local Travel & Exploration sample data was migrated to Cloud Firestore so Home, All Destinations and Trip Details can use persistent database data.

### Trip Data Operations

Trip operations are centralised in `src/services/tripService.js`.

Main operations include:

```text
getTrips()
```

Retrieves all available trip documents from Firestore.

```text
getTripById(tripId)
```

Retrieves one trip using its Firestore document ID.

```text
createTrip(tripData)
```

Creates a new trip. This operation is intended for authorised organisers only.

```text
updateTrip(tripId, tripData)
```

Updates an existing trip after validating the supplied data.

```text
deleteTrip(tripId)
```

Deletes a trip when permitted. Trips with active reservations are protected from deletion to reduce the risk of leaving invalid RSVP records.

### Trip Validation

Before organiser data is written to Firestore, TripMate validates important fields including:

- Trip title
- Destination
- Category
- Date
- Duration
- Meeting point
- Price
- Capacity
- Rating
- Difficulty
- Image URL
- Description

Price must be greater than zero, capacity must be a valid positive whole number, and rating values must remain within the supported range.

### `rsvps` Collection

The `rsvps` collection stores authenticated trip reservations.

Structure:

```text
rsvps
└── {userId}_{tripId}
    ├── userId
    ├── tripId
    ├── guestCount
    ├── tripPrice
    ├── serviceFee
    ├── totalPrice
    ├── status
    └── createdAt
```

Main fields:

| Field | Type | Description |
|---|---|---|
| `userId` | String | Firebase UID of the student who made the RSVP |
| `tripId` | String | Firestore document ID of the selected trip |
| `guestCount` | Number | Number of student places reserved |
| `tripPrice` | Number | Price per student at booking time |
| `serviceFee` | Number | Booking service fee |
| `totalPrice` | Number | Calculated total reservation price |
| `status` | String | Current reservation status |
| `createdAt` | Timestamp | Reservation creation time |

The RSVP document ID combines the authenticated user UID and trip ID:

```text
{userId}_{tripId}
```

This design assists with duplicate RSVP prevention because the same user cannot create multiple active RSVP documents for the same trip.

### RSVP Operations

RSVP operations are managed through `src/services/rsvpService.js`.

The main operations include:

```text
createRSVP()
```

Creates a reservation for an authenticated user. Firestore transactions are used to check availability, create the RSVP and update the trip's `reservedSpots` value consistently.

```text
getUserRSVPs(userId)
```

Retrieves RSVP records belonging to the authenticated user for the My Trips interface.

```text
cancelRSVP()
```

Cancels the authenticated user's reservation, removes the RSVP record and restores the reserved student places to the related trip.

### RSVP Capacity Control

Before an RSVP is accepted, TripMate calculates:

```text
availableSpots = capacity - reservedSpots
```

A reservation is rejected when the requested guest count exceeds the number of places still available.

After a successful reservation:

```text
reservedSpots = reservedSpots + guestCount
```

After cancellation:

```text
reservedSpots = reservedSpots - guestCount
```

Firestore transactions are used so related RSVP and capacity changes are processed together.

### My Trips

The My Trips feature:

1. Identifies the currently authenticated Firebase user.
2. Queries RSVP documents belonging to that user's UID.
3. Retrieves the associated trip records using each `tripId`.
4. Displays the user's confirmed trips, guest count and booking total.
5. Allows the user to cancel their own reservation.

This ensures that users see their own joined trips rather than another student's reservation data.

### Role-Based Trip Management

TripMate currently supports two roles:

```text
student
organiser
```

Students can:

- Browse trips
- Save destinations
- Create an RSVP
- View My Trips
- Cancel their own RSVP
- Maintain their own profile

Organisers can perform the normal authenticated functions and additionally access the Manage Trips interface to:

- Create trips
- Edit trips
- Delete eligible trips

The organiser-management route and interface are conditionally available only when the authenticated Firestore user document contains:

```text
role: "organiser"
```

Firestore Security Rules provide an additional server-side layer of permission enforcement.

### Real-Time Comments

Real-time commenting is implemented as a separate group feature by the team member responsible for real-time functionality. Its final Firestore collection structure and listener behaviour should be documented in the README after that implementation is merged into the shared `develop` branch.


## References

Expo. (n.d.). *Expo documentation*. https://docs.expo.dev/

Google. (n.d.). *Firebase documentation*. https://firebase.google.com/docs

Meta Platforms, Inc. (n.d.). *React Native*. https://reactnative.dev/

React Native Async Storage. (n.d.). *Async Storage*. https://react-native-async-storage.github.io/async-storage/

React Navigation. (n.d.). *React Navigation documentation*. https://reactnavigation.org/docs/getting-started/

Unsplash. (n.d.). *Unsplash*. https://unsplash.com/
