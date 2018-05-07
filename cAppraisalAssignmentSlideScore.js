/*#########################  Main Function Data #######################*/
//var tokenID= eval("("+localStorage.getItem("tokenID")+")");
//Global variable
var globalData=[];
var galbalDataTemp=[];
var empldoyees_code = [];
var organization_code = [];
var empldoyees_id = [];
var position_id = [];
var org_id_to_assign;
var item_id_array=[];
var emailLinkAssignment = false;



//var is_hr = 0;
var clearFn = function(){
	$(':input')
	  .not(':button, :submit, :reset, :hidden')
	  .val('')
	  .removeAttr('checked')
	  .removeAttr('selected');
	  $(".checkWeigthOver").html("");
	  $(".grandTotalWeight").html("");
	  $("#information").html("");
}
var stripJsonToString= function(json){
    return JSON.stringify(json).replace(',', ', ').replace('[', '').replace(']', '');
}

var validationAssignmentFn = function(data){

	var errorData="";
	var count=0;
	errorData=stripJsonToString(data['data']);
	
//$.each(data['data'],function(index,indexEntry){	
//		if(index==0){
//		
//			errorData+="<b>"+indexEntry['item_id']+" ";
//			errorData+=indexEntry['item_name']+"</b> ";
//			
//			$.each(indexEntry['data'],function(index2,indexEntry2){
//				//errorData+=" "+index2;
//				errorData+=" "+indexEntry2;
//			});
//
//		}
//		
//		else{
//			errorData+="<br><b>"+indexEntry['item_id']+"-";
//			errorData+=indexEntry['item_name']+"</b> ";
//			
//			$.each(indexEntry['data'],function(index2,indexEntry2){
//				//errorData+=" "+index2;
//				errorData+=" "+indexEntry2;
//			});
//		}

//});
	
	return errorData;
	
}


//Click à¹�à¸¥à¹‰à¸§ à¸�à¸±à¸‡à¸‚à¹‰à¸­à¸¡à¸¹à¸¥
var removeEmbedParamCheckboxAppraisalItem = function(id){
	var id = id.split("-"); 
	var appraisal_id=id[1];
	var structure_id=id[2];
	$("#embed_appraisal_id-"+appraisal_id+"-"+structure_id).remove();
}
var embedParamCheckboxAppraisalItem = function(id){
	
	//id-1-1-checkbox
	var id = id.split("-"); 
	var appraisal_id=id[1];
	var structure_id=id[2];
	var count = 0;
	$.each($(".embed_appraisal_id-"+structure_id).get(),function(index,indexEnry){
	//à¸–à¹‰à¸² id à¸—à¸µà¹ˆà¸§à¸™ == id à¸—à¸µà¹ˆà¸¡à¸µ	
		//console.log($(indexEnry).val());
		if($(indexEnry).val()==appraisal_id){
			count+=1;
		}
	});
	
	if(count>0){
		
		$("#embed_appraisal_id-"+appraisal_id+"-"+structure_id).remove();
		$("body").append("<input type='hidden' class='embed_appraisal_id-"+structure_id+" embed_appraisal_id' id='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' name='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' value='"+appraisal_id+"'>");
	}else{
		
		$("body").append("<input type='hidden' class='embed_appraisal_id-"+structure_id+" embed_appraisal_id' id='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' name='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' value='"+appraisal_id+"'>");
	}
}
var setDataToTemplateFn = function(data,actionType){
	var stage = data['stage'];
	var head = data['head'][0]
	var data = data['data'];
	
	/*
	 
	employee_code
	section
	appraisal_type
	employee_name
	department
	period
	start_working_date
	chief_employee_code
	position
	chief_employee_name
	
	
	
	appraisal_period_desc
	appraisal_type_name
	chief_emp_id
	chief_emp_name
	department_name
	emp_id
	emp_name
	position_name
	section_name
	stage_id
	status
	working_start_date
	 */
	/*information start*/
	galbalDataTemp['cds_result_emp_id'] = notNullTextFn(head['emp_id']);
	galbalDataTemp['cds_result_org_id'] = notNullTextFn(head['org_id']);
	galbalDataTemp['cds_result_position_id'] = notNullTextFn(head['position_id']);
	if($("#embed_appraisal_type_id").val()==2){
		$("#titlePanelInformation").html("Employee Information");
		
		$("#employee_code").html(head['emp_code']);
		$("#section").html(head['section_name']);
		$("#appraisal_type").html(head['appraisal_type_name']);
		$("#employee_name").html(head['emp_name']);
		$("#organizationLabel").html(head['org_name']);
		$("#period_label").html(head['appraisal_period_desc']);
		$("#start_working_date").html(head['working_start_date']);
		$("#chief_employee_code").html(head['chief_emp_code']);
		$("#position").html(head['position_name']);
		$("#chief_employee_name").html(head['chief_emp_name']);
		$("#start_working_date").html(head['working_start_date']);
		
		
		$("#empInformation").show();
		$("#orgInformation").hide();
	}else{
		$("#empInformation").hide();
		$("#orgInformation").show();
		$("#titlePanelInformation").html("Organization Information");
		
		$("#organizationCodeLabelOrg").html(head['org_code']);
		$("#organizationNameLabelOrg").html(head['org_name']);
		$("#parentOrganizationOrg").html(head['parent_org_name']);
		$("#periodOrg").html(head['appraisal_period_desc']);
	}
	
	//Stage History List Data..

	var htmlStage="";
	$.each(stage,function(index,indexEntry){
	
		htmlStage+="<tr >";
			htmlStage+="<td>"+indexEntry['created_by']+"</td>";
			htmlStage+="<td>"+indexEntry['created_dttm']+"</td>";
			htmlStage+="<td>"+indexEntry['from_action']+"</td>";
			htmlStage+="<td>"+indexEntry['to_action']+"</td>";
			htmlStage+="<td>"+notNullTextFn(indexEntry['remark'])+"</td>";
		htmlStage+="</tr>";

	});
	$("#listDataStageHistory").html(htmlStage);
	$("#slideUpDownStageHistory").show();
	

	
	//Stage History List Data..
	
	/*information end*/
	
	
	
	//get data assignTo and action for edit start
	/*
	dropDrowAsignToEditFn(head['stage_id']);
	$("#assignTo").off('change');
	$("#assignTo").on('change',function(){
		dropDrowActionEditFn(head['stage_id'],$(this).val());
	});
	
	$("#assignTo").change();
	*/
	//dropDrowActionEditFn(head['stage_id']);
	dropDrowActionEditFn(head['stage_id'],head['emp_code'],head['org_code']);
	
	//set premission button management start
	//alert(head['stage_id']);
	if(head['status']=='Accepted' || actionType=='view'){
//		$(".btnAssignment").hide();
//		$("#btnSubmit").hide();
		$("#ModalAssignment").find('input[type="text"]').attr('disabled', 'disabled');
		$("#ModalAssignment").find('input[type="checkbox"]').attr('disabled', 'disabled');
		$("#ModalAssignment").find('#remark_footer').removeAttr('disabled');
	}else{
//		$(".btnAssignment").show();
//		$("#btnSubmit").show();
		
		//Check TEXT Disabled Start
		if($("#ModalAssignment").find('input[class="disabledInputText"]')){
		}else{
			$("#ModalAssignment").find('input[type="text"]').removeAttr('disabled'); 
		}
		//Check TEXT Disabled End

		$("#ModalAssignment").find('input[type="checkbox"]').removeAttr('disabled'); 
		
//		if(sessionStorage.getItem("is_coporate_kpi")==1){
//			//total_weigth_quantity
//			$(".total_weigth_quantity").prop("disabled",true);
//		}else{
//			$(".total_weigth_quantity").removeAttr('disabled'); 
//		}
	}
	
	
	
	//set premission button management end		
	
	
	
	
	
//	dropDrowAsignToFn();
//	$("#assignTo").off("change");
//	$("#assignTo").change(function(){
//		//alert($(this).val());
//		dropDrowActionFn($(this).val());
//		
//	});
//	$("#assignTo").change();
	
	
/*
actual_value
item_id
item_name
item_result_id
created_by
created_dttm
deduct_score_unit
emp_id
emp_result_id
max_value
over_value
period_id
score0: '',
score1: '',
score2: '',
score3: '',        
score4: '',          
score5: '', 
target_value
updated_by
updated_dttm
weigh_score
weight_percent



nof_target_score: '',  
form_id: '',      
item_id: '',
item_name: '',
target_value: '',
kpi_type_id: '',
score0: '',
score1: '',
score2: '',
score3: '',        
score4: '',          
score5: '',            
forecast_value: '',                                                   
weight_percent: '',   

*/
	$(".cus_information_area").show();
	$(".embed_appraisal_id").remove();
	$.each(data,function(index,indexEntry){
		
		//console.log(indexEntry['item_id']);
		//mapping data start
		//form1
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox").prop("checked",true);
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target").val(addCommas(indexEntry['target_value']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id").val(indexEntry['item_result_id']);
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-actualValue").val(addCommas(notNullFn(indexEntry['actual_value'])));
		//$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast").val(addCommas(indexEntry['forecast_value']));

		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score0").val(addCommas(indexEntry['score0']));	
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score1").val(addCommas(indexEntry['score1']));	
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score2").val(addCommas(indexEntry['score2']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score3").val(addCommas(indexEntry['score3']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score4").val(addCommas(indexEntry['score4']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score5").val(addCommas(indexEntry['score5']));

		
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-weight").val(addCommas(indexEntry['weight_percent']));
		
		//form2
		
		//form3
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-maxValue").val(addCommas(indexEntry['max_value']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-deductScoreUnit").val(indexEntry['deduct_score_unit']);
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-valueGetZero").val(indexEntry['value_get_zero']==null ? "" :indexEntry['value_get_zero']);
		
		//embedParamAppraisal for get updated.
		
		embedParamCheckboxAppraisalItem("id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox");
		//mapping data end
		
		calculationGrandTotalDefaultFn();
		
	});
	
	$.each(data,function(index,indexEntry){
	
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-valueGetZero").val(indexEntry['value_get_zero']==null ? "" :indexEntry['value_get_zero']);

		
	});
//	if(actionType=='view'){
//	alert("view 1");	
//		$(".btnAssignment").hide();
//		$("#btnSubmit").hide();
//		$("#ModalAssignment").find('input[type="text"]').attr('disabled', 'disabled'); 
//		$("#ModalAssignment").find('input[type="checkbox"]').attr('disabled', 'disabled'); 
//	}else if(actionType=='edit'){
//	alert("view 2");
//		$(".btnAssignment").show();
//		$("#btnSubmit").show();
//		$("#ModalAssignment").find('input[type="text"]').removeAttr('disabled'); 
//		$("#ModalAssignment").find('input[type="checkbox"]').removeAttr('disabled');
//	
//	}
	
}

var findOneFn = function(id,actionType){
	//alert(id);
	//console.log(id)
	
	
	//get structure
	getTemplateFn(id);
	
	
	//get data for structureี
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data['head'].length);
			if(emailLinkAssignment==true) {
				url_period_id = data['head'][0]['period_id'];
				$("#period_id_edit").val(url_period_id);
			}
			
			if(data['head'].length>0){
				setDataToTemplateFn(data,actionType);
				$("#ModalAssignment").modal({
					"backdrop" : setModalPopup[0],
					"keyboard" : setModalPopup[1]
				});
				$("#action").val("edit");
				$("#id").val(id);
				$("#btnAddAnother").hide();
				
				if(data['head'][0]['edit_flag']==0){
					
//					$("#btnSubmit").attr("disabled","disabled");	
//					$("#btnAddAnother").attr("disabled","disabled");
					
					if(emailLinkAssignment==true) {
						var AssignmentEmailLink = '#AssignmentEmailLink';
					} else {
						var AssignmentEmailLink = '#ModalAssignment';
					}
					
					$(""+AssignmentEmailLink+"").find('input[type="text"]').attr('disabled', 'disabled');
					$(""+AssignmentEmailLink+"").find('input[type="checkbox"]').attr('disabled', 'disabled');
					$(""+AssignmentEmailLink+"").find('#remark_footer').removeAttr('disabled');

				}
				
				if($("#actionAssign").val()==null){
					$("#btnSubmit").attr("disabled","disabled");
				} else {
					$("#btnSubmit").removeAttr("disabled");
				}
				
			}else{
				callFlashSlide("Data is empty.");
				return false;
			}
			
		}
	});
	
	
}

//Get Data
var getDataFn = function(page,rpp) {
	
	var appraisal_level_id_org = $("#embed_appraisal_level_id_org").val();
	var appraisal_level_id_emp = $("#embed_appraisal_level_id_emp").val();
	
	if($("#embed_appraisal_type_id").val()==1) {
		appraisal_level_id_emp = "";
	}
	
	var appraisal_type_id= $("#embed_appraisal_type_id").val();
	var period_id= $("#embed_period_id").val();
	var position_id= $("#embed_position_id").val();
	var emp_id= $("#embed_emp_id").val();
	var embed_year_list =$("#embed_year_list").val();
	var embed_period_frequency =$("#embed_period_frequency").val();
	var embed_organization =$("#embed_organization").val().split("-");
	embed_organization=embed_organization[0];
	
	//console.log(emp_id)
	//console.log(appraisal_level_id,appraisal_type_id,period_id,position_id,emp_id,embed_year_list,embed_period_frequency,embed_organization,embed_organization,embed_organization)
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,
//			"appraisal_year":"",
//			"frequency_id":"",
			"appraisal_level_id":appraisal_level_id_emp,
			"appraisal_level_id_org":appraisal_level_id_org,
			"appraisal_type_id":appraisal_type_id,
			"period_id":period_id,
			"position_id":position_id,
			"appraisal_year":embed_year_list,
			"frequency_id":embed_period_frequency,
			"org_id":embed_organization,
			"emp_code":emp_id	
			
		},
		success:function(data){
			
			//console.log(data);
			
			listDataFn(data);
			setThemeColorFn(tokenID.theme_color);
			globalData=data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
		}
	})
};
//Delete
var deleteFn = function(id) {
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/"+id,
		type:"DELETE",
		dataType:"json",
	  headers:{Authorization:"Bearer "+tokenID.token},
	  success:function(data){ 
		if(data['status']==200){
			
			   callFlashSlide("Delete Successfully.");
			   getDataFn($("#pageNumber").val(),$("#rpp").val());
			   $("#confrimModal").modal('hide');
			   
		}else if(data['status']=="400"){
			
			callFlashSlide(validationFn(data),"error");
			
		}
		}
});
};
//Embed Parameter 
var embedParam = function(id){
	
}

//List Data
var listDataFn = function(data) {



	htmlHTML="";
	$.each(data['group'],function(index,indexEntry){
		//console.log(index);
//	console.log(indexEntry['items']);
//	console.log(indexEntry['appraisal_period_desc']);
	
	htmlHTML+="<div class=\"row-fluid\">";
	htmlHTML+="<div class=\"span12\">";
	htmlHTML+="<div class=\"ibox-title2\">";
	htmlHTML+="<div class=\"titlePanel2\">"+indexEntry['appraisal_period_desc']+" </div> ";
            
	htmlHTML+="</div>";
			
		htmlHTML+="<div class=\"ibox-content\">";
					
					
		htmlHTML+="<div class=\"table-responsive\" style='overflow:auto;'>";
		htmlHTML+="<table id=\"tableListAppraisalUser\" class=\"table table-striped\">";
           		
		htmlHTML+=" <thead>";
			htmlHTML+=" <tr>";
			if(index!='p0'){
				htmlHTML+=" <th style=\"width:5%; text-align:center; \" class=\"object-center\"></th>";
			}else{
				htmlHTML+="<th style=\"width:5%; text-align:center;\" class=\"object-center\">";
				htmlHTML+="<input type=\"checkbox\" name=\"unassignSelectAll\" id=\"unassignSelectAll\" style=\"margin-top:-3px;\">";
				htmlHTML+="</th>";
			}
			
			if($("#embed_appraisal_type_id").val()==2){
				
				htmlHTML+=" <th style=\"width:8%\">Status</th>";
				htmlHTML+=" <th style=\"width:10%\">Emp Code</th>";
				htmlHTML+=" <th style=\"width:10%\">Emp Name</th>";
				htmlHTML+=" <th style=\"width:15%\">Organization</th>";
				htmlHTML+=" <th style=\"width:15%\">Position</th>";
							
			}else if($("#embed_appraisal_type_id").val()==1){
				
				htmlHTML+=" <th style=\"width:8%\">Status</th>";
				htmlHTML+=" <th style=\"width:10%\">Org Code</th>";
				htmlHTML+=" <th style=\"width:15%\">Organization</th>";

				
			}
				
				
				
				
			if(index!='p0'){
				htmlHTML+=" <th style=\"width:7%; text-align:center;\">Manage</th>";
			}else{
				htmlHTML+=" <th style=\"width:7%; text-align:center;\"></th>";
			}
	htmlHTML+=" </tr>";
		htmlHTML+=" </thead>";
			htmlHTML+=" <tbody>";
			$.each(indexEntry['items'],function(index2,itemEntry){	
				
		

				htmlHTML+="<tr>";
				if(index!='p0'){
					htmlHTML+="	<td class='object-center'></td>";
						
				}else{
					
					if($("#embed_appraisal_type_id").val()==2){
						htmlHTML+="	<td class='object-center' style='text-align:center;'><input class='asign_emp' id='id-"+itemEntry['emp_id']+"' type='checkbox' value="+itemEntry['emp_id']+"-"+itemEntry['emp_code']+"-"+itemEntry['org_id']+"-"+itemEntry['period_id']+"-"+itemEntry['default_stage_id']+"-"+"></td>";
					}else if($("#embed_appraisal_type_id").val()==1){
						htmlHTML+="	<td class='object-center' style='text-align:center;'><input class='asign_emp' id='id-"+itemEntry['org_id']+"' type='checkbox' value="+itemEntry['org_id']+"-"+itemEntry['org_id']+"-"+itemEntry['org_id']+"--"+itemEntry['default_stage_id']+"-/"+itemEntry['org_code']+"></td>";
						//alert(itemEntry['org_id']);
					}
				}
				
				
				if($("#embed_appraisal_type_id").val()==2){
					htmlHTML+="  <td id='status-"+itemEntry['emp_id']+"'>"+itemEntry['status']+"";
					htmlHTML+="  <input type='hidden' id='emp_result_id-"+itemEntry['emp_id']+"' name='emp_result_id-"+itemEntry['emp_id']+"' value='"+itemEntry['emp_result_id']+"'>";
					htmlHTML+="  <input type='hidden' id='is_coporate_kpi-"+itemEntry['emp_id']+"' name='is_coporate_kpi-"+itemEntry['emp_id']+"' value='"+itemEntry['is_coporate_kpi']+"'>";
					htmlHTML+="  </td>";
					htmlHTML+="  <td>"+itemEntry['emp_code']+"";
					htmlHTML+="  <input type='hidden' id='period_id-"+itemEntry['emp_id']+"' name='period_id-"+itemEntry['emp_id']+"' value='"+itemEntry['period_id']+"'>";
					htmlHTML+=" </td>";
					htmlHTML+="  <td>"+itemEntry['emp_name']+"</td>";
					htmlHTML+="  <td>"+itemEntry['org_name']+"</td>";
					htmlHTML+="	<td>"+itemEntry['position_name']+"</td>";
				}else{
					
					htmlHTML+="  <td id='status-"+itemEntry['emp_id']+"'>"+itemEntry['status']+"";
					htmlHTML+="  <input type='hidden' id='emp_result_id-"+itemEntry['emp_id']+"' name='emp_result_id-"+itemEntry['emp_id']+"' value='"+itemEntry['emp_result_id']+"'>";
					htmlHTML+="  <input type='hidden' id='is_coporate_kpi-"+itemEntry['emp_id']+"' name='is_coporate_kpi-"+itemEntry['emp_id']+"' value='"+itemEntry['is_coporate_kpi']+"'>";
					htmlHTML+="  </td>";
					htmlHTML+="  <td>"+itemEntry['org_code']+"";
					htmlHTML+="  <input type='hidden' id='period_id-"+itemEntry['emp_id']+"' name='period_id-"+itemEntry['emp_id']+"' value='"+itemEntry['period_id']+"'>";
					htmlHTML+=" </td>";
					
					htmlHTML+="  <td>"+itemEntry['org_name']+"</td>";
					
					
				}
				
				
				
				htmlHTML+="  <td style=\"text-align:center\">";
				
				if(index!='p0'){
					//itemEntry['status']
					if(is_hr==1 &&  itemEntry['status']=='Accepted'){
						//htmlHTML+="  <i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+itemEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;View&lt;/button&gt;   &lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+itemEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+itemEntry['emp_id']+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
						htmlHTML+="  <i data-trigger=\"focus\" tabindex=\""+index2+"\" title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\"  data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+itemEntry['emp_id']+"-"+itemEntry['org_id']+"' data-target=#addModalRule data-toggle='modal'&gt;View\"></i>";
					}else if(is_hr==1 &&  itemEntry['status']!='Accepted'){
						htmlHTML+="  <i data-trigger=\"focus\" tabindex=\""+index2+"\" title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+itemEntry['emp_id']+"-"+itemEntry['org_id']+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+itemEntry['emp_id']+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
					}else if(is_self_assign==1 &&  itemEntry['status']=='Accepted'){
						//htmlHTML+="  <i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+itemEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;View&lt;/button&gt;   &lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+itemEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+itemEntry['emp_id']+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
						htmlHTML+="  <i data-trigger=\"focus\" tabindex=\""+index2+"\" title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\"  data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+itemEntry['emp_id']+"-"+itemEntry['org_id']+"' data-target=#addModalRule data-toggle='modal'&gt;View\"></i>";
					}else if(is_self_assign==1 &&  itemEntry['status']!='Accepted'){
						htmlHTML+="  <i data-trigger=\"focus\" tabindex=\""+index2+"\" title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+itemEntry['emp_id']+"-"+itemEntry['org_id']+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+itemEntry['emp_id']+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
					}else if(is_hr==0 || is_self_assign==0){
						htmlHTML+="  <i data-trigger=\"focus\" tabindex=\""+index2+"\" title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+itemEntry['emp_id']+"-"+itemEntry['org_id']+"' data-target=#addModalRule data-toggle='modal'&gt;View\"></i>";
					}
				}
				
				htmlHTML+="  </td>";
				htmlHTML+="</tr>";
					
			
			});
			htmlHTML+=" </tbody>";
			htmlHTML+="  </table>";
			
			htmlHTML+=" </div>";
			htmlHTML+="</div>";
		htmlHTML+="</div>";
	htmlHTML+="</div>";
		/*
		appraisal_type_name
		department_name
		emp_id
		emp_name
		emp_result_id
		position_name
		section_name
		status
		*/
//		
//		htmlHTML+="<tr>";
//		htmlHTML+="	<td class='object-center'><input class='asign_emp' id='id-"+indexEntry['emp_id']+"' type='checkbox' value="+indexEntry['emp_id']+"></td>";
//		htmlHTML+="  <td id='status-"+indexEntry['emp_id']+"'>"+indexEntry['status']+"";
//		htmlHTML+="  <input type='hidden' id='emp_result_id-"+indexEntry['emp_id']+"' name='emp_result_id-"+indexEntry['emp_id']+"' value='"+indexEntry['emp_result_id']+"'>";
//		htmlHTML+="  </td>";
//		htmlHTML+="  <td>"+indexEntry['emp_id']+"</td>";
//		htmlHTML+="  <td>"+indexEntry['emp_name']+"</td>";
//		htmlHTML+="  <td>"+indexEntry['department_name']+"</td>";
//		htmlHTML+="	<td>"+indexEntry['section_name']+"</td>";
//		htmlHTML+="	<td>"+indexEntry['appraisal_type_name']+"</td>";
//		htmlHTML+="	<td>"+indexEntry['position_name']+"</td>";
//		htmlHTML+="  <td style=\"text-align:center\">";
//		
//		if(is_hr==1){
//			//htmlHTML+="  <i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+indexEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;View&lt;/button&gt;   &lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+indexEntry['emp_id']+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
//			htmlHTML+="  <i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+indexEntry['emp_id']+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
//		}else if(is_hr==0){
//			htmlHTML+="  <i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+indexEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;View&lt;/button&gt;&nbsp;&lt;button id='del-"+indexEntry['emp_id']+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
//		}
//		
//		htmlHTML+="  </td>";
//		htmlHTML+="</tr>";
		
	});
	
	$("#listDatas").html(htmlHTML);
	
	
	$("#unassignSelectAll").click
	
	$('#unassignSelectAll').click(function() {
	   if($('#unassignSelectAll').prop('checked')){
		   $(".asign_emp").prop('checked',true);
	   }else{
		   $(".asign_emp").prop('checked',false);;
	   }
	   
	});
	
	$(".popover-edit-del").popover(setPopoverDisplay);
	$("#listDatas").off("click",".popover-edit-del");
	$("#listDatas").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".del").on("click",function() {
			
			var id=this.id.split("-");
			id=id[1];
			
			var emp_result_id= $(this).parent().parent().parent().parent().children().eq(1).children().val();
			
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				
				deleteFn(emp_result_id);
				
			});
			
		});
		//findOne Start
		$(".edit").on("click",function() {
			
			
			var edit=this.id.split("-");
			var id=edit[1];
			org_id_to_assign = edit[2];
			
			sessionStorage.setItem('is_coporate_kpi',$("#is_coporate_kpi-"+id).val());
			
			$(".information").hide();
			var status= $(this).parent().parent().parent().parent().children().eq(1).text();
			if(status.trim()=="Unassigned"){
				callFlashSlide("Can't edit. because unassigned status.","error");
				$(this).parent().parent().parent().children().click();
			}else{
				//var emp_result_id = $("#emp_result_id-"+id).val();
				var emp_result_id= $(this).parent().parent().parent().parent().children().eq(1).children().val();
				var period_id = $(this).parent().parent().parent().parent().children().eq(2).children().val();
				$("#period_id_edit").val(period_id);
				findOneFn(emp_result_id,"");
				$(this).parent().parent().parent().children().click();
				$(window).scrollTop(0);
				$(".modal-body").scrollTop(0);
				$(".fht-tbody").scrollTop(0);

			}
			$(".scoreText0").attr("disabled","disabled");
		});
		$(".view").on("click",function() {
			var view=this.id.split("-");
			org_id_to_assign = view[2];
//			if($("#status-"+id).text().trim()=="Unassigned"){
//				callFlashSlide("Can't edit. because unassigned status.","error");
//				$(this).parent().parent().parent().children().click();
//			}else{
				//console.log($(this).parent().parent().parent().parent().children().eq(1).children().val());
				var emp_result_id= $(this).parent().parent().parent().parent().children().eq(1).children().val();
				var period_id = $(this).parent().parent().parent().parent().children().eq(2).children().val();
				$("#period_id_edit").val(period_id);
				findOneFn(emp_result_id,"view");
				$(this).parent().parent().parent().children().click();
				$(window).scrollTop(0);
				$(".modal-body").scrollTop(0);
				$(".fht-tbody").scrollTop(0);
			//}
		});
		
	});	
	
};
//Update Assignment start
var actionUpdateAssignmentFn = function(){

	var countAppraisalItem=0;
	var appraisal_items=[];
	var appraisal_item1=[];
	var appraisal_item2=[];
	var appraisal_item3=[];
	


	//loop structure
	
	$.each($(".structure_id").get(),function(index,structureEntry){
		

		if($("#form-"+$(structureEntry).val()).val()=="form1"){

			//$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
			$.each($(".appraisalItem-checkbox-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){

				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				
			
					
					appraisal_items+="\"item_result_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_result_id").val()+"\",";
					appraisal_items+="\"nof_target_score\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-nof_target_score").val()+"\",";
					appraisal_items+="\"kpi_type_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-kpi_type_id").val()+"\",";
					appraisal_items+="\"form_id\":\"1\",";
					appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
					appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text().replace(/[\n\r]/g, '')+"\",";
					appraisal_items+="\"target_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val())+"\",";
					//appraisal_items+="\"forecast_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-forecast").val())+"\",";
					appraisal_items+="\"score0\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score0").val())+"\",";
					appraisal_items+="\"score1\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score1").val())+"\",";
					appraisal_items+="\"score2\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score2").val())+"\",";
					appraisal_items+="\"score3\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score3").val())+"\",";
					appraisal_items+="\"score4\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score4").val())+"\",";
					appraisal_items+="\"score5\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score5").val())+"\",";

					appraisal_items+="\"total_weight\":\""+removeComma($("#total_weight-"+$(structureEntry).val()).val())+"\",";

					appraisal_items+="\"weight_percent\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val())+"\",";
					
					
					
					if($(this).prop("checked")==true){
						appraisal_items+="\"select_flag\":\"1\"";	
					}else{
						appraisal_items+="\"select_flag\":\"0\"";	
					}
					
					
				
				appraisal_items+="}";
				countAppraisalItem++;
			
			});

			
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form2"){

			//$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
			$.each($(".appraisalItem-checkbox-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"item_result_id\":\"11\",";
				appraisal_items+="\"item_result_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_result_id").val()+"\",";
				appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"2\",";
				appraisal_items+="\"target_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val())+"\",";
				appraisal_items+="\"total_weight\":\""+removeComma($("#total_weight-"+$(structureEntry).val()).val())+"\",";
				appraisal_items+="\"weight_percent\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val())+"\",";
				
				
				if($(this).prop("checked")==true){
					appraisal_items+="\"select_flag\":\"1\"";	
				}else{
					appraisal_items+="\"select_flag\":\"0\"";	
				}
				
				appraisal_items+="}";
				countAppraisalItem++;
			});
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form3"){
			
			//$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
			$.each($(".appraisalItem-checkbox-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
			
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				
				//appraisal_items+="\"item_result_id\":\"11\",";
				appraisal_items+="\"item_result_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_result_id").val()+"\",";
				appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"3\",";
				appraisal_items+="\"max_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-maxValue").val()+"\",";
				appraisal_items+="\"total_weight\":\""+$("#total_weight-"+$(structureEntry).val()).val()+"\",";
				appraisal_items+="\"deduct_score_unit\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-deductScoreUnit").val()+"\",";
				appraisal_items+="\"value_get_zero\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-valueGetZero").val()+"\",";
//				console.log("-----------------");
//				console.log(appraisalItemEntry);
//				console.log("Appraisal item = "+$(appraisalItemEntry).val());
//				console.log("Structure = "+$(structureEntry).val());
//				console.log($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-maxValue").val());
//				console.log("-----------------");
				
				
				if($(this).prop("checked")==true){
					appraisal_items+="\"select_flag\":\"1\"";	
				}else{
					appraisal_items+="\"select_flag\":\"0\"";	
				}
				
				
				appraisal_items+="}";
				
			    countAppraisalItem++;
				});
		}
	});
	




	var appraisal_itemsObj=eval("(["+appraisal_items+"])");
	//console.log(appraisal_itemsObj);
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/"+$("#id").val(),
		type:"PATCH",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		
		data:{"head_params":
			{
			"appraisal_type_id":$("#embed_appraisal_type_id").val(),
			"period_id":$("#period_id_edit").val(),
			"action_to":$("#actionAssign").val(),
			"remark":$("#remark_footer").val()
			},
			"appraisal_items":appraisal_itemsObj
		},
		success:function(data){
			
			if(data['status']==200){
				   //callFlashSlide("Updated.");Â 
				   callFlashSlideInModal("Updated","#information");
				   
					if(emailLinkAssignment==true) {
						var url_redirect = $(location).attr('href').split("/").splice(0, 5).join("/");
						window.location.replace(url_redirect+"/assignment");
						return false;
					}
					
			       getDataFn($("#pageNumber").val(),$("#rpp").val());
				   $("#ModalAssignment").modal('hide');
				   $("#action").val("add");

			}else if(data['status']=="400"){
				
				callFlashSlideInModal(validationAssignmentFn(data),"#information","error");
			}
			
		}
		
	});
	
};
//Update Assignment end

//Assignment Start
var actionAssignmentFn = function(param){
	
	
	var countAppraisalItem=0;
	var appraisal_items=[];

	var employees=[];
	
	var appraisal_item1=[];
	var appraisal_item2=[];
	var appraisal_item3=[];
	
	//get employees
	employees+="[";
	$.each(empldoyees_id,function(index,indexEntry){
		if(index==0){
			employees+="{";
		}else{
			employees+=",{";
		}
			if($("#embed_appraisal_type_id").val()==2){
				employees+="\"emp_id\":\""+indexEntry+"\",\"emp_code\":\""+empldoyees_code[index]+"\",";
				employees+="\"org_id\":\""+org_id_to_assign+"\",\"org_code\":\"\",";
				employees+="\"position_id\":\""+position_id[index]+"\"";
			}else if($("#embed_appraisal_type_id").val()==1){
				employees+="\"emp_id\":\"\",\"emp_code\":\"\",";
				employees+="\"org_id\":\""+indexEntry+"\",\"org_code\":\""+empldoyees_code[index]+"\"";
			}
			
		employees+="}";
		//employee.push({'emp_id':indexEntry});
	});
	employees+="]";
	
	//console.log("--------------");
	//console.log(employees);
	        
	//loop structure
	$.each($(".structure_id").get(),function(index,structureEntry){
		//console.log($(indexEntry).val());
		//console.log($("#form-"+$(indexEntry).val()).val());
		
		
		if($("#form-"+$(structureEntry).val()).val()=="form1"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				
				
				
					appraisal_items+="\"nof_target_score\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-nof_target_score").val()+"\",";
					appraisal_items+="\"kpi_type_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-kpi_type_id").val()+"\",";
					appraisal_items+="\"form_id\":\"1\",";
					appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
					appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
					appraisal_items+="\"target_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val())+"\",";
					//appraisal_items+="\"forecast_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-forecast").val())+"\",";
					appraisal_items+="\"score0\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score0").val())+"\",";
					appraisal_items+="\"score1\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score1").val())+"\",";
					appraisal_items+="\"score2\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score2").val())+"\",";
					appraisal_items+="\"score3\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score3").val())+"\",";
					appraisal_items+="\"score4\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score4").val())+"\",";
					appraisal_items+="\"score5\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score5").val())+"\",";
					appraisal_items+="\"weight_percent\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val())+"\",";
					appraisal_items+="\"total_weight\":\""+removeComma($("#total_weight-"+$(structureEntry).val()).val())+"\",";
					appraisal_items+="\"select_flag\":\"1\"";
				
				
				appraisal_items+="}";
				countAppraisalItem++;
			
			});

			
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form2"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"item_result_id\":\"11\",";
				appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"2\",";
				appraisal_items+="\"target_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val())+"\",";
				appraisal_items+="\"weight_percent\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val())+"\",";
				appraisal_items+="\"total_weight\":\""+removeComma($("#total_weight-"+$(structureEntry).val()).val())+"\",";
				appraisal_items+="\"select_flag\":\"1\"";
				appraisal_items+="}";
				countAppraisalItem++;
			});
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form3"){
			
			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				
			
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"item_result_id\":\"11\",";
				appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"3\",";
				appraisal_items+="\"max_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-maxValue").val()+"\",";
				appraisal_items+="\"deduct_score_unit\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-deductScoreUnit").val()+"\",";
				appraisal_items+="\"value_get_zero\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-valueGetZero").val()+"\",";
				appraisal_items+="\"total_weight\":\""+$("#total_weight-"+$(structureEntry).val()).val()+"\",";
				appraisal_items+="\"select_flag\":\"1\"";
				appraisal_items+="}";
				
			    countAppraisalItem++;
				});
		}
	});
	




	var employeesObj=eval("("+employees+")");
	//console.log(employeesObj)
	var appraisal_itemsObj=eval("(["+appraisal_items+"])");
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		
		
		/*
		appraisal_type_id: '',
        frequency_id: '',
        appraisal_year: '',
        period: '',
        action_to: '',
		 */
		data:{"head_params":
			{
			"appraisal_type_id":$("#embed_appraisal_type_id").val(),
			"frequency_id":$("#embed_period_frequency").val() ,
			"appraisal_year":$("#embed_year_list").val(),
			"period_id":$("#embed_period_id").val(),
			"action_to":$("#actionAssign").val(),
			"remark":$("#remark_footer").val(),
			 
			},
			
			"employees": employeesObj,
			"appraisal_items":appraisal_itemsObj
		},
		success:function(data){
			
			//console.log(data);
			if(data['status']==200){
				
				   
				   
				   if(param !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
					   getDataFn($("#pageNumber").val(),$("#rpp").val());
					   $("#ModalAssignment").modal('hide');
					   $("#action").val("add");		 	    
					}else{
						
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						callFlashSlideInModal("Insert Data is Successfully.","#information");
						$("#action").val("add");
						clearFn();
						
					}
				   
				   
			}else if(data['status']=="400"){
				//callFlashSlideInModal(validationFn(data),"#information","error");Â Â 
				callFlashSlideInModal(validationAssignmentFn(data),"#information","error");
				return false;
				
			}
			
		}
		
	});
	
	
	
}

//SearchAdvance
var searchAdvanceFn = function() {
	/*
	appraisal_level_id,
	appraisal_type_id,
	period_id,
	position_code,
	emp_id,


	*/
	var Position= $("#Position_id").val();
//	var Position= $("#Position").val().split("-");
//	Position=Position[0];
	
	//var Position = $("#Position").val();
	

	var empNameCode= $("#empName_id").val();
	//var empNameCode= $("#empName").val().split("-");
	//empNameCode=empNameCode[0];
	//var empNameCode= $("#empName").val();
	
	//console.log(Position,empNameCode,'searchAdvanceFn');
	
	$(".embed_param_search").remove();
	

	
	
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_org' name='embed_appraisal_level_id_org' value='"+$("#appraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_emp' name='embed_appraisal_level_id_emp' value='"+$("#appraisalLevelEmp").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_type_id' name='embed_appraisal_type_id' value='"+$("#appraisalType").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_period_id' name='embed_period_id' value='"+$("#period_id").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_position_id' name='embed_position_id' value='"+Position+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_emp_id' name='embed_emp_id' value='"+empNameCode+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_period_frequency' name='embed_period_frequency' value='"+$("#periodFrequency").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_year_list' name='embed_year_list' value='"+$("#YearList").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_organization' name='embed_organization' value='"+$("#organization").val()+"'>";
	
	
	
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
	
};
/*#########################  Main Function Data #######################*/
/*#########################  Custom Function Data #######################*/

//var appraisalLevelListFn = function(nameArea,id){
var appraisalLevelListOrgFn = function(){
	//console.log(session_emp_code)
	$.ajax({
		//url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_org",
		type:"get",
		dataType:"json",
		async:false,
		data:{"emp_code":session_emp_code},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
					
				}
			});
			$("#appraisalLevel").html(htmlOption);
		}
	});
}

var appraisalLevelListIndividualFn = function(){
	//console.log(session_emp_code)
	$.ajax({
		//url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_org_individual",
		type:"get",
		dataType:"json",
		async:false,
		data:{"emp_code":session_emp_code},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
					
				}
			});
			$("#appraisalLevel").html(htmlOption);
		}
	});
}

var appraisalLevelListEmpLevelFn = function(){
	//console.log(session_emp_code)
	$.ajax({
		//url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_emp",
		type:"get",
		dataType:"json",
		async:false,
		data:{"emp_code":session_emp_code},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data) {
			//console.log(data);
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
					
				}
			});
			$("#appraisalLevelEmp").html(htmlOption);
		}
	});
}

var appraisalLevelListEmpLevelToOrgFn = function(){
	$.ajax({
		//url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_emp_org",
		type:"get",
		dataType:"json",
		async:false,
		data:{"emp_code":session_emp_code,"level_id":$("#appraisalLevelEmp").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
					
				}
			});
			$("#appraisalLevel").html(htmlOption);
		}
	});
}

//var appraisalLevelListEmpNameFn = function(){
//	$.ajax({
//		//url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
//		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_emp_name",
//		type:"get",
//		dataType:"json",
//		async:false,
//		data:{"emp_code":session_emp_code,"level_id":$("#appraisalLevelEmp").val()},
//		headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
//			//console.log(data);
//			var htmlOption="";
//			htmlOption+="<option selected='selected' value=''>All Employee Name</option>";
//			$.each(data,function(index,indexEntry){
//				if(id==indexEntry['emp_code']){
//					htmlOption+="<option value="+indexEntry['emp_code']+">"+indexEntry['emp_name']+"</option>";
//				}else{
//					htmlOption+="<option value="+indexEntry['emp_code']+">"+indexEntry['emp_name']+"</option>";
//					
//				}
//			});
//			$("#empName").html(htmlOption);
//		}
//	});
//}
//
//var appraisalLevelListEmpPositionFn = function(){
//	$.ajax({
//		//url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
//		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_emp_position",
//		type:"get",
//		dataType:"json",
//		async:false,
//		data:{"emp_code":$("#empName").val()},
//		headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
//			//console.log(data);
//			var htmlOption="";
//			$.each(data,function(index,indexEntry){
//				if(id==indexEntry['position_code']){
//					htmlOption+="<option selected='selected' value="+indexEntry['position_code']+">"+indexEntry['position_name']+"</option>";
//				}else{
//					htmlOption+="<option value="+indexEntry['position_code']+">"+indexEntry['position_name']+"</option>";
//					
//				}
//			});
//			$("#Position").html(htmlOption);
//		}
//	});
//}


var yearListFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/year_list_assignment",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_year_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_year_id']+">"+indexEntry['appraisal_year']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_year_id']+">"+indexEntry['appraisal_year']+"</option>";
					
				}
			});
			$("#YearList"+nameArea).html(htmlOption);
		}
	});
}


var appraisalTypeFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		//http://192.168.1.52/"+serviceName+"/public/appraisal_assignment/appraisal_type_list
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_type_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
				}
			});
			$("#appraisalType"+nameArea).html(htmlOption);
		}
	});
}

var periodFrequencyFn = function(nameArea){
//	var data=['à¸—à¸¸à¸�à¹€à¸”à¸·à¸­à¸™','à¸—à¸¸à¸� 3 à¹€à¸”à¸·à¸­à¸™','à¸—à¸¸à¸� 6 à¹€à¸”à¸·à¸­à¸™','à¸—à¸¸à¸� 12 à¹€à¸”à¸·à¸­à¸™'];
//	var htmlOption="";
//	$.each(data,function(index,indexEntry){
//		htmlOption+="<option>"+indexEntry+"</option>";
//	});
//	$("#periodFrequency").html(htmlOption);
	


	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		//http://192.168.1.52/"+serviceName+"/public/appraisal_assignment/frequency_list
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/frequency_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
			
					htmlOption+="<option value="+indexEntry['frequency_id']+">"+indexEntry['frequency_name']+"</option>";
					
			
			});
			$("#periodFrequency"+nameArea).html(htmlOption);
		}
	});
	
	
}
var dropDrowDepartmentFn = function(id){

	$.ajax({
		//url:restfulURL+"/"+serviceName+"/public/appraisal_item/department_list",
		url:restfulURL+"/"+serviceName+"/public/appraisal/dep_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
		
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['department_code']){
					htmlOption+="<option selected='selected' value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}
			});
			$("#Department").html(htmlOption);
		}
	});
}
//var dropDrowOrgFn = function(appraisalLevelId){
//	$.ajax({
//		url:restfulURL+"/"+serviceName+"/public/org",
//		type:"get",
//		dataType:"json",
//		async:false,
//		headers:{Authorization:"Bearer "+tokenID.token},
//		data:{"level_id":appraisalLevelId},
//		success:function(data){
//			//console.log(data)
//			var htmlOption="";
//			htmlOption+="<option value=''>All Organization</option>";
//			$.each(data,function(index,indexEntry){
//				if(id==indexEntry['org_id']){
//					htmlOption+="<option selected='selected' value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
//				}else{
//					htmlOption+="<option value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
//				}
//			});
//			$("#organization").html(htmlOption);
//		}
//	});
//}

var dropDrowOrgFn = function(appraisalLevelId) {
	
//	console.log(appraisalLevelId);
//	console.log($("#appraisalType").val());
//	console.log($("#appraisalLevelEmp").val());
	
	var service_url_Check;
	if($("#appraisalType").val()==1) {
		service_url_Check = "org";
	}
	else {
		service_url_Check = "org/list_org_for_emp";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/"+service_url_Check+"",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"level_id":appraisalLevelId,"emp_code":session_emp_code,"level_id_emp":$("#appraisalLevelEmp").val()},
		success:function(data){
			//console.log(data)
			var htmlOption="";
			htmlOption+="<option value=''>All Organization</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['org_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}
			});
			$("#organization").html(htmlOption);
		}
	});
}

var dropDrowPeriodFn = function(paramPeriod,paramAssignFrequency){
	
//	var htmlOption="";
//	
//	var periodFrequency = parseFloat(paramPeriod);
//	var period = 12/periodFrequency;
//	
//	if(paramAssignFrequency==1){
//
//		htmlOption+="<option value=''>à¸—à¸¸à¸�à¸£à¸­à¸šà¸�à¸²à¸£à¸›à¸£à¸°à¹€à¸¡à¸´à¸™</option>";
//	}else{
//		for(var i=1;i<=period;i++){	
//			htmlOption+="<option value="+i+">à¸£à¸­à¸šà¸�à¸²à¸£à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸—à¸µà¹ˆ "+i+"</option>";
//		}
//	}
//	$("#period").html(htmlOption);
	var htmlOption="";
	
	
	if(paramAssignFrequency==1){
		htmlOption+="<option value=''></option>";
	}else{
		$("#period").removeAttr("disabled");
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/period_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":$("#YearList").val(),"frequency_id":$("#periodFrequency").val()},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['period_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}
			});
			$("#period_id").html(htmlOption);
			
			if(paramAssignFrequency==1){
				$("#period_id").attr("disabled","disabled");
			}else{
				$("#period_id").removeAttr("disabled");
			}
			
				
		}
	});
	
}


var dropDrowAsignToFn = function(nameArea){


	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/new_assign_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_level_id":$("#embed_appraisal_level_id_org").val()},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['to_appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#assignTo"+nameArea).html(htmlOption);
		}
	});
}
var dropDrowAsignToEditFn = function(paramStageID){



	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/edit_assign_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			if(data=="" || data==null || data==[]){
				
				$("#btnSubmit").attr("disabled","disabled");	
				$("#btnAddAnother").attr("disabled","disabled");

				//return false;
			}else{
				$("#btnSubmit").removeAttr("disabled");
				$("#btnAddAnother").removeAttr("disabled");
			}
			
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['to_appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['to_appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['to_appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#assignTo").html(htmlOption);
		}
	});
}

//var dropDrowActionFn = function(paramStageID,nameArea){
var dropDrowActionFn = function(employee_code){
	//console.log(employee_code,'200');

//	if(nameArea==undefined) {
//		nameArea="";
//	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/new_action_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		//data:{"stage_id":paramStageID,"appraisal_type_id":$("#embed_appraisal_type_id").val()},
		data:{"emp_code":employee_code,"appraisal_type_id":$("#param_app_type").val()},
		success:function(data){
			//console.log(data)
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";
			$.each(data,function(index,indexEntry) {
				if(id==indexEntry['stage_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}
			});
			//$("#actionAssign"+nameArea).html(htmlOption);
			$("#actionAssign").html(htmlOption);
		}
	});
}

//var dropDrowActionEditFn = function(paramStageID,paramToAppraisalLevel){
var dropDrowActionEditFn = function(paramStageID,employee_code,org_code){
	//console.log(employee_code,'employee_code?')
	//console.log(paramStageID,'paramStageID?')

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/edit_action_to",
		type:"POST",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		//data:{"stage_id":paramStageID,"to_appraisal_level_id":paramToAppraisalLevel},
		data:{"appraisal_type_id":$("#embed_appraisal_type_id").val(),"stage_id":paramStageID,"emp_code":employee_code,"org_code":org_code},
		success:function(data){
			//console.log(data)
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['stage_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}
			});
			$("#actionAssign").html(htmlOption);
		}
	});
}





var periodFn = function(nameArea){
//	var data=['à¸—à¸¸à¸�à¹€à¸”à¸·à¸­à¸™','à¸—à¸¸à¸� 3 à¹€à¸”à¸·à¸­à¸™','à¸—à¸¸à¸� 6 à¹€à¸”à¸·à¸­à¸™','à¸—à¸¸à¸� 12 à¹€à¸”à¸·à¸­à¸™'];
//	var htmlOption="";
//	$.each(data,function(index,indexEntry){
//		htmlOption+="<option>"+indexEntry+"</option>";
//	});
//	$("#periodFrequency").html(htmlOption);

	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		//http://192.168.1.52/"+serviceName+"/public/appraisal_assignment/period_list
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/period_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"assignment_frequency":$("#assignFrequency").val(),
			"frequency_id":$("#periodFrequency").val()
		},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['period_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
					
				}
			});
			$("#period"+nameArea).html(htmlOption);
		}
	});
}
//form2
var assignTemplateQualityFn = function(structureName,data){
	
	//console.log(data['threshold'],structureName,'threshold assignTemplateQualityFn')
	
	var htmlTemplateQuality="";
	htmlTemplateQuality+="";
	htmlTemplateQuality+="<div class=\"row-fluid\">";
	htmlTemplateQuality+="<div class=\"span12\">";
	htmlTemplateQuality+="<div class=\"ibox-title2\">";

	
	htmlTemplateQuality+="<div class='titlePanel'>"+structureName+"</div>";
		htmlTemplateQuality+="<div class='totalWeight'><span  class='displayWeightOnMobile' id='weigth_total_quality_moblie_percentage-"+data['structure_id']+"'></span><span  class='checkWeigthOver' id='weigth_total_quality_percentage-"+data['structure_id']+"'></span>Total Weight <span id='weigth_total_quality_percentage_target-"+data['structure_id']+"'>"+data['total_weight']+"%<span></div>";
		
	htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="<div class=\"ibox-content\">";
	htmlTemplateQuality+="<div class=\"table-responsive scrollbar-inner\"  style='overflow:auto;'>";
	htmlTemplateQuality+="<table id=\"tableQuality\" style='top: -37px;'  class=\"table table-striped tableQuality fixedHeader\">";
	htmlTemplateQuality+="<thead>";
		htmlTemplateQuality+="<tr>";
			htmlTemplateQuality+="<th style=\"width:3%\"><b>Select</b></th>";
			htmlTemplateQuality+="<th style=\"width:67%\"><b>Appraisal Item Name</b></th>";
			htmlTemplateQuality+="<th style=\"width:15%; text-align:center;\"><b>Target </b></th>";
			htmlTemplateQuality+="<th style=\"width:15%; text-align:center;\"><b>%Weight</b></th>  ";      
			htmlTemplateQuality+="</tr>";
				htmlTemplateQuality+="</thead>";
					htmlTemplateQuality+="<tbody id=\"listthreshould\">";
					
					$.each(data['items'],function(index,indexEntry){
						htmlTemplateQuality+="<tr>";
							htmlTemplateQuality+="<td style=\"width:3%;text-align:center;\" class='object-center'  ><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox appraisalItem-checkbox-"+indexEntry['structure_id']+"' type='checkbox' value='"+indexEntry['item_id']+"'></td>";
							htmlTemplateQuality+="<td style=\"width:67%\" style='padding-top:7px;' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_name' class='id-"+indexEntry['structure_id']+"-item_name'>"+indexEntry['item_name']+"</td>";
							htmlTemplateQuality+="<td style=\"width:15%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target' class='id-"+indexEntry['structure_id']+"-target input form-control input-sm-small numberOnly addComma' type='text'></td>";
							htmlTemplateQuality+="<td style=\"width:15%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight weight_sum total_weigth_quality input form-control input-sm-small numberOnly addComma' type='text'></td>";
							htmlTemplateQuality+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id' class='id-"+indexEntry['structure_id']+"-item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
							
						htmlTemplateQuality+="</tr>";
					});
					htmlTemplateQuality+="</tbody>";
					htmlTemplateQuality+="</table>";
					
					//htmlTemplateQuality+="<div class='formName hidden'>form2</div>";
					htmlTemplateQuality+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateQuality+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='total_weight' value="+data['total_weight']+">";
					htmlTemplateQuality+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form2\">";
					
					htmlTemplateQuality+="</div>";
					htmlTemplateQuality+="<br style=\"clear:both\">";				
		htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="</div>";
htmlTemplateQuality+="</div>";
return htmlTemplateQuality;
//$("#appraisal_template_area").append(htmlTemplateQuality);

};

var assignTemplateDeductFn = function(structureName,data){
	var tempCheckDataVGZ ="";
	//console.log(data['threshold'],structureName,'threshold assignTemplateDeductFn')
	
	var htmlTemplateDeduct="";
	htmlTemplateDeduct+="<div class=\"row-fluid\">";
	htmlTemplateDeduct+="<div class=\"span12\">";
	htmlTemplateDeduct+="<div class=\"ibox-title2\">";
	htmlTemplateDeduct+="<div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateDeduct+="<div class='totalWeight'><span class='sum_d' style='display:none;' id='weigth_total_deduct_percentage-"+data['structure_id']+"'>"+data['total_weight']+"</span>Total Weight <span class='weigth_total_deduct_percentage_target' id='weigth_total_deduct_percentage_target-"+data['structure_id']+"'>"+data['total_weight']+"%</span></div>";
	
	htmlTemplateDeduct+="</div>";
		
		htmlTemplateDeduct+="<div class=\"ibox-content\">";
		htmlTemplateDeduct+="<div class=\"table-responsive scrollbar-inner\"  style='overflow:auto;'>";
		htmlTemplateDeduct+="<table id=\"tableDeduct\" style='top: -37px;' class=\"table table-striped tableDeduct fixedHeader\">";
              		
		htmlTemplateDeduct+="<thead>";
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:3%\"><b>Select</b></th>";
				htmlTemplateDeduct+="<th style=\"width:52%\"><b>Appraisal checkWeigthOverItem Name</b></th>";
				htmlTemplateDeduct+="<th style=\"width:15%; text-align:center;\"><b>Max Value </b></th>";
				htmlTemplateDeduct+="<th style=\"width:15%; text-align:center;\"><b>Deduct Score/Unit </b></th>";
				if(data['is_value_get_zero']== 1) {
					htmlTemplateDeduct+="<th style=\"width:15%; text-align:center;\"><b>Value&nbsp;Get&nbsp;Zero&nbsp;</b></th>";
				}
					htmlTemplateDeduct+="</tr>";
					htmlTemplateDeduct+="</thead>";
					htmlTemplateDeduct+="<tbody id=\"\">";
					
					$.each(data['items'],function(index,indexEntry){
						htmlTemplateDeduct+="<tr>";
							
								
								htmlTemplateDeduct+="<td style=\"width:3%;text-align:center;\" class='object-center' ><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox notCal appraisalItem-checkbox-"+indexEntry['structure_id']+"' type='checkbox' value='"+indexEntry['item_id']+"'></td>";
								htmlTemplateDeduct+="<td style=\"width:52%\" style='padding-top:7px;' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_name' class='id-"+indexEntry['structure_id']+"-item_name'>"+indexEntry['item_name']+"</td>";
								htmlTemplateDeduct+="<td style=\"width:15%;text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-maxValue' class='id-"+indexEntry['structure_id']+"-maxValue  input form-control input-sm-small numberOnly addComma' type='text' value='"+indexEntry['max_value']+"'></td>";
								htmlTemplateDeduct+="<td style=\"width:15%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-deductScoreUnit' class='id-"+indexEntry['structure_id']+"-deductScoreUnit    input form-control input-sm-small numberOnly addComma' type='text' value='"+indexEntry['unit_deduct_score']+"'>     </td>";
								if(data['is_value_get_zero']== 1) {
									htmlTemplateDeduct+="<td style=\"width:15%; text-align:center; \"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-valueGetZero' class='id-"+indexEntry['structure_id']+"-valueGetZero  input form-control input-sm-small numberOnly addComma' type='text' value='"+(indexEntry['value_get_zero']==null ? "" :indexEntry['value_get_zero'])+"'></td>";								
								}
								htmlTemplateDeduct+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id' class='id-"+indexEntry['structure_id']+"-item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
						htmlTemplateDeduct+="</tr>";
					});
						
						
					htmlTemplateDeduct+="</tbody>";
					htmlTemplateDeduct+="</table>";
					htmlTemplateDeduct+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateDeduct+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='total_weight' value="+data['total_weight']+">";
					htmlTemplateDeduct+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form3\">";
					
				htmlTemplateDeduct+="</div>";
			htmlTemplateDeduct+="<br style=\"clear:both\">"			
		htmlTemplateDeduct+="</div>";
		htmlTemplateDeduct+="</div>";
	htmlTemplateDeduct+="</div>";
	return htmlTemplateDeduct;
	//$("#appraisal_template_area").append(htmlTemplateDeduct);
};




var assignTemplateQuantityFn = function(structureName,data){
	
	item_id_array=[];
	var htmlTemplateQuantity = "";
	
	
	
	if(data['threshold']==1){
		// threshold == 1
		//console.log(data['threshold'],structureName,'threshold = 1 in assignTemplateQuantityFn')
			htmlTemplateQuantity+="<div class=\"row-fluid\">";
			htmlTemplateQuantity+="	<div class=\"span12\">";
			htmlTemplateQuantity+="  <div class=\"ibox-title2\">";
			
			htmlTemplateQuantity+="      <div class='titlePanel'>"+structureName+"</div>";
			htmlTemplateQuantity+="      <div class='totalWeight'><span  class='displayWeightOnMobile' id='weigth_total_quantity_moblie_percentage-"+data['structure_id']+"'></span><span class='checkWeigthOver weigth_total_quantity_percentage' id='weigth_total_quantity_percentage-"+data['structure_id']+"'></span>Total Weight <span id='weigth_total_quantity_percentage_target-"+data['structure_id']+"'>"+data['total_weight']+"%</span></div>";
			htmlTemplateQuantity+="  </div>";
			htmlTemplateQuantity+="	<div class=\"ibox-content\">";
			htmlTemplateQuantity+=" <div class=\"table-responsive scrollbar-inner\"  style='overflow:auto;'>";
			htmlTemplateQuantity+="<table style='width:100%; top: -38px;' id=\"tableQauntity\" class=\"table table-striped tableQauntity fixedHeader\">";
			htmlTemplateQuantity+="<thead>";
				htmlTemplateQuantity+="<tr>";
					htmlTemplateQuantity+="<th style=\"width:3%;  text-align:center;\" class=''><b>Select</b></th>";
					htmlTemplateQuantity+="<th style=\"width:20%\" class=''><b>Appraisal Item Name</b></th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>Target</b> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>UOM</b> </th>";
					htmlTemplateQuantity+="<th style=\"width:10%;  text-align:right;padding-right: 10px;\" class='thBox'><b>Actual</b> </th>";
					
					
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][0]['color_code']+"' class='redBOxL'>1</div></th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][0]['color_code']+"' class='redBOxR'>&nbsp;</div><div style='background:#"+data['threshold_color'][1]['color_code']+"' class='OrangeBoxL'>2</div> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][1]['color_code']+"' class='OrangeBoxR'>&nbsp;</div><div style='background:#"+data['threshold_color'][2]['color_code']+"' class='YellowBoxL'>3</div> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][2]['color_code']+"' class='YellowBoxR'>&nbsp;</div><div style='background:#"+data['threshold_color'][3]['color_code']+"' class='greenBoxL'>4</div> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][3]['color_code']+"' class='greenBoxR'>&nbsp;</div><div style='background:#"+data['threshold_color'][4]['color_code']+"' class='veryGreenBOxL'>5</div> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][4]['color_code']+"' class='veryGreenBOxR'>&nbsp;</div> </th>";
					
					
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>%Weight</b></th>";
					//htmlTemplateQuantity+="<th style=\"width:3%;  text-align:center;\" class=''></th>";
					htmlTemplateQuantity+="</tr>";
					htmlTemplateQuantity+="</thead>";
					htmlTemplateQuantity+="<tbody id=\"fixClickKPI-"+data['structure_id']+"\">";
					$.each(data['items'],function(index,indexEntry){
						
						item_id_array.push(indexEntry['item_id']);
						
		
						htmlTemplateQuantity+="<tr>";
						
							
							htmlTemplateQuantity+="<td style=\"width:3%; text-align:center;\" class='object-center'><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox appraisalItem-checkbox-"+indexEntry['structure_id']+"' type='checkbox' value='"+indexEntry['item_id']+"'></td>";
							htmlTemplateQuantity+="<td style=\"width:20%\" class='id-"+indexEntry['structure_id']+"-item_name' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_name' style='padding-top:7px;'>"+indexEntry['item_name']+"</td>";
							
							htmlTemplateQuantity+="<td style=\"width:5%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target' class='id-"+indexEntry['structure_id']+"-target input form-control input-sm-small numberOnly addComma' type='text'>";
							htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-kpi_type_id' class='id-"+indexEntry['structure_id']+"-kpi_type_id input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['kpi_type_id']+">";
							htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-nof_target_score' class='id-"+indexEntry['structure_id']+"-nof_target_score input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['nof_target_score']+">";
							//htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-total_weight' class='id-"+indexEntry['structure_id']+"-total_weight input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['total_weight']+">";
							htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id' class='id-"+indexEntry['structure_id']+"-item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
							htmlTemplateQuantity+="</td>";
							htmlTemplateQuantity+="<td style=\"width:5%\">"+indexEntry['uom_name']+"</td>";
//							htmlTemplateQuantity+="<td style=\"width:5%;text-align:right;padding-right: 10px;\">"+notNullFn(indexEntry['actual_value'])+"</td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:right;padding-right: 10px;\"><input  class='input-sm-small scoreText0 numberOnly addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-actualValue' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-actualValue' disabled value='"+notNullFn(indexEntry['actual_value'])+"'></td>";
						    //htmlTemplateQuantity+="<td style=\"width:10%;text-align:center;\"><input  class='input-sm-small scoreText0 numberOnly addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast'></td>";
						   
						    htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText1 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score0' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score0'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText2 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score1' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score1'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText3 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score2' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score2'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText4 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score3' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score3'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText5 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score4' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score4'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText6 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score5' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score5'></td>";
							
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight weight_sum total_weigth_quantity input form-control input-sm-small numberOnly addComma'  type='text'></td>";
							
						 
							
							
						htmlTemplateQuantity+="</tr>";
						
					});
					htmlTemplateQuantity+="</tbody>";
					htmlTemplateQuantity+="</table>";
					htmlTemplateQuantity+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateQuantity+="<input type='hidden' id='no_weight-"+data['structure_id']+"' class='no_weight' value="+data['no_weight']+">";
					htmlTemplateQuantity+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='total_weight' value="+data['total_weight']+">";

					htmlTemplateQuantity+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form1\">";
					htmlTemplateQuantity+="<input type='hidden' id='item_id_array-"+data['structure_id']+"' class='item_id_array' value=\""+item_id_array+"\">";
					
					
					htmlTemplateQuantity+="</div>";
					htmlTemplateQuantity+="<br style=\"clear:both\">";	
				htmlTemplateQuantity+="</div>";
			htmlTemplateQuantity+="</div>";
			htmlTemplateQuantity+="</div>";
			
	}else{
		
		//console.log(data['threshold'],structureName,'threshold = 0 in assignTemplateQuantityFn')
		// threshold == 0
		
		htmlTemplateQuantity+="<div class=\"row-fluid\">";
		htmlTemplateQuantity+="	<div class=\"span12\">";
		htmlTemplateQuantity+="  <div class=\"ibox-title2\">";
		
		
		
		htmlTemplateQuantity+="      <div class='titlePanel'>"+structureName+"</div>";
		htmlTemplateQuantity+="      <div class='totalWeight'><span  class='displayWeightOnMobile' id='weigth_total_quantity_moblie_percentage-"+data['structure_id']+"'></span><span class='checkWeigthOver weigth_total_quantity_percentage' id='weigth_total_quantity_percentage-"+data['structure_id']+"'></span>Total Weight <span id='weigth_total_quantity_percentage_target-"+data['structure_id']+"'>"+data['total_weight']+"%</span></div>";
		htmlTemplateQuantity+="  </div>";
		htmlTemplateQuantity+="	<div class=\"ibox-content\">";
		htmlTemplateQuantity+=" <div class=\"table-responsive scrollbar-inner\"  style='overflow:auto;'>";
		htmlTemplateQuantity+="<table style='width:100%; top: -38px;' id=\"tableQauntity\" class=\"table table-striped tableQauntity fixedHeader\">";
		htmlTemplateQuantity+="<thead>";
			htmlTemplateQuantity+="<tr>";
				htmlTemplateQuantity+="<th style=\"width:3%; text-align:center;\" class=''><b>Select</b></th>";
				htmlTemplateQuantity+="<th style=\"width:30%\" class=''><b>Appraisal Item Name</b></th>";
				htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>Target</b> </th>";
				htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>UOM</b> </th>";
				htmlTemplateQuantity+="<th style=\"width:5%;  text-align:right;padding-right: 10px;\" class=''><b>Actual</b> </th>";
//				htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>Forecast Value</b> </th>";
				htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>%Weight</b></th>";
				htmlTemplateQuantity+="</tr>";
				htmlTemplateQuantity+="</thead>";
				htmlTemplateQuantity+="<tbody id=\"fixClickKPI-"+data['structure_id']+"\">";
				$.each(data['items'],function(index,indexEntry){
					
					item_id_array.push(indexEntry['item_id']);
					 
	 
					htmlTemplateQuantity+="<tr>";
						htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-kpi_type_id' class='id-"+indexEntry['structure_id']+"-kpi_type_id input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['kpi_type_id']+">";
						htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-nof_target_score' class='id-"+indexEntry['structure_id']+"-nof_target_score input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['nof_target_score']+">";
						//htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-total_weight' class='id-"+indexEntry['structure_id']+"-total_weight input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['total_weight']+">";
						htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id' class='id-"+indexEntry['structure_id']+"-item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
						htmlTemplateQuantity+="<td style=\"width:3%; text-align:center;\" class='object-center'><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox appraisalItem-checkbox-"+indexEntry['structure_id']+"' type='checkbox' value='"+indexEntry['item_id']+"'></td>";
						htmlTemplateQuantity+="<td style=\"width:30%\" class='id-"+indexEntry['structure_id']+"-item_name' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_name' style='padding-top:7px;'>"+indexEntry['item_name']+"</td>";
						htmlTemplateQuantity+="<td style=\"width:5%; text-align:center;\"><input class='input-sm-small numberOnly addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target'></td>";
						htmlTemplateQuantity+="<td style=\"width:5%\">"+indexEntry['uom_name']+"</td>";
//						htmlTemplateQuantity+="<td style=\"width:5%;text-align:right;padding-right: 10px;\">"+notNullFn(indexEntry['actual_value'])+"</td>";
						htmlTemplateQuantity+="<td style=\"width:5%;text-align:right;padding-right: 10px;\"><input class='input-sm-small numberOnly addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-actualValue' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-actualValue' disabled value='"+notNullFn(indexEntry['actual_value'])+"'></td>";
						//htmlTemplateQuantity+="<td style=\"width:5%; text-align:center;\"><input class='input-sm-small numberOnly addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast'></td>";
						htmlTemplateQuantity+="<td style=\"width:5%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight weight_sum total_weigth_quantity input form-control input-sm-small numberOnly addComma'  type='text'></td>";
					htmlTemplateQuantity+="</tr>";
					
				});
				htmlTemplateQuantity+="</tbody>";
				htmlTemplateQuantity+="</table>";
				htmlTemplateQuantity+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
				htmlTemplateQuantity+="<input type='hidden' id='no_weight-"+data['structure_id']+"' class='no_weight' value="+data['no_weight']+">";
				//htmlTemplateQuantity+="<input type='hidden' id='no_weight-"+data['structure_id']+"' class='no_weight' value="+data['no_weight']+">";
				//htmlTemplateQuantity+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='no_weight' value="+data['no_weight']+">";
				htmlTemplateQuantity+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='total_weight' value="+data['total_weight']+">";
				htmlTemplateQuantity+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form1\">";
				htmlTemplateQuantity+="<input type='hidden' id='item_id_array-"+data['structure_id']+"' class='item_id_array' value=\""+item_id_array+"\">";
				
				
				htmlTemplateQuantity+="</div>";
				htmlTemplateQuantity+="<br style=\"clear:both\">";	
			htmlTemplateQuantity+="</div>";
		htmlTemplateQuantity+="</div>";
		htmlTemplateQuantity+="</div>";
		
		
	}
	
	//return htmlTemplateQuantity;
	$("#appraisal_template_area").append(htmlTemplateQuantity);
	
	if(data['threshold']==1){
		if(data['nof_target_score']>0){
			
			for(var i=0;i<=(parseFloat(data['nof_target_score'])+1);i++){
				$(".scoreText"+i).prop("disabled",false);
			}
			
		}
		//if 0 disabled all
		//if 1 enable 0,1
		//if 2 enable 0,1,2
	}
	//console.log(data['count']);
	//console.log(data['structure_id']);
	
}
var calculationGrandTotalDefaultFn = function(id){
	
	var grandTotalWieght=0;
	var deductTotalWieght=0;
	$.each($(".weight_sum").get(),function(index,indexEntry){
		
		
		if($(indexEntry).val().trim()!=""){
			
			grandTotalWieght+=(parseFloat($(indexEntry).val()));
			//alert(grandTotalWieght);
			
		}
		
	});
	
	$.each($(".weigth_total_deduct_percentage_target").get(),function(index,indexEntry){
		//parseFloat($("#weigth_total_deduct_percentage").text());
		deductTotalWieght+=parseFloat($(indexEntry).text());
		
	});
	grandTotalWieghtTotal=(deductTotalWieght+grandTotalWieght);
	$("#grandTotalWeight").html(parseFloat(grandTotalWieghtTotal).toFixed(2));
	//$("#grandTotalWeight").html(grandTotalWieght);
	
}
function getNum(val) {
	   if (isNaN(val)) {
	     return 0;
	   }
	   return val;
	}
var calculationGrandTotalFn = function(id,checkedBox){
	
	var grandTotalWieght=0;
	var deductTotalWieght=0;
	var grandTotalWieghtTotal=0;
	
	var globalDataId=id.split("-");
	var globalApprailsal_item_id=globalDataId[1];
	var globalStructure_id=globalDataId[2];
	//Start Default weight form quantity is 0%
	if(checkedBox==true) {
		$("#weigth_total_quantity_percentage-"+globalStructure_id)
		.html("Cannot Assignment Because Weight% not equal to "+parseFloat($("#weigth_total_quantity_percentage_target-"+globalStructure_id).text()).toFixed(2)+"% [0%]")
		.css({"color":"#FF0000"}).
		addClass("weightIsOver");
	} else {
		$("#weigth_total_quantity_percentage-"+globalStructure_id)
		.html("")
		.css({"color":""}).
		removeClass("weightIsOver");
	}
	//End Default weight form quantity is 0%
	
	
	$.each($(".embed_appraisal_id").get(),function(index,indexEntry){
		
		var dataId=this.id.split("-");
		var apprailsal_item_id=dataId[1];
		var structure_id=dataId[2];
		grandTotalWieght+=getNum(removeComma($("#id-"+apprailsal_item_id+"-"+structure_id+"-weight").val()));
		
	});
			   
	$.each($(".weigth_total_deduct_percentage_target").get(),function(index,indexEntry){
		deductTotalWieght+=parseFloat($(indexEntry).text().replace(',', ''));
	});
	grandTotalWieghtTotal=(deductTotalWieght+grandTotalWieght);
	
	//console.log(grandTotalWieght);
	//console.log(grandTotalWieghtTotal);
	
	$("#grandTotalWeight").html(addCommas(parseFloat(grandTotalWieghtTotal).toFixed(2)));
	//weigth_total_quality_percentage_target
	
	//################ Calculation Quantity Start####################### 
	//var totalWeigthQuantity=0;
	$.each($(".embed_appraisal_id").get(),function(index,indexEntry){
		var dataId1=this.id.split("-");;
		var apprailsal_item_id1=dataId1[1];
		var structure_id1=dataId1[2];
		var totalWeigthQuantity=0;
		//$.each($(".total_weigth_quantity").get(),function(index,indexEntry){
		$.each($(".id-"+structure_id1+"-weight").get(),function(index,indexEntry){
			
			var dataId=this.id.split("-");;
			var apprailsal_item_id=dataId[1];
			var structure_id=dataId[2];
			
			//console.log("structure_id1="+structure_id1);
			//console.log("structure_id="+structure_id);
			
			//if(apprailsal_item_id==apprailsal_item_id1 && structure_id==structure_id1){
				
				console.log(indexEntry);
			
			
				if($(indexEntry).val().trim()!="" && $("#id-"+apprailsal_item_id+"-"+structure_id+"-checkbox").prop("checked")==true){
					totalWeigthQuantity+=(parseFloat($(indexEntry).val().replace(',', '')));
					//alert(grandTotalWieght);
					if(totalWeigthQuantity != parseFloat($("#weigth_total_quantity_percentage_target-"+structure_id).text())){
						
						$("#weigth_total_quantity_percentage-"+structure_id)
						.html("Cannot Assignment Because Weight% not equal to "+parseFloat($("#weigth_total_quantity_percentage_target-"+structure_id).text()).toFixed(2)+"% ["+addCommas(parseFloat(totalWeigthQuantity).toFixed(2))+"%]")
						.css({"color":"#FF0000"}).
						addClass("weightIsOver");
						
						$("#weigth_total_quantity_moblie_percentage-"+structure_id).html("["+addCommas(totalWeigthQuantity)+"%]")
						.css({"color":"#FF0000"});
						
						//var weightStructureHTML="<input type='hidden' name='weigth_quantity_over-"+structure_id+"' id='weigth_quantity_over-"+structure_id+"' class='weigth_quantity_over' value='"+totalWeigthQuantity+"'>";
						
					}else{
						$("#weigth_total_quantity_percentage-"+structure_id)
						.html("["+addCommas(totalWeigthQuantity)+"%]")
						.css({"color":"#00CC00"})
						.removeClass("weightIsOver");
						
						$("#weigth_total_quantity_moblie_percentage-"+structure_id).html("["+addCommas(parseFloat(totalWeigthQuantity).toFixed(2))+"%]")
						.css({"color":"#00CC00"});
					}
				}
			
			//}
		});
		
	});
	//################ Calculation Quantity End####################### 
	//################ Calculation Quality Start####################### 
	//Start Default weight form Quality is 0%
	if(checkedBox==true) {
		$("#weigth_total_quality_percentage-"+globalStructure_id)
		.html("Cannot Assignment Because Weight% not equal to "+parseFloat($("#weigth_total_quality_percentage_target-"+globalStructure_id).text())+"% [0%]")
		.css({"color":"#FF0000"}).
		addClass("weightIsOver");
	} else {
		$("#weigth_total_quality_percentage-"+globalStructure_id)
		.html("")
		.css({"color":""}).
		removeClass("weightIsOver");
	}
	//End Default weight form Quality is 0%
	//var total_weigth_quality=0;
	$.each($(".embed_appraisal_id").get(),function(index,indexEntry){
		var dataId1=this.id.split("-");
		var apprailsal_item_id1=dataId1[1];
		var structure_id1=dataId1[2];
		var total_weigth_quality=0;
		
		
			//$.each($(".total_weigth_quality").get(),function(index,indexEntry){
			$.each($(".id-"+structure_id1+"-weight").get(),function(index,indexEntry){
				
				var dataId=this.id.split("-");;
				var apprailsal_item_id=dataId[1];
				var structure_id=dataId[2];
				//if(apprailsal_item_id==apprailsal_item_id1 && structure_id==structure_id1){
					if($(indexEntry).val().trim()!="" && $("#id-"+apprailsal_item_id+"-"+structure_id+"-checkbox").prop("checked")==true){
						total_weigth_quality=(parseFloat(Number(total_weigth_quality).toFixed(2)))+(parseFloat($(indexEntry).val().replace(',', '')));
						//alert(grandTotalWieght);
						//$("#weigth_total_quality_percentage").html( "["+total_weigth_quality+"]");
						
						if(total_weigth_quality != parseFloat($("#weigth_total_quality_percentage_target-"+structure_id).text())){
							
							$("#weigth_total_quality_percentage-"+structure_id)
							.html("Cannot Assignment Because Weight% not equal to "+parseFloat($("#weigth_total_quality_percentage_target-"+structure_id).text())+"% ["+addCommas(parseFloat(total_weigth_quality).toFixed(2))+"%]")
							.css({"color":"#FF0000"}).
							addClass("weightIsOver");
							
							$("#weigth_total_quality_moblie_percentage-"+structure_id).html("["+addCommas(total_weigth_quality)+"%]")
							.css({"color":"#FF0000"});
							
						}else{
							
							$("#weigth_total_quality_percentage-"+structure_id)
							.html("["+addCommas(parseFloat(total_weigth_quality).toFixed(2))+"%]")
							.css({"color":"#00CC00"})
							.removeClass("weightIsOver");
							
							$("#weigth_total_quality_moblie_percentage-"+structure_id).html("["+addCommas(parseFloat(total_weigth_quality).toFixed(2))+"%]")
							.css({"color":"#00CC00"});
						}
					}
				//}
				
			});
		
	});
	//################ Calculation Quality End####################### 
	
}
var bindingSlideScoreBarFn = function(){
	
	//console.log(item_id_array);
	
	$.each(item_id_array,function(index,indexEntry){
		
		if(index<=2){
			
		// bind scoll bar start here...
		var slider = document.getElementById('slideScore-'+indexEntry);
		
		var input0 = document.getElementById('input-with-keypress-0-'+indexEntry);
		var input1 = document.getElementById('input-with-keypress-1-'+indexEntry);
		var input2 = document.getElementById('input-with-keypress-2-'+indexEntry);
		var input3 = document.getElementById('input-with-keypress-3-'+indexEntry);
	
		
		var inputs = [input0, input1, input2, input3];
		
		noUiSlider.create(slider, {
			start: [ 0, 20, 60, 100 ],
			connect: [false, true, true, true, true],
			direction: 'rtl',
			//tooltips: [true, wNumb({ decimals: 1 })],
			tooltips: true,
			range: {
				'min': [  0 ],
				'max': [ 100 ]
			}
		});

		var connect = slider.querySelectorAll('.noUi-connect');
		var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];
		
		for ( var i = 0; i < connect.length; i++ ) {
		    connect[i].classList.add(classes[i]);
		}
		
		slider.noUiSlider.on('update', function( values, handle ) {
			inputs[handle].value = values[handle];
		});
		// bind scoll bar end here...
		}
	});
	
}
var createTemplateAssignmentFn = function(data){
	$("#appraisal_template_area").empty();
	$.each(data['group'],function(index,indexEntry){
		//console.log(indexEntry['form_url']);
		
		if(indexEntry['form_url']=='quantity'){			
			//$("#appraisal_template_area").append(assignTemplateQuantityFn(index,indexEntry));
			assignTemplateQuantityFn(index,indexEntry);
			
		
			
			
		}else if(indexEntry['form_url']=='quality'){
			$("#appraisal_template_area").append(assignTemplateQualityFn(index,indexEntry));
			
		}else if(indexEntry['form_url']=='deduct'){
			$("#appraisal_template_area").append(assignTemplateDeductFn(index,indexEntry));
		}
		
		setThemeColorFn(tokenID.theme_color);
		
		
		
		
		
		//bindingSlideScoreBarFn();
	   
		
//	    $('.scrollbar-inner').slimScroll({
//	        height: '200px',
//	        alwaysVisible: true,
//	        railVisible: true
//	    });
	    
		var getSelectionStart = function (o) {
			if (o.createTextRange) {
				var r = document.selection.createRange().duplicate()
				r.moveEnd('character', o.value.length)
				if (r.text == '') return o.value.length
				return o.value.lastIndexOf(r.text)
			} else return o.selectionStart
		};
		jQuery('.numberOnly').keypress(function (evt) { 
			 var charCode = (evt.which) ? evt.which : evt.keyCode;
			 var number = this.value.split('.');
			 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			    return false;
			 }
			    //just one dot
			 if(number.length>1 && charCode == 46){
			    return false;
			 }
			    //get the carat position
			 var caratPos = getSelectionStart(this);
			 var dotPos = this.value.indexOf(".");
			 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
			    return false;
			 }
			 return true;
		});
	    
		
	});
	//sum grand total start
	
	$(".weight_sum").keyup(function(){
		calculationGrandTotalFn(this.id,checkBoxValidateWeight(this.id));
	})
	
	$(".addComma").keyup(function(){
		//Comma();
		$(this).val(Comma($(this).val()));
		//console.log(Comma($(this).val()));
	})
	
	$(".appraisalItem-checkbox").click(function(){
		//alert("hello");
		if($(this).hasClass('notCal')){
			//console.log("notCal");
			
		}else{
			//alert("11");
			//calculationGrandTotalFn(this.id);
		}
		
	})
	
	//sum grand total end

	//alert($(".no_weight").val());
	if($(".no_weight").val()==1){
		$(".totalWeight").hide();
		$(".grandTotalWeight").hide();

		$("input.total_weigth_quantity").attr('disabled','disabled');
		
		
	}else{
		$("input.total_weigth_quantity").removeAttr('disabled');
		$(".totalWeight").show();
		$(".grandTotalWeight").show();
	}
	 
};

var check_appraisalLevel;
var getTemplateFn = function(emp_result_id) {
	
	//console.log(org_id_to_assign)
	if($("#appraisalType").val()==1) {
		check_appraisalLevel = $("#appraisalLevel").val();
	}
	else if($("#appraisalType").val()==2) {
		check_appraisalLevel = $("#appraisalLevelEmp").val();
	}
	
	$.ajax({
		//http://192.168.1.52/"+serviceName+"/public/appraisal_assignment/period_list
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/template",
		type:"GET",
		dataType:"json",
		async:false,
		data:{
			'appraisal_level_id':check_appraisalLevel,
			'emp_result_id':emp_result_id,
			'org_id':org_id_to_assign

			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			createTemplateAssignmentFn(data);
		
			//SET FIXED HEADER 
//			var widthScreen= $(".fht-table-wrapper").width();	
//			$('table.fixedHeader').fixedHeaderTable({ height: '250', fixedColumn: false})
//			.css({"width":"auto","position":"absolute"});
//			$(".fht-tbody table.fixedHeader thead").css({"opacity":"0"});
//			$(".fht-table-wrapper").css({"height":"310px"," overflow":"hidden","min-width":"1100px"});
			
		}
	});
};

function checkBoxValidateWeight(checkboxId) {
	var valueCheckboxId = checkboxId.split("-")[2];
	var appraisalItemChecked = false;
	$('.appraisalItem-checkbox-'+valueCheckboxId).each(function(i,v){
		if($(this).prop('checked')==true) {
			appraisalItemChecked = true;
			return false;
		}
	});
	
	return appraisalItemChecked;
}
 

//var connectionServiceFn = function(username,password){
//	$.ajax({
//		
//		url:restfulURL+"/"+serviceName+"/public/session",
//		//url:"http://localhost/"+serviceName+"/public/session",
//		type:"POST",
//		dataType:"text",
//		data:{"username":username,"password":password},
//		//data:{"username":"2015019","password":"2015019"},
//		error: function(jqXHR, textStatus, errorThrown) {
//			console.log("error login");
//		},
//		success:function(data){
//			//console.log(data);
//			localStorage.setItem("tokenID",data);
//			console.log("Login is Success");
//			
//		}
//	})			
//}
//function getParamValue(paramName)
//{
//    var url = window.location.search.substring(1); //get rid of "?" in querystring
//    var qArray = url.split('&'); //get key-value pairs
//    for (var i = 0; i < qArray.length; i++) 
//    {
//        var pArr = qArray[i].split('='); //split key and value
//        if (pArr[0] == paramName) 
//            return pArr[1]; //return value
//    }
//}

/*#########################  Custom Function Data #######################*/


//Ready to call Function.
$(document).ready(function(){
	
	//alert(is_hr);
	
	

	
	
var username = $('#user_portlet').val();
var password = $('#pass_portlet').val();
var plid = $('#plid_portlet').val();

/*Fixed for Test.*/

// username = "hradmin";
// password =	"11";
	
if(username!="" && username!=null & username!=[] && username!=undefined ){
	
	if(connectionServiceFn(username,password,plid)==true){
		
		var dataClearParam = [
			{'id':'#Position', 'val': ""},
			{'id':'#Position_id', 'val': ""},
			{'id':'#empName', 'val': ""},
			{'id':'#empName_id', 'val': ""}
		];
		
		var dataSetParam = [
			{'id':'#Position', 'val': ""+cMain_position_name+""},
			{'id':'#Position_id', 'val': cMain_position_id},
			{'id':'#empName', 'val': ""+cMain_emp_name+""},
			{'id':'#empName_id', 'val': session_emp_code},
			{'id':'#appraisalLevelEmp', 'val': ""+cMain_level_id+""}
		];
		
	//Default start
	$("#btnSubmit").removeAttr("disabled");
	$("#btnAssignment").removeAttr("disabled");
	$("#btnAddAnother").removeAttr("disabled");
	$("#btnSubmit").removeAttr("disabled");
	//Default end
	if(is_hr==0 && is_self_assign ==0){
	
		$("#btnAssignment").attr("disabled","disabled");
		$("#btnAddAnother").attr("disabled","disabled");
		//$("#btnSubmit").attr("disabled","disabled");
		
	}else{
		//alert(is_hr);
		$("#btnAssignment").removeAttr("disabled");
		$("#btnAddAnother").removeAttr("disabled");
		//$("#btnSubmit").removeAttr("disabled");
	}
	
		
	var getSelectionStart = function (o) {
		if (o.createTextRange) {
			var r = document.selection.createRange().duplicate()
			r.moveEnd('character', o.value.length)
			if (r.text == '') return o.value.length
			return o.value.lastIndexOf(r.text)
		} else return o.selectionStart
	};
	jQuery('.numberOnly').keypress(function (evt) { 
		 var charCode = (evt.which) ? evt.which : evt.keyCode;
		 var number = this.value.split('.');
		 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		    return false;
		 }
		    //just one dot
		 if(number.length>1 && charCode == 46){
		    return false;
		 }
		    //get the carat position
		 var caratPos = getSelectionStart(this);
		 var dotPos = this.value.indexOf(".");
		 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
		    return false;
		 }
		 return true;
	});
	

		//dropDrowDepartmentFn();
		//appraisalLevelListFn();
		appraisalTypeFn('','2');
		periodFrequencyFn();
		yearListFn();
		
		$("#appraisalType").change(function() {
			if($("#appraisalType").val()==1){
				
				$("#Position").prop("disabled",true);
				$("#empName").prop("disabled",true);
				$("#appraisalLevelEmp").prop("disabled",true);
				$("#Position").val("");
				$("#empName").val("");
				$("#appraisalLevelEmp").val("");
				
				appraisalLevelListOrgFn();
				dropDrowOrgFn($("#appraisalLevel").val());	
				
			} else {
				
				$("#Position").prop("disabled",false);
				$("#empName").prop("disabled",false);
				$("#appraisalLevelEmp").prop("disabled",false);
				
				//appraisalLevelListIndividualFn();
				appraisalLevelListEmpLevelFn();
				appraisalLevelListEmpLevelToOrgFn();
				dropDrowOrgFn($("#appraisalLevel").val());
			}
		});
		$("#appraisalType").change();
		
		setParamSearch(dataSetParam);// in cMain.js
		
		$("#appraisalLevelEmp").change(function() {
			clearParamSearch(dataClearParam);// in cMain.js
			appraisalLevelListEmpLevelToOrgFn();
			dropDrowOrgFn($("#appraisalLevel").val());
		});
		
		$("#appraisalLevel").change(function() {
			clearParamSearch(dataClearParam);// in cMain.js
			dropDrowOrgFn($("#appraisalLevel").val());
		});

//		$("#empName").change(function() {
//			if($("#empName").val().split("-")[1]!=undefined){
//				empNameAutoCompelteChangeToPositionName();
//			}
//	
//		});

		$(".app_url_hidden").show();
	
		//Org Autocomplete Start
		/*
		$("#organization").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/"+serviceName+"/public/org/auto_org_name",
					 type:"post",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"org_name":request.term,"level_id":$("#appraisalLevel").val()},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.org_id+"-"+item.org_name,
	                                value: item.org_id+"-"+item.org_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
	    */
		//Org  End
		
	
	
	$("#periodFrequency").change(function(){
		
		
		//alert(period);
		
		dropDrowPeriodFn($(this).val(),$("#assignFrequency").val());
		
	});
	
	$("#YearList").change(function(){
		
		
		//alert(period);
		
		dropDrowPeriodFn($(this).val(),$("#assignFrequency").val());
		
	});
	
	
	$("#assignFrequency").change(function(){
		dropDrowPeriodFn($("#periodFrequency").val(),$(this).val())
	});
	$("#assignFrequency").change();
	//htmlOption+="<option value="+i+">à¸£à¸­à¸šà¸�à¸²à¸£à¸›à¸£à¸°à¹€à¸¡à¸´à¸™"+i+"</option>";
	
	//Auto complete Start
	

	$("#Position").autocomplete({
        source: function (request, response) {
        	$.ajax({
        		
        		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_position_name2",
				type:"post",
				dataType:"json",
				async:false,
				headers:{Authorization:"Bearer "+tokenID.token},
				data:{"emp_code":request.term},
				 data:{
					 	"position_name":request.term ,
					 	"emp_name":($("#empName_id").val()==""?"":$("#empName").val().split("(")[0]),
					 	"org_id":$("#organization").val()
				 },

				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.position_name,
                                value: item.position_name,
                                position_id : item.position_id
                                
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#Position").val(ui.item.value);
            $("#Position_id").val(ui.item.position_id);
            galbalDataTemp['position_name'] = ui.item.label;
            galbalDataTemp['position_id']=ui.item.position_id;
            return false;
        },change: function(e, ui) {  

 
			if ($("#Position").val() == galbalDataTemp['position_name']) {
				$("#Position_id").val(galbalDataTemp['position_id']);
			}  else if (ui.item != null){
				$("#Position_id").val(ui.item.position_id);
			}else {
				$("#Position_id").val("");
			}
         }
    });
	var empNameAutoCompelteChangeToPositionName = function(name) {
		
//		var empNameCodeToPosition= $("#empName").val().split("-");
//		empNameCodeToPosition=empNameCodeToPosition[1];
		
		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_position_name2",
			type:"post",
			dataType:"json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			data:{"emp_name":name},
			success:function(data){
				if(data.length!==0) {
					$("#Position_id").val(data[0].position_id);
					$("#Position").val(data[0].position_name);
					galbalDataTemp['position_name'] = data[0].position_name;
					galbalDataTemp['position_id'] = data[0].position_id;
				}
			}
		});
}

$("#empName").autocomplete({
		
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_employee_name2",
				 type:"post",
				 dataType:"json",
				 data:{
					 "emp_name":request.term,
					 "emp_code":session_emp_code,
					 "org_id":$("#organization").val(),
					 "level_id":$("#appraisalLevelEmp").val()
					 },
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  	//console.log(data)
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name+"("+item.emp_code+")",
                                value: item.emp_name,
                                emp_code: item.emp_code
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#empName").val(ui.item.label);
            $("#empName_id").val(ui.item.emp_code);
            galbalDataTemp['empName'] = ui.item.label;
            galbalDataTemp['empName_id']=ui.item.emp_code;
            empNameAutoCompelteChangeToPositionName(ui.item.value);
            return false;
        },change: function(e, ui) {  
			if ($("#empName").val() == galbalDataTemp['empName']) {
				$("#empName_id").val(galbalDataTemp['empName_id']);
			} else if (ui.item != null){
				$("#empName_id").val(ui.item.emp_id);
			} else {
				$("#empName_id").val("");
				
			}
        	
         }
    });
	
	
	
	//Auto Complete End
	
	//Search Start
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn();
		$(".countPagination").val(10);
		$("#rpp").remove();
		$(".search_result").show();
		
	});
	
	//btn assignment start
	$("#btnAssignment").click(function(){
		empldoyees_code=[];
		empldoyees_id=[];
		default_stage_id=[];
		organization_code = []
		$(".information").hide();
		$("#btnAddAnother").show();
		$(".embed_appraisal_id").remove();
		$("#grandTotalWeight").html("0.00");
			$.each($(".asign_emp").get(),function(index,indexEntry){
				if($(indexEntry).is(":checked")){
					var emp_id=$(indexEntry).val().split("-");
					var org_id=$(indexEntry).val().split("-/");
					empldoyees_id.push(emp_id[0]);
					empldoyees_code.push(emp_id[1]);
					org_id_to_assign = emp_id[2];
					position_id.push(emp_id[3]);
					default_stage_id.push(emp_id[4]);
					organization_code.push(org_id[1]);
				}
			});
		if(empldoyees_id.length==0){
			callFlashSlide("Please choose Employees or Organization for Assignment.");
			return false;
		}else{
			$("#ModalAssignment").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			sessionStorage.setItem('is_coporate_kpi',$("#is_coporate_kpi-"+empldoyees_id[0]).val());
			

			$(".cus_information_area").hide();
			$("#action").val("add");
			//Default start
			$("#btnSubmit").removeAttr("disabled");
			$("#btnAddAnother").removeAttr("disabled");
			//Default end
			getTemplateFn();
			
			$("#slideUpDownStageHistory").hide();
			$("#slideStageHistory").hide();
			
			
			/*dropDrowAsignToFn();
			$("#assignTo").off("change");
			$("#assignTo").change(function(){
				dropDrowActionFn($(this).val());
			});
			$("#assignTo").change();
			*/
			//var Emp_Code = JSON.stringify(empldoyees_code[0]);
			//console.log(empldoyees_code[0])
			//dropDrowActionFn(empldoyees_code[0]);
			dropDrowActionEditFn(default_stage_id[0],empldoyees_code[0],organization_code[0]);
			//dropDrowActionFn($(this).val());
			
			//check assignment if reject  remark is require.
			$("#actionAssign").off("change");
			$("#actionAssign").on("change",function(){
				//alert("hello jquery");
				
			});
			
			$(window).scrollTop(0);
			setTimeout(function(){
				$(".modal-body").scrollTop(0);
				$(".fht-tbody").scrollTop(0);
			
			});
		}
		$(".scoreText0").attr("disabled","disabled");
		/*
		console.log(empldoyees_id);
		console.log(empldoyees_code);
		*/
		//auto click
		$("#tableQuality .appraisalItem-checkbox,#tableDeduct .appraisalItem-checkbox,#fixClickKPI-2 .appraisalItem-checkbox").click();
		
	});
	//btn assignment end
	//btn action assign start
		$("#btnSubmit").click(function(){
//					alert($("#actionAssign option:selected").text());
//					alert($("#remark_footer").val());
					
					if(($("#actionAssign option:selected").text()=="Reject") && ($("#remark_footer").val()=="")){
						callFlashSlideInModal("Please fill Remark for Reject Workflow State.","#information","error");
						return false;
					}
			
					if($(".no_weight").val()==0){	
					
						if($(".checkWeigthOver").hasClass('weightIsOver')==true){
							
							callFlashSlideInModal("<b>Cannot Assign Structure not equal to Weight Total<b>","#information","error");
							
						}else if(parseFloat($("#grandTotalWeight").text())!=100){
							callFlashSlideInModal("<b>Grand Total Weight is Not 100%.<b>","#information","error");
							
						}else{
							
							if($(".embed_appraisal_id").get().length>0){
								if($("#action").val()=="add"){
									actionAssignmentFn("saveOnly");
								}else{
									actionUpdateAssignmentFn();
								}
								
							}else{
								callFlashSlideInModal("Please choose Appraisal item ID.","#information","error");
							}
						}
					}else{
						
						//no_weight==1
						
						if($(".embed_appraisal_id").get().length>0){
							if($("#action").val()=="add"){
								actionAssignmentFn("saveOnly");
							}else{
								actionUpdateAssignmentFn();
							}
							
						}else{
							callFlashSlideInModal("Please choose Appraisal item ID.","#information","error");
						}
						
					}
			
		});
		$(document).on("click","#btnAddAnother",function(){
			


			//clearFn();
			
			if($(".checkWeigthOver").hasClass('weightIsOver')==true){
				
				callFlashSlideInModal("<b>Cannot Assign Structure not equal to Weight Total<b>","#information","error");
				
			}else if(parseFloat($("#grandTotalWeight").text())!=100){
				callFlashSlideInModal("<b>Grand Total Weight is Not 100%.</b>","#information","error");
			
			}else{
			
				if($(".embed_appraisal_id").get().length>0){
					actionAssignmentFn("saveAndAnother");	
				}else{
					callFlashSlideInModal("Please choose Appraisal item ID.","#information","error");
				}
			}
		});
	//btn action assign end
		
	//embed emp_id
		

		//check choose appraisal item start
		
		$(document).on("click",".appraisalItem-checkbox",function(){	
			
			if($(this).prop("checked")==true){
				embedParamCheckboxAppraisalItem(this.id);	
			}else{
				removeEmbedParamCheckboxAppraisalItem(this.id);
			}
			
			//if(sessionStorage.getItem("is_coporate_kpi")==0){
				calculationGrandTotalFn(this.id,checkBoxValidateWeight(this.id));
			//}
		});
		
		
		//Button Click Stage History Start.
		
		$("#slideUpDownStageHistory").click(function(){
			//alert("hello jquery");
			$("#slideStageHistory").slideToggle();
			
			/*
			$(window).scrollTop(1000000);
			setTimeout(function(){
				$(".modal-body").scrollTop(1000000);
				$(".fht-tbody").scrollTop(1000000);
			},3000);
			*/
			return false;
		});
		
		//Button Click Stage History End.
		
		
		
		}
	
		
		
	}

//check Orientation Start
var getBrowserWidth = function(){
	if(window.innerWidth < 768){
		// Extra Small Device
		
		
	} else if(window.innerWidth < 991){
		// Small Device
		
		
	} else if(window.innerWidth < 1199){
		// Medium Device
		
	
	} else {
		// Large Device
		

	}
};

getBrowserWidth();
$(window).on('resize',function(){
	getBrowserWidth();
});
//check Orientation End

//binding tooltip start
$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
$('[data-toggle="tooltip"]').tooltip({
	 html:true
});
//binding tooltip end


});
