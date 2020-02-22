// import dTime from '/util/data.js'

const tabList = [{
	name: getTime(0),
	id: '1',
}, {
	name: getTime(1),
	id: '2'
}, {
	name: getTime(2),
	id: '3'
}, {
	name: getTime(3),
	id: '4'
}, {
	name: getTime(4),
	id: '5'
}, {
	name: getTime(5),
	id: '6'
}, {
	name: getTime(6),
	id: '7'
}, {
	name: getTime(7),
	id: '8'
}];

function getTime (n) {
	var date = new Date();
	var year = date.getFullYear(); //获取年 
	var month = date.getMonth()+1;//获取月  
	var day = date.getDate()+n; //获取当日
	var time = month + "/" + day;	
	console.log("time"+time);
	return time;
};
const newsList = [{
		id: 0,
		title: '早起/做迷糊/豆浆/馒头',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg' ,
		time: '06:30-06:40',
		type: 0,
	},{
		id: 1,
		title: '洗漱/化妆/穿衣/给俩孩子准备水',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg' ,
		time: '06:40-06:50',
		type: 1,
	},
	{
		id: 2,
		title: '拉伸运动',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		
		// videoSrc: 'https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4',
		time: '06:50-07:10',
		type: 1,
	},
	{
		id: 3,
		title: '读书/喝水/给俩孩子洗漱穿衣/叠被子',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		
		// videoSrc: 'https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4',
		time: '07:10-07:30',
		type: 1,
	},
	{
		id: 4,
		title: '吃饭/收拾餐桌厨房',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		
		// videoSrc: 'https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4',
		time: '07:30-07:50',
		type: 1,
	},
	{
		id: 5,
		title: '英语学习',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '08:10-08:40',
		type: 1,
	},
	{
		id: 6,
		title: '查看日报/记账/复盘',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '09:00-09:30',
		type: 1,
	},
	{
		id: 7,
		title: 'js学习',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '09:30-10:00',
		type: 1,
	},
	{
		id:8,
		title: 'js学习',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '11:00-11:30',
		type: 1,
	},
	{
		id:9,
		title: '刻意练习写作',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '13:00-13:30',
		type: 1,
	},
	{
		id:10,
		title: 'css学习',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '14:30-15:00',
		type: 1,
	},
	{
		id:11,
		title: '写日报/日记',
		author: '早',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '16:00-16:20',
		type: 1,
	},
	{
		id:12,
		title: '给俩孩子洗澡/穿衣/打扫卫生间',
		author: '晚',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '19:30-20:00',
		type: 1,
	},
	{
		id: 13,
		title: '吃饭',
		author: '晚',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '19:40-20:20',
		type: 1,
	},
	{
		id: 14,
		title:'刷牙/面膜打扫厨房/客厅/整理物品/擦地',
		author: '晚',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		
		time: '20:00-20:20',
		type: 1,
	},
	{
		id:15,
		title:'带孩子读书/学习/睡觉',
		author: '晚',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',		
		time: '20:20-21:20',
		type: 1,
	},
	{
		id:16,
		title:'复盘/学习',
		author: '晚',
		images: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
		time: '21:20-23:20',
		type: 1,
	},
]
const evaList = [{
		src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
		nickname: 'Ranth Allngal',
		time: '09-20 12:54',
		zan: '54',
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	},
	{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
		nickname: 'Ranth Allngal',
		time: '09-20 12:54',
		zan: '54',
		content: '楼上说的好有道理。'
	}
]

export default {
	tabList,
	newsList,
	evaList
}
