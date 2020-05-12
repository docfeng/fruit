window.addEventListener("load",async function(){
	//UI.show(4)
	Panel1.initTime();
	Panel2.initTime();
	var order=DataBase.getOrder()||JSON.parse(await http.get("order.json"));
	var option=DataBase.getOption()||JSON.parse(await http.get("setting.json"));
	var goods=DataBase.getGoods()||JSON.parse(await http.get("goods.json"));
	Panel1.order=order;
	Panel1.options=option;
	Panel2.goods=goods;
	Panel1.showTable1()
	Panel2.showTable1()
});
DataBase={
	saveGoods:function(){
		localStorage.setItem("goods",JSON.stringify(Panel2.goods));
	},
	saveOrder:function(){
		localStorage.setItem("order",JSON.stringify(Panel1.order));
	},
	getGoods:function(){
		var re=localStorage.getItem("goods",JSON.stringify(Panel2.goods));
		if(re){
			return JSON.parse(re)
		}
		return false
	},
	getOrder:function(){
		var re=localStorage.getItem("order",JSON.stringify(Panel1.order));
		if(re){
			return JSON.parse(re)
		}
		return false
	},
	saveOption:function(){
		localStorage.setItem("option",JSON.stringify(Panel1.option));
	},
	getOption:function(){
		var re=localStorage.getItem("option",JSON.stringify(Panel1.option));
		if(re){
			return JSON.parse(re)
		}
		return false
	},
}
Panel1={
	beginTime:"",
	endTime:"",
	orderTime:"",
	deleteButtonHtml:"<button type=\"button\" onclick=\"Panel1.deleteOption()\">删除</button>",
	showTable1:function(){
		var json=Panel1.order;
		var options=Panel1.options.order;
		var html="";
		var head="<th>序号</th>";
		for (var i2 = 0; i2 < options.length; i2++) {
			if(options[i2].permission){
				head+="<th>"+options[i2].name+"</th>";
			}
		}
		head+="<th>"+"操作"+"</th>";
		head="<tr>"+head+"</tr>";
		
		Panel1.index=1;
		for(var i=0;i<json.length;i++){
			//alert(new Date(json[i].order_time)>=new Date(Panel1.beginTime))
			var h="";
			if(new Date(json[i].order_time)>=new Date(Panel1.beginTime)&&new Date(json[i].order_time)<=new Date(Panel1.endTime)){
				for (var i2 = 0; i2 < options.length; i2++) {
					/* if(options[i2].permission){
						html+="<td>"+json[i][options[i2].id]+"</td>";
					} */
					h+="<td>"+json[i][options[i2].id]+"</td>";
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
	showSelectTable:function(){
		show(panel1_t0.parentNode);
		Panel1.rowIndex=event.srcElement.parentNode.parentNode.rowIndex;
		panel1_t0.parentNode.style.top=(event.clientY+60)+"px"
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th></tr>";
		var html="";
		var goods=Panel2.goods;
		for (var i = 0; i < goods.length; i++) {
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
		var order_index=Panel1.order[Panel1.order.length-1].order_index//panel1_t1.rows[panel1_t1.rows.length-2].cells[0].innerHTML;
		var order_code=Panel1.order.length+1//parseInt(panel1_t1.rows[panel1_t1.rows.length-2].cells[1].innerHTML)+1;
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
		Panel1.order.push(json)
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
		var row=event.srcElement.parentNode.parentNode;
		var index=row.rowIndex
		panel1_t1.deleteRow(index);
		var code=parseInt(row.cells[2].innerHTML);
		Panel1.order.splice(code-1,1);
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
		Panel1.order[code-1]=json;
		DataBase.saveOrder();
	},
	insertOption:function(a){
		
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
				cells[10].innerHTML="<button type=\"button\" onclick=\"Panel1.updataOption()\">更新</button>";
			}
			
		}
	},
	initTime:function(){
		Panel1.beginTime=Panel1.endTime=Panel1.orderTime=panel1_endTime.value= panel1_beginTime.value=panel1_orderTime.value=formatDate(new Date());
		
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
	setOrderTime:function(){
		Panel1.orderTime=event.srcElement.value||formatDate(new Date());
	}
}
Panel2={
	beginTime:"",
	endTime:"",
	orderTime:"",
	showButtonHtml:"<button type=\"button\" onclick=\"Panel2.showTable2()\">详情</button>",
	showTable1:function(){
		var order=Panel1.order;
		var goods=Panel2.goods;
		var options=Panel1.options.goods;
		var html="";
		var head="<th>序号</th>";
		for (var i2 = 0; i2 < options.length; i2++) {
			if(options[i2].permission){
				head+="<th>"+options[i2].name+"</th>";
			}
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
		
		console.log(Panel2.json)
		console.log(json)
		console.log(name)
		if(!json)return;
		var options=Panel1.options.order;
		var html="";
		var head="<th>序号</th>";
		for (var i2 = 0; i2 < options.length; i2++) {
			if(options[i2].permission){
				head+="<th>"+options[i2].name+"</th>";
			}
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
		var options=Panel2.goods;
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
		var order_index=Panel1.order[Panel1.order.length-1].order_index//panel1_t1.rows[panel1_t1.rows.length-2].cells[0].innerHTML;
		var order_code=Panel1.order.length+1//parseInt(panel1_t1.rows[panel1_t1.rows.length-2].cells[1].innerHTML)+1;
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
		Panel1.order.push(json)
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
	setOrderTime:function(){
		Panel2.orderTime=event.srcElement.value||formatDate(new Date());
	}
}
Panel4={
	deleteButtonHtml:"<button type=\"button\" onclick=\"Panel4.deleteOption()\">删除</button>",
	inserBlank:function(){
		//添加空白行
		var row=panel4_t1.insertRow(panel4_t1.rows.length);
		row.innerHTML="<tr>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td><button type=\"button\" onclick=\"Panel4.addSelect()\">添加</button>";
	},
	onchange:function(a){
		var obj=event.srcElement;
		var p=obj.parentNode;
		if(p){
			p.innerHTML=obj.value
			var row=p.parentNode;
			var cells=row.cells;
			if(row.rowIndex!=(panel4_t1.rows.length-1)){
				cells[4].innerHTML="<button type=\"button\" onclick=\"Panel4.updataOption()\">更新</button>";
			}
		}
	},
	
	alter:function(){
		var obj=event.srcElement;
		if(obj.tagName.toLowerCase()=="td"){
			if(obj.cellIndex==1){
				obj.innerHTML="<input type=\"text\" onblur=\"Panel4.onchange(this)\" onchange=\"Panel4.onchange(this)\" onfocus=\"Panel4.showSelectTable()\" onclick=\"Panel4.showSelectTable()\" oninput=\"Panel4.onSelectInput(this.value)\" value=\""+obj.innerHTML +"\"/>"
				obj.querySelector("input").focus();
			}else if(obj.cellIndex==8){
				
			}
			else{
				obj.innerHTML="<input type=\"text\" onblur=\"Panel4.onchange(this)\" onchange=\"Panel4.onchange(this)\" value=\""+obj.innerHTML +"\"/>"
				obj.querySelector("input").focus();
			}
		}else{
			//alert(obj.tagName.toLowerCase())
		}
	},
	deleteOption:function(){
		var row=event.srcElement.parentNode.parentNode;
		var index=row.rowIndex
		panel4_t1.deleteRow(index);
		var code=parseInt(row.cells[2].innerHTML);
		Panel2.goods.splice(code-1,1);
		DataBase.saveGoods();
	},
	updataOption:function(){
		var row=event.srcElement.parentNode.parentNode;
		var _cells=row.cells;
		_cells[4].innerHTML=Panel4.deleteButtonHtml;
		var json={
			"goods_code":_cells[0].innerHTML,
			"goods_name":_cells[1].innerHTML,
			"goods_specification":_cells[2].innerHTML,
			"goods_price":_cells[3].innerHTML
		}
		var code=row.rowIndex;
		Panel2.goods[code-1]=json;
		DataBase.saveGoods();
	},
	
	showTable1:function(){
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th><th>操作</th></tr>";
		var html1="";
		var html2="";
		var options=Panel2.goods
		for (var i = 0; i < options.length; i++) {
			html2+="<tr>"+
			"<td>"+options[i].goods_code+"</td>"+
			"<td>"+options[i].goods_name+"</td>"+
			"<td>"+options[i].goods_specification+"</td>"+
			"<td>"+options[i].goods_price+"</td>"+
			"<td>"+"<button type=\"button\" onclick=\"Panel4.deleteOption()\">删除</button>"+"</td>"+
			"</tr>";
		}
		
		html1=head+html1;
		html2=head+html2;
		panel4_t1.innerHTML=html2;
		Panel4.inserBlank()
	},
	showSelectTable:function(){
		show(panel4_t0.parentNode);
		Panel4.rowIndex=event.srcElement.parentNode.parentNode.rowIndex;
		console.log(Panel4.rowIndex)
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th></tr>";
		var html="";
		var options=Panel2.goods
		for (var i = 0; i < options.length; i++) {
			html+="<tr>"+
			"<td>"+options[i].goods_code+"</td>"+
			"<td>"+options[i].goods_name+"</td>"+
			"<td>"+options[i].goods_specification+"</td>"+
			"<td>"+options[i].goods_price+"</td>"+
			"</tr>";
		}
		html=head+html;
		
		panel4_t0.innerHTML=html;
	},
	onSelect:function(obj){
		//alert(obj.parentNode.rowIndex)
		var cells=obj.parentNode.cells;
		var _row=panel4_t1.rows[Panel4.rowIndex];
		console.log(Panel4.rowIndex)
		console.log(_row)
		var _cells=_row.cells;
		_cells[0].innerHTML=cells[0].innerHTML;
		_cells[1].innerHTML=cells[1].innerHTML;
		_cells[2].innerHTML=cells[2].innerHTML;
		_cells[3].innerHTML=cells[3].innerHTML;
		hide(panel4_t0.parentNode)
	},
	onSelectInput:function(text){
		if(text==""){
			this.showSelect();
		}else{
			/* for (var i = 0; i < Things.length; i++) {
				Things[i]
			} */
		}
	},
	addSelect:function(){
		hide(panel4_t0.parentNode);
		var _row=panel4_t1.rows[panel4_t1.rows.length-1];
		var _cells=_row.cells;
		var input=_row.querySelectorAll("input");
		var goods=Panel2.goods;
		var json={
			"goods_code":_cells[0].innerHTML,
			"goods_name":_cells[1].innerHTML,
			"goods_specification":_cells[2].innerHTML,
			"goods_price":_cells[3].innerHTML
		}
		//判断商品编码或名称是否重复
		var index=-1;
		for (var i = 0; i < Panel2.goods.length; i++) {
			if(Panel2.goods[i].goods_code==json.goods_code||Panel2.goods[i].goods_name==json.goods_name){
				index=i;
			}
		}
		
		if(index==-1){
			goods.push(json);
			DataBase.saveGoods();
			_cells[4].innerHTML=Panel4.deleteButtonHtml;
			this.inserBlank();
		}else{
			var re=confirm("重复，是否修改");
			if(re){
				var row=panel4_t1.rows[index+1];
				var cells=row.cells;
				cells[0].innerHTML=_cells[0].innerHTML;
				cells[1].innerHTML=_cells[1].innerHTML;
				cells[2].innerHTML=_cells[2].innerHTML;
				cells[3].innerHTML=_cells[3].innerHTML;
				cells[4].innerHTML="<button type=\"button\" onclick=\"Panel4.updataOption()\">更新</button>";
				
				goods[index]=json;
				DataBase.saveGoods();
				//this.inserBlank();
			}
		}
		
	}
}
UI={
	show:function(index){
		if(!this.obj){
			this.obj=panel1;
		}
		switch (index){
			case 1:
				toggle(this.obj);
				this.obj=panel1;
				toggle(this.obj);
				break;
			case 2:
				toggle(this.obj);
				this.obj=panel2;
				toggle(this.obj);
				break;
			case 3:
				toggle(this.obj);
				this.obj=panel3;
				toggle(this.obj);
				break;
			case 4:
				toggle(this.obj);
				this.obj=panel4;
				toggle(this.obj);
				if(!this.goods){
					var options=Panel2.goods
					UI.goods=options;
				}
				break;
			
			case 5:
				toggle(this.obj);
				this.obj=panel5;
				toggle(this.obj);
				break;
			default:
				break;
		}
	},
	showMenuItem:function(){
		toggle(MenuItem1);
	}
}
toggle=function(obj){
	obj.classList.toggle("hide");
}
show=function(obj){
	obj.classList.remove("hide");
}
hide=function(obj){
	obj.classList.add("hide");
}
var formatDate = function(d) {
	var date = d || new Date()
	var yyyy = date.getFullYear();
	var mm = date.getMonth() + 1;
	var dd = date.getDate();
	mm = mm < 10 ? "0" + mm : mm;
	dd = dd < 10 ? "0" + dd : dd;
	/* var hours = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	hours = hours < 10 ? "0" + hours : hours;
	minute = minute < 10 ? "0" + minute : minute;
	second = second < 10 ? "0" + second : second; */
	//date = yyyy + "-" + mm + "-" + dd + " " + hours + ":" + minute + ":" + second;
	date = yyyy + "-" + mm + "-" + dd  ;
	return date;
}