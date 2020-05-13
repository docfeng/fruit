Panel1={
	beginTime:"",
	endTime:"",
	orderTime:"",
	deleteButtonHtml:"<button type=\"button\" onclick=\"Panel1.deleteOption()\">删除</button>",
	showTable1:function(){
		var json=DataBase.order;
		var options=DataBase.options.order;
		var html="";
		var head="<th>序号</th>";
		for (var i2 = 0; i2 < options.length; i2++) {
			head+="<th class=\""+options[i2].id +"\">"+options[i2].name+"</th>";
		}
		head+="<th>"+"操作"+"</th>";
		head="<tr>"+head+"</tr>";
		
		Panel1.index=1;
		for(var i=0;i<json.length;i++){
			//alert(new Date(json[i].order_time)>=new Date(Panel1.beginTime))
			var h="";
			if(new Date(json[i].order_time)>=new Date(Panel1.beginTime)&&new Date(json[i].order_time)<=new Date(Panel1.endTime)){
				for (var i2 = 0; i2 < options.length; i2++) {
					h+="<td class=\""+options[i2].id +"\">"+json[i][options[i2].id]+"</td>";
				}
				
				h="<td>"+Panel1.index+"</td>"+h+"<td>"+Panel1.deleteButtonHtml+"</td>";
				html+="<tr>"+h+"</tr>";
				Panel1.index++;
				
			}
			
		}
		
		html=head+html;
		panel1_t1.innerHTML=html;
		//添加空白行
		Panel1.inserBlank();
		/* var row=panel1_t1.insertRow(panel1_t1.rows.length);
		row.innerHTML="<tr>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\"  onclick=\"Panel1.showSelectTable()\" oninput=\"Panel1.onSelectInput(this.value)\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><button type=\"button\" onclick=\"Panel1.addSelect()\">添加</button>"; */
	},
	showSelectTable:function(name){
		show(panel1_t0.parentNode);
		Panel1.rowIndex=event.srcElement.parentNode.parentNode.rowIndex;
		
		console.log(name)
		panel1_t0.parentNode.style.top=(event.clientY+60)+"px"
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th></tr>";
		var html="";
		var goods=DataBase.goods;
		for (var i = 0; i < goods.length; i++) {
			if(name&&goods[i].goods_name.indexOf(name)==-1){
				console.log(goods[i].goods_name)
				continue;
			}
			html+="<tr>"+
			"<td>"+goods[i].goods_code+"</td>"+
			"<td>"+goods[i].goods_name+"</td>"+
			"<td>"+goods[i].goods_specification+"</td>"+
			"<td>"+goods[i].goods_price+"</td>"+
			"</tr>";
		}
		html=head+html;
		panel1_t0.innerHTML=html;
	},
	inserBlank:function(){
		//添加空白行
		var row=panel1_t1.insertRow(panel1_t1.rows.length);
		var order_index=DataBase.order[DataBase.order.length-1].order_index//panel1_t1.rows[panel1_t1.rows.length-2].cells[0].innerHTML;
		var order_code=DataBase.order.length+1//parseInt(panel1_t1.rows[panel1_t1.rows.length-2].cells[1].innerHTML)+1;
		order_code=order_code.toString(); 
		while(order_code.length<3){
			order_code="0"+order_code;
		}
		var date=formatDate(new Date());
		var options=DataBase.options.order;
		var html="<td class=\"index\"></td>";
		for (var i2 = 0; i2 < options.length; i2++) {
			html+="<td class=\""+options[i2].id +"\"></td>";
		}
		html+="<td  class=\"control\"></td>";
		html="<tr>"+html+"</tr>";
		row.innerHTML=html;
		row.querySelector(".index").innerHTML=Panel1.index;
		row.querySelector(".order_index").innerHTML=order_index;
		row.querySelector(".order_code").innerHTML=order_code;
		row.querySelector(".order_time").innerHTML=date;
		row.querySelector(".control").innerHTML="<button type=\"button\" onclick=\"Panel1.addSelect()\">添加</button>";
	},
	onSelect:function(obj){
		//alert(obj.parentNode.rowIndex)
		var cells=obj.parentNode.cells;
		var _row=panel1_t1.rows[Panel1.rowIndex];
		
		var _cells=_row.cells;
		var input=_row.querySelectorAll("input");
/* 		 
		_cells[0].innerHTML=order_index;
		_cells[1].innerHTML=order_code; */
		_cells[3].innerHTML=cells[0].innerHTML;
		_cells[4].innerHTML=cells[1].innerHTML;
		_cells[5].innerHTML=cells[2].innerHTML;
		_cells[6].innerHTML=cells[3].innerHTML;
		_cells[7].innerHTML=1;
		_cells[8].innerHTML=parseFloat(_cells[6].innerHTML)*parseFloat(_cells[7].innerHTML);
		
		
		hide(panel1_t0.parentNode)
	},
	onSelectInput:function(text){
		this.showSelectTable(text)
	},
	addSelect:function(){
		hide(panel1_t0.parentNode);
		var _row=panel1_t1.rows[panel1_t1.rows.length-1];
		var _cells=_row.cells;
		_cells[10].innerHTML=Panel1.deleteButtonHtml;
		var input=_row.querySelectorAll("input");
		var json={
			"goods_code":_cells[3].innerHTML,
			"goods_name":_cells[4].innerHTML,
			"goods_specification":_cells[5].innerHTML,
			"goods_price":_cells[6].innerHTML,
			"goods_quantity":_cells[7].innerHTML,
			"goods_total":_cells[8].innerHTML,
			"order_index":_cells[1].innerHTML,
			"order_code":_cells[2].innerHTML,
			"order_time":_cells[9].innerHTML
		}
		DataBase.order.push(json)
		DataBase.saveOrder();
		//
		/* 
		var row=panel1_t1.rows[panel1_t1.rows.length-1];
		var cells=row.cells;
		for (var i = 0; i < cells.length-1; i++) {
			var td=cells[i];
			var input=td.querySelector("input");
			td.innerHTML=input.value
		} */
		this.inserBlank();
		
	},
	deleteOption:function(){
		if(!confirm("确定删除"))return;
		var row=event.srcElement.parentNode.parentNode;
		var index=row.rowIndex
		panel1_t1.deleteRow(index);
		var code=parseInt(row.cells[2].innerHTML);
		DataBase.order.splice(code-1,1);
		DataBase.saveOrder();
	},
	addOption:function(a){
		
	},
	updataOption:function(){
		var row=event.srcElement.parentNode.parentNode;
		var _cells=row.cells;
		_cells[10].innerHTML=Panel1.deleteButtonHtml;
		var json={
			"goods_code":_cells[3].innerHTML,
			"goods_name":_cells[4].innerHTML,
			"goods_specification":_cells[5].innerHTML,
			"goods_price":_cells[6].innerHTML,
			"goods_quantity":_cells[7].innerHTML,
			"goods_total":_cells[8].innerHTML,
			"order_index":_cells[1].innerHTML,
			"order_code":_cells[2].innerHTML,
			"order_time":_cells[9].innerHTML
		}
		var code=parseInt(row.cells[2].innerHTML);
		DataBase.order[code-1]=json;
		DataBase.saveOrder();
	},
	insertOption:function(a){
		
	},
	
	alter:function(){
		var obj=event.srcElement;
		if(obj.tagName.toLowerCase()=="td"){
			if(obj.cellIndex==4){
				obj.innerHTML="<input type=\"text\" onblur=\"Panel1.onchange(this)\" onchange=\"Panel1.onchange(this)\" onfocus=\"Panel1.showSelectTable()\" onclick=\"Panel1.showSelectTable(this.value)\" oninput=\"Panel1.onSelectInput(this.value)\" value=\""+obj.innerHTML +"\"/>"
				obj.querySelector("input").focus();
			}else if(obj.cellIndex==8){
				
			}
			else{
				obj.innerHTML="<input type=\"text\" onblur=\"Panel1.onchange(this)\" onchange=\"Panel1.onchange(this)\" value=\""+obj.innerHTML +"\"/>"
				obj.querySelector("input").focus();
			}
		}else{
			//alert(obj.tagName.toLowerCase())
		}
	},
	onchange:function(a){
		var obj=event.srcElement;
		var p=obj.parentNode;
		if(p){
			p.innerHTML=obj.value
			var row=p.parentNode;
			var cells=row.cells;
			if(p.cellIndex==7){
				cells[8].innerHTML=parseFloat(cells[6].innerHTML)*parseFloat(cells[7].innerHTML);
			}
			if(row.rowIndex!=(panel1_t1.rows.length-1)){
				cells[10].innerHTML="<button type=\"button\" onclick=\"Panel1.updataOption()\">更新</button>";
			}
			
		}
	},
	initTime:function(){
		Panel1.beginTime=Panel1.endTime=DataBase.orderTime=panel1_endTime.value= panel1_beginTime.value=panel1_orderTime.value=formatDate(new Date());
		
	},
	setBeginTime:function(){
		Panel1.beginTime=event.srcElement.value;
		this.showTable1();
	},
	setEndTime:function(){
		Panel1.endTime=event.srcElement.value;
		this.showTable1();
	},
	setTime:function(){
		Panel1.beginTime=Panel1.endTime=panel1_endTime.value= panel1_beginTime.value=formatDate(new Date())
		this.showTable1();
	},
	setWeek:function(){
		var beginDate=new Date();
		var endDate=new Date();
		var week=beginDate.getDay();
		beginDate.setDate(beginDate.getDate()-(week-1))
		endDate.setDate(endDate.getDate()+(7-week))
		Panel1.beginTime=panel1_beginTime.value=formatDate(beginDate)
		Panel1.endTime=panel1_endTime.value= formatDate(endDate)
		this.showTable1();
	},
	setMonth:function(){
		var beginDate=new Date();
		var endDate=new Date();
		var month=beginDate.getMonth();
		beginDate.setDate(1)
		endDate.setMonth(month+1)
		endDate.setDate(0)
		Panel1.beginTime=panel1_beginTime.value=formatDate(beginDate)
		Panel1.endTime=panel1_endTime.value= formatDate(endDate)
		this.showTable1();
	},
	setYear:function(){
		var beginDate=new Date();
		var endDate=new Date();
		var year=beginDate.getYear();
		beginDate.setMonth(0)
		beginDate.setDate(1)
		endDate.setMonth(13)
		endDate.setDate(0)
		Panel1.beginTime=panel1_beginTime.value=formatDate(beginDate)
		Panel1.endTime=panel1_endTime.value= formatDate(endDate)
		this.showTable1();
	},
	setOrderTime:function(){
		DataBase.orderTime=event.srcElement.value||formatDate(new Date());
	}
}