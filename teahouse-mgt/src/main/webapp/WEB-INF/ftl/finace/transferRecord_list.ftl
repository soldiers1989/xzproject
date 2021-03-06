<meta charset="utf-8">
<style>
@media only screen and (max-width:992px) {
.pull-down-menu input, .pull-down-menu select {
    width: 30%;
}
.frombg .form-control{
	width:45% !important;
	margin-right:20%;
}
.pull-down-menu span {
    width: 20%;
}
}
@media only screen and (max-width:768px) {
.row .sorting_disabled{
font-size:1.1rem !important;
}
}
@media only screen and (min-width:768px) and (max-width:1024px) {
.row .sorting_disabled{
font-size:1.2rem !important;
}
}
@media only screen and (min-width:1024px) and (max-width:1366px) {
.row .sorting_disabled{
font-size:1.3rem !important;
}
}
.other{
margin:0 !important;
padding:0 !important;
}
table{
border:1px solid rgba(127,127,127,0.05);
}
</style>
  <div class="container-fluid">
   <div class="row">
    <div class="col-md-12 pd10">
        <h4 class="box-title">查询</h4>
               <div class="box-tools pull-right">
          <button type="button" class="btn btn-box-tool more">
              更多<img src="res/img/arrow-down.png" width="15" style="margin-left: 2px;"/>
          </button>
       </div><!-- /.box-tools -->
     <div class="box box-default">
         <form name="transferRecordSearchForm">
      <div class="with-border">

          <div class="row pull-down-menu col-md-11" style="margin-left: 1px; background: #f1f5f8;">
              <div class="col-md-3">
                  <div class="frombg">
                      <span>客户手机</span><input class="form-control" name="mobilePhone" placeholder="">
                  </div>
              </div>
              <div class="col-md-3">
                  <div class="frombg">
                      <span>审核状态</span><select class="form-control" name="cencorStatus">
                      <option value="">全部</option>
                      <option value="0">未审核</option>
                      <option value="1">已通过</option>
                      <option value="2">未通过</option>
                  </select>
                  </div>
              </div>
              <div class="col-md-3">
			    <div class="frombg">
                    <span>提现状态</span><select class="form-control" name="transferStatus">
	                     <option value="">全部</option>
	                     <option value="0">未提现</option>
	                     <option value="1">已提现</option>
	                     <option value="2">提现失败</option>
	                     <option value="3">用户取消</option>
	                     <option value="4">后台取消</option>
                   </select>
                </div>
			 </div>
			 <div class="col-md-3">
                    <div class="frombg">
                        <span>流水号</span><input class="form-control" name="flowNo" placeholder="">
                    </div>
              </div>
          </div>
      </div><!-- /.box-header -->

       <div class="box-body">
           <div class="row pull-down-menu col-md-11 other searching">
              <div class="col-md-3">
                  <div class="frombg">
                      <span>申请时间</span><input class="datepicker form-control" name="applyTime1"  placeholder=""/></div>
              </div>

              <div class="col-md-3">
                  <div class="frombg">
                      <span>至</span><input class="datepicker form-control" name="applyTime2"  placeholder=""/>
                  </div>
              </div>
               <div class="col-md-3">
                   <div class="frombg">
                       <span>转账时间</span><input class="datepicker form-control" name="transferTimeStart"  placeholder=""/>
                   </div>
               </div>
               <div class="col-md-3">
                   <div class="frombg">
                       <span>至</span><input class="datepicker form-control" name="transferTimeEnd"  placeholder=""/>
                   </div>
               </div>
              <!--  <div class="col-md-3">
                   <div class="frombg">
                       <span>退款方式</span>
                       <select class="form-control" name="transferMethod">
                           <option value="">全部</option>
                           <option value="1">支付宝</option>
                           <option value="2">微信</option>
                       </select>
                   </div>
               </div> -->
		</div>

        </div><!-- /.box-body -->
     <!--修改-->

             <script>
                 $(".other").hide();
                 $(document).ready(function(){
                     var state = 0; //hide
                     $(".more").click(function(){
                         if (state == 0){
                             $(".other").show();

                             $(this).html('收起<img src="res/img/arrow-up.png" width="15" style="margin-left: 2px;"/>');
                             state = 1;
                         } else {
                             $(".other").hide();
                             $(this).html('更多<img src="res/img/arrow-down.png" width="15" style="margin-left: 2px;"/>');
                             state = 0;
                         }
                     })
                 })
             </script>
         <div class="col-md-12" style='float:left'>
                <div class="box-footer">
                    <!-- <button type="reset" class="btn btn-default pull-right btn-flat flatten btncolorb"><i class="hziconfont icons-qingchu iconbtn"></i>清空</button>-->

                     <!--<button type="button" class="btn btn-default pull-right btn-flat btncolora" id="transferRecordSearch"><i class="hziconfont icons-yuanxingxuanzhong iconbtn"></i>确认</button>-->

                       <button type="button" class="btn btn-default pull-right btn-flat flatten btnColorA" id="transferRecordSearch" style="background:#2b94fd;margin-right:-2px !important">确定</button>
                       <button type="reset" class="btn btn-default pull-right btn-flat flatten btnDefault"  style="background:#fa6e30;float:right;margin-right:20px !important">清空</button>
                </div><!-- /.box-footer -->
          </div>
         </form>
       </div><!-- /.box -->
      </div><!-- /.col -->
     </div><!-- /.row -->
      <div class="row" style="width: 100%; height: 15px; background: #f1f5f8"></div>
      <div class="row">
       <div class="col-xs-12">
       <!--定义操作列按钮模板-->
       <script id="transferRecordBtnTpl" type="text/x-handlebars-template">
        {{#each func}}
        <button type="button" class="btn btn-{{this.type}} btn-sm" onclick="{{this.fn}}">{{this.name}}</button>
  		{{/each}}
       </script>
       <div class="box">
        <div class="box-body">
         <table id="transferRecordList" class="table table-hover" width="100%" border="1">
         </table>
        </div><!-- /.box-body -->
       </div><!-- /.box -->   
      </div><!-- /.col -->
     </div><!-- /.row -->
    </div><!-- /.container-fluid -->
    
    <div class="modal fade" id="transferRecordCancelModel">
	<div class="modal-dialog">
	    <div class="modal-content">
	        <div class="modal-header">
	            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	            <h4 class="modal-title">取消</h4>
	        </div>
	        <div class="modal-body">
				<form class="form-horizontal" name="transferRecordCancelForm"> 
		  			<input type="hidden"  name="transferNo" id="transferNo">
		    		<label for="inputEmail3" class=" control-label wen" id="transferRecordMemo"></label>
					<div>
		        		<label for="inputEmail3" class=" control-label reason">取消原因:</label>
		      		</div>
					<div class="form-group">
		            	<div class="col-sm-8">
		                	<textarea class="form-control textareas" name="cancelReason"></textarea>
		            	</div>
		            </div>
			       	<div class="modal-footer">
	                    <input type="button" class="btn btn-default pull-right sure" id="transferRecordCancel_btn" value="确定">
	                    <button type="button" class="btn btn-default pull-right cancels" id="transferRecordCancel_cancelBtn">取消</button>
	                </div>              
				</form> 
	         </div>
	     </div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
    
    
    
    <script type="text/javascript">
    $(function(){
	  require.config({paths: {"transferRecord":"res/js/finace/transferRecord_list"}});
		require(["transferRecord"], function (transferRecord){
			transferRecord.init();
		});  
	});
    $(function () {
        $(".datepicker").datepicker({
            language: "zh-CN",
            autoclose: true,//选中之后自动隐藏日期选择框
            clearBtn: true,//清除按钮
            todayBtn: "linked",//今日按钮
            format: "yyyy-mm-dd"//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
        });
    });
</script>
