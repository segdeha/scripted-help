# To run demo:

```
$ cd prototypes/daveturissini/
$ npm install
$ npm start
```

If the commands above did not launch a browser, open your browser of choice and navigate to http://localhost:3000.

## Notes:

- Really simple proof of concept to show one way how we can add onboarding messages
- We can definitely extend this to include actions (for example, user cannot progress until they fill out a form or do perform other action)
- In addition to requiring actions to progress through the onboarding, we can also have actions trigger onboarding. This would be useful if the element is offscreen and the user needs to scroll to it first (or type something, or open a menu, or whatever)
- Implementers would have complete control over placement and any art work (Although I doubt anyone wouldn't want to use my beautiful blue borders)
