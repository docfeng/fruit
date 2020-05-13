Panel2={
	beginTime:"",
	endTime:"",
	orderTime:"",
	showButtonHtml:"<button type=\"button\" onclick=\"Panel2.showTable2()\">详情</button>",
	showTable1:function(){
		var order=DataBase.order;
		var goods=DataBase.goods;
		var options=DataBase.options.goods;
		var html="";
		var head="<th>序号</th>";
		for (var i2 = 0; i2 < options.length; i2++) {
				head+="<th>"+options[i2].name+"</th>";
		}
		head+="<th>"+"数量"+"</th>"+"<th>"+"操作"+"</th>";
		head="<tr>"+head+"</tr>";
		
		
		var re=[];
		for(var i=0;i<order.length;i++){
			if(new Date(order[i].order_time)>=new Date(Panel2.beginTime)&&new Date(order[i].order_time)<=new Date(Panel2.endTime)){
				re.push(order[i])
			}
		}
		var re2=[];
		for(var i=0;i<goods.length;i++){
			var r=[];
			for (var i2 = 0; i2 < re.length; i2++) {
				if(re[i2].goods_name==goods[i].goods_name){
					r.push(re[i2]);
				}
			}
			re2.push(r);
		}
		
		Panel2.json=re2;
		Panel2.index=1;
		for(var i=0;i<re2.length;i++){
			var e=re2[i];
			if(e.length==0)continue;
			var h="";
			var goods_quantity=0;
			for (var i2 = 0; i2 < e.length; i2++) {
				if(i2==0){
					h="<td>"+e[i2].goods_code+"</td>"+
					"<td>"+e[i2].goods_name+"</td>"+
					"<td>"+e[i2].goods_specification+"</td>"+
					"<td>"+e[i2].goods_price+"</td>";
				}
				goods_quantity+=parseFloat(e[i2].goods_quantity);
			}
			
			h="<td>"+Panel2.index+"</td>"+h+"<td>"+goods_quantity+"</td>"+"<td>"+Panel2.showButtonHtml+"</td>";
			html+="<tr>"+h+"</tr>";
			Panel2.index++;
		}
		
		html=head+html;
		panel2_t1.innerHTML=html;
	},
	showTable2:function(){
		var row=event.srcElement.parentNode.parentNode;
		var name=row.cells[2].innerHTML;
		var json1=Panel2.json;
		var json;
		for (var i = 0; i < json1.length; i++) {
			if(json1[i].length>0&&json1[i][0].goods_name==name){
				json=json1[i];
			}
		}
		if(!json)return;
		var options=DataBase.options.order;
		var html="";
		var head="<th>序号</th>";
		for (var i2 = 0; i2 < options.length; i2++) {
				head+="<th>"+options[i2].name+"</th>";
		}
		head="<tr>"+head+"</tr>";
		
		var index=1;
		for(var i=0;i<json.length;i++){
			//alert(new Date(json[i].order_time)>=new Date(Panel1.beginTime))
			var h="";
			for (var i2 = 0; i2 < options.length; i2++) {
				/* if(options[i2].permission){
					html+="<td>"+json[i][options[i2].id]+"</td>";
				} */
				h+="<td>"+json[i][options[i2].id]+"</td>";
			}
			
			h="<td>"+index+"</td>"+h;
			html+="<tr>"+h+"</tr>";
			index++;
			
		}
		html=head+html;
		panel2_t2.innerHTML=html;
	},
	showSelectTable:function(){
		show(panel1_t0.parentNode);
		Panel1.rowIndex=event.srcElement.parentNode.parentNode.rowIndex;
		panel1_t0.parentNode.style.top=(event.clientY+60)+"px"
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th></tr>";
		var html="";
		var options=DataBase.goods;
		for (var i = 0; i < options.length; i++) {
			html+="<tr>"+
			"<td>"+options[i].goods_code+"</td>"+
			"<td>"+options[i].goods_name+"</td>"+
			"<td>"+options[i].goods_specification+"</td>"+
			"<td>"+options[i].goods_price+"</td>"+
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
		row.innerHTML="<tr>"+
		"<td>"+Panel1.index+"</td>"+
		"<td>"+order_index+"</td>"+
		"<td>"+order_code+"</td>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td>"+date+"</td>"+
		"<td><button type=\"button\" onclick=\"Panel1.addSelect()\">添加</button>";
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
		if(text==""){
			this.showSelectTable();
		}else{
			/* for (var i = 0; i < Things.length; i++) {
				Things[i]
			} */
		}
		
		document.title=a
	},
	addSelect:function(){
		hide(panel1_t0.parentNode);
		var _row=panel1_t1.rows[panel1_t1.rows.length-1];
		var _cells=_row.cells;
		_cells[10].innerHTML="编辑 删除";
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
	alter:function(){
		var obj=event.srcElement;
		if(obj.tagName.toLowerCase()=="td"){
			if(obj.cellIndex==4){
				obj.innerHTML="<input type=\"text\" onblur=\"Panel1.onchange(this)\" onchange=\"Panel1.onchange(this)\" onfocus=\"Panel1.showSelectTable()\" onclick=\"Panel1.showSelectTable()\" oninput=\"Panel1.onSelectInput(this.value)\" value=\""+obj.innerHTML +"\"/>"
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
				cells[10].innerHTML="确定";
			}
			
		}
	},
	initTime:function(){
		Panel2.beginTime=Panel2.endTime=Panel2.orderTime=panel2_endTime.value= panel2_beginTime.value=panel2_orderTime.value=formatDate(new Date());
		
	},
	setBeginTime:function(){
		Panel2.beginTime=event.srcElement.value;
		this.showTable1();
	},
	setEndTime:function(){
		Panel2.endTime=event.srcElement.value;
		this.showTable1();
	},
	setTime:function(){
		Panel2.beginTime=Panel2.endTime=panel2_endTime.value= panel2_beginTime.value=formatDate(new Date())
		this.showTable1();
	},
	setWeek:function(){
		var beginDate=new Date();
		var endDate=new Date();
		var week=beginDate.getDay();
		beginDate.setDate(beginDate.getDate()-(week-1))
		endDate.setDate(endDate.getDate()+(7-week))
		Panel2.beginTime=panel2_beginTime.value=formatDate(beginDate)
		Panel2.endTime=panel2_endTime.value= formatDate(endDate)
		this.showTable1();
	},
	setMonth:function(){
		var beginDate=new Date();
		var endDate=new Date();
		var month=beginDate.getMonth();
		beginDate.setDate(1)
		endDate.setMonth(month+1)
		endDate.setDate(0)
		Panel2.beginTime=panel2_beginTime.value=formatDate(beginDate)
		Panel2.endTime=panel2_endTime.value= formatDate(endDate)
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
		Panel2.beginTime=panel2_beginTime.value=formatDate(beginDate)
		Panel2.endTime=panel2_endTime.value= formatDate(endDate)
		this.showTable1();
	},
	setOrderTime:function(){
		Panel2.orderTime=event.srcElement.value||formatDate(new Date());
	}
}