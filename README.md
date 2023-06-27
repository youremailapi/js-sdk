# Getting started

YouremailAPI Js Sdk is a tool to interact with the [YouremailAPI api](https://youremailapi.com)

To start using the SDK, you must first have an account on the platform (you can create one for free [here](https://youremailapi.com/auth/sign-up)).

When you already have your account, you will need to upload an SMTP account with which you want to send emails and you will also have to create your first template.
For more details, we recommend reading this [getting started](https://docs.youremailapi.com/docs/getting-started)

## Install this package

```text
npm i youremailapi
```

## Start using it

How to send an email:

```js
const { sendEmail } = require("youremailapi"); // you can use import instead

await sendEmail("<YOUR_API_KEY>", {
  to: "contact@youremailapi.com",
  template: "<YOUR_TEMPLATE>",
  smtp_account: "<YOUR_SMTP_ACCOUNT>",
  subject: "Some subject",
  variables: {
    "%example%": "Some text here",
  },
});
```

## Info

The project is still in development, but right now, the version you're looking at is usable. It is being used productively in some projects.
Soon more functionalities will be implemented that allow a customizable iteration to be able to create accounts and templates directly from your platform.

If you have any questions or suggestions, you can write to this email: [contact@youremailapi.com](mailto:contact@youremailapi.com)
