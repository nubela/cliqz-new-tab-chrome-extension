// Generated by IcedCoffeeScript 1.7.1-f
(function() {
  var append2DropDownmenu, appendHistoryRow, clearDropDownMenuStuff, hideDropdown, iced, showDropdown, __iced_k, __iced_k_noop,
    __slice = [].slice;

  iced = {
    Deferrals: (function() {
      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) {
          return this.continuation(this.ret);
        }
      };

      _Class.prototype.defer = function(defer_params) {
        ++this.count;
        return (function(_this) {
          return function() {
            var inner_params, _ref;
            inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (defer_params != null) {
              if ((_ref = defer_params.assign_fn) != null) {
                _ref.apply(null, inner_params);
              }
            }
            return _this._fulfill();
          };
        })(this);
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  __iced_k = __iced_k_noop = function() {};

  this.getCliqzData = function(query, defer_cb) {
    return $.ajax({
      type: 'GET',
      url: 'https://webbeta.cliqz.com/api/v1/results?q=' + encodeURIComponent(query),
      async: true,
      callback: 'callback',
      contentType: "application/json",
      dataType: 'json',
      success: function(r) {
        return defer_cb(r.result);
      }
    });
  };

  showDropdown = function() {
    return $("#search-dropdown").show();
  };

  hideDropdown = function() {
    return $("#search-dropdown").hide();
  };

  appendHistoryRow = function(url, title) {
    var c;
    c = $("#history-row-template").clone().removeAttr("id").removeClass("hidden");
    $(c).find("span").text(title);
    $(c).attr("href", url);
    return $("#history-lis").append(c);
  };

  append2DropDownmenu = function(url, title) {
    var c;
    c = $("#result-template").clone().removeAttr("id").removeClass("hidden");
    $(c).find(".result-title").text(title);
    $(c).find("p.lead").text(url);
    $(c).find("a").attr("href", url);
    return $("#search-dropdown").append(c);
  };

  clearDropDownMenuStuff = function() {
    var li, _i, _len, _ref, _results;
    _ref = $("#search-dropdown").find("li");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      li = _ref[_i];
      if (!$(li).hasClass("hidden")) {
        _results.push($(li).remove());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  $(document).ready(function() {
    var url, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "/home/nubela/Workspace/cliqz-newtab-chrome-ext/src/html/newtab/media/js/main.coffee"
        });
        getData(SYNC_KEYS.BG_IMG_URL, null, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return url = arguments[0];
            };
          })(),
          lineno: 36
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        $(".background").css("background-image", "url('" + url + "')");
        chrome.topSites.get(function(top_sites) {
          var r, results, _i, _len, _results;
          results = top_sites.splice(0, 5);
          _results = [];
          for (_i = 0, _len = results.length; _i < _len; _i++) {
            r = results[_i];
            _results.push(appendHistoryRow(r.url, r.title));
          }
          return _results;
        });
        return $("#search").on("keypress", function() {
          var q, r, result, title, ___iced_passed_deferral1, __iced_deferrals, __iced_k;
          __iced_k = __iced_k_noop;
          ___iced_passed_deferral1 = iced.findDeferral(arguments);
          q = $("#search").val();
          if (q.length === 0) {
            hideDropdown();
            return;
          }
          (function(_this) {
            return (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral1,
                filename: "/home/nubela/Workspace/cliqz-newtab-chrome-ext/src/html/newtab/media/js/main.coffee"
              });
              getCliqzData(q, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    return result = arguments[0];
                  };
                })(),
                lineno: 50
              }));
              __iced_deferrals._fulfill();
            });
          })(this)((function(_this) {
            return function() {
              var _i, _len;
              result = result.splice(0, 3);
              clearDropDownMenuStuff();
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                r = result[_i];
                if (r.snippet != null) {
                  title = r.snippet.title;
                } else {
                  title = r.url;
                }
                append2DropDownmenu(r.url, title);
              }
              if (result.length > 0) {
                return showDropdown();
              } else {
                return hideDropdown();
              }
            };
          })(this));
        });
      };
    })(this));
  });

}).call(this);
