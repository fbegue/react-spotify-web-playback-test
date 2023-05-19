## commit / push

`npm run commit 'message'`

`git push`

### todo

- can't test redirect locally (note: override)

- never got 'backround installed app notifications' working - they only work if app is in fore-ground
    - can be accomplished by task manager > long hold on app icon at top > open in pop-up mode
        - note this workaround works just as well w/ firefox as it *would* the app

## polly

- had issue getting play working w/out interacting with screen first (ex: button).
not sure if I was poorly implementing workarounds (settimeout onClick, for ex) or if Chrome just new what
I was trying to pull, but I could NOT find a good solution.

https://developer.chrome.com/blog/autoplay/#examples

HOWEVER, b/c I'm using it as a progressive web app on my phone, it works!
 
### bugs

- often have trouble getting browser to retrieve new publishes (use incognito)

- installed app just won't come up after first run
- push notification permission doesn't stay over reload 


### notes

netify auto fails on warning without setting env in settings:
CI=true
https://answers.netlify.com/t/build-failed-with-non-zero-exit-code-2-error/56807/7
