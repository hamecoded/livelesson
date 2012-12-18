Firebin
=======

A simple client-side pastebin clone.

### [Live Demo](http://firebase.github.com/firebin/) | [An Example Bin](http://firebase.github.com/firebin/#26ac13001217f8db10d720faf15870525275bab47e3a4fe6816881181f13973b)

How does it work?
-----------------
In this example, we build on the the [Firepano](http://firebase.github.com/firepano/)
example that uses unguessable locations to serve shared content. Like Firepano
example, we use the content as the hash into Firebase for storing the data that
was uploaded.

We add a couple of new features with this example: a view count as well as a
count of the number of people currently viewing the page. We use transactions
to properly increment the count value; we use the Firebase presence API to keep
track of when people start viewing the page as well as when they browser off
the page. A couple of new rules make sure we secure the new metadata.

You can find the rules for this application in [rules.json](http://github.com/firebase/firebin/blob/gh-pages/rules.json).

Exercises for the reader
------------------------
  1. Add security rules enforcing monotonically increasing counts.
  2. Add a secret token allowing anonymous uploaders to delete a paste.
  3. Add simple login using [Singly](http://singly.com]) to let users manage
bins long term.

License
-------
No part of this project, except sha256.js, may be copied, modified, propagated,
or distributed except according to terms in the accompanying LICENSE file.

sha256.js is part of [CryptoJS](http://code.google.com/p/crypto-js/) which
is distributed under the terms of
[this license](http://code.google.com/p/crypto-js/wiki/License) (BSD 3-clause).
