/**
 * 图片轮播插件
 * @param op+options
 * @author walden.wang
 */
(function($){
	$.fn.extend({
		imgslider:function(options){
			//全局配置项
			var op=$.extend({defTarget:"_blank",imgShowClass:"imgShow",footerClass:"footer",titleShowClass:"titleShow",imgIndexClass:"imgIndex",selectedClass:"selected",duration:2000},options);
			return this.each(function(){
				initImgSlider(this);
			})
			function initImgSlider(item){
				var autoSlider={};
				var $this=$(item);
				var currentIndex=0;
				var divStr="<div></div>";
				var imgsCount=$this.children().size();
				$this.wrapInner(divStr);
				var $imgShow=$(">div:first",$this).addClass(op.imgShowClass);
				var $footer=$(divStr).appendTo($this).addClass(op.footerClass);
				var $titleShow=$(divStr).appendTo($this).addClass(op.titleShowClass);
				var imgIndexStr=generateImgIndexList(imgsCount);
				var $imgIndex=$(imgIndexStr).appendTo($this).addClass(op.imgIndexClass);
				var $imgIndexList=$(">li",$imgIndex);
				var $imgLinks=$(">a",$imgShow);
				var $imgs=$(">a>img",$imgShow);
				$imgLinks.click(function(e){
					window.open($(this).attr("href"),$(this).attr("target")?$(this).attr("target"):op.defTarget);
					//取消超链接的默认功能
					e.preventDefault();
				});
				//初始化标题,图片和索引
				$titleShow.text($imgs.eq(currentIndex).attr("title"));
				$imgIndexList.eq(currentIndex).addClass(op.selectedClass);
				$imgs.each(function(index,item){
					currentIndex==index?$(item).show():$(item).hide();
				});
				//图片索引块点击事件
				$imgIndexList.click(function(){
					currentIndex=$(this).text()-1;
					$titleShow.text($imgs.eq(currentIndex).attr("title"));
					//解决IE8下索引块不能轮播的BUG
					$imgIndex[0].style.background="";
					$imgIndexList.eq(currentIndex).addClass(op.selectedClass).siblings("."+op.selectedClass).removeClass(op.selectedClass);
					$imgs.filter(":visible").fadeOut(op.duration);
					$imgs.eq(currentIndex).fadeIn(op.duration);
				});
				//图片标题点击事件
				$titleShow.click(function(){
					var url=$imgLinks.eq(currentIndex).attr("href");
					window.open(url,$(this).attr("target")?$(this).attr("target"):op.defTarget);
				});
				//设置自动播放函数
				autoSlider=function(){
					currentIndex=currentIndex>=imgsCount-1?0:++currentIndex;
					$imgIndexList.eq(currentIndex).trigger("click");
				}
				var autoHandler=setInterval(autoSlider,2*op.duration);
				//当鼠标移上去后停止自动播放,移开后开始自动播放
				$this.hover(function(){
					clearInterval(autoHandler);
				},function(){
					autoHandler=setInterval(autoSlider,2*op.duration);
				});
			}
			//生成ul中imgsCount个li
			function generateImgIndexList(imgsCount){
				var imgIndexStr="<ul>";
				for(var i=1;i<=imgsCount;i++){
					imgIndexStr+="<li>"+i+"</li>";
				}
				return imgIndexStr+="</ul>";
			}
		}
	});
})(jQuery);