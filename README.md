# PDF Editor with Next.js

## Overview

Welcome to the PDF Editor, a web application built with Next.js. This project aims to provide users with a convenient platform for editing and manipulating PDF files.


## Features

- **Upload PDFs:** Easily upload PDF files to the editor.
- **Page Selection:** Choose specific pages or page ranges for editing.
- **Odd/Even Page Options:** Separate editing options for odd and even pages.
- **User Authentication:** Securely manage user accounts with NextAuth.

## Getting Started

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/sidharth-97/PDF-Editor.git
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Add environment variables:**
    ```bash
    MONGO_URI=mongodb url
    CLIENT_ID=google client id for google authentication
    SECRET=secret code from google auth
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_URL_INTERNAL=NEXTAUTH_URL
    NEXTAUTH_SECRET=random id 
    CLOUDINARY_URL=url from cloudinary
    ```

4. **Run the application:**
    ```bash
    npm run dev
    ```
