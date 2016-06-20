(function($) {
	$.fn.motypagination = function(options, cur, total) {
		var _this = this;
		var  defaults  =   {       
			color: "#787d82",
			disabled_color: "#c8cdd2",
			hover_color: "#ec1500",
			cur_bgcolor: "#ec1500",
			cur_color: "#fff",

			hidewhenonlyone: true,
			first: true,
			last: true,
			prev: true,
			next: true,

			first_text: "首页",
			last_text: "尾页",
			prev_text: "上一页",
			next_text: "下一页",

			pages_shown: 7,

			url: function(index){
				return "index_" + index;
			}
		}; 

		var opts = $.extend(defaults, options);

		function getShowPages(cur, total, pages_shown){
			var ret = [];
			var half = Math.floor((pages_shown - 1) / 2);
			var pad = cur + half > total ? (cur + half - total) : 0;
			var	min = Math.max(1, cur - half - pad);
			for (var i = min; i <= cur; i++) {
				ret.push(i);
			}
			var max = Math.min(total, cur + pages_shown - ret.length);
			for (var i = cur + 1; i <= max; i++) {
				ret.push(i);
			}
			return ret;
		}


		function createJqueryObject(cur, total) {
			var html = "";
			if (opts.first) {
				if (cur === 1) {
					html += "<span class='disabled_page'>{0}</span>".replace("{0}", opts.first_text);
				} else {
					html += "<a href='#' data-index='{0}'>{1}</a>".replace("{0}", 1).replace("{1}", opts.first_text);
				}
			}
			if (opts.prev) {
				if (cur === 1) {
					html += "<span class='disabled_page'>{0}</span>".replace("{0}", opts.prev_text);
				} else {
					html += "<a href='#' data-index='{0}'>{1}</a>".replace("{0}", cur - 1).replace("{1}", opts.prev_text);
				}
			}

			var pages = getShowPages(cur, total, opts.pages_shown)
			for (var i = 0; i < pages.length; i++) {
				if (cur === pages[i]) {
					html += "<a href='javascript:void(0)' class='active_1604261319'>{0}</a>".replace("{0}", pages[i]);
				} else {
					html += "<a href='#' data-index='{0}'>{1}</a>".replace("{0}", pages[i]).replace("{1}", pages[i]);
				}
			}

			if (opts.next) {
				if (cur === total) {
					html += "<span class='disabled_page'>{0}</span>".replace("{0}", opts.next_text);
				} else {
					html += "<a href='#' data-index='{0}'>{1}</a>".replace("{0}", cur + 1).replace("{1}", opts.next_text);
				}
			}
			if (opts.last) {
				if (cur === total) {
					html += "<span class='disabled_page'>{0}</span>".replace("{0}", opts.last_text);
				} else {
					html += "<a href='#' data-index='{0}'>{1}</a>".replace("{0}", total).replace("{1}", opts.last_text);
				}
			}

			var obj = $("<div class='motypc_1604261319'>" + html + "</div>");
			var aas = obj.find("a[href='#']");
			for (var i = 0; i < aas.length; i++) {
				var index = $(aas[i]).attr("data-index");
				$(aas[i]).attr("href", opts.url(index));
			}
			obj.find(".disabled_page").css("color", opts.disabled_color);
			obj.find("a").css("color", opts.color).mouseover(function(){
				obj.find(this).not("a.active_1604261319").css("color", opts.hover_color).css("border-color", opts.hover_color);
			}).mouseout(function(){
				obj.find(this).not("a.active_1604261319").css("color", opts.color).css("border-color", "transparent");
			});
			obj.find("a.active_1604261319").css("background-color", opts.cur_bgcolor).css("color", opts.cur_color);
			return obj;
		}

		function build() {
			if (typeof options != 'object') {
				throw new Error("Initialization Argument('options') Error.");
			}
			if (isNaN(parseInt(cur))) {
				throw new Error("Initialization Argument('cur') Error.");	
			}
			if (isNaN(parseInt(total))) {
				throw new Error("Initialization Argument('total') Error.");	
			}
			cur = parseInt(cur);
			total = parseInt(total);
			if (cur < 0 || total < 0) {
				throw new Error("Initialization Argument Error('cur' or 'total' must be greater than 0).");	
			}
			if (cur > total) {
				throw new Error("Initialization Argument Error('cur' must be less than 'total').");	
			}		
			if (total <= 1 && opts.hidewhenonlyone) {
				$(_this).append("");
			} else {
				$(_this).append(createJqueryObject(cur, total));
			}
		}
		build();
	}
})(jQuery)
