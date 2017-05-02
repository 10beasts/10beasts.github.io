(function($){$(document).ready(function(){var all_networks_opened=0;$('body').on('click','.et_social_share',function(){var $this_el=$(this),social_network=$this_el.data('social_name'),social_type=$this_el.data('social_type'),media_url='media'==social_type?$this_el.closest('.et_social_media_wrapper').find('img').attr('src'):'',post_id=$this_el.data('post_id'),share_link='media'==social_type?$this_el.data('social_link'):$this_el.prop('href');update_stats_table(social_type,social_network,media_url,post_id,$this_el);if('like'===social_network){return false;}
var left=($(window).width()/2)-(550/2);var top=($(window).height()/2)-(450/2);var new_window=window.open(share_link,'','scrollbars=1, height=450, width=550, left='+left+', top='+top);if(window.focus){new_window.focus();}
return false;});$('.et_social_follow').click(function(){var $this_el=$(this),social_network=$this_el.data('social_name'),social_type=$this_el.data('social_type'),media_url='media'==social_type?$this_el.closest('.et_social_media_wrapper').find('img').attr('src'):'',post_id=$this_el.data('post_id');update_stats_table(social_type,social_network,media_url,post_id,$this_el);if('like'===social_network){return false;}});$('body').on('click','.et_social_share_pinterest',function(){if($(this).hasClass('et_social_pin_all')){var left=($(window).width()/2)-(550/2),top=($(window).height()/2)-(450/2),share_link=$(this).attr('href'),new_window=window.open(share_link,'','scrollbars=1, height=450, width=550, left='+left+', top='+top);if(window.focus){new_window.focus();}}else{$('.et_social_pin_images_outer').fadeToggle(400);}
return false;});function get_url_parameter(param_name){var page_url=window.location.search.substring(1);var url_variables=page_url.split('&');for(var i=0;i<url_variables.length;i++){var curr_param_name=url_variables[i].split('=');if(curr_param_name[0]==param_name){return curr_param_name[1];}}}
function update_stats_table($action,$social_network,$media_url,$post_id,$this_el){$stats_data=JSON.stringify({'action':$action,'network':$social_network,'media_url':$media_url,'post_id':$post_id});$.ajax({type:'POST',url:monarchSettings.ajaxurl,data:{action:'add_stats_record_db',stats_data_array:$stats_data,add_stats_nonce:monarchSettings.stats_nonce},success:function(data){if(true==data){if('like'===$action){update_single_shares($this_el,'',$post_id,$social_network,'like');}
if('media'==$action){update_total_media_shares($this_el.closest('.et_social_media_wrapper'));update_single_shares($this_el,$media_url,$post_id,$social_network,'media');}}}});}
function append_share_counts($current_network){var network=$current_network.data('social_name'),min_count=$current_network.data('min_count'),post_id=$current_network.data('post_id'),url=monarchSettings.pageurl!==''?monarchSettings.pageurl:window.location.href,label_div=$current_network.find('.et_social_network_label'),append_to=(0!=(label_div.length))?label_div:$current_network;$share_count_data=JSON.stringify({'network':network,'min_count':min_count,'post_id':post_id,'url':url});$.ajax({type:'POST',url:monarchSettings.ajaxurl,data:{action:'get_shares_count',share_count_array:$share_count_data,get_share_counts_nonce:monarchSettings.share_counts},beforeSend:function(data){append_to.append('<span class="et_social_placeholder"></span>');},success:function(data){$current_network.find('span.et_social_placeholder').remove();append_to.append(data);}});}
function append_total_shares($current_area){var post_id=$current_area.data('post_id'),url=monarchSettings.pageurl!==''?monarchSettings.pageurl:window.location.href,append_to=$current_area;$share_total_count_data=JSON.stringify({'post_id':post_id,'url':url});$.ajax({type:'POST',url:monarchSettings.ajaxurl,data:{action:'get_total_shares',share_total_count_array:$share_total_count_data,get_total_counts_nonce:monarchSettings.total_counts},beforeSend:function(data){append_to.append('<span class="et_social_placeholder"></span>');},success:function(data){append_to.find('span.et_social_placeholder').remove();append_to.append(data);}});}
function append_follow_counts($current_area){var network=$current_area.data('network'),min_count=$current_area.data('min_count'),index=$current_area.data('index'),append_to=$current_area;$follow_count_data=JSON.stringify({'network':network,'min_count':min_count,'index':index});$.ajax({type:'POST',url:monarchSettings.ajaxurl,data:{action:'get_follow_counts',follow_count_array:$follow_count_data,get_follow_counts_nonce:monarchSettings.follow_counts},beforeSend:function(data){append_to.append('<span class="et_social_placeholder"></span>');},success:function(data){$current_area.find('span.et_social_placeholder').remove();append_to.append(data);}});}
function append_total_follows($current_area){var append_to=$current_area;$.ajax({type:'POST',url:monarchSettings.ajaxurl,data:{action:'get_follow_total',get_total_counts_nonce:monarchSettings.total_counts},beforeSend:function(data){append_to.append('<span class="et_social_placeholder"></span>');},success:function(data){append_to.find('span.et_social_placeholder').remove();append_to.append(data);}});}
if($('.et_social_display_follow_counts').length){$('.et_social_display_follow_counts').each(function(){append_follow_counts($(this));});}
if($('.et_social_follow_total').length){$('.et_social_follow_total').each(function(){append_total_follows($(this));});}
if($('.et_social_total_share').length){$('.et_social_total_share').each(function(){append_total_shares($(this));});}
if($('.et_social_display_count').length){$('.et_social_display_count').each(function(){append_share_counts($(this));});}
if($('.et_social_media_wrapper').length&&$('.et_social_media_wrapper .et_social_totalcount').length){$('.et_social_media_wrapper').each(function(){update_total_media_shares($(this));});}
if($('.et_social_media_wrapper').length&&$('.et_social_media_wrapper .et_social_withcounts').length){$('.et_social_media_wrapper .et_social_share').each(function(){var this_el=$(this),media_url=this_el.closest('.et_social_media_wrapper').find('img').attr('src'),post_id=this_el.data('post_id'),social_network=this_el.data('social_name');update_single_shares(this_el,media_url,post_id,social_network,'media');});}
function update_total_media_shares($element){if($('.et_social_totalcount').length){var this_el=$element,media_url=this_el.find('img').attr('src'),post_id=this_el.find('.et_social_share').first().data('post_id'),media_data=JSON.stringify({'media_url':media_url,'post_id':post_id});$.ajax({type:'POST',url:monarchSettings.ajaxurl,data:{action:'get_media_shares_total',media_total:media_data,get_media_shares_total_nonce:monarchSettings.media_total},success:function(data){this_el.find('.et_social_totalcount_count').empty().append(data);}});}}
function update_single_shares($this_el,$media_url,$post_id,$network,$action){if($('.et_social_withcounts').length){var media_data=JSON.stringify({'media_url':$media_url,'post_id':$post_id,'network':$network,'action':$action});$.ajax({type:'POST',url:monarchSettings.ajaxurl,data:{action:'get_shares_single',media_single:media_data,get_media_shares_nonce:monarchSettings.media_single},success:function(data){$this_el.find('.et_social_count span').not('.et_social_count_label').empty().append(data);}});}}
function setCookieExpire(days){var ms=days*24*60*60*1000;var date=new Date();date.setTime(date.getTime()+ms);return"; expires="+date.toUTCString();}
function checkCookieValue(cookieName,value){return parseCookies()[cookieName]===value;}
function parseCookies(){var cookies=document.cookie.split('; ');var ret={};for(var i=cookies.length-1;i>=0;i--){var el=cookies[i].split('=');ret[el[0]]=el[1];}
return ret;}
function set_cookie($expire){cookieExpire=setCookieExpire($expire);document.cookie='etSocialCookie=true'+cookieExpire;}
function make_popup_visible($popup,$delay){setTimeout(function(){$popup.addClass('et_social_visible et_social_animated');if($('.et_social_resize').length){$('.et_social_resize').each(function(){define_popup_position($(this));});}},$delay);}
function auto_popup(this_el,delay){var $current_popup_auto=this_el;if(!$current_popup_auto.hasClass('et_social_animated')){var $cookies_expire_auto=$current_popup_auto.data('cookie_duration')?$current_popup_auto.data('cookie_duration'):false,$delay=delay;if((false!==$cookies_expire_auto&&!checkCookieValue('etSocialCookie','true'))||false==$cookies_expire_auto){make_popup_visible($current_popup_auto,$delay);if(false!==$cookies_expire_auto){set_cookie($cookies_expire_auto);}}}}
if('true'==get_url_parameter('et_monarch_popup')){$('.et_social_after_comment').each(function(){var $current_popup=$(this);auto_popup($current_popup,0);});}
if($('.et_social_auto_popup').length){$('.et_social_auto_popup').each(function(){var $current_popup_auto=$(this);auto_popup($current_popup_auto,''!==$current_popup_auto.data('delay')?$current_popup_auto.data('delay')*1000:0);});}
$('.et_social_pinterest_window .et_social_close').on('click',function(){$('.et_social_pin_images_outer').fadeToggle(400);});$('body').on('click','.et_social_icon_cancel',function(){var this_el=$(this);if(this_el.parent().hasClass('et_social_flyin')){$popup=this_el.parent();}else{$popup=this_el.parent().parent();if($popup.hasClass('et_social_all_networks_popup')){all_networks_opened=0;}}
$popup.addClass('et_social_fadeout');setTimeout(function(){$popup.remove();},800);return false;});if($('.et_monarch_after_order').length){$('.et_social_after_purchase').each(function(){var $current_popup=$(this);if(!$current_popup.hasClass('et_social_animated')){var $cookies_expire=$current_popup.data('cookie_duration')?$current_popup.data('cookie_duration'):false,$delay=0;if((false!==$cookies_expire&&!checkCookieValue('etSocialCookie','true'))||false==$cookies_expire){make_popup_visible($current_popup,$delay);if(false!==$cookies_expire){set_cookie($cookies_expire);}}}});}
if($('.et_social_trigger_bottom').length){$('.et_social_trigger_bottom').each(function(){scroll_trigger($(this),true);});}
if($('.et_social_scroll').length){$('.et_social_scroll').each(function(){scroll_trigger($(this),false);});}
function scroll_trigger(this_el,is_bottom_trigger){var current_popup_bottom=this_el;if(!current_popup_bottom.hasClass('et_social_animated')){var cookies_expire_bottom=current_popup_bottom.data('cookie_duration')?current_popup_bottom.data('cookie_duration'):false;if(true==is_bottom_trigger){var scroll_trigger=$('.et_social_bottom_trigger').length?$('.et_social_bottom_trigger').offset().top:$(document).height()-500;}else{var scroll_pos=this_el.data('scroll_pos')>100?100:this_el.data('scroll_pos'),scroll_trigger=100==scroll_pos?$(document).height()-10:$(document).height()*scroll_pos/100;}
$(window).scroll(function(){if((false!==cookies_expire_bottom&&!checkCookieValue('etSocialCookie','true'))||false==cookies_expire_bottom){if($(window).scrollTop()+$(window).height()>scroll_trigger){current_popup_bottom.addClass('et_social_visible et_social_animated');if($('.et_social_resize').length){$('.et_social_resize').each(function(){define_popup_position($(this));});}
if(false!==cookies_expire_bottom){set_cookie(cookies_expire_bottom);}}}});}}
if($('.et_social_trigger_idle').length){$('.et_social_trigger_idle').each(function(){var this_el=$(this);if(!this_el.hasClass('et_social_animated')){var $cookies_expire_idle=this_el.data('cookie_duration')?this_el.data('cookie_duration'):false,$idle_timeout=''!==this_el.data('idle_timeout')?this_el.data('idle_timeout')*1000:30000;if((false!==$cookies_expire_idle&&!checkCookieValue('etSocialCookie','true'))||false==$cookies_expire_idle){$(document).idleTimer($idle_timeout);$(document).on("idle.idleTimer",function(){make_popup_visible(this_el,0);});if(false!==$cookies_expire_idle){set_cookie($cookies_expire_idle);}}}});}
$('.et_social_heading, .et_social_mobile_button').click(function(){$this_mobile_div=$('.et_social_mobile');$this_mobile_div.css({'display':'block'});$('.et_social_mobile_button').removeClass('et_social_active_button');if($this_mobile_div.hasClass('et_social_opened')){$this_mobile_div.find('.et_social_networks').slideToggle(600);$this_mobile_div.removeClass('et_social_opened').addClass('et_social_closed');$('.et_social_mobile_overlay').removeClass('et_social_visible_overlay');$('.et_social_mobile_overlay').fadeToggle(600);}else{$this_mobile_div.removeClass('et_social_closed').addClass('et_social_opened');$this_mobile_div.find('.et_social_networks').slideToggle(600);$('.et_social_mobile_overlay').addClass('et_social_visible_overlay').css({'display':'block'});}});$('.et_social_mobile .et_social_close').click(function(){$mobile_div=$('.et_social_mobile');$mobile_div.fadeToggle(600);$('.et_social_mobile_button').addClass('et_social_active_button');if($mobile_div.hasClass('et_social_opened')){$('.et_social_mobile_overlay').fadeToggle(600);$mobile_div.removeClass('et_social_opened');$mobile_div.find('.et_social_networks').fadeToggle(600);}});if($('.et_social_inline').length){if($('body').hasClass('et_pb_pagebuilder_layout')){var top_inline=$('.et_social_inline_top'),bottom_inline=$('.et_social_inline_bottom'),divi_container='<div class="et_pb_row"><div class="et_pb_column et_pb_column_4_4"></div></div>';if(top_inline.length){$('.et_pb_section').not('.et_pb_fullwidth_section').first().prepend(divi_container).find('.et_pb_row').first().find('.et_pb_column').append(top_inline);}
if(bottom_inline.length){$('.et_pb_section').not('.et_pb_fullwidth_section').last().append(divi_container).find('.et_pb_row').last().find('.et_pb_column').append(bottom_inline);}}}
function define_popup_position($this_popup){setTimeout(function(){var this_popup=$this_popup,networks_div=this_popup.find('.et_social_networks'),header_height=this_popup.find('.et_social_header').outerHeight(),total_count_height=this_popup.find('.et_social_totalcount').height(),extra_height=0<total_count_height?20:0;this_popup.height(this_popup.find('.et_social_icons_container').innerHeight()+header_height+total_count_height+20+extra_height);var popup_max_height=this_popup.hasClass('et_social_popup_content')?$(window).height():$(window).height()-60;if(this_popup.hasClass('et_social_popup_content')&&768<$(window).width()){popup_max_height=popup_max_height-50;}
this_popup.css({'max-height':popup_max_height});if(this_popup.hasClass('et_social_popup_content')){var top_position=$(window).height()/2-this_popup.innerHeight()/2;this_popup.css({'top':top_position+'px'});}
var networks_div_height=this_popup.height()-header_height+total_count_height-extra_height;networks_div.height(networks_div_height);},400);}
function set_mobile_sidebar_height(){setTimeout(function(){var mobile_div=$('.et_social_mobile');if(!mobile_div.hasClass('et_social_opened')){$('.et_social_mobile .et_social_networks').css({'display':'block'});}
if($('.et_social_active_button').length){mobile_div.css({'display':'block'});}
var inner_contatiner_height=mobile_div.find('.et_social_icons_container').innerHeight()+45;if(!mobile_div.hasClass('et_social_opened')){$('.et_social_mobile .et_social_networks').css({'display':'none'});}
if($('.et_social_active_button').length){mobile_div.css({'display':'none'});}
mobile_div.find('.et_social_networks').css({'max-height':inner_contatiner_height,'height':inner_contatiner_height});if($(window).height()<inner_contatiner_height){var inner_height=$(window).height()-mobile_div.find('.et_social_heading').innerHeight()+10;mobile_div.find('.et_social_networks').css({'height':inner_height});}},400);}
function set_sidebar_position(){if($('.et_social_sidebar_networks').length){var this_sidebar=$('.et_social_sidebar_networks'),top_position=$(window).height()/2-this_sidebar.innerHeight()/2;top_position=0>top_position?0:top_position;this_sidebar.css({'top':top_position+'px'});}}
function set_media_wrapper_size(){if($('.et_social_media_wrapper').length){$('.et_social_media_wrapper').each(function(){var this_wrapper=$(this),this_wrapper_media=this_wrapper.find('.et_social_media'),this_image=this_wrapper.find('img'),this_image_height=this_image.height(),this_image_width=this_image.width();this_wrapper.addClass(this_image.attr('class'));this_wrapper_media.height(this_image_height);this_wrapper_media.width(this_image_width-80);});}}
$('body').on('click','.et_social_open_all',function(){all_networks_opened++;if(1==all_networks_opened){var this_button=$(this),page_id=this_button.data('page_id'),permalink=this_button.data('permalink'),title=this_button.data('title'),media=typeof this_button.data('media')!=='undefined'?this_button.data('media'):'',is_popup='popup'==this_button.data('location')?'true':'false';$.ajax({type:'POST',url:monarchSettings.ajaxurl,data:{action:'generate_all_networks_popup',all_networks_page_id:page_id,all_networks_link:permalink,all_networks_title:title,all_networks_media:media,is_popup:is_popup,generate_all_window_nonce:monarchSettings.generate_all_window_nonce},success:function(data){if('false'==is_popup){$('body').append(data);make_popup_visible($('.et_social_all_networks_popup'),1);}else{var popup_container=this_button.parent().closest('.et_social_popup_content');this_button.parent().replaceWith(data);define_popup_position(popup_container);all_networks_opened=0;}}});}
return false;});set_mobile_sidebar_height();set_sidebar_position();$(window).resize(function(){if($('.et_social_resize').length){$('.et_social_resize').each(function(){define_popup_position($(this));});}
if($('.et_social_mobile')){set_mobile_sidebar_height();}
if($('.et_social_sidebar_networks').length){set_sidebar_position();}
set_media_wrapper_size();});$('.et_social_hide_sidebar').click(function(){$('.et_social_hide_sidebar').toggleClass('et_social_hidden_sidebar');$('.et_social_sidebar_networks').toggleClass('et_social_hidden_sidebar et_social_visible_sidebar');});$(window).load(function(){set_media_wrapper_size();if($('.et_social_pin_images').length&&($('.et_social_all_button').length||$('.et_social_pinterest').length)){var pin_container=$('.et_social_pin_images'),permalink=pin_container.data('permalink'),title=pin_container.data('title'),post_id=pin_container.data('post_id'),$i=0;$('img').each(function(){if(!$(this).hasClass('avatar')){var this_img=$(this).attr('src'),this_alt=$(this).attr('alt');if(''!=this_img){var pin_link='http://www.pinterest.com/pin/create/button/?url='+permalink+'&media='+this_img+'&description='+title,this_img_container='<div class="et_social_pin_image"><a href="'+pin_link+'" rel="nofollow" class="et_social_icon et_social_share" data-social_name="pinterest" data-post_id="'+post_id+'" data-social_type="share"><img src="'+this_img+'" alt="'+this_alt+'"/><span class="et_social_pin_overlay et_social_icon"></span></a></div>';$('.et_social_pin_images').append(this_img_container);$i++;}}});if(0==$i){$('.et_social_pin_images').append(monarchSettings.no_img_message);}}});});})(jQuery);!function(a){a.fn.hoverIntent=function(b,c,d){var e={interval:100,sensitivity:6,timeout:0};e="object"==typeof b?a.extend(e,b):a.isFunction(c)?a.extend(e,{over:b,out:c,selector:d}):a.extend(e,{over:b,out:b,selector:c});var f,g,h,i,j=function(a){f=a.pageX,g=a.pageY},k=function(b,c){return c.hoverIntent_t=clearTimeout(c.hoverIntent_t),Math.sqrt((h-f)*(h-f)+(i-g)*(i-g))<e.sensitivity?(a(c).off("mousemove.hoverIntent",j),c.hoverIntent_s=!0,e.over.apply(c,[b])):(h=f,i=g,c.hoverIntent_t=setTimeout(function(){k(b,c)},e.interval),void 0)},l=function(a,b){return b.hoverIntent_t=clearTimeout(b.hoverIntent_t),b.hoverIntent_s=!1,e.out.apply(b,[a])},m=function(b){var c=a.extend({},b),d=this;d.hoverIntent_t&&(d.hoverIntent_t=clearTimeout(d.hoverIntent_t)),"mouseenter"===b.type?(h=c.pageX,i=c.pageY,a(d).on("mousemove.hoverIntent",j),d.hoverIntent_s||(d.hoverIntent_t=setTimeout(function(){k(c,d)},e.interval))):(a(d).off("mousemove.hoverIntent",j),d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){l(c,d)},e.timeout)))};return this.on({"mouseenter.hoverIntent":m,"mouseleave.hoverIntent":m},e.selector)}}(jQuery);;!function($,w){"use strict";var methods=function(){var c={bcClass:"sf-breadcrumb",menuClass:"sf-js-enabled",anchorClass:"sf-with-ul",menuArrowClass:"sf-arrows"},ios=function(){var ios=/iPhone|iPad|iPod/i.test(navigator.userAgent);return ios&&$(w).load(function(){$("body").children().on("click",$.noop)}),ios}(),wp7=function(){var style=document.documentElement.style;return"behavior"in style&&"fill"in style&&/iemobile/i.test(navigator.userAgent)}(),unprefixedPointerEvents=function(){return!!w.PointerEvent}(),toggleMenuClasses=function($menu,o){var classes=c.menuClass;o.cssArrows&&(classes+=" "+c.menuArrowClass),$menu.toggleClass(classes)},setPathToCurrent=function($menu,o){return $menu.find("li."+o.pathClass).slice(0,o.pathLevels).addClass(o.hoverClass+" "+c.bcClass).filter(function(){return $(this).children(o.popUpSelector).hide().show().length}).removeClass(o.pathClass)},toggleAnchorClass=function($li){$li.children("a").toggleClass(c.anchorClass)},toggleTouchAction=function($menu){var msTouchAction=$menu.css("ms-touch-action"),touchAction=$menu.css("touch-action");touchAction=touchAction||msTouchAction,touchAction="pan-y"===touchAction?"auto":"pan-y",$menu.css({"ms-touch-action":touchAction,"touch-action":touchAction})},applyHandlers=function($menu,o){var targets="li:has("+o.popUpSelector+")";$.fn.hoverIntent&&!o.disableHI?$menu.hoverIntent(over,out,targets):$menu.on("mouseenter.superfish",targets,over).on("mouseleave.superfish",targets,out);var touchevent="MSPointerDown.superfish";unprefixedPointerEvents&&(touchevent="pointerdown.superfish"),ios||(touchevent+=" touchend.superfish"),wp7&&(touchevent+=" mousedown.superfish"),$menu.on("focusin.superfish","li",over).on("focusout.superfish","li",out).on(touchevent,"a",o,touchHandler)},touchHandler=function(e){var $this=$(this),$ul=$this.siblings(e.data.popUpSelector);$ul.length>0&&$ul.is(":hidden")&&($this.one("click.superfish",!1),"MSPointerDown"===e.type||"pointerdown"===e.type?$this.trigger("focus"):$.proxy(over,$this.parent("li"))())},over=function(){var $this=$(this),o=getOptions($this);clearTimeout(o.sfTimer),$this.siblings().superfish("hide").end().superfish("show")},out=function(){var $this=$(this),o=getOptions($this);ios?$.proxy(close,$this,o)():(clearTimeout(o.sfTimer),o.sfTimer=setTimeout($.proxy(close,$this,o),o.delay))},close=function(o){o.retainPath=$.inArray(this[0],o.$path)>-1,this.superfish("hide"),this.parents("."+o.hoverClass).length||(o.onIdle.call(getMenu(this)),o.$path.length&&$.proxy(over,o.$path)())},getMenu=function($el){return $el.closest("."+c.menuClass)},getOptions=function($el){return getMenu($el).data("sf-options")};return{hide:function(instant){if(this.length){var $this=this,o=getOptions($this);if(!o)return this;var not=o.retainPath===!0?o.$path:"",$ul=$this.find("li."+o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),speed=o.speedOut;instant&&($ul.show(),speed=0),o.retainPath=!1,o.onBeforeHide.call($ul),$ul.stop(!0,!0).animate(o.animationOut,speed,function(){var $this=$(this);o.onHide.call($this)})}return this},show:function(){var o=getOptions(this);if(!o)return this;var $this=this.addClass(o.hoverClass),$ul=$this.children(o.popUpSelector);return o.onBeforeShow.call($ul),$ul.stop(!0,!0).animate(o.animation,o.speed,function(){o.onShow.call($ul)}),this},destroy:function(){return this.each(function(){var $hasPopUp,$this=$(this),o=$this.data("sf-options");return o?($hasPopUp=$this.find(o.popUpSelector).parent("li"),clearTimeout(o.sfTimer),toggleMenuClasses($this,o),toggleAnchorClass($hasPopUp),toggleTouchAction($this),$this.off(".superfish").off(".hoverIntent"),$hasPopUp.children(o.popUpSelector).attr("style",function(i,style){return style.replace(/display[^;]+;?/g,"")}),o.$path.removeClass(o.hoverClass+" "+c.bcClass).addClass(o.pathClass),$this.find("."+o.hoverClass).removeClass(o.hoverClass),o.onDestroy.call($this),void $this.removeData("sf-options")):!1})},init:function(op){return this.each(function(){var $this=$(this);if($this.data("sf-options"))return!1;var o=$.extend({},$.fn.superfish.defaults,op),$hasPopUp=$this.find(o.popUpSelector).parent("li");o.$path=setPathToCurrent($this,o),$this.data("sf-options",o),toggleMenuClasses($this,o),toggleAnchorClass($hasPopUp),toggleTouchAction($this),applyHandlers($this,o),$hasPopUp.not("."+c.bcClass).superfish("hide",!0),o.onInit.call(this)})}}}();$.fn.superfish=function(method,args){return methods[method]?methods[method].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof method&&method?$.error("Method "+method+" does not exist on jQuery.fn.superfish"):methods.init.apply(this,arguments)},$.fn.superfish.defaults={popUpSelector:"ul,.sf-mega",hoverClass:"sfHover",pathClass:"overrideThisToUse",pathLevels:1,delay:800,animation:{opacity:"show"},animationOut:{opacity:"hide"},speed:"normal",speedOut:"fast",cssArrows:!0,disableHI:!1,onInit:$.noop,onBeforeShow:$.noop,onShow:$.noop,onBeforeHide:$.noop,onHide:$.noop,onIdle:$.noop,onDestroy:$.noop}}(jQuery,window);;jQuery(function($){"use strict";$(".js-superfish").superfish({delay:100,animation:{opacity:"show",height:"show"},dropShadows:!1})});