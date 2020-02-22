<template>
	<view class="content">
		<!--
		* 广告组件
		* timedown 倒计时时间
		* imageUrl 背景图
		* url 跳转链接
		*  -->
		<!-- #ifndef MP -->
		<!-- 	<mix-advert 
			ref="mixAdvert" 
			:timedown="8" 
			imageUrl="/static/advert.jpg"
			:url="advertNavUrl"
		></mix-advert> -->
		<!-- #endif -->

		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabBars" :key="item.id" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>

		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh"
		 @setEnableScroll="setEnableScroll">

			<!-- 内容部分 -->
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">
						<!--* 新闻列表 
							* 和nvue的区别只是需要把uni标签转为weex标签而已
							* class 和 style的绑定限制了一些语法，其他并没有不同
						-->
						<!-- @click="navToDetails(item)" -->
						<view v-for="(item, index) in tabItem.newsList" :key="index" class="news-item">
							<view :class="['bot', 'bot'+item.type]">
								<text class="author">{{item.author}}</text>
								<text class="time">{{item.time}}</text>
								<view v-if="item.images.length > 0" class="img-center">
									<image class="" src="../../static/makeBed.png"></image>
								</view>
								<!-- 空图片占位 -->
								<view v-else class="img-empty"></view>
								<text :class="['title', 'title'+item.type]">{{item.title}}</text>
								<view class="radio-right">
									<radio value="" color="#fa436a" :checked='item.type == 0'></radio>
								</view>
							</view>
						</view>
						<!-- 上滑加载更多组件 -->
						<mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
	</view>
</template>

<script>
	import mixAdvert from '@/components/mix-advert/vue/mix-advert';
	import json from '@/json'
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		components: {
			mixPulldownRefresh,
			mixLoadMore,
			mixAdvert
		},
		data() {
			return {
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				tabBars: [],
			}
		},
		computed: {
			advertNavUrl() {
				let data = {
					title: '测试跳转新闻详情',
					author: '测试作者',
					time: '2019-04-26 21:21'
				}
				return `/pages/details/details?data=${JSON.stringify(data)}`;
			}
		},
		async onLoad() {
			// 获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
			this.loadTabbars();
		},
		onReady() {
			/**
			 * 启动页广告 使用文档（滑稽）
			 * 1. 引入组件并注册 
			 * 		import mixAdvert from '@/components/mix-advert/vue/mix-advert';
			 *      components: {mixAdvert},
					 <!-- #ifndef MP -->
						<mix-advert 
							ref="mixAdvert" 
							:timedown="8" 
							imageUrl="/static/advert.jpg"
							:url="advertNavUrl"
						></mix-advert>
					<!-- #endif -->
			 * 	2. 调用组件的initAdvert()方法进行初始化
			 *  初始化的时机应该是在splash关闭时，否则会造成在app端广告显示了数秒后首屏才渲染出来
			 */
			// #ifndef MP
			// this.$refs.mixAdvert.initAdvert();
			// #endif
		},
		methods: {
			/**
			 * 数据处理方法在vue和nvue中通用，可以直接用mixin混合
			 * 这里直接写的
			 * mixin使用方法看index.nuve
			 */
			//获取分类
			loadTabbars() {
				let tabList = json.tabList;
				tabList.forEach(item => {
					item.newsList = [];

					console.log(item);
					item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
					item.refreshing = 0;
				})
				this.tabBars = tabList;
				this.tabBars[0].newsList.sort(function(a, b) {
					return b.time > a.time ? 1 : -1;
				});
				// this.tabBars.sort((a,b) => {
				//             return a.time > b.time ? 1 : -1;
				//         })
				console.log(this.tabBars);

				console.log(this.tabBars[0].newsList);
				// console.log(this.tabBars[0].newsList[0]);
				this.loadNewsList('add');
			},
			//新闻列表
			loadNewsList(type) {
				let tabItem = this.tabBars[this.tabCurrentIndex];

				//type add 加载更多 refresh下拉刷新
				if (type === 'add') {
					if (tabItem.loadMoreStatus === 2) {
						return;
					}
					tabItem.loadMoreStatus = 1;
				}
				// #ifdef APP-PLUS
				else if (type === 'refresh') {
					tabItem.refreshing = true;
				}
				// #endif

				//setTimeout模拟异步请求数据
				setTimeout(() => {
					let list = json.newsList;


					// list.sort((a, b) => {
					// 	return Math.random() > .5 ? -1 : 1; //静态数据打乱顺序
					// })


					if (type === 'refresh') {
						tabItem.newsList = []; //刷新前清空数组
					}
					list.forEach(item => {
						item.id = parseInt(Math.random() * 10000);
						tabItem.newsList.push(item);
					})
					//下拉刷新 关闭刷新动画
					if (type === 'refresh') {
						this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
						// #ifdef APP-PLUS
						tabItem.refreshing = false;
						// #endif
						tabItem.loadMoreStatus = 0;
					}
					//上滑加载 处理状态
					if (type === 'add') {
						tabItem.loadMoreStatus = tabItem.newsList.length > 40 ? 2 : 0;
					}
				}, 600)
			},
			//新闻详情
			navToDetails(item) {
				let data = {
					id: item.id,
					title: item.title,
					author: item.author,
					time: item.time,
				}
				let url = item.videoSrc ? 'videoDetails' : 'details';

				uni.navigateTo({
					url: `/pages/details/${url}?data=${JSON.stringify(data)}`
				})
			},

			//下拉刷新
			onPulldownReresh() {
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore() {
				this.loadNewsList('add');
			},
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable;
				}
			},

			//tab切换
			async changeTab(e) {

				if (scrollTimer) {
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if (typeof e === 'object') {
					index = e.detail.current
				}
				if (typeof tabBar !== 'object') {
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if (i === index) {
						nowWidth = result.width;
					}
				}
				if (typeof e === 'number') {
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index;
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(() => {
					if (width - nowWidth / 2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
					} else {
						this.scrollLeft = 0;
					}
					if (typeof e === 'object') {
						this.tabCurrentIndex = index;
					}
					this.tabCurrentIndex = index;
					//第一次切换tab，动画结束后需要加载数据
					let tabItem = this.tabBars[this.tabCurrentIndex];
					if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
						this.loadNewsList('add');
						tabItem.loaded = true;
					}
				}, 300)

			},
			//获得元素的size
			getElSize(id) {
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	/* 日程列表 */
	.pay-type-list {

		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			/* align-items: center; */
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;

		}

		.icon {
			width: 50upx;
			height: 50upx;
			margin: auto 0;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 150upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 28rpx;
			position: relative;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #9CA4AC;
			line-height: 90rpx;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 6upx solid #669933;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: #333;
			font-weight: bold;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			line-height: 90rpx;

			&:after {
				width: 50%;
			}
		}
	}

	.swiper-box {
		height: 100%;
	}

	.panel-scroll-box {

		height: 100%;

		.panel-item {
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}

	/**
	 * 新闻列表 直接拿的nvue样式修改，,
	 * 一共需要修改不到10行代码, 另外px需要直接修改为upx，只有单位不一样，计算都是一样的
	 * 吐槽：难道不能在编译的时候把nuve中的upx转为px? 这样就不用修改单位了
	 */
	.video-wrapper {
		width: 100%;
		height: 440upx;

		.video {
			width: 100%;
		}
	}

	view {
		display: flex;
		flex-direction: column;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.news-item {
		position: relative;
	}

	/* 修改结束 */

	/* 新闻列表  emmm 仅供参考 */
	.news-item {
		width: 750upx;
		padding: 24upx 30upx;
		border-bottom-width: 1px;
		border-color: #eee;
		background-color: #fff;
	}

	.title {
		font-size: 32upx;
		color: #303133;
		line-height: 46upx;
		margin-left: 20upx;
		width: 49%;
	}

	.bot {
		flex-direction: row;
	}

	.author {
		font-size: 26upx;
		color: #aaa;
	}

	.time {
		font-size: 26upx;
		color: #aaa;
		margin-left: 18upx;
		width: 22%;
	}

	.img-center {
		margin-left: 20upx;

	}

	.img-center image {
		width: 52upx;
		height: 52upx;

	}

	.radio-right {
		position: absolute;
		right: 20upx;
	}

	.img-list {
		flex-shrink: 0;
		flex-direction: row;
		background-color: #fff;
		width: 220upx;
		height: 140upx;
	}

	.img-wrapper {
		flex: 1;
		flex-direction: row;
		height: 140upx;
		position: relative;
		overflow: hidden;
	}

	.img {
		flex: 1;
	}

	.img-empty {
		height: 52upx;
	}

	/* 图在左 */
	.img-list1 {
		position: absolute;
		left: 30upx;
		top: 24upx;
	}

	.title1 {
		padding-left: 20upx;
	}

	.bot1 {
		padding-left: 10upx;
		margin-top: 20upx;
	}

	/* 图在右 */
	.img-list2 {
		position: absolute;
		right: 30upx;
		top: 24upx;
	}

	.title2 {
		padding-right: 210upx;
	}

	.bot2 {
		margin-top: 20upx;
	}

	/* 底部3图 */
	.img-list3 {
		width: 700upx;
		margin: 16upx 0upx;
	}

	.img-wrapper3 {
		margin-right: 4upx;
	}

	/* 底部大图 */
	.img-list-single {
		width: 690upx;
		height: 240upx;
		margin: 16upx 0upx;
	}

	.img-wrapper-single {
		height: 240upx;
		margin-right: 0upx;
	}

	.video-tip {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .3);
	}

	.video-tip-icon {
		width: 60upx;
		height: 60upx;
	}
</style>
