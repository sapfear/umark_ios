function plural(e){return e%100===11||e%10!==1}function translate(e,t,a,i){var o=e+" ";switch(a){case"s":return t||i?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return t?"mínúta":"mínútu";case"mm":return plural(e)?o+(t||i?"mínútur":"mínútum"):t?o+"mínúta":o+"mínútu";case"hh":return plural(e)?o+(t||i?"klukkustundir":"klukkustundum"):o+"klukkustund";case"d":return t?"dagur":i?"dag":"degi";case"dd":return plural(e)?t?o+"dagar":o+(i?"daga":"dögum"):t?o+"dagur":o+(i?"dag":"degi");case"M":return t?"mánuður":i?"mánuð":"mánuði";case"MM":return plural(e)?t?o+"mánuðir":o+(i?"mánuði":"mánuðum"):t?o+"mánuður":o+(i?"mánuð":"mánuði");case"y":return t||i?"ár":"ári";case"yy":return plural(e)?o+(t||i?"ár":"árum"):o+(t||i?"ár":"ári")}}require("TiTools2/ThirdParty/moment").lang("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] LT",LLLL:"dddd, D. MMMM YYYY [kl.] LT"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:translate,m:translate,mm:translate,h:"klukkustund",hh:translate,d:translate,dd:translate,M:translate,MM:translate,y:translate,yy:translate},ordinal:"%d.",week:{dow:1,doy:4}});