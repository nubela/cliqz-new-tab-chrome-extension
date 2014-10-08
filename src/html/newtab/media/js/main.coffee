@getCliqzData = (query, defer_cb) ->
    $.ajax
        type: 'GET'
        url: 'https://webbeta.cliqz.com/api/v1/results?q=' + encodeURIComponent(query)
        async: true
        callback: 'callback'
        contentType: "application/json"
        dataType: 'json'
        success: (r) ->
            defer_cb(r.result)

showDropdown = ->
    $("#search-dropdown").show()

hideDropdown = ->
    $("#search-dropdown").hide()

appendHistoryRow = (url, title) ->
    c = $("#history-row-template").clone().removeAttr("id").removeClass("hidden")
    $(c).find("span").text(title)
    $(c).attr("href", url)
    $("#history-lis").append(c)

append2DropDownmenu = (url, title) ->
    c = $("#result-template").clone().removeAttr("id").removeClass("hidden")
    $(c).find(".result-title").text(title)
    $(c).find("p.lead").text(url)
    $(c).find("a").attr("href", url)
    $("#search-dropdown").append(c)

clearDropDownMenuStuff = ->
    for li in $("#search-dropdown").find("li")
        if not $(li).hasClass("hidden")
            $(li).remove()

$(document).ready ->
    await getData SYNC_KEYS.BG_IMG_URL, null, defer(url)
    $(".background").css("background-image", "url('#{url}')")

    chrome.topSites.get (top_sites) ->
        results = top_sites.splice(0,5)
        for r in results
            appendHistoryRow(r.url, r.title)

    $("#search").on "keypress", ->
        q = $("#search").val()
        if q.length == 0
            hideDropdown()
            return

        await getCliqzData q, defer(result)
        result = result.splice(0,3)
        clearDropDownMenuStuff()
        for r in result
            if r.snippet?
                title = r.snippet.title
            else
                title = r.url

            append2DropDownmenu(r.url,title)
        if result.length > 0
            showDropdown()
        else
            hideDropdown()