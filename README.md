

## Usage

### Clone

```shell
git clone https://github.com/tonyxu-io/React-Linkedin-Login.git
```

### Install Dependencies

Install dependencies for server

```shell
cd React-Linkedin-Login
npm install
```

Install dependencies for client

```shell
cd client
npm install
```

### Get LinkedIn App Credential from LinkedIn Developer Portal

- client_id
- client_secret

Configure 'http://localhost:3001/callback' as Oauth2.0 redirect uri

### Create Environment Variables

/React-Linkedin-Login/.env

```shell
EXPRESS_APP_CLIENT_ID=${Your-Client-ID}
EXPRESS_APP_CLIENT_SECRET=${Your-Client-Secret}
EXPRESS_APP_REDIRECT_URI=http://localhost:3001/callback
```

/React-Linkedin-Login/client/.env

```shell
REACT_APP_CLIENT_ID=${Your-Client-ID}
REACT_APP_REDIRECT_URI=http://localhost:3001/callback
```

### Build Client

/React-Linkedin-Login/client:

```shell
yarn run build
```

### Start Server

/React-Linkedin-Login/:

```shell
PORT=3001 npm start
```

Visit `http://localhost:3001/` in your browser.

## Consumed SDK/API

- [LinkedIn OAuth 2.0 (3-Legged)](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context)
- [Sign In with LinkedIn](https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin?context=linkedin/consumer/context)

