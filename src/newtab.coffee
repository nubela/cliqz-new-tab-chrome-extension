@SERVER_HOST = "http://localhost:5001"
@AJAX_TIMEOUT_MS = 10

@SYNC_KEYS = {
    BG_IMG_URL: "background_image_url"
}

@setData = (dic_key, val, defer_cb=(->)) ->
    dic = {}
    dic[dic_key] = val
    chrome.storage.local.set(dic, (->defer_cb()))

# async method to fetch key value
@getData = (key, default_value, defer_cb) ->
    await chrome.storage.local.get key, defer(items)
    if key of items
        defer_cb(items[key])
        return
    else
        defer_cb(default_value)

@fetchBackgroundImage = (defer_cb=(->)) ->
    $.ajax
        timeout: AJAX_TIMEOUT_MS
        type: "GET"
        url: SERVER_HOST + "/unsplash/url/"
        dataType: "json"
        crossDomain: true
        success: (data) ->
            if data["status"] == "ok"
                url = data.url
                setData SYNC_KEYS.BG_IMG_URL, "#{SERVER_HOST}#{url}"
                defer_cb(true)
                return
            defer_cb(false)
        error: ->
            defer_cb(false)