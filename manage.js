class All extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <div style={this.props.style.all}>
					<div style={this.props.style.header}><p style={this.props.style.headerP}>parking</p></div>
					<ManageBox style={this.props.style}/>
		       </div>;
	}
}
class ManageBox extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userName:document.querySelector('#userName').innerHTML,
			response:'',
			describleRate:0,
			lotRate:0
		};
		this.rate=this.rate.bind(this);
		this.clickA=this.clickA.bind(this);
		this.dblclickA=this.dblclickA.bind(this);
		this.clickB=this.clickB.bind(this);
		this.dblclickB=this.dblclickB.bind(this);
	}
	rate(){
		if(parseInt(event.target.dataset.describlerate)===0||parseInt(event.target.dataset.lotrate)===0){
			alert('你还没有评价,不能提交');
		}else{
			function callback(){
				console.log('上传成功');
			}
			var id=event.target.id.slice(1);
			var describlerate=event.target.dataset.describlerate;
			var lotrate=event.target.dataset.lotrate;
			var data='orderNo='+id+'&describlerate='+describlerate+'&lotrate='+lotrate;
			var request=new ajaxRequest('uploadRate.php',data,callback);
			request.requestPost();
			console.log(event.target.id.slice(1),event.target.dataset.describlerate,event.target.dataset.lotrate); 
		}
		
	}
	clickA(){
		var id=event.target.id;
		var orderno=event.target.dataset.orderno;
		console.log(id,orderno);
		id=id.split('_');
		var num=parseInt(id[1]);
		for(let i=1;i<num+1;i++){
			document.querySelector('#'+orderno+'a_'+i).style.backgroundColor='RGB(101,182,255)';
		}
		var elem=document.querySelector('#'+orderno);
		elem.dataset.describlerate=num;
		console.log(elem.dataset.describlerate,elem.dataset.lotrate);
	}
	dblclickA(){
		var id=event.target.id;
		var orderno=event.target.dataset.orderno
		id=id.split('_');
		var num=parseInt(id[1]);
		for(let i=5;i>num-1;i--){
			document.querySelector('#'+orderno+'a_'+i).style.backgroundColor='RGB(220,220,220)';
		}
		var elem=document.querySelector('#'+orderno);
		elem.dataset.describlerate=num-1;
		console.log(elem.dataset.describlerate,elem.dataset.lotrate);
	}
	clickB(){
		var id=event.target.id;
		var orderno=event.target.dataset.orderno;
		id=id.split('_');
		var num=parseInt(id[1]);
		for(let i=1;i<num+1;i++){
			document.querySelector('#'+orderno+'b_'+i).style.backgroundColor='RGB(101,182,255)';
		}
		var elem=document.querySelector('#'+orderno);
		elem.dataset.lotrate=num;
		console.log(elem.dataset.describlerate,elem.dataset.lotrate);
	}
	dblclickB(){
		var id=event.target.id;
		var orderno=event.target.dataset.orderno;
		id=id.split('_');
		var num=parseInt(id[1]);
		for(let i=5;i>num-1;i--){
			document.querySelector('#'+orderno+'b_'+i).style.backgroundColor='RGB(220,220,220)';
		}
		var elem=document.querySelector('#'+orderno);
		elem.dataset.lotrate=num-1;
		console.log(elem.dataset.describlerate,elem.dataset.lotrate);
	}
	componentWillMount(){
		var b=this;
		function callback(response){
			b.setState({
				response:response
			});
			console.log(response);
		}
		var request=new ajaxRequest('fetchOrder.php','customer='+this.state.userName,callback);
		request.requestPost();
	}
	render(){
		var response=this.state.response;
		let arr=[];
		for(let i in response){
			let date=new Date(parseInt(response[i]['timeorder'])*1000);
			let payment=Date.parse('1970-01-01 '+response[i]['timeend'])-Date.parse('1970-01-01 '+response[i]['timestart']);
			payment=(payment/(1000*3600)*response[i]['payment']).toFixed(2);
			let node=<div style={this.props.style.detailDiv}>
						订单号：{response[i]['orderNo']} 租借人：{response[i]['renter']} 订单时间：{date.toLocaleString()} 支付￥：{payment}
					 <button onClick={this.rate} id={'l'+response[i]['orderNo']} style={this.props.style.rateButton} data-describlerate={0} data-lotrate={0}>Rate</button>
					 </div>;
		    let node_1=<div style={this.props.style.hideDiv}>
		    				<div>
			    				<a style={this.props.style.titleA}>描述相符:</a>
								<a style={this.props.style.rateA} onClick={this.clickA}  onDoubleClick={this.dblclickA} id={'l'+response[i]['orderNo']+'a_1'} data-orderno={'l'+response[i]['orderNo']}/>
								<a style={this.props.style.rateA} onClick={this.clickA}  onDoubleClick={this.dblclickA} id={'l'+response[i]['orderNo']+'a_2'} data-orderno={'l'+response[i]['orderNo']}/>
								<a style={this.props.style.rateA} onClick={this.clickA}  onDoubleClick={this.dblclickA} id={'l'+response[i]['orderNo']+'a_3'} data-orderno={'l'+response[i]['orderNo']}/>
								<a style={this.props.style.rateA} onClick={this.clickA}  onDoubleClick={this.dblclickA} id={'l'+response[i]['orderNo']+'a_4'} data-orderno={'l'+response[i]['orderNo']}/>
								<a style={this.props.style.rateA} onClick={this.clickA}  onDoubleClick={this.dblclickA} id={'l'+response[i]['orderNo']+'a_5'} data-orderno={'l'+response[i]['orderNo']}/>
							</div>
							<div>
								<a style={this.props.style.titleA}>车位评价:</a>
								<a style={this.props.style.rateA} onClick={this.clickB}  onDoubleClick={this.dblclickB} id={'l'+response[i]['orderNo']+'b_1'} data-orderno={'l'+response[i]['orderNo']}/>
								<a style={this.props.style.rateA} onClick={this.clickB}  onDoubleClick={this.dblclickB} id={'l'+response[i]['orderNo']+'b_2'} data-orderno={'l'+response[i]['orderNo']}/>
								<a style={this.props.style.rateA} onClick={this.clickB}  onDoubleClick={this.dblclickB} id={'l'+response[i]['orderNo']+'b_3'} data-orderno={'l'+response[i]['orderNo']}/>
								<a style={this.props.style.rateA} onClick={this.clickB}  onDoubleClick={this.dblclickB} id={'l'+response[i]['orderNo']+'b_4'} data-orderno={'l'+response[i]['orderNo']}/>
								<a style={this.props.style.rateA} onClick={this.clickB}  onDoubleClick={this.dblclickB} id={'l'+response[i]['orderNo']+'b_5'} data-orderno={'l'+response[i]['orderNo']}/>
							</div>
		    			</div>;
			arr.push(node);
			arr.push(node_1);
		}
		return <div style={this.props.style.body}>
	               <a style={this.props.style.userA}>
						用户:{this['state']['userName']}
	               </a>
	               <div style={this.props.style.orderBody}>{arr}</div>
			   </div>;
	}
}
class ajaxRequest{
	constructor(url,data,callback){
		this.url=url;
		this.data=data;
		this.callback=callback;
		this.requestPost=this.requestPost.bind(this);
		this.requestGet=this.requestGet.bind(this);
	}
	requestPost(){
		var b=this;
		var request=new XMLHttpRequest();
		request.responseType='json';
		request.open('POST',this.url);
		request.onreadystatechange=function(){
			if(this.readyState===4&&this.status===200){
				console.log('请求成功');
				b.callback(this.response);
			}
		};
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		request.send(this.data);
	}
	requestGet(){
		var b=this;
		var request=new XMLHttpRequest();
		request.responseType='json';
		request.open('GET',this.url);
		request.onreadystatechange=function(){
			if(this.readyState===4&&this.status===200){
				b.callback(this.response);
			}
		};
		request.setRequestHeader('Content-Type','application/json');
		request.send();
	}
}
const sty={
	"all":{
		"width":"100VW",
		"minWidth":"1000px",
		"minHeight":"100VH"
	},
	"header":{
		"width":"100%",
		"height":"80px",
		"backgroundColor":"RGB(0,179,138)"
	},
	"body":{
		"width":"80%",
		"backgroundColor":"RGB(248,248,248)",
		"margin":"auto",
		"marginTop":"40px",
		"paddingTop":"20px",
		"minHeight":"500px"
	},
	"headerP":{
		"fontSize":"40px",
		"color":"white",
		"fontStyle":"italic",
		"position":"relative",
		"top":"10px",
		"left":"20px"
	},
	"orderBody":{
		"width":"100%"
	},
	"userA":{
		"marginLeft":"10px"
	},
	"detailDiv":{
		"width":"80%",
		"height":"40px",
		"backgroundColor":"RGB(0,179,138)",
		"marginLeft":"10px",
		"color":"white",
		"fontSize":"15px",
		"lineHeight":2.6,
		"marginTop":"10px"
	},
	"hideDiv":{
		"width":"80%",
		"height":"70px",
		"backgroundColor":"RGB(220,220,220)",
		"marginLeft":"10px",
		"color":"white",
		"fontSize":"15px",
		"lineHeight":2.6
	},
	"rateButton":{
		"backgroundColor":"RGB(220,220,220)",
		"color":"RGB(101,182,255)",
		"border":"white",
		"float":"right",
		"width":"60px",
		"height":"20px",
		"borderRadius":"3px",
		"marginTop":"5px",
		"marginRight":"5px",
		"verticalAlign":"center",
		"marginTop":"10px"
	},
	"rateA":{
		"display":"inline-block",
		"width":"12px",
		"height":"12px",
		"border":"2px solid RGB(101,182,255)",
		"borderRadius":"50%",
		"marginLeft":"10px",
		"backgroundColor":"rgb(220,220,220)",
		"verticalAlign":"top",
		"marginTop":"5px"
	},
	"titleA":{
		"display":"inline-block",
		"color":"black",
		"fontSize":"10px",
		"height":"12px",
		"lineHeight":1,
		"verticalAlign":"top",
		"marginTop":"5px",
		"marginLeft":"10px"
	}
}
ReactDOM.render(<All style={sty}/>,document.querySelector('#example'));