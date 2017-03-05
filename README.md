# credential-management-api-demo

A simple demo of how you can use the [Credential Management API][spec] to
improve the user experience of a login page. Companion code for my ["Building a
better login with the Credential Management API" talk][talk].

## Set up

To run locally install dependencies with `npm install` and run the server with
`npm start`. The server runs on port 7400 by default.

Note that the Credential Management API only works on secure origins. This
means you can play around with it on `localhost` but if you use a custom domain
for local development (via your hosts file perhaps) you'd need a trusted
certificate in place.

## Caveats

The code in this repository is intended to be a rough guide only. It may not
follow best practices and it may not work in all environments. It's been tested
roughly in Chrome only since at the time of writing that's the only browser to
support the Credential Management API.

[spec]: https://www.w3.org/TR/credential-management-1
[talk]: https://slides.com/jamesallardice/building-a-better-login
