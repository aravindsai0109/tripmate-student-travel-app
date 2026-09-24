# TripMate Functional Test Matrix

## Testing Environment

- Application: TripMate – Student Travel & Exploration Hub
- Framework: React Native with Expo
- Backend: Firebase Authentication and Cloud Firestore
- Primary testing platform: Android / Expo Go
- Additional platform: To be tested where practical
- Tester: Jasleen

# TripMate Functional Test Matrix

## Testing Overview

The integrated TripMate application was functionally tested after the frontend, authentication, Firestore database, RSVP, organiser management and real-time comments features were combined.

Testing focused on validating the main user journeys, data persistence, authentication controls, role-based access, RSVP behaviour, real-time commenting and integration between the different modules of the application.

**Application:** TripMate – Student Travel & Exploration Hub  
**Framework:** React Native with Expo  
**Backend:** Firebase Authentication and Cloud Firestore  
**Theme:** Travel & Exploration – Student Group Tours and Weekend Trips  
**Primary Test Environment:** Android device using Expo Go  
**Integration Tester:** Jasleen  

---

## Functional Test Matrix

| Test ID | Feature | Test Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| T01 | Authentication | Login using a valid registered email and password | User should successfully sign in and access the main TripMate application | Valid account successfully logged in and the Home screen was displayed | Pass |
| T02 | Authentication | Login using an incorrect password | Authentication should fail and the user should remain on the Login screen | Invalid login was rejected and the user was not given access to the application | Pass |
| T03 | Authentication | Submit Login form with empty or invalid fields | Invalid login details should not be accepted | Invalid/empty login input was prevented from successfully authenticating | Pass |
| T04 | Registration | Register using valid student information | New Firebase Authentication account and user profile should be created | New student account was successfully created and authenticated | Pass |
| T05 | Authentication Persistence | Close/reload the application while authenticated | Signed-in user state should be restored where Firebase persistence applies | Authenticated user state was maintained correctly | Pass |
| T06 | Navigation | Navigate between Home, Saved, My Trips and Profile tabs | All bottom navigation tabs should open their correct screens | All main navigation tabs opened correctly without navigation errors | Pass |
| T07 | Home / Trip Discovery | Load available trips on the Home screen | Trip information should load and display correctly | Available TripMate trips loaded and displayed correctly | Pass |
| T08 | Search | Search for an existing trip or destination | Relevant matching results should be displayed | Search returned the expected matching trip results | Pass |
| T09 | Search | Search using text that does not match a trip | No unrelated trips should be shown | Search correctly returned no matching trip results | Pass |
| T10 | Filtering | Apply a trip/category/price filter | Displayed trips should change according to the selected filter | Trip list updated correctly according to the selected filter | Pass |
| T11 | All Trips | Open the All Trips/All Destinations screen | Full list of available destinations should be displayed | All available destinations were displayed successfully | Pass |
| T12 | Trip Details | Select a trip from the application | Correct selected trip details should be displayed | Correct title, destination, date, duration, capacity, meeting point, difficulty, rating, description and price were displayed | Pass |
| T13 | Trip Details | Use the back navigation control | User should return to the previous screen | Back navigation returned to the previous screen correctly | Pass |
| T14 | Share | Tap the Share button on Trip Details | Device-native share functionality should open | Native share interface opened with the relevant TripMate trip information | Pass |
| T15 | Saved Trips | Tap the heart icon on an unsaved trip | Selected trip should be added to Saved Trips | Selected trip was successfully added to Saved Trips | Pass |
| T16 | Saved Trips | Open the Saved Trips screen | Saved trip should appear in the list | Previously saved trip appeared correctly on the Saved Trips screen | Pass |
| T17 | Saved Trips | Remove a saved trip using the heart control | Trip should be removed from Saved Trips | Selected trip was successfully removed from Saved Trips | Pass |
| T18 | RSVP | Open the reservation screen from Trip Details | Booking/RSVP screen should open for the selected trip | Correct reservation screen opened for the selected trip | Pass |
| T19 | RSVP | Create a valid RSVP | Reservation should be stored successfully in Firestore | Valid RSVP was successfully created and persisted | Pass |
| T20 | RSVP | Select a valid number of guests | RSVP should store the selected guest count correctly | Selected guest count was processed correctly by the reservation flow | Pass |
| T21 | RSVP | Attempt duplicate RSVP for the same user and trip | Duplicate reservation should be rejected | Duplicate RSVP was successfully prevented | Pass |
| T22 | RSVP | Attempt RSVP that would exceed available trip capacity | Reservation should be rejected when insufficient capacity exists | Capacity control prevented the reservation from exceeding available spaces | Pass |
| T23 | RSVP | Cancel an existing reservation where supported | Reservation should be removed and capacity should update correctly | Reservation cancellation completed successfully and trip data remained consistent | Pass |
| T24 | My Trips | Open My Trips after creating an RSVP | Joined trip should appear in the authenticated user's My Trips list | Reserved trip appeared correctly in My Trips | Pass |
| T25 | Profile | Open Profile while authenticated | Signed-in user's profile information should be displayed | Correct authenticated user information was displayed | Pass |
| T26 | Profile | Update the authenticated user's display name | New display name should be saved and displayed | Display name was successfully updated and reflected in the application | Pass |
| T27 | Settings | Open Settings from Profile | Settings screen should open correctly | Settings screen opened successfully | Pass |
| T28 | Logout | Log out through Settings | Authentication session should end and protected screens should no longer be accessible | User was successfully logged out and returned to the unauthenticated navigation flow | Pass |
| T29 | Protected Access | Attempt to access authenticated screens while logged out | Unauthenticated users should not be able to access protected screens | Protected application screens were unavailable without authentication | Pass |
| T30 | Role Management | Sign in using a student account | Student should receive normal student access only | Student account received the expected student role and permissions | Pass |
| T31 | Role Security | Student attempts to access organiser-only functionality | Organiser management features should not be available to students | Student account could not access organiser-only management functionality | Pass |
| T32 | Organiser Access | Sign in using an organiser account | Organiser management interface should become available | Organiser account successfully received access to the Organiser screen | Pass |
| T33 | Organiser CRUD | Create a valid new trip as organiser | New trip should be written to Firestore and become available in TripMate | New trip was successfully created and displayed in the application | Pass |
| T34 | Organiser CRUD | Edit an existing trip | Updated trip information should be written to Firestore and shown in the UI | Existing trip was successfully updated and the changes were displayed | Pass |
| T35 | Organiser CRUD | Delete an eligible trip | Trip should be removed from Firestore and no longer appear in the app | Eligible trip was successfully deleted | Pass |
| T36 | Organiser Validation | Attempt to save invalid trip information | Invalid trip data should be rejected | Trip validation correctly prevented invalid data from being stored | Pass |
| T37 | Comments | Open a trip that has no existing comments | Empty comments state should be displayed | "No comments yet" message was displayed correctly | Pass |
| T38 | Comments | Submit a valid comment | Comment should be written to the selected trip's Firestore comments subcollection | Valid comment was successfully stored and displayed | Pass |
| T39 | Comment Validation | Submit an empty comment | Empty comment should not be submitted | Empty comment was rejected and validation message was displayed | Pass |
| T40 | Comment Validation | Submit a comment containing only spaces | Spaces-only comment should not be stored | Spaces-only comment was rejected successfully | Pass |
| T41 | Comment Validation | Enter a comment up to the configured character limit | Input should remain within the maximum allowed comment length | Comment field enforced the configured maximum length correctly | Pass |
| T42 | Comment Association | Post a comment on Trip A and then open Trip B | Trip A's comment should not appear under Trip B | Comments remained associated only with the correct trip | Pass |
| T43 | Comment Persistence | Close and reopen a previously commented trip | Previously stored comments should reload from Firestore | Existing comments remained available after reopening the trip | Pass |
| T44 | Comment Author | Post comments using different authenticated accounts | Correct authenticated display name should appear beside each user's comment | Each comment displayed the appropriate authenticated author's name | Pass |
| T45 | Comment Timestamp | Post a new comment | Comment should display an appropriate Firestore timestamp | Comment timestamp was successfully stored and displayed | Pass |
| T46 | Firestore Comments | Inspect a stored comment document | Comment should contain tripId, userId, userName, text and createdAt | Firestore document contained all required comment fields | Pass |
| T47 | Real-Time Comments | Keep the same trip open in two authenticated sessions and post from one session | New comment should appear automatically in the other active session without manual refresh | New comment appeared automatically in the second session without navigation or refresh | Pass |
| T48 | Real-Time Listener | Add multiple comments while Trip Details remains open | Comment list and comment count should update automatically | New comments and the displayed comment count updated automatically | Pass |
| T49 | Firestore Security | Authenticated student creates their own comment | Firestore rules should permit a valid authenticated comment | Valid authenticated comment was accepted by Firestore | Pass |
| T50 | Firestore Security | Comment data is stored under the selected trip | Comment's tripId should correspond to its parent Firestore trip | Stored tripId correctly matched the selected parent trip | Pass |
| T51 | Data Integration | Reload trip data from Firestore | Trip information should remain available and consistent | Firestore trip data loaded correctly after application reload | Pass |
| T52 | Integration | Navigate Home → Trip Details → RSVP → My Trips | Data and navigation should remain consistent throughout the flow | Complete trip reservation workflow operated successfully | Pass |
| T53 | Integration | Navigate Home → Trip Details → Save → Saved Trips | Saved state should remain consistent across screens | Favourite state remained consistent and the selected trip appeared in Saved Trips | Pass |
| T54 | Integration | Navigate Login → Home → Trip Details → Comments → Profile → Settings | All integrated modules should work together without breaking navigation | Full integrated user flow completed successfully | Pass |
| T55 | Integration | Logout and login again | Application should correctly reset and restore authentication-dependent navigation | Logout/login flow completed successfully and correct authenticated screens were restored | Pass |
| T56 | UI/UX | Review key screens on the test device | Layout should remain readable and controls should remain usable | Major TripMate screens displayed correctly and controls remained usable | Pass |
| T57 | Stability | Perform normal end-to-end application use | Application should complete core workflows without critical crashes | Core workflows completed without critical application crashes | Pass |

---

## Real-Time Comments Test Summary

The real-time commenting feature was tested as part of the integrated TripMate application.

The following behaviours were confirmed:

- Authenticated users could submit comments.
- Empty and spaces-only comments were rejected.
- Comments were associated with the correct trip.
- Each comment stored the authenticated user's ID and display name.
- Comments remained available after reopening the trip.
- Firestore stored the comment text, trip ID, user ID, username and timestamp.
- Comments posted in one active session appeared automatically in another active session without manual refresh.
- Comments belonging to one trip did not appear under another trip.
- The displayed comments count updated when new comments were received.

The tests confirmed that the comments feature was successfully integrated with Firebase Authentication and Cloud Firestore and satisfied the required real-time functionality.

---

## End-to-End Integration Test

A complete integrated user flow was also tested:

1. Launch TripMate.
2. Sign in using a registered account.
3. Browse available trips.
4. Search and filter trip information.
5. Open Trip Details.
6. Save and remove favourite trips.
7. Complete the RSVP process.
8. Confirm the joined trip in My Trips.
9. Submit and receive real-time comments.
10. Open and update Profile information.
11. Open Settings.
12. Log out.
13. Test organiser-only access using the appropriate role.
14. Create, edit and delete eligible trip data using organiser functionality.

The integrated application completed the tested workflows successfully without critical navigation or data-integration failures.

---

## Functional Testing Result

A total of **57 functional and integration test cases** were included in the final testing matrix.

**Passed:** 57  
**Failed:** 0  
**Overall Result:** All tested core TripMate functions operated successfully during the recorded test session.

The final integrated build demonstrated working authentication, trip discovery, search/filtering, saved trips, RSVP, My Trips, profiles, settings, role-based organiser functionality, Firestore data integration and real-time commenting.