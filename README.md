# WannaBe bitfinex

NOTE: Project updated to more easily see renders. Also includes FPS meter.
I wanted to verify and study the stats across different devices.

![Looks](/img/img.png?raw=true "WannaBe-Bitfinex")

# To Run:

```
yarn install
yarn start
```

# To Build Minify:

```
yarn build
```

## Notes:
* redux-logger is on. Open console to see Redux update.
* Added correct data structures using Collections JS

Some room for improvement:

* Handling various websocket response arrays. Don't understand what te, tu, hb, means.
* CSS is not perfectly matching Bitfinex. Function before beauty.
* Hard coded to ETHBTC. Could easily be switched out for a select box.
