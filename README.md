# The Wild Oasis - Staff Dashboard Application

A React + Supabase application allowing the staff of a fictitious boutique hotel
called "The Wild Oasis" to:

1. Manage bookings, check-ins, and check-outs.
2. Modify the prices of extras or add-ons.
3. Tweak the restrictions and settings defined for certain aspects of the
   bookings, like the minimum and maximum number of nights and guests allowed
   per booking.
4. Sign up or create an account for new hotel employees.

Built as a part of learning React, its ecosystem of libraries and packages, and
Supabase for quick backend API creation, the application employs React Query for
API integration, remote state management, and caching; React Router for routing;
React Hook Form for form and input processing and form handling; and CSS Styled
Components for styling.

## Prerequisites for forking and running the project locally:

### A Supabase backend with the following tables in the DB:

```
The following tables with the specified columns are needed to integrate a Supabase backend API with the application:

1) cabins:
    id (auto-created by Supabase)
    created_at (auto-created by Supabase)
    name (text)
    maxCapacity (int2)
    regularPrice (float4)
    discount (float4)
    description (text)
    image (text)

2) bookings:
    id (auto-created by Supabase)
    created_at (auto-created by Supabase)
    startDate (timestamp)
    endDate (timestamp)
    numNights (int2)
    numGuests (int2)
    cabinPrice (float4)
    extrasPrice (float4)
    totalPrice (float4)
    status (text)
    hasBreakfast (bool)
    isPaid (bool)
    observations (text)
    cabinId (foreign key referencing the "id" field of the "cabins" table)
    guestId (foreign key referencing the "id" field of the "guests" table)

3) guests:
    id (auto-created by Supabase)
    created_at (auto-created by Supabase)
    fullName (text)
    email (text)
    nationalId (text)
    nationality (text)
    countryFlag (text)

4) settings:
    id (auto-created by Supabase)
    created_at (auto-created by Supabase)
    minBookingLength (int2)
    maxBookingLength (int2)
    maxGuestsPerBooking (int2)
    breakfastPrice (float4)

5) Supabase provides the "Users" table out of the box, in the Authentication page. Since this application is exclusively built for hotel staff, a new user can be created by a registered user from within the app. To create your first user account, you can create a new row in the Users table. After logging in with that account, you can create more accounts from within the app. You can use https://temp-mail.org/en/ for generating a fake test email account to sign up a new user.

- Restrict all CRUD operations to 'Authenticated' users in all tables using RLS policies. Since the 'Settings' table will always have one single row to define settings or configurations for the hotel, only SELECT and UPDATE actions need an RLS policy set to 'Authenticated' in it.

- Create two public storage buckets, "avatars" and "cabins," to store the user avatars and cabin images. Set RLS policies on both buckets to restrict CRUD operations to authenticated users only.
```

Once you have created your Supabase backend, create a `supabase.js` file with
the following data in the `src/services` directory, and add your Supabase
project URL and API key to it:

```javascript
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "<add-your-supabase-project-url-here>";
const supabaseKey = "<add-your-supabase-api-key-here>";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```

## To enable bulk-uploading of test data:

- Open the `src/ui/Sidebar.jsx` file in your IDE
- Uncomment the line importing the Uploader component
- Add the Uploader component to the Sidebar, below the MainNav component, in the
  following way:

```javascript
...
...
function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />

      <Uploader /> // Uploader component added
    </StyledSidebar>
  );
}

export default Sidebar;
```

- After opening the application in the local development server and logging in,
  use the upload buttons of the Uploader component to upload the test data. Note
  that uploading the test data first erases the existing data, except for the
  users, settings, and cabins data.

## To run the application locally with a development server:

- Fork the repository
- Navigate to the local project repository in your terminal
- Run the `npm i` command to install all the required project and dev
  dependencies
- Run the `npm run dev` command to start a local Vite development server
- Open the link provided in the terminal, in your browser, to access the
  application
- Log in using the test account you created

### Use `npm run build` to create a production build of the application for deployment

## To see the deployed application:

- Visit https://into-the-wild-oasis.netlify.app/
- Log in using `test@example.com` and `Hello@123` as the email and password
