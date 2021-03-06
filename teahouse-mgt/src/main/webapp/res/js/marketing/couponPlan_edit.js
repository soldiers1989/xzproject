define([],function() {
var couponPlanEdit = {
		appPath : getPath("app"),
		imgPath : getPath("img"),
		init : function() {
			//新增提交
			$("#editCouponPlan").click(function(){
				couponPlanEdit.savecouponPlan();
			});
			//新增页面的关闭
			$("#closeEditCouponPlan").click(function(){
				closeTab("新增优惠券方案");
			});
			
			//上传图片
			$("#editCouponPlanPicUrlButton").click(function(){
				$("#couponPlanPicUrlEditModal").modal("show");
			});
			
			//新增图片回填
			$("#editCouponPlanPicBtn").click(function(){
				var img=form.find("input[name=couponPlanPicUrl1]").val();
				if(img!=""){
					var form1=$("form[name=couponPlanEditFrom]");
					form1.find("input[name=photoUrl]").val(img);
					form1.find("img[name=couponPlanPicUrlImg]").attr("src",couponPlanEdit.imgPath+"/"+img);
					$("#couponPlanPicUrlEditModal").modal("hide");
				}else{
					bootbox.alert("请上传图片！");
				}
			});
			
			//联动
			var form = $("form[name=couponPlanEditFrom]");
			form.find("select[name='couponMethod']").change(function(){
				
				if(form.find("select[name='couponMethod']").val() == 1){
					 form.find(".couponMethod-1").show(); 
					 form.find(".couponMethod-2").hide(); 
					 form.find(".couponMethod-3").hide(); 
					 form.find(".couponMethod-4").hide(); 
					 form.find("input[name=discountAmount]").val("");
					 form.find("input[name=discountMaxAmount]").val("");
				}else if(form.find("select[name='couponMethod']").val() == 2){
					 form.find(".couponMethod-1").hide(); 
					 form.find(".couponMethod-3").hide(); 
					 form.find(".couponMethod-4").hide(); 
					 form.find(".couponMethod-2").show(); 
					 form.find("input[name=discount]").val("");
					 form.find("input[name=consumeAmount]").val("");
				}else if(form.find("select[name='couponMethod']").val() == 3){
					 form.find(".couponMethod-1").hide(); 
					 form.find(".couponMethod-2").hide(); 
					// form.find(".couponMethod-4").hide(); 
					 //form.find(".couponMethod-3").show(); 
					 form.find("input[name=freeFitnessTime]").val("");
				}else if(form.find("select[name='couponMethod']").val() == 4){
					 form.find(".couponMethod-1").hide(); 
					 form.find(".couponMethod-2").hide(); 
					 //form.find(".couponMethod-3").hide(); 
					 //form.find(".couponMethod-4").show();
					 form.find("input[name=freeCourseNumber]").val("");
				}
		    });
			
			form.find("input[name='availableTime']").click(function(){
				
				if(form.find("input[name='availableTime']:checked").val() == 1){
					 form.find(".availableTime-1").show(); 
					 form.find(".availableTime-2").hide(); 
					 form.find("input[name=vailableTime1]").val("")
					 form.find("input[name=vailableTime2]").val("")
				}else{
					 form.find(".availableTime-1").hide(); 
					 form.find(".availableTime-2").show(); 
					 form.find("input[name=availableDays]").val("")
				}
		    });
			
			form.find("input[name='isLimit']").change(function(){
				var a = form.find("input[name='isLimit']:checked").val();
				if(form.find("input[name='isLimit']:checked").val() == 1){
					form.find("input[name=maxQuantity]").val("");
					form.find("input[name=maxQuantity]").hide();
				}else if(form.find("input[name='isLimit']:checked").val() == 2){
					form.find("input[name=maxQuantity]").val("")
					form.find("input[name=maxQuantity]").show();  
				}
		    });
			
			//隐藏弹出层
			$("#couponPlanModal_edit").on("hidden.bs.modal", function() {  
				
            });
			
			//城市列表
			$("#couponPlanModal_edit_Btn").click(function(){
				couponPlanEdit.pageListModel();
				$("#couponPlanModal_edit").modal({
					 show:true,
					 backdrop:'static'
				});
			});
			
			couponPlanEdit.setDataTemp(couponPlanEdit.getSelectedData());//进入修改页面，需要设置缓存区默认值
		},
		savecouponPlan:function() {
			var form = $("form[name=couponPlanEditFrom]");
			form.ajaxSubmit({
				url : couponPlanEdit.appPath + "/couponPlan/updateForBusiness.do",
				type : "post",
				success : function(res) {
					var msg = res.msg;
					var code = res.code;
					if (code == "1") {
						bootbox.alert("<img src='res/img/tan.png' style='width: 29px;height: 29px;margin-top: -4px'>&nbsp;&nbsp;" + "优惠券方案编辑成功", function() {
							closeTab("新增优惠券方案");
							$("#couponPlanList").DataTable().ajax.reload(function(){});
						});
					} else {
						bootbox.alert("<img src='res/img/tan.png' style='width: 29px;height: 29px;margin-top: -4px'>&nbsp;&nbsp;" + "优惠券方案编辑失败！");
					}
			},
			beforeSubmit : function(formData, jqForm, options) {// 提交表单前数据验证
				$("span[name='titleEdit']").empty();
				$("span[name='discountAmountEdit']").empty();
				$("span[name='discountEdit']").empty();
//				$("span[name='discountMaxAmountEdit']").empty();
				$("span[name='consumeAmountEdit']").empty();
				$("span[name='availableDaysEdit']").empty();
				$("span[name='vailableTime1Edit']").empty();
				$("span[name='vailableTime2Edit']").empty();
				$("span[name='cityNameEdit']").empty();
				$("span[name='maxQuantityEdit']").empty();
				$("span[name='freeFitnessTimeEdit']").empty();
				$("span[name='freeCourseNumberEdit']").empty();
				var form = $("form[name=couponPlanEditFrom]");

				
				
				if ($("#titleId").val()=="") {
					$("span[name='titleEdit']").append("<font color='red'>请输入标题！</font>");
					return false;
				}
				
				if (form.find("select[name='couponMethod']").val() == 2) {
					if(form.find("input[name='discountAmount']").val() == null || form.find("input[name='discountAmount']").val() == ""){
		            	$("span[name='discountAmountEdit']").append("<font color='red'>直减额不能为空！</font>");
						return false;
					}
					if(!/^[0-9]+(.[0-9]{1,2})?$/.test(form.find("input[name='discountAmount']").val()) && form.find("input[name='discountAmount']").val() <= 0){
		            	$("span[name='discountAmountEdit']").append("<font color='red'>直减额只能输入大于0且小数位最多为两位的正数！</font>");
						return false;
					}
					if (form.find("input[name='consumeAmount']").val()==""){
						$("span[name='consumeAmountEdit']").append("<font color='red'>请输入满减金额！</font>");
						return false;
					}
				}else if(form.find("select[name='couponMethod']").val() == 1){
					if(form.find("input[name='discount']").val() == null || form.find("input[name='discount']").val() == ""){
		            	$("span[name='discountEdit']").append("<font color='red'>折扣率不能为空！</font>");
						return false;
					}
					if(!/^([01](\.0+)?|0\.[0-9]{0,2})$/.test(form.find("input[name='discount']").val())){
						$("span[name='discountEdit']").append("<font color='red'>折扣率只能输入0~1之间且小数位最多为两位的数！</font>");
						return false;
					}
					
					/*if (form.find("input[name='discountMaxAmount']").val()==""){
						$("span[name='discountMaxAmountEdit']").append("<font color='red'>请输入封顶金额！</font>");
						return false;
					}
					if (form.find("input[name='discountMaxAmount']").val()!=""&&!/^[0-9]+(.[0-9]{1,2})?$/.test(form.find("input[name='discountMaxAmount']").val())) {
						$("span[name='discountMaxAmountEdit']").append("<font color='red'>封顶金额输入有误(正数或小数后两位)！</font>");
						return false;
					}*/
				}
				
				
				if (form.find("input[name='consumeAmount']").val()!=""&&!/^[0-9]+(.[0-9]{1,2})?$/.test(form.find("input[name='consumeAmount']").val())) {
					$("span[name='consumeAmountEdit']").append("<font color='red'>满减金额只能输入小数位最多为两位的正数！</font>");
					return false;
				}
				if (form.find("input[name='cityId']").val()==""){
					$("span[name='cityNameEdit']").append("<font color='red'>请选择城市！</font>");
					return false;
				}
				if(form.find("input[name='isLimit']:checked").val() == 2){
					if (form.find("input[name='maxQuantity']").val()==""){
						$("span[name='maxQuantityEdit']").append("<font color='red'>请输入优惠卷方案发放数量！</font>");
						return false;
					}
					if(form.find("input[name='maxQuantity']").val() != null && form.find("input[name='maxQuantity']").val() != ""){
						if(!/^[0-9]*[1-9][0-9]*$/.test(form.find("input[name='maxQuantity']").val())){
							$("span[name='maxQuantityEdit']").append("<font color='red'>优惠券限制数量只能为正整数！</font>");
							return false;
						}
					}
				}
				if(form.find("input[name='availableTime']:checked").val() == 1){
					if (form.find("input[name='availableDays']").val()==""){
						$("span[name='availableDaysEdit']").append("<font color='red'>请输入有效天数！</font>");
						return false;
					}
					if (!/^\+?[1-9][0-9]*$/.test(form.find("input[name='availableDays']").val())) {
						$("span[name='availableDaysEdit']").append("<font color='red'>有效天数必须为正整数！</font>");
						return false;
					}
				}else{
					if (form.find("input[name='availableTime1']").val()=="" || form.find("input[name='availableTime1']").val()==null) {
						$("span[name='vailableTime1Edit']").append("<font color='red'>有效开始日期不为空！</font>");
						return false;
					}
					if (form.find("input[name='availableTime2']").val()=="" || form.find("input[name='availableTime2']").val()==null) {
						$("span[name='vailableTime2Edit']").append("<font color='red'>有效结束日期不为空！</font>");
						return false;
					}
					if(new Date(form.find("input[name='availableTime1']").val())>new Date(form.find("input[name='availableTime2']").val())){
						$("span[name='vailableTime1Edit']").append("<font color='red'>有效期开始日期不能大于结束日期！</font>");
						return false;
					}
				}
				
				//健身时长
				/*if(form.find("select[name='couponMethod']").val() == 3){
					if (form.find("input[name='freeFitnessTime']").val()=="" || form.find("input[name='freeFitnessTime']").val()==null) {
						$("span[name='freeFitnessTimeEdit']").append("<font color='red'>健身时长不能为空！</font>");
						return false;
					}
					if(!/^[1-9]\d*$/.test(form.find("input[name='freeFitnessTime']").val())){
						$("span[name='freeFitnessTimeEdit']").append("<font color='red'>健身时长必须为大于0的正整数！</font>");
						return false;
					}
				}*/
				//体验课程节数
				/*if(form.find("select[name='couponMethod']").val() == 4){
					if (form.find("input[name='freeCourseNumber']").val()=="" || form.find("input[name='freeCourseNumber']").val()==null) {
						$("span[name='freeCourseNumberEdit']").append("<font color='red'>课程节数不能为空！</font>");
						return false;
					}
					if(!/^[1-9]\d*$/.test(form.find("input[name='freeCourseNumber']").val())){
						$("span[name='freeCourseNumberEdit']").append("<font color='red'>体验课程节数必须为大于0的正整数！</font>");
						return false;
					}
				}*/
			}
			});
		},pageListModel:function () {
			var tpl = $("#couponPlanTpl_edit").html();
			// 预编译模板
			var template = Handlebars.compile(tpl);
			$('#couponPlanList_edit').dataTable( {
				destroy: true,
				"ajax": {
					"type": "POST",
					"url": couponPlanEdit.appPath+'/dataDictItem/dataDictItemPageList.do?dataDictCatCode=CITY',
					"data": function ( d ) {
						return $.extend( {}, d, {
							"pageNo": (d.start/d.length)+1,
							"pageSize":d.length,
							"keyword":d.search.value
						} );
					},
					"dataSrc": function ( json ) {
						json.recordsTotal=json.rowCount;
						json.recordsFiltered=json.rowCount;
						json.data=json.data;
						return json.data;
					},
					error: function (xhr, error, thrown) {  
		            }
				},
			   "columns": [
			               { "title":"","data": "dataDictItemId","width":"20%"},
			   			   { "title":"城市","data": "itemValue","width":"80%"}
			    ],
			   "dom": "<'row'<'#couponPlanTool_edit.col-xs-6'><'col-xs-6'f>r>" +"t" +"<'row'<'col-xs-3'l><'col-xs-3'i><'col-xs-6'p>>",
			   initComplete: function () {
				   	$(this).find("thead tr th:first-child").prepend('');
					$("#couponPlanTool_edit").append('<button type="button"  class="btn btn-default btn-sm memberPush-batch-sel">确认</button>');
					$("#couponPlanTool_edit").append('<button type="button"  class="btn btn-default btn-sm memberPush-batch-close">关闭</button>');
					$(".memberPush-batch-sel").on("click",function(){
						couponPlanEdit.setSelectedData();
						$("#couponPlanModal_edit").modal("hide");
						$('#couponPlanList_edit tbody input[type="checkbox"]:checked').prop("checked",false);
					});
					$(".memberPush-batch-close").on("click",function(){
						couponPlanEdit.setDataTemp(couponPlanEdit.getSelectedData());//如果取消时，则需要把缓存区的数据变为与已确认的一致
						$("#couponPlanModal_edit").modal("hide");
					});
				},
				"drawCallback": function( settings ) {
					couponPlanEdit.modalCallback()
			    },
				"columnDefs":[{
						"targets" : [0],
						"orderable":false,
						"render" : function(data, type, full, meta) {
							var nameValue = '';
							if(full.itemValue != null){
								nameValue = '" nameValue="' + full.itemValue +'" ';
							}
							var text = '<input type="checkbox"  name="idNo" value="' + full.dataDictItemId + '" '+ nameValue;
							var data = couponPlanEdit.getDataTemp();
							for(var i = 0; i < data.length;i ++){
								if(data[i].id == full.dataDictItemId){
									text += ' checked="checked" '
									break;
								}
							}
							return text +' >';
						}
					}
				 ]
			});
		},getSelectedData:function () {//得到已经确认选择的数据
			var data = [];
			var form = $("form[name=couponPlanEditFrom]");
			var id = form.find("input[name='cityId']").val()
			var name =  form.find("input[name='cityName']").val();
			
			if(id != null && id != "" && name != null && name != ""){
				var ids = id.split(",");
				var names = name.split(",");
				for(var i = 0; i < ids.length;i ++){
					var object = new Object;
					object.id = ids[i];
					object.name = names[i];
					data.push(object);
				}
			}
			
			return data;
		},setSelectedData:function () {
			var data = couponPlanEdit.getDataTemp();//获取缓存区的数据
			var form = $("form[name=couponPlanEditFrom]");
			if(data != null && data.length > 0){
				var idsString = "";
				var nameString = "";
				for(var i = 0; i < data.length;i ++){
					idsString += data[i].id + ",";
					nameString += data[i].name + ",";
				}
				idsString = idsString.substring(0,idsString.length-1);
				nameString = nameString.substring(0,nameString.length-1);
				
				form.find("input[name='cityId']").val(idsString);
				form.find("input[name='cityName']").val(nameString);
			}else{
				form.find("input[name='cityId']").val("");
				form.find("input[name='cityName']").val("");
			}
		},getDataTemp:function () {//得到缓存区的数据
			var jsonString = $("#couponPlanModal_edit").find("input[name='dataTemp']").val();
			if(jsonString != null  && jsonString != ""){
				return JSON.parse(jsonString);
			}
			return [];
		},setDataTemp:function (data) {//设置缓存区的数据
			var input = $("#couponPlanModal_edit").find("input[name='dataTemp']");
			if(input != null){
				if(data != null && data.length > 0){
					input.val(JSON.stringify(data));
				}else{
					input.val("");//传入的data为空时清除缓存区的数据
				}
			}
		},modalCallback:function () {
			$("input[name=idNo]").click(function(a,b,c,d){
				var data = couponPlanEdit.getDataTemp();//获取缓存区的数据
				if(data == null){
					data = [];
				}
				
				var newData = [];
				if($(this).is(':checked')){
					newData = data;
					var thisData = new Object;
					thisData.id = $(this).val();
					thisData.name = $(this).attr('nameValue') == null ? "" : $(this).attr('nameValue');
					newData.push(thisData)
				}else{
					if(data.length > 0){
						for(var i = 0; i < data.length;i ++){
							if(data[i].id != $(this).val()){
								newData.push(data[i])
							}
						}
					}
				}
				couponPlanEdit.setDataTemp(newData);
			});
		}
	}
	return couponPlanEdit;
})
