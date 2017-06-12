$(document).ready(function() {
    // mbsTab[g_ac=$]>g[g_id=$][g_adi=Button$]{Test $}*10
    function mbsHata(i, t){
        var r = "hata";
        if(i == "mbs_g_id_yok"){
            r = '<mbsHata> <div class="sol"> <i class="material-icons notif__icon">error</i></div><div class="sag">mbsTab "' + t + '" adında bir g_id bulamadı!</div></mbsHata>';
        }else if (i == "mbs_html"){
            r = '<mbsHata> <div class="sol"> <i class="material-icons notif__icon">error</i></div><div class="sag">MBS eklentisi çalıştırılamaz !</div></mbsHata>';;
        }else{}
        return r;
    }
    if ($("html").attr("mbs") == false){
        console.log("MBS calistirilabilir :) ");
        function mbsTabButton(tab_id, aktif_id){
            var r = '<div class="butonlar">', cl = '';
            $("mbsTab[mbs-tab="+tab_id+"]").find("g").each(function(i){
                var g = $(this), g_id = g.attr("g_id"), g_adi = g.attr("g_adi");
                if(g_id == aktif_id){
                    cl = ' class="aktif"';
                }else{ cl = ''; }
                r = r + '<button btn_id="'+g_id+'" tab_id="'+tab_id+'"'+cl+'>'+g_adi+'</button>';
            });
            r = r + '</div>';
            return r;
        }
        $("body mbsTab").each(function(i) {
            // ID'le
            var mbsTab_ids = $(this).index(), mbsTab_id = parseInt(mbsTab_ids) + 1 ;
            $(this).attr("mbs-tab", mbsTab_id);
            var btn_olustur_izin = 1;
            // İlk Otomatik Açılacak TAB
            var t = $("mbsTab[mbs-tab="+mbsTab_id+"]"),
            g = $("mbsTab[mbs-tab="+mbsTab_id+"]").attr("g_ac");
            $("mbsTab[mbs-tab="+mbsTab_id+"] g").attr("style", "display: none");
            if(g != ""){
                if($("mbsTab[mbs-tab="+mbsTab_id+"] g[g_id="+g+"]").html()){
                    btn_olustur_izin = 1;
                    $("mbsTab[mbs-tab="+mbsTab_id+"] g[g_id="+g+"]").addClass("aktif").slideDown();
                }else{
                    btn_olustur_izin = 0;
                    t.html(mbsHata("mbs_g_id_yok", g));
                    console.error('mbsTab "' + g + '" adında bir g_id bulamadı!');
                }
            }else{
                $("mbsTab[mbs-tab="+mbsTab_id+"] g:eq(0)").addClass("aktif").slideDown();
            }
            //TAB Düğme Oluştur
            if(btn_olustur_izin == 1){
                $("mbsTab[mbs-tab="+mbsTab_id+"]").prepend(mbsTabButton(mbsTab_id, g));
            }
            //TAB Düğmeleri
            $("mbsTab div.butonlar button").click(function(){
                var btn_id = $(this).attr("btn_id")
                var tab_id = $(this).attr("tab_id");
                
                $("mbsTab[mbs-tab="+tab_id+"] div.butonlar button[btn_id!="+btn_id+"]").removeClass("aktif");
                $("mbsTab[mbs-tab="+tab_id+"] div.butonlar button[btn_id="+btn_id+"]").addClass("aktif");
                
                
                $("mbsTab[mbs-tab="+tab_id+"] g[g_id!="+btn_id+"]").removeClass("aktif").slideUp();
                $("mbsTab[mbs-tab="+tab_id+"] g[g_id="+btn_id+"]").addClass("aktif").slideDown();
            });
        });
    } else {
        $("body mbsTab").each(function(i) {
			      $("body").prepend(mbsHata("mbs_html", ""));
			      $("mbsTab").remove();
        });
    }
});
