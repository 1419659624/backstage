$(function () {

	//添加居住人 
	//$(document).on('click','div.addPeop',function(){
	mui(document.body).on('tap', 'div.addPeop', function (event) {
		var html = $(".addPeopCon:first", $('#demo')).clone();
		html.appendTo($('#demo1'));

		$(":text", html).val("");

		loadProvince(undefined, $("select.resident_census_register", html));

		$("select", html).each(function () {
			this.selectedIndex = 0;
		});

		//$('#demo1').append($('#demo').html());
	});

	//$(document).on('click','div.deleat',function(){
	mui(document.body).on('tap', 'div.deleat', function (event) {
			if ($("div.addPeopCon").length <= 1) {
			mui.alert("至少填写一个居住人");
			return;
		}

		var self = this;
		var btnArray = ['是', '否'];
		mui.confirm('确定删除居住人信息吗？', '', btnArray, function (e) {
			if (e.index == 0) {
				$(self).parents("div.addPeopCon:first").remove();
			}
		});

	});

	$(document).on('click', '.yl-select', function () {
		$(this).css('color', '#333333');
	});

	$('#save').click(function () {
		savaResidentAgree();
	});
})

function savaResidentAgree() {
	if (formValidate() == true) {
		var AjaxURL = "savaResident";
		$.ajax({
			type: "POST",
			dataType: "json",
			url: AjaxURL,
			data: $('#residentform').serialize(),
			success: function (result) {
				var strresult = result;
				alert("编辑成功！");
				location.href = location.href;
				//self.location.href="/"
			},
			error: function (data) {
				alert("error:" + data.responseText);
			}
		});
	}
}

function loadPostion(thisposition)		//加载职务
{
	$(".postion").empty("");
	$(".postion").append("<option selected='selected'  value=0>请选择职务..</option>");
	$.each(arryPostion, function (i) {
		var PostionID = arryPostion[i]["ID"];
		var Postionval = arryPostion[i]["NAME"];
		var selectedflag = "";
		if (thisposition == PostionID) { selectedflag = " selected " };
		$(".postion").append("<option value='" + PostionID + "' " + selectedflag + ">" + Postionval + "</option>");
	});
}

function loadHadHouse(thisHashouse)		//承租人及配偶名下房产情况
{
	$(".has_house").empty("");
	$(".has_house").append("<option selected='selected'  value=0>请选择..</option>");
	$.each(arryHadHouse, function (i) {

		var HadHouseID = arryHadHouse[i]["ID"];
		var HadHouseval = arryHadHouse[i]["NAME"];
		var selectedflag = "";
		if (thisHashouse == HadHouseID) { selectedflag = " selected " };
		$(".has_house").append("<option value='" + HadHouseID + "' " + selectedflag + ">" + HadHouseval + "</option>");
	});

	$(".has_spouse").empty("");
	$(".has_spouse").append("<option selected='selected'  value=0>请选择..</option>");
	$.each(arryHadHouse, function (i) {

		var HadHouseID = arryHadHouse[i]["ID"];
		var HadHouseval = arryHadHouse[i]["NAME"];
		var selectedflag = "";
		if (thisHashouse == HadHouseID) { selectedflag = " selected " };
		$(".has_spouse").append("<option value='" + HadHouseID + "' " + selectedflag + ">" + HadHouseval + "</option>");
	});
}

function loadEducation(thisEducationID)	//加载学历
{
	$(".education").empty("");
	$(".education").append("<option selected='selected'  value=0>请选择您的学历信息..</option>");
	$.each(arryEducation, function (i) {
		var EducationID = arryEducation[i]["ID"];
		var Educationval = arryEducation[i]["NAME"];
		var selectedflag = "";
		if (thisEducationID == EducationID) { selectedflag = " selected " };
		$(".education").append("<option value='" + EducationID + "' " + selectedflag + ">" + Educationval + "</option>");
	});
}

function loadTechpostion(thisTechpostionID) //加载职称
{
	$(".techpostion").empty("");
	$(".techpostion").append("<option selected='selected'  value=0>请选择职称..</option>");
	$.each(arryTechpostion, function (i) {
		var TechpostionID = arryTechpostion[i]["ID"];
		var Techpostionval = arryTechpostion[i]["NAME"];
		var selectedflag = "";
		if (thisTechpostionID == TechpostionID) { selectedflag = " selected " };
		$(".techpostion").append("<option value='" + TechpostionID + "' " + selectedflag + ">" + Techpostionval + "</option>");
	});
}

function loadRelation(thisRelationID)		//与承租人关系列表
{
	$(".relation_id").empty("");
	$(".relation_id").append("<option selected='selected'  value=0>请选择承租人关系..</option>");
	$.each(arryRelation, function (i) {
		var RelationID = arryRelation[i]["ID"];
		var Relationval = arryRelation[i]["NAME"];
		var selectedflag = "";
		if (thisRelationID == RelationID) { selectedflag = " selected " };
		$(".relation_id").append("<option value='" + RelationID + "' " + selectedflag + ">" + Relationval + "</option>");
	});
}


//加载省份列表
function loadProvince(thisProvince, selector) {
	selector = selector || $(".resident_census");

	selector.empty("");
	selector.append("<option selected='selected'  value=0>请选择您户口所在地..</option>");
	$.each(arryProvinces, function (i) {
		var ProvinceID = arryProvinces[i]["ID"];
		var Provinceval = arryProvinces[i]["NAME"];
		var selectedflag = "";
		if (thisProvince == ProvinceID) { selectedflag = " selected " };
		selector.append("<option value='" + ProvinceID + "' " + selectedflag + ">" + Provinceval + "</option>");
	});
}

// 验证中文名称
function isChinaName(name) {
	var pattern = /^[\u4E00-\u9FA5]{1,6}$/;
	return pattern.test(name);
}
// 验证手机号
function isPhoneNo(phone) {
	var pattern = /^1[34578]\d{9}$/;
	return pattern.test(phone);
}

// 验证身份证 
function isCardNo(card) {
	var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return pattern.test(card);
}


// 表单验证
function formValidate() {

	var str = '';
	var obj = [];

	// 判断编号
	if ($.trim($('#employee_no').val()).length == 0) {
		str += '承租人员工编号没有输入\n';
		//$('#employee_no').focus();
		obj.push($('#employee_no'));
	}

	// 判断名称
	if ($.trim($('#employee_name').val()).length == 0) {
		str += '承租人员工姓名没有输入；\n';
		obj.push($('#employee_name'));
		//$('#employee_name').focus();
	} else {
		if (isChinaName($.trim($('#employee_name').val())) == false) {
			str += '承租人员工姓名不合法；\n';
			obj.push($('#employee_name'));
			//$('#employee_name').focus();
		}
	}
	// 验证身份证
	if ($.trim($('#idcard').val()).length == 0) {
		str += '承租人身份证号码没有输入；\n';
		obj.push($('#idcard'));
		//$('#idcard').focus();
	} else {
		if (isCardNo($.trim($('#idcard').val())) == false) {
			str += '承租人身份证号不正确；\n';
			obj.push($('#idcard'));
			//$('#idcard').focus();
		}
	}
	//性别
	if ($.trim($('#sex').val()).length == 0) {
		str += '承租人性别没有选择；\n';
		obj.push($('#sex'));
		//$('#sex').focus();
	}
	//职务
	if ($.trim($('#postion').val()).length == 0) {
		str += '承租人职务没有输入；\n';
		obj.push($('#postion'));
		//$('#postion').focus();
	}

	//职务
	if ($.trim($('#dept').val()).length == 0) {
		str += '所属部门没有输入；\n';
		obj.push($('#dept'));
		//$('#postion').focus();
	}

	//职务
	if ($.trim($('#center').val()).length == 0) {
		str += '所属中心没有输入；\n';
		obj.push($('#center'));
		//$('#postion').focus();
	}


	//开始时间
	if ($.trim($('#time01Result').val()).length == 0) {
		str += '没有选择劳动合同开始时间；\n';
		obj.push($('#time01Result'));
		//$('#time01Result').focus();
	}

	//结束时间
	if ($.trim($('#time02Result').val()).length == 0) {
		str += '没有选择劳动合同结束时间；\n';
		obj.push($('#time02Result'));
		//$('#time02Result').focus();
	}

	//承租人及配偶名下房产情
	if ($.trim($('#has_house').val()).length == 0) {
		str += '承租人及配偶名下房产情况；\n';
		obj.push($('#has_house'));
		//$('#has_house').focus();
	}

	//学历
	if ($.trim($('#education').val()).length == 0 || $('#education').val() == "0") {
		str += '承租人学历没有选择；\n';
		obj.push($('#education'));
		//$('#education').focus();
	}

	//职称
	if ($.trim($('#techpostion').val()).length == 0) {
		str += '承租人职称没有输入；\n';
		obj.push($('#techpostion'));
		//$('#techpostion').focus();
	}

	//学历
	if ($.trim($('#census_register').val()).length == 0) {
		str += '承租人户籍所在地没有选择；\n';
		obj.push($('#census_register'));
		//$('#census_register').focus();
	}


	// 判断手机号码
	if ($.trim($('#mobile').val()).length == 0) {
		str += '承租人联系电话没有输入；\n';
		obj.push($('#mobile'));
		//$('#mobile').focus();
	} else {
		if (isPhoneNo($.trim($('#mobile').val()) == false)) {
			str += '承租人联系电话不正确；\n';
			obj.push($('#mobile'));
			//$('#mobile').focus();
		}
	}

	$("div.addPeopCon").each(function () {

		//居住人姓名
		if ($.trim($('.resident_name', $(this)).val()).length == 0) {
			str += '请选择居住人姓名；\n';
			obj.push($('.resident_name', $(this)));
			//$('.resident_name').focus();
		}

		//居住人关系
		if ($('.relation_id', $(this)).val() == 0) {
			str += '请选择与居住人关系；\n';
			obj.push($('.relation_id', $(this)));
			//$('.relation_id').focus();
		}

		//身份证号
		if ($.trim($('.resident_idcard', $(this)).val()).length == 0) {
			str += '请选择居住人身份证号；\n';
			obj.push($('.resident_idcard', $(this)));
			//$('.resident_idcard').focus();
		} else {
			if (isCardNo($.trim($('.resident_idcard', $(this)).val())) == false) {
				str += '居住人身份证号不正确；\n';
				obj.push($('.resident_idcard', $(this)));
				//$('.resident_idcard').focus();
			}
		}

		//性别
		if ($.trim($('.resident_sex', $(this)).val()).length == 0) {
			str += '请选择居住人性别；\n';
			obj.push($('.resident_sex', $(this)));
			//$('.resident_sex').focus();
		}

		//承租人及配偶名下房产情况
		if ($.trim($('.has_spouse', $(this)).val()).length == 0) {
			str += '请选择居住人性别；\n';
			obj.push($('.has_spouse', $(this)));
			//$('.has_spouse').focus();
		}

		//户籍所在地
		if ($('.resident_census_register', $(this)).val() == 0) {
			str += '请选择居住人户籍所在地；\n';
			obj.push($('.resident_census_register', $(this)));
			//$('.resident_census_register').focus();
		}

		//联系电话
		if ($.trim($('.resident_mobile', $(this)).val()).length == 0) {
			str += '请选择居住人联系电话；\n';
			obj.push($('.resident_mobile', $(this)));
			//$('.resident_mobile').focus();
		} else {
			if (isPhoneNo($.trim($('.resident_mobile', $(this)).val()) == false)) {
				str += '承租人联系电话不正确；\n';
				obj.push($('.resident_mobile', $(this)));
				//$('.resident_mobile').focus();
			}
		}

	});


	// 如果没有错误则提交
	if (str != '') {
		alert(str);
		obj[0] && obj[0].focus();
		return false;
	} else {
		return true;
		// $('#residentform').submit();
	}
}


(function ($, doc) {
	$.init();
	$.ready(function () {
		//劳动合同开始时间
		var time01Button = doc.getElementById('time01');
		var time01Result = doc.getElementById('time01Result');
		time01Button.addEventListener('tap', function (event) {
			/*
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			*/
			var options = { type: "date" };
			var id = this.getAttribute('id');
			var picker = new $.DtPicker(options);
			picker.show(function (rs) {
				time01Result.value = rs.y.text + '' + rs.m.text + '' + rs.d.text;
				time01Result.style.color = '#333333';
				picker.dispose();
			});
		}, false);

		//		劳动合同截止时间
		var time02Button = doc.getElementById('time02');
		var time02Result = doc.getElementById('time02Result');
		time02Button.addEventListener('tap', function (event) {
			/*
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			*/
			var options = { type: "date" };
			var id = this.getAttribute('id');
			var picker = new $.DtPicker(options);
			picker.show(function (rs) {
				time02Result.value = rs.y.text + '' + rs.m.text + '' + rs.d.text;
				time02Result.style.color = '#333333';
				picker.dispose();
			});
		}, false);

	});
})(mui, document);


