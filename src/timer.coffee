INTERVAL_MS = 60 * 60 * 1000


startTimer = ->
    setInterval (->
        fetchBackgroundImage()
    ), INTERVAL_MS


main = ->
    startTimer()


main()