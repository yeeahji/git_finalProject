$(document).ready(function() {//처음들어가자마자 테이블 출력
   memberListPrint();
});

//selectPrint눌렀을때 (20개보기 50개보기..)
$('#selectPrint').change(function(){
   var viewNum = $(this).val();
   $('#viewNum').val(viewNum);
   
   memberListPrint();
});

function memberListPrint(){
   $.ajax({
      type: 'get',
      url: '/market/admin/getMemberList',
      data: {'pg': $('#pg').val(),
            'viewNum': $('#viewNum').val()},
      dataType: 'json',
      success: function(data){
         $("#tbody tr:gt(0)").remove();
         $.each(data.list, function(index, items){
            var mem_enabled = items.enabled;
            if(mem_enabled==='true'){
               mem_enabled='정상';
            }else if(mem_enabled==='false'){
               mem_enabled='정지';
            }
            
            $('<tr/>').append($('<td/>',{
               text: items.mem_id
            })).append($('<td/>',{
            }).append($('<a/>',{
               href: '#',
               text: items.mem_name,
               id: 'subjectA',
               class: items.seq+""
            }))
            ).append($('<td/>',{
               text: items.mem_email
            })).append($('<td/>',{
               text: mem_enabled
            })).append($('<td/>',{
               text: items.mem_add1
            })).appendTo($('#tbody'));
         });//each
         
         $('#totalMember').text(data.totalMember)
         //페이징처리
         $('#boardPagingDiv').html(data.adminBoardPaging.pagingHTML);
         
         //클릭
         clickEvent(data);
      }//success
   });
};


//조건검색======================================================

//검색
$('#memberSearchBtn').click(function(event, str){
   if(str != 'research'){
      $('input[name=searchPg]').val(1);
   }
   if($('#keyword').val() == ''){
      alert('검색어를 입력하세요');
   }else{
      search_viewNum_change();
      
      //조건 검색후 selectPrint눌렀을때 (20개보기 50개보기..)
      $('#selectPrint').change(function(){
         var viewNum = $(this).val();
         $('#viewNum').val(viewNum);
         
         search_viewNum_change();
      });
   }
});

function search_viewNum_change(data){
   $.ajax({
      type: 'post',
      url: '/market/admin/getSearchMember',
      data: {'pg': $('#pg').val(),
            'searchType':$('#searchType').val(),
            'keyword':$('#keyword').val(),
            'viewNum': $('#viewNum').val()},
      dataType: 'json',
      success: function(data){
         $("#tbody tr:gt(0)").remove();
         $.each(data.list, function(index, items){
            var mem_enabled = items.enabled;
            if(mem_enabled.equals===true){
               mem_enabled='정상'
            }else if(mem_enabled.equals===false){
               mem_enabled='정지'
            }
            
            $('<tr/>').append($('<td/>',{
               text: items.mem_id
            })).append($('<td/>',{
            }).append($('<a/>',{
               href: '#',
               text: items.mem_name,
               id: 'subjectA',
               class: items.seq+""
            }))
            ).append($('<td/>',{
               text: items.mem_email
            })).append($('<td/>',{
               text: mem_enabled
            })).append($('<td/>',{
               text: items.mem_add1
            })).appendTo($('#tbody'));
         });//each
         
         //페이징처리
           $('#boardPagingDiv').html(data.adminBoardPaging.pagingHTML);
           
           //클릭
           clickEvent(data);
      }
   });
}


//클릭후 나오는 공통정보====================================================


function clickEvent(data){
   let id;
    $('#memberTable').on('click','#subjectA',function(){
         id = $(this).parent().prev().text();
         $.ajax({
            type: 'post',
            url: '/market/admin/memberView',
            data: {'id': id},
            dataType: 'json',
            success: function(data){
               //alert(JSON.stringify(data));
               showMember(data);
            }
         });
      });
      
      $('#moveStorePageBtn').click(function(){
         window.open("/market/store/store?id="+id,"PopupWin","width=800,height=800");
      });
      $('#moveStore_adminBtn').click(function(){
         location.href="/market/admin/storeList?id='+id'"
      });
      
      //영구정지
      $('#memberBlockBtn').click(function(){
           //window.confirm(id+'님을 영구정지 하시겠습니까?');
         var result = confirm(id+'님을 영구정지 하시겠습니까?');
         
         if(result){
            $.ajax({
               type: 'get',
               url: '/market/admin/memberBlock',
               data: {'id':id},
               success: function(){
                  alert('계정을 정지했습니다.');
               },
               error: function(){
                  alert(id+'님의 계정을 영구정지 했습니다.');
                  location.reload();
               }
            });
         }else{
            
         }
        });
      //영구정지해제
      $('#memberReleaseBtn').click(function(){
         //window.confirm(id+'님을 영구정지 하시겠습니까?');
         var result = confirm(id+'님의 영구정지를 해제 하시겠습니까?');
         
         if(result){
            $.ajax({
               type: 'get',
               url: '/market/admin/memberReleaseBtn',
               data: {'id':id},
               success: function(){
                  alert('계정을 복구했습니다.');
               },
               error: function(err){
                  alert(id+'님의 계정을 복구 했습니다.');
                  location.reload();
               }
            });
         }else{
            
         }
      });
   
}


//상세정보에 나타나는 부분
function showMember(data){
   $('#nameSpan').text(data.adminMembersDTO.mem_name)
   $('#HpSpan').text(data.adminMembersDTO.mem_tel)
   $('#enabledSpan').text(data.adminMembersDTO.enabled)
   $('#add1Span').text(data.adminMembersDTO.mem_add1)
   $('#add2Span').text(data.adminMembersDTO.mem_add2)
   $('#store1NameSpan').text(data.adminMembersDTO.store_nickname)
   $('#store2NameSpan').text(data.adminMembersDTO.store_nickname)
   $('#echo1Span').text(data.adminMembersDTO.store_echo)
   $('#echo2Span').text(data.adminMembersDTO.store_echo)
   $('#emailSpan').text(data.adminMembersDTO.mem_email)
   $('#logSpan').text(data.adminMembersDTO.mem_logtime)
   $('#productSellSpan').text(data.totalSellProduct)
};





 (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

   
 