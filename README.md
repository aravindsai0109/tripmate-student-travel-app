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

Member 3 – Backend, Database & RSVP
Member 4 – Real-Time Features, Testing & Integration

## Setup Guide
To be completed.

## API / Data Documentation
To be completed.

## References
To be completed.
