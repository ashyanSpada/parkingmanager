class All extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <div style={this.props.style.all}>
					<div style={this.props.style.header}><p style={this.props.style.headerP}>Parking</p></div>
					<Form style={this.props.style}/>
					<div style={this.props.style.footer}></div>
				</div>;
	}
}
class Form extends React.Component{
	constructor(props){
		super(props);
		this.upload=this.upload.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.state={
			name:'',
			payment:'',
			timeStart:'',
			timeEnd:'',
			rentType:'lend'
		};
		this.localSearch=this.localSearch.bind(this);
		this.borrow=this.borrow.bind(this);
		this.lend=this.lend.bind(this);
	}
	borrow(){
		this.setState({
			rentType:'borrow'
		});
		document.querySelector('#banner').style.left=0;
	}
	lend(){
		this.setState({
			rentType:'lend'
		});
		document.querySelector('#banner').style.left='50%';
	}
	handleChange(){
		switch(event.target.id){
			case 'name':
			this.setState({
				name:event.target.value
			});
			break;
			case 'payment':
			this.setState({
				payment:event.target.value
			});
			break;
			case 'timeStart':
			this.setState({
				timeStart:event.target.value
			});
			break;
			case 'timeEnd':
			this.setState({
				timeEnd:event.target.value
			});
			break;
			default:
			break;
		}
	}
	upload(event){
		if(this.state.name==''||this.state.payment==''||this.state.timeStart==''||this.state.timeEnd==''){
			event.preventDefault();
			alert('输入信息不完整，请检查');
		}
		console.log(this.state);
		var left=document.querySelector('#left');
		var hideDiv=document.querySelector('#hideDiv');
		left.style.right='50%';
		hideDiv.style.display='block';
	}
	localSearch(){
		var localSearch=new BMap.LocalSearch(this.map,{
			renderOptions:{
				map:this.map
			},
			onHtmlSet:(event)=>{
				document.querySelector('#locationDetail').value=event.point.lng+','+event.point.lat;
			}
		});
		localSearch.search(document.querySelector('#location').value);
		var left=document.querySelector('#left');
		var hideDiv=document.querySelector('#hideDiv');
		left.style.right='180px';
		hideDiv.style.display='none';
	}
	componentDidMount(){
		var b=this;
		this.map=new BMap.Map('right');
		var point=new BMap.Point(116.404, 39.915);
		this.map.centerAndZoom(point,15);
		var location=new BMap.GeolocationControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		location.addEventListener('locationSuccess',function(event){
			var address=this.getAddressComponent();
			var results=[];
			for(let i in address){
				if(address.hasOwnProperty(i)){
					results.push(address[i]);
				}
			}
			console.log(results);
			document.querySelector('#location').value=results.join(' ');
			document.querySelector('#locationDetail').value=event.point.lng+','+event.point.lat;
			b.map.panTo(event.point);
		});
		this.map.addControl(location);
		this.map.addControl(new BMap.MapTypeControl());
		this.map.addControl(new BMap.NavigationControl());
		var icon=new BMap.Icon('http://api.map.baidu.com/img/markers.png',new BMap.Size(23,25),{
			imageOffset:new BMap.Size(0,0 - 10*25),
			anchor:new BMap.Size(10,35)
		});
		var marker=new BMap.Marker();
		marker.setIcon(icon);
		this.map.addEventListener("rightclick", function(e){    
	
			marker.setPosition(e.point);
			b.map.addOverlay(marker);
			document.querySelector('#locationDetail').value=e.point.lng+','+e.point.lat;
 			   
		});
		var autoComplete=new BMap.Autocomplete({
			location:'中国',
			input:'location'
		});
		autoComplete.show();
	}
	render(){
		return <div style={this.props.style.body}>
					<div style={this.props.style.left} id='left'>
					<button style={this.props.style.rentButton} onClick={this.borrow}>我要租赁车位</button>
					<button style={this.props.style.rentButton} onClick={this.lend}>我要出租车位</button>
					<div style={this.props.style.banner} id='banner'></div>
					{this.state.rentType==='lend' ?	
						<form action={"update.php"} method={"post"} >
						   <label htmlFor="name" style={this.props.style.labelText}>用户名</label>
			               <input type="text" style={this.props.style.input} name={'name'} id={'name'}  onChange={this.handleChange}/>
			               <label htmlFor="payment" style={this.props.style.labelText}>报价</label>
			               <input type="text" style={this.props.style.input} name={'payment'} id={'payment'}  onChange={this.handleChange}/>
			               <label htmlFor="timeStart" style={this.props.style.labelText}>开始时间</label>
			               <input type="time" style={this.props.style.input} name={'timeStart'} id={'timeStart'}  onChange={this.handleChange}/>	
			               <label htmlFor="timeEnd" style={this.props.style.labelText}>结束时间</label>
			               <input type="time" style={this.props.style.input} name={'timeEnd'} id={'timeEnd'}  onChange={this.handleChange}/>
			               <label htmlFor="location" style={this.props.style.labelText}>地点</label>
			               <input type="text" style={this.props.style.inputLocation} id={'location'} name={'location'} />
			               <button type='button' style={this.props.style.searchButton} onClick={this.localSearch}>搜索</button>
			               <input type="text" name={'locationDetail'} id={'locationDetail'} style={{'display':'none'}}/>	
			               <button type="submit" style={this.props.style.button} onClick={this.upload}>提交需求</button>		
					   </form> : 
					   <form action="userRegister.php" method="post">
							<label htmlFor="" style={this.props.style.labelText}>用户名</label>
							<input type="text" style={this.props.style.input} name='user'/>
							<label htmlFor="" style={this.props.style.labelText}>密码</label>
							<input type="password" style={this.props.style.input} name='password'/>
							<button type="submit" style={this.props.style.button}>注册</button>
					   </form>
					
					}
					</div>   
				<div style={this.props.style.right} id={'right'}></div>
				<div style={this.props.style.hideDiv} id='hideDiv'></div>
			   </div>
			   ;
	}
}
const sty={
	"all":{
		"width":"100%",
		"minWidth":"900px",
		"height":"100VH"
	},
	"header":{
		"width":"100%",
		"height":"50%",
		"backgroundColor":"RGB(0,179,138)"
	},
	"headerP":{
		"fontSize":"40px",
		"color":"white",
		"fontStyle":"italic",
		"position":"relative",
		"left":"20px",
		"top":"30px",
		"userSelect":"none"
	},
	"footer":{
		"width":"100%",
		"height":"50%",
		"backgroundColor":"white",
		"marginTop":"-150px"
	},
	"body":{
		"width":"70%",
		"position":"relative",
		"margin":"auto",
		"marginTop":"-200px",
		"backgroundColor":"white"
	},
	"left":{
		"display":"inline-block",
		"width":"50%",
		"verticalAlign":"top"
	},
    "right":{
    	"display":"inline-block",
    	"width":"49.5%",
    	"height":"400px",
    	"verticalAlign":"top",
    	"borderLeft":"1px solid RGB(230,230,230)",
    	"marginTop":"10px"
    },
	"input":{
		"marginLeft":"20px",
		"width":"90%",
		"height":"40px",
		"fontSize":"15px",
		"display":"block",
		"backgroundColor":"RGB(248,248,248)",
		"outline":"none",
		"marginTop":"7px",
		"border":"none"
	},
	"inputLocation":{
		"marginLeft":"20px",
		"width":"70%",
		"height":"40px",
		"fontSize":"15px",
		"display":"inline-block",
		"backgroundColor":"RGB(248,248,248)",
		"outline":"none",
		"marginTop":"7px",
		"border":"none"
	},
	"searchButton":{
		"width":"20%",
		"height":"40px",
		"outline":"none",
		"backgroundColor":"RGB(0,179,138)",
		"marginTop":"7px",
		"border":"none",
		"display":"inline-block"
	},
	"p":{
		"fontSize":"20px",
		"fontWeight":"bold",
		"textAlign":"center"    
	},
	"button":{
		"display":"block",
		"marginLeft":"20px",
		"marginTop":"20px",
		"width":"90%",
		"height":"40px",
		"fontSize":"15px",
		"backgroundColor":"RGB(0,179,138)",
		"color":"white",
		"border":"none"
	},
	"labelText":{
		"color":"RGB(0,179,138)",
		"marginLeft":"20px",
		"fontSize":"15px",
		"display":"block"
	},
	"rentButton":{
		"width":"50%",
		"border":"none",
		"backgroundColor":"RGB(0,179,138)",
		"color":"white",
		"fontSize":"20px"
	}
};
const sty2={
	"body":{
		"width":"100%",
		"height":"120VH",
		"position":"relative"
	},
	"right":{
		"width":"100%",
		"height":"120VH",
		"position":"relative",
		"zIndex":-1
	},
	"hideDiv":{
		"width":"100%",
		"height":"120VH",
		"position":"absolute",
		"top":0,
		"backgroundColor":"black",
		"opacity":0.8,
		"zIndex":0
	},
	"left":{
		"position":"absolute",
		"width":"400px",
		"top":"50px",
		"right":"50%",
		"marginRight":"-200px",
		"zIndex":1,
		"backgroundColor":"white",
		"transition":"right 0.5s",
		"border":"1px solid RGB(220,220,220)",
		"boxShadow":"0px 0px 5px black",
		"borderRadius":"3px"
	},
	"labelText":{
		"color":"RGB(0,179,138)",
		"marginLeft":"20px",
		"fontSize":"15px",
		"display":"block"
	},
	"input":{
		"marginLeft":"20px",
		"width":"90%",
		"height":"40px",
		"fontSize":"15px",
		"display":"block",
		"backgroundColor":"RGB(248,248,248)",
		"outline":"none",
		"marginTop":"7px",
		"border":"none"
	},
	"button":{
		"display":"block",
		"marginLeft":"20px",
		"marginTop":"20px",
		"marginBottom":"5px",
		"width":"90%",
		"height":"40px",
		"fontSize":"15px",
		"backgroundColor":"RGB(0,179,138)",
		"color":"white",
		"border":"none"
	},
	"searchButton":{
		"width":"20%",
		"height":"40px",
		"outline":"none",
		"backgroundColor":"RGB(0,179,138)",
		"marginTop":"7px",
		"border":"none",
		"display":"inline-block"
	},
	"rentButton":{
		"width":"50%",
		"border":"none",
		"height":"25px",
		"fontSize":"15px",
		"fontWeight":"bold",
		"outline":"none",
		"backgroundColor":"white",
		"color":"black"
	},
	"banner":{
		"width":"50%",
		"height":"2px",
		"backgroundColor":"RGB(0,179,138)",
		"transition":"left 0.5s",
		"position":"relative",
		"left":0
	},
	"inputLocation":{
		"marginLeft":"20px",
		"width":"70%",
		"height":"40px",
		"fontSize":"15px",
		"display":"inline-block",
		"backgroundColor":"RGB(248,248,248)",
		"outline":"none",
		"marginTop":"7px",
		"border":"none"
	}
};
ReactDOM.render(<Form style={sty2}/>,document.querySelector('#example'));

