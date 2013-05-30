(function($){
	// qrcode
	(function(u){u.fn.qrcode=function(l){function x(a){this.mode=o.MODE_8BIT_BYTE;this.data=a}function p(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function t(a,c){if(a.length==undefined)throw Error(a.length+"/"+c);for(var d=0;d<a.length&&a[d]==0;)d++;this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++)this.num[b]=a[b+d]}function q(a,c){this.totalCount=a;this.dataCount=c}function w(){this.buffer=[];this.length=0}x.prototype=
	{getLength:function(){return this.data.length},write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}};p.prototype={addData:function(a){this.dataList.push(new x(a));this.dataCache=null},isDark:function(a,c){if(a<0||this.moduleCount<=a||c<0||this.moduleCount<=c)throw Error(a+","+c);return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(this.typeNumber<1){var a=1;for(a=1;a<40;a++){for(var c=q.getRSBlocks(a,this.errorCorrectLevel),
	d=new w,b=0,e=0;e<c.length;e++)b+=c[e].dataCount;for(e=0;e<this.dataList.length;e++){c=this.dataList[e];d.put(c.mode,4);d.put(c.getLength(),j.getLengthInBits(c.mode,a));c.write(d)}if(d.getLengthInBits()<=b*8)break}this.typeNumber=a}this.makeImpl(false,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=this.typeNumber*4+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[d][b]=
	null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);this.typeNumber>=7&&this.setupTypeNumber(a);if(this.dataCache==null)this.dataCache=p.createData(this.typeNumber,this.errorCorrectLevel,this.dataList);this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;d<=7;d++)if(!(a+d<=-1||this.moduleCount<=
	a+d))for(var b=-1;b<=7;b++)c+b<=-1||this.moduleCount<=c+b||(this.modules[a+d][c+b]=0<=d&&d<=6&&(b==0||b==6)||0<=b&&b<=6&&(d==0||d==6)||2<=d&&d<=4&&2<=b&&b<=4?true:false)},getBestMaskPattern:function(){for(var a=0,c=0,d=0;d<8;d++){this.makeImpl(true,d);var b=j.getLostPoint(this);if(d==0||a>b){a=b;c=d}}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++){d=c*1;for(var b=0;b<this.modules[c].length;b++){var e=b*1;if(this.modules[c][b]){a.beginFill(0,
	100);a.moveTo(e,d);a.lineTo(e+1,d);a.lineTo(e+1,d+1);a.lineTo(e,d+1);a.endFill()}}}return a},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)if(this.modules[a][6]==null)this.modules[a][6]=a%2==0;for(a=8;a<this.moduleCount-8;a++)if(this.modules[6][a]==null)this.modules[6][a]=a%2==0},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++)for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(this.modules[b][e]==null)for(var f=-2;f<=2;f++)for(var h=
	-2;h<=2;h++)this.modules[b+f][e+h]=f==-2||f==2||h==-2||h==2||f==0&&h==0?true:false}},setupTypeNumber:function(a){for(var c=j.getBCHTypeNumber(this.typeNumber),d=0;d<18;d++){var b=!a&&(c>>d&1)==1;this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;d<18;d++){b=!a&&(c>>d&1)==1;this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b}},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;b<15;b++){var e=!a&&(d>>b&1)==1;if(b<6)this.modules[b][8]=e;else if(b<
	8)this.modules[b+1][8]=e;else this.modules[this.moduleCount-15+b][8]=e}for(b=0;b<15;b++){e=!a&&(d>>b&1)==1;if(b<8)this.modules[8][this.moduleCount-b-1]=e;else if(b<9)this.modules[8][15-b-1+1]=e;else this.modules[8][15-b-1]=e}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,h=this.moduleCount-1;h>0;h-=2)for(h==6&&h--;;){for(var g=0;g<2;g++)if(this.modules[b][h-g]==null){var k=false;if(f<a.length)k=(a[f]>>>e&1)==1;if(j.getMask(c,b,h-g))k=!k;this.modules[b][h-
	g]=k;e--;if(e==-1){f++;e=7}}b+=d;if(b<0||this.moduleCount<=b){b-=d;d=-d;break}}}};p.PAD0=236;p.PAD1=17;p.createData=function(a,c,d){c=q.getRSBlocks(a,c);for(var b=new w,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++)a+=c[e].dataCount;if(b.getLengthInBits()>a*8)throw Error("code length overflow. ("+b.getLengthInBits()+">"+a*8+")");for(b.getLengthInBits()+4<=a*8&&b.put(0,4);b.getLengthInBits()%8!=0;)b.putBit(false);
	for(;;){if(b.getLengthInBits()>=a*8)break;b.put(p.PAD0,8);if(b.getLengthInBits()>=a*8)break;b.put(p.PAD1,8)}return p.createBytes(b,c)};p.createBytes=function(a,c){for(var d=0,b=0,e=0,f=Array(c.length),h=Array(c.length),g=0;g<c.length;g++){var k=c[g].dataCount,r=c[g].totalCount-k;b=Math.max(b,k);e=Math.max(e,r);f[g]=Array(k);for(var i=0;i<f[g].length;i++)f[g][i]=255&a.buffer[i+d];d+=k;i=j.getErrorCorrectPolynomial(r);k=(new t(f[g],i.getLength()-1)).mod(i);h[g]=Array(i.getLength()-1);for(i=0;i<h[g].length;i++){r=
	i+k.getLength()-h[g].length;h[g][i]=r>=0?k.get(r):0}}for(i=g=0;i<c.length;i++)g+=c[i].totalCount;d=Array(g);for(i=k=0;i<b;i++)for(g=0;g<c.length;g++)if(i<f[g].length)d[k++]=f[g][i];for(i=0;i<e;i++)for(g=0;g<c.length;g++)if(i<h[g].length)d[k++]=h[g][i];return d};for(var o={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},v={L:1,M:0,Q:3,H:2},s={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},j={PATTERN_POSITION_TABLE:[[],[6,18],[6,
	22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,
	28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;j.getBCHDigit(c)-j.getBCHDigit(j.G15)>=0;)c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15);return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;j.getBCHDigit(c)-j.getBCHDigit(j.G18)>=0;)c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18);return a<<12|c},getBCHDigit:function(a){for(var c=0;a!=0;){c++;a>>>=1}return c},
	getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case s.PATTERN000:return(c+d)%2==0;case s.PATTERN001:return c%2==0;case s.PATTERN010:return d%3==0;case s.PATTERN011:return(c+d)%3==0;case s.PATTERN100:return(Math.floor(c/2)+Math.floor(d/3))%2==0;case s.PATTERN101:return c*d%2+c*d%3==0;case s.PATTERN110:return(c*d%2+c*d%3)%2==0;case s.PATTERN111:return(c*d%3+(c+d)%2)%2==0;default:throw Error("bad maskPattern:"+a);}},getErrorCorrectPolynomial:function(a){for(var c=
	new t([1],0),d=0;d<a;d++)c=c.multiply(new t([1,m.gexp(d)],0));return c},getLengthInBits:function(a,c){if(1<=c&&c<10)switch(a){case o.MODE_NUMBER:return 10;case o.MODE_ALPHA_NUM:return 9;case o.MODE_8BIT_BYTE:return 8;case o.MODE_KANJI:return 8;default:throw Error("mode:"+a);}else if(c<27)switch(a){case o.MODE_NUMBER:return 12;case o.MODE_ALPHA_NUM:return 11;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 10;default:throw Error("mode:"+a);}else if(c<41)switch(a){case o.MODE_NUMBER:return 14;
	case o.MODE_ALPHA_NUM:return 13;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 12;default:throw Error("mode:"+a);}else throw Error("type:"+c);},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++)for(var e=0;e<c;e++){for(var f=0,h=a.isDark(b,e),g=-1;g<=1;g++)if(!(b+g<0||c<=b+g))for(var k=-1;k<=1;k++)e+k<0||c<=e+k||g==0&&k==0||h==a.isDark(b+g,e+k)&&f++;if(f>5)d+=3+f-5}for(b=0;b<c-1;b++)for(e=0;e<c-1;e++){f=0;a.isDark(b,e)&&f++;a.isDark(b+1,e)&&f++;a.isDark(b,e+1)&&f++;a.isDark(b+
	1,e+1)&&f++;if(f==0||f==4)d+=3}for(b=0;b<c;b++)for(e=0;e<c-6;e++)if(a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6))d+=40;for(e=0;e<c;e++)for(b=0;b<c-6;b++)if(a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e))d+=40;for(e=f=0;e<c;e++)for(b=0;b<c;b++)a.isDark(b,e)&&f++;d+=Math.abs(100*f/c/c-50)/5*10;return d}},m={glog:function(a){if(a<1)throw Error("glog("+a+")");
	return m.LOG_TABLE[a]},gexp:function(a){for(;a<0;)a+=255;for(;a>=256;)a-=255;return m.EXP_TABLE[a]},EXP_TABLE:Array(256),LOG_TABLE:Array(256)},n=0;n<8;n++)m.EXP_TABLE[n]=1<<n;for(n=8;n<256;n++)m.EXP_TABLE[n]=m.EXP_TABLE[n-4]^m.EXP_TABLE[n-5]^m.EXP_TABLE[n-6]^m.EXP_TABLE[n-8];for(n=0;n<255;n++)m.LOG_TABLE[m.EXP_TABLE[n]]=n;t.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var b=
	0;b<a.getLength();b++)c[d+b]^=m.gexp(m.glog(this.get(d))+m.glog(a.get(b)));return new t(c,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var c=m.glog(this.get(0))-m.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++)d[b]=this.get(b);for(b=0;b<a.getLength();b++)d[b]^=m.gexp(m.glog(a.get(b))+c);return(new t(d,0)).mod(a)}};q.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],
	[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,
	46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,
	70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,
	46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],
	[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,
	46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];q.getRSBlocks=function(a,c){var d=q.getRsBlockTable(a,c);if(d==undefined)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var b=d.length/3,e=[],f=0;f<b;f++)for(var h=d[f*3+0],g=d[f*3+1],k=d[f*3+2],r=0;r<h;r++)e.push(new q(g,k));return e};q.getRsBlockTable=function(a,
	c){switch(c){case v.L:return q.RS_BLOCK_TABLE[(a-1)*4+0];case v.M:return q.RS_BLOCK_TABLE[(a-1)*4+1];case v.Q:return q.RS_BLOCK_TABLE[(a-1)*4+2];case v.H:return q.RS_BLOCK_TABLE[(a-1)*4+3];default:return}};w.prototype={get:function(a){return(this.buffer[Math.floor(a/8)]>>>7-a%8&1)==1},put:function(a,c){for(var d=0;d<c;d++)this.putBit((a>>>c-d-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);if(a)this.buffer[c]|=
	128>>>this.length%8;this.length++}};if(typeof l==="string")l={text:l};l=u.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,correctLevel:v.H},l);return this.each(function(){var a;if(l.render=="canvas"){a=new p(l.typeNumber,l.correctLevel);a.addData(l.text);a.make();var c=document.createElement("canvas");c.width=l.width;c.height=l.height;for(var d=c.getContext("2d"),b=l.width/a.getModuleCount(),e=l.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++)for(var h=0;h<a.getModuleCount();h++){d.fillStyle=
	a.isDark(f,h)?"#000000":"#ffffff";d.fillRect(h*b,f*e,b,e)}a=c}else{a=new p(l.typeNumber,l.correctLevel);a.addData(l.text);a.make();c=u("<table></table>").css("width",l.width+"px").css("height",l.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color","#ffffff");d=100/a.getModuleCount();b=100/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=u("<tr></tr>").css("height",b+"%").appendTo(c);for(h=0;h<a.getModuleCount();h++)u("<td></td>").css("width",d+"%").css("background-color",
	a.isDark(e,h)?"#000000":"#ffffff").appendTo(f)}a=c}jQuery(a).appendTo(this)})}})(jQuery);

	// Regex Selector for jQuery by James Padolsey <http://james.padolsey.com/javascript/regex-selector-for-jquery/>
	jQuery.expr[':'].regex = function(elem, index, match) {
		var matchParams = match[3].split(','),
		    validLabels = /^(data|css):/,
		    attr = {
		        method: matchParams[0].match(validLabels) ?
		                    matchParams[0].split(':')[0] : 'attr',
		        property: matchParams.shift().replace(validLabels,'')
		    },
		    regexFlags = 'ig',
		    regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
		return regex.test(jQuery(elem)[attr.method](attr.property));
	}
	/**
	 * jQuery.ScrollTo - Easy element scrolling using jQuery.
	 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
	 * Dual licensed under MIT and GPL.
	 * Date: 5/25/2009
	 * @author Ariel Flesler
	 * @version 1.4.2
	 *
	 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
	 */
	;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

	if (!mobilemode) {
		// notifications via pine notify jQuery plugin
		window.notify = function(content,type,title,options) {
			var defaults = {
				pnotify_title: ((title != undefined) ? title : ''),
				pnotify_text: content//,
	/*			pnotify_nonblock: true,
				pnotify_nonblock_opacity: .2*/
			}
			if (options != undefined) {
				$.extend(defaults,options);
				$.pnotify(defaults);
				return true;
			}
			if (type != undefined) {
				switch(type) {
					case 'error':
						var options = {
							pnotify_type: 'error',
						}
						break;
					case 'comment':
						var options = {
							pnotify_delay: Math.ceil($.pnotify.defaults.pnotify_delay/2),
							pnotify_notice_icon: 'ui-icon ui-icon-comment'
						}
						$.extend(defaults,options);
						if (window.notify_comment != undefined) {
							window.notify_comment.pnotify(defaults);
							window.notify_comment.effect('bounce');
						} else {
							window.notify_comment = $.pnotify(defaults);
							window.notify_comment.pnotify_display();
						}
						return true;
						break;
					case 'alert':
					default:
						var options = {
							pnotify_title: 'Information',
							pnotify_notice_icon: 'ui-icon ui-icon-alert'
						}

				}
				$.extend(defaults,options);
			}
			$.pnotify(defaults);
		}
		window.alert = function(message){notify(message);}
		window.error = function(message){notify(message,'error');}

		// autocomplete addresses
		$.widget( "custom.catcomplete", $.ui.autocomplete, {
			_renderMenu: function( ul, items ) {
				var self = this,
					currentCategory = "";
				if (items.length > 1) {
					$.each( items, function( index, item ) {
						if ( item.category != currentCategory ) {
							ul.append( '<li class="ui-autocomplete-category">' + item.category + '</li>' );
							currentCategory = item.category;
						}
						self._renderItem( ul, item );
					});
				} else {
					self._renderItem( ul, items[0] );
				}
			}
		});
	} else if (!widgetmode) {
		// mobile notifications
		window.notify_count = 0;
		window.notify = (function(type,text) {
		notify_count++;
		switch(type) {
			case 'success':
				var aclass = "ui-body-suc";
				break;
			case 'error':
				var aclass = "ui-body-err";
				break;
			case 'info':
				var aclass = "ui-body-info";
				break;
			case 'warning':
				var aclass = "ui-body-e";
				break;
		}
		$('<div class="ui-loader ui-overlay-shadow ui-body-b ui-corner-all ui-notify" id="notify_'+notify_count+'">'+ text +'</div>')
			.css({
				"display": "block",
				"opacity": 0.96,
				"top": $(window).scrollTop() + (120 * notify_count),
				"left": "10%",
				"width": "80%",
				"height": "auto",
				"vertical-align": "middle",
				"padding": "5px"
			})
			.addClass(aclass)
			.appendTo( $.mobile.pageContainer )
			.delay( 1800 + (400 * notify_count) )
			.fadeOut( 1400 + (400 * notify_count), function(){
				notify_count--;
				$(this).remove();
			});
	   });
	   window.alert = function(message) {notify('info',message);};
	   window.info = function(message) {notify('info',message);};
	   window.error = function(message) {notify('error',message);};
	   window.warning = function(message) {notify('warning',message);};
	   window.success = function(message) {notify('success',message);};
	} else {
	   window.info = function(message) {alert(message);};
	   window.error = function(message) {alert(message);};
	   window.warning = function(message) {alert(message);};
	   window.success = function(message) {alert(message);};
	}

/*	// touch scroll
	$.fn.touchScroll = function(options) {
		// Device sniffing
		var isTouchDevice = function(){try{document.createEvent('TouchEvent');return true;}catch(e){return false;}};
		if (isTouchDevice()) {
			this.data('scrollStartPos',0);
			this.bind('touchstart',function(event){$(this).data('scrollStartPos',$(this).scrollTop()+event.originalEvent.touches[0].pageY);});
			this.bind('touchmove',function(event){$(this).scrollTop($(this).data('scrollStartPos')-event.originalEvent.touches[0].pageY);event.preventDefault();});
		}
	}
*/
	$.fn.touchScroll = function(options) {
		// Device sniffing
		var isTouchDevice = function(){try{document.createEvent('TouchEvent');return true;}catch(e){return false;}};
		if (isTouchDevice()) {
			this.data('scrollStartPos',0);

			this.bind('touchstart',function(event){
				var now = new Date().getTime();
				$(this).data('startTime',parseInt(now,10));
				$(this).data('lastDiff',0);

				$(this).data('scrollStartPos',$(this).scrollTop()+event.originalEvent.touches[0].pageY);
			});
			this.bind('touchmove',function(event){
				var diff = $(this).data('scrollStartPos')-event.originalEvent.touches[0].pageY;
				$(this).data('lastDiff',diff);

				$(this).scrollTop(diff);
				event.preventDefault();
			});
			this.bind('touchend',function(event){
				var now = new Date().getTime();
				var endTime = parseInt(now,10);
				var duration = endTime - $(this).data('startTime');
				var diff = Math.round($(this).data('lastDiff') * (1+200/duration));

				$(this).css('scrollTop',diff);
			});
		}
	}

})(jQuery);




window.inspect = function ( obj ) {
  if (typeof obj === "undefined") {
      return "undefined";
  }
  var _props = [];

    for ( var i in obj ) {
    	//if (typeof obj[i] === 'object')
    		//_props.push(i + inspect(obj[i]));
        _props.push( i + " : " + obj[i] );
    }
    return " {" + _props.join( ",<br>" ) + "} ";
}
window.log = function(){
  log.history = log.history || [];
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};
(function(doc){
  var write = doc.write;
  doc.write = function(q){
    log('document.write(): ',arguments);
    if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);
  };
})(document);
