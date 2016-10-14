function googleMapCurrentLocation(e){var t="ru",r="false",n="";void 0!=e&&(void 0!=e.lang&&(t=e.lang),void 0!=e.sensor&&(r=e.sensor),void 0!=e.position&&(void 0!=e.position.latitude&&(n+=String(e.position.latitude)),n+=",",void 0!=e.position.longitude&&(n+=String(e.position.longitude))));var i=t2.Network.createClientHttp({options:{method:"GET",url:"http://maps.googleapis.com/maps/api/geocode/json",headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-cache, must-revalidate"},args:{latlng:n,sensor:r,language:t}},loading:e.loading,loaded:e.loaded,success:function(t){switch(json=t.response("json"),json.status){case"OK":var r={},n=json.results;if(void 0!=n&&n.length>0){var i=json.results[0];r={address:i.formatted_address,componet:{}};for(var a=i.address_components,o=0;o<a.length;o++){var s=a[o];s.types.length>0&&(r.componet[s.types[0]]=s.long_name)}}void 0!=e.success&&e.success(json.status,r);break;default:void 0!=e.success&&e.success(json.status)}},failure:e.failure});return void 0!=i&&i.run(),i}function googleMapPaveRoute(e){var t="kml",r="ptk",n="w",i="en",a=0,o=0,s=0,u=0;if(void 0!=e){if(void 0!=e.output&&(t=e.output),void 0!=e.doflg&&(r=e.doflg),void 0!=e.dirflg&&(n=e.dirflg),void 0!=e.hl&&(i=e.hl),void 0!=e.a){var l=e.position;a=l.latitude,o=l.longitude}if(void 0!=e.b){var l=e.b;s=l.latitude,u=l.longitude}}var d=t2.Network.createClientHttp({options:{method:"GET",url:"http://maps.google.com/",args:{saddr:String(a)+","+String(o),daddr:String(s)+","+String(u),output:t,doflg:r,dirflg:n,hl:i}},loading:e.loading,loaded:e.loaded,success:function(t){var r={name:e.name,points:[]},n=t.response("raw:xml");if(void 0!=n)for(var i=n.documentElement.getElementsByTagName("LineString"),a=0;a<i.length;a++)for(var o=i.item(a).firstChild.text.split(" "),s=0;s<o.length;s++){var u=o[s].split(",");void 0!=u[0]&&void 0!=u[1]&&r.points.push({longitude:u[0],latitude:u[1]})}void 0!=e.success&&e.success(r)},failure:e.failure});return void 0!=d&&d.run(),d}var t2=require("TiTools2/TiTools");module.exports={Map:{currentLocation:googleMapCurrentLocation,paveRoute:googleMapPaveRoute}};