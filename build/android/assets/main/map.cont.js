function init(e,t){var r=(i.Bank,i.ThirdParty.underscore),n=(i.ThirdParty.underscoreString,require("ti.map"));if("iphone"==Ti.Platform.osname)var i=require("TiTools2/TiTools");else var i=require("TiTools2_a/TiTools");var o=n.createView(void 0,{mapType:n.STANDARD_TYPE,animate:!0,regionFit:!1,userLocation:!0});return o.updateData=function(){var e=[],o=i.Path.preprocess("%ResourcesPath%/Media");this.removeAllAnnotations(),r.isEmpty(t)||(r.each(t,function(t,r){var i=n.createAnnotation({longitude:t.location.lat-0,latitude:t.location.lon-0,title:t.contacts.city.substring(0,22),subtitle:t.name,image:o+"/Pin.png",animate:!0});e.push(i)}),this.annotations=e)},o.updateData(),o.addEventListener("click",function(e){}),o}module.exports=init;